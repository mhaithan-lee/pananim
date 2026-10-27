import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UploadCloud, 
  FileCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import { User } from '../../types';

interface FarmerVerificationPageProps {
  currentUser: User | null;
  onNavigate: (route: string) => void;
  onSubmitApplication?: (app: any) => void;
}

export const FarmerVerificationPage: React.FC<FarmerVerificationPageProps> = ({
  currentUser,
  onNavigate,
  onSubmitApplication
}) => {
  const [rsbsaNumber, setRsbsaNumber] = useState('RSBSA-03-54-001928');
  const [govIdType, setGovIdType] = useState("PhilSys National ID");
  const [barangayName, setBarangayName] = useState('San Rafael, Bulacan');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmitApplication?.({
      id: `APP-${Date.now()}`,
      applicantName: currentUser?.name || 'Ramon Santos',
      farmName: 'Santos Organic Farms',
      status: 'submitted',
      documents: ['RSBSA_Cert.pdf', 'National_ID_Front.jpg', 'Barangay_Clearance.pdf']
    });
  };

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5E6E64' }}>
          <span onClick={() => onNavigate('/farmer/dashboard')} style={{ cursor: 'pointer', color: '#0C3C2C', fontWeight: 600 }}>Overview</span>
          <span>&rsaquo;</span>
          <span style={{ color: '#1D2D24', fontWeight: 600 }}>Farmer RSBSA Verification</span>
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
          Farmer Verification
        </h1>
        <p style={{ color: '#5E6E64', maxWidth: '650px', margin: 0 }}>
          Verified farmers receive higher trust badges, priority wholesale matching, and direct access to escrow payouts.
        </p>
      </div>

      {submitted ? (
        <div className="farmer-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <CheckCircle2 size={54} color="#1B7A43" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>
            Documents Under Field Review!
          </h2>
          <p style={{ color: '#5E6E64', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
            Your RSBSA documents and ID credentials have been submitted to the Pananim DA Compliance Desk. Reviews typically take 24 hours.
          </p>
          <button
            onClick={() => onNavigate('/farmer/dashboard')}
            className="farmer-btn-primary"
          >
            Return to Farmer Overview
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {/* Form Card */}
          <div className="farmer-card" style={{ padding: '2rem' }}>
            <h3 className="farmer-card-title" style={{ marginBottom: '1.5rem' }}>
              <ShieldCheck size={22} color="#D48216" /> Government &amp; Farm Credentials
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  RSBSA Registration Number *
                </label>
                <input
                  type="text"
                  required
                  value={rsbsaNumber}
                  onChange={(e) => setRsbsaNumber(e.target.value)}
                  placeholder="e.g. RSBSA-03-54-001928"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: '#5E6E64', marginTop: '4px', display: 'block' }}>
                  Registered under Department of Agriculture registry system for basic sectors in agriculture.
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Government ID Type *
                </label>
                <select
                  value={govIdType}
                  onChange={(e) => setGovIdType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.9rem',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="PhilSys National ID">PhilSys National ID</option>
                  <option value="Driver's License">Driver's License</option>
                  <option value="Passport">Philippine Passport</option>
                  <option value="UMID">UMID / SSS</option>
                  <option value="Barangay Certification">Barangay Certificate with Photo</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Barangay &amp; Farm Jurisdiction *
                </label>
                <input
                  type="text"
                  required
                  value={barangayName}
                  onChange={(e) => setBarangayName(e.target.value)}
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

              {/* Upload Dropzones */}
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Upload Document Photos / Scans (RSBSA &amp; ID)
                </label>
                <div
                  style={{
                    border: '2px dashed #D5CABE',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    backgroundColor: '#FAF7F2',
                    cursor: 'pointer'
                  }}
                >
                  <UploadCloud size={32} color="#D48216" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0C3C2C' }}>
                    Click to select files or drag photos here
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#8A7B76', marginTop: '4px' }}>
                    PNG, JPG, PDF up to 10MB each
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  className="farmer-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                >
                  <ShieldCheck size={18} /> Submit Documents for Verification
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Benefits & Current Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="farmer-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="farmer-card-title" style={{ margin: 0 }}>Current Status</h3>
                <span className="farmer-badge green">Verified Producer</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#5E6E64', lineHeight: 1.5 }}>
                Santos Organic Farms is fully verified under RSBSA-03-54-001928. Valid through December 2026.
              </p>

              <div style={{ borderTop: '1px solid #EBE4DA', paddingTop: '1rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.825rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1B7A43' }}>
                  <CheckCircle2 size={16} /> RSBSA Registry: Active
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1B7A43' }}>
                  <CheckCircle2 size={16} /> PhilSys Identity: Verified
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1B7A43' }}>
                  <CheckCircle2 size={16} /> Land Jurisdiction: Bulacan Certified
                </div>
              </div>
            </div>

            <div className="farmer-card" style={{ padding: '2rem', backgroundColor: '#F8F5EF' }}>
              <h4 style={{ margin: '0 0 10px', color: '#0C3C2C', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="#D48216" /> Verified Producer Benefits
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.825rem', color: '#5E6E64', lineHeight: 1.6 }}>
                <li>Golden checkmark badge next to your farm name in all searches.</li>
                <li>Exclusive eligibility for institutional buyer wholesale contracts.</li>
                <li>Fast 2-hour escrow payout disbursements directly to bank/e-wallet.</li>
                <li>Direct assistance from Pananim logistics coordination fleet.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
