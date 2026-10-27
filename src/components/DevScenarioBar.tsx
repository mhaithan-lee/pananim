import React, { useState } from 'react';
import { User, Role } from '../types';
import { 
  Terminal, 
  Users, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  RefreshCw, 
  Sparkles,
  ExternalLink
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'scenarios' | 'routes'>('scenarios');

  const routeGroups = [
    {
      group: 'Public & Marketplace',
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
      group: 'Auth & Verification (Consolidated)',
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
      group: 'Buyer Commerce & Workspace',
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
      group: 'Farmer Operations (Consolidated 6 Destinations)',
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
      group: 'Admin Experience (Redesigned)',
      routes: [
        { path: '/admin', label: 'Admin Overview (Pananim admin overview)' },
        { path: '/admin/crops', label: 'Crop Listings (Pananim crop listings)' },
        { path: '/admin/farmers', label: 'Farmers & Buyers (Pananim farmers & buyers)' },
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
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}
    >
      <div 
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.45rem 1.25rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
            <Terminal size={12} /> PROTOTYPE SUITE
          </span>
          <span style={{ color: '#A0B5AC' }}>
            Current Route: <strong style={{ color: '#FFFFFF' }}>{currentRoute}</strong>
          </span>
        </div>

        {/* Persona Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#A0B5AC', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
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
              fontSize: '0.775rem'
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
              fontSize: '0.775rem'
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
              fontSize: '0.775rem'
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
              fontSize: '0.775rem'
            }}
          >
            Admin (Atty. Cristina)
          </button>
        </div>

        {/* Worked Scenario & Route Drawer Toggle */}
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
              border: '1px solid #D46944'
            }}
          >
            <Sparkles size={12} /> Run ₱950 Worked Demo
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              backgroundColor: '#16533F',
              color: '#FFFFFF',
              padding: '0.25rem 0.65rem',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              border: '1px solid #2B785E'
            }}
          >
            <Layers size={12} /> Route Navigator {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {/* Expanded Route Navigator Drawer */}
      {isOpen && (
        <div
          style={{
            backgroundColor: '#0A3124',
            borderTop: '1px solid #1D4B39',
            padding: '1.25rem',
            maxHeight: '420px',
            overflowY: 'auto'
          }}
        >
          <div className="container">
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '1rem',
                borderBottom: '1px solid #16533F',
                paddingBottom: '0.5rem'
              }}
            >
              <span style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.9rem' }}>
                Complete 81-Route &amp; State Navigator (Sections 3 &amp; 15 Specification)
              </span>
              <span style={{ color: '#92DEB9', fontSize: '0.75rem' }}>
                Click any route to navigate instantly in prototype
              </span>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem'
              }}
            >
              {routeGroups.map((group, idx) => (
                <div key={idx} style={{ backgroundColor: '#07271C', padding: '0.75rem', borderRadius: '8px' }}>
                  <h5 style={{ color: '#D48216', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {group.group}
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {group.routes.map((rt) => (
                      <button
                        key={rt.path}
                        onClick={() => {
                          onNavigate(rt.path);
                          setIsOpen(false);
                        }}
                        style={{
                          textAlign: 'left',
                          fontSize: '0.75rem',
                          padding: '0.3rem 0.5rem',
                          borderRadius: '4px',
                          color: currentRoute === rt.path ? '#FFFFFF' : '#A0B5AC',
                          backgroundColor: currentRoute === rt.path ? '#16533F' : 'transparent',
                          border: currentRoute === rt.path ? '1px solid #92DEB9' : '1px solid transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {rt.label}
                        </span>
                        {currentRoute === rt.path && <CheckCircle size={11} style={{ color: '#92DEB9', flexShrink: 0 }} />}
                      </button>
                    ))}
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
