import React, { useState } from 'react';
import { CropListing, Farm, CropReview } from '../../types';
import { 
  MapPin, 
  Share2, 
  CheckCircle2, 
  Calendar, 
  Package, 
  Star, 
  ArrowLeft, 
  Copy, 
  ShieldCheck, 
  Tag,
  Edit3
} from 'lucide-react';
import { FarmerUpdateStockModal } from '../components/FarmerUpdateStockModal';

interface FarmerCropDetailPageProps {
  cropId?: string;
  cropListings: CropListing[];
  farms: Farm[];
  reviews: CropReview[];
  onNavigate: (route: string) => void;
  onUpdateCropStock?: (cropId: string, newStock: number) => void;
}

export const FarmerCropDetailPage: React.FC<FarmerCropDetailPageProps> = ({
  cropId = 'crop-001',
  cropListings,
  farms,
  reviews,
  onNavigate,
  onUpdateCropStock
}) => {
  const crop = cropListings.find(c => c.id === cropId);
  const farm = crop ? (farms.find(f => f.id === crop.farmId) || farms[0]) : null;
  const [copiedToast, setCopiedToast] = useState(false);
  const [stockModalOpen, setStockModalOpen] = useState(false);

  if (!crop || !farm) {
    return (
      <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="farmer-card" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🌱</div>
          <h2 style={{ fontSize: '1.6rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>Crop Listing Not Found</h2>
          <p style={{ color: '#5E6E64', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            The crop listing {cropId ? `"${cropId}"` : 'requested'} does not exist in your farm inventory.
          </p>
          <button onClick={() => onNavigate('/farmer/inventory')} className="farmer-btn-primary">
            Return to My Crops
          </button>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5E6E64' }}>
          <span onClick={() => onNavigate('/farmer/dashboard')} style={{ cursor: 'pointer', color: '#0C3C2C', fontWeight: 600 }}>Overview</span>
          <span>&rsaquo;</span>
          <span onClick={() => onNavigate('/farmer/inventory')} style={{ cursor: 'pointer', color: '#0C3C2C', fontWeight: 600 }}>My Crops</span>
          <span>&rsaquo;</span>
          <span style={{ color: '#1D2D24', fontWeight: 600 }}>{crop.name}</span>
        </div>
        <button
          onClick={() => onNavigate('/farmer/inventory')}
          style={{ background: 'none', border: 'none', color: '#0C3C2C', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          &larr; Back to My Crops
        </button>
      </div>

      {copiedToast && (
        <div style={{ marginBottom: '1rem', padding: '10px 14px', backgroundColor: '#E8F5EE', borderRadius: '8px', color: '#1B7A43', fontSize: '0.85rem' }}>
          Link copied to clipboard!
        </div>
      )}

      {/* Main 2-Col Detail Layout matching Crop Details · Pananim.png */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        {/* Left Column: Image & Farm Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="farmer-card" style={{ padding: 0, overflow: 'hidden' }}>
            <img
              src={crop.imageUrl}
              alt={crop.name}
              style={{ width: '100%', height: '340px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="farmer-badge green">● Live Marketplace Listing</span>
                <button
                  onClick={handleCopyLink}
                  style={{
                    background: 'none',
                    border: '1px solid #D5CABE',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#5E6E64'
                  }}
                >
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>
          </div>

          <div className="farmer-card" style={{ padding: '1.5rem' }}>
            <h3 className="farmer-card-title" style={{ marginBottom: '1rem' }}>
              <ShieldCheck size={20} color="#D48216" /> Farm Origin &amp; Verification
            </h3>
            <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '1rem' }}>{farm.name || farm.farmerName}</div>
            <div style={{ fontSize: '0.8rem', color: '#5E6E64', marginBottom: '12px' }}>
              <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} />
              {crop.municipality}, {crop.province}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#1D2D24', lineHeight: 1.5 }}>
              Harvested under GAP (Good Agricultural Practices) standards. Packed in breathable sanitized wholesale crates.
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Inventory & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="farmer-card" style={{ padding: '2rem' }}>
            <span className="farmer-badge gray" style={{ marginBottom: '8px' }}>{crop.category}</span>
            <h1 style={{ fontSize: '2rem', color: '#0C3C2C', margin: '0 0 8px 0', fontWeight: 800 }}>
              {crop.name}
            </h1>
            <div style={{ fontSize: '0.875rem', color: '#5E6E64', marginBottom: '1.5rem' }}>
              Variety: <strong>{crop.variety || 'Native Extra Grade'}</strong> · Harvest Date: <strong>{crop.harvestDate || '22 Oct 2026'}</strong>
            </div>

            {/* Price & Stock Display Box */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1.25rem',
                backgroundColor: '#FAF7F2',
                borderRadius: '12px',
                border: '1px solid #EBE4DA',
                marginBottom: '1.5rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: '#8A7B76', textTransform: 'uppercase', fontWeight: 600 }}>Selling Price</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0C3C2C' }}>
                  ₱{crop.pricePerUnit} <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>/ kg</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#8A7B76', textTransform: 'uppercase', fontWeight: 600 }}>Available Stock</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1B7A43' }}>
                  {crop.availableStock.toLocaleString()} <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>kg</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#1D2D24', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {crop.description || 'Premium local harvest cultivated in fertile alluvial soil. Direct from farm gate to market with verified traceability.'}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setStockModalOpen(true)}
                className="farmer-btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Edit3 size={16} /> Update Available Stock
              </button>
              <button
                onClick={() => onNavigate('/farmer/inventory')}
                className="farmer-btn-secondary"
              >
                View in Inventory
              </button>
            </div>
          </div>
        </div>
      </div>

      <FarmerUpdateStockModal
        crops={cropListings}
        initialCropId={crop.id}
        isOpen={stockModalOpen}
        onClose={() => setStockModalOpen(false)}
        onSaveStock={(id, val) => onUpdateCropStock?.(id, val)}
      />
    </div>
  );
};
