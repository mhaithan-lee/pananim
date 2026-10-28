import React, { useState } from 'react';
import { User } from '../types';
import { 
  Building2, 
  Truck, 
  Settings, 
  MapPin, 
  Edit2, 
  Trash2, 
  Plus, 
  Key, 
  Bell, 
  CheckCircle,
  Save
} from 'lucide-react';

interface BuyerProfilePageProps {
  currentUser: User | null;
  onNavigate: (route: string) => void;
}

export const BuyerProfilePage: React.FC<BuyerProfilePageProps> = ({
  currentUser,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'business' | 'addresses' | 'settings'>('business');
  
  // Form fields matching Screenshot 215538
  const [companyName, setCompanyName] = useState('Rodriguez Fresh Markets');
  const [contactPerson, setContactPerson] = useState('Mateo Rodriguez');
  const [phone, setPhone] = useState('+63 917 123 4567');
  const [email, setEmail] = useState('mateo.r@freshmarkets.ph');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Notification Toggles
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div style={{ padding: '2.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Header Breadcrumb & Title matching Screenshot 215538 */}
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9B3C1B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          MANAGE YOUR ACCOUNT
        </span>
        <h1 style={{ fontSize: '2.4rem', color: '#0C3C2C', marginBottom: '2rem', marginTop: '0.25rem' }}>
          Buyer Profile
        </h1>

        {/* Layout Grid matching Screenshot 215538 */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '2.5rem',
            alignItems: 'start'
          }}
          className="profile-grid"
        >
          {/* Left Navigation Sidebar matching Screenshot 215538 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('business')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1.25rem',
                borderRadius: '10px',
                backgroundColor: activeTab === 'business' ? '#0C3C2C' : 'transparent',
                color: activeTab === 'business' ? '#FFFFFF' : '#574A46',
                fontWeight: 700,
                fontSize: '0.9rem',
                textAlign: 'left'
              }}
            >
              <Building2 size={18} /> Business Info
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1.25rem',
                borderRadius: '10px',
                backgroundColor: activeTab === 'addresses' ? '#0C3C2C' : 'transparent',
                color: activeTab === 'addresses' ? '#FFFFFF' : '#574A46',
                fontWeight: 600,
                fontSize: '0.9rem',
                textAlign: 'left'
              }}
            >
              <Truck size={18} /> Delivery Addresses
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1.25rem',
                borderRadius: '10px',
                backgroundColor: activeTab === 'settings' ? '#0C3C2C' : 'transparent',
                color: activeTab === 'settings' ? '#FFFFFF' : '#574A46',
                fontWeight: 600,
                fontSize: '0.9rem',
                textAlign: 'left'
              }}
            >
              <Settings size={18} /> Account Settings
            </button>

            <button
              onClick={() => onNavigate('/buyer/notifications')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1.25rem',
                borderRadius: '10px',
                backgroundColor: 'transparent',
                color: '#574A46',
                fontWeight: 600,
                fontSize: '0.9rem',
                textAlign: 'left'
              }}
            >
              <Bell size={18} /> Notification Center
            </button>
          </div>

          {/* Right Content Panels matching Screenshot 215538 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Section 1: Business Information matching Screenshot 215538 */}
            <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#0C3C2C' }}>Business Information</h3>
                <button
                  onClick={handleSave}
                  className="btn btn-accent btn-sm"
                  style={{ fontWeight: 700 }}
                >
                  <Save size={14} /> Save Changes
                </button>
              </div>

              {saveSuccess && (
                <div style={{ backgroundColor: '#E8F5EE', padding: '0.75rem 1rem', borderRadius: '8px', color: '#1B7A43', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} /> Changes successfully saved to your profile.
                </div>
              )}

              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.25rem'
                }}
              >
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Saved Delivery Addresses matching Screenshot 215538 */}
            <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#0C3C2C' }}>Saved Delivery Addresses</h3>
                <button
                  onClick={() => alert('New address modal')}
                  style={{ color: '#9B3C1B', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Plus size={16} /> Add New Address
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Primary Warehouse matching Screenshot 215538 */}
                <div 
                  style={{
                    border: '1px solid #DECDBD',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#FAF6F0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0C3C2C', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <strong style={{ color: '#0C3C2C', fontSize: '1rem' }}>Primary Warehouse</strong>
                        <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>DEFAULT</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#574A46', marginTop: '0.2rem' }}>
                        Bldg 4, Laguna Technopark, Biñan, Laguna 4024
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', color: '#8A7B76' }}>
                    <button style={{ color: '#574A46' }}><Edit2 size={16} /></button>
                    <button style={{ color: '#9B3C1B' }}><Trash2 size={16} /></button>
                  </div>
                </div>

                {/* Manila Retail Hub matching Screenshot 215538 */}
                <div 
                  style={{
                    border: '1px solid #DECDBD',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0C3C2C', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <strong style={{ color: '#0C3C2C', fontSize: '1rem' }}>Manila Retail Hub</strong>
                      <p style={{ fontSize: '0.85rem', color: '#574A46', marginTop: '0.2rem' }}>
                        1528 Quezon Avenue, South Triangle, Quezon City 1103
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', color: '#8A7B76' }}>
                    <button style={{ color: '#574A46' }}><Edit2 size={16} /></button>
                    <button style={{ color: '#9B3C1B' }}><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Account Settings matching Screenshot 215538 */}
            <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#0C3C2C', marginBottom: '1.5rem' }}>Account Settings</h3>

              {/* Password */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0C3C2C', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem' }}>
                  <Key size={16} /> Update Password
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block', marginBottom: '0.25rem' }}>Current Password</label>
                    <input type="password" defaultValue="••••••••••••" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block', marginBottom: '0.25rem' }}>New Password</label>
                    <input type="password" defaultValue="••••••••••••" />
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <button className="btn btn-accent btn-sm" style={{ fontWeight: 700 }}>
                    Update Password
                  </button>
                </div>
              </div>

              {/* Notification Preferences */}
              <div style={{ borderTop: '1px solid #F5EDE2', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0C3C2C', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  <Bell size={16} /> Notification Preferences
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#0C3C2C', display: 'block' }}>Order Status Updates</strong>
                      <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Receive SMS and email when order status changes.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={orderUpdates}
                      onChange={(e) => setOrderUpdates(e.target.checked)}
                      style={{ width: '20px', height: '20px', accentColor: '#0C3C2C', cursor: 'pointer' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#0C3C2C', display: 'block' }}>Market Price Alerts</strong>
                      <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Weekly notifications about price trends for saved crops.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={priceAlerts}
                      onChange={(e) => setPriceAlerts(e.target.checked)}
                      style={{ width: '20px', height: '20px', accentColor: '#0C3C2C', cursor: 'pointer' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#0C3C2C', display: 'block' }}>Marketing &amp; Promotions</strong>
                      <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Stay updated with seasonal harvests and farm events.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      style={{ width: '20px', height: '20px', accentColor: '#0C3C2C', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
