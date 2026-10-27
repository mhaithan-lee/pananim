import React, { useState } from 'react';
import { User, Role } from '../types';
import { 
  Terminal, 
  Users, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';

interface DevScenarioBarProps {
  currentRole: Role;
  onSwitchRole: (role: Role) => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onLoadWorkedExample950: () => void;
}

export const DevScenarioBar: React.FC<DevScenarioBarProps> = ({
  currentRole,
  onSwitchRole,
  currentRoute,
  onNavigate,
  onLoadWorkedExample950
}) => {
  // Always open by default so the user does NOT need to click the route navigator button!
  const [isOpen, setIsOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('pananim_quick_nav_open');
      if (saved !== null) return saved === 'true';
    } catch (e) {}
    return true; // Default open for quick access
  });

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('pananim_quick_nav_open', String(next));
      } catch (e) {}
      return next;
    });
  };

  const routeGroups = [
    {
      group: 'PUBLIC & MARKETPLACE',
      routes: [
        { path: '/', label: '01 / Homepage (16 sections)' },
        { path: '/shop', label: '02 /shop Crop Marketplace' },
        { path: '/crops/crop-001', label: '05 /crops/:slug Long Product Detail' },
        { path: '/farmers', label: '06 /farmers Directory' },
        { path: '/farmers/farm-001', label: '07 /farmers/:slug Public Storefront' },
        { path: '/market-prices', label: '08 /market-prices Wholesale Reference' },
        { path: '/how-it-works', label: '09 /how-it-works Buyer & Farmer' },
        { path: '/sell-with-pananim', label: '10 /sell-with-pananim Recruitment' },
        { path: '/delivery-coverage', label: '11 /delivery-coverage Logistics' },
        { path: '/about', label: '12 /about Purpose & Background' },
        { path: '/help', label: '13 /help Searchable Support Center' },
        { path: '/contact', label: '15 /contact Support Inquiries' },
        { path: '/policies/terms', label: '16 /policies Terms & Policies' }
      ]
    },
    {
      group: 'AUTH & VERIFICATION (CONSOLIDATED)',
      routes: [
        { path: '/login', label: '21 /login Unified Demo Sign In & Recovery' },
        { path: '/register', label: '17 /register Unified Buyer & Farmer Registration' },
        { path: '/register/buyer', label: '18 /register/buyer (Pre-selected Buyer)' },
        { path: '/register/farmer', label: '19 /register/farmer (Pre-selected Farmer)' },
        { path: '/verify-contact', label: '20 /verify-contact (Simulated 6-digit OTP)' },
        { path: '/forgot-password', label: '22 /forgot-password (Simulated Modal)' }
      ]
    },
    {
      group: 'BUYER COMMERCE & WORKSPACE',
      routes: [
        { path: '/cart', label: '27 /cart Grouped by Farmer' },
        { path: '/checkout/address', label: '28 /checkout/address Delivery' },
        { path: '/checkout/delivery', label: '29 /checkout/delivery Freight' },
        { path: '/checkout/payment', label: '30 /checkout/payment Gateways' },
        { path: '/checkout/review', label: '31 /checkout/review Final Review' },
        { path: '/orders/ORD-2026-8842/confirmation', label: '32 /orders/:id/confirmation (Dynamic)' },
        { path: '/buyer/dashboard', label: '33 /buyer/dashboard Member Overview' },
        { path: '/buyer/orders', label: '34 /buyer/orders Active & History' },
        { path: '/buyer/orders/ORD-2026-8842/tracking', label: '36 /buyer/orders/:id/tracking (Dynamic)' },
        { path: '/buyer/orders/ORD-2026-8842/invoice', label: '37 /buyer/orders/:id/invoice Print (Dynamic)' },
        { path: '/buyer/orders/ORD-2026-8842/issue', label: '38 /buyer/orders/:id/issue Dispute (Dynamic)' },
        { path: '/buyer/messages', label: 'Buyer Messages (Direct Seller Chat)' },
        { path: '/buyer/profile', label: '49 /buyer/profile Addresses & Settings' }
      ]
    },
    {
      group: 'FARMER OPERATIONS (CONSOLIDATED 6 DESTINATIONS)',
      routes: [
        { path: '/farmer/dashboard', label: '1. Dashboard (Overview)' },
        { path: '/farmer/inventory', label: '2. My Crops & Stock (Contextual Listings)' },
        { path: '/farmer/inventory/new', label: '➕ Contextual Harvest Listing Form' },
        { path: '/farmer/crops/crop-001', label: '🔍 Crop Details & Stock Modal' },
        { path: '/farmer/orders', label: '3. Orders & Sales (Status Tabs)' },
        { path: '/farmer/settlements', label: '4. Wallet, Settlements & Ledger' },
        { path: '/farmer/messages', label: '5. Direct Buyer Inquiries & Messages' },
        { path: '/farmer/account', label: '6. Account: Farm Profile, Storefront & RSBSA' }
      ]
    },
    {
      group: 'ADMIN EXPERIENCE (REDESIGNED)',
      routes: [
        { path: '/admin', label: 'Admin Overview (Pananim admin overview)' },
        { path: '/admin/crops', label: 'Crop Listings (Pananim crop listings)' },
        { path: '/admin/users', label: 'User Management (Farmers & Buyers)' },
        { path: '/admin/transactions', label: 'Transactions (Pananim transactions)' },
        { path: '/admin/market-prices', label: 'Market Prices (Pananim market prices)' },
        { path: '/admin/reports', label: 'Reports & Disputes (Pananim reports & disputes)' },
        { path: '/admin/audit-log', label: 'Audit Log (Pananim audit log)' },
        { path: '/admin/settings', label: 'Settings (Pananim settings)' },
        { path: '/admin/login', label: 'Admin Login (Pananim admin login)' },
        { path: '/403', label: '78 /403 Access Denied' },
        { path: '/404', label: '79 /404 Not Found' },
        { path: '/service-unavailable', label: '80 /service-unavailable Recovery' },
        { path: '/session-expired', label: '81 /session-expired Continuation' }
      ]
    }
  ];

  return (
    <div 
      className="no-print" 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        backgroundColor: '#07271C',
        color: '#E2ECE5',
        borderBottom: '2px solid #D48216',
        fontSize: '0.825rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.35)'
      }}
    >
      {/* Top Controls Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.45rem 1.25rem',
          flexWrap: 'wrap',
          gap: '0.75rem',
          borderBottom: isOpen ? '1px solid #16533F' : 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.35rem', 
              backgroundColor: '#D48216', 
              color: '#FFFFFF', 
              fontWeight: 800, 
              padding: '0.15rem 0.5rem', 
              borderRadius: '4px',
              letterSpacing: '0.05em',
              fontSize: '0.725rem'
            }}
          >
            <Terminal size={12} /> PROTOTYPE QUICK ACCESS
          </span>
          <span style={{ color: '#A0B5AC' }}>
            Current Route: <strong style={{ color: '#92DEB9', backgroundColor: 'rgba(146, 222, 185, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>{currentRoute}</strong>
          </span>
        </div>

        {/* Persona Switcher Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#A0B5AC', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.775rem' }}>
            <Users size={13} /> Persona:
          </span>
          <button
            onClick={() => onSwitchRole('guest')}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              backgroundColor: currentRole === 'guest' ? '#16533F' : 'transparent',
              color: currentRole === 'guest' ? '#FFFFFF' : '#A0B5AC',
              border: '1px solid ' + (currentRole === 'guest' ? '#92DEB9' : '#1D3B2F'),
              fontWeight: currentRole === 'guest' ? 700 : 500,
              fontSize: '0.775rem',
              cursor: 'pointer'
            }}
          >
            Guest
          </button>
          <button
            onClick={() => onSwitchRole('buyer')}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              backgroundColor: currentRole === 'buyer' ? '#16533F' : 'transparent',
              color: currentRole === 'buyer' ? '#FFFFFF' : '#A0B5AC',
              border: '1px solid ' + (currentRole === 'buyer' ? '#92DEB9' : '#1D3B2F'),
              fontWeight: currentRole === 'buyer' ? 700 : 500,
              fontSize: '0.775rem',
              cursor: 'pointer'
            }}
          >
            Buyer (Mateo)
          </button>
          <button
            onClick={() => onSwitchRole('farmer')}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              backgroundColor: currentRole === 'farmer' ? '#16533F' : 'transparent',
              color: currentRole === 'farmer' ? '#FFFFFF' : '#A0B5AC',
              border: '1px solid ' + (currentRole === 'farmer' ? '#92DEB9' : '#1D3B2F'),
              fontWeight: currentRole === 'farmer' ? 700 : 500,
              fontSize: '0.775rem',
              cursor: 'pointer'
            }}
          >
            Farmer (Ramon)
          </button>
          <button
            onClick={() => onSwitchRole('staff')}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              backgroundColor: currentRole === 'staff' ? '#16533F' : 'transparent',
              color: currentRole === 'staff' ? '#FFFFFF' : '#A0B5AC',
              border: '1px solid ' + (currentRole === 'staff' ? '#92DEB9' : '#1D3B2F'),
              fontWeight: currentRole === 'staff' ? 700 : 500,
              fontSize: '0.775rem',
              cursor: 'pointer'
            }}
          >
            Admin (Ana)
          </button>
        </div>

        {/* Action Buttons: ₱950 Worked Demo & Quick Nav Visibility Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={onLoadWorkedExample950}
            title="Load Section 9 Worked Demo: 10kg Tomatoes @ ₱55/kg + 5kg Cabbage @ ₱40/kg + ₱200 shipping = ₱950"
            style={{
              backgroundColor: '#9B3C1B',
              color: '#FFFFFF',
              padding: '0.25rem 0.65rem',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              border: '1px solid #D46944',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={12} /> Run ₱950 Worked Demo
          </button>

          <button
            onClick={toggleOpen}
            title={isOpen ? 'Collapse Quick Access space' : 'Show Quick Access space'}
            style={{
              backgroundColor: isOpen ? '#16533F' : 'transparent',
              color: '#FFFFFF',
              padding: '0.25rem 0.65rem',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              border: '1px solid ' + (isOpen ? '#92DEB9' : '#2B785E'),
              cursor: 'pointer'
            }}
          >
            <Layers size={12} /> 
            {isOpen ? 'Quick Access (Active)' : 'Show Quick Access'} 
            {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {/* QUICK ACCESS SPACE (DIRECTLY VISIBLE ON TOP WITHOUT CLICKING) */}
      {isOpen && (
        <div
          style={{
            backgroundColor: '#0A3124',
            padding: '1rem 1.25rem 1.25rem 1.25rem',
            maxHeight: '380px',
            overflowY: 'auto'
          }}
        >
          <div style={{ maxWidth: '100%', margin: '0 auto' }}>
            {/* Header matching user's screenshot */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '0.85rem',
                borderBottom: '1px solid rgba(146, 222, 185, 0.2)',
                paddingBottom: '0.5rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.925rem', letterSpacing: '-0.01em' }}>
                  Complete 81-Route &amp; State Navigator (Sections 3 &amp; 15 Specification)
                </span>
                <span 
                  style={{ 
                    backgroundColor: 'rgba(212, 130, 22, 0.2)', 
                    color: '#F8D28A', 
                    border: '1px solid #D48216', 
                    padding: '1px 6px', 
                    borderRadius: '10px', 
                    fontSize: '0.65rem', 
                    fontWeight: 700 
                  }}
                >
                  QUICK ACCESS READY
                </span>
              </div>
              <span style={{ color: '#92DEB9', fontSize: '0.775rem', fontWeight: 500 }}>
                Click any route to navigate instantly in prototype (remains open for quick switching)
              </span>
            </div>

            {/* 5-Column Grid matching user's screenshot */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.85rem',
                alignItems: 'start'
              }}
            >
              {routeGroups.map((group, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    backgroundColor: '#07271C', 
                    padding: '0.85rem', 
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <h5 
                    style={{ 
                      color: '#D48216', 
                      fontSize: '0.78rem', 
                      fontWeight: 800,
                      marginBottom: '0.6rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid rgba(212, 130, 22, 0.2)',
                      paddingBottom: '0.35rem'
                    }}
                  >
                    {group.group}
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {group.routes.map((rt) => {
                      const isActive = currentRoute === rt.path || (rt.path === '/' && currentRoute === '') || (rt.path === '/farmer/dashboard' && currentRoute === '/farmer');
                      return (
                        <button
                          key={rt.path}
                          onClick={() => onNavigate(rt.path)}
                          title={`Navigate to ${rt.path}`}
                          style={{
                            textAlign: 'left',
                            fontSize: '0.76rem',
                            padding: '0.32rem 0.55rem',
                            borderRadius: '4px',
                            color: isActive ? '#FFFFFF' : '#A0B5AC',
                            backgroundColor: isActive ? '#16533F' : 'transparent',
                            border: isActive ? '1px solid #92DEB9' : '1px solid transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            fontWeight: isActive ? 700 : 500,
                            transition: 'all 0.1s ease',
                            width: '100%',
                            boxSizing: 'border-box'
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'rgba(22, 83, 63, 0.4)';
                              e.currentTarget.style.color = '#FFFFFF';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#A0B5AC';
                            }
                          }}
                        >
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '4px' }}>
                            {rt.label}
                          </span>
                          {isActive && <CheckCircle size={12} style={{ color: '#92DEB9', flexShrink: 0 }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
