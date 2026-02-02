export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: Date;
  systemMetrics?: {
    complexity: number; // 0-100
    performance: number; // 0-100
    innovation: number; // 0-100
  };
}

export enum ProjectCategory {
  FULLSTACK = 'FULLSTACK_MODULE',
  FRONTEND = 'FRONTEND_INTERFACE',
  BACKEND = 'BACKEND_ENGINE',
  MOBILE = 'MOBILE_SYSTEM',
  DEVOPS = 'DEVOPS_LAYER',
  OTHER = 'OTHER_MODULE'
}

export enum ProjectStatus {
  PRODUCTION = 'PRODUCTION',
  DEVELOPMENT = 'IN_DEVELOPMENT',
  ARCHIVED = 'ARCHIVED',
  PROTOTYPE = 'PROTOTYPE'
}
