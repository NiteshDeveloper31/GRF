import React, { useState, useEffect, useRef } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! Welcome to G R F Dynamic Engineering. I am your virtual assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_URL || "https://grf-8fnl.onrender.com/api";

  const suggestedQuestions = [
    { label: "Lead Time", query: "What is your manufacturing lead time?" },
    { label: "ASME Codes", query: "Do you supply third-party testing and certifications?" },
    { label: "Products Range", query: "What products and equipment categories do you offer?" },
    { label: "Contact Info", query: "How can I contact GRF Dynamic Engineering?" },
    { label: "Office Address", query: "What is your office address and working hours?" },
    { label: "Custom Vessels", query: "Do you build custom size or custom capacity vessels?" },
  ];

  // Auto scroll to bottom when messages list updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const startTime = Date.now();
      const response = await fetch(`${apiUrl}/faqs/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      // Enforce a minimum typing indicator delay of 1000ms
      const elapsedTime = Date.now() - startTime;
      const minDelay = 2000;
      if (elapsedTime < minDelay) {
        await new Promise((resolve) => setTimeout(resolve, minDelay - elapsedTime));
      }

      // Add bot message response
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.answer || "Sorry, I encountered an issue processing your request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      // Wait for remaining delay even on error so it doesn't instantly flash
      await new Promise((resolve) => setTimeout(resolve, 800));

      const errorMsg = {
        id: `bot-err-${Date.now()}`,
        sender: "bot",
        text: "I'm having trouble connecting to the server right now. You can reach our sales team directly at grfdynamicengineering@gmail.com or call +91 95575 30193.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed z-40" style={{ right: "24px", bottom: "88px" }}>
      {/* 1. Floating Chat Trigger Button */}
      {!isOpen && (
        <div className="relative">
          {/* Pulsing ring background */}
          <span className="absolute inset-0 rounded-full bg-brand-accent opacity-70 animate-ping pointer-events-none"></span>

          <button
            onClick={() => setIsOpen(true)}
            type="button"
            title="Chat with virtual assistant"
            className="relative flex items-center justify-center w-14 h-14 bg-brand-accent hover:brightness-110 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none border border-white/10 group"
          >
            {/* Chat Icon */}
            <svg
              className="w-7 h-7 text-white transition-transform duration-300 group-hover:rotate-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        </div>
      )}

      {/* 2. Chatbot Popup Panel */}
      {isOpen && (
        <div className="glass-panel w-[350px] sm:w-[380px] h-[500px] rounded-sm shadow-2xl flex flex-col overflow-hidden animate-scaleUp text-left border border-white/10">

          {/* Header */}
          <div className="p-4 bg-brand-charcoal/90 border-b border-white/10 flex justify-between items-center shrink-0" style={{ borderBottomColor: "rgba(2, 132, 199, 0.15)" }}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center">
                <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="heading-font text-xs font-bold text-white uppercase tracking-wider">
                  GRF Assistant
                </h3>
                <span className="flex items-center gap-1.5 text-[9px] text-emerald-500 font-mono font-semibold uppercase mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages List Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-brand-charcoal/20 select-text">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-sm text-xs sm:text-xs leading-relaxed ${msg.sender === "user"
                    ? "bg-brand-accent text-white shadow-md shadow-brand-accent/5 font-medium"
                    : "bg-brand-charcoal border border-white/5 text-slate-300"
                    }`}
                  style={
                    msg.sender === "bot"
                      ? {
                        backgroundColor: "var(--color-card-bg)",
                        borderColor: "rgba(2, 132, 199, 0.12)",
                        color: "var(--color-white-text)",
                      }
                      : {}
                  }
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[7px] mt-1.5 text-right font-mono ${msg.sender === "user" ? "text-white/60" : "text-slate-500"
                      }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-sm bg-brand-charcoal border border-white/5 flex items-center space-x-1.5"
                  style={{
                    backgroundColor: "var(--color-card-bg)",
                    borderColor: "rgba(2, 132, 199, 0.12)",
                  }}
                >
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Chips (Funnels keywords without typing) */}
          <div className="px-4 py-2 bg-brand-charcoal/40 border-t border-white/5 flex gap-2 overflow-x-auto shrink-0 scrollbar-none" style={{ borderTopColor: "rgba(2, 132, 199, 0.1)" }}>
            {suggestedQuestions.map((sq, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(sq.query)}
                className="whitespace-nowrap bg-brand-charcoal hover:bg-brand-steel border border-white/5 text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-white px-3 py-1.5 rounded-sm transition-all cursor-pointer shadow-sm"
                style={{
                  backgroundColor: "var(--color-card-bg)",
                  borderColor: "rgba(2, 132, 199, 0.15)",
                  color: "var(--color-accent)",
                }}
              >
                {sq.label}
              </button>
            ))}
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 bg-brand-charcoal border-t border-white/10 flex items-center gap-2.5 shrink-0" style={{ borderTopColor: "rgba(2, 132, 199, 0.15)" }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="flex-1 bg-brand-obsidian text-xs text-white px-3.5 py-2.5 rounded-sm outline-none border border-white/5 focus:border-brand-accent transition-all placeholder-slate-500"
              style={{
                backgroundColor: "var(--color-bg)",
                borderColor: "rgba(15, 23, 42, 0.1)",
                color: "var(--color-white-text)",
              }}
              disabled={isLoading}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 disabled:opacity-50 text-white rounded-sm transition-all cursor-pointer shrink-0 shadow-md active:scale-95 flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
