
import { ResumeData } from '../types';

export const generateLatex = (data: ResumeData): string => {
  const escapeLatex = (str: string) => {
    return str
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/\$/g, '\\$')
      .replace(/#/g, '\\#')
      .replace(/_/g, '\\_')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/~/g, '\\textasciitilde{}')
      .replace(/\^/g, '\\textasciicircum{}');
  };

  const personal = data.personal;
  
  let latex = `\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(personal.fullName)}} \\\\ \\vspace{1pt}
    \\small ${escapeLatex(personal.phone)} $|$ \\href{mailto:${personal.email}}{\\underline{${escapeLatex(personal.email)}}} $|$ 
    \\href{https://google.com/maps}{\\underline{${escapeLatex(personal.location)}}}
\\end{center}

%-----------SUMMARY-----------
\\section{Summary}
\\small{
 ${escapeLatex(personal.summary)}
}

%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart`;

  data.experience.forEach(exp => {
    latex += `
    \\resumeSubheading{
      ${escapeLatex(exp.role)}}{${escapeLatex(exp.startDate)} -- ${escapeLatex(exp.endDate)}}{
      ${escapeLatex(exp.company)}}{${escapeLatex(exp.location)}}
      \\resumeItemListStart`;
    
    exp.description.forEach(point => {
      if (point.trim()) {
        latex += `
        \\resumeItem{${escapeLatex(point)}}`;
      }
    });
    
    latex += `
      \\resumeItemListEnd`;
  });

  latex += `
  \\resumeSubHeadingListEnd

%-----------PROJECTS-----------
% (You can add projects section here if needed)

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart`;

  data.education.forEach(edu => {
    latex += `
    \\resumeSubheading{
      ${escapeLatex(edu.school)}}{${escapeLatex(edu.graduationDate)}}{
      ${escapeLatex(edu.degree)} in ${escapeLatex(edu.field)}}{${escapeLatex(edu.location)}}`;
  });

  latex += `
  \\resumeSubHeadingListEnd

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Skills}{: ${escapeLatex(data.skills.join(', '))}} \\\\
     \\textbf{Languages}{: ${escapeLatex(data.languages.map(l => `${l.name} (${l.level})`).join(', '))}}
    }}
 \\end{itemize}

%-----------HOBBIES-----------
\\section{Hobbies}
\\small{
 ${escapeLatex(data.hobbies)}
}

%-------------------------------------------
\\end{document}
`;

  return latex;
};
