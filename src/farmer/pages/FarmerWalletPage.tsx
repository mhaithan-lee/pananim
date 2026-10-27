import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Plus, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  TrendingUp,
  Percent,
  Download
} from 'lucide-react';

interface FarmerWalletPageProps {
  onNavigate: (route: string) => void;
}

export const FarmerWalletPage: React.FC<FarmerWalletPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  const transactions = [
    {
      id: '#TRX-99210',
      date: 'Oct 28, 2026',
      type: 'SALE',
      title: 'Order #ORD-8842 - Red Onions (250kg)',
      subtitle: "Buyer: Anita's Kitchen & Co.",
      amount: '+ ₱30,000.00',
      isCredit: true,
      status: 'COMPLETED'
    },
    {
      id: '#TRX-99185',
      date: 'Oct 25, 2026',
      type: 'WITHDRAWAL',
      title: 'Transfer to GCash',
      subtitle: 'Account: 0917-***-8891 (Ramon Santos)',
      amount: '- ₱15,000.00',
      isCredit: false,
      status: 'COMPLETED'
    },
    {
      id: '#TRX-99184',
      date: 'Oct 25, 2026',
      type: 'FEE',
      title: 'Pananim Escrow Platform Fee (1.5%)',
      subtitle: 'Transaction fee for Order #ORD-8839',
      amount: '- ₱450.00',
      isCredit: false,
      status: 'COMPLETED'
    },
    {
      id: '#TRX-99215',
      date: 'Oct 28, 2026',
      type: 'SALE',
      title: 'Order #ORD-8845 - Cherry Tomatoes (100kg)',
      subtitle: 'Buyer: Green Valley Market',
      amount: '+ ₱8,500.00',
      isCredit: true,
      status: 'PENDING'
    }
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = !searchQuery.trim() || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleWithdraw = () => {
    setToastMessage('Withdrawal payout request submitted! ₱48,500 will be credited to GCash within 2 hours.');
    setTimeout(() => setToastMessage(''), 3500);
  };

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5E6E64' }}>
          <span onClick={() => onNavigate('/farmer/dashboard')} style={{ cursor: 'pointer', color: '#0C3C2C', fontWeight: 600 }}>Overview</span>
          <span>&rsaquo;</span>
          <span style={{ color: '#1D2D24', fontWeight: 600 }}>Farmer Wallet &amp; Settlements</span>
        </div>
        <button
          onClick={() => onNavigate('/farmer/dashboard')}
          style={{ background: 'none', border: 'none', color: '#0C3C2C', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          &larr; Back to Overview
        </button>
      </div>

      {/* Header and Payout Button */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h1 style={{ fontSize: '2.4rem', color: '#0C3C2C', margin: '0 0 0.35rem 0', fontWeight: 800 }}>
            Farmer Wallet
          </h1>
          <p style={{ color: '#5E6E64', maxWidth: '650px', margin: 0 }}>
            Automated escrow payouts, real-time balance settlements, and transparent harvest revenue tracking.
          </p>
        </div>

        <button
          onClick={handleWithdraw}
          className="farmer-btn-primary"
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
        >
          <ArrowUpRight size={18} /> Request Payout to GCash / Bank
        </button>
      </div>

      {/* Toast Alert */}
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

      {/* 3 Metric Stat Cards strictly matching Farmer Wallet · Pananim.png */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}
      >
        {/* Card 1: Available Balance */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">AVAILABLE BALANCE</span>
            <div className="farmer-stat-icon-wrapper" style={{ backgroundColor: '#E8F5EE', color: '#1B7A43' }}>
              <Wallet size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.2rem 0' }}>
            <span className="farmer-stat-value" style={{ margin: 0 }}>
              ₱48,500.00
            </span>
            <span style={{ fontSize: '0.85rem', color: '#1B7A43', fontWeight: 600 }}>Ready to withdraw</span>
          </div>
        </div>

        {/* Card 2: In Escrow */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">HELD IN ESCROW</span>
            <div className="farmer-stat-icon-wrapper" style={{ backgroundColor: '#FEF3E2', color: '#D48216' }}>
              <Clock size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.2rem 0' }}>
            <span className="farmer-stat-value" style={{ margin: 0 }}>
              ₱22,400.00
            </span>
            <span style={{ fontSize: '0.85rem', color: '#5E6E64' }}>Pending buyer delivery confirm</span>
          </div>
        </div>

        {/* Card 3: Total Disbursed */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">LIFETIME PAYOUTS</span>
            <div className="farmer-stat-icon-wrapper">
              <TrendingUp size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.2rem 0' }}>
            <span className="farmer-stat-value" style={{ margin: 0 }}>
              ₱412,850.00
            </span>
            <span style={{ fontSize: '0.85rem', color: '#5E6E64' }}>Directly to bank/e-wallet</span>
          </div>
        </div>
      </div>

      {/* 30-Day SVG Earnings Trend Curve (from Farmer Wallet · Pananim.png) */}
      <div className="farmer-card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 className="farmer-card-title" style={{ margin: 0 }}>
              <TrendingUp size={20} color="#1B7A43" /> 30-Day Harvest Revenue Trend
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#5E6E64', margin: '4px 0 0 0' }}>
              Daily escrow releases and completed wholesale settlements.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: '#1B7A43', fontWeight: 700 }}>Avg. ₱14,200 / day</span>
          </div>
        </div>

        {/* SVG Curve Chart */}
        <div style={{ width: '100%', height: '180px', position: 'relative' }}>
          <svg viewBox="0 0 800 160" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="farmerWalletGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1B7A43" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#1B7A43" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,120 Q100,100 200,80 T400,60 T600,30 T800,20 L800,160 L0,160 Z"
              fill="url(#farmerWalletGrad)"
            />
            <path
              d="M0,120 Q100,100 200,80 T400,60 T600,30 T800,20"
              fill="none"
              stroke="#1B7A43"
              strokeWidth="3.5"
            />
            {/* Data points */}
            <circle cx="200" cy="80" r="5" fill="#FFFFFF" stroke="#1B7A43" strokeWidth="3" />
            <circle cx="400" cy="60" r="5" fill="#FFFFFF" stroke="#1B7A43" strokeWidth="3" />
            <circle cx="600" cy="30" r="5" fill="#FFFFFF" stroke="#1B7A43" strokeWidth="3" />
            <circle cx="800" cy="20" r="6" fill="#D48216" stroke="#FFFFFF" strokeWidth="2.5" />
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8C9C92', marginTop: '8px' }}>
          <span>1 Oct</span>
          <span>8 Oct</span>
          <span>15 Oct</span>
          <span>22 Oct</span>
          <span>Today (28 Oct)</span>
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="farmer-card" style={{ padding: '2rem' }}>
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderBottom: '1px solid #EBE4DA', 
            paddingBottom: '1rem', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button
              onClick={() => setTypeFilter('All')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0 0 0.5rem 0',
                fontSize: '0.95rem',
                fontWeight: typeFilter === 'All' ? 700 : 500,
                color: typeFilter === 'All' ? '#0C3C2C' : '#5E6E64',
                borderBottom: typeFilter === 'All' ? '2px solid #0C3C2C' : 'none',
                cursor: 'pointer'
              }}
            >
              All Settlements
            </button>
            <button
              onClick={() => setTypeFilter('SALE')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0 0 0.5rem 0',
                fontSize: '0.95rem',
                fontWeight: typeFilter === 'SALE' ? 700 : 500,
                color: typeFilter === 'SALE' ? '#0C3C2C' : '#5E6E64',
                borderBottom: typeFilter === 'SALE' ? '2px solid #0C3C2C' : 'none',
                cursor: 'pointer'
              }}
            >
              Crop Sales
            </button>
            <button
              onClick={() => setTypeFilter('WITHDRAWAL')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0 0 0.5rem 0',
                fontSize: '0.95rem',
                fontWeight: typeFilter === 'WITHDRAWAL' ? 700 : 500,
                color: typeFilter === 'WITHDRAWAL' ? '#0C3C2C' : '#5E6E64',
                borderBottom: typeFilter === 'WITHDRAWAL' ? '2px solid #0C3C2C' : 'none',
                cursor: 'pointer'
              }}
            >
              Payouts
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search reference or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '7px 12px 7px 32px',
                borderRadius: '8px',
                border: '1px solid #D5CABE',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <Search size={14} color="#8A7B76" style={{ position: 'absolute', left: '10px', top: '10px' }} />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="farmer-table-container">
          <table className="farmer-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Date</th>
                <th>Type</th>
                <th>Details</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <span style={{ fontWeight: 700, color: '#0C3C2C', fontFamily: 'monospace' }}>{tx.id}</span>
                  </td>
                  <td style={{ color: '#5E6E64' }}>{tx.date}</td>
                  <td>
                    <span className={`farmer-badge ${tx.type === 'SALE' ? 'green' : tx.type === 'WITHDRAWAL' ? 'orange' : 'gray'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#1D2D24' }}>{tx.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>{tx.subtitle}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: tx.isCredit ? '#1B7A43' : '#BA4B24', fontSize: '1rem' }}>
                      {tx.amount}
                    </div>
                  </td>
                  <td>
                    <span className={`farmer-badge ${tx.status === 'COMPLETED' ? 'green' : 'orange'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
