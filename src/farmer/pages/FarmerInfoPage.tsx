import React, { useState } from 'react';
import { Farm, User } from '../../types';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Save, 
  Upload, 
  Leaf, 
  Store 
} from 'lucide-react';

interface FarmerInfoPageProps {
  farm?: Farm;
  currentUser: User | null;
  onNavigate: (route: string) => void;
}

export const FarmerInfoPage: React.FC<FarmerInfoPageProps> = ({
  farm,
  currentUser,
  onNavigate
}) => {
  const [farmName, setFarmName] = useState(farm?.name || farm?.farmerName || 'Santos Organic Farms');
  const [ownerName, setOwnerName] = useState(currentUser?.name || farm?.farmerName || 'Ramon Santos');
  const [contactPhone, setContactPhone] = useState('0917-882-9104');
  const [email, setEmail] = useState('ramon.santos@bulacanfarms.ph');
  const [location, setLocation] = useState(`${farm?.municipality || 'San Rafael'}, ${farm?.province || 'Bulacan'}`);
  const [hectares, setHectares] = useState('4.8 Hectares');
  const [bio, setBio] = useState('Generational organic vegetable farm specializing in native red onions, cherry tomatoes, and highland peppers with zero chemical pesticide residue.');
  const [toastMessage, setToastMessage] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Farm details successfully saved! Live storefront updated.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5E6E64' }}>
          <span onClick={() => onNavigate('/farmer/dashboard')} style={{ cursor: 'pointer', color: '#0C3C2C', fontWeight: 600 }}>Overview</span>
          <span>&rsaquo;</span>
          <span style={{ color: '#1D2D24', fontWeight: 600 }}>Farm Information &amp; Profile</span>
        </div>
        <button
          onClick={() => onNavigate('/farmer/dashboard')}
          style={{ background: 'none', border: 'none', color: '#0C3C2C', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          &larr; Back to Overview
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.4rem', color: '#0C3C2C', margin: '0 0 0.35rem 0', fontWeight: 800 }}>
          Farm Information
        </h1>
        <p style={{ color: '#5E6E64', maxWidth: '650px', margin: 0 }}>
          Manage your public producer storefront, contact info, farm location, and agricultural background.
        </p>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        {/* Form Card */}
        <div className="farmer-card" style={{ padding: '2rem' }}>
          <h3 className="farmer-card-title" style={{ marginBottom: '1.5rem' }}>
            <Building size={20} color="#D48216" /> Farm Profile &amp; Contact
          </h3>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                Farm / Cooperative Name *
              </label>
              <input
                type="text"
                required
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #D5CABE',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Farm Owner / Representative *
                </label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Total Farm Size
                </label>
                <input
                  type="text"
                  value={hectares}
                  onChange={(e) => setHectares(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                Municipality &amp; Province Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #D5CABE',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Contact Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Support Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                Farm Bio &amp; Farming Practices
              </label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #D5CABE',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="farmer-btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <Save size={18} /> Save Farm Information
              </button>
            </div>
          </form>
        </div>

        {/* Right Preview Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="farmer-card" style={{ padding: '2rem' }}>
            <h3 className="farmer-card-title" style={{ marginBottom: '1rem' }}>
              <Store size={20} color="#0C3C2C" /> Storefront Preview
            </h3>
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #EBE4DA',
                backgroundColor: '#FAF7F2'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                alt="Farm cover"
                style={{ width: '100%', height: '140px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '1.2rem', color: '#0C3C2C' }}>{farmName}</h4>
                <div style={{ fontSize: '0.8rem', color: '#5E6E64', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="#D48216" /> {location}
                </div>
                <p style={{ fontSize: '0.825rem', color: '#1D2D24', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                  {bio}
                </p>
                <span className="farmer-badge green">Verified Producer · {hectares}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
