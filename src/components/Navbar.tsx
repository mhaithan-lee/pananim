import React, { useState } from 'react';
import { Logo } from './Logo';
import { User, Role } from '../types';
import { 
  Search, 
  ShoppingCart, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  User as UserIcon,
  Package,
  TrendingUp,
  MapPin,
  HelpCircle,
  Truck
} from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  currentUser: User | null;
  currentRole: Role;
  cartCount: number;
  unreadNotificationsCount?: number;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  currentUser,
  currentRole,
  cartCount,
  unreadNotificationsCount = 2,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cropsDropdownOpen, setCropsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => currentRoute === path;

  return (
    <header 
      style={{
        backgroundColor: '#F5EDE2',
        borderBottom: '1.5px solid #DECDBD',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 8px rgba(34, 23, 20, 0.04)'
      }}
    >
      {/* Top Announcement Bar (Section 4.1) */}
      <div 
        style={{
          backgroundColor: '#0C3C2C',
          color: '#E2ECE5',
          fontSize: '0.75rem',
          textAlign: 'center',
          padding: '0.35rem 1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.75rem'
        }}
      >
        <span>
          🌾 <strong>Harvest Season Active:</strong> Direct wholesale deliveries now serving Central Luzon, CALABARZON &amp; Metro Manila hubs.
        </span>
        <button 
          onClick={() => onNavigate('/delivery-coverage')}
          style={{ 
            color: '#D48216', 
            fontWeight: 700, 
            textDecoration: 'underline', 
            fontSize: '0.75rem' 
          }}
        >
          Check Coverage &rarr;
        </button>
      </div>

      <div className="container">
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '74px'
          }}
        >
          {/* Logo */}
          <div 
            onClick={() => onNavigate('/')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Logo size="md" variant="green" />
          </div>

          {/* Desktop Navigation Links matching Screenshot 215453 */}
          <nav 
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2rem'
            }}
            className="desktop-nav"
          >
            <button
              onClick={() => onNavigate('/')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: isActive('/') ? 800 : 600,
                color: isActive('/') ? '#0C3C2C' : '#574A46',
                borderBottom: isActive('/') ? '3px solid #0C3C2C' : '3px solid transparent',
                padding: '0.5rem 0.2rem',
                fontSize: '0.9rem',
                letterSpacing: '0.04em'
              }}
            >
              HOME
            </button>

            {/* CROPS dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setCropsDropdownOpen(!cropsDropdownOpen)}
                style={{
                  fontFamily: 'var(--font-headings)',
                  fontWeight: currentRoute.startsWith('/shop') ? 800 : 600,
                  color: currentRoute.startsWith('/shop') ? '#0C3C2C' : '#574A46',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  borderBottom: currentRoute.startsWith('/shop') ? '3px solid #0C3C2C' : '3px solid transparent',
                  padding: '0.5rem 0.2rem',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em'
                }}
              >
                CROPS <ChevronDown size={14} />
              </button>

              {cropsDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '220px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid #DECDBD',
                    padding: '0.5rem',
                    zIndex: 100
                  }}
                  onMouseLeave={() => setCropsDropdownOpen(false)}
                >
                  <button
                    onClick={() => { onNavigate('/shop'); setCropsDropdownOpen(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#0C3C2C',
                      display: 'block'
                    }}
                  >
                    All Available Harvests
                  </button>
                  <button
                    onClick={() => { onNavigate('/shop?category=Bulb+Crop'); setCropsDropdownOpen(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.8rem', fontSize: '0.85rem', color: '#574A46', display: 'block' }}
                  >
                    🧅 Bulb Crops (Onions, Garlic)
                  </button>
                  <button
                    onClick={() => { onNavigate('/shop?category=Fruit+Vegetable'); setCropsDropdownOpen(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.8rem', fontSize: '0.85rem', color: '#574A46', display: 'block' }}
                  >
                    🍅 Fruit Vegetables (Tomatoes, Eggplant)
                  </button>
                  <button
                    onClick={() => { onNavigate('/shop?category=Leafy+Vegetable'); setCropsDropdownOpen(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.8rem', fontSize: '0.85rem', color: '#574A46', display: 'block' }}
                  >
                    🥬 Leafy Vegetables (Cabbage, Pechay)
                  </button>
                  <button
                    onClick={() => { onNavigate('/shop?category=Root+Crop'); setCropsDropdownOpen(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.8rem', fontSize: '0.85rem', color: '#574A46', display: 'block' }}
                  >
                    🥕 Root Crops (Carrots, Ginger, Potato)
                  </button>
                  <button
                    onClick={() => { onNavigate('/shop?category=Grains'); setCropsDropdownOpen(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.8rem', fontSize: '0.85rem', color: '#574A46', display: 'block' }}
                  >
                    🌽 Grains &amp; Corn
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('/market-prices')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: isActive('/market-prices') ? 800 : 600,
                color: isActive('/market-prices') ? '#0C3C2C' : '#574A46',
                borderBottom: isActive('/market-prices') ? '3px solid #0C3C2C' : '3px solid transparent',
                padding: '0.5rem 0.2rem',
                fontSize: '0.9rem',
                letterSpacing: '0.04em'
              }}
            >
              MARKET PRICES
            </button>

            <button
              onClick={() => onNavigate('/farmers')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: isActive('/farmers') ? 800 : 600,
                color: isActive('/farmers') ? '#0C3C2C' : '#574A46',
                borderBottom: isActive('/farmers') ? '3px solid #0C3C2C' : '3px solid transparent',
                padding: '0.5rem 0.2rem',
                fontSize: '0.9rem',
                letterSpacing: '0.04em'
              }}
            >
              FARMERS
            </button>

            <button
              onClick={() => onNavigate('/about')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: isActive('/about') ? 800 : 600,
                color: isActive('/about') ? '#0C3C2C' : '#574A46',
                borderBottom: isActive('/about') ? '3px solid #0C3C2C' : '3px solid transparent',
                padding: '0.5rem 0.2rem',
                fontSize: '0.9rem',
                letterSpacing: '0.04em'
              }}
            >
              ABOUT US
            </button>

            {currentRole === 'farmer' ? (
              <button
                onClick={() => onNavigate('/farmer/dashboard')}
                style={{
                  fontFamily: 'var(--font-headings)',
                  fontWeight: 700,
                  color: '#9B3C1B',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em'
                }}
              >
                FARMER WORKSPACE
              </button>
            ) : currentRole === 'buyer' ? (
              <button
                onClick={() => onNavigate('/buyer/orders')}
                style={{
                  fontFamily: 'var(--font-headings)',
                  fontWeight: 700,
                  color: '#9B3C1B',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em'
                }}
              >
                MY ORDERS
              </button>
            ) : (
              <button
                onClick={() => onNavigate('/sell-with-pananim')}
                style={{
                  fontFamily: 'var(--font-headings)',
                  fontWeight: 700,
                  color: '#0C3C2C',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em'
                }}
              >
                SELL WITH PANANIM
              </button>
            )}
          </nav>

          {/* Right Header Controls (Search, Cart, Bell, User Pill) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            {/* Search Icon */}
            <button
              onClick={() => onNavigate('/shop')}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #DECDBD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0C3C2C'
              }}
              aria-label="Search crops"
            >
              <Search size={18} />
            </button>

            {/* Cart Icon with Live Count */}
            <button
              onClick={() => onNavigate('/cart')}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#0C3C2C',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                position: 'relative'
              }}
              aria-label="View shopping cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#D48216',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #F5EDE2'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Notifications */}
            {currentUser && (
              <button
                onClick={() => onNavigate(currentRole === 'farmer' ? '/farmer/dashboard' : '/buyer/dashboard')}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DECDBD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#574A46',
                  position: 'relative'
                }}
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadNotificationsCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '7px',
                      right: '8px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#9B3C1B'
                    }}
                  />
                )}
              </button>
            )}

            {/* User Profile Pill matching Screenshot 215453 */}
            {currentUser ? (
              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.3rem 0.6rem 0.3rem 0.4rem',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #DECDBD',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={currentUser.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ textAlign: 'left' }} className="user-text">
                    <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0C3C2C', lineHeight: 1.1 }}>
                      {currentUser.name}
                    </div>
                    <div style={{ fontSize: '0.675rem', color: '#8A7B76', textTransform: 'capitalize' }}>
                      {currentRole === 'farmer' ? 'Farm Owner' : currentRole === 'staff' ? 'Staff Reviewer' : 'Wholesale Buyer'}
                    </div>
                  </div>
                  <ChevronDown size={14} style={{ color: '#574A46' }} />
                </div>

                {userDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '110%',
                      right: 0,
                      width: '230px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-lg)',
                      border: '1px solid #DECDBD',
                      padding: '0.5rem',
                      zIndex: 100
                    }}
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #F5EDE2' }}>
                      <p style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.85rem' }}>{currentUser.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#8A7B76' }}>{currentUser.email}</p>
                    </div>

                    {currentRole === 'buyer' && (
                      <>
                        <button
                          onClick={() => { onNavigate('/buyer/dashboard'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <Package size={15} /> Buyer Dashboard
                        </button>
                        <button
                          onClick={() => { onNavigate('/buyer/orders'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <Truck size={15} /> My Orders
                        </button>
                        <button
                          onClick={() => { onNavigate('/buyer/profile'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <UserIcon size={15} /> Profile &amp; Addresses
                        </button>
                      </>
                    )}

                    {currentRole === 'farmer' && (
                      <>
                        <button
                          onClick={() => { onNavigate('/farmer/dashboard'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <TrendingUp size={15} /> Farm Dashboard
                        </button>
                        <button
                          onClick={() => { onNavigate('/farmer/inventory'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <Package size={15} /> My Crop Inventory
                        </button>
                        <button
                          onClick={() => { onNavigate('/farmer/inventory/new'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          ➕ List New Crop
                        </button>
                        <button
                          onClick={() => { onNavigate('/farmer/verification/status'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          🛡️ Verification Status
                        </button>
                      </>
                    )}

                    {currentRole === 'staff' && (
                      <button
                        onClick={() => { onNavigate('/staff/verifications'); setUserDropdownOpen(false); }}
                        style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        🛡️ Staff Verification Queue
                      </button>
                    )}

                    <div style={{ borderTop: '1px solid #F5EDE2', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
                      <button
                        onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                        style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#9B3C1B', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => onNavigate('/login')}
                  className="btn btn-secondary btn-sm"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('/register')}
                  className="btn btn-primary btn-sm"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4rem',
                color: '#0C3C2C'
              }}
              className="mobile-menu-btn"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #DECDBD',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => { onNavigate('/'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#0C3C2C', fontSize: '1rem' }}
            >
              HOME
            </button>
            <button
              onClick={() => { onNavigate('/shop'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#0C3C2C', fontSize: '1rem' }}
            >
              SHOP AVAILABLE CROPS
            </button>
            <button
              onClick={() => { onNavigate('/market-prices'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#0C3C2C', fontSize: '1rem' }}
            >
              MARKET PRICES REFERENCE
            </button>
            <button
              onClick={() => { onNavigate('/farmers'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#0C3C2C', fontSize: '1rem' }}
            >
              FARMER DIRECTORY
            </button>
            <button
              onClick={() => { onNavigate('/how-it-works'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#0C3C2C', fontSize: '1rem' }}
            >
              HOW ORDERING WORKS
            </button>
            <button
              onClick={() => { onNavigate('/sell-with-pananim'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#D48216', fontSize: '1rem' }}
            >
              SELL WITH PANANIM
            </button>
            <button
              onClick={() => { onNavigate('/about'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#0C3C2C', fontSize: '1rem' }}
            >
              ABOUT US
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .user-text {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
