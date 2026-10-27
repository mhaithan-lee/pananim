import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { User, Role } from '../types';
import { 
  Search, 
  Bell, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  Wallet, 
  MessageSquare, 
  UserCircle,
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface FarmerNavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  currentUser: User | null;
  unreadMessagesCount?: number;
  onSwitchRole?: (role: Role) => void;
  onLogout?: () => void;
}

export const FarmerNavbar: React.FC<FarmerNavbarProps> = ({
  currentRoute,
  onNavigate,
  currentUser,
  unreadMessagesCount = 2,
  onSwitchRole,
  onLogout
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'OVERVIEW', route: '/farmer/dashboard', match: (r: string) => r === '/farmer' || r === '/farmer/dashboard' },
    { label: 'MY CROPS', route: '/farmer/inventory', match: (r: string) => r.startsWith('/farmer/inventory') || r.startsWith('/farmer/crops') },
    { label: 'ORDERS & SALES', route: '/farmer/orders', match: (r: string) => r.startsWith('/farmer/orders') || r.startsWith('/farmer/sales') },
    { label: 'WALLET & EARNINGS', route: '/farmer/settlements', match: (r: string) => r.startsWith('/farmer/settlements') || r.startsWith('/farmer/wallet') || r.startsWith('/farmer/transactions') },
    { 
      label: 'MESSAGES', 
      route: '/farmer/messages', 
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
      match: (r: string) => r.startsWith('/farmer/messages') 
    },
    { 
      label: 'ACCOUNT', 
      route: '/farmer/account', 
      match: (r: string) => r.startsWith('/farmer/account') || r.startsWith('/farmer/verification') || r.startsWith('/farmer/storefront') || r.startsWith('/farmer/profile') 
    }
  ];

  const farmerName = currentUser?.name || 'Ramon Santos';
  const farmRole = 'Farm Owner · Santos Organic Farms';
  const farmerAvatar = currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80';

  return (
    <>
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #EBE4DA',
          position: 'sticky',
          top: 0,
          zIndex: 900,
          boxShadow: '0 1px 3px rgba(12, 60, 44, 0.05)'
        }}
      >
        <div
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            padding: '0 24px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Left Brand & Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <div 
              onClick={() => onNavigate('/farmer/dashboard')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Logo />
            </div>

            {/* Farmer Navigation Links with terracotta active bar */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {navItems.map((item) => {
                const isActive = item.match(currentRoute);
                return (
                  <button
                    key={item.label}
                    onClick={() => onNavigate(item.route)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '24px 14px 22px',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? '#0C3C2C' : '#5E6E64',
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      letterSpacing: '0.04em',
                      transition: 'color 0.15s ease'
                    }}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        style={{
                          backgroundColor: '#D48216',
                          color: '#FFFFFF',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '9999px',
                          lineHeight: '1.2'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: '12px',
                          right: '12px',
                          height: '3px',
                          backgroundColor: '#D48216',
                          borderRadius: '3px 3px 0 0'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Search Quick Action */}
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FAF7F2',
                border: '1px solid #EBE4DA',
                padding: '7px 14px',
                borderRadius: '8px',
                color: '#5E6E64',
                fontSize: '0.825rem',
                cursor: 'pointer'
              }}
            >
              <Search size={15} color="#5E6E64" />
              <span>Search inventory, orders...</span>
              <kbd style={{ background: '#ECE6DC', padding: '1px 5px', borderRadius: '4px', fontSize: '0.7rem', color: '#1D2D24' }}>⌘K</kbd>
            </button>

            {/* Notifications Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#FAF7F2',
                  border: '1px solid #EBE4DA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <Bell size={18} color="#0C3C2C" />
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#D48216'
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
                    <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0C3C2C' }}>Farmer Notifications</h4>
                    <span style={{ fontSize: '0.75rem', color: '#D48216', fontWeight: 600 }}>Mark all read</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ padding: '8px', background: '#F8F5EF', borderRadius: '8px', fontSize: '0.8rem' }}>
                      <p style={{ margin: '0 0 4px', fontWeight: 600, color: '#1D2D24' }}>New wholesale order received!</p>
                      <span style={{ color: '#5E6E64' }}>Buyer ordered 50kg Red Onions · ₱6,000</span>
                    </div>
                    <div style={{ padding: '8px', background: '#F8F5EF', borderRadius: '8px', fontSize: '0.8rem' }}>
                      <p style={{ margin: '0 0 4px', fontWeight: 600, color: '#1D2D24' }}>Bantay Presyo alert</p>
                      <span style={{ color: '#5E6E64' }}>Tomato reference price increased by +8% today.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#FAF7F2',
                  border: '1px solid #EBE4DA',
                  padding: '5px 12px 5px 6px',
                  borderRadius: '9999px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={farmerAvatar}
                  alt={farmerName}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0C3C2C' }}>{farmerName}</div>
                  <div style={{ fontSize: '0.7rem', color: '#5E6E64' }}>Farm Owner</div>
                </div>
                <ChevronDown size={14} color="#5E6E64" />
              </button>

              {profileOpen && (
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
                    <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.9rem' }}>{farmerName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>{farmRole}</div>
                  </div>
                  <button
                    onClick={() => { setProfileOpen(false); onNavigate('/farmer/storefront'); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      background: 'none',
                      border: 'none',
                      fontSize: '0.85rem',
                      color: '#1D2D24',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <UserCircle size={16} /> Edit Farm Profile
                  </button>
                  <button
                    onClick={() => { setProfileOpen(false); onNavigate('/farmer/verification'); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      background: 'none',
                      border: 'none',
                      fontSize: '0.85rem',
                      color: '#1D2D24',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <ShieldCheck size={16} /> Verification Status
                  </button>
                  <button
                    onClick={() => { setProfileOpen(false); onNavigate('/shop'); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      background: 'none',
                      border: 'none',
                      fontSize: '0.85rem',
                      color: '#1D2D24',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <ExternalLink size={16} /> View Public Marketplace
                  </button>
                  <div style={{ height: '1px', background: '#EBE4DA', margin: '6px 0' }} />
                  <button
                    onClick={() => { setProfileOpen(false); onLogout?.(); }}
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
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div
          onClick={() => setSearchOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
              maxWidth: '560px',
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
                placeholder="Search crops, batch codes, buyers, orders..."
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
              <div style={{ marginBottom: '8px', fontWeight: 600, color: '#0C3C2C' }}>Quick Navigation</div>
              <div 
                onClick={() => { setSearchOpen(false); onNavigate('/farmer/inventory'); }}
                style={{ padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>📦 View all my crops</span>
                <span style={{ color: '#D48216' }}>→</span>
              </div>
              <div 
                onClick={() => { setSearchOpen(false); onNavigate('/farmer/inventory/new'); }}
                style={{ padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>🌱 List a new harvest</span>
                <span style={{ color: '#D48216' }}>→</span>
              </div>
              <div 
                onClick={() => { setSearchOpen(false); onNavigate('/farmer/orders'); }}
                style={{ padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>📋 Pending wholesale orders</span>
                <span style={{ color: '#D48216' }}>→</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
