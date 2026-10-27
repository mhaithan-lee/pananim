import React from 'react';
import './farmer.css';
import { FarmerNavbar } from './FarmerNavbar';
import { FarmerHeroBanner } from './FarmerHeroBanner';
import { FarmerFooter } from './FarmerFooter';
import { User, Role } from '../types';

interface FarmerLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  onNavigate: (route: string) => void;
  currentUser: User | null;
  unreadMessagesCount?: number;
  onSwitchRole?: (role: Role) => void;
  onLogout?: () => void;
  showHero?: boolean;
}

export const FarmerLayout: React.FC<FarmerLayoutProps> = ({
  children,
  currentRoute,
  onNavigate,
  currentUser,
  unreadMessagesCount = 2,
  onSwitchRole,
  onLogout,
  showHero = true
}) => {
  return (
    <div className="farmer-app-container">
      {/* Top Navbar strictly matching FRONT PAGE FARMER.png */}
      <FarmerNavbar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        currentUser={currentUser}
        unreadMessagesCount={unreadMessagesCount}
        onSwitchRole={onSwitchRole}
        onLogout={onLogout}
      />

      {/* Hero Banner with Farmer Photo and Actions */}
      {showHero && (
        <FarmerHeroBanner
          farmerName={currentUser?.name || 'Ramon Santos'}
          farmName="Santos Organic Farms"
          onNavigate={onNavigate}
        />
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px 0 64px 0' }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px' }}>
          {children}
        </div>
      </main>

      {/* Farmer Specific Footer */}
      <FarmerFooter onNavigate={onNavigate} />
    </div>
  );
};
