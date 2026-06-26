import mongoose from "mongoose";
import dotenv from "dotenv";
import FAQ from "../models/FAQ.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const faqsData = [
  // --- Category: Greetings & General Conversation (25 FAQs) ---
  {
    question: "Hello",
    answer: "Hi there! How can I help you today?",
    category: "Greetings & General Conversation",
    keywords: ["hello", "hi", "greetings", "hey", "good morning", "good afternoon", "welcome", "assistance", "howdy", "start"],
  },
  {
    question: "Hey there",
    answer: "Hey! How can I assist you with your industrial equipment and custom fabrication needs?",
    category: "Greetings & General Conversation",
    keywords: ["hey", "hey there", "greetings", "hi", "virtual assistant", "engineering", "support", "inquire", "chat", "connect"],
  },
  {
    question: "Good morning",
    answer: "Good morning! Welcome to G R F Dynamic Engineering. How can I help you with your project requirements today?",
    category: "Greetings & General Conversation",
    keywords: ["morning", "good morning", "start day", "early", "greetings", "hi", "welcome", "assistance", "project", "inquiries"],
  },
  {
    question: "Good afternoon",
    answer: "Good afternoon! How can I assist you with our high-quality storage and process equipment solutions today?",
    category: "Greetings & General Conversation",
    keywords: ["afternoon", "good afternoon", "greetings", "welcome", "support", "assistance", "solutions", "equipment", "tanks", "vessels"],
  },
  {
    question: "Good evening",
    answer: "Good evening! How can we assist you with your custom chemical or dairy vessel project details?",
    category: "Greetings & General Conversation",
    keywords: ["evening", "good evening", "greetings", "welcome", "support", "projects", "chemical", "dairy", "engineering", "inquire"],
  },
  {
    question: "How are you doing?",
    answer: "I am doing great, thank you! I am ready to answer any questions you have about our industrial storage tanks, silos, or reactors.",
    category: "Greetings & General Conversation",
    keywords: ["how are you", "how are you doing", "fine", "status", "bot status", "assistant", "ready", "reactors", "tanks", "silos"],
  },
  {
    question: "What is your name?",
    answer: "I am the virtual assistant for G R F Dynamic Engineering. You can ask me anything about our manufacturing capabilities.",
    category: "Greetings & General Conversation",
    keywords: ["name", "what is your name", "who are you", "identity", "bot name", "assistant name", "virtual", "support", "represent", "grf assistant"],
  },
  {
    question: "Who are you?",
    answer: "I am the automated assistant for G R F Dynamic Engineering. I help visitors learn about our industrial storage silos, chemical reactors, and sanitary milk vessels.",
    category: "Greetings & General Conversation",
    keywords: ["who are you", "what are you", "bot", "assistant", "identity", "virtual representative", "storage", "silos", "reactors", "milk vessels"],
  },
  {
    question: "What can you do?",
    answer: "I can help you search our product catalog, verify our ASME/ISO compliance, check our office address, and answer questions about lead times or contact coordinates.",
    category: "Greetings & General Conversation",
    keywords: ["what can you do", "capabilities", "help", "features", "assistance", "asme", "iso", "catalog", "lead times", "location", "address"],
  },
  {
    question: "Thank you",
    answer: "You're very welcome! I'm glad I could help. Let me know if you need more details about our custom fabrication options.",
    category: "Greetings & General Conversation",
    keywords: ["thank you", "thanks", "appreciate", "helpful", "good bot", "done", "solved", "cheers", "gratitude", "support team"],
  },
  {
    question: "Okay",
    answer: "Great! Let me know if you have any questions about our heavy industrial manufacturing services in Saharanpur.",
    category: "Greetings & General Conversation",
    keywords: ["ok", "okay", "understand", "noted", "acknowledged", "perfect", "fine", "cool", "sure", "manufacturing"],
  },
  {
    question: "Goodbye",
    answer: "Goodbye! Thank you for visiting G R F Dynamic Engineering. Feel free to open the chat window again if you have more questions.",
    category: "Greetings & General Conversation",
    keywords: ["bye", "goodbye", "exit", "close", "see you", "leaving", "thank you", "have a good day", "sign out", "chat close"],
  },
  {
    question: "See you later",
    answer: "See you! We look forward to helping you build heavy-duty industrial systems. Have a productive day!",
    category: "Greetings & General Conversation",
    keywords: ["see you", "later", "catch you later", "bye", "talk later", "return", "greetings", "industrial systems", "engineering", "support"],
  },
  {
    question: "Are you a robot?",
    answer: "Yes, I am the automated chatbot for G R F Dynamic Engineering, here to assist you with quick technical details and coordinates.",
    category: "Greetings & General Conversation",
    keywords: ["robot", "bot", "ai", "human", "are you real", "machine", "automated", "chatbot", "chat representative", "virtual support"],
  },
  {
    question: "Can I speak to a human?",
    answer: "Yes! You can call our engineering office directly at +91 95575 30193, or click the WhatsApp button at the bottom of the screen to start a chat with our manager.",
    category: "Greetings & General Conversation",
    keywords: ["human", "person", "real agent", "representative", "phone call", "whatsapp chat", "manager", "engineer", "sales person", "contact direct"],
  },
  {
    question: "Great",
    answer: "Thank you! We strive to make our engineering specifications and industrial services easy to navigate.",
    category: "Greetings & General Conversation",
    keywords: ["great", "awesome", "perfect", "excellent", "superb", "nice", "good job", "satisfied", "engineering spec", "services"],
  },
  {
    question: "Nice to meet you",
    answer: "Nice to meet you too! I hope I can make your industrial equipment selection process smoother today.",
    category: "Greetings & General Conversation",
    keywords: ["nice to meet you", "pleasure", "glad", "greetings", "welcome"],
  },
  {
    question: "Help me",
    answer: "Of course! Let me know what you need help with. You can ask about our silos, chemical reactors, milk tanks, or how to get a price quote.",
    category: "Greetings & General Conversation",
    keywords: ["help", "assistance", "support", "stuck", "guide", "silos", "reactors", "milk tanks", "quote", "price", "request"],
  },
  {
    question: "What is the weather like?",
    answer: "I don't track the local weather, but I can tell you our Saharanpur workshop is climate-controlled to ensure clean, high-precision stainless steel welding!",
    category: "Greetings & General Conversation",
    keywords: ["weather", "rain", "temperature", "temp", "hot", "cold", "saharanpur", "climate", "welding", "workshop", "precision"],
  },
  {
    question: "Who created you?",
    answer: "I was built specifically for G R F Dynamic Engineering to assist our visitors with immediate technical and company information.",
    category: "Greetings & General Conversation",
    keywords: ["creator", "who made you", "development", "build", "developer", "engineering systems", "chat developer", "assistant creation", "design"],
  },
  {
    question: "Can you recommend a product?",
    answer: "Yes! Tell me what industry you are in (e.g., dairy, chemical, pharma, brewery) and your process requirements, and I will highlight the best vessel options.",
    category: "Greetings & General Conversation",
    keywords: ["recommend", "recommendation", "suggest", "which product", "best vessel", "options", "industry", "dairy", "chemical", "pharma"],
  },
  {
    question: "How do I get a quote?",
    answer: "You can click on 'Request a Quote' in the navbar, or click the WhatsApp button, or email your drawings to grfdynamicengineering@gmail.com.",
    category: "Greetings & General Conversation",
    keywords: ["quote", "price", "cost", "inquiry", "how to buy", "procure", "purchase", "whatsapp button", "email coordinates", "drawings"],
  },
  {
    question: "Tell me a joke",
    answer: "Why did the stainless steel reactor go to the doctor? It had a bad case of structural pressure!",
    category: "Greetings & General Conversation",
    keywords: ["joke", "funny", "laugh", "humor", "smile", "reactor joke", "engineering joke", "welding joke", "assistant humor"],
  },
  {
    question: "You are smart",
    answer: "Thank you! I leverage the G R F Dynamic Engineering database to answer your technical questions instantly.",
    category: "Greetings & General Conversation",
    keywords: ["smart", "intelligent", "clever", "wise", "helpful", "genius", "good job", "correct", "database lookup", "specifications"],
  },
  {
    question: "What time is it?",
    answer: "I don't have access to your live clock, but our office and manufacturing workshop are open Monday to Saturday, 9:00 AM to 6:00 PM IST.",
    category: "Greetings & General Conversation",
    keywords: ["time", "clock", "date", "office status", "hours", "timing", "open hours", "saturday", "sunday", "working hours", "ist"],
  },

  // --- Category: Company Information (10 FAQs) ---
  {
    question: "Where is GRF Dynamic Engineering located?",
    answer: "Our registered office and main manufacturing facility is located at Dehradun Rd, Saharanpur - 247001, Uttar Pradesh, India.",
    category: "Company Information",
    keywords: ["location", "address", "where", "office", "factory", "saharanpur", "dehradun road", "direction", "find us", "map", "uttar pradesh"],
  },
  {
    question: "What are your working hours?",
    answer: "We are open Monday through Saturday, from 9:00 AM to 6:00 PM (IST). Our production facilities and customer support are closed on Sundays.",
    category: "Company Information",
    keywords: ["hours", "timings", "working hours", "timing", "saturday", "sunday", "schedule", "open time", "close time", "office open", "ist"],
  },
  {
    question: "How can I contact your sales team?",
    answer: "You can call us directly at +91 95575 30193, email us at grfdynamicengineering@gmail.com, or use the floating green WhatsApp chat widget.",
    category: "Company Information",
    keywords: ["contact", "phone", "number", "email", "sales", "inquiry", "coordinates", "whatsapp", "reach out", "manager", "support"],
  },
  {
    question: "What is your official email address?",
    answer: "Our official email address for all inquiries, technical drawings, and quotes is grfdynamicengineering@gmail.com.",
    category: "Company Information",
    keywords: ["email", "mail", "write to us", "address email", "grfdynamicengineering@gmail.com", "coordinates", "support mail", "inbox"],
  },
  {
    question: "Are you ISO certified?",
    answer: "Yes, G R F Dynamic Engineering is ISO 9001:2015 certified, maintaining strict quality management systems across design and fabrication.",
    category: "Company Information",
    keywords: ["iso", "certification", "iso certified", "quality standard", "audit", "9001", "iso 9001:2015", "verification", "compliance", "inspection"],
  },
  {
    question: "Do you construct pressure vessels under ASME code?",
    answer: "Yes, we construct all our high-pressure vessels, reactors, and steam headers strictly in compliance with ASME Section VIII Division 1 guidelines.",
    category: "Company Information",
    keywords: ["asme", "asme code", "asme section viii", "pressure vessel code", "compliance", "standards", "boilerplate", "division 1", "certified welding"],
  },
  {
    question: "When was GRF Dynamic Engineering founded?",
    answer: "We have been active in designing, rolling, and fabricating heavy-duty industrial storage tanks and skids since our establishment in 2011.",
    category: "Company Information",
    keywords: ["founded", "established", "history", "experience", "how old", "started", "years in business", "2011", "fabrication background"],
  },
  {
    question: "What materials do you use for fabrication?",
    answer: "We specialize in Stainless Steel (SS 304, SS 316, SS 316L, dimple sheets) and Carbon Steel / Mild Steel (MS) for structural supports and non-sanitary shells.",
    category: "Company Information",
    keywords: ["materials", "steel", "stainless steel", "ss304", "ss316", "ss316l", "mild steel", "carbon steel", "dimple sheets", "raw material"],
  },
  {
    question: "Do you provide on-site assembly and installation?",
    answer: "Yes, our team of ASME-qualified welders and technicians can travel to your site to handle assembly, structural layout support, piping integration, and commissioning.",
    category: "Company Information",
    keywords: ["installation", "assembly", "on-site", "commissioning", "welders", "rigging", "erection", "site work", "commissioning support", "piping"],
  },
  {
    question: "Do you manage shipping and logistics for oversized equipment?",
    answer: "Yes, we handle logistics planning for heavy, oversized tanks and silos, using low-bed trailers and securing transit clearances to deliver safely across India.",
    category: "Company Information",
    keywords: ["shipping", "logistics", "transport", "oversized", "delivery", "trailer", "low-bed", "pan india", "dispatch", "transit insurance"],
  },

  // --- Category: Products Overview (NEW — matches "Products Range" suggested button) ---
  {
    question: "What products and equipment categories do you offer?",
    answer: "We fabricate 10 core industrial categories: Storage Tanks, Milk Storage Tanks, Silo Systems, Brewery Tanks, Reactor Vessels, High Pressure Vessels, Mixing Tanks, Jacketed Vessels, Underground Oil Storage Tanks, and Custom Process Equipment skids.",
    category: "Products",
    keywords: ["products", "manufacture", "catalogue", "equipment", "vessels", "tanks", "reactors", "silo", "brewery", "jacketed", "pressure", "range", "list", "types", "categories", "offer"],
  },

  // --- Category: Shipping & Production (NEW — matches "Lead Time" suggested button) ---
  {
    question: "What is your manufacturing lead time?",
    answer: "Standard storage vessels (up to 20,000L capacity) are typically fabricated and polished within 3 to 4 weeks. Custom chemical reactors featuring motorized agitators and half-pipe limpet coils require 6 to 8 weeks, including complete mechanical testing and certifications.",
    category: "Shipping & Production",
    keywords: ["lead time", "delivery", "duration", "manufacturing time", "manufacture", "make", "fabricate", "days", "weeks", "production", "ready", "dispatch", "how long"],
  },

  // --- Category: Quality Control (NEW — matches "ASME Codes" suggested button) ---
  {
    question: "Do you supply third-party testing and certifications?",
    answer: "Yes. G R F Dynamic Engineering constructs all pressure vessels strictly under ASME Section VIII specifications. We carry out detailed quality checks (hydro-testing up to 50 Bar, dye-penetrant checks, ultrasonic thickness measurements) and coordinate inspections with TUV, SGS, LLOYDS, and Bureau Veritas.",
    category: "Quality Control",
    keywords: ["certification", "certify", "asme", "iso", "quality", "third party testing", "inspection", "tuv", "sgs", "code", "standards", "pressure test", "hydro test", "certified", "lloyds", "bureau veritas"],
  },

  // --- Category: Contact (NEW — matches "Contact Info" suggested button) ---
  {
    question: "How can I contact GRF Dynamic Engineering?",
    answer: "You can reach our engineering sales team via email at grfdynamicengineering@gmail.com, or call our Saharanpur office directly at +91 95575 30193. You can also click the floating WhatsApp button to chat with us instantly.",
    category: "Contact",
    keywords: ["contact grf", "call", "email", "phone", "number", "whatsapp", "reach", "sales team", "inquire", "talk", "speak", "get in touch"],
  },

  // --- Category: Location (NEW — matches "Office Address" suggested button) ---
  {
    question: "What is your office address and working hours?",
    answer: "Our registered office and main fabrication facility is located at Dehradun Rd, Saharanpur - 247001, Uttar Pradesh, India. Our working hours are Monday through Saturday, from 9:00 AM to 6:00 PM (IST). We are closed on Sundays.",
    category: "Location",
    keywords: ["office address", "location", "where are you", "factory", "hours", "timing", "open", "saturday", "work hours", "working time", "saharanpur", "place", "find us"],
  },

  // --- Category: Custom Design (NEW — matches "Custom Vessels" suggested button) ---
  {
    question: "Do you build custom size or custom capacity vessels?",
    answer: "Absolutely. G R F Dynamic Engineering is a custom fabrication specialist. Our in-house engineering team designs each storage tank, processing vessel, or piping module according to your specific floor layout, material preference (SS 304, SS 316L, Mild Steel), and thermal requirement.",
    category: "Custom Design",
    keywords: ["custom", "design", "bespoke", "custom size", "custom capacity", "tailored", "layout", "drawings", "blueprint", "engineered", "requirements", "modify"],
  },

  // --- Category: Storage Tanks (15 FAQs) ---
  {
    question: "What is an industrial storage tank?",
    answer: "It is a heavy-duty container designed to store liquid chemicals, water, fuel, or process media at atmospheric pressure or light utility pressure.",
    category: "Storage Tanks",
    keywords: ["storage tank", "liquid storage", "water storage", "chemical storage", "atmospheric vessel", "container", "fuel storage", "heavy-duty tank"],
  },
  {
    question: "Do you build vertical storage tanks?",
    answer: "Yes, we design and manufacture vertical storage tanks with conical, flat sloping, or torispherical dished bottom ends based on space availability.",
    category: "Storage Tanks",
    keywords: ["vertical", "vertical storage", "upright tank", "dished bottom", "conical bottom", "space saving", "vertical vessel", "standing tank"],
  },
  {
    question: "Do you fabricate horizontal storage tanks?",
    answer: "Yes, we roll and weld horizontal storage tanks fitted with heavy-duty Mild Steel (MS) or Stainless Steel (SS) saddle supports for ground stability.",
    category: "Storage Tanks",
    keywords: ["horizontal", "horizontal storage", "saddle support", "ground tank", "flat tank", "horizontal vessel", "rolling shells", "saddle layout"],
  },
  {
    question: "What is the maximum capacity of your storage tanks?",
    answer: "We custom fabricate storage tanks from 500 Liters up to 1,000,000 Liters, utilizing on-site welding crews for extra-large structural shells.",
    category: "Storage Tanks",
    keywords: ["maximum capacity", "tank size", "volume", "liters", "1,000,000 liters", "large scale", "on-site welding", "vessel capacity", "dimensions"],
  },
  {
    question: "Which steel grade is recommended for chemical storage?",
    answer: "We recommend SS 316 or SS 316L due to its superior molybdenum content, which prevents pitting and chemical corrosion.",
    category: "Storage Tanks",
    keywords: ["chemical storage", "grade recommendation", "ss316", "ss316l", "corrosion resistance", "molybdenum", "acid storage", "chemical medium"],
  },
  {
    question: "Can you insulate storage tanks?",
    answer: "Yes, we construct double-walled tanks insulated with polyurethane foam (PUF) or mineral wool, wrapped in a protective SS cladding cover.",
    category: "Storage Tanks",
    keywords: ["insulation", "insulated tank", "double wall", "puf", "polyurethane foam", "mineral wool", "cladding", "jacket insulation", "thermo control"],
  },
  {
    question: "Do you manufacture chemical storage tanks?",
    answer: "Yes, we build high-integrity chemical storage tanks matching specific chemical compatibility parameters, with safety nozzles and vents.",
    category: "Storage Tanks",
    keywords: ["chemical tanks", "corrosive chemical", "acid storage", "chemical compatibility", "safety vents", "chemical processing", "ss316l shells"],
  },
  {
    question: "What bottom profile options do you offer for vertical tanks?",
    answer: "We offer torispherical dished ends, ellipsoidal ends, conical bottom hoppers, and flat sloping bases to facilitate complete drainage.",
    category: "Storage Tanks",
    keywords: ["bottom profile", "dished end", "conical bottom", "flat bottom", "drainage base", "torispherical base", "ellipsoidal head", "vessel head"],
  },
  {
    question: "Do you provide level transmitters or indicators on tanks?",
    answer: "Yes, we offer magnetic float-level gauges, transparent glass tubes, or customized nozzles to install digital ultrasonic/radar level sensors.",
    category: "Storage Tanks",
    keywords: ["level indicator", "float gauge", "glass tube", "level transmitter", "ultrasonic sensor", "radar sensor", "level nozzle", "tank height level"],
  },
  {
    question: "What code rules govern your standard storage tanks?",
    answer: "We fabricate atmospheric storage tanks under API 650, IS 2007, or BS 2594 guidelines depending on the fluid properties.",
    category: "Storage Tanks",
    keywords: ["code standard", "api 650", "is 2007", "bs 2594", "atmospheric tank rules", "design standard", "industrial guidelines", "compliance"],
  },
  {
    question: "Do you build mild steel storage tanks?",
    answer: "Yes, we construct heavy-duty Mild Steel (MS) tanks for fuel, heavy hydrocarbons, or non-corrosive industrial water, finished with anti-rust epoxy coatings.",
    category: "Storage Tanks",
    keywords: ["mild steel", "ms storage", "fuel storage", "water storage", "epoxy coating", "anti-rust", "mild steel vessel", "heavy hydrocarbons"],
  },
  {
    question: "Are your storage tanks polished inside?",
    answer: "Yes, for food, dairy, and beverage industries, we grind the internal welds flush and mirror-polish the surface to Ra < 0.4 microns.",
    category: "Storage Tanks",
    keywords: ["polishing", "inner polish", "mirror finish", "ra rating", "sanitary polish", "smooth welds", "food grade", "dairy grade"],
  },
  {
    question: "What is the fabrication lead time for a standard 10,000L tank?",
    answer: "A standard 10,000L vertical SS storage tank takes approximately 3 to 4 weeks to fabricate, polish, and undergo hydrostatic testing.",
    category: "Storage Tanks",
    keywords: ["lead time", "10,000l tank", "delivery time", "fabrication period", "dispatch schedule", "hydrostatic test", "production speed"],
  },
  {
    question: "Do your storage tanks feature manholes?",
    answer: "Yes, all storage tanks are fitted with top-entry or side-wall circular or elliptical manholes (typically 500mm diameter) for inspection and cleaning.",
    category: "Storage Tanks",
    keywords: ["manhole", "inspection hatch", "cleaning port", "entry hatch", "elliptical manhole", "circular hatch", "maintenance access", "inspection"],
  },
  {
    question: "Do you design steel platforms and ladders for tanks?",
    answer: "Yes, we custom fabricate structural steel platforms, safety cages, access ladders, and handrails to integrate with your storage facility.",
    category: "Storage Tanks",
    keywords: ["platform", "ladder", "safety cage", "handrail", "access platform", "structural platform", "tank layout accessory", "catwalk"],
  },

  // --- Category: Milk Storage Tanks (10 FAQs) ---
  {
    question: "What is a milk storage tank?",
    answer: "A milk storage tank (silo) is a sanitary insulated vessel designed to store raw milk at dairy processing plants under 4°C to maintain freshness.",
    category: "Milk Storage Tanks",
    keywords: ["milk storage", "dairy silo", "sanitary vessel", "raw milk", "milk tank", "cold storage milk", "milk processing", "insulated dairy"],
  },
  {
    question: "How do you keep milk cold inside the tank?",
    answer: "We integrate dimple cooling jackets around the inner shell, allowing high-velocity circulation of chilled glycol or chilled water.",
    category: "Milk Storage Tanks",
    keywords: ["cooling milk", "glycol jacket", "dimple jacket", "chilled water", "cooling velocity", "glycol circulation", "milk temperature", "cooling"],
  },
  {
    question: "What insulation is used for dairy silos?",
    answer: "We use 75mm to 100mm of high-density injected polyurethane foam (PUF) insulation, protected by a fully welded SS outer cladding shell.",
    category: "Milk Storage Tanks",
    keywords: ["dairy insulation", "puf insulation", "polyurethane foam", "silo cladding", "double wall dairy", "insulation thickness", "silo insulation"],
  },
  {
    question: "What features make your milk tanks sanitary?",
    answer: "We use SS 304 or SS 316L, grind all inner welds flush, and mirror-polish the surface to Ra < 0.4μm to prevent bacterial attachment.",
    category: "Milk Storage Tanks",
    keywords: ["sanitary features", "ss304", "ss316l", "mirror polish", "ra rating", "hygienic design", "welds grinding", "clean-in-place compatible"],
  },
  {
    question: "Do your milk storage silos include agitators?",
    answer: "Yes, they include top-entry or side-entry sanitary agitators with slow-speed blades to keep milk fat evenly distributed without foaming.",
    category: "Milk Storage Tanks",
    keywords: ["agitator", "milk agitator", "slow speed blade", "mixing milk", "milk fat distribution", "non-foaming agitator", "sanitary impeller"],
  },
  {
    question: "What capacities do you support for dairy storage silos?",
    answer: "We custom fabricate sanitary milk storage silos and processing tanks ranging from 1,000 Liters up to 150,000 Liters capacity.",
    category: "Milk Storage Tanks",
    keywords: ["dairy capacity", "milk silo size", "silo capacity", "dairy processing volume", "150,000 liters", "custom dairy", "milk holding size"],
  },
  {
    question: "What is a dimple jacket on a milk tank?",
    answer: "A dimple jacket is a laser-welded SS sheet that forms dimple spaces for glycol coolant circulation, providing highly efficient heat transfer.",
    category: "Milk Storage Tanks",
    keywords: ["dimple jacket", "laser welded", "glycol coolant", "heat transfer", "cooling jacket design", "dimple sheets", "efficient cooling"],
  },
  {
    question: "Do you include CIP spray balls in milk storage tanks?",
    answer: "Yes, we install dual rotary or static CIP (Clean-In-Place) spray balls at the top of the tank to ensure complete automatic sanitary washing.",
    category: "Milk Storage Tanks",
    keywords: ["cip spray ball", "clean-in-place", "automatic washing", "sanitary cleaning", "rotary spray ball", "spray nozzles", "cleaning coverage"],
  },
  {
    question: "Which steel grade is used for dairy contact surfaces?",
    answer: "We use food-grade SS 304 as standard, but recommend SS 316L for highly acidic milk derivatives like cheese whey or yogurt processing.",
    category: "Milk Storage Tanks",
    keywords: ["dairy contact", "ss304 food grade", "ss316l whey", "cheese storage", "yogurt processing", "sanitary steel grade", "corrosion resistance"],
  },
  {
    question: "How do you test dairy storage tanks during QA?",
    answer: "We carry out pneumatic testing on the cooling jackets, dye-penetrant checks on all sanitary welds, and hydrostatic tests on the inner shell.",
    category: "Milk Storage Tanks",
    keywords: ["dairy QA", "dye-penetrant check", "pneumatic test", "jacket pressure test", "welding test", "hydrostatic test shell", "quality control"],
  },

  // --- Category: Silo Systems (10 FAQs) ---
  {
    question: "What is an industrial silo system?",
    answer: "An industrial silo is a high-capacity vertical vessel engineered to store dry bulk powders, grain, fly ash, cement, or plastic pellets.",
    category: "Silo Systems",
    keywords: ["industrial silo", "dry bulk storage", "cement silo", "grain storage", "vertical powder silo", "powder storage", "bulk materials"],
  },
  {
    question: "What discharge hopper angle do you use for powder silos?",
    answer: "We customize the conical bottom discharge hopper angle, typically 45 to 60 degrees, depending on the flow index of the stored dry material.",
    category: "Silo Systems",
    keywords: ["discharge angle", "conical hopper", "hopper slope", "powder flow", "gravity flow", "silo bottom slope", "discharge cone", "bridging control"],
  },
  {
    question: "Do you install bin activators on dry silos?",
    answer: "Yes, we integrate vibratory bin activators and fluidizing aeration pads at the discharge cone to prevent material bridging and rat-holing.",
    category: "Silo Systems",
    keywords: ["bin activator", "vibratory activator", "aeration pads", "fluidizing pads", "bridging prevention", "rat-holing prevention", "powder discharge"],
  },
  {
    question: "What is the maximum capacity of your dry silos?",
    answer: "We manufacture vertical dry material storage silos ranging in capacity from 10 Metric Tons (MT) up to 500 Metric Tons.",
    category: "Silo Systems",
    keywords: ["silo capacity", "metric tons", "500 MT", "silo tonnage", "dry silo volume", "large silo", "vertical silo scale", "powder capacity"],
  },
  {
    question: "Do you fabricate cement storage silos?",
    answer: "Yes, we manufacture heavy-duty steel cement silos complete with roof dust collectors, safety pressure valves, and pneumatic filling lines.",
    category: "Silo Systems",
    keywords: ["cement silo", "fly ash silo", "dust collector", "safety valve", "pneumatic filling", "heavy steel silo", "industrial cement storage"],
  },
  {
    question: "How are large silos transported to industrial sites?",
    answer: "Silos up to 80 Tons are shipped fully fabricated. Larger silos are rolled as shell panels and welded together on-site by our rigging crew.",
    category: "Silo Systems",
    keywords: ["silo transport", "shipping panels", "on-site assembly", "erection", "oversized transport", "welded panels", "silo rigging", "logistics"],
  },
  {
    question: "Do you provide dust filtration units on silos?",
    answer: "Yes, we fit our silos with top-mounted reverse-pulse jet bag filters to trap dust and release clean air during pneumatic loading.",
    category: "Silo Systems",
    keywords: ["dust filter", "pulse jet filter", "bag filter", "vent filter", "air emissions", "pneumatic loading exhaust", "dust collector", "silo filter"],
  },
  {
    question: "What level sensors are used in dry silos?",
    answer: "We install rotary paddle level switches for high/low point detection, radar level transmitters for continuous tracking, or load cells for weight.",
    category: "Silo Systems",
    keywords: ["level sensor", "paddle switch", "radar transmitter", "silo weight", "load cells", "continuous measurement", "powder level monitoring"],
  },
  {
    question: "What coating protects mild steel silos outdoors?",
    answer: "We perform external sandblasting, followed by high-build epoxy primer and a polyurethane (PU) finish coat for weather resistance.",
    category: "Silo Systems",
    keywords: ["coating", "epoxy primer", "polyurethane coat", "sandblasting", "weathering protection", "mild steel paint", "outdoor silo protection"],
  },
  {
    question: "Do your dry silos feature pressure relief valves?",
    answer: "Yes, we install double-acting pressure/vacuum relief safety valves on the silo roof to protect the structure during rapid loading or discharge.",
    category: "Silo Systems",
    keywords: ["relief valve", "pressure vacuum valve", "silo safety", "roof safety valve", "prevent collapse", "overpressure protection", "vacuum relief"],
  },

  // --- Category: Reactor Vessels (10 FAQs) ---
  {
    question: "What is an industrial reactor vessel?",
    answer: "A reactor vessel is a certified pressure vessel designed to contain chemical reactions, featuring motorized agitation, heating, and cooling.",
    category: "Reactor Vessels",
    keywords: ["reactor vessel", "chemical reactor", "pressure reactor", "chemical mixing", "thermal reactor", "motorized agitator", "industrial reactor"],
  },
  {
    question: "Do you fabricate jacketed chemical reactors?",
    answer: "Yes, we fabricate reactors fitted with limpet half-pipe coils, conventional plain jackets, or dimple jackets for heat transfer.",
    category: "Reactor Vessels",
    keywords: ["jacketed reactor", "limpet coil reactor", "half pipe limpet", "conventional jacket", "dimple jacket", "heating cooling reactor", "heat transfer"],
  },
  {
    question: "What design pressures do your reactors support?",
    answer: "We engineer reactors to operate under conditions ranging from full vacuum up to 45 Bar working pressure, matching ASME specifications.",
    category: "Reactor Vessels",
    keywords: ["design pressure", "reactor pressure", "45 bar", "full vacuum", "asme specs", "high pressure reactor", "pressure ratings", "vessel calculations"],
  },
  {
    question: "What shaft sealing options are available for reactor agitators?",
    answer: "We offer single mechanical seals, double mechanical seals with thermosyphon cooling systems, or magnetic couplings for zero-leakage.",
    category: "Reactor Vessels",
    keywords: ["shaft seal", "mechanical seal", "double mechanical seal", "magnetic coupling", "zero leakage", "thermosyphon", "agitator sealing", "gasket"],
  },
  {
    question: "What type of agitator impellers do you supply?",
    answer: "We supply anchor, hydrofoil, pitch blade turbine, paddle, and high-shear cowles disperser impellers tailored to fluid viscosity.",
    category: "Reactor Vessels",
    keywords: ["impeller", "agitator blade", "anchor impeller", "pitch blade", "cowles disperser", "mixing turbine", "viscosity matching", "reactor agitation"],
  },
  {
    question: "Do you construct pharmaceutical reactors?",
    answer: "Yes, we construct sanitary SS 316L reactors with orbital welding, internal electro-polishing (Ra < 0.25μm), and zero-dead-leg bottom flush valves.",
    category: "Reactor Vessels",
    keywords: ["pharma reactor", "ss316l pharma", "orbital welding", "electro-polishing", "zero-dead-leg valve", "sterile reactor", "sanitary design"],
  },
  {
    question: "What is a half-pipe limpet coil jacket?",
    answer: "A limpet jacket is a half-pipe split wrapped spirally around the reactor, welded to guide hot thermic oil, steam, or cooling glycol under pressure.",
    category: "Reactor Vessels",
    keywords: ["limpet jacket", "half-pipe coil", "spiral jacket", "hot thermic oil", "steam heating", "jacket welding", "heat transfer surface"],
  },
  {
    question: "What is the typical manufacturing lead time for a reactor?",
    answer: "Custom-jacketed reactors require 6 to 8 weeks for mechanical calculations, rolling, code welding, seal assembly, and pressure certification.",
    category: "Reactor Vessels",
    keywords: ["reactor lead time", "manufacturing period", "6 to 8 weeks", "pressure certification", "seal assembly", "reactor dispatch", "production"],
  },
  {
    question: "Do you perform radiography testing on reactor welds?",
    answer: "Yes, we carry out 100% radiographic (X-ray) testing on all longitudinal and circumferential pressure welds to ensure ASME compliance.",
    category: "Reactor Vessels",
    keywords: ["radiography testing", "x-ray weld", "pressure weld inspection", "weld integrity", "asme weld test", "quality control reactor", "non-destructive"],
  },
  {
    question: "Can your reactor motors run in hazardous areas?",
    answer: "Yes, we supply flame-proof (FLP) and explosion-proof (ATEX/Ex-certified) motors and gearboxes for reactors operating with solvent vapor.",
    category: "Reactor Vessels",
    keywords: ["flame proof motor", "explosion proof", "atex motor", "gearbox flp", "solvent processing", "hazardous area reactor", "electrical safety"],
  },

  // --- Category: Mixing Tanks (5 FAQs) ---
  {
    question: "What is an industrial mixing tank?",
    answer: "A mixing tank is a vessel designed to blend, disperse, or homogenize multiple liquid, solid, or powder ingredients using an active agitator.",
    category: "Mixing Tanks",
    keywords: ["mixing tank", "blending vessel", "homogenize liquid", "active agitator", "industrial blender", "emulsify", "ingredient mixing"],
  },
  {
    question: "Do you manufacture high-shear mixing vessels?",
    answer: "Yes, we construct mixing vessels equipped with bottom-mounted high-shear homogenizers to blend viscous ointments, syrups, or emulsions.",
    category: "Mixing Tanks",
    keywords: ["high shear", "homogenizer", "viscous mixing", "emulsion vessel", "bottom homogenizer", "shear head", "ointment mixing", "syrup mixing"],
  },
  {
    question: "Can mixing tanks be fitted with heating jackets?",
    answer: "Yes, we customize mixing tanks with steam conventional jackets or electrical heating elements to maintain temperature during blending.",
    category: "Mixing Tanks",
    keywords: ["heating mixing", "steam jacket", "electrical heating", "blend temperature", "jacketed mixing", "thermal blending", "heaters"],
  },
  {
    question: "What capacity range do you offer for mixing tanks?",
    answer: "We fabricate industrial mixing tanks in capacities ranging from 100 Liters up to 50,000 Liters.",
    category: "Mixing Tanks",
    keywords: ["mixing capacity", "tank volume", "100 liters", "50,000 liters", "mixing vessel scale", "custom batch tank", "batch mixer size"],
  },
  {
    question: "Do you build sanitary food-grade mixing tanks?",
    answer: "Yes, we construct food-grade mixing tanks utilizing mirror-polished SS 304/316L, sanitary tri-clover nozzle connections, and CIP spray nozzles.",
    category: "Mixing Tanks",
    keywords: ["food grade mixing", "food-grade mixer", "mirror polish ss", "tri-clover nozzles", "cip spray", "sanitary blending", "food processing"],
  },

  // --- Category: Jacketed Vessels (5 FAQs) ---
  {
    question: "What is a jacketed vessel?",
    answer: "A jacketed vessel is a storage or process tank wrapped in an outer jacket sleeve that circulates heat-transfer fluids to regulate internal temperatures.",
    category: "Jacketed Vessels",
    keywords: ["jacketed vessel", "jacketed tank", "outer sleeve", "heat transfer fluid", "temperature regulation", "jacket circulation", "thermal jacket"],
  },
  {
    question: "What types of jackets do you roll and weld?",
    answer: "We roll and weld three jacket styles: conventional plain utility jackets, spiral half-pipe limpet coils, and laser-welded dimple sheets.",
    category: "Jacketed Vessels",
    keywords: ["jacket types", "conventional jacket", "limpet coil", "dimple sheet", "utility jacket", "welded sleeve", "heating jacket styles"],
  },
  {
    question: "When should I choose a limpet jacket over a dimple jacket?",
    answer: "Choose a half-pipe limpet jacket for high-pressure steam or thermic oil heating. Choose a dimple jacket for efficient low-pressure glycol cooling.",
    category: "Jacketed Vessels",
    keywords: ["limpet vs dimple", "limpet pressure", "thermic oil heating", "glycol cooling", "steam jacket", "cooling efficiency", "jacket selection"],
  },
  {
    question: "How do you insulate a jacketed vessel?",
    answer: "We wrap the jacket in high-density polyurethane foam (PUF) or glass mineral wool, and seal it with an outer sheet cladding of mirror-finish SS 304.",
    category: "Jacketed Vessels",
    keywords: ["jacket insulation", "puf wrapping", "mineral wool", "outer cladding", "cladding seal", "insulating jacket", "vessel outer cover"],
  },
  {
    question: "What pressure testing do your jackets undergo?",
    answer: "All jackets undergo hydrostatic pressure testing at 1.5 times the design pressure, pneumatic leak testing, and dye-penetrant check of boundary welds.",
    category: "Jacketed Vessels",
    keywords: ["jacket testing", "hydrostatic jacket", "design pressure", "pneumatic leak check", "weld dye-penetrant", "safety verification", "jacket qc"],
  },

  // --- Category: Pressure Vessels (5 FAQs) ---
  {
    question: "What is an ASME pressure vessel?",
    answer: "An ASME pressure vessel is a certified container designed to safely store or process gases and liquids at pressure levels above 15 PSI.",
    category: "Pressure Vessels",
    keywords: ["pressure vessel", "asme vessel", "certified container", "high pressure storage", "asme section viii", "compressed gas", "pressure limit"],
  },
  {
    question: "Do you manufacture compressed air receiver tanks?",
    answer: "Yes, we design and manufacture vertical and horizontal air receivers, fully hydro-tested up to 50 Bar for industrial utility lines.",
    category: "Pressure Vessels",
    keywords: ["air receiver", "compressed air tank", "receiver vessel", "50 bar receiver", "vertical air tank", "compressed utility", "utility receiver"],
  },
  {
    question: "What codes govern your pressure vessel calculations?",
    answer: "We perform stress and thickness calculations under ASME Section VIII Division 1, IS 2825, or PD 5500 depending on customer requirements.",
    category: "Pressure Vessels",
    keywords: ["calculations code", "asme section viii", "is 2825", "pd 5500", "stress calculations", "shell thickness design", "safety factor"],
  },
  {
    question: "What shell thickness can your rolling machines support?",
    answer: "Our heavy plate rolling machines can support carbon steel and stainless steel sheets up to 24mm thickness for heavy pressure shells.",
    category: "Pressure Vessels",
    keywords: ["shell thickness", "rolling capacity", "24mm thickness", "plate rolling", "heavy rolling machine", "heavy steel shell", "thick plate rolling"],
  },
  {
    question: "Do you provide third-party inspector certification for pressure vessels?",
    answer: "Yes, we coordinate pressure tests and material heat certifications under inspections by TUV, SGS, Lloyds, or Bureau Veritas.",
    category: "Pressure Vessels",
    keywords: ["third party inspection", "tuv inspector", "sgs certification", "lloyds test", "bureau veritas", "material heat cert", "vessel signoff"],
  },

  // --- Category: Brewery Tanks (3 FAQs) ---
  {
    question: "What brewery tanks do you manufacture?",
    answer: "We manufacture sanitarily polished stainless steel fermentation tanks, bright beer conditioning vessels (BBT), and hot/cold liquor utility tanks.",
    category: "Brewery Tanks",
    keywords: ["brewery tanks", "fermenter", "bright beer tank", "bbt", "liquor tank", "brewhouse vessels", "beer fermentation", "stainless steel brewing"],
  },
  {
    question: "How do you control temperature in beer fermentation tanks?",
    answer: "We weld dual-zone dimple cooling jackets on the cone and side shell, allowing digital temperature probes to regulate glycol flow.",
    category: "Brewery Tanks",
    keywords: ["fermentation temperature", "dimple cooling jacket", "glycol regulation", "thermal probe", "brewery cooling", "yeast temperature", "cone cooling"],
  },
  {
    question: "Are your brewing vessels mirror-polished?",
    answer: "Yes, we mirror-polish the sanitary contact surfaces of all fermentation and bright beer tanks to Ra < 0.4 microns to prevent bacterial contamination.",
    category: "Brewery Tanks",
    keywords: ["brewing polish", "mirror finish brewing", "ra rating", "sanitary brewing", "prevent contamination", "sterile fermenter", "smooth welds"],
  },

  // --- Category: Underground Oil Storage Tanks (2 FAQs) ---
  {
    question: "Do you build underground fuel storage tanks?",
    answer: "Yes, we manufacture double-walled underground oil and fuel storage tanks complete with leakage monitoring nozzles.",
    category: "Underground Oil Storage Tanks",
    keywords: ["underground tank", "fuel storage", "oil storage", "double walled", "leakage monitoring", "underground fuel", "petroleum storage"],
  },
  {
    question: "How do you protect underground tanks from soil corrosion?",
    answer: "We apply sandblasting, followed by thick coatings of solvent-free coal-tar epoxy or wrapping in fiber-reinforced plastic (FRP) barriers.",
    category: "Underground Oil Storage Tanks",
    keywords: ["underground protection", "soil corrosion", "coal-tar epoxy", "frp wrap", "sandblasting", "external barrier", "underground tank coating"]
  }
];

// Connection & Seeding script execution
const seedFaqs = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/grf_dynamic";

    console.log(`Connecting to MongoDB at: ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log("Database connected successfully.");

    console.log("Clearing all existing database FAQs...");
    await FAQ.deleteMany({});
    console.log("Database FAQs cleared.");

    console.log(`Inserting ${faqsData.length} production-ready FAQs...`);
    const inserted = await FAQ.insertMany(faqsData);
    console.log(`Successfully seeded ${inserted.length} FAQs in the database!`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding operation failed:", error.message);
    process.exit(1);
  }
};

seedFaqs();