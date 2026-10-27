import React, { useState } from 'react';
import { 
  Sprout, 
  Users, 
  Receipt, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Eye, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  XCircle,
  Check
} from 'lucide-react';
import { CropListing, Farm, OrderGroup, VerificationApplication } from '../../types';

interface AdminOverviewPageProps {
  cropListings: CropListing[];
  farms: Farm[];
  orders: OrderGroup[];
  applications: VerificationApplication[];
  onNavigate: (route: string) => void;
  onUpdateCropStock?: (cropId: string, newStock: number) => void;
  onUpdateApplicationStatus?: (appId: string, status: any) => void;
}

export const AdminOverviewPage: React.FC<AdminOverviewPageProps> = ({
  cropListings,
  farms,
  orders,
  applications,
  onNavigate,
  onUpdateApplicationStatus
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'price' | 'new' | 'photo'>('all');
  const [toastMessage, setToastMessage] = useState('');

  const handleReviewAction = (cropName: string) => {
    setToastMessage(`Opened review drawer for "${cropName}". Verified against DA benchmark.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleQuickVerify = (appId: string, applicantName: string) => {
    onUpdateApplicationStatus?.(appId, 'approved');
    setToastMessage(`Account for "${applicantName}" approved and verified.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div>
      {/* Overline & Title Row matching Pananim admin overview.png */}
      <div className="admin-page-overline">ADMINISTRATION</div>
      <div className="admin-page-title-row">
        <div>
          <h1 className="admin-page-title">Overview</h1>
          <p className="admin-page-subtitle">
            Marketplace health, active moderation queues, and operational metrics.
          </p>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#8C9C92', alignSelf: 'center' }}>
          Updated 19 Oct 2026, 9:42 AM PHT
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

      {/* Priority Alert Banner matching Pananim admin overview.png */}
      <div className="admin-alert-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FDE8C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#BA7112',
              flexShrink: 0
            }}
          >
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#1D2D24', fontSize: '0.95rem' }}>
              6 reviews need attention before midnight
            </div>
            <div style={{ fontSize: '0.8rem', color: '#5E6E64' }}>
              4 crop listings flagged for price check, 2 buyer account verifications pending approval.
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('/admin/crops')}
          className="admin-btn-orange"
          style={{ padding: '8px 16px', fontSize: '0.825rem' }}
        >
          <span>Open queue</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 4 Stat Cards with Sparkline Curves matching Pananim admin overview.png */}
      <div className="admin-stat-grid">
        {/* Card 1 */}
        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Active crop listings</span>
            <Sprout size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">1,248</div>
          {/* Sparkline curve */}
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,25 Q30,22 60,15 T120,5" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#1B7A43', fontWeight: 600 }}>
            +38 this week
          </div>
        </div>

        {/* Card 2 */}
        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Verified farmers</span>
            <Users size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">856</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,20 Q30,18 60,12 T120,6" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#D48216', fontWeight: 600 }}>
            +12 pending review
          </div>
        </div>

        {/* Card 3 */}
        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Completed trade</span>
            <Receipt size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">₱284.5k</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,26 Q40,16 80,18 T120,4" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#1B7A43', fontWeight: 600 }}>
            +14.2% vs last month
          </div>
        </div>

        {/* Card 4 */}
        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Open disputes</span>
            <AlertCircle size={16} color="#BA4B24" />
          </div>
          <div className="admin-stat-card-value">3</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,10 Q40,12 80,24 T120,22" fill="none" stroke="#BA4B24" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#BA4B24', fontWeight: 600 }}>
            1 high-priority · 2 under review
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Grid matching Pananim admin overview.png */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.8fr 1.2fr', 
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Moderation Tables */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Moderation Table */}
          <div className="admin-table-container">
            <div className="admin-table-header">
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#0C3C2C' }}>Crop listing moderation</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#5E6E64' }}>Review new submissions and quality flags.</p>
              </div>

              {/* Filter Pills */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setFilterTab('all')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: filterTab === 'all' ? '#07271C' : '#F0F2F1',
                    color: filterTab === 'all' ? '#FFFFFF' : '#5E6E64'
                  }}
                >
                  All (24)
                </button>
                <button
                  onClick={() => setFilterTab('price')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: filterTab === 'price' ? '#07271C' : '#F0F2F1',
                    color: filterTab === 'price' ? '#FFFFFF' : '#5E6E64'
                  }}
                >
                  Price check (8)
                </button>
                <button
                  onClick={() => setFilterTab('new')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: filterTab === 'new' ? '#07271C' : '#F0F2F1',
                    color: filterTab === 'new' ? '#FFFFFF' : '#5E6E64'
                  }}
                >
                  New listing (12)
                </button>
              </div>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Listing</th>
                  <th>Farmer</th>
                  <th>Price / Benchmark</th>
                  <th>Flag Reason</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0C3C2C' }}>Red Onions (Bulacan)</div>
                    <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>1,500 kg · Harvest 28 Oct</div>
                  </td>
                  <td>Ramon Santos</td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#BA4B24' }}>₱145 / kg</div>
                    <div style={{ fontSize: '0.725rem', color: '#BA4B24' }}>+18% vs DA average</div>
                  </td>
                  <td>
                    <span className="admin-badge orange">Price check</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleReviewAction('Red Onions')}
                      className="admin-btn-secondary"
                      style={{ padding: '5px 12px', fontSize: '0.775rem' }}
                    >
                      Review
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0C3C2C' }}>Cherry Tomatoes (Benguet)</div>
                    <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>800 kg · Harvest 26 Oct</div>
                  </td>
                  <td>Elena Corpuz</td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1B7A43' }}>₱85 / kg</div>
                    <div style={{ fontSize: '0.725rem', color: '#1B7A43' }}>Fair market align</div>
                  </td>
                  <td>
                    <span className="admin-badge green">New listing</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleReviewAction('Cherry Tomatoes')}
                      className="admin-btn-secondary"
                      style={{ padding: '5px 12px', fontSize: '0.775rem' }}
                    >
                      Review
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0C3C2C' }}>Native White Garlic</div>
                    <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>600 kg · Ilocos Norte</div>
                  </td>
                  <td>Danilo Ramos</td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#BA4B24' }}>₱220 / kg</div>
                    <div style={{ fontSize: '0.725rem', color: '#BA4B24' }}>+24% vs DA average</div>
                  </td>
                  <td>
                    <span className="admin-badge orange">Price check</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleReviewAction('Native White Garlic')}
                      className="admin-btn-secondary"
                      style={{ padding: '5px 12px', fontSize: '0.775rem' }}
                    >
                      Review
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0C3C2C' }}>Carabao Mango (Grade A)</div>
                    <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>2,000 kg · Guimaras</div>
                  </td>
                  <td>Guimaras Fruit Coop</td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1B7A43' }}>₱160 / kg</div>
                    <div style={{ fontSize: '0.725rem', color: '#1B7A43' }}>Fair market align</div>
                  </td>
                  <td>
                    <span className="admin-badge blue">Photo check</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleReviewAction('Carabao Mango')}
                      className="admin-btn-secondary"
                      style={{ padding: '5px 12px', fontSize: '0.775rem' }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Recent Transactions Table */}
          <div className="admin-table-container">
            <div className="admin-table-header">
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#0C3C2C' }}>Recent trade transactions</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#5E6E64' }}>Real-time escrow hold and settlement logs.</p>
              </div>
              <button
                onClick={() => onNavigate('/admin/transactions')}
                style={{ background: 'none', border: 'none', color: '#0C3C2C', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                View all transactions →
              </button>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order Reference</th>
                  <th>Parties</th>
                  <th>Commodity</th>
                  <th>Amount</th>
                  <th>Escrow Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>ORD-2026-8842</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>Anita's Kitchen &amp; Co.</div>
                    <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Seller: Ramon Santos</div>
                  </td>
                  <td>Red Onions (250 kg)</td>
                  <td style={{ fontWeight: 700 }}>₱30,000.00</td>
                  <td>
                    <span className="admin-badge green">Released</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>ORD-2026-8845</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>Green Valley Market</div>
                    <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Seller: Elena Corpuz</div>
                  </td>
                  <td>Cherry Tomatoes (100 kg)</td>
                  <td style={{ fontWeight: 700 }}>₱8,500.00</td>
                  <td>
                    <span className="admin-badge orange">In Escrow</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>ORD-2026-8839</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>Manila Bistro Group</div>
                    <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Seller: Guimaras Coop</div>
                  </td>
                  <td>Mangoes (150 kg)</td>
                  <td style={{ fontWeight: 700 }}>₱24,000.00</td>
                  <td>
                    <span className="admin-badge green">Released</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Account Verifications & Audit Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Account Verifications Card */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ margin: '0 0 2px', fontSize: '1.05rem', color: '#0C3C2C' }}>Account verifications</h3>
                <div style={{ fontSize: '0.8rem', color: '#5E6E64' }}>8 farmers · 4 buyers awaiting review</div>
              </div>
              <button
                onClick={() => onNavigate('/admin/farmers')}
                style={{ background: 'none', border: 'none', color: '#D48216', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Queue (12) →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {applications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    backgroundColor: '#FAF7F2',
                    border: '1px solid #EBE4DA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.85rem' }}>{app.applicantName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>{app.farmName}</div>
                    <div style={{ fontSize: '0.7rem', color: '#1B7A43', fontWeight: 600, marginTop: '2px' }}>
                      RSBSA cert submitted
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleQuickVerify(app.id, app.applicantName)}
                      className="admin-btn-primary"
                      style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                    >
                      <Check size={12} /> Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Stream Feed matching Pananim admin overview.png */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0C3C2C' }}>Recent administrative activity</h3>
              <button
                onClick={() => onNavigate('/admin/audit-log')}
                style={{ background: 'none', border: 'none', color: '#0C3C2C', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Audit log →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8rem' }}>
              <div style={{ paddingBottom: '10px', borderBottom: '1px solid #EBE4DA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8A7B76', fontSize: '0.725rem' }}>
                  <span>Ana Santos (Administrator)</span>
                  <span>9:35 AM</span>
                </div>
                <div style={{ fontWeight: 600, color: '#1D2D24', marginTop: '2px' }}>
                  Farmer account verified: Carlo Reyes (Bulacan)
                </div>
              </div>

              <div style={{ paddingBottom: '10px', borderBottom: '1px solid #EBE4DA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8A7B76', fontSize: '0.725rem' }}>
                  <span>Miguel Lim (Moderator)</span>
                  <span>9:22 AM</span>
                </div>
                <div style={{ fontWeight: 600, color: '#1D2D24', marginTop: '2px' }}>
                  Crop listing approved: Native Ginger (CR-1245)
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8A7B76', fontSize: '0.725rem' }}>
                  <span>System (Automated Task)</span>
                  <span>9:00 AM</span>
                </div>
                <div style={{ fontWeight: 600, color: '#1D2D24', marginTop: '2px' }}>
                  Encrypted daily marketplace backup completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
