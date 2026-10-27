import React, { useState } from 'react';
import { 
  Sprout, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Check, 
  X, 
  Eye, 
  Filter, 
  TrendingUp, 
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';
import { CropListing } from '../../types';

interface AdminCropListingsPageProps {
  cropListings: CropListing[];
  onNavigate: (route: string) => void;
  onUpdateCropStock?: (cropId: string, newStock: number) => void;
}

export const AdminCropListingsPage: React.FC<AdminCropListingsPageProps> = ({
  cropListings,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'review' | 'active' | 'flagged' | 'paused'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  const handleApprove = (cropName: string) => {
    setToastMessage(`Crop listing "${cropName}" approved and published to marketplace.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleReject = (cropName: string) => {
    setToastMessage(`Crop listing "${cropName}" rejected. Notification sent to farmer with review notes.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-page-overline">ADMINISTRATION</div>
      <div className="admin-page-title-row">
        <div>
          <h1 className="admin-page-title">Crop listings</h1>
          <p className="admin-page-subtitle">
            Manage marketplace listings, quality reviews, and catalog completeness.
          </p>
        </div>
        <button
          onClick={() => {
            setToastMessage('Exporting marketplace catalog CSV...');
            setTimeout(() => setToastMessage(''), 2500);
          }}
          className="admin-btn-primary"
        >
          <Download size={15} /> Export catalog
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

      {/* 4 Stat Cards matching Pananim crop listings.png */}
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Active listings</span>
            <Sprout size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">1,248</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,25 Q30,22 60,15 T120,5" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub">1,215 live · 33 paused</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Awaiting approval</span>
            <Clock size={16} color="#D48216" />
          </div>
          <div className="admin-stat-card-value">24</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,15 Q30,22 60,18 T120,8" fill="none" stroke="#D48216" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#D48216', fontWeight: 600 }}>18 new · 6 updated</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Flagged for review</span>
            <AlertTriangle size={16} color="#BA4B24" />
          </div>
          <div className="admin-stat-card-value">3</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,10 Q40,12 80,24 T120,22" fill="none" stroke="#BA4B24" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#BA4B24', fontWeight: 600 }}>2 price outliers · 1 quality issue</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Catalog completeness</span>
            <CheckCircle2 size={16} color="#1B7A43" />
          </div>
          <div className="admin-stat-card-value">96.4%</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,26 Q40,16 80,18 T120,4" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#1B7A43', fontWeight: 600 }}>High quality descriptions</div>
        </div>
      </div>

      {/* Main Table with Filters matching Pananim crop listings.png */}
      <div className="admin-table-container">
        {/* Filter Tabs */}
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
            All listings 1,248
          </button>
          <button
            onClick={() => setActiveTab('review')}
            style={{
              background: 'none',
              border: 'none',
              paddingBottom: '14px',
              fontSize: '0.875rem',
              fontWeight: activeTab === 'review' ? 700 : 500,
              color: activeTab === 'review' ? '#07271C' : '#5E6E64',
              borderBottom: activeTab === 'review' ? '2px solid #07271C' : 'none',
              cursor: 'pointer'
            }}
          >
            Needs review 24
          </button>
          <button
            onClick={() => setActiveTab('active')}
            style={{
              background: 'none',
              border: 'none',
              paddingBottom: '14px',
              fontSize: '0.875rem',
              fontWeight: activeTab === 'active' ? 700 : 500,
              color: activeTab === 'active' ? '#07271C' : '#5E6E64',
              borderBottom: activeTab === 'active' ? '2px solid #07271C' : 'none',
              cursor: 'pointer'
            }}
          >
            Active 1,215
          </button>
          <button
            onClick={() => setActiveTab('flagged')}
            style={{
              background: 'none',
              border: 'none',
              paddingBottom: '14px',
              fontSize: '0.875rem',
              fontWeight: activeTab === 'flagged' ? 700 : 500,
              color: activeTab === 'flagged' ? '#07271C' : '#5E6E64',
              borderBottom: activeTab === 'flagged' ? '2px solid #07271C' : 'none',
              cursor: 'pointer'
            }}
          >
            Flagged 3
          </button>
        </div>

        {/* Filter Controls Row */}
        <div style={{ display: 'flex', gap: '12px', padding: '14px 24px', backgroundColor: '#FAF7F2', borderBottom: '1px solid #EBE4DA', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <input
              type="text"
              placeholder="Search by crop, farmer, or SKU..."
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid #D5CABE',
              fontSize: '0.825rem',
              backgroundColor: '#FFFFFF',
              outline: 'none'
            }}
          >
            <option value="All">All categories</option>
            <option value="Bulb Crop">Bulb Crop</option>
            <option value="Fruit Vegetable">Fruit Vegetable</option>
            <option value="Root Crop">Root Crop</option>
          </select>
        </div>

        {/* Listings Table */}
        <table className="admin-table">
          <thead>
            <tr>
              <th>Crop Commodity</th>
              <th>Farmer / Cooperative</th>
              <th>Price vs DA Benchmark</th>
              <th>Stock Available</th>
              <th>Quality / Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=80&q=80"
                    alt="Red Onions"
                    style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: '#0C3C2C' }}>Red Onions (Bulacan)</div>
                    <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>SKU: CR-1240 · Class A Bulb</div>
                  </div>
                </div>
              </td>
              <td>
                <div style={{ fontWeight: 600 }}>Ramon Santos</div>
                <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Santos Organic Farms (Bulacan)</div>
              </td>
              <td>
                <div style={{ fontWeight: 700, color: '#BA4B24' }}>₱145 / kg</div>
                <div style={{ fontSize: '0.725rem', color: '#BA4B24' }}>+18% vs DA average (₱122)</div>
              </td>
              <td>
                <div style={{ fontWeight: 700 }}>1,500 kg</div>
                <div style={{ fontSize: '0.725rem', color: '#1B7A43' }}>Harvested 28 Oct</div>
              </td>
              <td>
                <span className="admin-badge orange">Price check</span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: '6px' }}>
                  <button
                    onClick={() => handleApprove('Red Onions')}
                    className="admin-btn-primary"
                    style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                  >
                    <Check size={13} /> Approve
                  </button>
                  <button
                    onClick={() => handleReject('Red Onions')}
                    className="admin-btn-secondary"
                    style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                  >
                    <X size={13} /> Reject
                  </button>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=80&q=80"
                    alt="Tomatoes"
                    style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: '#0C3C2C' }}>Cherry Tomatoes (Highland)</div>
                    <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>SKU: CR-1242 · Vine ripened</div>
                  </div>
                </div>
              </td>
              <td>
                <div style={{ fontWeight: 600 }}>Elena Corpuz</div>
                <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Benguet Highlands Cooperative</div>
              </td>
              <td>
                <div style={{ fontWeight: 700, color: '#1B7A43' }}>₱85 / kg</div>
                <div style={{ fontSize: '0.725rem', color: '#1B7A43' }}>Aligned with DA benchmark (₱88)</div>
              </td>
              <td>
                <div style={{ fontWeight: 700 }}>800 kg</div>
                <div style={{ fontSize: '0.725rem', color: '#1B7A43' }}>Ready for dispatch</div>
              </td>
              <td>
                <span className="admin-badge green">New listing</span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: '6px' }}>
                  <button
                    onClick={() => handleApprove('Cherry Tomatoes')}
                    className="admin-btn-primary"
                    style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                  >
                    <Check size={13} /> Approve
                  </button>
                  <button
                    onClick={() => handleReject('Cherry Tomatoes')}
                    className="admin-btn-secondary"
                    style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                  >
                    <X size={13} /> Reject
                  </button>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=80&q=80"
                    alt="Mangoes"
                    style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: '#0C3C2C' }}>Carabao Mango (Export Grade)</div>
                    <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>SKU: CR-1248 · Sweet variety</div>
                  </div>
                </div>
              </td>
              <td>
                <div style={{ fontWeight: 600 }}>Guimaras Island Fruit Growers</div>
                <div style={{ fontSize: '0.725rem', color: '#5E6E64' }}>Region VI Cooperative</div>
              </td>
              <td>
                <div style={{ fontWeight: 700, color: '#1B7A43' }}>₱160 / kg</div>
                <div style={{ fontSize: '0.725rem', color: '#1B7A43' }}>Fair market align</div>
              </td>
              <td>
                <div style={{ fontWeight: 700 }}>2,000 kg</div>
                <div style={{ fontSize: '0.725rem', color: '#1B7A43' }}>Harvested 24 Oct</div>
              </td>
              <td>
                <span className="admin-badge green">Active</span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <button
                  onClick={() => onNavigate('/admin/crops/crop-003')}
                  className="admin-btn-secondary"
                  style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                >
                  View details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
