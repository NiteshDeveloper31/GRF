import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { faqsApi } from "../api/api";
import { useToast } from "../context/ToastContext";
import {
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  HelpCircle,
  X,
  Search,
  Tag
} from "lucide-react";

export default function FAQs() {
  const { showToast } = useToast();

  // Lifted States from AppLayout Outlet Context
  const {
    faqs, setFaqs,
    faqsLoading: loading, setFaqsLoading: setLoading,
    faqsError: error, setFaqsError: setError
  } = useOutletContext();

  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null); // Null for Add, FAQ object for Edit
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    keywordsString: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchFaqs = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
        setError(null);
      }
      const data = await faqsApi.getAll();
      setFaqs(data);
    } catch (err) {
      console.error(err);
      if (showLoading && faqs.length === 0) {
        setError("Failed to fetch FAQ catalog.");
      }
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    if (faqs.length === 0) {
      fetchFaqs(true);
    } else {
      // Revalidate silently in the background
      fetchFaqs(false);
    }
  }, []);

  const handleOpenAdd = () => {
    setCurrentFaq(null);
    setFormData({
      question: "",
      answer: "",
      category: "General",
      keywordsString: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setCurrentFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "General",
      keywordsString: faq.keywords ? faq.keywords.join(", ") : "",
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      showToast("Question and Answer are required.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        category: formData.category,
        keywords: formData.keywordsString
          .split(",")
          .map((k) => k.trim().toLowerCase())
          .filter((k) => k !== ""),
      };

      if (currentFaq) {
        // Edit mode
        const updated = await faqsApi.update(currentFaq._id, payload);
        setFaqs(faqs.map((f) => (f._id === currentFaq._id ? updated : f)));
        showToast("FAQ updated successfully.", "success");
      } else {
        // Add mode
        const created = await faqsApi.create(payload);
        setFaqs([created, ...faqs]);
        showToast("New FAQ added successfully.", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      showToast(
        err.response?.data?.message || "Failed to record FAQ data.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const triggerDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await faqsApi.delete(deleteId);
      setFaqs(faqs.filter((f) => f._id !== deleteId));
      showToast("FAQ deleted successfully.", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete FAQ.", "error");
    } finally {
      setDeleteId(null);
    }
  };

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.keywords?.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.04] pb-5">
        <div>
          <h1 className="heading-font text-2xl font-black text-white uppercase tracking-wider">
            FAQ & Chatbot Manager
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Train your chatbot assistant, configure question keywords, and edit responses
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white px-5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-brand-accent/15 flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
        >
          <Plus size={16} />
          <span>Add New FAQ</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-sm p-4 flex items-center space-x-3 text-red-200">
          <AlertCircle size={18} className="shrink-0 text-red-400" />
          <span className="text-xs font-mono">{error}</span>
        </div>
      )}

      {/* Filters & Statistics bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-brand-charcoal/50 border border-white/5 rounded-sm p-4">
        {/* Search bar */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search questions, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-obsidian text-slate-200 text-xs border border-white/5 focus:border-brand-accent px-9 py-3.5 rounded-sm outline-none transition-all placeholder-slate-500"
          />
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <div className="flex gap-6 text-xs text-slate-500 font-mono uppercase">
          <span>Seeded: <strong className="text-white">6 items</strong></span>
          <span>Matched: <strong className="text-brand-accent">{filteredFaqs.length} / {faqs.length} FAQs</strong></span>
        </div>
      </div>

      {/* List content */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-accent mb-3"></div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Accessing chatbot memory...</span>
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/5 rounded-sm bg-brand-charcoal/20">
          <HelpCircle size={40} className="mx-auto text-slate-600 mb-3" />
          <h3 className="heading-font text-sm text-slate-400 uppercase font-bold tracking-wider">No FAQs Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
            {searchQuery
              ? "No items matched your current search filters. Try clearing your queries."
              : "No custom FAQs created yet. The Chatbot will rely on the default pre-seeded system responses."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredFaqs.map((faq) => (
            <div
              key={faq._id}
              className="bg-brand-charcoal border border-white/5 hover:border-brand-accent/20 rounded-sm p-6 flex flex-col justify-between transition-all duration-300 relative group shadow-lg"
            >
              {/* Category bracket */}
              <div className="absolute top-0 right-0 border-t border-r border-brand-accent/15 w-8 h-8 group-hover:border-brand-accent/30 transition-colors"></div>
              
              <div className="flex flex-col md:flex-row gap-5 items-start justify-between">
                <div className="space-y-3.5 flex-1 pr-6">
                  {/* Category Pill */}
                  <div>
                    <span className="inline-block bg-brand-accent/5 border border-brand-accent/20 text-brand-accent text-[9px] font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-widest">
                      {faq.category || "General"}
                    </span>
                  </div>

                  <h3 className="heading-font text-white text-base sm:text-lg font-bold leading-snug uppercase tracking-wide">
                    Q: {faq.question}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    <strong>A:</strong> {faq.answer}
                  </p>

                  {/* Keywords list */}
                  {faq.keywords && faq.keywords.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                      <Tag size={10} className="text-slate-500" />
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mr-1">Trigger Keywords:</span>
                      {faq.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="bg-white/[0.02] border border-white/5 text-slate-400 text-[8px] font-mono px-2 py-0.5 rounded-xs"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* CRUD button actions */}
                <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto border-t border-white/[0.04] md:border-none pt-4 md:pt-0">
                  <button
                    onClick={() => handleOpenEdit(faq)}
                    className="flex-1 md:flex-none border border-white/5 hover:border-brand-accent text-slate-400 hover:text-brand-accent p-2 rounded-sm text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer bg-white/[0.01]"
                    title="Edit response"
                  >
                    <Edit2 size={13} />
                    <span className="md:hidden lg:inline text-[9px] tracking-wider uppercase">Edit</span>
                  </button>
                  <button
                    onClick={() => triggerDelete(faq._id)}
                    className="flex-1 md:flex-none border border-white/5 hover:border-red-500 text-slate-400 hover:text-red-400 p-2 rounded-sm text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer bg-white/[0.01]"
                    title="Remove response"
                  >
                    <Trash2 size={13} />
                    <span className="md:hidden lg:inline text-[9px] tracking-wider uppercase">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. CRUD Add / Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-brand-charcoal border border-white/10 rounded-sm p-6 sm:p-8 max-w-xl w-full text-left shadow-2xl relative animate-scaleUp">
            
            {/* Design accents */}
            <div className="absolute top-2 left-2 border-t border-l border-brand-accent/30 w-4 h-4"></div>
            <div className="absolute top-2 right-2 border-t border-r border-brand-accent/30 w-4 h-4"></div>
            
            <div className="flex justify-between items-center border-b border-white/[0.04] pb-4 mb-6">
              <h2 className="heading-font text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                {currentFaq ? "Edit FAQ Specification" : "Add Chatbot Training FAQ"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-sm text-slate-500 hover:text-white hover:bg-white/[0.02]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              {/* Question */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Chatbot Question <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleFormChange}
                  className="w-full bg-brand-obsidian border border-white/5 focus:border-brand-accent text-slate-200 text-xs px-4 py-3 rounded-sm outline-none transition-all placeholder-slate-600"
                  placeholder="e.g., What is your manufacturing lead time?"
                  required
                />
              </div>

              {/* Answer */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Chatbot Response Answer <span className="text-brand-accent">*</span>
                </label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full bg-brand-obsidian border border-white/5 focus:border-brand-accent text-slate-200 text-xs px-4 py-3 rounded-sm outline-none transition-all placeholder-slate-600 resize-none"
                  placeholder="Provide the exact answer the chatbot should say..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Category Group
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full bg-brand-obsidian border border-white/5 focus:border-brand-accent text-slate-300 text-xs px-4 py-3.5 rounded-sm outline-none transition-all cursor-pointer"
                  >
                    <option value="General">General Info</option>
                    <option value="Products">Products</option>
                    <option value="Location">Location</option>
                    <option value="Contact">Contact</option>
                    <option value="Shipping & Production">Shipping & Production</option>
                    <option value="Quality Control">Quality Control</option>
                    <option value="Custom Design">Custom Design</option>
                  </select>
                </div>

                {/* Keywords */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                    <span>Trigger Keywords</span>
                    <span className="text-[8px] font-normal text-slate-600 lowercase font-mono">comma separated</span>
                  </label>
                  <input
                    type="text"
                    name="keywordsString"
                    value={formData.keywordsString}
                    onChange={handleFormChange}
                    className="w-full bg-brand-obsidian border border-white/5 focus:border-brand-accent text-slate-200 text-xs px-4 py-3.5 rounded-sm outline-none transition-all placeholder-slate-600"
                    placeholder="e.g., lead time, delivery, weeks, duration"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="flex gap-4 pt-4 border-t border-white/[0.04] mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border border-white/10 hover:border-white text-slate-300 hover:text-white py-3 rounded-sm font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 disabled:opacity-50 text-white py-3 rounded-sm font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer shadow-md shadow-brand-accent/15"
                >
                  {submitting ? "Saving..." : currentFaq ? "Save Changes" : "Create FAQ"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 4. Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-brand-charcoal border border-white/10 rounded-sm p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl relative animate-scaleUp">
            
            <div className="absolute top-2 left-2 border-t border-l border-red-500/20 w-4 h-4"></div>
            <div className="absolute top-2 right-2 border-t border-r border-red-500/20 w-4 h-4"></div>
            
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-950/20 border border-red-900/50 text-red-500 mb-4 shadow-inner animate-pulse">
              <AlertCircle size={20} />
            </div>

            <h3 className="heading-font text-white text-base font-bold uppercase tracking-wider mb-2">
              Delete FAQ Specification?
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-light">
              Are you sure you want to delete this FAQ specification? The chatbot will no longer match questions with this response.
            </p>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-white/10 hover:border-white text-slate-300 hover:text-white py-2.5 rounded-sm font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-sm font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer shadow-md shadow-red-900/25"
              >
                Delete FAQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
