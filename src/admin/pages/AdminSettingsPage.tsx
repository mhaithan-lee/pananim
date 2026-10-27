import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Lock, 
  Users, 
  Bell, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface AdminSettingsPageProps {
  onNavigate: (route: string) => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ onNavigate }) => {
  const [platformName, setPlatformName] = useState('Pananim');
  const [supportEmail, setSupportEmail] = useState('support@pananim.ph');
  const [timeZone, setTimeZone] = useState('Asia/Manila (PHT, UTC+8)');
  const [currency, setCurrency] = useState('Philippine Peso (PHP ₱)');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30 minutes');
  const [failedSignInLimit, setFailedSignInLimit] = useState('5 attempts');
  const [newDeviceAlerts, setNewDeviceAlerts] = useState(true);

  // Notification toggles
  const [secAlertsEmail, setSecAlertsEmail] = useState(true);
  const [secAlertsApp, setSecAlertsApp] = useState(true);
  const [reportsEmail, setReportsEmail] = useState(true);
  const [reportsApp, setReportsApp] = useState(true);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyApp, setVerifyApp] = useState(true);
  const [weeklyEmail, setWeeklyEmail] = useState(true);
  const [weeklyApp, setWeeklyApp] = useState(false);

  const [toastMessage, setToastMessage] = useState('');

  const handleSave = () => {
    setToastMessage('System settings successfully saved and committed to cryptographic audit trail!');
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleDiscard = () => {
    setToastMessage('Pending modifications discarded.');
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Overline & Title Row matching Pananim settings.png */}
      <div className="admin-page-overline">ADMINISTRATION</div>
      <div className="admin-page-title-row">
        <div>
          <h1 className="admin-page-title">Settings</h1>
          <p className="admin-page-subtitle">
            Manage your marketplace, team access, and system preferences.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={handleDiscard} className="admin-btn-secondary">
            Discard changes
          </button>
          <button onClick={handleSave} className="admin-btn-primary">
            <Save size={15} /> Save changes
          </button>
        </div>
      </div>

      <div style={{ fontSize: '0.8rem', color: '#8C9C92', marginBottom: '16px', textAlign: 'right' }}>
        Last saved by Ana Santos · 19 Oct, 9:28 AM PHT
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

      {/* Audit Banner matching Pananim settings.png */}
      <div 
        style={{
          padding: '12px 20px',
          backgroundColor: '#E8F5EE',
          border: '1px solid #C4E3D2',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          fontSize: '0.85rem',
          color: '#16533F'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={18} color="#1B7A43" />
          <span>These settings apply to the entire PANANIM marketplace. All changes are recorded in the audit log.</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0C3C2C' }}>Administrator access</span>
      </div>

      {/* Row 1: General Settings & Security (2 columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* General System Settings Card */}
        <div className="admin-card">
          <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: '#0C3C2C' }}>General system settings</h3>
          <p style={{ margin: '0 0 20px 0', fontSize: '0.8rem', color: '#5E6E64' }}>
            Set the core details and regional defaults for your marketplace.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Platform name
                </label>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Support email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Time zone
                </label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.85rem',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Asia/Manila (PHT, UTC+8)">Asia/Manila (PHT, UTC+8)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.85rem',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Philippine Peso (PHP ₱)">Philippine Peso (PHP ₱)</option>
                </select>
              </div>
            </div>

            {/* Maintenance Mode Toggle */}
            <div style={{ borderTop: '1px solid #EBE4DA', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1D2D24', fontSize: '0.85rem' }}>Maintenance mode</div>
                <div style={{ fontSize: '0.775rem', color: '#5E6E64' }}>
                  Temporarily pause marketplace access for farmers and buyers.
                </div>
                <div style={{ fontSize: '0.725rem', color: '#1B7A43', marginTop: '2px' }}>
                  Marketplace is live · New listings and orders are enabled.
                </div>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="admin-card">
          <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: '#0C3C2C' }}>Security</h3>
          <p style={{ margin: '0 0 20px 0', fontSize: '0.8rem', color: '#5E6E64' }}>
            Protect administrator accounts and sensitive marketplace data.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 2FA Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1D2D24', fontSize: '0.85rem' }}>Require two-factor authentication</div>
                <div style={{ fontSize: '0.775rem', color: '#5E6E64' }}>
                  All administrators must verify sign-ins with an authenticator app.
                </div>
              </div>
              <input
                type="checkbox"
                checked={twoFactorAuth}
                onChange={(e) => setTwoFactorAuth(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Session timeout
                </label>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.85rem',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="60 minutes">60 minutes</option>
                  <option value="120 minutes">120 minutes</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Failed sign-in limit
                </label>
                <select
                  value={failedSignInLimit}
                  onChange={(e) => setFailedSignInLimit(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.85rem',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="5 attempts">5 attempts</option>
                  <option value="3 attempts">3 attempts</option>
                </select>
              </div>
            </div>

            {/* New Device Alerts */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1D2D24', fontSize: '0.85rem' }}>New device alerts</div>
                <div style={{ fontSize: '0.775rem', color: '#5E6E64' }}>
                  Email administrators when an unfamiliar device signs in.
                </div>
              </div>
              <input
                type="checkbox"
                checked={newDeviceAlerts}
                onChange={(e) => setNewDeviceAlerts(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>

            {/* Policy note */}
            <div style={{ padding: '10px 14px', backgroundColor: '#FAF7F2', borderRadius: '8px', border: '1px solid #EBE4DA', fontSize: '0.75rem', color: '#5E6E64', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={15} color="#D48216" style={{ flexShrink: 0 }} />
              <span>Passwords require 12+ characters, a number, and a symbol. Accounts lock for 15 minutes after 5 failed attempts.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: User Roles & Permissions matching Pananim settings.png */}
      <div className="admin-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: '#0C3C2C' }}>User roles &amp; permissions</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#5E6E64' }}>
              Define what each administrative role can view and manage.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#5E6E64' }}>3 roles · 6 team members · Least-privilege access</span>
            <button className="admin-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.775rem' }}>
              <Users size={14} /> Manage team
            </button>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Members</th>
              <th>Access Level</th>
              <th>Security</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong style={{ color: '#0C3C2C' }}>Administrator</strong></td>
              <td>2 members</td>
              <td>Full access to marketplace, team, settings, and audit log</td>
              <td><span className="admin-badge green">2FA required</span></td>
              <td style={{ textAlign: 'right' }}>
                <span style={{ color: '#0C3C2C', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}>View →</span>
              </td>
            </tr>
            <tr>
              <td><strong style={{ color: '#0C3C2C' }}>Moderator</strong></td>
              <td>3 members</td>
              <td>Manage listings, verify accounts, and resolve disputes</td>
              <td><span className="admin-badge green">2FA required</span></td>
              <td style={{ textAlign: 'right' }}>
                <span style={{ color: '#0C3C2C', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}>Edit →</span>
              </td>
            </tr>
            <tr>
              <td><strong style={{ color: '#0C3C2C' }}>Support</strong></td>
              <td>1 member</td>
              <td>View users and orders; assist with marketplace issues</td>
              <td><span className="admin-badge green">2FA required</span></td>
              <td style={{ textAlign: 'right' }}>
                <span style={{ color: '#0C3C2C', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}>Edit →</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Row 3: Notifications Table matching Pananim settings.png */}
      <div className="admin-card">
        <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: '#0C3C2C' }}>Notifications</h3>
        <p style={{ margin: '0 0 16px 0', fontSize: '0.8rem', color: '#5E6E64' }}>
          Choose which administrative updates reach your team and where they appear.
        </p>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Event</th>
              <th style={{ width: '120px', textAlign: 'center' }}>Email</th>
              <th style={{ width: '120px', textAlign: 'center' }}>In-App</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style={{ fontWeight: 600, color: '#1D2D24' }}>Security alerts</div>
                <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>Failed sign-ins, new devices, and permission changes</div>
              </td>
              <td style={{ textAlign: 'center' }}>
                <input type="checkbox" checked={secAlertsEmail} onChange={(e) => setSecAlertsEmail(e.target.checked)} />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input type="checkbox" checked={secAlertsApp} onChange={(e) => setSecAlertsApp(e.target.checked)} />
              </td>
            </tr>

            <tr>
              <td>
                <div style={{ fontWeight: 600, color: '#1D2D24' }}>Reports &amp; disputes</div>
                <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>New cases, escalations, and overdue responses</div>
              </td>
              <td style={{ textAlign: 'center' }}>
                <input type="checkbox" checked={reportsEmail} onChange={(e) => setReportsEmail(e.target.checked)} />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input type="checkbox" checked={reportsApp} onChange={(e) => setReportsApp(e.target.checked)} />
              </td>
            </tr>

            <tr>
              <td>
                <div style={{ fontWeight: 600, color: '#1D2D24' }}>Verification &amp; moderation</div>
                <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>Pending account applications and flagged crop listings</div>
              </td>
              <td style={{ textAlign: 'center' }}>
                <input type="checkbox" checked={verifyEmail} onChange={(e) => setVerifyEmail(e.target.checked)} />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input type="checkbox" checked={verifyApp} onChange={(e) => setVerifyApp(e.target.checked)} />
              </td>
            </tr>

            <tr>
              <td>
                <div style={{ fontWeight: 600, color: '#1D2D24' }}>Weekly operations summary</div>
                <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>Marketplace performance delivered every Monday at 8:00 AM PHT</div>
              </td>
              <td style={{ textAlign: 'center' }}>
                <input type="checkbox" checked={weeklyEmail} onChange={(e) => setWeeklyEmail(e.target.checked)} />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input type="checkbox" checked={weeklyApp} onChange={(e) => setWeeklyApp(e.target.checked)} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Bottom Save Bar */}
        <div style={{ borderTop: '1px solid #EBE4DA', paddingTop: '16px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#8C9C92' }}>
            Changes are recorded with your name and timestamp.
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleDiscard} className="admin-btn-secondary">
              Discard changes
            </button>
            <button onClick={handleSave} className="admin-btn-primary">
              <Save size={15} /> Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
