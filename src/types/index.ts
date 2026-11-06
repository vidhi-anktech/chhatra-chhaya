// ==============================================================================
// TYPESCRIPT DATA DEFINITIONS
// ==============================================================================

export type UserRole = 'user' | 'sangh' | 'admin';

export interface DevoteeProfile {
  id?: string;
  name: string;
  age: number;
  city: string;
  role: UserRole;
  notificationsAllowed: boolean;
  createdAt?: string;
}

export interface DainikNiyam {
  id: string;
  userId: string;
  userName: string;
  userCity: string;
  niyamTitle: string;
  date: string;
  status: 'pledged' | 'fulfilled' | 'broken';
}

export interface ViharUpdate {
  id: string;
  guruTitle: string;
  isMainGuru: boolean;
  currentCity: string;
  templeName: string;
  arrivalDate: string;
  departureDate: string;
  nextDestination: string;
  notes?: string;
}

export interface PravachanItem {
  id: string;
  title: string;
  date: string;
  youtubeVideoId?: string;
  audioUrl?: string;
  summary2Min?: string;
  durationMins?: number;
}
