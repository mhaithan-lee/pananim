import React, { useState } from 'react';
import { MarketPriceRecord } from '../types';
import { 
  Search, 
  Info, 
  TrendingUp, 
  Calendar, 
  ArrowRight, 
  HelpCircle,
  Layers,
  MapPin,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface MarketPricesPageProps {
  priceRecords: MarketPriceRecord[];
  onNavigate: (route: string) => void;
}

export const MarketPricesPage: React.FC<MarketPricesPageProps> = ({
  priceRecords,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [chartView, setChartView] = useState<'7days' | '30days'>('7days');

  const filteredRecords = priceRecords.filter((rec) => {
    const matchesSearch = rec.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || rec.category === selectedCategory;
    const matchesReg = selectedRegion === 'All' || rec.region.includes(selectedRegion) || rec.province.includes(selectedRegion);
    return matchesSearch && matchesCat && matchesReg;
  });

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero Banner matching Screenshot 215507 */}
      <section className="hero-banner" style={{ padding: '3.5rem 0 4.5rem 0' }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              REGIONAL MARKET INTELLIGENCE
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.8rem', marginBottom: '0.75rem' }}>
              Market Prices
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.05rem', marginBottom: 0 }}>
              Know the price. Understand the trend. Compare crop price references before your next farm-to-market conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        {/* Illustrative Disclaimer Alert matching Screenshot 215507 */}
        <div 
          style={{
            backgroundColor: '#E8F5EE',
            border: '1.5px solid #B8E2CB',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Info size={22} color="#0C3C2C" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#0C3C2C', fontSize: '0.9rem', display: 'block' }}>
                Illustrative prices &amp; trends &bull; Not live market data
              </strong>
              <span style={{ fontSize: '0.8rem', color: '#2A6348' }}>
                A sample reference for computing crops. Real availability and pricing are confirmed directly with the farmer.
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#2A6348' }}>
            <div>Sample date: <strong>24 October 2026</strong></div>
            <div>Last sample update: 8:00 AM PHT</div>
          </div>
        </div>

        {/* Section Heading & Subtitle matching Screenshot 215507 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9B3C1B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              PLAN WITH A CLEARER PICTURE
            </span>
            <h2 style={{ fontSize: '1.85rem', color: '#0C3C2C' }}>Crop price reference</h2>
            <p style={{ fontSize: '0.9rem' }}>Compare sample prices and weekly changes across local harvests.</p>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#8A7B76', fontStyle: 'italic' }}>
            Philippine pesos (PHP) &bull; per kilogram
          </span>
        </div>

        {/* Filter Toolbar matching Screenshot 215507 */}
        <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '2rem', backgroundColor: '#FFFFFF' }}>
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '0.85rem',
              alignItems: 'center'
            }}
          >
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#8A7B76' }} />
              <input
                type="text"
                placeholder="Search crop prices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>

            <div>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="All">All categories</option>
                <option value="Bulb Crop">Bulb crops</option>
                <option value="Fruit Vegetable">Fruit vegetables</option>
                <option value="Leafy Vegetable">Leafy vegetables</option>
                <option value="Root Crop">Root crops</option>
                <option value="Grains">Grains</option>
              </select>
            </div>

            <div>
              <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                <option value="All">All regions</option>
                <option value="Nueva Ecija">Nueva Ecija</option>
                <option value="Laguna">Laguna</option>
                <option value="Benguet">Benguet</option>
                <option value="Pangasinan">Pangasinan</option>
                <option value="Isabela">Isabela</option>
                <option value="Quezon">Quezon</option>
              </select>
            </div>

            <div>
              <select defaultValue="24 Oct 2026">
                <option value="24 Oct 2026">24 Oct 2026 (Latest)</option>
                <option value="17 Oct 2026">17 Oct 2026</option>
                <option value="10 Oct 2026">10 Oct 2026</option>
              </select>
            </div>

            <div>
              <button 
                onClick={() => {}} 
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Data Table matching Screenshot 215507 */}
        <div className="data-table-container" style={{ marginBottom: '1rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Region</th>
                <th>Sample Price</th>
                <th>Previous Week</th>
                <th>7-Day Change</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((rec) => {
                const isPositive = rec.weekChangePct > 0;
                const isNegative = rec.weekChangePct < 0;
                return (
                  <tr key={rec.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div 
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '8px',
                            backgroundColor: '#F5EDE2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.4rem'
                          }}
                        >
                          {rec.category === 'Bulb Crop' ? '🧅' :
                           rec.category === 'Fruit Vegetable' ? '🍅' :
                           rec.category === 'Leafy Vegetable' ? '🥬' :
                           rec.category === 'Root Crop' ? '🥕' : '🌽'}
                        </div>
                        <div>
                          <strong style={{ color: '#0C3C2C', fontSize: '0.95rem', display: 'block' }}>
                            {rec.crop}
                          </strong>
                          <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                            {rec.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: '#574A46' }}>
                      {rec.province}
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-headings)', fontWeight: 800, fontSize: '1.2rem', color: '#0C3C2C' }}>
                        ₱{rec.samplePrice}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#8A7B76' }}>/kg</span>
                    </td>
                    <td style={{ color: '#8A7B76' }}>
                      ₱{rec.previousWeekPrice}
                    </td>
                    <td>
                      <span 
                        style={{
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          color: isPositive ? '#9B3C1B' : isNegative ? '#1B7A43' : '#574A46'
                        }}
                      >
                        {isPositive ? `↗ +${rec.weekChangePct}%` : isNegative ? `↘ ${rec.weekChangePct}%` : `— 0.0%`}
                      </span>
                    </td>
                    <td>
                      {/* Trend Sparkline SVG */}
                      <svg width="100" height="28" viewBox="0 0 100 28" fill="none">
                        {isPositive ? (
                          <path
                            d="M 5 22 L 25 18 L 45 19 L 65 14 L 85 8 L 95 4"
                            stroke="#9B3C1B"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ) : isNegative ? (
                          <path
                            d="M 5 6 L 25 10 L 45 12 L 65 18 L 85 20 L 95 24"
                            stroke="#1B7A43"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ) : (
                          <path
                            d="M 5 14 L 95 14"
                            stroke="#8A7B76"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        )}
                      </svg>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footnote matching Screenshot 215507 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8A7B76', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span>Showing {filteredRecords.length} sample crops &bull; Farm-direct price references</span>
          <span>Change compares 17 Oct with 24 Oct 2026 &bull; Delivery not included</span>
        </div>

        {/* Middle Split: "A week at a glance" & "Same crop, different regions" matching Screenshot 215507 */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Left Card: A week at a glance */}
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C' }}>A week at a glance</h3>
                <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                  18-24 October 2026 &bull; Illustrative prices per kg
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: '#F8F2EB', padding: '0.2rem', borderRadius: '6px' }}>
                <button
                  onClick={() => setChartView('7days')}
                  style={{
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: '4px',
                    backgroundColor: chartView === '7days' ? '#0C3C2C' : 'transparent',
                    color: chartView === '7days' ? '#FFFFFF' : '#574A46'
                  }}
                >
                  7 days
                </button>
                <button
                  onClick={() => setChartView('30days')}
                  style={{
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: '4px',
                    backgroundColor: chartView === '30days' ? '#0C3C2C' : 'transparent',
                    color: chartView === '30days' ? '#FFFFFF' : '#574A46'
                  }}
                >
                  30 days
                </button>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#9B3C1B' }} />
                <span style={{ color: '#574A46' }}>Red Onions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0C3C2C' }} />
                <span style={{ color: '#574A46' }}>Cherry Tomatoes</span>
              </div>
            </div>

            {/* Interactive SVG Chart */}
            <div style={{ width: '100%', height: '180px', position: 'relative' }}>
              <svg width="100%" height="160" viewBox="0 0 500 160" preserveAspectRatio="none">
                {/* Horizontal grid lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#F0E8DC" strokeWidth="1" />
                <line x1="40" y1="60" x2="480" y2="60" stroke="#F0E8DC" strokeWidth="1" />
                <line x1="40" y1="100" x2="480" y2="100" stroke="#F0E8DC" strokeWidth="1" />
                <line x1="40" y1="140" x2="480" y2="140" stroke="#F0E8DC" strokeWidth="1" />

                <text x="10" y="25" fill="#8A7B76" fontSize="10">₱130</text>
                <text x="10" y="65" fill="#8A7B76" fontSize="10">₱110</text>
                <text x="10" y="105" fill="#8A7B76" fontSize="10">₱85</text>
                <text x="10" y="145" fill="#8A7B76" fontSize="10">₱50</text>

                {/* Red Onions Line (P110 -> P120) */}
                <path
                  d="M 60 55 L 130 52 L 200 56 L 270 48 L 340 44 L 410 42 L 470 40"
                  fill="none"
                  stroke="#9B3C1B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Cherry Tomatoes Line (Stable at 85) */}
                <path
                  d="M 60 100 L 130 100 L 200 98 L 270 100 L 340 102 L 410 100 L 470 100"
                  fill="none"
                  stroke="#0C3C2C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '40px', fontSize: '0.7rem', color: '#8A7B76' }}>
                <span>18 Oct</span>
                <span>19 Oct</span>
                <span>20 Oct</span>
                <span>21 Oct</span>
                <span>22 Oct</span>
                <span>23 Oct</span>
                <span>24 Oct</span>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#8A7B76', marginTop: '0.85rem' }}>
              Sample trend: onions rose from ₱112 to ₱120; cherry tomatoes steady at ₱85.
            </p>
          </div>

          {/* Right Card: Same crop, different regions */}
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C', marginBottom: '0.25rem' }}>
              Same crop, different regions
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#8A7B76', marginBottom: '1.5rem' }}>
              Red Onions &bull; Sample prices as of 24 Oct 2026
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                  <strong style={{ color: '#0C3C2C' }}>Nueva Ecija</strong>
                  <strong style={{ color: '#0C3C2C' }}>₱120/kg</strong>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#F8F2EB', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '92%', height: '100%', backgroundColor: '#D48216', borderRadius: '9999px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                  <strong style={{ color: '#0C3C2C' }}>Ilocos Sur</strong>
                  <strong style={{ color: '#0C3C2C' }}>₱125/kg</strong>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#F8F2EB', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '96%', height: '100%', backgroundColor: '#0C3C2C', borderRadius: '9999px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                  <strong style={{ color: '#0C3C2C' }}>Pangasinan</strong>
                  <strong style={{ color: '#0C3C2C' }}>₱128/kg</strong>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#F8F2EB', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#9B3C1B', borderRadius: '9999px' }} />
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.775rem', color: '#8A7B76', marginTop: 'auto', lineHeight: 1.5 }}>
              Harvest timing, crop grade, local supply, and transport can affect regional prices. Compare the same quality and confirm delivery costs separately.
            </p>
          </div>
        </div>

        {/* 3 Pillars: "Make comparisons that matter" matching Screenshot 215507 */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9B3C1B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            A REFERENCE, NOT A FINAL QUOTE
          </span>
          <h2 style={{ fontSize: '1.85rem', color: '#0C3C2C', marginBottom: '1.75rem' }}>
            Make comparisons that matter
          </h2>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem'
            }}
          >
            <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>
                <Sparkles size={18} color="#D48216" />
                <h4 style={{ fontSize: '1.1rem' }}>Match the harvest</h4>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#574A46' }}>
                Compare variety, freshness, crop grade, and order quantity &mdash; not just the baseline price per kilogram.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>
                <MapPin size={18} color="#0C3C2C" />
                <h4 style={{ fontSize: '1.1rem' }}>Consider the location</h4>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#574A46' }}>
                Seasonal supply and distance from the farm can change the freight cost of the same crop significantly.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>
                <CheckCircle2 size={18} color="#1B7A43" />
                <h4 style={{ fontSize: '1.1rem' }}>Confirm with the farmer</h4>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#574A46' }}>
                Agree on the final price, batch availability, pickup or delivery, and logistics before placing an order.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Card matching Screenshot 215507 */}
        <div 
          className="card"
          style={{
            backgroundColor: '#E2ECE5',
            borderColor: '#C6DDD0',
            padding: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.6rem', color: '#0C3C2C', marginBottom: '0.35rem' }}>
              Know the price. Meet the grower. Buy better.
            </h3>
            <p style={{ color: '#16533F', fontSize: '0.95rem' }}>
              Explore available crops and confirm your price, quantity, and delivery with the farmer.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('/shop')}
            className="btn btn-accent btn-lg"
            style={{ fontWeight: 700 }}
          >
            Browse Crops
          </button>
        </div>
      </div>
    </div>
  );
};
