import React, { useState } from 'react';
import { CropListing } from '../../types';
import { FarmerUpdateStockModal } from '../components/FarmerUpdateStockModal';
import { 
  Sprout, 
  Package, 
  Tag, 
  Search, 
  Plus, 
  Edit3, 
  Eye, 
  PauseCircle, 
  PlayCircle, 
  CheckCircle2, 
  MapPin, 
  ArrowUpDown,
  ExternalLink,
  PlusCircle
} from 'lucide-react';

interface FarmerCropsPageProps {
  crops: CropListing[];
  onNavigate: (route: string) => void;
  onUpdateCropStock: (cropId: string, newStock: number) => void;
}

export const FarmerCropsPage: React.FC<FarmerCropsPageProps> = ({
  crops,
  onNavigate,
  onUpdateCropStock
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'stock' | 'price' | 'name'>('stock');
  const [activeTab, setActiveTab] = useState<'all' | 'active'>('all');
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [selectedCropIdForStock, setSelectedCropIdForStock] = useState<string>('');
  const [pausedCropIds, setPausedCropIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  // Compute stats
  const totalStock = crops.reduce((sum, c) => sum + c.availableStock, 0);
  const totalListedValue = crops.reduce((sum, c) => sum + (c.availableStock * c.pricePerUnit), 0);

  // Filter and sort
  const filteredCrops = crops.filter(crop => {
    const matchesSearch = !searchQuery.trim() || 
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.farmName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || crop.category === categoryFilter;
    const matchesLocation = locationFilter === 'All' || crop.province === locationFilter;
    const matchesTab = activeTab === 'all' || !pausedCropIds.includes(crop.id);
    return matchesSearch && matchesCategory && matchesLocation && matchesTab;
  }).sort((a, b) => {
    if (sortBy === 'stock') return b.availableStock - a.availableStock;
    if (sortBy === 'price') return b.pricePerUnit - a.pricePerUnit;
    return a.name.localeCompare(b.name);
  });

  const handleOpenStockModal = (cropId: string) => {
    setSelectedCropIdForStock(cropId);
    setStockModalOpen(true);
  };

  const handleTogglePause = (cropId: string) => {
    if (pausedCropIds.includes(cropId)) {
      setPausedCropIds(pausedCropIds.filter(id => id !== cropId));
      setToastMessage('Crop listing resumed and now live in marketplace search.');
    } else {
      setPausedCropIds([...pausedCropIds, cropId]);
      setToastMessage('Crop listing paused. Temporarily hidden from buyers.');
    }
    setTimeout(() => setToastMessage(''), 3000);
  };

  const uniqueProvinces = Array.from(new Set(crops.map(c => c.province)));
  const uniqueCategories = Array.from(new Set(crops.map(c => c.category)));

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5E6E64' }}>
          <span onClick={() => onNavigate('/farmer/dashboard')} style={{ cursor: 'pointer', color: '#0C3C2C', fontWeight: 600 }}>Overview</span>
          <span>&rsaquo;</span>
          <span style={{ color: '#1D2D24', fontWeight: 600 }}>My Crops</span>
        </div>
        <button
          onClick={() => onNavigate('/farmer/dashboard')}
          style={{ background: 'none', border: 'none', color: '#0C3C2C', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          &larr; Back to Overview
        </button>
      </div>

      {/* Header with Title and List New Crop Button (matching My Crops · Pananim.png) */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h1 style={{ fontSize: '2.4rem', color: '#0C3C2C', margin: '0 0 0.35rem 0', fontWeight: 800 }}>
            My Crops
          </h1>
          <p style={{ color: '#5E6E64', maxWidth: '650px', margin: 0 }}>
            Your harvest, in one place. Manage your listings, stock and selling prices across all regional producer warehouses.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/farmer/inventory/new')}
          className="farmer-btn-primary"
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
        >
          <PlusCircle size={18} /> List New Crop
        </button>
      </div>

      {/* Toast Alert */}
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

      {/* 3 Metric Stat Cards strictly matching My Crops · Pananim.png */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}
      >
        {/* Card 1: Active Listings */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">ACTIVE LISTINGS</span>
            <div className="farmer-stat-icon-wrapper">
              <Sprout size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.2rem 0' }}>
            <span className="farmer-stat-value" style={{ margin: 0 }}>
              {crops.length}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#5E6E64' }}>crops in the marketplace</span>
          </div>
        </div>

        {/* Card 2: Available Stock */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">AVAILABLE STOCK</span>
            <div className="farmer-stat-icon-wrapper">
              <Package size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.2rem 0' }}>
            <span className="farmer-stat-value" style={{ margin: 0 }}>
              {totalStock.toLocaleString()} kg
            </span>
            <span style={{ fontSize: '0.85rem', color: '#5E6E64' }}>across your listings</span>
          </div>
        </div>

        {/* Card 3: Listed Stock Value */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">LISTED STOCK VALUE</span>
            <div className="farmer-stat-icon-wrapper">
              <Tag size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.2rem 0' }}>
            <span className="farmer-stat-value" style={{ margin: 0 }}>
              ₱{totalListedValue.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#5E6E64' }}>at your selling prices</span>
          </div>
        </div>
      </div>

      {/* Main Listings Card Container */}
      <div className="farmer-card" style={{ padding: '2rem' }}>
        {/* Tabs and Search Bar */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderBottom: '1px solid #EBE4DA', 
            paddingBottom: '1rem', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0 0 0.5rem 0',
                fontSize: '0.95rem',
                fontWeight: activeTab === 'all' ? 700 : 500,
                color: activeTab === 'all' ? '#0C3C2C' : '#5E6E64',
                borderBottom: activeTab === 'all' ? '2px solid #0C3C2C' : 'none',
                cursor: 'pointer'
              }}
            >
              All crops ({crops.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0 0 0.5rem 0',
                fontSize: '0.95rem',
                fontWeight: activeTab === 'active' ? 700 : 500,
                color: activeTab === 'active' ? '#0C3C2C' : '#5E6E64',
                borderBottom: activeTab === 'active' ? '2px solid #0C3C2C' : 'none',
                cursor: 'pointer'
              }}
            >
              Active only ({crops.length - pausedCropIds.length})
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search crops or farm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '7px 12px 7px 32px',
                  borderRadius: '8px',
                  border: '1px solid #D5CABE',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <Search size={14} color="#8A7B76" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                padding: '7px 12px',
                borderRadius: '8px',
                border: '1px solid #D5CABE',
                fontSize: '0.85rem',
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="All">All Categories</option>
              {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '7px 12px',
                borderRadius: '8px',
                border: '1px solid #D5CABE',
                fontSize: '0.85rem',
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="stock">Sort: Stock (High to Low)</option>
              <option value="price">Sort: Price (High to Low)</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Crops Table */}
        <div className="farmer-table-container">
          <table className="farmer-table">
            <thead>
              <tr>
                <th>Crop Listing</th>
                <th>Category</th>
                <th>Selling Price</th>
                <th>Available Stock</th>
                <th>Harvest Details</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.map((crop) => {
                const isPaused = pausedCropIds.includes(crop.id);
                return (
                  <tr key={crop.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <img
                          src={crop.imageUrl}
                          alt={crop.name}
                          style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: '#0C3C2C' }}>{crop.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>{crop.variety || 'Native Grade A'}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="farmer-badge gray">{crop.category}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.95rem' }}>₱{crop.pricePerUnit}</div>
                      <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>per kg</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: crop.availableStock < 200 ? '#BA4B24' : '#1B7A43' }}>
                        {crop.availableStock.toLocaleString()} kg
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>
                        {crop.availableStock < 200 ? 'Low Stock' : 'In Stock'}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem', color: '#1D2D24' }}>{crop.harvestDate || '20 Oct 2026'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>{crop.municipality}, {crop.province}</div>
                    </td>
                    <td>
                      <span className={`farmer-badge ${isPaused ? 'gray' : 'green'}`}>
                        {isPaused ? 'Paused' : '● Live'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => handleOpenStockModal(crop.id)}
                          className="farmer-btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          <Edit3 size={13} /> Update Stock
                        </button>
                        <button
                          onClick={() => handleTogglePause(crop.id)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            border: '1px solid #D5CABE',
                            backgroundColor: '#FFFFFF',
                            color: '#5E6E64',
                            cursor: 'pointer'
                          }}
                          title={isPaused ? 'Resume Listing' : 'Pause Listing'}
                        >
                          {isPaused ? <PlayCircle size={15} color="#1B7A43" /> : <PauseCircle size={15} color="#BA4B24" />}
                        </button>
                        <button
                          onClick={() => onNavigate(`/farmer/crops/${crop.id}`)}
                          className="farmer-btn-forest"
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Modal */}
      <FarmerUpdateStockModal
        crops={crops}
        initialCropId={selectedCropIdForStock}
        isOpen={stockModalOpen}
        onClose={() => setStockModalOpen(false)}
        onSaveStock={onUpdateCropStock}
      />
    </div>
  );
};
