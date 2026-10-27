import React, { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  Sliders, 
  Shield, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AdminAuditLogPageProps {
  onNavigate: (route: string) => void;
}

export const AdminAuditLogPage: React.FC<AdminAuditLogPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'admin' | 'system' | 'security'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  const auditRows = [
    {
      time: '9:35 AM',
      date: '19 Oct 2026',
      actor: 'Ana Santos',
      role: 'Administrator',
      activity: 'Farmer account verified',
      detail: 'Identity and farm documents approved',
      resource: 'Users',
      resourceSub: 'Carlo Reyes · FR-0856',
      ip: '49.144.82.16',
      code: 'AL-10842',
      outcome: 'Success',
      category: 'admin'
    },
    {
      time: '9:28 AM',
      date: '19 Oct 2026',
      actor: 'Ana Santos',
      role: 'Administrator',
      activity: 'Security policy updated',
      detail: 'Session timeout changed: 60 → 30 min',
      resource: 'Settings',
      resourceSub: 'Security · Session policy',
      ip: '49.144.82.16',
      code: 'AL-10841',
      outcome: 'Success',
      category: 'security'
    },
    {
      time: '9:22 AM',
      date: '19 Oct 2026',
      actor: 'Miguel Lim',
      role: 'Moderator',
      activity: 'Crop listing approved',
      detail: 'Listing published to the marketplace',
      resource: 'Listings',
      resourceSub: 'Native Ginger · CR-1245',
      ip: '112.198.64.20',
      code: 'AL-10840',
      outcome: 'Success',
      category: 'admin'
    },
    {
      time: '9:10 AM',
      date: '19 Oct 2026',
      actor: 'Ana Santos',
      role: 'Administrator',
      activity: 'User role changed',
      detail: 'Support → Moderator',
      resource: 'Permissions',
      resourceSub: 'Liza Torres · US-0248',
      ip: '49.144.82.16',
      code: 'AL-10839',
      outcome: 'Success',
      category: 'admin'
    },
    {
      time: '9:00 AM',
      date: '19 Oct 2026',
      actor: 'System',
      role: 'Scheduled task',
      activity: 'Marketplace backup completed',
      detail: 'Encrypted daily backup stored',
      resource: 'System',
      resourceSub: 'Backup · BK-20261019',
      ip: 'Internal service',
      code: 'AL-10838',
      outcome: 'Success',
      category: 'system'
    },
    {
      time: '8:54 AM',
      date: '19 Oct 2026',
      actor: 'Miguel Lim',
      role: 'Moderator',
      activity: 'Dispute assigned',
      detail: 'Case assigned to Ana Santos',
      resource: 'Disputes',
      resourceSub: 'Quantity issue · DP-0314',
      ip: '112.198.64.20',
      code: 'AL-10837',
      outcome: 'Success',
      category: 'admin'
    },
    {
      time: '8:48 AM',
      date: '19 Oct 2026',
      actor: 'Paolo Cruz',
      role: 'Support',
      activity: 'Admin sign-in blocked',
      detail: 'Incorrect password · Attempt 3 of 5',
      resource: 'Security',
      resourceSub: 'Admin workspace',
      ip: '180.190.12.44',
      code: 'AL-10836',
      outcome: 'Failed',
      category: 'security'
    },
    {
      time: '8:40 AM',
      date: '19 Oct 2026',
      actor: 'Ana Santos',
      role: 'Administrator',
      activity: 'Notification rules updated',
      detail: 'Email alerts enabled for open disputes',
      resource: 'Settings',
      resourceSub: 'Notifications · Operations',
      ip: '49.144.82.16',
      code: 'AL-10835',
      outcome: 'Success',
      category: 'admin'
    },
    {
      time: '8:32 AM',
      date: '19 Oct 2026',
      actor: 'Miguel Lim',
      role: 'Moderator',
      activity: 'Crop listing rejected',
      detail: 'Duplicate listing · Farmer notified',
      resource: 'Listings',
      resourceSub: 'Red Onions · CR-1240',
      ip: '112.198.64.20',
      code: 'AL-10834',
      outcome: 'Success',
      category: 'admin'
    },
    {
      time: '4:45 PM',
      date: '18 Oct 2026',
      actor: 'Ana Santos',
      role: 'Administrator',
      activity: 'Activity log exported',
      detail: 'CSV export · 12–18 Oct 2026',
      resource: 'Audit log',
      resourceSub: 'Export · EX-0182',
      ip: '49.144.82.16',
      code: 'AL-10833',
      outcome: 'Success',
      category: 'admin'
    }
  ];

  const filteredLogs = auditRows.filter(log => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'admin' && log.category === 'admin') ||
      (activeTab === 'system' && log.category === 'system') ||
      (activeTab === 'security' && log.category === 'security');
    const matchesSearch = !searchQuery.trim() || 
      log.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOutcome = outcomeFilter === 'All' || log.outcome === outcomeFilter;
    return matchesTab && matchesSearch && matchesOutcome;
  });

  return (
    <div>
      <div className="admin-page-overline">ADMINISTRATION</div>
      <div className="admin-page-title-row">
        <div>
          <h1 className="admin-page-title">Audit log</h1>
          <p className="admin-page-subtitle">
            Track administrative activities and system changes across the marketplace.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: '#8C9C92' }}>
            Updated 19 Oct 2026, 9:41 AM PHT
          </div>
          <button
            onClick={() => {
              setToastMessage('Exporting tamper-proof cryptographic audit trail CSV...');
              setTimeout(() => setToastMessage(''), 2500);
            }}
            className="admin-btn-primary"
          >
            <Download size={15} /> Export activity
          </button>
        </div>
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

      {/* 4 Stat Cards matching Pananim audit log.png */}
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Total activities</span>
            <FileCheck size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">248</div>
          <div className="admin-stat-card-sub">13–19 Oct 2026</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Active administrators</span>
            <Users size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">6</div>
          <div className="admin-stat-card-sub">Across 3 administrative roles</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>System changes</span>
            <Sliders size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">18</div>
          <div className="admin-stat-card-sub">Settings, permissions &amp; policies</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Failed sign-ins</span>
            <Shield size={16} color="#BA4B24" />
          </div>
          <div className="admin-stat-card-value">3</div>
          <div className="admin-stat-card-sub">2 accounts · No active lockouts</div>
        </div>
      </div>

      {/* Activity History Container matching Pananim audit log.png */}
      <div className="admin-table-container">
        <div style={{ padding: '20px 24px 0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#0C3C2C' }}>Activity history</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#5E6E64' }}>A chronological record of who changed what, and when.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid #D5CABE', borderRadius: '8px', fontSize: '0.825rem', backgroundColor: '#FFFFFF' }}>
              <Calendar size={14} color="#8A7B76" />
              <span>13–19 Oct 2026</span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EBE4DA', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setActiveTab('all')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'all' ? '#07271C' : '#F0F2F1',
                  color: activeTab === 'all' ? '#FFFFFF' : '#5E6E64'
                }}
              >
                All activities 248
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'admin' ? '#07271C' : '#F0F2F1',
                  color: activeTab === 'admin' ? '#FFFFFF' : '#5E6E64'
                }}
              >
                Administrative 176
              </button>
              <button
                onClick={() => setActiveTab('system')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'system' ? '#07271C' : '#F0F2F1',
                  color: activeTab === 'system' ? '#FFFFFF' : '#5E6E64'
                }}
              >
                System 72
              </button>
              <button
                onClick={() => setActiveTab('security')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'security' ? '#07271C' : '#F0F2F1',
                  color: activeTab === 'security' ? '#FFFFFF' : '#5E6E64'
                }}
              >
                Security 12
              </button>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
              Newest first ↓
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div style={{ display: 'flex', gap: '12px', padding: '14px 24px', backgroundColor: '#FAF7F2', borderBottom: '1px solid #EBE4DA', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <input
              type="text"
              placeholder="Search activity, user, or record ID..."
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

          <select
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid #D5CABE',
              fontSize: '0.825rem',
              backgroundColor: '#FFFFFF',
              outline: 'none'
            }}
          >
            <option value="All">All outcomes</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Table Rows matching Pananim audit log.png */}
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Actor</th>
              <th>Activity / Change</th>
              <th>Resource</th>
              <th>IP Address</th>
              <th style={{ textAlign: 'right' }}>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((row) => (
              <tr key={row.code}>
                <td>
                  <div style={{ fontWeight: 600, color: '#1D2D24' }}>{row.time}</div>
                  <div style={{ fontSize: '0.725rem', color: '#8A7B76' }}>{row.date}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#0C3C2C' }}>{row.actor}</div>
                  <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>{row.role}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#1D2D24' }}>{row.activity}</div>
                  <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>{row.detail}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#1D2D24' }}>{row.resource}</div>
                  <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>{row.resourceSub}</div>
                </td>
                <td>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#1D2D24' }}>{row.ip}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#8A7B76' }}>{row.code}</div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span className={`admin-badge ${row.outcome === 'Success' ? 'green' : 'orange'}`}>
                    {row.outcome}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid #EBE4DA', fontSize: '0.8rem', color: '#5E6E64' }}>
          <div>Showing 1–10 of 248 activities</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5E6E64', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ChevronLeft size={14} /> Previous
            </button>
            <span style={{ padding: '4px 10px', backgroundColor: '#07271C', color: '#FFFFFF', borderRadius: '4px', fontWeight: 600 }}>1</span>
            <span style={{ padding: '4px 8px', cursor: 'pointer' }}>2</span>
            <span style={{ padding: '4px 8px', cursor: 'pointer' }}>3</span>
            <span>...</span>
            <span style={{ padding: '4px 8px', cursor: 'pointer' }}>25</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5E6E64', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Trust & Compliance Notice matching Pananim audit log.png */}
      <div 
        style={{
          marginTop: '24px',
          padding: '16px 20px',
          backgroundColor: '#E8F5EE',
          border: '1px solid #C4E3D2',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.825rem',
          color: '#16533F'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={20} color="#1B7A43" style={{ flexShrink: 0 }} />
          <div>
            <strong>A trusted record of every change:</strong> Audit records are read-only and retained for 365 days. Exports include activity details, timestamps, and source IP addresses.
          </div>
        </div>
        <span style={{ fontWeight: 600, color: '#0C3C2C', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Retention policy ↗
        </span>
      </div>
    </div>
  );
};
