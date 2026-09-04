export interface ActivityData {
  id: string;
  title: string;
  date: string | Date;
  sila: number;
  weekNumber: number;
  description?: string | null;
  score?: number | null;
  reflection?: string | null;
  imageUrl?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface WeeklyReflectionData {
  id: string;
  periodNumber?: number;
  month?: string;
  year?: number;
  averageScore?: number;
  reason: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
