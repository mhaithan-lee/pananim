import React, { useState } from 'react';
import { Farm, User, VerificationApplication } from '../../types';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Save, 
  Upload, 
  Leaf, 
  Store,
  ShieldCheck,
  FileCheck,
  Award,
  AlertCircle,
  Clock,
  Info,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface FarmerAccountPageProps {
  farm?: Farm;
  currentUser: User | null;
  onNavigate: (route: string) => void;
  onSubmitApplication?: (app: VerificationApplication) => void;
  initialTab?: 'profile' | 'storefront' | 'verification';
}

export const FarmerAccountPage: React.FC<FarmerAccountPageProps> = ({
  farm,
  currentUser,
  onNavigate,
  onSubmitApplication,
  initialTab = 'profile'
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'storefront' | 'verification'>(initialTab);

  // Farm Details State
  const [farmName, setFarmName] = useState(farm?.name || farm?.farmerName || 'Santos Organic Farms');
  const [ownerName, setOwnerName] = useState(currentUser?.name || farm?.farmerName || 'Ramon Santos');
  const [contactPhone, setContactPhone] = useState('0917-882-9104');
  const [email, setEmail] = useState('ramon.santos@bulacanfarms.ph');
  const [location, setLocation] = useState(`${farm?.municipality || 'San Rafael'}, ${farm?.province || 'Bulacan'}`);
  const [hectares, setHectares] = useState('4.8 Hectares');
  const [bio, setBio] = useState('Generational organic vegetable farm specializing in native red onions, cherry tomatoes, and highland peppers with zero chemical pesticide residue.');
  const [toastMessage, setToastMessage] = useState('');

  // Storefront Customization State
  const [bannerTagline, setBannerTagline] = useState('Farm-fresh direct wholesale harvests with guaranteed food safety compliance.');
  const [minWholesaleOrder, setMinWholesaleOrder] = useState('15 kg');
  const [fulfillmentDays, setFulfillmentDays] = useState('Mon, Wed, Fri (Baguio & NCR dispatch)');

  // Verification State
  const [rsbsaNumber, setRsbsaNumber] = useState('RSBSA-03-54-001928');
  const [govIdType, setGovIdType] = useState('PhilSys National ID');
  const [barangayName, setBarangayName] = useState('San Rafael, Bulacan');
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Farm profile details updated successfully.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveStorefront = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Storefront settings updated successfully.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationSubmitted(true);
    onSubmitApplication?.({
      id: `APP-${Date.now()}`,
      farmerId: farm?.id || 'farm-001',
      applicantName: ownerName,
      farmName,
      phone: contactPhone,
      email,
      sellerType: 'individual_farmer',
      region: 'Central Luzon (Region III)',
      province: 'Bulacan',
      municipality: 'San Rafael',
      barangay: barangayName || 'San Rafael',
      documentType: 'RSBSA Farmer Registry',
      documentNumberMasked: rsbsaNumber,
      documentFileName: 'RSBSA_Registration_Certificate_2026.pdf',
      farmPhotos: ['https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=400&q=80'],
      status: 'submitted',
      submittedDate: '24 Oct 2026',
      auditTrail: [
        { action: 'Application submitted', actor: ownerName, timestamp: '24 Oct 2026 10:15 AM' }
      ]
    });
  };

  return (
    <div style={{ paddingBottom: '3.5rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5E6E64' }}>
          <span onClick={() => onNavigate('/farmer/dashboard')} style={{ cursor: 'pointer', color: '#0C3C2C', fontWeight: 600 }}>Overview</span>
          <span>&rsaquo;</span>
          <span style={{ color: '#1D2D24', fontWeight: 600 }}>Account &amp; Farm Settings</span>
        </div>
        <button
          onClick={() => onNavigate('/farmer/dashboard')}
          style={{ background: 'none', border: 'none', color: '#0C3C2C', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          &larr; Back to Overview
        </button>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '2.4rem', color: '#0C3C2C', margin: '0 0 0.35rem 0', fontWeight: 800 }}>
          Farmer Account Workspace
        </h1>
        <p style={{ color: '#5E6E64', maxWidth: '650px', margin: 0 }}>
          Manage your agricultural profile, public marketplace storefront, and RSBSA accreditation credentials in one consolidated center.
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

      {/* Tab Navigation Controls */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '10px', 
          borderBottom: '1.5px solid #EBE4DA', 
          marginBottom: '2rem',
          paddingBottom: '2px'
        }}
      >
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            padding: '10px 18px',
            fontSize: '0.9rem',
            fontWeight: activeTab === 'profile' ? 700 : 600,
            color: activeTab === 'profile' ? '#0C3C2C' : '#5E6E64',
            border: 'none',
            borderBottom: activeTab === 'profile' ? '3px solid #D48216' : '3px solid transparent',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Building size={16} color={activeTab === 'profile' ? '#0C3C2C' : '#5E6E64'} />
          Farm Profile &amp; Contact
        </button>

        <button
          onClick={() => setActiveTab('storefront')}
          style={{
            padding: '10px 18px',
            fontSize: '0.9rem',
            fontWeight: activeTab === 'storefront' ? 700 : 600,
            color: activeTab === 'storefront' ? '#0C3C2C' : '#5E6E64',
            border: 'none',
            borderBottom: activeTab === 'storefront' ? '3px solid #D48216' : '3px solid transparent',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Store size={16} color={activeTab === 'storefront' ? '#0C3C2C' : '#5E6E64'} />
          Storefront Settings
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          style={{
            padding: '10px 18px',
            fontSize: '0.9rem',
            fontWeight: activeTab === 'verification' ? 700 : 600,
            color: activeTab === 'verification' ? '#0C3C2C' : '#5E6E64',
            border: 'none',
            borderBottom: activeTab === 'verification' ? '3px solid #D48216' : '3px solid transparent',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ShieldCheck size={16} color={activeTab === 'verification' ? '#0C3C2C' : '#5E6E64'} />
          RSBSA Verification Credentials
          <span style={{ fontSize: '0.675rem', fontWeight: 800, padding: '2px 8px', borderRadius: '12px', backgroundColor: '#E8F5EE', color: '#1B7A43' }}>
            DA Active
          </span>
        </button>
      </div>

      {/* TAB 1: FARM PROFILE */}
      {activeTab === 'profile' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          <div className="farmer-card" style={{ padding: '2rem' }}>
            <h3 className="farmer-card-title" style={{ marginBottom: '1.5rem' }}>
              <Building size={20} color="#D48216" /> Farm Profile &amp; Contact Information
            </h3>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Farm / Cooperative Name *
                </label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Primary Farmer / Representative *
                </label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                    Contact Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                    Farm Municipality &amp; Province *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                    Total Farm Land
                  </label>
                  <input
                    type="text"
                    value={hectares}
                    onChange={(e) => setHectares(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Grower Biography &amp; Farm Practices
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="farmer-btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '0.5rem' }}>
                <Save size={16} /> Save Profile Changes
              </button>
            </form>
          </div>

          {/* Quick Summary Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="farmer-card" style={{ padding: '2rem' }}>
              <h3 className="farmer-card-title" style={{ marginBottom: '1rem' }}>
                <Leaf size={18} color="#1B7A43" /> Farm Badge &amp; Standing
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: '#E8F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B7A43' }}>
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0C3C2C' }}>Verified Producer</div>
                  <div style={{ fontSize: '0.8rem', color: '#5E6E64' }}>Accredited DA RSBSA #RSBSA-03-54-001928</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#1D2D24', borderTop: '1px solid #EBE4DA', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5E6E64' }}>Active Listings:</span>
                  <strong>6 commercial crops</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5E6E64' }}>Completed Orders:</span>
                  <strong>18 shipments</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5E6E64' }}>Buyer Satisfaction:</span>
                  <strong>4.9 / 5.0 (⭐)</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(`/farmers/${farm?.id || 'farm-001'}`)}
                className="farmer-btn-secondary"
                style={{ width: '100%', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <ExternalLink size={15} /> Preview Public Storefront
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STOREFRONT SETTINGS */}
      {activeTab === 'storefront' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          <div className="farmer-card" style={{ padding: '2rem' }}>
            <h3 className="farmer-card-title" style={{ marginBottom: '1.5rem' }}>
              <Store size={20} color="#D48216" /> Marketplace Storefront Preferences
            </h3>

            <form onSubmit={handleSaveStorefront} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Storefront Banner Tagline
                </label>
                <input
                  type="text"
                  value={bannerTagline}
                  onChange={(e) => setBannerTagline(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                    Minimum Wholesale Order
                  </label>
                  <input
                    type="text"
                    value={minWholesaleOrder}
                    onChange={(e) => setMinWholesaleOrder(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                    Fulfillment Dispatch Schedule
                  </label>
                  <input
                    type="text"
                    value={fulfillmentDays}
                    onChange={(e) => setFulfillmentDays(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Dispatch Pickup Address
                </label>
                <input
                  type="text"
                  defaultValue="Kilometer 64 National Highway, San Rafael, Bulacan (Near Agrarian Cooperative Hub)"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                />
              </div>

              <button type="submit" className="farmer-btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '0.5rem' }}>
                <Save size={16} /> Update Storefront Settings
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: RSBSA VERIFICATION CREDENTIALS */}
      {activeTab === 'verification' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          <div className="farmer-card" style={{ padding: '2rem' }}>
            <h3 className="farmer-card-title" style={{ marginBottom: '1.5rem' }}>
              <ShieldCheck size={22} color="#D48216" /> Government &amp; Farm Credentials
            </h3>

            {verificationSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={48} color="#1B7A43" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.4rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>
                  Documents Under Compliance Review!
                </h3>
                <p style={{ color: '#5E6E64', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                  Your updated accreditation credentials have been registered in the demonstration compliance log.
                </p>
                <button
                  type="button"
                  onClick={() => setVerificationSubmitted(false)}
                  className="farmer-btn-secondary"
                >
                  Edit Credential Documents
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitVerification} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                    RSBSA Registration Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsbsaNumber}
                    onChange={(e) => setRsbsaNumber(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                  />
                  <span style={{ fontSize: '0.72rem', color: '#5E6E64', marginTop: '4px', display: 'block' }}>
                    Registry System for Basic Sectors in Agriculture (DA accredited)
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                      Government ID Type *
                    </label>
                    <select
                      value={govIdType}
                      onChange={(e) => setGovIdType(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.85rem', backgroundColor: '#FFFFFF' }}
                    >
                      <option value="PhilSys National ID">PhilSys National ID</option>
                      <option value="Driver's License">Driver&apos;s License</option>
                      <option value="UMID / SSS">UMID / SSS ID</option>
                      <option value="Postal ID">Postal ID</option>
                      <option value="Barangay ID">Barangay Certificate ID</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                      Barangay Clearance Location
                    </label>
                    <input
                      type="text"
                      value={barangayName}
                      onChange={(e) => setBarangayName(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D5C7B6', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                <div style={{ backgroundColor: '#FAF7F2', padding: '1.25rem', borderRadius: '12px', border: '1.5px dashed #D5C7B6' }}>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0C3C2C', marginBottom: '0.75rem' }}>
                    Uploaded Verification Files (Demo)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', border: '1px solid #EBE4DA' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1D2D24' }}>
                        <FileCheck size={16} color="#1B7A43" /> RSBSA_Certificate_2026.pdf
                      </span>
                      <span style={{ color: '#1B7A43', fontWeight: 700, fontSize: '0.72rem' }}>VERIFIED</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', border: '1px solid #EBE4DA' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1D2D24' }}>
                        <FileCheck size={16} color="#1B7A43" /> PhilSys_National_ID_Front.jpg
                      </span>
                      <span style={{ color: '#1B7A43', fontWeight: 700, fontSize: '0.72rem' }}>VERIFIED</span>
                    </div>
                  </div>
                </div>

                <button type="submit" className="farmer-btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '0.5rem' }}>
                  <ShieldCheck size={16} /> Submit Credentials for DA Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
