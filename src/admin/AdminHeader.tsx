import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  LogOut, 
  ChevronDown, 
  X,
  ExternalLink
} from 'lucide-react';
import { User, Role } from '../types';

interface AdminHeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  currentUser: User | null;
  onLogout?: () => void;
  onSwitchRole?: (role: Role) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentRoute,
  onNavigate,
  currentUser,
  onLogout,
  onSwitchRole
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Determine breadcrumb title
  let breadcrumbTitle = 'Overview';
  if (currentRoute.startsWith('/admin/crops')) breadcrumbTitle = 'Crop listings';
  else if (currentRoute.startsWith('/admin/farmers') || currentRoute.startsWith('/admin/users')) breadcrumbTitle = 'Farmers & buyers';
  else if (currentRoute.startsWith('/admin/transactions')) breadcrumbTitle = 'Transactions';
  else if (currentRoute.startsWith('/admin/logistics')) breadcrumbTitle = 'Logistics';
  else if (currentRoute.startsWith('/admin/market-prices')) breadcrumbTitle = 'Market prices';
  else if (currentRoute.startsWith('/admin/reports') || currentRoute.startsWith('/admin/disputes')) breadcrumbTitle = 'Reports & disputes';
  else if (currentRoute.startsWith('/admin/audit-log')) breadcrumbTitle = 'Audit log';
  else if (currentRoute.startsWith('/admin/settings')) breadcrumbTitle = 'Settings';

  return (
    <>
      <header className="admin-top-header">
        {/* Breadcrumb matching PNG: Administration / Audit log */}
        <div className="admin-breadcrumbs">
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('/admin')}>Administration</span>
          <span style={{ color: '#C5BDB2' }}>/</span>
          <strong>{breadcrumbTitle}</strong>
        </div>

        {/* Right Search, Notification & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Search bar matching PNG: "Search listings, users, orders... ⌘K" */}
          <div
            onClick={() => setSearchOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FAF7F2',
              border: '1px solid #EBE4DA',
              borderRadius: '8px',
              padding: '7px 14px',
              width: '280px',
              cursor: 'pointer',
              color: '#5E6E64',
              fontSize: '0.825rem'
            }}
          >
            <Search size={15} color="#8A7B76" />
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Search listings, users, orders...
            </span>
            <kbd style={{ backgroundColor: '#ECE5DB', color: '#1D2D24', padding: '1px 5px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
              ⌘K
            </kbd>
          </div>

          {/* Notifications bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#FAF7F2',
                border: '1px solid #EBE4DA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <Bell size={17} color="#0C3C2C" />
              <span
                style={{
                  position: 'absolute',
                  top: '7px',
                  right: '7px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#B42318'
                }}
              />
            </button>

            {notificationsOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '46px',
                  right: 0,
                  width: '320px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  border: '1px solid #EBE4DA',
                  padding: '16px',
                  zIndex: 1000
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0C3C2C' }}>Admin Alerts</h4>
                  <span style={{ fontSize: '0.75rem', color: '#D48216', fontWeight: 600 }}>3 unread</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ padding: '8px', background: '#F8F5EF', borderRadius: '8px', fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: 600, color: '#BA4B24' }}>Price Outlier Alert</div>
                    <div style={{ color: '#5E6E64' }}>Red Onions in Pangasinan listed 45% above DA Bantay Presyo.</div>
                  </div>
                  <div style={{ padding: '8px', background: '#F8F5EF', borderRadius: '8px', fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: 600, color: '#0C3C2C' }}>Farmer Verification Queue</div>
                    <div style={{ color: '#5E6E64' }}>8 farmer applications pending approval before midnight.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Admin User Profile Pill matching PNG: "Ana Santos Administrator AS" */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 6px',
                borderRadius: '8px'
              }}
            >
              <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
                <div style={{ fontWeight: 700, color: '#1D2D24', fontSize: '0.85rem' }}>Ana Santos</div>
                <div style={{ fontSize: '0.7rem', color: '#5E6E64' }}>Administrator</div>
              </div>

              {/* AS Avatar badge */}
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#D1E7DD',
                  color: '#0F5132',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                AS
              </div>

              <ChevronDown size={14} color="#8A7B76" />
            </button>

            {profileDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '48px',
                  right: 0,
                  width: '240px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  border: '1px solid #EBE4DA',
                  padding: '8px 0',
                  zIndex: 1000
                }}
              >
                <div style={{ padding: '10px 16px', borderBottom: '1px solid #EBE4DA' }}>
                  <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.9rem' }}>Ana Santos</div>
                  <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>Lead System Administrator</div>
                </div>
                <button
                  onClick={() => { setProfileDropdownOpen(false); onNavigate('/admin/settings'); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    fontSize: '0.85rem',
                    color: '#1D2D24',
                    cursor: 'pointer'
                  }}
                >
                  Admin Settings
                </button>
                <button
                  onClick={() => { setProfileDropdownOpen(false); onNavigate('/admin/audit-log'); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    fontSize: '0.85rem',
                    color: '#1D2D24',
                    cursor: 'pointer'
                  }}
                >
                  System Audit Log
                </button>
                <div style={{ height: '1px', background: '#EBE4DA', margin: '6px 0' }} />
                <button
                  onClick={() => { setProfileDropdownOpen(false); onLogout?.(); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    fontSize: '0.85rem',
                    color: '#B42318',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            )}
          </div>

          {/* Quick Exit Icon */}
          <button
            onClick={onLogout}
            title="Exit Admin Console"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#8A7B76',
              padding: '6px',
              borderRadius: '6px'
            }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Quick Search Dialog */}
      {searchOpen && (
        <div
          onClick={() => setSearchOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 39, 28, 0.6)',
            backdropFilter: 'blur(3px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '100px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '580px',
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #EBE4DA' }}>
              <Search size={20} color="#0C3C2C" />
              <input
                autoFocus
                placeholder="Search listings, farmers, buyers, orders, audit logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  marginLeft: '12px',
                  width: '100%',
                  color: '#1D2D24'
                }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5E6E64' }}
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: '16px 20px', fontSize: '0.85rem', color: '#5E6E64' }}>
              <div style={{ marginBottom: '8px', fontWeight: 600, color: '#0C3C2C' }}>Admin Jump-to</div>
              <div 
                onClick={() => { setSearchOpen(false); onNavigate('/admin/crops'); }}
                style={{ padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>📦 Crop listings awaiting approval (24)</span>
                <span style={{ color: '#D48216' }}>→</span>
              </div>
              <div 
                onClick={() => { setSearchOpen(false); onNavigate('/admin/farmers'); }}
                style={{ padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>👥 Verification queue (12 pending)</span>
                <span style={{ color: '#D48216' }}>→</span>
              </div>
              <div 
                onClick={() => { setSearchOpen(false); onNavigate('/admin/reports'); }}
                style={{ padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>⚖️ Open trade disputes (3 active)</span>
                <span style={{ color: '#D48216' }}>→</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
