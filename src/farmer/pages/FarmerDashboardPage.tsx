import React, { useState } from 'react';
import { CropListing, OrderGroup, Farm, VerificationApplication } from '../../types';
import { FarmerHeroBanner } from '../FarmerHeroBanner';
import { FarmerUpdateStockModal } from '../components/FarmerUpdateStockModal';
import { 
  Sprout, 
  Handshake, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  User, 
  Edit3, 
  Truck, 
  Store, 
  BookOpen, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  PlusCircle,
  ExternalLink
} from 'lucide-react';

interface FarmerDashboardPageProps {
  cropListings: CropListing[];
  farms: Farm[];
  orders: OrderGroup[];
  applications: VerificationApplication[];
  onNavigate: (route: string) => void;
  onUpdateCropStock: (cropId: string, newStock: number) => void;
}

export const FarmerDashboardPage: React.FC<FarmerDashboardPageProps> = ({
  cropListings,
  farms,
  orders,
  applications,
  onNavigate,
  onUpdateCropStock
}) => {
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [selectedCropIdForStock, setSelectedCropIdForStock] = useState<string>('');

  const pendingOrdersCount = orders.filter(o => o.sellerOrders?.some(so => so.status === 'Awaiting Confirmation' || so.status === 'Confirmed')).length || 5;

  const handleOpenStockModal = (cropId: string) => {
    setSelectedCropIdForStock(cropId);
    setStockModalOpen(true);
  };

  return (
    <div style={{ backgroundColor: '#FAF7F2', paddingBottom: '4rem' }}>
      {/* 4 Key Platform Stat Cards matching FRONT PAGE FARMER.png */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}
      >
        {/* Card 1: Active Listings */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">Active Harvest Listings</span>
            <div className="farmer-stat-icon-wrapper">
              <Sprout size={20} />
            </div>
          </div>
          <div className="farmer-stat-value">
            {cropListings.length}
          </div>
          <div className="farmer-stat-trend positive">
            <span>+2 new batches this week</span>
          </div>
        </div>

        {/* Card 2: Pending Orders */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">Wholesale Inquiries</span>
            <div className="farmer-stat-icon-wrapper" style={{ backgroundColor: '#FEF3E2', color: '#D48216' }}>
              <Handshake size={20} />
            </div>
          </div>
          <div className="farmer-stat-value">
            {String(pendingOrdersCount).padStart(2, '0')}
          </div>
          <div className="farmer-stat-trend warning">
            <span>Requires confirmation within 24h</span>
          </div>
        </div>

        {/* Card 3: 30-Day Sales Volume */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">30-Day Sales Volume</span>
            <div className="farmer-stat-icon-wrapper" style={{ backgroundColor: '#E8F5EE', color: '#1B7A43' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="farmer-stat-value">
            ₱142,500
          </div>
          <div className="farmer-stat-trend positive">
            <span>+14.2% vs last month</span>
          </div>
        </div>

        {/* Card 4: Unread Inquiries */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">Buyer Messages</span>
            <div className="farmer-stat-icon-wrapper" style={{ backgroundColor: '#F0F2F1', color: '#53645A' }}>
              <MessageSquare size={20} />
            </div>
          </div>
          <div className="farmer-stat-value">
            03
          </div>
          <div className="farmer-stat-trend">
            <span>Institutional buyers waiting</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Layout matching FRONT PAGE FARMER.png */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', 
          gap: '2rem',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Active Crops Management */}
        <div className="farmer-card" style={{ padding: '1.75rem' }}>
          <div className="farmer-card-header">
            <div>
              <h3 className="farmer-card-title">
                <Sprout size={20} color="#D48216" /> Active Farm Listings
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#5E6E64', margin: '4px 0 0 0' }}>
                Quick stock adjustments and live harvest availability.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/farmer/inventory')}
              style={{
                background: 'none',
                border: 'none',
                color: '#D48216',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>View all</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Crops Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cropListings.slice(0, 4).map((crop) => (
              <div
                key={crop.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  backgroundColor: '#FAF7F2',
                  borderRadius: '12px',
                  border: '1px solid #EBE4DA',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#0C3C2C' }}>{crop.name}</h4>
                    <div style={{ fontSize: '0.8rem', color: '#5E6E64', display: 'flex', gap: '8px' }}>
                      <span>₱{crop.pricePerUnit}/kg</span>
                      <span>•</span>
                      <strong style={{ color: '#1B7A43' }}>{crop.availableStock.toLocaleString()} kg available</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleOpenStockModal(crop.id)}
                    className="farmer-btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <Edit3 size={14} /> Update Stock
                  </button>
                  <button
                    onClick={() => onNavigate(`/farmer/crops/${crop.id}`)}
                    className="farmer-btn-forest"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <button
              onClick={() => onNavigate('/farmer/inventory/new')}
              className="farmer-btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <PlusCircle size={16} /> List a New Harvest Batch
            </button>
          </div>
        </div>

        {/* Right Column: Live Market Prices & Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* DA Bantay Presyo Price Benchmarks */}
          <div className="farmer-card" style={{ padding: '1.75rem' }}>
            <div className="farmer-card-header">
              <div>
                <h3 className="farmer-card-title">
                  <TrendingUp size={20} color="#1B7A43" /> Live Market Benchmarks
                </h3>
                <p style={{ fontSize: '0.825rem', color: '#5E6E64', margin: '4px 0 0 0' }}>
                  Department of Agriculture Bantay Presyo regional references.
                </p>
              </div>
              <span className="farmer-badge green">● Official DA Feed</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#FAF7F2', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#0C3C2C', fontSize: '0.9rem' }}>Red Onion (Local Medium)</div>
                  <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>Central Luzon Average</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.95rem' }}>₱135 / kg</div>
                  <div style={{ fontSize: '0.75rem', color: '#1B7A43', fontWeight: 600 }}>+₱5 vs last week</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#FAF7F2', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#0C3C2C', fontSize: '0.9rem' }}>Cherry Tomato (Highland)</div>
                  <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>Benguet Agri Trading Post</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.95rem' }}>₱92 / kg</div>
                  <div style={{ fontSize: '0.75rem', color: '#D48216', fontWeight: 600 }}>-₱2 vs last week</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#FAF7F2', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#0C3C2C', fontSize: '0.9rem' }}>Carabao Mango (Sweet)</div>
                  <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>Guimaras Wholesale</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.95rem' }}>₱165 / kg</div>
                  <div style={{ fontSize: '0.75rem', color: '#1B7A43', fontWeight: 600 }}>+₱10 vs last week</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
              <button
                onClick={() => onNavigate('/market-prices')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0C3C2C',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>View nationwide market prices</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Quick Wholesale Orders Activity */}
          <div className="farmer-card" style={{ padding: '1.75rem' }}>
            <div className="farmer-card-header">
              <div>
                <h3 className="farmer-card-title">
                  <Handshake size={20} color="#D48216" /> Recent Sales & Orders
                </h3>
                <p style={{ fontSize: '0.825rem', color: '#5E6E64', margin: '4px 0 0 0' }}>
                  Institutional buyer orders awaiting fulfillment.
                </p>
              </div>
              <button
                onClick={() => onNavigate('/farmer/orders')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D48216',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                View all
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#FAF7F2',
                    border: '1px solid #EBE4DA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.875rem' }}>{order.id}</div>
                    <div style={{ fontSize: '0.775rem', color: '#5E6E64' }}>
                      {order.buyerName} · ₱{order.grandTotal.toLocaleString()}
                    </div>
                  </div>
                  <span className="farmer-badge orange">
                    Awaiting Schedule
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stock Update Modal */}
      <FarmerUpdateStockModal
        crops={cropListings}
        initialCropId={selectedCropIdForStock}
        isOpen={stockModalOpen}
        onClose={() => setStockModalOpen(false)}
        onSaveStock={onUpdateCropStock}
      />
    </div>
  );
};
