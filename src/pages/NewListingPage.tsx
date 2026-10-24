import React, { useState } from 'react';
import { CropListing, CropCategory, Farm } from '../types';
import { 
  Upload, 
  MapPin, 
  CheckCircle, 
  Calendar, 
  Scale, 
  ArrowRight, 
  Image as ImageIcon,
  Eye,
  ShieldCheck,
  Check
} from 'lucide-react';

interface NewListingPageProps {
  farmer: Farm;
  onNavigate: (route: string) => void;
  onAddListing: (listing: CropListing) => void;
}

export const NewListingPage: React.FC<NewListingPageProps> = ({
  farmer,
  onNavigate,
  onAddListing
}) => {
  // Form fields matching Screenshot 215606
  const [cropName, setCropName] = useState('Red Onions');
  const [cropCategory, setCropCategory] = useState<CropCategory>('Bulb Crop');
  const [description, setDescription] = useState(
    'Freshly harvested red onions from our family farm in Nueva Ecija. Firm bulbs, naturally dried and hand-sorted. Ideal for wholesale buyers.'
  );
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80'
  );
  const [availableQuantity, setAvailableQuantity] = useState(1200);
  const [unit, setUnit] = useState<'kg' | 'sack' | 'crate' | 'kaing'>('kg');
  const [pricePerUnit, setPricePerUnit] = useState(120);
  const [province, setProvince] = useState(farmer.province || 'Nueva Ecija');
  const [city, setCity] = useState(farmer.municipality || 'Cabanatuan City');
  const [harvestDate, setHarvestDate] = useState('12 Oct 2026');
  const [availableFrom, setAvailableFrom] = useState('13 Oct 2026');
  const [availability, setAvailability] = useState<'Ready for pickup' | 'Harvest in progress' | 'Upcoming harvest'>('Ready for pickup');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    const newListing: CropListing = {
      id: `crop-${Date.now()}`,
      name: cropName,
      variety: 'Class A Commercial',
      category: cropCategory,
      description,
      imageUrl,
      farmId: farmer.id,
      farmName: farmer.name,
      province,
      municipality: city,
      pricePerUnit,
      unit,
      availableStock: availableQuantity,
      reservedStock: 0,
      minOrderQuantity: 10,
      incrementQuantity: 5,
      isVerifiedFarmer: farmer.verificationStatus === 'verified',
      harvestDate,
      availableFrom,
      availabilityStatus: availability,
      rating: 5.0,
      reviewCount: 0,
      trend: 'Stable',
      priceTiers: [
        { minQuantity: 10, pricePerUnit, label: 'Base Wholesale' },
        { minQuantity: 50, pricePerUnit: Math.round(pricePerUnit * 0.92), label: 'Volume Tier' }
      ],
      batchLotNumber: `LOT-${Math.floor(1000 + Math.random() * 9000)}`,
      grade: 'Class A',
      packaging: 'Ventilated Wholesale Sacks',
      handlingLeadTimeDays: 1,
      cultivationMethod: 'Good Agricultural Practices (GAP)',
      storageGuidance: 'Cool ventilated dry storage.',
      deliveryOptions: ['Farmer Direct Delivery', 'Pananim Shared Cargo', 'Buyer Pickup'],
      estimatedFreightPerUnit: 5.0,
      isFresh: true,
      freshUntilDate: '15 Nov 2026',
      shelfLifeDays: 21,
      shippingLeadTime: 'Ships in 1 day'
    };

    onAddListing(newListing);
    onNavigate('/shop');
  };

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* Overview Dashboard Banner matching Screenshot 215606 */}
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

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('/farmer/inventory/new')}
                className="btn btn-accent"
                style={{ fontWeight: 700 }}
              >
                List New Crop
              </button>
              <button
                onClick={() => onNavigate('/farmer/dashboard')}
                className="btn btn-outline-warm"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: '#FFFFFF' }}
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

      {/* Main Layout Container matching Screenshot 215606 */}
      <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        {/* Breadcrumb matching Screenshot 215606 */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '0.8rem', color: '#8A7B76', marginBottom: '0.35rem' }}>
            <span>Home</span> &gt; <span>My Crops</span> &gt; <strong style={{ color: '#0C3C2C' }}>List New Crop</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.65rem', color: '#0C3C2C', marginBottom: '0.2rem' }}>List New Crop</h2>
              <p style={{ fontSize: '0.9rem' }}>From your farm to the right buyers. Add your crop details to get started.</p>
            </div>
            <span className="badge badge-gray" style={{ textTransform: 'none' }}>
              🔒 Not published yet
            </span>
          </div>
        </div>

        {/* 2-Column Split: Form Cards vs Right Live Preview matching Screenshot 215606 */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem',
            alignItems: 'start'
          }}
        >
          {/* Left Form: 4 Cards matching Screenshot 215606 */}
          <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Card 01: Crop Details matching Screenshot 215606 */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  01
                </span>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0C3C2C' }}>Crop details</h3>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Tell buyers what you&apos;re growing. Fields marked * are required.</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Crop name *
                  </label>
                  <input
                    type="text"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Crop category *
                  </label>
                  <select 
                    value={cropCategory} 
                    onChange={(e) => setCropCategory(e.target.value as CropCategory)}
                  >
                    <option value="Bulb Crop">Bulb crop</option>
                    <option value="Fruit Vegetable">Fruit vegetable</option>
                    <option value="Leafy Vegetable">Leafy vegetable</option>
                    <option value="Root Crop">Root crop</option>
                    <option value="Grains">Grains</option>
                    <option value="Gourds">Gourds</option>
                  </select>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46' }}>Crop description</label>
                  <span style={{ fontSize: '0.7rem', color: '#8A7B76' }}>Optional</span>
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Card 02: Crop Photos matching Screenshot 215606 */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  02
                </span>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0C3C2C' }}>Crop photos</h3>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Show your harvest at its best. Add up to 5 clear, recent photos.</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '120px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1.5px solid #0C3C2C' }}>
                  <img src={imageUrl} alt="Cover preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '4px', left: '4px', backgroundColor: '#0C3C2C', color: '#FFFFFF', fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                    COVER PHOTO
                  </span>
                </div>

                <div 
                  style={{
                    border: '1.5px dashed #DECDBD',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    backgroundColor: '#FAF6F0',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const url = prompt('Enter image URL for this harvest (or keep sample Unsplash produce photo):', imageUrl);
                    if (url) setImageUrl(url);
                  }}
                >
                  <Upload size={24} color="#8A7B76" style={{ margin: '0 auto 0.5rem auto' }} />
                  <strong style={{ fontSize: '0.85rem', color: '#0C3C2C', display: 'block' }}>
                    Click to upload or drag photos here
                  </strong>
                  <span style={{ fontSize: '0.7rem', color: '#8A7B76' }}>
                    JPG or PNG &bull; Up to 10 MB per photo
                  </span>
                </div>
              </div>
            </div>

            {/* Card 03: Quantity & Pricing matching Screenshot 215606 */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  03
                </span>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0C3C2C' }}>Quantity &amp; pricing</h3>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Set your available stock and selling price in Philippine pesos.</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Available quantity *
                  </label>
                  <input
                    type="number"
                    value={availableQuantity}
                    onChange={(e) => setAvailableQuantity(Number(e.target.value))}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Unit *
                  </label>
                  <select value={unit} onChange={(e) => setUnit(e.target.value as any)}>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="sack">50kg Sacks</option>
                    <option value="crate">Plastic Crates</option>
                    <option value="kaing">Wooden Kaing</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Price per unit *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#0C3C2C' }}>₱</span>
                    <input
                      type="number"
                      value={pricePerUnit}
                      onChange={(e) => setPricePerUnit(Number(e.target.value))}
                      style={{ paddingLeft: '1.75rem' }}
                      required
                    />
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                Buyers will see ₱{pricePerUnit} per {unit}. You can update your price and stock anytime.
              </span>
            </div>

            {/* Card 04: Farm location & availability matching Screenshot 215606 */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  04
                </span>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0C3C2C' }}>Farm location &amp; availability</h3>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Help buyers plan where and when to collect your crop.</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Province *
                  </label>
                  <select value={province} onChange={(e) => setProvince(e.target.value)}>
                    <option value="Nueva Ecija">Nueva Ecija</option>
                    <option value="Benguet">Benguet</option>
                    <option value="Laguna">Laguna</option>
                    <option value="Pangasinan">Pangasinan</option>
                    <option value="Isabela">Isabela</option>
                    <option value="Quezon">Quezon</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    City / municipality *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Harvest date *
                  </label>
                  <input
                    type="text"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Available from *
                  </label>
                  <input
                    type="text"
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Availability *
                  </label>
                  <select value={availability} onChange={(e) => setAvailability(e.target.value as any)}>
                    <option value="Ready for pickup">Ready for pickup</option>
                    <option value="Harvest in progress">Harvest in progress</option>
                    <option value="Upcoming harvest">Upcoming harvest</option>
                  </select>
                </div>
              </div>

              <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                Only your city and province appear publicly. Share pickup details directly with your buyer.
              </span>
            </div>

            {/* Bottom Form Actions matching Screenshot 215606 */}
            <div 
              className="card"
              style={{
                padding: '1.25rem 1.5rem',
                backgroundColor: '#FAF6F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0C3C2C', display: 'block' }}>
                  Ready to bring your crop to market?
                </strong>
                <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                  Your listing will be visible to buyers as soon as you publish.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => onNavigate('/farmer/dashboard')}
                  className="btn btn-outline-warm btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => alert('Draft saved successfully to your inventory.')}
                  className="btn btn-secondary btn-sm"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="btn btn-accent"
                  style={{ fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Publish Listing <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </form>

          {/* Right Column: Live Listing Preview & Tips matching Screenshot 215606 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Listing Preview Card matching Screenshot 215606 */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#0C3C2C' }}>Listing preview</h3>
                <Eye size={18} color="#8A7B76" />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block', marginBottom: '1.25rem' }}>
                A first look at what buyers will see.
              </span>

              {/* Exact Buyer Crop Card matching Screenshot 215606 */}
              <div 
                style={{
                  border: '1px solid #DECDBD',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ position: 'relative', height: '180px' }}>
                  <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span 
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(12, 60, 44, 0.95)',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {cropCategory}
                  </span>
                </div>

                <div style={{ padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '1.25rem', color: '#0C3C2C', marginBottom: '0.2rem' }}>{cropName}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#8A7B76', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                    <MapPin size={12} /> {city}, {province}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                    <div style={{ fontFamily: 'var(--font-headings)', fontSize: '1.5rem', fontWeight: 800, color: '#0C3C2C' }}>
                      ₱{pricePerUnit} <span style={{ fontSize: '0.85rem', color: '#8A7B76', fontWeight: 500 }}>/{unit}</span>
                    </div>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                      {availableQuantity.toLocaleString()} {unit} available
                    </span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#574A46', marginBottom: '0.85rem', lineHeight: 1.5 }}>
                    {description.substring(0, 85)}...
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.75rem', color: '#8A7B76', borderTop: '1px solid #F5EDE2', paddingTop: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={12} /> Available from {availableFrom}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle size={12} color="#1B7A43" /> {availability}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid #F5EDE2', paddingTop: '0.75rem' }}>
                    <img src={farmer.avatarUrl} alt={farmer.farmerName} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ fontSize: '0.75rem' }}>
                      <strong style={{ color: '#0C3C2C', display: 'block' }}>{farmer.farmerName}</strong>
                      <span style={{ color: '#8A7B76' }}>Farm Owner</span>
                    </div>
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '0.7rem', color: '#8A7B76', marginTop: '0.75rem', display: 'block', textAlign: 'center' }}>
                Your preview updates as you add details.
              </span>
            </div>

            {/* A Good Listing Grows Trust Card matching Screenshot 215606 */}
            <div 
              className="card"
              style={{
                backgroundColor: '#0C3C2C',
                color: '#FFFFFF',
                padding: '1.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#D48216', marginBottom: '1rem' }}>
                <ShieldCheck size={20} />
                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem' }}>A good listing grows trust</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                <div>
                  <strong style={{ color: '#92DEB9', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Check size={14} /> Show the real harvest
                  </strong>
                  <p style={{ color: '#D5E6DE', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    Use natural light and show the crop&apos;s quality up close.
                  </p>
                </div>

                <div>
                  <strong style={{ color: '#92DEB9', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Check size={14} /> Keep your stock accurate
                  </strong>
                  <p style={{ color: '#D5E6DE', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    List only the quantity you can supply to a buyer.
                  </p>
                </div>

                <div>
                  <strong style={{ color: '#92DEB9', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Check size={14} /> Be clear about availability
                  </strong>
                  <p style={{ color: '#D5E6DE', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    A reliable pickup date helps buyers plan ahead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
