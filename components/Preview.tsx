
import React from 'react';
import { ResumeData, ThemeConfig } from '../types';
import { SectionHeader } from './SectionHeader';

interface PreviewProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const Preview: React.FC<PreviewProps> = ({ data, theme }) => {
  return (
    <div id="resume-content" className="resume-page p-0 flex flex-col font-sans text-slate-800 overflow-hidden print:shadow-none bg-white">
      {/* Header Band */}
      <header 
        className="w-full py-8 px-8 flex flex-col items-center justify-center text-center"
        style={{ backgroundColor: theme.primaryColor, color: theme.headerTextColor }}
      >
        <h1 className="text-4xl font-bold mb-3 tracking-tight leading-tight uppercase">
          {data.personal.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs opacity-90 font-medium">
          <span>{data.personal.location}</span>
          <span>•</span>
          <span>{data.personal.phone}</span>
          <span>•</span>
          <span>{data.personal.email}</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-10 py-8 overflow-hidden">
        
        {/* Summary */}
        {data.personal.summary && (
          <section className="mb-6">
            <SectionHeader title="Summary" color={theme.accentColor} />
            <p className="text-[12.5px] leading-relaxed text-justify">
              {data.personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-6">
            <SectionHeader title="Experience" color={theme.accentColor} />
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-[14px] uppercase">{exp.role}</h3>
                    <span className="text-[12px] font-medium text-slate-500">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-[12px] font-bold text-slate-600 mb-1 italic">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  <ul className="list-disc ml-5 space-y-0.5">
                    {exp.description.filter(p => p.trim() !== '').map((point, idx) => (
                      <li key={idx} className="text-[12px] leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-6">
            <SectionHeader title="Skills" color={theme.accentColor} />
            <div className="grid grid-cols-2 gap-x-8 gap-y-0.5">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center text-[12px]">
                  <span className="mr-2 text-slate-400">•</span>
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-6">
            <SectionHeader title="Education" color={theme.accentColor} />
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-[14px] text-slate-700">{edu.school}</h3>
                    <span className="text-[12px] font-medium text-slate-500">{edu.graduationDate}</span>
                  </div>
                  <div className="text-[12px] font-semibold text-slate-600 mb-0.5">
                    {edu.degree} {edu.field && `in ${edu.field}`} • {edu.location}
                  </div>
                  {edu.description.length > 0 && (
                    <ul className="list-disc ml-5 space-y-0.5 mt-1">
                      {edu.description.map((point, idx) => (
                        <li key={idx} className="text-[12px] leading-relaxed text-slate-600">{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section className="mb-6">
            <SectionHeader title="Languages" color={theme.accentColor} />
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex flex-col">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[12px] font-bold">{lang.name}</span>
                    <span className="text-[10px] font-medium text-slate-500">{lang.level}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-500" 
                      style={{ width: `${lang.percentage}%`, backgroundColor: theme.primaryColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hobbies & Interests - Ensure this is rendered */}
        {data.hobbies && (
          <section className="mb-4">
            <SectionHeader title="Hobbies and Interests" color={theme.accentColor} />
            <p className="text-[12px] leading-relaxed text-slate-700">
              {data.hobbies}
            </p>
          </section>
        )}
      </div>

      <footer className="px-10 py-3 border-t text-[9px] text-slate-400 italic text-center opacity-70">
        Created via ResumeAI Pro • Designed by Naseem Ahmad
      </footer>
    </div>
  );
};
