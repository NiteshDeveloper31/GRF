import FAQ from "../models/FAQ.js";

// @desc    Get all FAQs (Admin/Public list)
// @route   GET /api/faqs
// @access  Protected (Admin only)
export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({}).sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch FAQs", error: error.message });
  }
};

// @desc    Create a new FAQ
// @route   POST /api/faqs
// @access  Protected (Admin only)
export const createFAQ = async (req, res) => {
  try {
    const { question, answer, keywords, category } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and Answer are required" });
    }

    const faq = new FAQ({
      question,
      answer,
      keywords: Array.isArray(keywords) ? keywords : keywords ? keywords.split(",").map((k) => k.trim()) : [],
      category: category || "General",
    });

    const createdFaq = await faq.save();
    res.status(201).json(createdFaq);
  } catch (error) {
    res.status(500).json({ message: "Failed to create FAQ", error: error.message });
  }
};

// @desc    Update an FAQ
// @route   PUT /api/faqs/:id
// @access  Protected (Admin only)
export const updateFAQ = async (req, res) => {
  try {
    const { question, answer, keywords, category } = req.body;
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;
    faq.category = category || faq.category;
    if (keywords !== undefined) {
      faq.keywords = Array.isArray(keywords) ? keywords : keywords.split(",").map((k) => k.trim());
    }

    const updatedFaq = await faq.save();
    res.json(updatedFaq);
  } catch (error) {
    res.status(500).json({ message: "Failed to update FAQ", error: error.message });
  }
};

// @desc    Delete an FAQ
// @route   DELETE /api/faqs/:id
// @access  Protected (Admin only)
export const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    await faq.deleteOne();
    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete FAQ", error: error.message });
  }
};



// Levenshtein distance calculator to support typo-tolerant chatbot matching
const getEditDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

// Check word similarity and return a score multiplier (1.0 = exact, 0.85 = startsWith, 0.7 = typo, 0.0 = no match)
const getWordSimilarity = (w1, w2) => {
  const cleanW1 = w1.toLowerCase().trim();
  const cleanW2 = w2.toLowerCase().trim();
  if (cleanW1 === cleanW2) return 1.0;
  
  // Prefix / plural checks (e.g. type vs types, jacket vs jackets)
  if (cleanW1.length > 3 && cleanW2.length > 3) {
    if (cleanW1.startsWith(cleanW2) || cleanW2.startsWith(cleanW1)) return 0.85;
  }
  
  // Levenshtein check for typos (e.g. jacked vs jacket, distance is 1)
  const dist = getEditDistance(cleanW1, cleanW2);
  const threshold = Math.min(cleanW1.length, cleanW2.length) > 5 ? 2 : 1;
  if (dist <= threshold) {
    return 0.7;
  }
  return 0.0;
};

// Stop words to assign low weight
const STOP_WORDS = new Set([
  "is", "are", "the", "a", "an", "of", "and", "to", "in", "for", "with", "on", "at", "by", "from",
  "do", "does", "did", "you", "your", "we", "our", "us", "what", "how", "why", "where", "when",
  "who", "which", "can", "could", "should", "would", "about", "i", "my", "me", "it", "its",
  "they", "them", "their", "he", "she", "him", "her", "this", "that", "these", "those"
]);

// Clean user query and run fuzzy match scoring against keywords & question text
export const queryChatbot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.json({
        answer: "Hello! Welcome to G R F Dynamic Engineering. I am your virtual assistant. How can I help you today?",
      });
    }

    // Clean user query
    const cleanInput = message.toLowerCase().replace(/[^\w\s]/g, " ").trim();
    const inputTokens = cleanInput.split(/\s+/).filter(Boolean);

    const faqs = await FAQ.find({});

    let bestMatch = null;
    let highestScore = 0;
    let bestMatchRatio = 0;

    for (const faq of faqs) {
      let score = 0;
      const matchedKeywordTokens = new Set();
      const matchedQuestionTokens = new Set();
      
      // 1. Match against FAQ keywords
      if (faq.keywords && faq.keywords.length > 0) {
        for (const kw of faq.keywords) {
          const cleanKw = kw.toLowerCase().trim();
          
          // Exact phrase match in query
          if (cleanInput.includes(cleanKw)) {
            const wordCount = cleanKw.split(/\s+/).length;
            score += wordCount * 3.0; // Higher weight for exact phrase match
            
            const kwTokens = cleanKw.split(/\s+/).filter(Boolean);
            kwTokens.forEach(t => {
              inputTokens.forEach(it => {
                if (it === t || getWordSimilarity(t, it) > 0) {
                  matchedKeywordTokens.add(it);
                }
              });
            });
          } else {
            // Token-based fuzzy match
            const kwTokens = cleanKw.split(/\s+/).filter(Boolean);
            for (const kt of kwTokens) {
              for (const it of inputTokens) {
                if (!matchedKeywordTokens.has(it)) {
                  const similarity = getWordSimilarity(kt, it);
                  if (similarity > 0) {
                    const weight = STOP_WORDS.has(it) ? 0.2 : 2.0;
                    score += weight * similarity;
                    matchedKeywordTokens.add(it);
                  }
                }
              }
            }
          }
        }
      }

      // 2. Match against FAQ Question text
      const cleanQuestion = faq.question.toLowerCase().replace(/[^\w\s]/g, " ").trim();
      const questionTokens = cleanQuestion.split(/\s+/).filter(Boolean);
      
      // Exact question check
      if (cleanInput.includes(cleanQuestion)) {
        score += 15.0; // Instant high score for matching full question
        inputTokens.forEach(it => matchedQuestionTokens.add(it));
      } else {
        for (const qt of questionTokens) {
          for (const it of inputTokens) {
            if (!matchedQuestionTokens.has(it)) {
              const similarity = getWordSimilarity(qt, it);
              if (similarity > 0) {
                const weight = STOP_WORDS.has(it) ? 0.2 : 1.5;
                score += weight * similarity;
                matchedQuestionTokens.add(it);
              }
            }
          }
        }
      }

      // Combined unique matched tokens for ratio calculation
      const allMatchedTokens = new Set([...matchedKeywordTokens, ...matchedQuestionTokens]);
      const nonStopInputTokens = inputTokens.filter(it => !STOP_WORDS.has(it));
      const matchedNonStopTokens = Array.from(allMatchedTokens).filter(it => !STOP_WORDS.has(it));
      
      let matchRatio = 0;
      if (nonStopInputTokens.length > 0) {
        matchRatio = matchedNonStopTokens.length / nonStopInputTokens.length;
      } else if (inputTokens.length > 0) {
        matchRatio = allMatchedTokens.size / inputTokens.length;
      }

      // Short queries (1-2 words) are more lenient than longer sentences
      const minRatio = inputTokens.length <= 2 ? 0.4 : 0.5;

      if (score > highestScore && matchRatio >= minRatio) {
        highestScore = score;
        bestMatch = faq;
        bestMatchRatio = matchRatio;
      }
    }

    // If we have a reasonable match score, return the answer
    if (bestMatch && highestScore >= 1.5) {
      return res.json({
        answer: bestMatch.answer,
        matchedQuestion: bestMatch.question,
        score: highestScore,
        ratio: bestMatchRatio
      });
    }

    // Fallback response with hints
    const fallbackAnswer = "I couldn't find a direct match for your question. You can ask about our 'manufacturing lead times', 'ASME certifications', 'office location', 'contact coordinates', or 'products range'. Alternatively, you can connect directly with our engineering sales team using the WhatsApp button or by calling us at +91 95575 30193.";
    
    res.json({
      answer: fallbackAnswer,
      score: 0,
      ratio: 0
    });
  } catch (error) {
    res.status(500).json({ message: "Chatbot query failed", error: error.message });
  }
};

// @desc    Pre-seed default FAQs in database
export const seedFAQs = async () => {
  try {
    const count = await FAQ.countDocuments({});
    if (count > 0) {
      return;
    }

    const defaultFaqs = [
      {
        question: "How can I contact GRF Dynamic Engineering?",
        answer: "You can reach our engineering sales team via email at grfdynamicengineering@gmail.com, or call our Saharanpur office directly at +91 95575 30193. You can also click the floating WhatsApp button to chat with us instantly.",
        category: "Contact",
        keywords: ["contact", "call", "email", "phone", "number", "whatsapp", "reach", "sales", "inquire", "support", "talk", "speak"],
      },
      {
        question: "What is your office address and working hours?",
        answer: "Our registered office and main fabrication facility is located at Dehradun Rd, Saharanpur - 247001, Uttar Pradesh, India. Our working hours are Monday through Saturday, from 9:00 AM to 6:00 PM (IST). We are closed on Sundays.",
        category: "Location",
        keywords: ["address", "location", "where", "office", "factory", "hours", "timing", "open", "saturday", "work hours", "working time", "saharanpur", "place", "find"],
      },
      {
        question: "What is your typical manufacturing lead time?",
        answer: "Standard storage vessels (up to 20,000L capacity) are typically fabricated and polished within 3 to 4 weeks. Custom chemical reactors featuring motorized agitators and half-pipe limpet coils require 6 to 8 weeks, including complete mechanical testing and certifications.",
        category: "Shipping & Production",
        keywords: ["lead time", "delivery", "duration", "time", "manufacture", "make", "fabricate", "days", "weeks", "production", "ready", "dispatch"],
      },
      {
        question: "Do you supply third-party testing and certifications?",
        answer: "Yes. G R F Dynamic Engineering constructs all pressure vessels strictly under ASME Section VIII specifications. We carry out detailed quality checks (hydro-testing up to 50 Bar, dye-penetrant checks, ultrasonic thickness measurements) and coordinate inspections with TUV, SGS, LLOYDS, and Bureau Veritas.",
        category: "Quality Control",
        keywords: ["certification", "certify", "asme", "iso", "quality", "test", "inspection", "tuv", "sgs", "code", "standards", "pressure test", "hydro test", "certified"],
      },
      {
        question: "What products and equipment categories do you offer?",
        answer: "We fabricate 10 core industrial categories: Storage Tanks, Milk Storage Tanks, Silo Systems, Brewery Tanks, Reactor Vessels, High Pressure Vessels, Mixing Tanks, Jacketed Vessels, Underground Oil Storage Tanks, and Custom Process Equipment skids.",
        category: "Products",
        keywords: ["products", "manufacture", "catalogue", "equipment", "vessels", "tanks", "reactors", "silo", "brewery", "jacketed", "pressure", "range", "list", "types"],
      },
      {
        question: "Do you build custom size or custom capacity vessels?",
        answer: "Absolutely. G R F Dynamic Engineering is a custom fabrication specialist. Our in-house engineering team designs each storage tank, processing vessel, or piping module according to your specific floor layout, material preference (SS 304, SS 316L, Mild Steel), and thermal requirement.",
        category: "Custom Design",
        keywords: ["custom", "design", "bespoke", "size", "capacity", "tailored", "layout", "drawings", "blueprint", "engineered", "requirements", "modify"],
      },
    ];

    await FAQ.insertMany(defaultFaqs);
    console.log("Database seeded: 6 Default FAQs loaded successfully.");
  } catch (error) {
    console.error("Failed to seed default FAQs:", error.message);
  }
};
