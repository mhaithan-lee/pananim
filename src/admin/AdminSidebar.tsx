import React from 'react';
import { 
  LayoutGrid, 
  Sprout, 
  Users, 
  Receipt, 
  Truck, 
  TrendingUp, 
  AlertCircle, 
  FileCheck, 
  Settings, 
  ShieldCheck, 
  ChevronDown, 
  Headphones, 
  ExternalLink 
} from 'lucide-react';

interface AdminSidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  pendingListingsCount?: number;
  pendingUsersCount?: number;
  openDisputesCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentRoute,
  onNavigate,
  pendingListingsCount = 24,
  pendingUsersCount = 12,
  openDisputesCount = 3
}) => {
  const marketplaceNav = [
    { label: 'Overview', route: '/admin', icon: LayoutGrid, match: (r: string) => r === '/admin' || r === '/admin/overview' || r === '/admin/dashboard' },
    { label: 'User management', route: '/admin/users', icon: Users, badge: pendingUsersCount, match: (r: string) => r.startsWith('/admin/users') || r.startsWith('/admin/farmers') || r.startsWith('/admin/verifications') },
    { label: 'Crop listings', route: '/admin/crops', icon: Sprout, badge: pendingListingsCount, match: (r: string) => r.startsWith('/admin/crops') },
    { label: 'Transactions', route: '/admin/transactions', icon: Receipt, match: (r: string) => r.startsWith('/admin/transactions') || r.startsWith('/admin/finance') || r.startsWith('/admin/logistics') },
    { label: 'Market prices', route: '/admin/market-prices', icon: TrendingUp, match: (r: string) => r.startsWith('/admin/market-prices') },
    { label: 'Reports & disputes', route: '/admin/reports', icon: AlertCircle, badge: openDisputesCount, match: (r: string) => r.startsWith('/admin/reports') || r.startsWith('/admin/disputes') },
  ];

  const adminNav = [
    { label: 'Audit log', route: '/admin/audit-log', icon: FileCheck, match: (r: string) => r.startsWith('/admin/audit-log') },
    { label: 'Settings', route: '/admin/settings', icon: Settings, match: (r: string) => r.startsWith('/admin/settings') },
  ];

  return (
    <aside className="admin-sidebar">
      {/* Brand & Logo */}
      <div className="admin-sidebar-header">
        <div 
          onClick={() => onNavigate('/admin')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          {/* Circuit Leaf SVG Logo from PNG */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <path d="M16 6C16 6 12 11 12 16C12 21 16 26 16 26" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 6C16 6 20 11 20 16C20 21 16 26 16 26" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="6" x2="16" y2="26" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16" cy="6" r="2.5" fill="#E8A838" />
              <circle cx="12" cy="16" r="2" fill="#E8A838" />
              <circle cx="20" cy="16" r="2" fill="#E8A838" />
            </svg>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Pananim
              </div>
              <div style={{ color: '#8EABA0', fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 600, textTransform: 'uppercase' }}>
                BRIDGING FARMS &amp; MARKETS
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Pill */}
        <div className="admin-sidebar-workspace-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="#22C55E" />
            <span>Admin workspace</span>
          </div>
          <ChevronDown size={14} color="#8EABA0" />
        </div>
      </div>

      {/* Navigation Sections */}
      <div style={{ flex: 1 }}>
        {/* Marketplace Section */}
        <div className="admin-sidebar-section-title">MARKETPLACE</div>
        <div className="admin-sidebar-nav">
          {marketplaceNav.map((item) => {
            const isActive = item.match(currentRoute);
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.route)}
                className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={17} color={isActive ? '#FFFFFF' : '#8EABA0'} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="admin-sidebar-badge">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Administration Section */}
        <div className="admin-sidebar-section-title">ADMINISTRATION</div>
        <div className="admin-sidebar-nav">
          {adminNav.map((item) => {
            const isActive = item.match(currentRoute);
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.route)}
                className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={17} color={isActive ? '#FFFFFF' : '#8EABA0'} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Support Card & Marketplace Link */}
      <div className="admin-sidebar-footer">
        <div className="admin-sidebar-help-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#FFFFFF', fontWeight: 600 }}>
            <Headphones size={15} color="#E8A838" />
            <span>Here to help you grow.</span>
          </div>
          <p style={{ margin: '0 0 10px 0', color: '#8EABA0', fontSize: '0.75rem', lineHeight: 1.4 }}>
            Find answers in the admin guide.
          </p>
          <a
            onClick={() => onNavigate('/help')}
            style={{ color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer', textDecoration: 'none' }}
          >
            Open help center ↗
          </a>
        </div>

        <button
          onClick={() => onNavigate('/shop')}
          style={{
            background: 'none',
            border: 'none',
            color: '#8EABA0',
            fontSize: '0.8rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '4px 6px',
            textAlign: 'left'
          }}
        >
          <ExternalLink size={14} />
          <span>View marketplace ↗</span>
        </button>
      </div>
    </aside>
  );
};
