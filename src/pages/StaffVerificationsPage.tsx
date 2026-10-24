import React, { useState } from 'react';
import { VerificationApplication } from '../types';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Eye, 
  Calendar, 
  MapPin, 
  User,
  Clock,
  Sparkles
} from 'lucide-react';

interface StaffVerificationsPageProps {
  applications: VerificationApplication[];
  onNavigate: (route: string) => void;
  onUpdateApplicationStatus: (appId: string, status: VerificationApplication['status'], notes?: string) => void;
}

export const StaffVerificationsPage: React.FC<StaffVerificationsPageProps> = ({
  applications,
  onNavigate,
  onUpdateApplicationStatus
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  const [statusFilter, setStatusFilter] = useState('All');
  const [actionNotes, setActionNotes] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const filteredApps = applications.filter(app => {
    return statusFilter === 'All' || app.status === statusFilter;
  });

  const handleDecision = (status: VerificationApplication['status']) => {
    if (!selectedApp) return;
    onUpdateApplicationStatus(selectedApp.id, status, actionNotes || undefined);
    setSuccessToast(`Application ${selectedApp.id} marked as ${status.toUpperCase()}!`);
    setActionNotes('');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  return (
    <div style={{ padding: '2.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge" style={{ backgroundColor: '#D48216', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              INTERNAL PLATFORM COMPLIANCE
            </span>
            <h1 style={{ fontSize: '2.2rem', color: '#0C3C2C' }}>Staff Verification Queue</h1>
            <p>Inspect farmer identities, RSBSA records, and agricultural land evidence before awarding live seller badges.</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#574A46' }}>Status Filter:</span>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: 'auto', backgroundColor: '#FFFFFF' }}>
              <option value="All">All Applications</option>
              <option value="under_review">Under Review</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="more_info_needed">More Info Needed</option>
            </select>
          </div>
        </div>

        {successToast && (
          <div style={{ backgroundColor: '#E8F5EE', padding: '1rem 1.25rem', borderRadius: '10px', color: '#1B7A43', marginBottom: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={18} /> {successToast}
          </div>
        )}

        {/* 2-Column Split: Queue List vs Selected Application Inspection */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
            alignItems: 'start'
          }}
        >
          {/* Applications Queue Table */}
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#0C3C2C', marginBottom: '1rem' }}>
              Incoming Queue ({filteredApps.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredApps.map((app) => {
                const isSelected = app.id === selectedAppId;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    style={{
                      border: isSelected ? '2px solid #0C3C2C' : '1px solid #DECDBD',
                      borderRadius: '10px',
                      padding: '1rem',
                      backgroundColor: isSelected ? '#FAF6F0' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <strong style={{ color: '#0C3C2C', fontSize: '0.95rem' }}>{app.farmName}</strong>
                      <span 
                        className={`badge ${
                          app.status === 'approved' ? 'badge-green' :
                          app.status === 'under_review' ? 'badge-gold' :
                          app.status === 'more_info_needed' ? 'badge-terracotta' : 'badge-gray'
                        }`}
                        style={{ fontSize: '0.65rem' }}
                      >
                        {app.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#574A46', marginBottom: '0.35rem' }}>
                      Applicant: {app.applicantName} &bull; {app.documentType}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{app.municipality}, {app.province}</span>
                      <span>Ref: {app.id}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Application Inspector */}
          {selectedApp && (
            <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid #F5EDE2', paddingBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', textTransform: 'uppercase', fontWeight: 600 }}>
                    APPLICATION INSPECTION
                  </span>
                  <h3 style={{ fontSize: '1.5rem', color: '#0C3C2C' }}>{selectedApp.farmName}</h3>
                  <span style={{ fontSize: '0.85rem', color: '#574A46' }}>
                    Applicant: <strong>{selectedApp.applicantName}</strong> &bull; {selectedApp.phone}
                  </span>
                </div>

                <span 
                  className={`badge ${
                    selectedApp.status === 'approved' ? 'badge-green' :
                    selectedApp.status === 'under_review' ? 'badge-gold' :
                    selectedApp.status === 'more_info_needed' ? 'badge-terracotta' : 'badge-gray'
                  }`}
                >
                  {selectedApp.status.replace('_', ' ')}
                </span>
              </div>

              {/* Document Preview & Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
                  <div>
                    <span style={{ color: '#8A7B76', display: 'block', fontSize: '0.75rem' }}>Document Type</span>
                    <strong>{selectedApp.documentType}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#8A7B76', display: 'block', fontSize: '0.75rem' }}>Masked Identification Ref</span>
                    <strong>{selectedApp.documentNumberMasked}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#8A7B76', display: 'block', fontSize: '0.75rem' }}>Location / Agrarian Registry</span>
                    <strong>{selectedApp.barangay}, {selectedApp.municipality}, {selectedApp.province}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#8A7B76', display: 'block', fontSize: '0.75rem' }}>Seller Classification</span>
                    <strong style={{ textTransform: 'capitalize' }}>{selectedApp.sellerType.replace('_', ' ')}</strong>
                  </div>
                </div>

                {/* Evidence Document Preview Box */}
                <div 
                  style={{
                    border: '1.5px solid #DECDBD',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    backgroundColor: '#FAF6F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FileText size={28} color="#0C3C2C" />
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#0C3C2C', display: 'block' }}>
                        {selectedApp.documentFileName}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                        Official DA / RSBSA Barcode Verified Stub
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Viewing document preview: ${selectedApp.documentFileName}\nAuthenticity watermark confirmed.`)}
                    className="btn btn-outline-warm btn-sm"
                  >
                    <Eye size={14} /> Inspect
                  </button>
                </div>

                {/* Reviewer Notes Form */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Reviewer Assessment Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Document validation remarks, RSBSA registry confirmation, or correction reason..."
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* Decision Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', borderTop: '1px solid #F5EDE2', paddingTop: '1.25rem' }}>
                <button
                  onClick={() => handleDecision('approved')}
                  className="btn btn-primary"
                  style={{ fontWeight: 700 }}
                >
                  <CheckCircle size={16} /> Approve &amp; Award Badge
                </button>
                <button
                  onClick={() => handleDecision('more_info_needed')}
                  className="btn btn-outline-warm"
                  style={{ color: '#D48216', borderColor: '#D48216', fontWeight: 600 }}
                >
                  <AlertTriangle size={16} /> Request Changes
                </button>
                <button
                  onClick={() => handleDecision('rejected')}
                  className="btn btn-outline-warm"
                  style={{ color: '#9B3C1B', borderColor: '#9B3C1B' }}
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
