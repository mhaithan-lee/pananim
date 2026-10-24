import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Mail, MapPin, ExternalLink, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer 
      style={{
        backgroundColor: '#0C3C2C',
        color: '#FFFFFF',
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
        marginTop: 'auto',
        borderTop: '3px solid #D48216'
      }}
      className="no-print"
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '340px' }}>
            <Logo variant="white" size="lg" />
            <p style={{ color: '#D5E6DE', fontSize: '0.9rem', marginTop: '1.25rem', lineHeight: 1.6 }}>
              A digital platform facilitating agricultural logistics by putting Philippine farmers and agricultural cooperatives in direct contact with urban markets and wholesale buyers.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92DEB9', fontSize: '0.825rem' }}>
              <ShieldCheck size={18} />
              <span>Verified Grower &amp; Fair Trade Logistics</span>
            </div>
          </div>

          {/* Sourcing & Marketplace */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-headings)' }}>
              Marketplace
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button 
                  onClick={() => onNavigate('/shop')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Browse Available Harvests
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/market-prices')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Regional Wholesale Price Reference
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/farmers')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Grower &amp; Cooperative Directory
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/delivery-coverage')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Delivery Coverage &amp; Shared Cargo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/how-it-works')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  How Ordering Works
                </button>
              </li>
            </ul>
          </div>

          {/* For Farmers */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-headings)' }}>
              For Farmers &amp; Coops
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button 
                  onClick={() => onNavigate('/sell-with-pananim')} 
                  style={{ color: '#D48216', fontSize: '0.875rem', fontWeight: 600, textAlign: 'left' }}
                >
                  🌾 Sell Your Harvest Direct
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/farmer/onboarding')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Farmer Onboarding Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/farmer/verification')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Identity &amp; Land Evidence Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/farmer/dashboard')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Farmer Operations Workspace
                </button>
              </li>
            </ul>
          </div>

          {/* Help & Policies */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-headings)' }}>
              Help &amp; Transparency
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button 
                  onClick={() => onNavigate('/help')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Help Center &amp; FAQs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/policies/terms')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Marketplace Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/policies/cancellation')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Quality, Shortage &amp; Refund Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/policies/delivery')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Freight &amp; Manual Tracking Rules
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/contact')} 
                  style={{ color: '#D5E6DE', fontSize: '0.875rem', textAlign: 'left' }}
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#1A5340', margin: '2rem 0' }} />

        {/* Middle Credits & Purpose Statement matching Screenshot 215453 */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: '#A0B5AC',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ fontStyle: 'italic', color: '#D5E6DE', fontSize: '0.95rem' }}>
            &ldquo;Connecting the people who feed us.&rdquo;
          </div>
          <div>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem', fontWeight: 700, color: '#D48216' }}>
              BUILT WITH PURPOSE BY
            </span>
            <div style={{ marginTop: '0.25rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.03em' }}>
              Caliuag &bull; Carmona &bull; Dumagjug &bull; Regalario &bull; Rodriguez &bull; Viray
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: '#8CA69B'
          }}
        >
          <div>
            &copy; 2026 Pananim Philippines. Academic &amp; Product Specification Prototype.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Demo Data Context: All farm names and prices are illustrative wholesale fixtures.</span>
            <span style={{ color: '#D5E6DE' }}>@pananim.ph</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
