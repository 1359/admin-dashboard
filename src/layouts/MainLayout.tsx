import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import type { NavItem } from '../types/navigation';
import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../store/store';
import { logout, selectAuthUser } from '../store/slices/authSlice';

interface MainLayoutProps {
  children: ReactNode;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: <FiHome /> },
  { id: 'users', label: 'Users', path: '/users', icon: <FiUsers /> },
  { id: 'settings', label: 'Settings', path: '/settings', icon: <FiSettings /> },
];

const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectAuthUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar navItems={navItems} />
      <div className="ml-64">
        <Header user={user} onLogout={handleLogout} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
