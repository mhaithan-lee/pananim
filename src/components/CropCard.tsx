import React from 'react';
import { CropListing } from '../types';
import { 
  MapPin, 
  CheckCircle, 
  Star, 
  ShoppingCart, 
  Clock, 
  Truck, 
  TrendingUp, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface CropCardProps {
  crop: CropListing;
  onNavigate: (route: string) => void;
  onAddToCart: (crop: CropListing, quantity: number) => void;
  onBuyNow?: (crop: CropListing, quantity: number) => void;
}

export const CropCard: React.FC<CropCardProps> = ({
  crop,
  onNavigate,
  onAddToCart,
  onBuyNow
}) => {
  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(crop, crop.minOrderQuantity);
    } else {
      onAddToCart(crop, crop.minOrderQuantity);
      onNavigate('/cart');
    }
  };

  return (
    <div className="crop-card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Crop Image Container */}
      <div 
        className="crop-card-image-wrap"
        style={{ cursor: 'pointer' }}
        onClick={() => onNavigate(`/crops/${crop.id}`)}
      >
        <img 
          src={crop.imageUrl} 
          alt={crop.name} 
          loading="lazy"
          onError={(e) => {
            // Fallback if network flickers
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Top Headline: Freshness Banner on Top of the Picture */}
        {crop.isFresh && (
          <div 
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              right: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 3
            }}
          >
            <span 
              style={{
                backgroundColor: '#0C3C2C',
                color: '#92DEB9',
                fontSize: '0.675rem',
                fontWeight: 800,
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.25)'
              }}
            >
              <Sparkles size={11} color="#92DEB9" /> 100% FARM FRESH
            </span>

            {crop.isVerifiedFarmer && (
              <span 
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#0C3C2C',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
              >
                <CheckCircle size={11} color="#0C3C2C" /> Reviewed
              </span>
            )}
          </div>
        )}

        {/* Category Pill */}
        <span 
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: 'rgba(34, 23, 20, 0.85)',
            color: '#FFFFFF',
            fontSize: '0.675rem',
            fontWeight: 700,
            padding: '0.2rem 0.55rem',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.03em'
          }}
        >
          {crop.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="crop-card-body" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Title & Location */}
        <div 
          onClick={() => onNavigate(`/crops/${crop.id}`)}
          style={{ cursor: 'pointer', marginBottom: '0.35rem' }}
        >
          <h3 style={{ fontSize: '1.3rem', color: '#0C3C2C', lineHeight: 1.2 }}>{crop.name}</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8A7B76', fontSize: '0.8rem', marginBottom: '0.65rem' }}>
          <MapPin size={13} color="#0C3C2C" />
          <span>{crop.province} &bull; {crop.farmName}</span>
        </div>

        {/* Stars / Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', color: '#D48216' }}>
            <Star size={14} fill="#D48216" />
            <Star size={14} fill="#D48216" />
            <Star size={14} fill="#D48216" />
            <Star size={14} fill="#D48216" />
            <Star size={14} fill="#D48216" />
          </div>
          <strong style={{ fontSize: '0.85rem', color: '#0C3C2C' }}>{crop.rating}</strong>
          <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>({crop.reviewCount} reviews)</span>
        </div>

        {/* Freshness / Spoilage Warning & Shipping Lead Time Pill */}
        <div 
          style={{
            backgroundColor: '#FAF6F0',
            border: '1px solid #EADECF',
            borderRadius: '8px',
            padding: '0.6rem 0.75rem',
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            fontSize: '0.775rem'
          }}
        >
          {/* Freshness / Rot Date */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#9B3C1B' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <Clock size={12} /> Fresh until {crop.freshUntilDate}
            </span>
            <span style={{ fontWeight: 700, backgroundColor: '#FCEBE6', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
              {crop.shelfLifeDays} days left
            </span>
          </div>

          {/* Shipping Timeframe */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#0C3C2C', borderTop: '1px solid #F0E6D8', paddingTop: '0.3rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <Truck size={12} /> {crop.shippingLeadTime}
            </span>
            <span style={{ color: '#8A7B76' }}>
              Min: <strong>{crop.minOrderQuantity} {crop.unit}</strong>
            </span>
          </div>
        </div>

        {/* Price & Trend Tag */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.25rem', marginTop: 'auto' }}>
          <div className="price-tag">
            ₱{crop.pricePerUnit} <span className="unit">/{crop.unit}</span>
          </div>
          <span 
            className={`badge ${crop.trend === 'Trending Up' ? 'badge-terracotta' : crop.trend === 'Bargain' ? 'badge-gold' : 'badge-green'}`}
            style={{ fontSize: '0.675rem' }}
          >
            <TrendingUp size={11} /> {crop.trend}
          </span>
        </div>

        {/* Action Buttons: ADD TO CART & BUY NOW with Cart Icon */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button
            onClick={() => onAddToCart(crop, crop.minOrderQuantity)}
            className="btn btn-outline-warm btn-sm"
            style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
            title={`Add minimum ${crop.minOrderQuantity} ${crop.unit} to cart`}
          >
            <ShoppingCart size={15} /> Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="btn btn-accent btn-sm"
            style={{ fontWeight: 700 }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
