
import React from 'react';

interface LatexModalProps {
  code: string;
  onClose: () => void;
}

export const LatexModal: React.FC<LatexModalProps> = ({ code, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Overleaf LaTeX Code</h2>
            <p className="text-sm text-slate-500">Copy this code and paste it into a new .tex file on Overleaf</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-6 bg-slate-900 font-mono text-sm relative">
          <pre className="text-slate-300 whitespace-pre-wrap">{code}</pre>
          <button 
            onClick={copyToClipboard}
            className={`fixed bottom-24 right-12 md:absolute md:bottom-8 md:right-8 flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-xl transition-all ${
              copied ? 'bg-green-500 text-white scale-105' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Code
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-white border-t flex justify-center gap-4">
           <a 
             href="https://www.overleaf.com/project" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-indigo-600 hover:underline text-sm font-medium"
           >
             Go to Overleaf Projects →
           </a>
        </div>
      </div>
    </div>
  );
};
