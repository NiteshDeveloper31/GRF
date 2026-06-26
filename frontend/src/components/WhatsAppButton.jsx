import React from 'react';

export default function WhatsAppButton() {
  const handleClick = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    try {
      // Fire-and-forget click analytics tracking
      fetch(`${apiUrl}/analytics/whatsapp-click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }).catch(e => console.warn('Analytics failed:', e));
    } catch (err) {
      console.warn('Analytics error:', err);
    }

    const whatsappUrl = 'https://wa.me/919557530193?text=Hello%20GRF%20Dynamic%20Engineering,%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20inquire%20about%20your%20process%20equipment.';
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulsing ring background */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none"></span>
      
      <button
        onClick={handleClick}
        type="button"
        title="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none border border-white/10 group"
      >
        {/* WhatsApp Icon */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-8 h-8 fill-current text-white transition-transform duration-300 group-hover:rotate-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hollow white outline bubble & handset */}
          <path d="M12.004 2C6.479 2 2 6.479 2 12.004c0 1.906.529 3.68 1.442 5.201L2 22l5.176-1.356c1.472.802 3.125 1.22 4.814 1.22 5.526 0 10.005-4.479 10.005-10.004C22.009 6.479 17.53 2 12.004 2zm0 1.796c4.524 0 8.208 3.684 8.208 8.208 0 4.525-3.684 8.208-8.208 8.208-1.542 0-3.05-.434-4.366-1.251l-.313-.197-3.245.852.866-3.161-.215-.343a8.174 8.174 0 0 1-1.246-4.316c0-4.524 3.684-8.208 8.208-8.208zm4.581 10.3c-.252-.126-1.488-.734-1.716-.818-.228-.084-.395-.126-.562.126-.168.252-.65 1.05-.798 1.218-.148.168-.297.189-.548.063a7.018 7.018 0 0 1-2.03-1.254 7.747 7.747 0 0 1-1.407-1.752c-.148-.252-.016-.388.11-.514.113-.113.252-.294.378-.44.126-.148.168-.253.252-.42.084-.168.042-.315-.021-.441-.063-.126-.562-1.357-.77-1.859-.202-.487-.407-.42-.562-.428h-.481c-.168 0-.441.063-.672.315-.231.252-.882.861-.882 2.1s.903 2.436 1.029 2.604c.126.168 1.776 2.713 4.3 3.8a14.394 14.394 0 0 0 1.436.529c.602.191 1.15.164 1.583.1.483-.071 1.488-.609 1.697-1.197.21-.588.21-1.092.147-1.197-.063-.105-.231-.168-.483-.294z" />
        </svg>
      </button>
    </div>
  );
}
