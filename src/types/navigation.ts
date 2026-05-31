import { ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: ReactNode;
  roles?: string[]; // Optional: restrict access by role
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
}
