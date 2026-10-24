import React, { useState } from 'react';
import { CropListing, Farm } from '../types';
import { CropCard } from '../components/CropCard';
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

  const featuredCrops = cropListings.slice(0, 8);
  const featuredFarms = farms.slice(0, 4);

  const categories = [
    { name: 'Bulb Crops', icon: '🧅', count: '4 harvests', slug: 'Bulb+Crop', desc: 'Red Creole Onions, Native Garlic, Shallots' },
    { name: 'Fruit Vegetables', icon: '🍅', count: '6 harvests', slug: 'Fruit+Vegetable', desc: 'Vine Tomatoes, Long Eggplants, Native Peppers' },
    { name: 'Leafy Vegetables', icon: '🥬', count: '5 harvests', slug: 'Leafy+Vegetable', desc: 'Highland Cabbage, Pechay Baguio, Wombok' },
    { name: 'Root Crops', icon: '🥕', count: '4 harvests', slug: 'Root+Crop', desc: 'Benguet Carrots, Native Ginger, White Potatoes' },
    { name: 'Grains & Corn', icon: '🌽', count: '3 harvests', slug: 'Grains', desc: 'Sweet Yellow Corn, Feed Grains, Field Corn' },
    { name: 'Gourds & Squash', icon: '🥒', count: '4 harvests', slug: 'Gourds', desc: 'Bittergourd (Ampalaya), Green Pipino, Sayote' }
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
      {/* 1. HERO SECTION (Section 4.3) */}
      <section className="hero-banner">
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem'
            }}
          >
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#E2ECE5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0C3C2C', marginBottom: '1.25rem' }}>
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Farmer Identity Reviewed</h3>
              <p>
                Every listing belongs to a documented farmer or registered cooperative. We inspect official registry records and land tenure evidence before granting active seller badges.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FEF3E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D48216', marginBottom: '1.25rem' }}>
                <Scale size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Transparent Unit Pricing</h3>
              <p>
                Clear prices per kilogram, crate, or sack with tiered wholesale discounts. No hidden trading fees or unpredictable brokerage cuts.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FCEBE6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9B3C1B', marginBottom: '1.25rem' }}>
                <Truck size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Coordinated Shared Cargo</h3>
              <p>
                Consolidated freight routes connecting provincial growing centers with urban aggregation points, enabling smaller farms to ship alongside larger cooperatives.
              </p>
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
                  alignItems: 'center'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{cat.icon}</div>
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
            <table className="data-table" style={{ color: '#FFFFFF' }}>
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
                <tr>
                  <td style={{ color: '#FFFFFF', fontWeight: 600 }}>🧅 Red Onions</td>
                  <td style={{ color: '#A0B5AC' }}>Nueva Ecija (San Jose / Cabanatuan)</td>
                  <td style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>₱120.00</td>
                  <td style={{ color: '#FF9E7D', fontWeight: 700 }}>+7.1%</td>
                  <td><span className="badge badge-terracotta">Trending Up</span></td>
                </tr>
                <tr>
                  <td style={{ color: '#FFFFFF', fontWeight: 600 }}>🍅 Cherry Tomatoes</td>
                  <td style={{ color: '#A0B5AC' }}>Laguna (San Pablo Valley)</td>
                  <td style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>₱85.00</td>
                  <td style={{ color: '#A0B5AC' }}>0.0%</td>
                  <td><span className="badge badge-green">Stable</span></td>
                </tr>
                <tr>
                  <td style={{ color: '#FFFFFF', fontWeight: 600 }}>🥬 Highland Cabbage</td>
                  <td style={{ color: '#A0B5AC' }}>Benguet (La Trinidad Trading Post)</td>
                  <td style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>₱60.00</td>
                  <td style={{ color: '#A0B5AC' }}>0.0%</td>
                  <td><span className="badge badge-green">Steady Supply</span></td>
                </tr>
                <tr>
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
            <div style={{ position: 'relative', minHeight: '320px' }}>
              <img 
                src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=800&q=80" 
                alt="Benguet Terraces"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                  <img src={farm.coverImageUrl} alt={farm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '1.1rem', color: '#0C3C2C' }}>{farm.name}</h4>
                    {farm.verificationStatus === 'verified' && (
                      <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                        <CheckCircle size={10} /> Verified
                      </span>
                    )}
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
              <div key={i} className="card" style={{ padding: '1.75rem', position: 'relative' }}>
                <span 
                  style={{
                    fontFamily: 'var(--font-headings)',
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: '#E2ECE5',
                    position: 'absolute',
                    top: '12px',
                    right: '16px'
                  }}
                >
                  {st.step}
                </span>
                <h4 style={{ fontSize: '1.05rem', color: '#0C3C2C', marginBottom: '0.5rem', marginTop: '1rem' }}>{st.title}</h4>
                <p style={{ fontSize: '0.875rem' }}>{st.desc}</p>
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

      {/* 13. BUYER REVIEWS PREVIEW (Section 4.13) */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#F8F2EB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Verified Experience</span>
            <h2>Authentic Wholesale Buyer Feedback</h2>
            <p>Every review on Pananim is tied to a completed, delivered purchase order.</p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.75rem'
            }}
          >
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#D48216', marginBottom: '0.75rem' }}>
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>&ldquo;Superb curing, zero rot in 25kg sack&rdquo;</h4>
              <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                Ordered 25kg for restaurant supply. Every bulb was rock hard, dry neck, clean roots. Delivered in sturdy red mesh sacks within 36 hours from Cabanatuan.
              </p>
              <div style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                <strong>Mateo Rodriguez</strong> &bull; Verified Purchase: Red Onions 25kg
              </div>
            </div>

            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#D48216', marginBottom: '0.75rem' }}>
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>&ldquo;Tight heads, minimal wrapper loss&rdquo;</h4>
              <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                The cabbage from Benguet Highland Growers arrived crisp without bruising. Heavy heads around 1.8 to 2.2 kg each. Great profit margin for wholesale resale.
              </p>
              <div style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                <strong>Teresita Ong</strong> &bull; Verified Purchase: Highland Cabbage 100kg
              </div>
            </div>

            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#D48216', marginBottom: '0.75rem' }}>
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>&ldquo;Exceptional sweetness and high brix&rdquo;</h4>
              <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                Very sweet tomatoes for salad service. Only 3 cracked pieces in entire 10kg crate due to bumpy transit, which is well within normal tolerance.
              </p>
              <div style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                <strong>Chef Carlo Manalo</strong> &bull; Verified Purchase: Cherry Tomatoes 10kg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FARMER RECRUITMENT (Section 4.14) */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div 
            className="card"
            style={{
              padding: '3rem',
              backgroundColor: '#0C3C2C',
              color: '#FFFFFF',
              borderRadius: '24px',
              textAlign: 'center',
              maxWidth: '960px',
              margin: '0 auto'
            }}
          >
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Farmer Onboarding</span>
            <h2 style={{ color: '#FFFFFF', fontSize: '2.4rem', marginBottom: '1rem' }}>
              Bring Your Harvest Directly to Urban Buyers
            </h2>
            <p style={{ color: '#D5E6DE', maxWidth: '680px', margin: '0 auto 2rem auto', fontSize: '1.05rem' }}>
              Stop leaving your margins in the hands of middlemen. Pananim gives Filipino farmers and cooperatives access to verified commercial buyers, organized shared logistics, and prompt payment settlement.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onNavigate('/register/farmer')}
                className="btn btn-accent btn-lg"
              >
                Register as a Farmer / Cooperative
              </button>
              <button 
                onClick={() => onNavigate('/sell-with-pananim')}
                className="btn btn-outline-warm btn-lg"
                style={{ backgroundColor: 'transparent', color: '#FFFFFF', borderColor: '#FFFFFF' }}
              >
                Learn About Verification
              </button>
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
    </div>
  );
};
