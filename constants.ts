
import { ResumeData, ThemeConfig } from './types';

export const INITIAL_DATA: ResumeData = {
  personal: {
    fullName: "Naseem Ahmad",
    location: "Gurgaon, India 122018",
    phone: "+91 84499 57860",
    email: "naseemchoudhary18@gmail.com",
    summary: "Customer Support professional with 10 months of experience at Concentrix Pvt. Ltd. Skilled in handling customer queries, resolving issues quickly, and ensuring high customer satisfaction. Experienced with CRM tools and multitasking across chat platforms. Known for clear communication, patience, and a solution-focused approach. Looking to grow my career in customer support and provide excellent service to clients."
  },
  experience: [
    {
      id: '1',
      role: "CUSTOMER SUPPORT ADVISOR",
      company: "Concentrix Pvt. Ltd. (Blended Process)",
      location: "Gurgaon",
      startDate: "04/2023",
      endDate: "Current",
      description: [
        "Handled real-time chat support for Uber riders and drivers, resolving 60-80 queries per shift.",
        "Assisted customers with trip payments, cancellations, refunds, app errors, and account access.",
        "Maintained high CSAT scores (90%+) by providing prompt and empathetic solutions.",
        "Followed Uber's SOPs and quality standards while handling sensitive customer data.",
        "Logged and tracked issues accurately using Uber's internal CRM and ticketing systems."
      ]
    }
  ],
  skills: [
    "Customer service",
    "Ticketing systems",
    "Problem resolution",
    "Time management",
    "Technical support",
    "Positive attitude",
    "Client communication",
    "Problem-solving",
    "Data management",
    "Relationship building"
  ],
  education: [
    {
      id: '1',
      school: "Lovely Professional University",
      location: "Phagwara, IN-PB",
      degree: "B Tech",
      field: "Computer Science",
      graduationDate: "2020",
      description: [
        "Developed strong problem-solving and analytical skills.",
        "Improved communication, documentation, and reporting skills through projects and presentations.",
        "Learned to work with systems, tools, and processes, which helps in understanding CRM and workflows.",
        "Gained experience in teamwork, time management, and handling deadlines."
      ]
    }
  ],
  languages: [
    { id: '1', name: "English", level: "C2", percentage: 95 },
    { id: '2', name: "Hindi", level: "C2", percentage: 100 }
  ],
  hobbies: "My hobbies include improving my English communication, reading online articles, playing cricket, and learning new skills. These hobbies help me stay updated, stay active, and improve my confidence."
};

export const THEMES: Record<string, ThemeConfig> = {
  classic: {
    primaryColor: '#005f73',
    headerTextColor: '#ffffff',
    accentColor: '#005f73'
  },
  modern: {
    primaryColor: '#1e293b',
    headerTextColor: '#ffffff',
    accentColor: '#3b82f6'
  },
  emerald: {
    primaryColor: '#065f46',
    headerTextColor: '#ffffff',
    accentColor: '#059669'
  }
};
