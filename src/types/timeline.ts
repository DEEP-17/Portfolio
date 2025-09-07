import { ReactNode } from "react";

export interface TimelineItem {
  id: number;
  title: string;
  description: string;
  date: string;
  type?: 'education' | 'work' | string;
  url?: string;
  icon?: ReactNode;
  color?: string;
  shadowColor?: string;
  minor?: string;
  coursework?: string[];
}

export interface TimelineProps {
  items: TimelineItem[];
  sectionTitle: string;
}
