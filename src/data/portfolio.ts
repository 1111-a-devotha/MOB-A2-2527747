// Static portfolio content and the default (editable) profile.
// Everything here is the student's own work and can be edited in this file.

export const STUDENT = {
  fullName: 'TUYISINGIZE Devotha',
  registrationNumber: '25/27747',
  appName: 'DevothaPortfolio',
  verificationCode: 'MOB-A2-7747',
  initials: 'TD',
  institution: 'INES-Ruhengeri',
  course: 'Mobile Application Development (SWE 3409)',
} as const;

// Optional online link. Leave empty to hide it. When set, it is labelled
// "needs internet" in the UI so the core portfolio stays fully offline.
export const OPTIONAL_LINK = { label: 'My GitHub profile', url: '' };

export const AVAILABILITY_OPTIONS = [
  'Open to internship',
  'Open to freelance',
  'Open to collaboration',
  'Not available now',
] as const;

export type Availability = (typeof AVAILABILITY_OPTIONS)[number];

export interface Profile {
  headline: string;
  bio: string;
  primarySkill: string;
  availability: Availability;
  imageUri: string | null;
}

export const DEFAULT_PROFILE: Profile = {
  headline: 'Student full-stack developer building ML tools for agriculture and education',
  bio: 'I am a student developer at INES-Ruhengeri. I build end-to-end systems that join machine learning, back-end APIs, web and mobile interfaces and databases, to solve practical problems in agriculture and education in Rwanda.',
  primarySkill: 'Python and Flask',
  availability: 'Open to internship',
  imageUri: null,
};

export interface Skill {
  id: string;
  name: string;
  evidence: string;
  icon: 'logo-python' | 'hardware-chip' | 'cafe' | 'server' | 'logo-html5' | 'phone-portrait' | 'checkmark-done-circle';
}

export const SKILLS: Skill[] = [
  {
    id: 'python-flask',
    name: 'Python and Flask',
    evidence: 'Back end of the Student Academic Performance Prediction System (SPPS).',
    icon: 'logo-python',
  },
  {
    id: 'ml',
    name: 'Machine learning (scikit-learn)',
    evidence: 'Trained and compared Decision Tree, Random Forest and SVM models in SPPS.',
    icon: 'hardware-chip',
  },
  {
    id: 'java-spring',
    name: 'Java and Spring Boot',
    evidence: 'REST API for AgriPulse using Java 17, JWT login and BCrypt PIN hashing.',
    icon: 'cafe',
  },
  {
    id: 'mysql',
    name: 'MySQL databases',
    evidence: 'Data layer for both SPPS and AgriPulse.',
    icon: 'server',
  },
  {
    id: 'web',
    name: 'HTML, CSS and JavaScript',
    evidence: 'Mobile-first interface of the AgriPulse progressive web app.',
    icon: 'logo-html5',
  },
  {
    id: 'testing',
    name: 'Automated testing',
    evidence: '38 automated tests written for AgriPulse.',
    icon: 'checkmark-done-circle',
  },
  {
    id: 'rn',
    name: 'React Native and Expo',
    evidence: 'Learning in SWE 3409. This app is my first complete mobile build.',
    icon: 'phone-portrait',
  },
];

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  place: string;
  detail: string;
}

export const TIMELINE: TimelineEntry[] = [
  {
    id: 't1',
    period: '2025 - now',
    title: 'Higher education studies',
    place: 'INES-Ruhengeri, Rwanda',
    detail: 'Software and mobile development modules, including SWE 3409.',
  },
  {
    id: 't2',
    period: '2026',
    title: 'Built SPPS',
    place: 'Academic project for INES-Ruhengeri',
    detail: 'Full-stack machine learning web app for predicting student performance.',
  },
  {
    id: 't3',
    period: '2026',
    title: 'Built AgriPulse',
    place: 'Personal project',
    detail: 'Progressive web app for small-scale agricultural vendors in Rwanda.',
  },
  {
    id: 't4',
    period: 'Oct 2026',
    title: 'Built DevothaPortfolio',
    place: 'SWE 3409 Assignment 2',
    detail: 'Standalone Android portfolio app with React Native and Expo.',
  },
];

export interface Project {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  contribution: string;
  technologies: string[];
  highlights: string[];
  limitation: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'spps',
    title: 'SPPS: Student Academic Performance Prediction System',
    tagline: 'Machine learning web app for INES-Ruhengeri',
    problem:
      'Lecturers and academic advisors need an early, data-based signal of which students may struggle, so they can support them before results drop.',
    contribution:
      'I built the whole system: the Flask API, the MySQL database, model training and comparison, role-based access for Administrator, Lecturer and Academic Advisor, and a rule-based recommendation engine.',
    technologies: ['Python', 'Flask', 'MySQL (XAMPP)', 'scikit-learn', 'TF-IDF'],
    highlights: [
      'Decision Tree, Random Forest and SVM trained on six predictors; Random Forest used as the main model.',
      'Chat helper with three tiers: Anthropic API, then local Ollama, then an offline FAQ search.',
    ],
    limitation:
      'On my 4 GB RAM laptop, local AI models were limited to about 1 to 1.5 billion parameters, so chat answers were not always satisfying.',
  },
  {
    id: 'agripulse',
    title: 'AgriPulse: pricing and profit helper for vendors',
    tagline: 'Mobile-first PWA for small-scale agricultural vendors in Rwanda',
    problem:
      'Small-scale vendors often price produce by guess, notice spoilage late and cannot see their real profit for each sale.',
    contribution:
      'I designed and built the full stack: the Spring Boot API, MySQL storage, secure login and the mobile-first interface, plus the automated tests.',
    technologies: ['Java 17', 'Spring Boot', 'MySQL', 'JWT', 'BCrypt', 'HTML/CSS/JS PWA'],
    highlights: [
      'AI pricing engine with a rule-based fallback when AI is not available.',
      'Spoilage alerts and sale recording with live profit calculation.',
      '38 automated tests.',
    ],
    limitation:
      'Public deployment on GitHub Pages was still in progress when this portfolio was written.',
  },
];
