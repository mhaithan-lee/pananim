import React, { useState } from 'react';
import { VerificationApplication, User } from '../types';
import { 
  ShieldCheck, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  MapPin,
  Building2,
  Lock
} from 'lucide-react';

interface FarmerVerificationPageProps {
  currentUser: User | null;
  onNavigate: (route: string) => void;
  onSubmitApplication: (app: VerificationApplication) => void;
}

export const FarmerVerificationPage: React.FC<FarmerVerificationPageProps> = ({
  currentUser,
  onNavigate,
  onSubmitApplication
}) => {
  const [step, setStep] = useState(1);
  const [farmName, setFarmName] = useState(currentUser?.businessName || 'Santos Agri-Farms');
  const [sellerType, setSellerType] = useState<'individual_farmer' | 'cooperative'>('individual_farmer');
  const [province, setProvince] = useState('Nueva Ecija');
  const [municipality, setMunicipality] = useState('Cabanatuan City');
  const [barangay, setBarangay] = useState('San Josef Sur');
  const [documentType, setDocumentType] = useState<'RSBSA Farmer Registry' | 'DA Certificate' | 'Barangay Agrarian Cert' | 'Cooperative CDA Registration'>('RSBSA Farmer Registry');
  const [documentFileName, setDocumentFileName] = useState('RSBSA_Registry_Scan.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newApp: VerificationApplication = {
      id: `VER-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerId: currentUser?.id || 'farmer-001',
      applicantName: currentUser?.name || 'Ramon Santos',
      farmName,
      phone: currentUser?.phone || '+63 918 765 4321',
      email: currentUser?.email || 'ramon@santosfarms.ph',
      sellerType,
      region: 'Region III (Central Luzon)',
      province,
      municipality,
      barangay,
      documentType,
      documentNumberMasked: 'RSBSA-03-****-8841',
      documentFileName,
      farmPhotos: [
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'
      ],
      status: 'submitted',
      submittedDate: '24 Oct 2026, 03:00 PM',
      auditTrail: [
        { action: 'Application submitted for staff review', actor: currentUser?.name || 'Ramon Santos', timestamp: '24 Oct 2026, 03:00 PM' }
      ]
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSubmitApplication(newApp);
    }, 600);
  };

  if (submitted) {
    return (
      <div style={{ padding: '4rem 0 6rem 0' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle size={36} />
            </div>
            <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Application Submitted</span>
            <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C', marginBottom: '0.75rem' }}>Verification Under Review</h2>
            <p style={{ color: '#574A46', lineHeight: 1.6, marginBottom: '2rem' }}>
              Your agricultural credentials and farm evidence have been safely queued for Pananim compliance verification. While under review, you can save listing drafts in your farm workspace.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => onNavigate('/farmer/dashboard')} className="btn btn-primary">
                Go to Farm Dashboard
              </button>
              <button onClick={() => onNavigate('/staff/verifications')} className="btn btn-outline-warm">
                Open Staff Review Demo &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Trust &amp; Compliance</span>
          <h1 style={{ fontSize: '2.2rem', color: '#0C3C2C' }}>Farmer &amp; Cooperative Verification</h1>
          <p style={{ maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
            To unlock direct wholesale selling and award the reviewed grower badge, please submit valid agricultural documentation.
          </p>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1.5px solid #DECDBD', paddingBottom: '1rem' }}>
          <div style={{ fontWeight: step === 1 ? 800 : 500, color: step === 1 ? '#0C3C2C' : '#8A7B76', fontSize: '0.9rem' }}>
            1. Farm Profile
          </div>
          <div style={{ fontWeight: step === 2 ? 800 : 500, color: step === 2 ? '#0C3C2C' : '#8A7B76', fontSize: '0.9rem' }}>
            2. Agricultural Evidence
          </div>
          <div style={{ fontWeight: step === 3 ? 800 : 500, color: step === 3 ? '#0C3C2C' : '#8A7B76', fontSize: '0.9rem' }}>
            3. Fulfillment Setup
          </div>
        </div>

        {/* Step Forms */}
        <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C', marginBottom: '1.25rem' }}>Farm / Cooperative Details</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Seller Type *
                  </label>
                  <select value={sellerType} onChange={(e) => setSellerType(e.target.value as any)}>
                    <option value="individual_farmer">Individual Farmer / Grower</option>
                    <option value="cooperative">Registered Agricultural Cooperative</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Public Farm / Cooperative Name *
                  </label>
                  <input type="text" value={farmName} onChange={(e) => setFarmName(e.target.value)} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                      Province *
                    </label>
                    <input type="text" value={province} onChange={(e) => setProvince(e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                      Municipality / City *
                    </label>
                    <input type="text" value={municipality} onChange={(e) => setMunicipality(e.target.value)} required />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button onClick={() => setStep(2)} className="btn btn-primary">
                    Next: Upload Evidence <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>Agricultural Land &amp; Identity Evidence</h3>
              <p style={{ fontSize: '0.85rem', color: '#574A46', marginBottom: '1.5rem' }}>
                We accept government or municipal farm registrations. Real property ownership is not required &mdash; tenants and authorized cooperative members are fully eligible.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Accepted Document Type *
                  </label>
                  <select value={documentType} onChange={(e) => setDocumentType(e.target.value as any)}>
                    <option value="RSBSA Farmer Registry">Registry System for Basic Sectors in Agriculture (RSBSA)</option>
                    <option value="DA Certificate">Department of Agriculture Municipal Certificate</option>
                    <option value="Barangay Agrarian Cert">Barangay Agrarian / Tenancy Certification</option>
                    <option value="Cooperative CDA Registration">Cooperative Development Authority (CDA) Certificate</option>
                  </select>
                </div>

                <div 
                  style={{
                    border: '1.5px dashed #0C3C2C',
                    borderRadius: '12px',
                    padding: '1.75rem',
                    textAlign: 'center',
                    backgroundColor: '#FAF6F0'
                  }}
                >
                  <FileText size={32} color="#0C3C2C" style={{ margin: '0 auto 0.5rem auto' }} />
                  <strong style={{ fontSize: '0.9rem', color: '#0C3C2C', display: 'block' }}>
                    {documentFileName}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block', margin: '0.25rem 0 1rem 0' }}>
                    Uploaded PDF / JPG evidence file (Simulated Demo Storage)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const name = prompt('Simulate uploading file:', 'RSBSA_Santos_Ramon_Verified.pdf');
                      if (name) setDocumentFileName(name);
                    }}
                    className="btn btn-outline-warm btn-sm"
                  >
                    Replace Document
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <button onClick={() => setStep(1)} className="btn btn-outline-warm">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn btn-primary">
                    Next: Fulfillment Setup <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>Fulfillment &amp; Dispatch Capability</h3>
              <p style={{ fontSize: '0.85rem', color: '#574A46', marginBottom: '1.5rem' }}>
                Establish your private collection address and logistics handling preferences.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Private Farm Warehouse / Pickup Address *
                  </label>
                  <input type="text" defaultValue="Purok 4, San Josef Sur, Cabanatuan City, Nueva Ecija" required />
                  <span style={{ fontSize: '0.7rem', color: '#8A7B76' }}>
                    Kept confidential and provided only to verified buyers with confirmed orders.
                  </span>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Operating Collection Hours
                  </label>
                  <input type="text" defaultValue="Mon-Sat 6:00 AM - 4:00 PM" />
                </div>

                <div style={{ backgroundColor: '#FAF6F0', padding: '1rem', borderRadius: '8px', border: '1px solid #DECDBD', fontSize: '0.8rem', color: '#574A46' }}>
                  <Lock size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  <strong>Confidentiality Declaration:</strong> Pananim does not publish government identity card numbers, tax filings, or private farm lot coordinates publicly.
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <button onClick={() => setStep(2)} className="btn btn-outline-warm">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={handleSubmit} disabled={isSubmitting} className="btn btn-accent btn-lg" style={{ fontWeight: 800 }}>
                    {isSubmitting ? 'Submitting Application...' : 'Submit Verification Application'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
