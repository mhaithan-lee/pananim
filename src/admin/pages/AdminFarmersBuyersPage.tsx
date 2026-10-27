import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Check, 
  X, 
  FileText, 
  UserPlus,
  Building,
  MapPin
} from 'lucide-react';
import { Farm, VerificationApplication } from '../../types';

interface AdminFarmersBuyersPageProps {
  farms: Farm[];
  applications: VerificationApplication[];
  onNavigate: (route: string) => void;
  onUpdateFarm?: (farm: Farm) => void;
}

export const AdminFarmersBuyersPage: React.FC<AdminFarmersBuyersPageProps> = ({
  farms,
  applications,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'farmers' | 'buyers' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [selectedApp, setSelectedApp] = useState(applications[0] || null);

  const handleVerify = (name: string) => {
    setToastMessage(`Account for "${name}" has been verified! Badge granted.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleReject = (name: string) => {
    setToastMessage(`Verification for "${name}" requested additional documentation.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-page-overline">ADMINISTRATION</div>
      <div className="admin-page-title-row">
        <div>
          <h1 className="admin-page-title">Farmers &amp; buyers</h1>
          <p className="admin-page-subtitle">
            Manage platform accounts, verification status, and cooperative memberships.
          </p>
        </div>
        <button
          onClick={() => {
            setToastMessage('Opened create new user account modal...');
            setTimeout(() => setToastMessage(''), 2500);
          }}
          className="admin-btn-primary"
        >
          <UserPlus size={15} /> Add user account
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

      {/* 4 Stat Cards matching Pananim farmers & buyers.png */}
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Verified farmers</span>
            <Users size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">856</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,25 Q30,22 60,15 T120,5" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#1B7A43', fontWeight: 600 }}>812 active · 44 seasonal</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Registered buyers</span>
            <Building size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">432</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,26 Q40,16 80,18 T120,4" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub">312 restaurants · 120 markets</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Verification queue</span>
            <Clock size={16} color="#D48216" />
          </div>
          <div className="admin-stat-card-value">12</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,15 Q30,22 60,18 T120,8" fill="none" stroke="#D48216" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#D48216', fontWeight: 600 }}>8 farmers · 4 buyers</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Overdue reviews</span>
            <AlertTriangle size={16} color="#BA4B24" />
          </div>
          <div className="admin-stat-card-value">3</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,10 Q40,12 80,24 T120,22" fill="none" stroke="#BA4B24" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#BA4B24', fontWeight: 600 }}>Action required &gt; 48h</div>
        </div>
      </div>

      {/* Main 2-Column Directory & Queue matching Pananim farmers & buyers.png */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.9fr 1.1fr', 
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Directory Table */}
        <div className="admin-table-container">
          {/* Tabs */}
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
              All accounts 1,288
            </button>
            <button
              onClick={() => setActiveTab('farmers')}
              style={{
                background: 'none',
                border: 'none',
                paddingBottom: '14px',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'farmers' ? 700 : 500,
                color: activeTab === 'farmers' ? '#07271C' : '#5E6E64',
                borderBottom: activeTab === 'farmers' ? '2px solid #07271C' : 'none',
                cursor: 'pointer'
              }}
            >
              Farmers 856
            </button>
            <button
              onClick={() => setActiveTab('buyers')}
              style={{
                background: 'none',
                border: 'none',
                paddingBottom: '14px',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'buyers' ? 700 : 500,
                color: activeTab === 'buyers' ? '#07271C' : '#5E6E64',
                borderBottom: activeTab === 'buyers' ? '2px solid #07271C' : 'none',
                cursor: 'pointer'
              }}
            >
              Buyers 432
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              style={{
                background: 'none',
                border: 'none',
                paddingBottom: '14px',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'pending' ? 700 : 500,
                color: activeTab === 'pending' ? '#07271C' : '#5E6E64',
                borderBottom: activeTab === 'pending' ? '2px solid #07271C' : 'none',
                cursor: 'pointer'
              }}
            >
              Pending verification 12
            </button>
          </div>

          {/* Search bar */}
          <div style={{ padding: '14px 24px', backgroundColor: '#FAF7F2', borderBottom: '1px solid #EBE4DA' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by name, cooperative, or ID..."
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
                <th>Account / User</th>
                <th>Role</th>
                <th>Region / Coop</th>
                <th>Completed Trades</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#D1E7DD', color: '#0F5132', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                      RS
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0C3C2C' }}>Ramon Santos</div>
                      <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Santos Organic Farms</div>
                    </div>
                  </div>
                </td>
                <td><span className="admin-badge green">Farmer</span></td>
                <td>Bulacan, Region III</td>
                <td><span style={{ fontWeight: 700 }}>48 orders</span> (₱380k)</td>
                <td><span className="admin-badge green">Verified</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleVerify('Ramon Santos')} className="admin-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    Details
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#EBF3FE', color: '#1859B4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                      AK
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0C3C2C' }}>Anita's Kitchen &amp; Co.</div>
                      <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Institutional Buyer</div>
                    </div>
                  </div>
                </td>
                <td><span className="admin-badge blue">Buyer</span></td>
                <td>Quezon City, NCR</td>
                <td><span style={{ fontWeight: 700 }}>34 orders</span> (₱290k)</td>
                <td><span className="admin-badge green">Verified</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleVerify("Anita's Kitchen")} className="admin-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    Details
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FEF3E2', color: '#965307', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                      CR
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0C3C2C' }}>Carlo Reyes</div>
                      <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Reyes Family Produce</div>
                    </div>
                  </div>
                </td>
                <td><span className="admin-badge green">Farmer</span></td>
                <td>Nueva Ecija, Region III</td>
                <td><span style={{ color: '#8A7B76' }}>0 orders</span> (New)</td>
                <td><span className="admin-badge orange">Pending review</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleVerify('Carlo Reyes')} className="admin-btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    <Check size={12} /> Verify
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Column: "Next in verification queue" matching Pananim farmers & buyers.png */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0C3C2C' }}>Next in verification queue</h3>
            <span className="admin-badge orange">1 of 12</span>
          </div>

          <div style={{ padding: '14px', backgroundColor: '#FAF7F2', borderRadius: '12px', border: '1px solid #EBE4DA', marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '1rem', marginBottom: '2px' }}>
              Carlo Reyes · Reyes Family Produce
            </div>
            <div style={{ fontSize: '0.8rem', color: '#5E6E64', marginBottom: '12px' }}>
              Cabanatuan City, Nueva Ecija · 3.5 Hectares
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase', marginBottom: '8px' }}>
              Submitted Evidence
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1B7A43' }}>
                <CheckCircle2 size={15} /> RSBSA Certificate (Verified in DA database)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1B7A43' }}>
                <CheckCircle2 size={15} /> PhilSys National ID (Front &amp; Back)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1B7A43' }}>
                <CheckCircle2 size={15} /> Barangay Certificate of Farming Residency
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleVerify('Carlo Reyes')}
              className="admin-btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Check size={14} /> Approve &amp; Verify
            </button>
            <button
              onClick={() => handleReject('Carlo Reyes')}
              className="admin-btn-secondary"
            >
              <X size={14} /> More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
