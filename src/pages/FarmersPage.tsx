import React, { useState } from 'react';
import { Farm, CropListing } from '../types';
import { CropCard } from '../components/CropCard';
import { 
  MapPin, 
  CheckCircle, 
  Store, 
  Phone, 
  Mail, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';

interface FarmersPageProps {
  farms: Farm[];
  onNavigate: (route: string) => void;
}

export const FarmersPage: React.FC<FarmersPageProps> = ({ farms, onNavigate }) => {
  const [selectedRegion, setSelectedRegion] = useState('All');

  const filteredFarms = farms.filter(f => {
    return selectedRegion === 'All' || f.region.includes(selectedRegion) || f.province.includes(selectedRegion);
  });

  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Direct Grower Network</span>
            <h1>Philippine Farmers &amp; Cooperatives</h1>
            <p>Direct profiles of verified local growers, family farms, and agricultural cooperatives.</p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#574A46' }}>Filter by Province:</span>
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} style={{ width: 'auto', backgroundColor: '#FFFFFF' }}>
              <option value="All">All Provinces</option>
              <option value="Nueva Ecija">Nueva Ecija</option>
              <option value="Benguet">Benguet</option>
              <option value="Laguna">Laguna</option>
              <option value="Pangasinan">Pangasinan</option>
              <option value="Isabela">Isabela</option>
              <option value="Quezon">Quezon</option>
            </select>
          </div>
        </div>

        {/* Farms Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredFarms.map((farm) => (
            <div key={farm.id} className="card card-hover" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '160px', position: 'relative' }}>
                <img src={farm.coverImageUrl} alt={farm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <img 
                  src={farm.avatarUrl} 
                  alt={farm.farmerName} 
                  style={{
                    position: 'absolute',
                    bottom: '-24px',
                    left: '20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '3px solid #FFFFFF',
                    objectFit: 'cover',
                    boxShadow: 'var(--shadow-md)'
                  }}
                />
              </div>

              <div style={{ padding: '2.25rem 1.5rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C' }}>{farm.name}</h3>
                  {farm.verificationStatus === 'verified' && (
                    <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                      <CheckCircle size={10} /> Verified
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8A7B76', fontSize: '0.825rem', marginBottom: '0.85rem' }}>
                  <MapPin size={13} /> {farm.municipality}, {farm.province} &bull; {farm.farmerName}
                </div>

                <p style={{ fontSize: '0.875rem', color: '#574A46', marginBottom: '1.25rem', lineHeight: 1.6, flex: 1 }}>
                  {farm.story}
                </p>

                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                    Primary Wholesale Crops
                  </span>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {farm.primaryCrops.map((c, i) => (
                      <span key={i} style={{ fontSize: '0.75rem', backgroundColor: '#F8F2EB', padding: '0.2rem 0.6rem', borderRadius: '4px', color: '#0C3C2C', fontWeight: 600 }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate(`/farmers/${farm.id}`)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Visit Storefront &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface FarmerStorefrontPageProps {
  farm: Farm;
  listings: CropListing[];
  onNavigate: (route: string) => void;
  onAddToCart: (crop: CropListing, quantity: number) => void;
}

export const FarmerStorefrontPage: React.FC<FarmerStorefrontPageProps> = ({
  farm,
  listings,
  onNavigate,
  onAddToCart
}) => {
  const farmListings = listings.filter(l => l.farmId === farm.id);

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* Cover Banner */}
      <div style={{ height: '260px', width: '100%', position: 'relative', overflow: 'hidden' }}>
        <img src={farm.coverImageUrl} alt={farm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(12, 60, 44, 0.45)' }} />
      </div>

      <div className="container" style={{ marginTop: '-70px', position: 'relative', zIndex: 10 }}>
        {/* Farm Profile Header Card */}
        <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <img 
                src={farm.avatarUrl} 
                alt={farm.farmerName} 
                style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #FFFFFF', boxShadow: 'var(--shadow-md)' }} 
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <h1 style={{ fontSize: '2rem', color: '#0C3C2C' }}>{farm.name}</h1>
                  {farm.verificationStatus === 'verified' && (
                    <span className="badge badge-green">
                      <CheckCircle size={13} /> Reviewed Grower
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8A7B76', fontSize: '0.9rem' }}>
                  <MapPin size={15} color="#0C3C2C" />
                  <span>{farm.barangay}, {farm.municipality}, {farm.province}</span>
                  <span>&bull;</span>
                  <span>Lead: <strong>{farm.farmerName}</strong></span>
                </div>
              </div>
            </div>

            <button onClick={() => onNavigate('/farmers')} className="btn btn-outline-warm btn-sm">
              <ArrowLeft size={16} /> Back to Directory
            </button>
          </div>

          <p style={{ marginTop: '1.5rem', color: '#574A46', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: '820px' }}>
            {farm.story}
          </p>
        </div>

        {/* Available Crops from this Farmer */}
        <h2 style={{ fontSize: '1.75rem', color: '#0C3C2C', marginBottom: '1.5rem' }}>
          Available Harvests from {farm.name}
        </h2>

        {farmListings.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
            <p>No active harvest listings currently published for this grower.</p>
          </div>
        ) : (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem'
            }}
          >
            {farmListings.map((crop) => (
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
      </div>
    </div>
  );
};
