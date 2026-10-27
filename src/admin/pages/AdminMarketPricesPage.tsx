import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight, 
  Check, 
  Plus,
  Filter,
  BarChart2
} from 'lucide-react';

interface AdminMarketPricesPageProps {
  onNavigate: (route: string) => void;
}

export const AdminMarketPricesPage: React.FC<AdminMarketPricesPageProps> = ({ onNavigate }) => {
  const [selectedCommodity, setSelectedCommodity] = useState('Red Onions (Medium)');
  const [daPrice, setDaPrice] = useState('130');
  const [wholesaleTarget, setWholesaleTarget] = useState('115');
  const [region, setRegion] = useState('Region III (Central Luzon)');
  const [toastMessage, setToastMessage] = useState('');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage(`Updated DA Bantay Presyo benchmark for ${selectedCommodity} to ₱${daPrice}/kg.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-page-overline">ADMINISTRATION</div>
      <div className="admin-page-title-row">
        <div>
          <h1 className="admin-page-title">Market prices</h1>
          <p className="admin-page-subtitle">
            DA Bantay Presyo benchmarks, price variance tracking, and commodity trend analysis.
          </p>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#8C9C92', alignSelf: 'center' }}>
          Daily DA Sync: 19 Oct 2026, 6:00 AM PHT
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

      {/* 4 Stat Cards matching Pananim market prices.png */}
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Monitored markets</span>
            <TrendingUp size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">18</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,25 Q30,22 60,15 T120,5" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#1B7A43', fontWeight: 600 }}>Central Luzon &amp; Benguet</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Tracked categories</span>
            <BarChart2 size={16} color="#8EABA0" />
          </div>
          <div className="admin-stat-card-value">6</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,20 Q30,18 60,12 T120,6" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub">Vegetables, fruits, herbs, roots</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Updated today</span>
            <Clock size={16} color="#1B7A43" />
          </div>
          <div className="admin-stat-card-value">4</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,26 Q40,16 80,18 T120,4" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#1B7A43', fontWeight: 600 }}>Official DA 6:00 AM feed</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-title">
            <span>Outlier flags</span>
            <AlertTriangle size={16} color="#BA4B24" />
          </div>
          <div className="admin-stat-card-value">3</div>
          <div style={{ height: '36px', width: '100%', margin: '4px 0 8px 0' }}>
            <svg viewBox="0 0 120 30" style={{ width: '100%', height: '100%' }}>
              <path d="M0,10 Q40,12 80,24 T120,22" fill="none" stroke="#BA4B24" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="admin-stat-card-sub" style={{ color: '#BA4B24', fontWeight: 600 }}>Variance &gt; 20% vs benchmark</div>
        </div>
      </div>

      {/* 2-Column Chart & Publish Form matching Pananim market prices.png */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.9fr 1.1fr', 
          gap: '24px',
          alignItems: 'start',
          marginBottom: '24px'
        }}
      >
        {/* Trend Chart Card */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#0C3C2C' }}>
                Red Onion Price Trend vs DA Benchmark
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#5E6E64' }}>
                Comparing Pananim marketplace transactions against DA Bantay Presyo.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0C3C2C' }} />
                <span>Pananim Median</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#D48216' }} />
                <span>DA Reference</span>
              </div>
            </div>
          </div>

          {/* SVG Chart */}
          <div style={{ width: '100%', height: '220px' }}>
            <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="adminPriceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0C3C2C" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0C3C2C" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="50" x2="600" y2="50" stroke="#EBE4DA" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#EBE4DA" strokeDasharray="3 3" />
              <line x1="0" y1="150" x2="600" y2="150" stroke="#EBE4DA" strokeDasharray="3 3" />
              {/* DA Reference line */}
              <line x1="0" y1="110" x2="600" y2="95" stroke="#D48216" strokeWidth="2.5" strokeDasharray="5 4" />
              {/* Pananim Price Curve */}
              <path
                d="M0,140 Q150,130 300,90 T600,60 L600,200 L0,200 Z"
                fill="url(#adminPriceGrad)"
              />
              <path
                d="M0,140 Q150,130 300,90 T600,60"
                fill="none"
                stroke="#0C3C2C"
                strokeWidth="3"
              />
              <circle cx="300" cy="90" r="5" fill="#FFFFFF" stroke="#0C3C2C" strokeWidth="2.5" />
              <circle cx="600" cy="60" r="6" fill="#D48216" stroke="#FFFFFF" strokeWidth="2.5" />
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8C9C92', marginTop: '12px' }}>
            <span>1 Oct (₱110)</span>
            <span>8 Oct (₱118)</span>
            <span>15 Oct (₱128)</span>
            <span>22 Oct (₱135)</span>
            <span>Today (₱145)</span>
          </div>
        </div>

        {/* Right Form: Publish Price Update */}
        <div className="admin-card">
          <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#0C3C2C' }}>Publish price update</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.8rem', color: '#5E6E64' }}>Broadcast latest DA benchmark.</p>

          <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#1D2D24', marginBottom: '4px' }}>
                Commodity *
              </label>
              <select
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D5CABE',
                  fontSize: '0.85rem',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              >
                <option value="Red Onions (Medium)">Red Onions (Medium)</option>
                <option value="Cherry Tomatoes (Highland)">Cherry Tomatoes (Highland)</option>
                <option value="Native White Garlic">Native White Garlic</option>
                <option value="Carabao Mango">Carabao Mango</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#1D2D24', marginBottom: '4px' }}>
                DA Retail Reference (₱/kg) *
              </label>
              <input
                type="number"
                value={daPrice}
                onChange={(e) => setDaPrice(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D5CABE',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#1D2D24', marginBottom: '4px' }}>
                Target Farm Gate / Wholesale (₱/kg)
              </label>
              <input
                type="number"
                value={wholesaleTarget}
                onChange={(e) => setWholesaleTarget(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D5CABE',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#1D2D24', marginBottom: '4px' }}>
                Region Scope
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D5CABE',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              className="admin-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
            >
              <TrendingUp size={15} /> Publish benchmark update
            </button>
          </form>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0C3C2C' }}>Current market comparison</h3>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Commodity</th>
              <th>Category</th>
              <th>DA Bantay Presyo</th>
              <th>Pananim Average</th>
              <th>Variance</th>
              <th>Last Updated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong style={{ color: '#0C3C2C' }}>Red Onion (Local Medium)</strong></td>
              <td>Bulb Crop</td>
              <td>₱122.00 / kg</td>
              <td>₱145.00 / kg</td>
              <td><span className="admin-badge orange">+18.8%</span></td>
              <td>Today, 6:00 AM</td>
              <td><span className="admin-badge orange">Price check flag</span></td>
            </tr>

            <tr>
              <td><strong style={{ color: '#0C3C2C' }}>Cherry Tomato (Highland)</strong></td>
              <td>Fruit Vegetable</td>
              <td>₱88.00 / kg</td>
              <td>₱85.00 / kg</td>
              <td><span className="admin-badge green">-3.4%</span></td>
              <td>Today, 6:00 AM</td>
              <td><span className="admin-badge green">Aligned</span></td>
            </tr>

            <tr>
              <td><strong style={{ color: '#0C3C2C' }}>Native White Garlic</strong></td>
              <td>Bulb Crop</td>
              <td>₱180.00 / kg</td>
              <td>₱220.00 / kg</td>
              <td><span className="admin-badge orange">+22.2%</span></td>
              <td>Yesterday</td>
              <td><span className="admin-badge orange">Price check flag</span></td>
            </tr>

            <tr>
              <td><strong style={{ color: '#0C3C2C' }}>Carabao Mango (Sweet)</strong></td>
              <td>Fruit</td>
              <td>₱165.00 / kg</td>
              <td>₱160.00 / kg</td>
              <td><span className="admin-badge green">-3.0%</span></td>
              <td>Today, 6:00 AM</td>
              <td><span className="admin-badge green">Aligned</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
