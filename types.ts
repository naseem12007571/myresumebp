
export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  id: string;
  school: string;
  location: string;
  degree: string;
  field: string;
  graduationDate: string;
  description: string[];
}

export interface Language {
  id: string;
  name: string;
  level: string; // e.g., C2, Proficient
  percentage: number; // 0-100 for visual bar
}

export interface ResumeData {
  personal: {
    fullName: string;
    location: string;
    phone: string;
    email: string;
    summary: string;
  };
  experience: Experience[];
  skills: string[];
  education: Education[];
  languages: Language[];
  hobbies: string;
}

export interface ThemeConfig {
  primaryColor: string;
  headerTextColor: string;
  accentColor: string;
}
