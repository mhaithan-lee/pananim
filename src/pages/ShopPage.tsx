import React, { useState, useMemo } from 'react';
import { CropListing, CropCategory } from '../types';
import { CropCard } from '../components/CropCard';
import { 
  Search, 
  MapPin, 
  Filter, 
  CheckCircle, 
  TrendingUp, 
  SlidersHorizontal, 
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart
} from 'lucide-react';

interface ShopPageProps {
  cropListings: CropListing[];
  onNavigate: (route: string) => void;
  onAddToCart: (crop: CropListing, quantity: number) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  cropListings,
  onNavigate,
  onAddToCart,
  initialCategory = '',
  initialSearch = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter and sort listings
  const filteredCrops = useMemo(() => {
    return cropListings.filter((crop) => {
      const matchesSearch = 
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (crop.localName && crop.localName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        crop.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || crop.category === selectedCategory;
      
      const matchesLocation = 
        selectedLocation === 'All' || crop.province.includes(selectedLocation);

      const matchesVerified = 
        !verifiedOnly || crop.isVerifiedFarmer;

      return matchesSearch && matchesCategory && matchesLocation && matchesVerified;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerUnit - b.pricePerUnit;
      if (sortBy === 'price-high') return b.pricePerUnit - a.pricePerUnit;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default newest/id order
    });
  }, [cropListings, searchQuery, selectedCategory, selectedLocation, sortBy, verifiedOnly]);

  const totalPages = Math.ceil(filteredCrops.length / itemsPerPage) || 1;
  const currentItems = filteredCrops.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSortBy('newest');
    setVerifiedOnly(false);
    setCurrentPage(1);
  };

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Page Header Banner matching Screenshot 215453 */}
      <section className="hero-banner" style={{ padding: '3.5rem 0 4.5rem 0' }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              ONE NETWORK, SHARED GROWTH.
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.75rem', marginBottom: '0.75rem' }}>
              Explore Fresh Harvests
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.05rem', marginBottom: 0 }}>
              Browse through high-quality seasonal produce direct from local Filipino farmers. Transparent pricing, better market access.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Header Bar matching Screenshot 215453 */}
      <div className="container" style={{ marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
        <div className="search-filter-card">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.85rem',
              alignItems: 'center'
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#8A7B76' }} />
              <input
                type="text"
                placeholder="Search crop names..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              >
                <option value="All">All Categories</option>
                <option value="Bulb Crop">Bulb Crop</option>
                <option value="Fruit Vegetable">Fruit Vegetable</option>
                <option value="Leafy Vegetable">Leafy Vegetable</option>
                <option value="Root Crop">Root Crop</option>
                <option value="Grains">Grains</option>
                <option value="Gourds">Gourds</option>
                <option value="Legumes">Legumes</option>
              </select>
            </div>

            {/* Location Dropdown */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => { setSelectedLocation(e.target.value); setCurrentPage(1); }}
              >
                <option value="All">All Locations</option>
                <option value="Nueva Ecija">Nueva Ecija</option>
                <option value="Benguet">Benguet (La Trinidad)</option>
                <option value="Laguna">Laguna (San Pablo)</option>
                <option value="Pangasinan">Pangasinan (Urdaneta)</option>
                <option value="Isabela">Isabela (Cauayan)</option>
                <option value="Quezon">Quezon (Infanta)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Sort by: Price (Low to High)</option>
                <option value="price-high">Sort by: Price (High to Low)</option>
                <option value="rating">Sort by: Highest Rated</option>
              </select>
            </div>

            {/* Apply / Reset Filter Button */}
            <div>
              <button
                onClick={() => setCurrentPage(1)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Active Filter Chips Bar */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid #F5EDE2',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.825rem', color: '#574A46', fontWeight: 600 }}>
                Active Filters:
              </span>

              {selectedCategory !== 'All' && (
                <span className="badge badge-green" style={{ textTransform: 'none' }}>
                  {selectedCategory}
                  <X size={12} style={{ cursor: 'pointer', marginLeft: '0.25rem' }} onClick={() => setSelectedCategory('All')} />
                </span>
              )}

              {selectedLocation !== 'All' && (
                <span className="badge badge-green" style={{ textTransform: 'none' }}>
                  {selectedLocation}
                  <X size={12} style={{ cursor: 'pointer', marginLeft: '0.25rem' }} onClick={() => setSelectedLocation('All')} />
                </span>
              )}

              <label 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  fontSize: '0.825rem', 
                  color: '#0C3C2C', 
                  cursor: 'pointer',
                  fontWeight: 600,
                  marginLeft: '0.5rem'
                }}
              >
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  style={{ width: 'auto', margin: 0 }}
                />
                Verified Farmers Only
              </label>

              {(selectedCategory !== 'All' || selectedLocation !== 'All' || searchQuery !== '' || verifiedOnly) && (
                <button
                  onClick={resetFilters}
                  style={{ fontSize: '0.8rem', color: '#9B3C1B', textDecoration: 'underline', marginLeft: '0.5rem' }}
                >
                  Clear All
                </button>
              )}
            </div>

            <div style={{ fontSize: '0.85rem', color: '#8A7B76' }}>
              Showing <strong>{filteredCrops.length}</strong> available crop harvests
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid matching Screenshot 215453 */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        {filteredCrops.length === 0 ? (
          <div 
            className="card"
            style={{
              padding: '3.5rem',
              textAlign: 'center',
              backgroundColor: '#FFFFFF'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌾</div>
            <h3>No Harvests Found Matching Criteria</h3>
            <p style={{ maxWidth: '480px', margin: '0.5rem auto 1.5rem auto' }}>
              We could not find any active crop batches matching &ldquo;{searchQuery || selectedCategory}&rdquo;. Try broadening your location or resetting filters.
            </p>
            <button onClick={resetFilters} className="btn btn-primary">
              Reset Filters
            </button>
          </div>
        ) : (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem'
            }}
          >
            {currentItems.map((crop) => (
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
        )}

        {/* Pagination matching Screenshot 215453 */}
        {totalPages > 1 && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '3.5rem'
            }}
          >
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #DECDBD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: currentPage === 1 ? '#D2C8BC' : '#0C3C2C',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: currentPage === p ? '#0C3C2C' : '#FFFFFF',
                  color: currentPage === p ? '#FFFFFF' : '#0C3C2C',
                  border: currentPage === p ? '1px solid #0C3C2C' : '1px solid #DECDBD',
                  fontWeight: 700,
                  fontSize: '0.875rem'
                }}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #DECDBD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: currentPage === totalPages ? '#D2C8BC' : '#0C3C2C',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
