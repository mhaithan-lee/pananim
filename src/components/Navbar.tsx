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
  Truck,
  MessageSquare,
  Globe,
  Facebook,
  Instagram
} from 'lucide-react';
import { useChat } from '../context/ChatContext';

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
  const [searchQuery, setSearchQuery] = useState('');
  const { totalUnreadBuyer, totalUnreadFarmer } = useChat();
  const currentUnreadMessages = currentRole === 'farmer' ? totalUnreadFarmer : totalUnreadBuyer;

  const isActive = (path: string) => currentRoute === path;

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onNavigate('/shop');
    }
  };

  const cropCategories = [
    {
      id: 'all',
      name: 'All Farm Harvests',
      sublabel: '30+ fresh commercial listings',
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
      path: '/shop'
    },
    {
      id: 'bulb',
      name: 'Bulb Crops',
      sublabel: 'Red Creole Onions, Garlic, Shallots',
      imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80',
      path: '/shop?category=Bulb+Crop'
    },
    {
      id: 'fruit',
      name: 'Fruit Vegetables',
      sublabel: 'Highland Tomatoes, Eggplants, Peppers',
      imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
      path: '/shop?category=Fruit+Vegetable'
    },
    {
      id: 'leafy',
      name: 'Leafy Vegetables',
      sublabel: 'Highland Cabbage, Pechay Baguio, Lettuce',
      imageUrl: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=400&q=80',
      path: '/shop?category=Leafy+Vegetable'
    },
    {
      id: 'root',
      name: 'Root Crops',
      sublabel: 'Carrots, Benguet White Potato, Ginger',
      imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80',
      path: '/shop?category=Root+Crop'
    },
    {
      id: 'grains',
      name: 'Grains & Corn',
      sublabel: 'Sweet Corn, Yellow Field Corn, Grains',
      imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80',
      path: '/shop?category=Grains'
    }
  ];

  return (
    <header 
      style={{
        backgroundColor: '#0C3C2C',
        color: '#FFFFFF',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 4px 16px rgba(12, 60, 44, 0.2)'
      }}
    >
      {/* =========================================================================
          ROW 1: TOP UTILITY ROW (Shopee-Style Slim Top Bar)
          ========================================================================= */}
      <div 
        style={{
          backgroundColor: '#07271C',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.75rem',
          padding: '0.35rem 0',
          color: '#E2ECE5'
        }}
        className="top-utility-bar"
      >
        <div 
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          {/* Top Left: Seller & Coverage Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {currentRole === 'farmer' ? (
              <button
                onClick={() => onNavigate('/farmer/dashboard')}
                style={{ color: '#D48216', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.75rem' }}
              >
                Farmer Workspace
              </button>
            ) : (
              <button
                onClick={() => onNavigate('/sell-with-pananim')}
                style={{ color: '#E2ECE5', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.75rem' }}
              >
                Seller Centre
              </button>
            )}

            <span style={{ opacity: 0.35 }}>|</span>

            <button
              onClick={() => onNavigate('/sell-with-pananim')}
              style={{ color: '#E2ECE5', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.75rem' }}
            >
              Start Selling
            </button>

            <span style={{ opacity: 0.35 }}>|</span>

            <button
              onClick={() => onNavigate('/delivery-coverage')}
              style={{ color: '#E2ECE5', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.75rem' }}
            >
              Delivery Coverage
            </button>

            <span style={{ opacity: 0.35 }} className="hide-on-tablet">|</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B5CCC1' }} className="hide-on-tablet">
              <span>Follow us on</span>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#FFFFFF', display: 'inline-flex' }}>
                <Facebook size={12} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#FFFFFF', display: 'inline-flex' }}>
                <Instagram size={12} />
              </a>
            </div>
          </div>

          {/* Top Right: Notifications, Messages, Help, Language, User Account */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            {/* Notifications link */}
            <button
              onClick={() => onNavigate(currentRole === 'farmer' ? '/farmer/dashboard' : '/buyer/notifications')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: currentRoute.startsWith('/buyer/notifications') ? '#D48216' : '#E2ECE5',
                fontWeight: currentRoute.startsWith('/buyer/notifications') ? 700 : 400,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
              title="Notifications & Price Alerts"
            >
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <Bell size={13} />
                {unreadNotificationsCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-6px',
                      backgroundColor: '#D48216',
                      color: '#FFFFFF',
                      fontSize: '0.55rem',
                      fontWeight: 800,
                      padding: '0.05rem 0.25rem',
                      borderRadius: '10px',
                      lineHeight: 1
                    }}
                  >
                    {unreadNotificationsCount}
                  </span>
                )}
              </div>
              <span>Notifications</span>
            </button>

            <span style={{ opacity: 0.35 }}>|</span>

            {/* Messages link with unread count */}
            <button
              onClick={() => onNavigate(currentRole === 'farmer' ? '/farmer/messages' : '/buyer/messages')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#E2ECE5',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
              title="Chat & Messages Inbox"
            >
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <MessageSquare size={13} />
                {currentUnreadMessages > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-6px',
                      backgroundColor: '#9B3C1B',
                      color: '#FFFFFF',
                      fontSize: '0.55rem',
                      fontWeight: 800,
                      padding: '0.05rem 0.25rem',
                      borderRadius: '10px',
                      lineHeight: 1
                    }}
                  >
                    {currentUnreadMessages}
                  </span>
                )}
              </div>
              <span>Messages</span>
            </button>

            <span style={{ opacity: 0.35 }}>|</span>

            {/* Help */}
            <button
              onClick={() => onNavigate('/help')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: '#E2ECE5',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              <HelpCircle size={13} />
              <span>Help</span>
            </button>

            <span style={{ opacity: 0.35 }}>|</span>

            {/* Language */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#E2ECE5', cursor: 'pointer' }}>
              <Globe size={13} />
              <span>English</span>
              <ChevronDown size={11} />
            </div>

            <span style={{ opacity: 0.35 }}>|</span>

            {/* User Account / Profile */}
            {currentUser ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}
                >
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={currentUser.name}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid #92DEB9'
                    }}
                  />
                  <span>{currentUser.name}</span>
                  <ChevronDown size={12} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '120%',
                      right: 0,
                      width: '230px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                      border: '1px solid #DECDBD',
                      padding: '0.5rem',
                      zIndex: 100,
                      color: '#221714'
                    }}
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #F5EDE2' }}>
                      <p style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.85rem', margin: 0 }}>{currentUser.name}</p>
                      <p style={{ fontSize: '0.72rem', color: '#8A7B76', margin: '2px 0 0 0' }}>{currentUser.email}</p>
                    </div>

                    {currentRole === 'buyer' && (
                      <>
                        <button
                          onClick={() => { onNavigate('/buyer/dashboard'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.825rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <Package size={14} /> Buyer Dashboard
                        </button>
                        <button
                          onClick={() => { onNavigate('/buyer/orders'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.825rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <Truck size={14} /> My Orders
                        </button>
                        <button
                          onClick={() => { onNavigate('/buyer/messages'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.825rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MessageSquare size={14} /> Messages
                          </div>
                          {totalUnreadBuyer > 0 && (
                            <span style={{ backgroundColor: '#9B3C1B', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, padding: '1px 6px', borderRadius: '10px' }}>
                              {totalUnreadBuyer}
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => { onNavigate('/buyer/notifications'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.825rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bell size={14} /> Notifications
                          </div>
                          {unreadNotificationsCount > 0 && (
                            <span style={{ backgroundColor: '#D48216', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, padding: '1px 6px', borderRadius: '10px' }}>
                              {unreadNotificationsCount}
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => { onNavigate('/buyer/profile'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.825rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <UserIcon size={14} /> Profile &amp; Addresses
                        </button>
                      </>
                    )}

                    {currentRole === 'farmer' && (
                      <>
                        <button
                          onClick={() => { onNavigate('/farmer/dashboard'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.825rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <TrendingUp size={14} /> Farm Dashboard
                        </button>
                        <button
                          onClick={() => { onNavigate('/farmer/inventory'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.825rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <Package size={14} /> My Crop Inventory
                        </button>
                        <button
                          onClick={() => { onNavigate('/farmer/messages'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.825rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MessageSquare size={14} /> Buyer Inquiries
                          </div>
                          {totalUnreadFarmer > 0 && (
                            <span style={{ backgroundColor: '#9B3C1B', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, padding: '1px 6px', borderRadius: '10px' }}>
                              {totalUnreadFarmer}
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => { onNavigate('/farmer/inventory/new'); setUserDropdownOpen(false); }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.825rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          ➕ List New Crop
                        </button>
                      </>
                    )}

                    {currentRole === 'staff' && (
                      <button
                        onClick={() => { onNavigate('/admin'); setUserDropdownOpen(false); }}
                        style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.825rem', color: '#0C3C2C', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
                      >
                        🛡️ Admin Console &amp; Compliance
                      </button>
                    )}

                    <div style={{ borderTop: '1px solid #F5EDE2', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
                      <button
                        onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                        style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.825rem', color: '#9B3C1B', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => onNavigate('/register')}
                  style={{ background: 'none', border: 'none', color: '#FFFFFF', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Register
                </button>
                <span style={{ opacity: 0.35 }}>|</span>
                <button
                  onClick={() => onNavigate('/login')}
                  style={{ background: 'none', border: 'none', color: '#FFFFFF', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: MAIN HEADER ROW (Logo, Large Wide Search Bar, Cart)
          ========================================================================= */}
      <div 
        style={{
          padding: '0.85rem 0'
        }}
      >
        <div 
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem'
          }}
        >
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('/')}
            style={{ cursor: 'pointer', flexShrink: 0 }}
          >
            <Logo size="md" variant="white" showTagline={true} />
          </div>

          {/* Central Wide Search Bar (Directly Aligned with Cart) */}
          <div 
            style={{
              flex: 1,
              maxWidth: '820px',
              display: 'flex',
              alignItems: 'center'
            }}
            className="header-search-container"
          >
            {/* Search Input Box */}
            <form 
              onSubmit={handleSearchSubmit}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '3px 3px 3px 1rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                width: '100%',
                height: '44px',
                boxSizing: 'border-box'
              }}
            >
              <input
                type="text"
                placeholder="Search fresh harvest, crops, or verified farms (e.g. Highland Tomatoes, Red Creole Onions)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  padding: '0 0.5rem',
                  fontSize: '0.9rem',
                  color: '#221714',
                  backgroundColor: 'transparent'
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#9B3C1B',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  width: '56px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B84520')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#9B3C1B')}
                aria-label="Search crops"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right Action: Prominent Shopping Cart (Aligned with Search Bar) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            <button
              onClick={() => onNavigate('/cart')}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0 1.25rem',
                height: '44px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '8px',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
              aria-label="Shopping Cart"
            >
              <div style={{ position: 'relative', display: 'flex' }}>
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-10px',
                      backgroundColor: '#D48216',
                      color: '#FFFFFF',
                      fontSize: '0.675rem',
                      fontWeight: 800,
                      minWidth: '18px',
                      height: '18px',
                      borderRadius: '9px',
                      padding: '0 4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #0C3C2C'
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }} className="hide-on-mobile">
                Cart
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                padding: '0.4rem',
                cursor: 'pointer',
                display: 'none'
              }}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 3: CATEGORY & PAGE NAVIGATION ROW (Spacious, Uncluttered Bar)
          ========================================================================= */}
      <nav 
        style={{
          backgroundColor: '#07271C',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 40,
          overflow: 'visible'
        }}
        className="desktop-nav-bar"
      >
        <div 
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '2.5rem',
            height: '42px',
            position: 'relative',
            overflow: 'visible'
          }}
        >
          {/* HOME */}
          <button
            onClick={() => onNavigate('/')}
            style={{
              fontFamily: 'var(--font-headings)',
              fontWeight: isActive('/') ? 800 : 600,
              color: isActive('/') ? '#D48216' : '#FFFFFF',
              height: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 0.25rem',
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            HOME
            {isActive('/') && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: '#D48216',
                  borderRadius: '3px 3px 0 0'
                }}
              />
            )}
          </button>

          {/* ALL CROPS DROPDOWN / POPOUT BOX */}
          <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setCropsDropdownOpen(!cropsDropdownOpen)}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: currentRoute.startsWith('/shop') ? 800 : 600,
                color: currentRoute.startsWith('/shop') ? '#D48216' : '#FFFFFF',
                height: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0 0.25rem',
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              ALL CROPS <ChevronDown size={13} style={{ transform: cropsDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              {currentRoute.startsWith('/shop') && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: '#D48216',
                    borderRadius: '3px 3px 0 0'
                  }}
                />
              )}
            </button>

            {/* Popout Box with Crop Pictures on the Left & Labels on the Right */}
            {cropsDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  width: '580px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  boxShadow: '0 20px 48px rgba(0,0,0,0.32), 0 4px 12px rgba(0,0,0,0.12)',
                  border: '1.5px solid #DECDBD',
                  padding: '1.15rem',
                  zIndex: 99999,
                  color: '#221714',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
                onMouseLeave={() => setCropsDropdownOpen(false)}
              >
                {/* Popout Box Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid #F0E8DD', paddingBottom: '0.65rem' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#9B3C1B', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Farm-Direct Wholesale
                    </span>
                    <h4 style={{ margin: '2px 0 0 0', fontSize: '1.05rem', color: '#0C3C2C' }}>
                      Wholesale Crop Categories
                    </h4>
                  </div>
                  <button
                    onClick={() => { onNavigate('/shop'); setCropsDropdownOpen(false); }}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#0C3C2C',
                      background: '#F5EDE2',
                      border: '1px solid #DECDBD',
                      borderRadius: '6px',
                      padding: '0.35rem 0.65rem',
                      cursor: 'pointer'
                    }}
                  >
                    View All 30+ Crops &rarr;
                  </button>
                </div>

                {/* 2-Column Grid: Picture on Left, Label on Right */}
                <div 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '0.75rem' 
                  }}
                >
                  {cropCategories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        onNavigate(cat.path);
                        setCropsDropdownOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.65rem 0.75rem',
                        borderRadius: '10px',
                        backgroundColor: '#FAF6F0',
                        border: '1px solid #EADBCE',
                        cursor: 'pointer',
                        transition: 'all 0.16s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#0C3C2C';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 14px rgba(12, 60, 44, 0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FAF6F0';
                        e.currentTarget.style.borderColor = '#EADBCE';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Crop Picture on the Left Side */}
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80';
                        }}
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          flexShrink: 0,
                          border: '1px solid rgba(0,0,0,0.08)'
                        }}
                      />
                      {/* Label of the Crop & Subtitle on Right */}
                      <div style={{ textAlign: 'left', minWidth: 0, flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0C3C2C', whiteSpace: 'normal', lineHeight: 1.25 }}>
                          {cat.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#8A7B76', marginTop: '2px', whiteSpace: 'normal', lineHeight: 1.2 }}>
                          {cat.sublabel}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Popout Footer Promo */}
                <div
                  onClick={() => { onNavigate('/market-prices'); setCropsDropdownOpen(false); }}
                  style={{
                    backgroundColor: '#0C3C2C',
                    borderRadius: '8px',
                    padding: '0.55rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    📈 Live DA wholesale market price benchmarks
                  </span>
                  <span style={{ fontSize: '0.725rem', color: '#92DEB9', fontWeight: 700 }}>
                    Check Prices &rarr;
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* MARKET PRICES */}
          <button
            onClick={() => onNavigate('/market-prices')}
            style={{
              fontFamily: 'var(--font-headings)',
              fontWeight: isActive('/market-prices') ? 800 : 600,
              color: isActive('/market-prices') ? '#D48216' : '#FFFFFF',
              height: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 0.25rem',
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            MARKET PRICES
            {isActive('/market-prices') && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: '#D48216',
                  borderRadius: '3px 3px 0 0'
                }}
              />
            )}
          </button>

          {/* FARMERS DIRECTORY */}
          <button
            onClick={() => onNavigate('/farmers')}
            style={{
              fontFamily: 'var(--font-headings)',
              fontWeight: isActive('/farmers') ? 800 : 600,
              color: isActive('/farmers') ? '#D48216' : '#FFFFFF',
              height: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 0.25rem',
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            FARMERS DIRECTORY
            {isActive('/farmers') && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: '#D48216',
                  borderRadius: '3px 3px 0 0'
                }}
              />
            )}
          </button>

          {/* DELIVERY COVERAGE */}
          <button
            onClick={() => onNavigate('/delivery-coverage')}
            style={{
              fontFamily: 'var(--font-headings)',
              fontWeight: isActive('/delivery-coverage') ? 800 : 600,
              color: isActive('/delivery-coverage') ? '#D48216' : '#FFFFFF',
              height: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 0.25rem',
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            DELIVERY COVERAGE
            {isActive('/delivery-coverage') && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: '#D48216',
                  borderRadius: '3px 3px 0 0'
                }}
              />
            )}
          </button>

          {/* ABOUT US */}
          <button
            onClick={() => onNavigate('/about')}
            style={{
              fontFamily: 'var(--font-headings)',
              fontWeight: isActive('/about') ? 800 : 600,
              color: isActive('/about') ? '#D48216' : '#FFFFFF',
              height: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 0.25rem',
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            ABOUT US
            {isActive('/about') && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: '#D48216',
                  borderRadius: '3px 3px 0 0'
                }}
              />
            )}
          </button>

          {/* HOW IT WORKS */}
          <button
            onClick={() => onNavigate('/how-it-works')}
            style={{
              fontFamily: 'var(--font-headings)',
              fontWeight: isActive('/how-it-works') ? 800 : 600,
              color: isActive('/how-it-works') ? '#D48216' : '#FFFFFF',
              height: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 0.25rem',
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            HOW IT WORKS
            {isActive('/how-it-works') && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: '#D48216',
                  borderRadius: '3px 3px 0 0'
                }}
              />
            )}
          </button>

          {/* SELL WITH PANANIM / ROLE SPECIFIC */}
          {currentRole === 'farmer' ? (
            <button
              onClick={() => onNavigate('/farmer/dashboard')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: 700,
                color: '#D48216',
                height: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0 0.25rem',
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              FARMER DASHBOARD
            </button>
          ) : currentRole === 'buyer' ? (
            <button
              onClick={() => onNavigate('/buyer/orders')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: 700,
                color: '#D48216',
                height: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0 0.25rem',
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
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
                color: '#D48216',
                height: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0 0.25rem',
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              SELL WITH PANANIM
              {isActive('/sell-with-pananim') && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: '#D48216',
                    borderRadius: '3px 3px 0 0'
                  }}
                />
              )}
            </button>
          )}
        </div>
      </nav>

      {/* =========================================================================
          MOBILE COLLAPSIBLE MENU
          ========================================================================= */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#07271C',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.25rem',
            color: '#FFFFFF'
          }}
          className="mobile-menu-container"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <button
              onClick={() => { onNavigate('/'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#FFFFFF', fontSize: '1rem', background: 'none', border: 'none' }}
            >
              HOME
            </button>
            <button
              onClick={() => { onNavigate('/shop'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#FFFFFF', fontSize: '1rem', background: 'none', border: 'none' }}
            >
              ALL CROPS
            </button>
            <button
              onClick={() => { onNavigate('/market-prices'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#FFFFFF', fontSize: '1rem', background: 'none', border: 'none' }}
            >
              MARKET PRICES
            </button>
            <button
              onClick={() => { onNavigate('/farmers'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#FFFFFF', fontSize: '1rem', background: 'none', border: 'none' }}
            >
              FARMERS DIRECTORY
            </button>
            <button
              onClick={() => { onNavigate('/delivery-coverage'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#FFFFFF', fontSize: '1rem', background: 'none', border: 'none' }}
            >
              DELIVERY COVERAGE
            </button>
            <button
              onClick={() => { onNavigate('/about'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#FFFFFF', fontSize: '1rem', background: 'none', border: 'none' }}
            >
              ABOUT US
            </button>
            <button
              onClick={() => { onNavigate('/sell-with-pananim'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 700, color: '#D48216', fontSize: '1rem', background: 'none', border: 'none' }}
            >
              SELL WITH PANANIM
            </button>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .top-utility-bar {
            display: none !important;
          }
          .desktop-nav-bar {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
        }
        @media (max-width: 1040px) {
          .hide-on-tablet {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
