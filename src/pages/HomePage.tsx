import React, { useState } from 'react';
import { CropListing, Farm } from '../types';
import { CropCard } from '../components/CropCard';
import { mockReviews } from '../data/mockData';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Scale, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Calendar, 
  ChevronRight,
  HelpCircle,
  Plus,
  Star,
  Users,
  Store,
  Layers,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  cropListings: CropListing[];
  farms: Farm[];
  onNavigate: (route: string) => void;
  onAddToCart: (crop: CropListing, quantity: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  cropListings,
  farms,
  onNavigate,
  onAddToCart
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const heroPhoto = '/images/hero-farmer-sunlit.png';
  const [selectedReviewPhoto, setSelectedReviewPhoto] = useState<string | null>(null);

  const featuredCrops = cropListings.slice(0, 8);
  const featuredFarms = farms.slice(0, 4);

  const categories = [
    { 
      name: 'Bulb Crops', 
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=400&q=80',
      count: '4 harvests', 
      slug: 'Bulb+Crop', 
      desc: 'Red Creole Onions, Native Garlic, Shallots' 
    },
    { 
      name: 'Fruit Vegetables', 
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
      count: '6 harvests', 
      slug: 'Fruit+Vegetable', 
      desc: 'Vine Tomatoes, Long Eggplants, Native Peppers' 
    },
    { 
      name: 'Leafy Vegetables', 
      image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=400&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
      count: '5 harvests', 
      slug: 'Leafy+Vegetable', 
      desc: 'Highland Cabbage, Pechay Baguio, Wombok' 
    },
    { 
      name: 'Root Crops', 
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=400&q=80',
      count: '4 harvests', 
      slug: 'Root+Crop', 
      desc: 'Benguet Carrots, Native Ginger, White Potatoes' 
    },
    { 
      name: 'Grains & Corn', 
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=400&q=80',
      count: '3 harvests', 
      slug: 'Grains', 
      desc: 'Sweet Yellow Corn, Feed Grains, Field Corn' 
    },
    { 
      name: 'Gourds & Squash', 
      image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=400&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1590165482129-1b8b27698980?auto=format&fit=crop&w=400&q=80',
      count: '4 harvests', 
      slug: 'Gourds', 
      desc: 'Bittergourd (Ampalaya), Green Pipino, Sayote' 
    }
  ];

  const faqs = [
    {
      q: 'What is the Minimum Order Quantity (MOQ) on Pananim?',
      a: 'Pananim is primarily a wholesale and commercial crop marketplace. Each farmer or cooperative sets specific minimum order quantities (typically 5kg to 50kg depending on packing units like crates or sacks) to ensure viable transport consolidation. Exact MOQs and quantity increments are clearly listed on every product page.'
    },
    {
      q: 'How does Pananim verify farmers and agricultural cooperatives?',
      a: 'Farmers and cooperatives undergo verification through our multi-step platform review. We cross-reference government agricultural registries (such as the DA RSBSA register or CDA cooperative registration), examine land or tenancy documentation, and inspect recent farm harvest photos. Once reviewed, listings display the "Farmer Identity Reviewed" badge.'
    },
    {
      q: 'How are delivery fees calculated and can orders be combined?',
      a: 'Because crops come directly from separate regional farms, purchases from multiple farmers generate separate seller shipments with distinct freight estimates. We support Pananim Shared Cargo to consolidate shipments along major transport arteries (e.g. Benguet to Metro Manila), helping reduce per-kilogram logistics costs.'
    },
    {
      q: 'What happens if delivered produce is damaged or arrives underweight?',
      a: 'Buyers inspect deliveries upon arrival. For transit shortages or spoiled produce, buyers have a protected reporting window to submit photos and weight scale receipts directly through the order dashboard. Approved claims are refunded or credited via our verified dispute resolution workflow.'
    },
    {
      q: 'Are the market prices shown on Pananim the actual seller prices?',
      a: 'No. The Market Prices section provides regional wholesale reference benchmarks compiled from major trading posts (e.g. La Trinidad Trading Post, Divisoria bulk benchmarks). Individual farmers set their own asking prices based on current harvest quality, packaging, and sorting grades.'
    }
  ];

  return (
    <div>
      {/* 1. HERO SECTION (Section 4.3) with Attached Banner Picture */}
      <section 
        className="hero-banner"
        style={{
          backgroundImage: `url(${heroPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow" style={{ marginBottom: '0.75rem' }}>
              <Sparkles size={16} /> ONE NETWORK, SHARED GROWTH
            </div>
            <h1 className="hero-title">
              Fresh Harvests.<br />Direct Connections.
            </h1>
            <p className="hero-subtitle">
              Sourcing wholesale crops directly from Philippine farmers and agricultural cooperatives. Transparent pricing, inspected growers, and reliable regional cargo coordination.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('/shop')}
                className="btn btn-accent btn-lg"
              >
                Browse Available Crops <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate('/sell-with-pananim')}
                className="btn btn-outline-warm btn-lg"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', borderColor: '#FFFFFF' }}
              >
                Sell Your Harvest
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING QUICK SEARCH CARD */}
      <div className="container">
        <div className="search-filter-card">
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>
                Search Crops or Varieties
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#8A7B76' }} />
                <input
                  type="text"
                  placeholder="e.g. Red Onions, Cabbage..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>
                Farming Region
              </label>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="All Locations">All Farming Regions</option>
                <option value="Nueva Ecija">Nueva Ecija (Central Luzon)</option>
                <option value="Benguet">Benguet (Highlands)</option>
                <option value="Laguna">Laguna (CALABARZON)</option>
                <option value="Pangasinan">Pangasinan (Ilocos)</option>
                <option value="Isabela">Isabela (Cagayan Valley)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>
                Delivery Destination
              </label>
              <select defaultValue="Metro Manila">
                <option value="Metro Manila">Metro Manila (NCR)</option>
                <option value="Bulacan">Bulacan</option>
                <option value="Cavite">Cavite</option>
                <option value="Laguna">Laguna Hubs</option>
                <option value="Rizal">Rizal</option>
              </select>
            </div>

            <div style={{ alignSelf: 'flex-end' }}>
              <button
                onClick={() => onNavigate(`/shop?q=${encodeURIComponent(searchQuery)}`)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                <Search size={16} /> Find Harvests
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TRUST EXPLANATION (Section 4.4) */}
      <section style={{ padding: '4.5rem 0 3rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-green" style={{ marginBottom: '0.75rem' }}>Direct Wholesale Integrity</span>
            <h2>Grounded in Real Agricultural Logistics</h2>
            <p style={{ marginTop: '0.75rem' }}>
              We eliminate unnecessary middlemen markups while preserving the operational structure necessary for safe wholesale transactions.
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {/* Card 1: Farmer Identity Reviewed */}
            <div 
              className="card card-hover" 
              style={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid #EADBCE',
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 4px 14px rgba(12, 60, 44, 0.06)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ height: '185px', width: '100%', overflow: 'hidden', backgroundColor: '#E2ECE5', position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80"
                  alt="Farmer Identity Reviewed"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', color: '#0C3C2C', fontWeight: 800 }}>
                  Farmer Identity Reviewed
                </h3>
                <p style={{ color: '#5C4E4B', fontSize: '0.925rem', lineHeight: '1.6', margin: 0 }}>
                  Every listing belongs to a documented farmer or registered cooperative. We inspect official registry records and land tenure evidence before granting active seller badges.
                </p>
              </div>
            </div>

            {/* Card 2: Transparent Unit Pricing */}
            <div 
              className="card card-hover" 
              style={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid #EADBCE',
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 4px 14px rgba(12, 60, 44, 0.06)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ height: '185px', width: '100%', overflow: 'hidden', backgroundColor: '#FEF3E2', position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80"
                  alt="Transparent Unit Pricing"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', color: '#0C3C2C', fontWeight: 800 }}>
                  Transparent Unit Pricing
                </h3>
                <p style={{ color: '#5C4E4B', fontSize: '0.925rem', lineHeight: '1.6', margin: 0 }}>
                  Clear prices per kilogram, crate, or sack with tiered wholesale discounts. No hidden trading fees or unpredictable brokerage cuts.
                </p>
              </div>
            </div>

            {/* Card 3: Coordinated Shared Cargo */}
            <div 
              className="card card-hover" 
              style={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid #EADBCE',
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 4px 14px rgba(12, 60, 44, 0.06)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ height: '185px', width: '100%', overflow: 'hidden', backgroundColor: '#FCEBE6', position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80"
                  alt="Coordinated Shared Cargo"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', color: '#0C3C2C', fontWeight: 800 }}>
                  Coordinated Shared Cargo
                </h3>
                <p style={{ color: '#5C4E4B', fontSize: '0.925rem', lineHeight: '1.6', margin: 0 }}>
                  Consolidated freight routes connecting provincial growing centers with urban aggregation points, enabling smaller farms to ship alongside larger cooperatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CROP CATEGORIES (Section 4.5) */}
      <section style={{ padding: '3rem 0', backgroundColor: '#F8F2EB' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Produce Classifications</span>
              <h2>Browse by Crop Category</h2>
              <p>Direct wholesale catalogs sorted by agricultural classification and harvest characteristics.</p>
            </div>
            <button 
              onClick={() => onNavigate('/shop')}
              className="btn btn-secondary btn-sm"
            >
              View Full Catalog &rarr;
            </button>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(`/shop?category=${cat.slug}`)}
                className="card card-hover"
                style={{
                  padding: '1.5rem 1.25rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Real Produce Photography Badge instead of emoji */}
                <div 
                  style={{ 
                    width: '76px', 
                    height: '76px', 
                    borderRadius: '50%', 
                    overflow: 'hidden', 
                    marginBottom: '0.85rem',
                    border: '3px solid #E2ECE5',
                    boxShadow: '0 4px 12px rgba(12, 60, 44, 0.1)',
                    backgroundColor: '#F5EDE2',
                    flexShrink: 0
                  }}
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = cat.fallbackImage;
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h4 style={{ fontSize: '1rem', color: '#0C3C2C', marginBottom: '0.25rem' }}>{cat.name}</h4>
                <span style={{ fontSize: '0.75rem', color: '#8A7B76', fontWeight: 600 }}>{cat.count}</span>
                <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#574A46' }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AVAILABLE HARVESTS (Section 4.6 & matching Screenshot 215453) */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Current Supply</span>
              <h2>Available Harvests Ready for Sourcing</h2>
              <p>Inspected crop batches currently available for wholesale dispatch or scheduled pickup.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => onNavigate('/shop')} className="btn btn-primary btn-sm">
                Shop All 18+ Crops
              </button>
            </div>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {featuredCrops.map((crop) => (
              <CropCard
                key={crop.id}
                crop={crop}
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
                onBuyNow={(c, qty) => {
                  onAddToCart(c, qty);
                  onNavigate('/cart');
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. REGIONAL PRICE PREVIEW (Section 4.7 & Screenshot 215507) */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#07271C', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge" style={{ backgroundColor: '#D48216', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Wholesale Transparency
              </span>
              <h2 style={{ color: '#FFFFFF' }}>Regional Wholesale Benchmark Reference</h2>
              <p style={{ color: '#A0B5AC' }}>
                Sample benchmark indicators compiled from trading posts. Not asking seller prices.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('/market-prices')}
              className="btn btn-outline-warm btn-sm"
              style={{ backgroundColor: 'transparent', color: '#FFFFFF', borderColor: '#2B785E' }}
            >
              Full Price Tracker &rarr;
            </button>
          </div>

          <div className="data-table-container" style={{ backgroundColor: '#0C3C2C', borderColor: '#1D4B39' }}>
            <table className="data-table data-table-dark" style={{ color: '#FFFFFF' }}>
              <thead>
                <tr style={{ backgroundColor: '#092F22' }}>
                  <th style={{ backgroundColor: '#092F22', color: '#D5E6DE' }}>Crop Item</th>
                  <th style={{ backgroundColor: '#092F22', color: '#D5E6DE' }}>Benchmark Region</th>
                  <th style={{ backgroundColor: '#092F22', color: '#D5E6DE' }}>Reference (₱/kg)</th>
                  <th style={{ backgroundColor: '#092F22', color: '#D5E6DE' }}>7-Day Shift</th>
                  <th style={{ backgroundColor: '#092F22', color: '#D5E6DE' }}>Trend Indicator</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  style={{ transition: 'background-color 0.18s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#13533E'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <td style={{ color: '#FFFFFF', fontWeight: 600 }}>🧅 Red Onions</td>
                  <td style={{ color: '#A0B5AC' }}>Nueva Ecija (San Jose / Cabanatuan)</td>
                  <td style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>₱120.00</td>
                  <td style={{ color: '#FF9E7D', fontWeight: 700 }}>+7.1%</td>
                  <td><span className="badge badge-terracotta">Trending Up</span></td>
                </tr>
                <tr 
                  style={{ transition: 'background-color 0.18s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#13533E'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <td style={{ color: '#FFFFFF', fontWeight: 600 }}>🍅 Cherry Tomatoes</td>
                  <td style={{ color: '#A0B5AC' }}>Laguna (San Pablo Valley)</td>
                  <td style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>₱85.00</td>
                  <td style={{ color: '#A0B5AC' }}>0.0%</td>
                  <td><span className="badge badge-green">Stable</span></td>
                </tr>
                <tr 
                  style={{ transition: 'background-color 0.18s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#13533E'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <td style={{ color: '#FFFFFF', fontWeight: 600 }}>🥬 Highland Cabbage</td>
                  <td style={{ color: '#A0B5AC' }}>Benguet (La Trinidad Trading Post)</td>
                  <td style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>₱60.00</td>
                  <td style={{ color: '#A0B5AC' }}>0.0%</td>
                  <td><span className="badge badge-green">Steady Supply</span></td>
                </tr>
                <tr 
                  style={{ transition: 'background-color 0.18s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#13533E'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <td style={{ color: '#FFFFFF', fontWeight: 600 }}>🌽 Sweet Yellow Corn</td>
                  <td style={{ color: '#A0B5AC' }}>Isabela (Cauayan Hub)</td>
                  <td style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>₱45.00</td>
                  <td style={{ color: '#92DEB9', fontWeight: 700 }}>-6.3%</td>
                  <td><span className="badge badge-gold">Bargain Entry</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. SEASONAL HARVEST SPOTLIGHT (Section 4.8) */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div 
            className="card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              borderColor: '#DECDBD'
            }}
          >
            <div style={{ position: 'relative', minHeight: '340px' }}>
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80" 
                alt="Benguet Highland Terraces Harvest"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80';
                }}
                style={{ width: '100%', height: '100%', minHeight: '340px', objectFit: 'cover' }}
              />
              <span 
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  backgroundColor: '#0C3C2C',
                  color: '#FFFFFF',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}
              >
                Seasonal Highland Peak
              </span>
            </div>

            <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="badge badge-green" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
                Cold Chain Consolidation
              </span>
              <h2 style={{ marginBottom: '1rem' }}>Benguet Highland Harvest Season</h2>
              <p style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Crisp Scorpio F1 Cabbage, Wombok, and washed Terracotta Carrots are currently entering high yield from our 42-smallholder member cooperative in La Trinidad. Direct daily departure routes to Balintawak and Divisoria ensure zero cold-chain degradation.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => onNavigate('/farmers/farm-002')}
                  className="btn btn-primary"
                >
                  Meet Benguet Growers Coop &rarr;
                </button>
                <button 
                  onClick={() => onNavigate('/shop?category=Leafy+Vegetable')}
                  className="btn btn-secondary"
                >
                  View Highland Crops
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. MEET THE FARMERS (Section 4.9) */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#F8F2EB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>The Growers</span>
            <h2>Connecting You with Inspected Producers</h2>
            <p>Know who grows your crops. Direct communication and transparent farm origins.</p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {featuredFarms.map((farm) => (
              <div key={farm.id} className="card card-hover" style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '140px', position: 'relative' }}>
                  <img 
                    src={farm.coverImageUrl} 
                    alt={farm.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  {farm.verificationStatus === 'verified' && (
                    <span 
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        zIndex: 2,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        color: '#0C3C2C',
                        border: '1px solid #A3D9BD',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <CheckCircle size={12} color="#166534" />
                      VERIFIED
                    </span>
                  )}
                  <img 
                    src={farm.avatarUrl} 
                    alt={farm.farmerName} 
                    style={{
                      position: 'absolute',
                      bottom: '-24px',
                      left: '20px',
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      border: '3px solid #FFFFFF',
                      objectFit: 'cover',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  />
                </div>

                <div style={{ padding: '2rem 1.25rem 1.25rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '1.1rem', color: '#0C3C2C' }}>{farm.name}</h4>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#8A7B76', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={12} /> {farm.municipality}, {farm.province}
                  </div>
                  <p style={{ fontSize: '0.85rem', marginBottom: '1rem', flex: 1 }}>
                    {farm.story.substring(0, 115)}...
                  </p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {farm.primaryCrops.map((c, i) => (
                      <span key={i} style={{ fontSize: '0.7rem', backgroundColor: '#F8F2EB', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#574A46' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => onNavigate(`/farmers/${farm.id}`)}
                    className="btn btn-outline-warm btn-sm"
                    style={{ width: '100%' }}
                  >
                    Visit Farm Storefront &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. HOW ORDERING WORKS (Section 4.10) */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Order Pipeline</span>
            <h2>How Pananim Wholesale Operates</h2>
            <p>From provincial harvest coordination to confirmed receipt sign-off.</p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {[
              { step: '01', title: 'Choose Harvests & MOQs', desc: 'Browse available lots, check harvest dates, and select quantities adhering to tier increments.' },
              { step: '02', title: 'Fulfillment & Logistics', desc: 'Choose direct delivery, collection pickup, or opt into shared cargo consolidation.' },
              { step: '03', title: 'Secure Payment Escrow', desc: 'Settle via GCash, Maya, Card, or corporate bank transfer into payment holding.' },
              { step: '04', title: 'Manual Dispatch Updates', desc: 'Follow timestamped packing and dispatch notes directly updated by farmers and drivers.' },
              { step: '05', title: 'Intake Sign-off & Review', desc: 'Inspect scales and produce upon arrival, release settlement, and leave verified feedback.' }
            ].map((st, i) => (
              <div 
                key={i} 
                className="card" 
                style={{ 
                  padding: '1.75rem', 
                  position: 'relative', 
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #EADECF'
                }}
              >
                {/* Number Watermark placed BEHIND the words (zIndex: 0) */}
                <span 
                  style={{
                    fontFamily: 'var(--font-headings)',
                    fontSize: '4.8rem',
                    fontWeight: 900,
                    color: '#2B785E',
                    opacity: 0.13,
                    position: 'absolute',
                    top: '-10px',
                    right: '6px',
                    lineHeight: 1,
                    zIndex: 0,
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                  aria-hidden="true"
                >
                  {st.step}
                </span>

                {/* Words placed in FRONT of the number (zIndex: 1) for crystal-clear readability */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D48216', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
                    Step {st.step}
                  </span>
                  <h4 style={{ fontSize: '1.1rem', color: '#0C3C2C', marginBottom: '0.65rem', fontWeight: 700, lineHeight: 1.35 }}>
                    {st.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#574A46', lineHeight: 1.6, margin: 0 }}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. BULK PURCHASING & QUOTATIONS (Section 4.11) */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#0C3C2C', color: '#FFFFFF' }}>
        <div className="container">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>Commercial Accounts</span>
              <h2 style={{ color: '#FFFFFF', marginBottom: '1rem' }}>Bulk Supply for Supermarkets, Retailers &amp; Kitchens</h2>
              <p style={{ color: '#D5E6DE', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Need full truckloads or recurring weekly deliveries of 200kg to 5 tons? Our bulk quotation tool lets commercial buyers negotiate directly with verified cooperatives without surprise commissions.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E2ECE5' }}>
                  <CheckCircle size={16} color="#D48216" /> Contract quantity pricing locked prior to planting or harvest
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E2ECE5' }}>
                  <CheckCircle size={16} color="#D48216" /> Multi-farm consolidated billing invoices
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E2ECE5' }}>
                  <CheckCircle size={16} color="#D48216" /> Temperature-controlled freight coordination
                </li>
              </ul>
              <button 
                onClick={() => onNavigate('/buyer/quotes')}
                className="btn btn-accent btn-lg"
              >
                Request Commercial Bulk Quote &rarr;
              </button>
            </div>

            <div 
              className="card"
              style={{
                backgroundColor: '#07271C',
                borderColor: '#1D4B39',
                padding: '2rem',
                color: '#FFFFFF'
              }}
            >
              <h4 style={{ color: '#D48216', marginBottom: '1rem' }}>Instant Wholesale Calculation</h4>
              <p style={{ fontSize: '0.85rem', color: '#A0B5AC', marginBottom: '1.5rem' }}>
                Illustrative 2-Farmer Order calculation matching Section 9 specification:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #16533F', paddingBottom: '0.5rem' }}>
                  <span>10kg Native Tomatoes (₱55/kg volume tier)</span>
                  <strong>₱550.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #16533F', paddingBottom: '0.5rem' }}>
                  <span>Santos Agri-Farms Freight (Nueva Ecija)</span>
                  <strong>₱120.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #16533F', paddingBottom: '0.5rem' }}>
                  <span>5kg Highland Cabbage (₱40/kg base)</span>
                  <strong>₱200.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #16533F', paddingBottom: '0.5rem' }}>
                  <span>Benguet Coop Freight (La Trinidad)</span>
                  <strong>₱80.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', color: '#92DEB9', fontSize: '1.15rem' }}>
                  <span>Worked Total Payable</span>
                  <strong style={{ color: '#FFFFFF' }}>₱950.00</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. BUYER REVIEWS PREVIEW (Section 4.13) with Produce & Arrival Photos */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#F8F2EB' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>
                <ShieldCheck size={12} /> Verified Purchase Evidence
              </span>
              <h2>Authentic Wholesale Buyer Feedback</h2>
              <p>Every review on Pananim is tied to a completed order with verified intake scale receipts and arrival photos.</p>
            </div>
            <button
              onClick={() => onNavigate('/buyer/reviews')}
              className="btn btn-secondary btn-sm"
            >
              View All Verified Reviews &rarr;
            </button>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {mockReviews.map((rev) => (
              <div 
                key={rev.id} 
                className="card card-hover" 
                style={{ 
                  padding: '1.75rem', 
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #EADECF'
                }}
              >
                {/* Header with Buyer Info, Verified Badge on top right, and Stars placed below the date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                  <div style={{ flex: 1, paddingRight: '0.75rem' }}>
                    <strong style={{ color: '#0C3C2C', fontSize: '1.05rem', display: 'block', marginBottom: '0.2rem', lineHeight: 1.3 }}>
                      {rev.buyerName}
                    </strong>
                    <span style={{ fontSize: '0.775rem', color: '#8A7B76', display: 'block' }}>
                      {rev.cropName} &bull; {rev.date}
                    </span>
                    {/* Stars placed below the date */}
                    <div style={{ display: 'flex', color: '#D48216', marginTop: '0.35rem', gap: '3px' }}>
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={15} fill="#D48216" />
                      ))}
                    </div>
                  </div>

                  {/* Verified badge replaced on the stars position (top right) */}
                  <span 
                    className="badge badge-green" 
                    style={{ 
                      fontSize: '0.7rem', 
                      padding: '0.25rem 0.6rem', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.3rem',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                  >
                    <CheckCircle size={11} /> Verified
                  </span>
                </div>

                {/* Review Title & Comment */}
                <h4 style={{ fontSize: '1.05rem', color: '#0C3C2C', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                  &ldquo;{rev.title}&rdquo;
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#574A46', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>
                  {rev.comment}
                </p>

                {/* Attached Inspection Photos (At least 2 per review) */}
                {rev.images && rev.images.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                      📸 Arrival Photos ({rev.images.length}):
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {rev.images.map((img, i) => (
                        <div 
                          key={i}
                          style={{
                            width: '84px',
                            height: '84px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1.5px solid #DECDBD',
                            cursor: 'pointer',
                            position: 'relative'
                          }}
                          onClick={() => setSelectedReviewPhoto(img)}
                          title="Click to view full photo"
                        >
                          <img 
                            src={img} 
                            alt={`Review photo ${i + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          <span 
                            style={{
                              position: 'absolute',
                              bottom: '3px',
                              right: '3px',
                              backgroundColor: 'rgba(12,60,44,0.85)',
                              color: '#fff',
                              fontSize: '0.575rem',
                              padding: '1px 4px',
                              borderRadius: '3px',
                              fontWeight: 700
                            }}
                          >
                            #{i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Farmer Reply Snippet */}
                {rev.farmerReply && (
                  <div style={{ backgroundColor: '#FAF6F0', borderRadius: '6px', padding: '0.65rem 0.85rem', borderLeft: '3px solid #0C3C2C', fontSize: '0.775rem', color: '#574A46' }}>
                    <strong style={{ color: '#0C3C2C', display: 'block', marginBottom: '0.15rem' }}>
                      🌾 {rev.farmerReply.farmerName}:
                    </strong>
                    &ldquo;{rev.farmerReply.message}&rdquo;
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FARMER RECRUITMENT (Section 4.14) */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div 
            className="card"
            style={{
              padding: '4.5rem 2.5rem',
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              textAlign: 'center',
              maxWidth: '960px',
              margin: '0 auto',
              backgroundColor: '#0C3C2C',
              boxShadow: '0 20px 45px rgba(12, 60, 44, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Authentic Picture of Farmer in the field */}
            <img 
              src="/images/hero-farmer-basket.png" 
              alt="Filipino Farmer" 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 35%',
                zIndex: 0
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1400&q=80';
              }}
            />
            {/* Balanced Dark Green Overlay so farmer is clearly seen while text is 100% readable */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(12, 60, 44, 0.65) 0%, rgba(7, 39, 28, 0.75) 100%)',
                zIndex: 1
              }}
            />

            {/* Content in front */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Farmer Onboarding</span>
              <h2 style={{ color: '#FFFFFF', fontSize: '2.4rem', marginBottom: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
                Bring Your Harvest Directly to Urban Buyers
              </h2>
              <p style={{ color: '#F5EDE2', maxWidth: '680px', margin: '0 auto 2rem auto', fontSize: '1.05rem', lineHeight: 1.7, textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
                Stop leaving your margins in the hands of middlemen. Pananim gives Filipino farmers and cooperatives access to verified commercial buyers, organized shared logistics, and prompt payment settlement.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => onNavigate('/register/farmer')}
                  className="btn btn-accent btn-lg"
                  style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}
                >
                  Register as a Farmer / Cooperative
                </button>
                <button 
                  onClick={() => onNavigate('/sell-with-pananim')}
                  className="btn btn-outline-warm btn-lg"
                  style={{ backgroundColor: 'rgba(12, 60, 44, 0.45)', color: '#FFFFFF', borderColor: '#FFFFFF', backdropFilter: 'blur(4px)' }}
                >
                  Learn About Verification
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. FAQ SECTION (Section 4.15) */}
      <section style={{ padding: '3.5rem 0 5rem 0', backgroundColor: '#F8F2EB' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Common Inquiries</span>
            <h2>Frequently Asked Questions</h2>
            <p>Clear, direct answers regarding wholesale minimums, verification, and deliveries.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="card"
                style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', cursor: 'pointer' }}
                onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1.05rem', color: '#0C3C2C' }}>{faq.q}</h4>
                  <ChevronRight 
                    size={18} 
                    style={{ 
                      transform: faqOpenIndex === idx ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: '#D48216',
                      flexShrink: 0
                    }} 
                  />
                </div>
                {faqOpenIndex === idx && (
                  <p style={{ marginTop: '0.75rem', fontSize: '0.925rem', color: '#574A46', lineHeight: 1.6, borderTop: '1px solid #F5EDE2', paddingTop: '0.75rem' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Lightbox for review photos */}
      {selectedReviewPhoto && (
        <div 
          className="modal-overlay" 
          onClick={() => setSelectedReviewPhoto(null)}
          style={{ zIndex: 10000 }}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '680px', padding: '1.5rem', backgroundColor: '#FFFFFF', textAlign: 'center' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <strong style={{ color: '#0C3C2C' }}>Verified Purchase Produce Photo</strong>
              <button onClick={() => setSelectedReviewPhoto(null)} className="btn btn-outline-warm btn-sm">
                Close ✕
              </button>
            </div>
            <img 
              src={selectedReviewPhoto} 
              alt="Full review photo" 
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
