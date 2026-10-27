import React from 'react';
import { Logo } from '../components/Logo';
import { ShieldCheck, Heart, Leaf } from 'lucide-react';

interface FarmerFooterProps {
  onNavigate: (route: string) => void;
}

export const FarmerFooter: React.FC<FarmerFooterProps> = ({ onNavigate }) => {
  return (
    <footer
      style={{
        backgroundColor: '#07271C',
        color: '#E2ECE5',
        borderTop: '3px solid #D48216',
        padding: '3rem 0 2rem 0',
        marginTop: 'auto'
      }}
    >
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Logo />
            </div>
            <p style={{ fontSize: '0.875rem', color: '#9BB2A4', lineHeight: 1.6, maxWidth: '300px' }}>
              Bridging Filipino agricultural producers directly with verified institutional buyers, cooperatives, and food enterprises.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1rem', color: '#D48216', fontSize: '0.8rem', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>DA Bantay Presyo Aligned Marketplace</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Farmer Tools
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <span onClick={() => onNavigate('/farmer/inventory')} style={{ fontSize: '0.85rem', color: '#B6CBC0', cursor: 'pointer' }}>My Crops & Stock</span>
              <span onClick={() => onNavigate('/farmer/inventory/new')} style={{ fontSize: '0.85rem', color: '#B6CBC0', cursor: 'pointer' }}>List New Crop</span>
              <span onClick={() => onNavigate('/farmer/orders')} style={{ fontSize: '0.85rem', color: '#B6CBC0', cursor: 'pointer' }}>Wholesale Orders</span>
              <span onClick={() => onNavigate('/farmer/settlements')} style={{ fontSize: '0.85rem', color: '#B6CBC0', cursor: 'pointer' }}>Farmer Wallet</span>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Support & Verification
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <span onClick={() => onNavigate('/farmer/verification')} style={{ fontSize: '0.85rem', color: '#B6CBC0', cursor: 'pointer' }}>RSBSA Verification Help</span>
              <span onClick={() => onNavigate('/market-prices')} style={{ fontSize: '0.85rem', color: '#B6CBC0', cursor: 'pointer' }}>Price Benchmarks</span>
              <span onClick={() => onNavigate('/farmer/messages')} style={{ fontSize: '0.85rem', color: '#B6CBC0', cursor: 'pointer' }}>Buyer Messages</span>
              <span onClick={() => onNavigate('/help')} style={{ fontSize: '0.85rem', color: '#B6CBC0', cursor: 'pointer' }}>Help Center</span>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Farmer Helpdesk
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#9BB2A4', lineHeight: 1.5, margin: 0 }}>
              Need assistance with your harvest listing or payout? Our agricultural liaison team is available 6:00 AM – 6:00 PM PHT.
            </p>
            <div style={{ marginTop: '0.85rem', fontSize: '0.85rem', fontWeight: 600, color: '#F8D28A' }}>
              Hotline: (02) 8820-FARM (3276)
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1.5rem',
            fontSize: '0.8rem',
            color: '#7E9789',
            gap: '1rem'
          }}
        >
          <div>© 2026 Pananim AgriTech Philippines Inc. Empowering local Filipino growers.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span onClick={() => onNavigate('/policies/terms')} style={{ cursor: 'pointer' }}>Terms</span>
            <span onClick={() => onNavigate('/policies/privacy')} style={{ cursor: 'pointer' }}>Privacy</span>
            <span onClick={() => onNavigate('/delivery-coverage')} style={{ cursor: 'pointer' }}>Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
