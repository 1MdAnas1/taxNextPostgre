export interface Content {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: string;
  aboutTitle?: string;
  aboutDescription?: string;
  aboutImage?: string;
  aboutBullets?: string[];
  yearsOfExperience?: number;
  clientsServed?: number;
  projectsCompleted?: number;
  servicesTitle?: string;
  servicesDescription?: string;
  services?: Service[];
  teamTitle?: string;
  teamDescription?: string;
  team?: TeamMember[];
  galleryTitle?: string;
  galleryDescription?: string;
  gallery?: string[];
  contactTitle?: string;
  contactDescription?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  [key: string]: any;
}

export interface Service {
  icon: string;
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  img: string;
}