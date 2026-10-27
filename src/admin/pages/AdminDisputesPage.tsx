import React, { useState } from 'react';
import { 
  AlertCircle, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Scale, 
  ArrowRight,
  Filter,
  Check,
  X
} from 'lucide-react';

interface AdminDisputesPageProps {
  onNavigate: (route: string) => void;
}

export const AdminDisputesPage: React.FC<AdminDisputesPageProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'open' | 'resolved'>('all');
  const [toastMessage, setToastMessage] = useState('');

  const handleMediate = (decision: string) => {
    setToastMessage(`Mediation recorded: ${decision}. Funds and status updated.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-page-overline">ADMINISTRATION</div>
      <div className="admin-page-title-row">
        <div>
          <h1 className="admin-page-title">Reports &amp; disputes</h1>
          <p className="admin-page-subtitle">
            Mediate order issues, generate marketplace intelligence reports, and protect trade trust.
          </p>
        </div>
        <button
          onClick={() => {
            setToastMessage('Opened new incident report drawer...');
            setTimeout(() => setToastMessage(''), 2500);
          }}
          className="admin-btn-primary"
        >
          <AlertCircle size={15} /> New incident report
        </button>
      </div>

      {toastMessage && (
        <div 
          style={{
            marginBottom: '1.5rem',
            padding: '1rem 1.25rem',
            backgroundColor: '#E8F5EE',
            border: '1px solid #C4E3D2',
            borderRadius: '12px',
            color: '#1B7A43',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <CheckCircle2 size={18} color="#1B7A43" style={{ flexShrink: 0 }} />
          <div>{toastMessage}</div>
        </div>
      )}

      {/* 4 Stat Cards matching Pananim reports & disputes.png */}
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Open disputes</span>
            <AlertCircle size={16} color="#BA4B24" />
          </div>
          <div className="admin-stat-card-value">3</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,10 Q40,12 80,24 T120,22" fill="none" stroke="#BA4B24" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#BA4B24', fontWeight: 600 }}>1 high-priority · 2 under review</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>High-priority</span>
            <ShieldAlert size={16} color="#BA4B24" />
          </div>
          <div className="admin-stat-card-value">1</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,8 Q40,15 80,20 T120,26" fill="none" stroke="#BA4B24" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#BA4B24', fontWeight: 600 }}>Requires resolution within 12h</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Awaiting reply</span>
            <Clock size={16} color="#D48216" />
          </div>
          <div className="admin-stat-card-value">1</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,15 Q30,22 60,18 T120,8" fill="none" stroke="#D48216" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#D48216', fontWeight: 600 }}>Farmer evidence requested</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Resolved this month</span>
            <CheckCircle2 size={16} color="#1B7A43" />
          </div>
          <div className="admin-stat-card-value">14</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,26 Q40,16 80,18 T120,4" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#1B7A43', fontWeight: 600 }}>100% satisfactory closure</div>
        </div>
      </div>

      {/* 2-Column Content Grid matching Pananim reports & disputes.png */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.9fr 1.1fr', 
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Disputes Queue */}
        <div className="admin-table-container">
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #EBE4DA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#0C3C2C' }}>Active dispute cases</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#5E6E64' }}>Buyer and farmer mediation queue.</p>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setActiveFilter('all')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: activeFilter === 'all' ? '#07271C' : '#F0F2F1',
                  color: activeFilter === 'all' ? '#FFFFFF' : '#5E6E64',
                  cursor: 'pointer'
                }}
              >
                All (3)
              </button>
              <button
                onClick={() => setActiveFilter('high')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: activeFilter === 'high' ? '#07271C' : '#F0F2F1',
                  color: activeFilter === 'high' ? '#FFFFFF' : '#5E6E64',
                  cursor: 'pointer'
                }}
              >
                High Priority (1)
              </button>
            </div>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Filed By</th>
                <th>Order Ref</th>
                <th>Issue Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>DP-2026-0314</td>
                <td>
                  <div style={{ fontWeight: 600 }}>Manila Bistro Group</div>
                  <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Buyer · Chef Marco</div>
                </td>
                <td style={{ fontFamily: 'monospace' }}>ORD-2026-8839</td>
                <td>
                  <div style={{ fontWeight: 600 }}>Quantity mismatch</div>
                  <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>120kg received vs 150kg paid</div>
                </td>
                <td><span className="admin-badge red">High</span></td>
                <td><span className="admin-badge orange">Open</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleMediate('Reviewing Case DP-0314')} className="admin-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    Mediate
                  </button>
                </td>
              </tr>

              <tr>
                <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>DP-2026-0312</td>
                <td>
                  <div style={{ fontWeight: 600 }}>Green Valley Market</div>
                  <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Buyer · Procurement</div>
                </td>
                <td style={{ fontFamily: 'monospace' }}>ORD-2026-8828</td>
                <td>
                  <div style={{ fontWeight: 600 }}>Transit delay</div>
                  <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Produce delivered +6h late</div>
                </td>
                <td><span className="admin-badge orange">Medium</span></td>
                <td><span className="admin-badge gray">Awaiting reply</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleMediate('Reviewing Case DP-0312')} className="admin-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    Mediate
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Column: Dispute Resolution Brief Card */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0C3C2C' }}>Resolution brief</h3>
            <span className="admin-badge red">Case DP-0314</span>
          </div>

          <div style={{ padding: '14px', backgroundColor: '#FAF7F2', borderRadius: '12px', border: '1px solid #EBE4DA', marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.95rem', marginBottom: '4px' }}>
              Quantity Shortfall: 30kg Carabao Mango
            </div>
            <div style={{ fontSize: '0.8rem', color: '#5E6E64', marginBottom: '12px' }}>
              Buyer reported 30kg shortfall upon arrival in Taguig kitchen. Digital delivery receipt indicates crates were partially repacked during transit.
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase', marginBottom: '8px' }}>
              Recommended Escrow Settlement
            </div>
            <div style={{ fontSize: '0.85rem', color: '#1D2D24', lineHeight: 1.5 }}>
              Refund ₱4,800.00 (30kg x ₱160/kg) to Buyer from escrow hold, release balance of ₱19,200.00 to Guimaras Fruit Coop.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => handleMediate('Approved Recommended Refund to Buyer & Release Balance to Farmer')}
              className="admin-btn-primary"
              style={{ justifyContent: 'center' }}
            >
              <Check size={14} /> Apply Recommended Settlement
            </button>
            <button
              onClick={() => handleMediate('Full refund to Buyer')}
              className="admin-btn-secondary"
              style={{ justifyContent: 'center' }}
            >
              Release 100% to Buyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
