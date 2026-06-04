import type { ReactNode } from 'react';

export interface StatCardData {
  id: string;
  label: string;
  value: string | number;
  change?: number; // Percentage change (positive or negative)
  icon: ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  description:string;
}
export interface AlertCardData {
    id:string;
    title:string;
    message:string;
    severity:string;
    timestamp:string;
    dismissible:boolean;
  }
  export interface MessageCardData{
    id:number;
    sender:string;
    text:string;
    status:string;
  }
  export interface NotificationsCardData{
    id:number,
    title:string;
    description?:string;
    priority:string;
    time:string;
  }

