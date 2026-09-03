export type Locale = 'ar' | 'en';

export interface LocalizedString {
  ar: string;
  en: string;
}

export interface ProjectObjective {
  title: LocalizedString;
  description?: LocalizedString;
}

export interface ProjectService {
  title: LocalizedString;
  description: LocalizedString;
  iconName?: string;
}

export interface ProjectStat {
  label: LocalizedString;
  value: string;
}

export interface Project {
  slug: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  category: LocalizedString;
  categoryKey: 'food' | 'contracting' | 'packaging' | 'digital' | 'security' | 'technology' | 'agriculture' | 'energy' | 'consulting' | 'retail';
  heroImage: string;
  thumbnailImage: string;
  galleryImages: string[];
  yearEstablished: string;
  status: 'active' | 'expanding' | 'strategic';
  stats: ProjectStat[];
  objectives: ProjectObjective[];
  services: ProjectService[];
  impact: LocalizedString[];
  contactEmail?: string;
  contactPhone?: string;
  relatedSlugs: string[];
  featured?: boolean;
}

export interface BoardMember {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  titleBadge: LocalizedString;
  order: number;
  image: string;
  bio: LocalizedString;
  term: LocalizedString;
  phone?: string;
  email?: string;
  adminEmail?: string;
  committee?: LocalizedString;
  qualifications?: LocalizedString[];
}

export interface StrategicGoal {
  id: number;
  number: number;
  title: LocalizedString;
  description: LocalizedString;
  iconName: string;
  pillars: LocalizedString[];
  kpis: LocalizedString[];
  timeHorizon: LocalizedString;
}

export interface DocumentItem {
  id: string;
  title: LocalizedString;
  category: 'governance' | 'policies' | 'financial' | 'regulations' | 'forms';
  categoryName: LocalizedString;
  year: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX';
  fileSize: string;
  documentNumber: string;
  issueDate: string;
  description: LocalizedString;
  downloadUrl: string;
}

export interface ReportItem {
  id: string;
  title: LocalizedString;
  year: string;
  type: 'annual' | 'financial' | 'audit' | 'sustainability';
  typeName: LocalizedString;
  description: LocalizedString;
  fileType: 'PDF';
  fileSize: string;
  highlights: LocalizedString[];
  downloadUrl: string;
  publishDate: string;
}

export interface MeetingRecord {
  id: string;
  type: 'board' | 'general-assembly';
  year: string;
  meetingNumber: string;
  date: string;
  title: LocalizedString;
  agendaSummary: LocalizedString[];
  keyDecisions: LocalizedString[];
  attendeesCount: number;
  quorumPercentage: string;
  fileSize: string;
  downloadUrl: string;
}

export interface NewsItem {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString[];
  date: string;
  category: LocalizedString;
  categoryKey: 'agreements' | 'projects' | 'community' | 'events' | 'announcements';
  author: LocalizedString;
  image: string;
  readTime: LocalizedString;
  featured?: boolean;
  tags: LocalizedString[];
  gallery?: string[];
}

export interface GalleryItem {
  id: string;
  title: LocalizedString;
  category: 'events' | 'partnerships' | 'projects' | 'activities';
  categoryName: LocalizedString;
  imageUrl: string;
  date: string;
  location: LocalizedString;
  caption?: LocalizedString;
}

export interface PartnershipItem {
  id: string;
  partnerName: LocalizedString;
  type: LocalizedString;
  typeKey: 'government' | 'cooperative' | 'private' | 'nonprofit';
  description: LocalizedString;
  year: string;
  scope: LocalizedString[];
  logo: string;
  status: LocalizedString;
}

export interface TestimonialItem {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  organization?: LocalizedString;
  quote: LocalizedString;
  rating: number;
  projectRelated: LocalizedString;
  avatar: string;
  date: string;
}

export interface MemberCategory {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  requirements: LocalizedString[];
  benefits: LocalizedString[];
  shareValue: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  type: 'project' | 'news' | 'document' | 'report' | 'governance' | 'page';
  typeName: string;
  excerpt: string;
  url: string;
  category?: string;
}

export type {
  PolicyItem,
  RegulationItem,
  FinancialItem,
  WorkshopItem,
  MeetingItem,
  EthicsItem,
  SubmissionItem
} from '../context/GovernanceDataContext';

