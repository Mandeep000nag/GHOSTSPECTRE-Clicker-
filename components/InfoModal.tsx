
import React from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-game font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">
            Connect & Support
          </h2>
          
          <div className="space-y-3">
            <a 
              href="https://share.google/tC7B9FXvD5TSQwUAg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-100 dark:border-slate-700"
            >
              <span className="text-2xl">📍</span>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-500 uppercase">Google Maps</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Visit Location</p>
              </div>
            </a>

            <a 
              href="https://instagram.com/Mandeep_4501" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-100 dark:border-slate-700"
            >
              <span className="text-2xl">📸</span>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-500 uppercase">Instagram</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">@Mandeep_4501</p>
              </div>
            </a>

            <a 
              href="mailto:simar00001111@gmail.com"
              className="flex items-center gap-4 p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-100 dark:border-red-900/30"
            >
              <span className="text-2xl">📧</span>
              <div className="text-left">
                <p className="text-xs font-bold text-red-500 uppercase">Report Abuse</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Contact Support</p>
              </div>
            </a>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
