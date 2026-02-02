export interface Experience {
  id: string;
  company: string;
  position: string;
  period: {
    start: Date;
    end?: Date; // undefined = current
  };
  description: string;
  achievements: string[];
  technologies: string[];
  type: ExperienceType;
  location?: string;
  systemLog: string; // Texto tipo log del sistema
}

export enum ExperienceType {
  FULLTIME = 'FULL_TIME_DEPLOYMENT',
  FREELANCE = 'FREELANCE_CONTRACT',
  INTERNSHIP = 'TRAINING_MODULE',
  PROJECT = 'PROJECT_MODULE'
}

export interface Timeline {
  entries: Experience[];
  totalYears: number;
  systemUptime: string; // e.g., "5 years, 3 months"
}
