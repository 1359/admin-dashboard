import { ReactNode } from 'react';

export interface StatCardData {
  id: string;
  label: string;
  value: string | number;
  change?: number; // Percentage change (positive or negative)
  icon: ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}
