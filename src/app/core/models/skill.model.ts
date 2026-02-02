export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  icon?: string;
  yearsOfExperience?: number;
  systemStatus: SystemStatus;
}

export enum SkillCategory {
  FRONTEND = 'FRONTEND_MODULE',
  BACKEND = 'BACKEND_ENGINE',
  DATABASE = 'DATABASE_CORE',
  DEVOPS = 'DEVOPS_LAYER',
  MOBILE = 'MOBILE_SYSTEM',
  TOOLS = 'DEVELOPMENT_TOOLS'
}

export enum SystemStatus {
  EXPERT = 'EXPERT_LEVEL',
  ADVANCED = 'ADVANCED_LEVEL',
  INTERMEDIATE = 'INTERMEDIATE_LEVEL',
  LEARNING = 'LEARNING_MODULE'
}

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
  totalModules: number;
  systemLoad: number; // Promedio de niveles
}
