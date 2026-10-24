import React, { useState } from 'react';
import { CropListing, OrderGroup, Farm } from '../types';
import { 
  Plus, 
  TrendingUp, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  MapPin,
  Calendar,
  Save,
  Minus,
  Sparkles
} from 'lucide-react';

interface FarmerDashboardProps {
  farmer: Farm;
  cropListings: CropListing[];
  orders: OrderGroup[];
  onNavigate: (route: string) => void;
  onUpdateCropStock: (cropId: string, newStock: number) => void;
}

export const FarmerDashboardPage: React.FC<FarmerDashboardProps> = ({
  farmer,
  cropListings,
  orders,
  onNavigate,
  onUpdateCropStock
}) => {
  const [activeCropId, setActiveCropId] = useState(cropListings[0]?.id || 'crop-001');
  const [adjustmentMode, setAdjustmentMode] = useState<'add' | 'remove' | 'set'>('remove');
  const [adjustQuantity, setAdjustQuantity] = useState(200);
  const [reason, setReason] = useState('Sold outside Pananim');
  const [notes, setNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeCrop = cropListings.find(c => c.id === activeCropId) || cropListings[0];

  const currentStock = activeCrop?.availableStock || 1200;
  const calculatedNewStock = 
    adjustmentMode === 'add' ? currentStock + adjustQuantity :
    adjustmentMode === 'remove' ? Math.max(0, currentStock - adjustQuantity) :
    adjustQuantity;

  const handleSaveStock = () => {
    if (activeCrop) {
      onUpdateCropStock(activeCrop.id, calculatedNewStock);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* Overview Dashboard Banner matching Screenshot 215554 & 215606 */}
      <section className="hero-banner" style={{ padding: '3.5rem 0 4.5rem 0' }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              OVERVIEW DASHBOARD
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.8rem', marginBottom: '0.75rem' }}>
              Welcome back, {farmer.farmerName.split(' ')[0]}!
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.05rem', marginBottom: '2rem' }}>
              Your crops in {farmer.province} are showing a 12% price increase this week. Check your latest listings and market insights below.
            </p>

            {/* Quick action buttons matching Screenshot 215554 */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('/farmer/inventory/new')}
                className="btn btn-outline-warm"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: '#FFFFFF' }}
              >
                List New Crop
              </button>
              <button
                onClick={() => onNavigate('/farmer/inventory')}
                className="btn btn-accent"
                style={{ fontWeight: 700 }}
              >
                Update Inventory
              </button>
              <button
                onClick={() => onNavigate('/farmer/orders')}
                className="btn btn-outline-warm"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: '#FFFFFF' }}
              >
                My Sales
              </button>
              <button
                onClick={() => onNavigate('/farmer/settlements')}
                className="btn btn-outline-warm"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: '#FFFFFF' }}
              >
                Earnings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Stock Adjustment Tool matching Screenshot 215554 */}
      <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        {/* Breadcrumb & Subheading matching Screenshot 215554 */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '0.8rem', color: '#8A7B76', marginBottom: '0.35rem' }}>
            <span>Home</span> &gt; <span>My Crops</span> &gt; <strong style={{ color: '#0C3C2C' }}>Update Stock</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.65rem', color: '#0C3C2C', marginBottom: '0.2rem' }}>Update Stock</h2>
              <p style={{ fontSize: '0.9rem' }}>Keep your available harvest accurate so buyers know what&apos;s ready to sell.</p>
            </div>
            <button
              onClick={() => onNavigate('/farmer/inventory')}
              className="btn btn-outline-warm btn-sm"
            >
              &larr; Back to My Crops
            </button>
          </div>
        </div>

        {/* 1. Select Your Crop Card matching Screenshot 215554 */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#0C3C2C' }}>Select your crop</h3>
            <span style={{ fontSize: '0.8rem', color: '#8A7B76' }}>{cropListings.length} active listings</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {cropListings.slice(0, 3).map((crop) => {
              const isSelected = crop.id === activeCropId;
              return (
                <div
                  key={crop.id}
                  onClick={() => setActiveCropId(crop.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    border: isSelected ? '2px solid #0C3C2C' : '1px solid #DECDBD',
                    borderRadius: '10px',
                    backgroundColor: isSelected ? '#FAF6F0' : '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={crop.imageUrl} alt={crop.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ color: '#0C3C2C', fontSize: '0.95rem', display: 'block' }}>{crop.name}</strong>
                      <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                        {crop.municipality}, {crop.province} &bull; {crop.availableStock} {crop.unit} &bull; ₱{crop.pricePerUnit}/{crop.unit}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0C3C2C', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#8A7B76', marginTop: '0.75rem', display: 'block' }}>
            You&apos;re updating {activeCrop.name} only. Your other listing will stay unchanged.
          </span>
        </div>

        {/* 2. Adjust available stock & Right Inventory Panel matching Screenshot 215554 */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '1.75rem',
            alignItems: 'start'
          }}
        >
          {/* Left Adjust Box matching Screenshot 215554 */}
          <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C', marginBottom: '0.25rem' }}>
              Adjust available stock
            </h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Record a change or set the exact quantity you have on hand.
            </p>

            {/* How would you like to update stock buttons matching Screenshot 215554 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.5rem' }}>
                How would you like to update stock?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setAdjustmentMode('add')}
                  style={{
                    padding: '0.6rem 0.5rem',
                    borderRadius: '8px',
                    border: adjustmentMode === 'add' ? '2px solid #0C3C2C' : '1px solid #DECDBD',
                    backgroundColor: adjustmentMode === 'add' ? '#E2ECE5' : '#FFFFFF',
                    fontWeight: adjustmentMode === 'add' ? 700 : 500,
                    fontSize: '0.8rem',
                    color: '#0C3C2C'
                  }}
                >
                  + Add stock
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustmentMode('remove')}
                  style={{
                    padding: '0.6rem 0.5rem',
                    borderRadius: '8px',
                    border: adjustmentMode === 'remove' ? '2px solid #0C3C2C' : '1px solid #DECDBD',
                    backgroundColor: adjustmentMode === 'remove' ? '#E2ECE5' : '#FFFFFF',
                    fontWeight: adjustmentMode === 'remove' ? 700 : 500,
                    fontSize: '0.8rem',
                    color: '#0C3C2C'
                  }}
                >
                  &minus; Remove stock
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustmentMode('set')}
                  style={{
                    padding: '0.6rem 0.5rem',
                    borderRadius: '8px',
                    border: adjustmentMode === 'set' ? '2px solid #0C3C2C' : '1px solid #DECDBD',
                    backgroundColor: adjustmentMode === 'set' ? '#E2ECE5' : '#FFFFFF',
                    fontWeight: adjustmentMode === 'set' ? 700 : 500,
                    fontSize: '0.8rem',
                    color: '#0C3C2C'
                  }}
                >
                  = Set total stock
                </button>
              </div>
            </div>

            {/* Quantity and Reason Inputs matching Screenshot 215554 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                  Quantity to {adjustmentMode === 'add' ? 'add' : adjustmentMode === 'remove' ? 'remove' : 'set'} *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #DECDBD', borderRadius: '8px', backgroundColor: '#FAF6F0' }}>
                  <button
                    onClick={() => setAdjustQuantity(Math.max(10, adjustQuantity - 50))}
                    style={{ padding: '0.5rem 0.75rem', fontSize: '1.1rem', fontWeight: 700, color: '#0C3C2C' }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={adjustQuantity}
                    onChange={(e) => setAdjustQuantity(Number(e.target.value))}
                    style={{ textAlign: 'center', border: 'none', backgroundColor: 'transparent', fontWeight: 700 }}
                  />
                  <span style={{ fontSize: '0.85rem', color: '#8A7B76', paddingRight: '0.5rem' }}>{activeCrop.unit}</span>
                  <button
                    onClick={() => setAdjustQuantity(adjustQuantity + 50)}
                    style={{ padding: '0.5rem 0.75rem', fontSize: '1.1rem', fontWeight: 700, color: '#0C3C2C' }}
                  >
                    +
                  </button>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#8A7B76', marginTop: '0.25rem', display: 'block' }}>
                  Remove up to {currentStock} {activeCrop.unit} of available stock.
                </span>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                  Reason for update *
                </label>
                <select value={reason} onChange={(e) => setReason(e.target.value)}>
                  <option value="Sold outside Pananim">Sold outside Pananim</option>
                  <option value="Post-harvest sorting loss">Post-harvest sorting loss</option>
                  <option value="Physical recount adjustment">Physical recount adjustment</option>
                  <option value="Additional harvest ready">Additional harvest ready</option>
                </select>
                <span style={{ fontSize: '0.7rem', color: '#8A7B76', marginTop: '0.25rem', display: 'block' }}>
                  Helps you keep track of stock changes.
                </span>
              </div>
            </div>

            {/* Note Textarea matching Screenshot 215554 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                Note (optional)
              </label>
              <textarea
                rows={3}
                placeholder="Add a short note about this stock change..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Live Status Notice matching Screenshot 215554 */}
            <div 
              style={{
                backgroundColor: '#E8F5EE',
                border: '1px solid #B8E2CB',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                color: '#1B7A43',
                marginBottom: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <CheckCircle size={16} />
              <span><strong>{calculatedNewStock.toLocaleString()} {activeCrop.unit}</strong> will remain available. Your listing will stay live.</span>
            </div>

            {/* Cancel & Save Buttons matching Screenshot 215554 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setAdjustQuantity(0)}
                className="btn btn-outline-warm btn-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveStock}
                className="btn btn-primary"
                style={{ fontWeight: 700 }}
              >
                <CheckCircle size={16} /> Save stock update
              </button>
            </div>
          </div>

          {/* Right Inventory Summary Panel matching Screenshot 215554 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: '#574A46', textTransform: 'uppercase' }}>Current inventory</h4>
                <span className="badge badge-green">&bull; Live</span>
              </div>

              <h3 style={{ fontSize: '1.4rem', color: '#0C3C2C', marginBottom: '0.2rem' }}>{activeCrop.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#8A7B76', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                <MapPin size={12} /> {activeCrop.municipality}, {activeCrop.province}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderBottom: '1px solid #F5EDE2', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>Available stock</span>
                  <strong style={{ fontSize: '1.6rem', color: '#0C3C2C' }}>{currentStock.toLocaleString()}</strong> <span style={{ fontSize: '0.85rem' }}>{activeCrop.unit}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>Selling price</span>
                  <strong style={{ fontSize: '1.6rem', color: '#0C3C2C' }}>₱{activeCrop.pricePerUnit}</strong> <span style={{ fontSize: '0.85rem' }}>/{activeCrop.unit}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8A7B76' }}>Harvested:</span>
                  <strong>{activeCrop.harvestDate}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8A7B76' }}>Available from:</span>
                  <strong>{activeCrop.availableFrom}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8A7B76' }}>Availability:</span>
                  <strong style={{ color: '#0C3C2C' }}>{activeCrop.availabilityStatus}</strong>
                </div>
              </div>
            </div>

            {/* Update Summary Card matching Screenshot 215554 */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1rem', color: '#574A46' }}>Update summary</h4>
                <span style={{ fontSize: '0.75rem', color: '#9B3C1B', fontWeight: 600 }}>{savedSuccess ? 'Saved to listing' : 'Not saved yet'}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8A7B76' }}>Current stock:</span>
                  <strong>{currentStock.toLocaleString()} {activeCrop.unit}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9B3C1B' }}>
                  <span>Stock to {adjustmentMode}:</span>
                  <strong>{adjustmentMode === 'remove' ? `-${adjustQuantity}` : `+${adjustQuantity}`} {activeCrop.unit}</strong>
                </div>
              </div>

              {/* Green Box: NEW AVAILABLE STOCK matching Screenshot 215554 */}
              <div 
                style={{
                  backgroundColor: '#E8F5EE',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  marginBottom: '1rem'
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1B7A43', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                  NEW AVAILABLE STOCK
                </span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0C3C2C', margin: '0.25rem 0' }}>
                  {calculatedNewStock.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 600 }}>{activeCrop.unit}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#574A46' }}>
                  Selling price stays at ₱{activeCrop.pricePerUnit}/{activeCrop.unit}
                </span>
              </div>

              <p style={{ fontSize: '0.75rem', color: '#8A7B76', lineHeight: 1.5 }}>
                Your buyer-facing quantity updates when you save. Harvest and pickup details won&apos;t change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
