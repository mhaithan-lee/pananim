import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Check, 
  Filter,
  DollarSign
} from 'lucide-react';
import { OrderGroup } from '../../types';

interface AdminTransactionsPageProps {
  orders: OrderGroup[];
  onNavigate: (route: string) => void;
}

export const AdminTransactionsPage: React.FC<AdminTransactionsPageProps> = ({
  orders,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'escrow' | 'payouts' | 'disputed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleProcessBatch = () => {
    setToastMessage('Processing payout batch of ₱48,900.00 via automated GCash & PesoNet gateway...');
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleReconcile = (refId: string) => {
    setToastMessage(`Transaction ${refId} verified and reconciled against bank statement.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-page-overline">ADMINISTRATION</div>
      <div className="admin-page-title-row">
        <div>
          <h1 className="admin-page-title">Transactions</h1>
          <p className="admin-page-subtitle">
            Marketplace escrow, order settlements, and payment reconciliation.
          </p>
        </div>
        <button
          onClick={() => {
            setToastMessage('Exporting full financial ledger CSV...');
            setTimeout(() => setToastMessage(''), 2500);
          }}
          className="admin-btn-primary"
        >
          <Download size={15} /> Download ledger
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

      {/* 4 Stat Cards matching Pananim transactions.png */}
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Completed trade value</span>
            <Receipt size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">₱284.5k</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,26 Q40,16 80,18 T120,4" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#1B7A43', fontWeight: 600 }}>₱42.1k today</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Completed orders</span>
            <CheckCircle2 size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">76</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,25 Q30,22 60,15 T120,5" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub">100% fulfilled without dispute</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Payouts pending</span>
            <Clock size={16} color="#D48216" />
          </div>
          <div className="admin-stat-card-value">₱48.9k</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,15 Q30,22 60,18 T120,8" fill="none" stroke="#D48216" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#D48216', fontWeight: 600 }}>8 farmer disbursements ready</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Settlement exceptions</span>
            <AlertCircle size={16} color="#BA4B24" />
          </div>
          <div className="admin-stat-card-value">2</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,10 Q40,12 80,24 T120,22" fill="none" stroke="#BA4B24" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#BA4B24', fontWeight: 600 }}>Awaiting bank routing fix</div>
        </div>
      </div>

      {/* 2-Column Ledger Layout matching Pananim transactions.png */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.9fr 1.1fr', 
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Ledger Table */}
        <div className="admin-table-container">
          <div style={{ display: 'flex', gap: '16px', padding: '16px 24px 0 24px', borderBottom: '1px solid #EBE4DA' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                background: 'none',
                border: 'none',
                paddingBottom: '14px',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'all' ? 700 : 500,
                color: activeTab === 'all' ? '#07271C' : '#5E6E64',
                borderBottom: activeTab === 'all' ? '2px solid #07271C' : 'none',
                cursor: 'pointer'
              }}
            >
              All transactions 142
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              style={{
                background: 'none',
                border: 'none',
                paddingBottom: '14px',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'completed' ? 700 : 500,
                color: activeTab === 'completed' ? '#07271C' : '#5E6E64',
                borderBottom: activeTab === 'completed' ? '2px solid #07271C' : 'none',
                cursor: 'pointer'
              }}
            >
              Completed 76
            </button>
            <button
              onClick={() => setActiveTab('escrow')}
              style={{
                background: 'none',
                border: 'none',
                paddingBottom: '14px',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'escrow' ? 700 : 500,
                color: activeTab === 'escrow' ? '#07271C' : '#5E6E64',
                borderBottom: activeTab === 'escrow' ? '2px solid #07271C' : 'none',
                cursor: 'pointer'
              }}
            >
              Escrow held 48
            </button>
            <button
              onClick={() => setActiveTab('payouts')}
              style={{
                background: 'none',
                border: 'none',
                paddingBottom: '14px',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'payouts' ? 700 : 500,
                color: activeTab === 'payouts' ? '#07271C' : '#5E6E64',
                borderBottom: activeTab === 'payouts' ? '2px solid #07271C' : 'none',
                cursor: 'pointer'
              }}
            >
              Payouts ready 8
            </button>
          </div>

          <div style={{ padding: '14px 24px', backgroundColor: '#FAF7F2', borderBottom: '1px solid #EBE4DA' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by order ID or party name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 12px 7px 32px',
                  borderRadius: '8px',
                  border: '1px solid #D5CABE',
                  fontSize: '0.825rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <Search size={14} color="#8A7B76" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            </div>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference ID</th>
                <th>Parties</th>
                <th>Commodity Item</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>TRX-2026-9921</td>
                <td>
                  <div style={{ fontWeight: 600 }}>Anita's Kitchen</div>
                  <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Seller: Ramon Santos</div>
                </td>
                <td>Red Onions (250 kg)</td>
                <td><strong style={{ color: '#0C3C2C' }}>₱30,000.00</strong></td>
                <td><span className="admin-badge gray">GCash Escrow</span></td>
                <td><span className="admin-badge green">Released</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleReconcile('TRX-2026-9921')} className="admin-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    Reconcile
                  </button>
                </td>
              </tr>

              <tr>
                <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>TRX-2026-9922</td>
                <td>
                  <div style={{ fontWeight: 600 }}>Green Valley Market</div>
                  <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Seller: Elena Corpuz</div>
                </td>
                <td>Cherry Tomatoes (100 kg)</td>
                <td><strong style={{ color: '#0C3C2C' }}>₱8,500.00</strong></td>
                <td><span className="admin-badge gray">Bank Transfer</span></td>
                <td><span className="admin-badge orange">In Escrow</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleReconcile('TRX-2026-9922')} className="admin-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    Reconcile
                  </button>
                </td>
              </tr>

              <tr>
                <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>TRX-2026-9918</td>
                <td>
                  <div style={{ fontWeight: 600 }}>Manila Bistro Group</div>
                  <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Seller: Guimaras Coop</div>
                </td>
                <td>Mangoes (150 kg)</td>
                <td><strong style={{ color: '#0C3C2C' }}>₱24,000.00</strong></td>
                <td><span className="admin-badge gray">GCash Escrow</span></td>
                <td><span className="admin-badge green">Released</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleReconcile('TRX-2026-9918')} className="admin-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    Reconcile
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Column: Upcoming Payout Run Card */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0C3C2C' }}>Upcoming payout run</h3>
            <span className="admin-badge green">Scheduled</span>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#FAF7F2', borderRadius: '12px', border: '1px solid #EBE4DA', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.75rem', color: '#8A7B76', textTransform: 'uppercase', fontWeight: 600 }}>
              Total Batch Payout Value
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0C3C2C', margin: '4px 0 8px 0' }}>
              ₱48,900.00
            </div>
            <div style={{ fontSize: '0.8rem', color: '#5E6E64' }}>
              8 verified farmers awaiting automated release to GCash and PesoNet depository accounts.
            </div>
            <div style={{ borderTop: '1px solid #EBE4DA', paddingTop: '10px', marginTop: '12px', fontSize: '0.75rem', color: '#1B7A43', fontWeight: 600 }}>
              Next execution: Today at 2:00 PM PHT
            </div>
          </div>

          <button
            onClick={handleProcessBatch}
            className="admin-btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <ArrowUpRight size={15} /> Process payouts batch now
          </button>
        </div>
      </div>
    </div>
  );
};
