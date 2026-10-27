import React, { useState } from 'react';
import { CropListing, CropCategory, Farm } from '../../types';
import { 
  UploadCloud, 
  MapPin, 
  CheckCircle2, 
  PlusCircle, 
  Eye, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';

interface FarmerNewListingPageProps {
  farmer: Farm;
  onNavigate: (route: string) => void;
  onAddListing: (listing: CropListing) => void;
}

export const FarmerNewListingPage: React.FC<FarmerNewListingPageProps> = ({
  farmer,
  onNavigate,
  onAddListing
}) => {
  const [cropName, setCropName] = useState('Red Onions');
  const [variety, setVariety] = useState('Native Red Bulb Grade A');
  const [cropCategory, setCropCategory] = useState<CropCategory>('Bulb Crop');
  const [description, setDescription] = useState(
    'Freshly harvested organically grown red onions from our family farm in San Rafael, Bulacan. Naturally sun-cured, firm bulbs, ideal for restaurant and wholesale distribution.'
  );
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80'
  );
  const [availableQuantity, setAvailableQuantity] = useState(1500);
  const [pricePerUnit, setPricePerUnit] = useState(125);
  const [harvestDate, setHarvestDate] = useState('28 Oct 2026');
  const [published, setPublished] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    const newListing: CropListing = {
      id: `crop-${Date.now()}`,
      name: cropName,
      variety,
      category: cropCategory,
      description,
      imageUrl,
      farmId: farmer?.id || 'farm-001',
      farmName: farmer?.name || farmer?.farmerName || 'Santos Organic Farms',
      province: farmer?.province || 'Bulacan',
      municipality: farmer?.municipality || 'San Rafael',
      pricePerUnit,
      unit: 'kg',
      availableStock: availableQuantity,
      reservedStock: 0,
      minOrderQuantity: 20,
      incrementQuantity: 10,
      isVerifiedFarmer: true,
      harvestDate,
      availableFrom: '29 Oct 2026',
      availabilityStatus: 'Ready for pickup',
      rating: 5.0,
      reviewCount: 0,
      trend: 'Trending Up',
      priceTiers: [
        { minQuantity: 20, pricePerUnit, label: 'Base Wholesale' },
        { minQuantity: 100, pricePerUnit: Math.round(pricePerUnit * 0.92), label: 'Bulk Tier' }
      ],
      batchLotNumber: `LOT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      grade: 'Class A',
      packaging: 'Ventilated Red Mesh Wholesale Sacks',
      handlingLeadTimeDays: 1,
      cultivationMethod: 'Good Agricultural Practices (GAP)',
      storageGuidance: 'Keep in dry, well-ventilated storage away from direct sunlight.',
      deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup'],
      estimatedFreightPerUnit: 15,
      isFresh: true,
      freshUntilDate: '15 Nov 2026',
      shelfLifeDays: 28,
      shippingLeadTime: '1-2 days'
    };

    onAddListing(newListing);
    setPublished(true);
  };

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5E6E64' }}>
          <span onClick={() => onNavigate('/farmer/dashboard')} style={{ cursor: 'pointer', color: '#0C3C2C', fontWeight: 600 }}>Overview</span>
          <span>&rsaquo;</span>
          <span onClick={() => onNavigate('/farmer/inventory')} style={{ cursor: 'pointer', color: '#0C3C2C', fontWeight: 600 }}>My Crops</span>
          <span>&rsaquo;</span>
          <span style={{ color: '#1D2D24', fontWeight: 600 }}>List New Harvest</span>
        </div>
        <button
          onClick={() => onNavigate('/farmer/inventory')}
          style={{ background: 'none', border: 'none', color: '#0C3C2C', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          &larr; Back to My Crops
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.4rem', color: '#0C3C2C', margin: '0 0 0.35rem 0', fontWeight: 800 }}>
          List New Harvest
        </h1>
        <p style={{ color: '#5E6E64', maxWidth: '650px', margin: 0 }}>
          Publish your upcoming or fresh crop harvest directly to verified institutional and restaurant buyers across Luzon.
        </p>
      </div>

      {published ? (
        /* Matches Published crop listing.png */
        <div className="farmer-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <CheckCircle2 size={56} color="#1B7A43" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>
            Listing Successfully Published!
          </h2>
          <p style={{ color: '#5E6E64', maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
            <strong>{cropName}</strong> ({availableQuantity.toLocaleString()} kg at ₱{pricePerUnit}/kg) is now live in marketplace search results for wholesale buyers.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              onClick={() => onNavigate('/farmer/inventory')}
              className="farmer-btn-forest"
            >
              View in My Crops
            </button>
            <button
              onClick={() => setPublished(false)}
              className="farmer-btn-primary"
            >
              List Another Crop
            </button>
          </div>
        </div>
      ) : (
        /* Matches List New Crop.png */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {/* Form */}
          <div className="farmer-card" style={{ padding: '2rem' }}>
            <h3 className="farmer-card-title" style={{ marginBottom: '1.5rem' }}>
              <PlusCircle size={20} color="#D48216" /> Crop &amp; Harvest Specifications
            </h3>

            <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Crop Commodity Name *
                </label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                    Category *
                  </label>
                  <select
                    value={cropCategory}
                    onChange={(e) => setCropCategory(e.target.value as any)}
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
                    <option value="Bulb Crop">Bulb Crop (Sibuyas)</option>
                    <option value="Fruit Vegetable">Fruit Vegetable (Kamatis, etc.)</option>
                    <option value="Root Crop">Root Crop (Kamote, etc.)</option>
                    <option value="Leafy Green">Leafy Green (Pechay, etc.)</option>
                    <option value="Legume">Legume (Sitaw, etc.)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                    Variety / Cultivar
                  </label>
                  <input
                    type="text"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
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
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                    Available Harvest Quantity (kg) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={availableQuantity}
                    onChange={(e) => setAvailableQuantity(parseInt(e.target.value) || 0)}
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                    Base Wholesale Price (₱ / kg) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(parseInt(e.target.value) || 0)}
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
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Harvest Date &amp; Availability
                </label>
                <input
                  type="text"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
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

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Harvest Photo URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
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

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Description &amp; Post-Harvest Quality Notes
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  className="farmer-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                >
                  <PlusCircle size={18} /> Publish Crop to Marketplace
                </button>
              </div>
            </form>
          </div>

          {/* Right Live Preview Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="farmer-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="farmer-card-title" style={{ margin: 0 }}>
                  <Eye size={18} color="#0C3C2C" /> Live Buyer Preview
                </h3>
                <span className="farmer-badge green">● Preview</span>
              </div>

              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #EBE4DA', backgroundColor: '#FAF7F2' }}>
                <img
                  src={imageUrl}
                  alt={cropName}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1.25rem' }}>
                  <span className="farmer-badge gray" style={{ marginBottom: '6px' }}>{cropCategory}</span>
                  <h4 style={{ margin: '0 0 6px', fontSize: '1.2rem', color: '#0C3C2C' }}>{cropName}</h4>
                  <div style={{ fontSize: '0.8rem', color: '#5E6E64', marginBottom: '12px' }}>
                    {variety} · {farmer?.name || farmer?.farmerName || 'Santos Organic Farms'}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid #EBE4DA', paddingTop: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#8A7B76', textTransform: 'uppercase' }}>Wholesale Price</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0C3C2C' }}>₱{pricePerUnit}/kg</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: '#8A7B76', textTransform: 'uppercase' }}>Total Stock</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1B7A43' }}>{availableQuantity.toLocaleString()} kg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
