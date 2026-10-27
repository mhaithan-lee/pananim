import React from 'react';
import './admin.css';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { User, Role } from '../types';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  onNavigate: (route: string) => void;
  currentUser: User | null;
  pendingVerificationsCount?: number;
  unreadMessagesCount?: number;
  onSwitchRole?: (role: Role) => void;
  onLogout?: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentRoute,
  onNavigate,
  currentUser,
  pendingVerificationsCount = 12,
  unreadMessagesCount = 3,
  onSwitchRole,
  onLogout
}) => {
  return (
    <div className="admin-layout-root">
      {/* Deep Pine Green Left Sidebar matching all 9 admin PNG screens */}
      <AdminSidebar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        pendingListingsCount={24}
        pendingUsersCount={pendingVerificationsCount}
        openDisputesCount={3}
      />

      {/* Main Viewport */}
      <div className="admin-main-viewport">
        {/* Top Header with Breadcrumbs, Search, Notifications & Ana Santos profile pill */}
        <AdminHeader
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          currentUser={currentUser}
          onLogout={onLogout}
          onSwitchRole={onSwitchRole}
        />

        {/* Scrollable Page Body */}
        <main className="admin-page-content">
          {children}
        </main>
      </div>
    </div>
  );
};
