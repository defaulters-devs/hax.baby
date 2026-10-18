export type ThemeMode = 'day' | 'night';

export type RitualStep = 1 | 2 | 3 | 4;

export interface Task {
  id: string;
  originalText: string;
  category: TaskCategory;
  encouragement: string;
  microStep: string;
  status: 'maybe' | 'transmuted' | 'sprinting' | 'completed';
  starAwarded: boolean;
  createdAt: number;
}

export type TaskCategory = 
  | 'study'
  | 'code'
  | 'tidy'
  | 'write'
  | 'create'
  | 'health'
  | 'general';

export interface ConstellationStar {
  id: string;
  name: string;
  taskTitle: string;
  dateEarned: string;
  timestamp: number;
  x: number; // percentage in svg 0-100
  y: number; // percentage in svg 0-100
  size: number;
  sparkleType: 'gold' | 'sapphire' | 'diamond';
}

export interface GuestbookWish {
  id: string;
  author: string;
  message: string;
  stamp: string; // emoji / star emblem
  createdAt: number;
  highlighted?: boolean;
}

export interface SoundConfig {
  muted: boolean;
}
