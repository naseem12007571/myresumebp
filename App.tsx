
import React, { useState } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { LatexModal } from './components/LatexModal';
import { INITIAL_DATA, THEMES } from './constants';
import { ResumeData, ThemeConfig } from './types';
import { generateLatex } from './services/latexService';

// Extend window for html2pdf global
declare global {
  interface Window {
    html2pdf: any;
  }
}

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA);
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(THEMES.classic);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLatex, setShowLatex] = useState(false);
  const [latexCode, setLatexCode] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    const element = document.getElementById('resume-content');
    if (!element) return;

    setIsDownloading(true);
    const opt = {
      margin: 0,
      filename: `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await window.html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF Download failed:", err);
      // Fallback to print
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleExportLatex = () => {
    const code = generateLatex(resumeData);
    setLatexCode(code);
    setShowLatex(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navbar */}
      <header className="no-print h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">ResumeAI Pro</h1>
            <p className="text-xs text-slate-500 font-medium">Smart Professional Builder</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 mr-4 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
            {Object.entries(THEMES).map(([name, theme]) => (
              <button
                key={name}
                onClick={() => setCurrentTheme(theme)}
                className={`w-8 h-8 rounded-md border-2 transition-all ${
                  currentTheme === theme ? 'border-white ring-2 ring-indigo-500 scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: theme.primaryColor }}
                title={name}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleExportLatex}
              className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition shadow-sm font-semibold text-sm"
              title="Export LaTeX for Overleaf"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5 3L11.5 17.5M11.5 17.5L6 12M11.5 17.5L17 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              Overleaf Code
            </button>

            <button 
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className={`flex items-center gap-2 ${isDownloading ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-5 py-2.5 rounded-lg transition shadow-md font-semibold text-sm`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </button>
          </div>

          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-sm font-medium text-slate-400 hover:text-slate-800 hidden md:block ml-2"
          >
            {isSidebarOpen ? 'Hide' : 'Edit'}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar Editor */}
        <aside 
          className={`no-print transition-all duration-300 ease-in-out bg-white border-r border-slate-200 overflow-y-auto custom-scrollbar ${
            isSidebarOpen ? 'w-full md:w-[450px]' : 'w-0 overflow-hidden'
          }`}
        >
          <Editor data={resumeData} onChange={setResumeData} />
        </aside>

        {/* Live Preview Area */}
        <section className={`flex-1 flex flex-col overflow-y-auto p-4 md:p-12 items-center bg-slate-100 ${!isSidebarOpen && 'w-full'}`}>
          <div className="transform scale-[0.6] md:scale-[0.7] lg:scale-[0.85] xl:scale-100 origin-top">
            <Preview data={resumeData} theme={currentTheme} />
          </div>
        </section>
      </main>

      {showLatex && (
        <LatexModal code={latexCode} onClose={() => setShowLatex(false)} />
      )}
    </div>
  );
};

export default App;
