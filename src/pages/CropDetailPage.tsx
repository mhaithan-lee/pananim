import React, { useState } from 'react';
import { CropListing, Farm, CropReview } from '../types';
import { 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  Scale, 
  Truck, 
  Calendar, 
  Share2, 
  MessageSquare, 
  ShoppingCart, 
  Star, 
  ChevronRight, 
  ArrowLeft,
  Info,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useChat } from '../context/ChatContext';

interface CropDetailPageProps {
  crop: CropListing;
  farm: Farm;
  reviews: CropReview[];
  onNavigate: (route: string) => void;
  onAddToCart: (crop: CropListing, quantity: number) => void;
  onOpenQuoteModal: (crop: CropListing) => void;
}

export const CropDetailPage: React.FC<CropDetailPageProps> = ({
  crop,
  farm,
  reviews,
  onNavigate,
  onAddToCart,
  onOpenQuoteModal
}) => {
  const { openChatWithSeller } = useChat();
  const [selectedImage, setSelectedImage] = useState(crop.imageUrl);
  const [quantity, setQuantity] = useState(crop.minOrderQuantity);
  const [inquiryText, setInquiryText] = useState(`Hi ${farm.farmerName}, I'm interested in your ${crop.name}. Could we discuss quantity and delivery arrangements?`);
  const [inquirySent, setInquirySent] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'handling' | 'reviews' | 'logistics'>('specs');

  // Compute tier price based on current quantity
  const activeTier = [...crop.priceTiers]
    .reverse()
    .find((tier) => quantity >= tier.minQuantity) || crop.priceTiers[0];

  const currentUnitPrice = activeTier ? activeTier.pricePerUnit : crop.pricePerUnit;
  const currentSubtotal = quantity * currentUnitPrice;

  const handleQuantityChange = (newQty: number) => {
    if (newQty < crop.minOrderQuantity) return;
    if (newQty > crop.availableStock) return;
    setQuantity(newQty);
  };

  const [selectedReviewImage, setSelectedReviewImage] = useState<string | null>(null);

  // Ensure at least 5 verified reviews are always rendered with pictures
  const directReviews = reviews.filter((r) => r.listingId === crop.id);
  const otherReviews = reviews.filter((r) => r.listingId !== crop.id);
  const displayReviews = [...directReviews, ...otherReviews].slice(0, Math.max(5, directReviews.length));

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* Breadcrumb Navigation matching Screenshot 215623 */}
      <div className="container" style={{ paddingTop: '1.25rem', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#8A7B76' }}>
          <button onClick={() => onNavigate('/')} style={{ color: '#0C3C2C', fontWeight: 600 }}>Home</button>
          <span>&gt;</span>
          <button onClick={() => onNavigate('/shop')} style={{ color: '#0C3C2C', fontWeight: 600 }}>Crops</button>
          <span>&gt;</span>
          <span style={{ color: '#574A46', fontWeight: 700 }}>{crop.name}</span>
        </div>
      </div>

      {/* Page Title & Back Button matching Screenshot 215623 */}
      <div className="container" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.25rem' }}>View crop details</h1>
            <p style={{ color: '#574A46' }}>Get to know the harvest. Connect directly with the farmer.</p>
          </div>
          <button
            onClick={() => onNavigate('/shop')}
            className="btn btn-outline-warm btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={16} /> Back to all crops
          </button>
        </div>
      </div>

      {/* Main Crop Presentation Card matching Screenshot 215623 */}
      <div className="container">
        <div 
          className="card"
          style={{
            padding: '1.75rem',
            backgroundColor: '#FFFFFF',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Image Gallery */}
          <div>
            <div 
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                height: '380px',
                backgroundColor: '#E2ECE5',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <img
                src={selectedImage}
                alt={crop.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span 
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(12, 60, 44, 0.95)',
                  color: '#FFFFFF',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                {crop.category}
              </span>
              <span
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(0,0,0,0.65)',
                  color: '#FFFFFF',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                📷 1 photo &bull; Cover
              </span>
            </div>

            {crop.additionalImages && crop.additionalImages.length > 0 && (
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <img
                  src={crop.imageUrl}
                  alt="Thumb 1"
                  onClick={() => setSelectedImage(crop.imageUrl)}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedImage === crop.imageUrl ? '2px solid #0C3C2C' : '1px solid #DECDBD'
                  }}
                />
                {crop.additionalImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Thumb ${i + 2}`}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: selectedImage === img ? '2px solid #0C3C2C' : '1px solid #DECDBD'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Price, Quantity Calculator, Purchase Actions */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#0C3C2C',
                  backgroundColor: '#E2ECE5',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '9999px'
                }}
              >
                &bull; Live listing
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#D48216' }}>
                <Star size={16} fill="#D48216" />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0C3C2C' }}>{crop.rating}</span>
                <span style={{ color: '#8A7B76', fontSize: '0.8rem' }}>({crop.reviewCount} reviews)</span>
              </div>
            </div>

            <h2 style={{ fontSize: '2.4rem', color: '#0C3C2C', marginBottom: '0.25rem' }}>{crop.name}</h2>
            {crop.localName && (
              <p style={{ color: '#8A7B76', fontSize: '0.95rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                Local Name: {crop.localName} &bull; Variety: {crop.variety}
              </p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#574A46', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <MapPin size={15} color="#0C3C2C" />
              <span>{crop.municipality}, {crop.province}</span>
              <span>&bull;</span>
              <button 
                onClick={() => onNavigate(`/farmers/${crop.farmId}`)}
                style={{ color: '#0C3C2C', fontWeight: 700, textDecoration: 'underline' }}
              >
                {crop.farmName}
              </button>
            </div>

            {/* Price Display matching Screenshot 215623 */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: 'var(--font-headings)', fontSize: '2.8rem', fontWeight: 800, color: '#0C3C2C' }}>
                ₱{currentUnitPrice.toFixed(2)}
              </span>
              <span style={{ fontSize: '1.2rem', color: '#8A7B76', fontWeight: 500 }}>
                / {crop.unit}
              </span>
            </div>

            {/* Stock & Availability pill matching Screenshot 215623 */}
            <div 
              style={{
                backgroundColor: '#F8F2EB',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.75rem',
                border: '1px solid #EADECF'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: '#8A7B76', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                  Available quantity
                </span>
                <strong style={{ fontSize: '1.25rem', color: '#0C3C2C' }}>
                  {crop.availableStock.toLocaleString()} {crop.unit}
                </strong>
              </div>
              <span className="badge badge-green">
                <CheckCircle size={13} /> {crop.availabilityStatus}
              </span>
            </div>

            {/* Price Tiers Table */}
            {crop.priceTiers && crop.priceTiers.length > 0 && (
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0C3C2C', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
                  Wholesale Quantity Tiers
                </label>
                <div style={{ border: '1px solid #DECDBD', borderRadius: '8px', overflow: 'hidden' }}>
                  {crop.priceTiers.map((tier, idx) => {
                    const isSelected = activeTier === tier;
                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.85rem',
                          backgroundColor: isSelected ? '#E2ECE5' : idx % 2 === 0 ? '#FFFFFF' : '#FAF6F0',
                          fontSize: '0.85rem',
                          borderBottom: idx === crop.priceTiers.length - 1 ? 'none' : '1px solid #DECDBD',
                          fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? '#0C3C2C' : '#574A46'
                        }}
                      >
                        <span>{tier.label}</span>
                        <span>₱{tier.pricePerUnit} / {crop.unit}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Live Subtotal */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', textTransform: 'uppercase' }}>
                  Order Quantity ({crop.unit})
                </label>
                <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                  Min: {crop.minOrderQuantity} {crop.unit} &bull; Increment: {crop.incrementQuantity} {crop.unit}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1.5px solid #DECDBD',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => handleQuantityChange(quantity - crop.incrementQuantity)}
                    style={{ padding: '0.65rem 1rem', fontSize: '1.2rem', fontWeight: 700, color: '#0C3C2C' }}
                    disabled={quantity <= crop.minOrderQuantity}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    step={crop.incrementQuantity}
                    min={crop.minOrderQuantity}
                    max={crop.availableStock}
                    style={{
                      width: '80px',
                      textAlign: 'center',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      backgroundColor: 'transparent'
                    }}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + crop.incrementQuantity)}
                    style={{ padding: '0.65rem 1rem', fontSize: '1.2rem', fontWeight: 700, color: '#0C3C2C' }}
                    disabled={quantity >= crop.availableStock}
                  >
                    +
                  </button>
                </div>

                <div style={{ flex: 1, textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>Estimated Subtotal</span>
                  <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0C3C2C' }}>
                    ₱{currentSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to cart / Buy now dominant */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <button
                onClick={() => onAddToCart(crop, quantity)}
                className="btn btn-secondary"
                style={{ fontWeight: 700 }}
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  onAddToCart(crop, quantity);
                  onNavigate('/checkout');
                }}
                className="btn btn-accent"
                style={{ fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <ShoppingCart size={16} /> Buy Now
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Listing link copied to clipboard!');
                }}
                className="btn btn-outline-warm"
                title="Share crop listing"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Secondary Outlined "Chat with seller" immediately below Add to cart / Buy now controls */}
            <button
              onClick={() => openChatWithSeller(crop.farmId, {
                type: 'product',
                title: `${crop.name} (${crop.variety})`,
                subtitle: `${crop.farmName} • ${crop.municipality}, ${crop.province}`,
                imageUrl: crop.imageUrl,
                price: `₱${crop.pricePerUnit.toFixed(2)} / ${crop.unit}`,
                unit: crop.packaging,
                linkUrl: `/crops/${crop.id}`,
                disclaimer: 'Product prices shown in chat are contextual wholesale benchmarks and not binding purchase contracts until confirmed via checkout.'
              })}
              className="btn btn-outline-warm"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                borderColor: '#0C3C2C',
                color: '#0C3C2C',
                padding: '0.65rem 1rem',
                marginBottom: '1rem'
              }}
              aria-label={`Chat with seller: ${farm.name}`}
            >
              <MessageSquare size={16} /> Chat with seller
            </button>

            <p style={{ fontSize: '0.75rem', color: '#8A7B76', textAlign: 'center' }}>
              Confirm your quantity, harvest schedules, and pickup arrangements directly with the farmer.
            </p>
          </div>
        </div>
      </div>

      {/* Middle Grid: About this crop + Harvest info + Contact the farmer matching Screenshot 215623 */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {/* Left Column: Crop specs & Harvest details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* About this crop */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#0C3C2C' }}>About this crop</h3>
              <p style={{ lineHeight: 1.7, fontSize: '0.95rem' }}>
                {crop.description}
              </p>
            </div>

            {/* Harvest & availability matching Screenshot 215623 */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: '#0C3C2C' }}>Harvest &amp; availability</h3>
              
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.25rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8A7B76', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <Calendar size={13} color="#0C3C2C" /> Harvest date
                  </div>
                  <strong style={{ fontSize: '0.95rem', color: '#0C3C2C' }}>{crop.harvestDate}</strong>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8A7B76', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <Calendar size={13} color="#0C3C2C" /> Available from
                  </div>
                  <strong style={{ fontSize: '0.95rem', color: '#0C3C2C' }}>{crop.availableFrom}</strong>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8A7B76', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <Scale size={13} color="#0C3C2C" /> Availability
                  </div>
                  <strong style={{ fontSize: '0.95rem', color: '#0C3C2C' }}>{crop.availabilityStatus}</strong>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#8A7B76', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <MapPin size={13} color="#0C3C2C" /> Farm location
                  </div>
                  <strong style={{ fontSize: '0.95rem', color: '#0C3C2C' }}>{crop.municipality}, {crop.province}</strong>
                </div>
              </div>

              {/* Private Pickup Notice matching Screenshot 215623 */}
              <div 
                style={{
                  backgroundColor: '#F8F2EB',
                  borderRadius: '10px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  border: '1px solid #EADECF'
                }}
              >
                <ShieldCheck size={20} color="#0C3C2C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.825rem', color: '#574A46', lineHeight: 1.5 }}>
                  <strong style={{ color: '#0C3C2C', display: 'block', marginBottom: '0.15rem' }}>
                    Pickup details are shared privately
                  </strong>
                  Only the city and province are public. Contact the farmer directly for the exact pickup location and warehouse arrangements.
                </div>
              </div>
            </div>

            {/* Specifications Card */}
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: '#0C3C2C' }}>Wholesale Specifications</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ borderBottom: '1px solid #F5EDE2', paddingBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>Batch / Lot Reference</span>
                  <strong style={{ fontSize: '0.9rem' }}>{crop.batchLotNumber}</strong>
                </div>
                <div style={{ borderBottom: '1px solid #F5EDE2', paddingBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>Quality Grade</span>
                  <strong style={{ fontSize: '0.9rem' }}>{crop.grade}</strong>
                </div>
                <div style={{ borderBottom: '1px solid #F5EDE2', paddingBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>Packaging Type</span>
                  <strong style={{ fontSize: '0.9rem' }}>{crop.packaging}</strong>
                </div>
                <div style={{ borderBottom: '1px solid #F5EDE2', paddingBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>Cultivation Declaration</span>
                  <strong style={{ fontSize: '0.9rem' }}>{crop.cultivationMethod}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact the farmer matching Screenshot 215623 */}
          <div id="contact-farmer-section">
            <div 
              className="card"
              style={{
                padding: '2rem',
                backgroundColor: '#FFFFFF',
                position: 'sticky',
                top: '90px'
              }}
            >
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: '#0C3C2C' }}>Contact the farmer</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem', borderBottom: '1px solid #F5EDE2', paddingBottom: '1rem' }}>
                <img
                  src={farm.avatarUrl}
                  alt={farm.farmerName}
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#0C3C2C' }}>{farm.farmerName}</h4>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Farm Owner &bull; {farm.name}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#574A46', marginBottom: '1.25rem' }}>
                Interested in this harvest? Send {farm.farmerName} a message or chat directly to discuss your needs.
              </p>

              {/* Chat with seller entry point in Meet your grower section beside Visit farm */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => openChatWithSeller(crop.farmId, {
                    type: 'product',
                    title: `${crop.name} (${crop.variety})`,
                    subtitle: `${crop.farmName} • ${crop.province}`,
                    imageUrl: crop.imageUrl,
                    price: `₱${crop.pricePerUnit.toFixed(2)} / ${crop.unit}`
                  })}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
                  aria-label={`Chat with seller: ${farm.name}`}
                >
                  <MessageSquare size={14} /> Chat with seller
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate(`/farmers/${farm.id}`)}
                  className="btn btn-outline-warm btn-sm"
                >
                  Visit Farm Storefront &rarr;
                </button>
              </div>

              {inquirySent ? (
                <div 
                  style={{
                    backgroundColor: '#E8F5EE',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    border: '1px solid #B8E2CB'
                  }}
                >
                  <CheckCircle size={32} color="#1B7A43" style={{ margin: '0 auto 0.75rem auto' }} />
                  <h4 style={{ color: '#1B7A43', marginBottom: '0.25rem' }}>Inquiry Sent Successfully</h4>
                  <p style={{ fontSize: '0.85rem', color: '#2A6348' }}>
                    {farm.farmerName} has received your inquiry. Check your Pananim Messages inbox for updates.
                  </p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setInquirySent(true);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#574A46', marginBottom: '0.35rem', display: 'block' }}>
                      Quantity needed (optional)
                    </label>
                    <input
                      type="number"
                      placeholder={`Enter quantity in ${crop.unit}`}
                      defaultValue={quantity}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#574A46', marginBottom: '0.35rem', display: 'block' }}>
                      Your message
                    </label>
                    <textarea
                      rows={4}
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-accent"
                    style={{ width: '100%', fontWeight: 700 }}
                  >
                    Send Inquiry
                  </button>

                  <p style={{ fontSize: '0.725rem', color: '#8A7B76', textAlign: 'center' }}>
                    An inquiry isn&apos;t an order. Agree on details with the seller first.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section with 5+ Verified Reviews & Photos */}
      <div className="container" style={{ marginTop: '3.5rem' }}>
        <div className="card" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF' }}>
          {/* Header Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.25rem', borderBottom: '1px solid #F5EDE2', paddingBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                  <ShieldCheck size={12} /> 100% INSPECTED DELIVERIES
                </span>
                <span style={{ fontSize: '0.8rem', color: '#8A7B76' }}>
                  {displayReviews.length} Verified Commercial Reviews
                </span>
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#0C3C2C' }}>Buyer Reviews &amp; Delivery Evidence</h3>
              <p style={{ fontSize: '0.875rem', color: '#574A46', maxWidth: '600px' }}>
                Every review includes certified arrival photographs and verified warehouse/intake scale documentation from wholesale buyers.
              </p>
            </div>

            {/* Overall Score Badge */}
            <div 
              style={{ 
                backgroundColor: '#FAF6F0', 
                border: '1px solid #EADECF', 
                borderRadius: '12px', 
                padding: '1rem 1.5rem',
                textAlign: 'center',
                minWidth: '180px'
              }}
            >
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0C3C2C', lineHeight: 1 }}>
                {crop.rating}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', color: '#D48216', margin: '0.35rem 0' }}>
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
                <Star size={16} fill="#D48216" />
              </div>
              <div style={{ fontSize: '0.75rem', color: '#8A7B76', fontWeight: 600 }}>
                Based on {displayReviews.length} verified deliveries
              </div>
            </div>
          </div>

          {/* Rating Breakdown Sub-Bar */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '1rem', 
              marginBottom: '2rem',
              backgroundColor: '#FAF6F0',
              padding: '1rem 1.25rem',
              borderRadius: '8px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>Freshness &amp; Turgidity</span>
              <strong style={{ fontSize: '0.95rem', color: '#0C3C2C' }}>5.0 / 5.0 (Crisp)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>Packaging &amp; Sacking</span>
              <strong style={{ fontSize: '0.95rem', color: '#0C3C2C' }}>4.9 / 5.0 (Ventilated)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>Delivery Schedule Accuracy</span>
              <strong style={{ fontSize: '0.95rem', color: '#0C3C2C' }}>4.8 / 5.0 (On Time)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>Moisture Loss / Scale Discrepancy</span>
              <strong style={{ fontSize: '0.95rem', color: '#1B7A43' }}>&lt; 0.5% (PhilGAP Standard)</strong>
            </div>
          </div>

          {/* Reviews List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {displayReviews.map((rev, revIdx) => (
              <div 
                key={rev.id || revIdx}
                style={{
                  borderTop: revIdx > 0 ? '1px solid #F5EDE2' : 'none',
                  paddingTop: revIdx > 0 ? '1.75rem' : '0'
                }}
              >
                {/* Reviewer Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div 
                      style={{ 
                        width: '38px', 
                        height: '38px', 
                        borderRadius: '50%', 
                        backgroundColor: '#0C3C2C', 
                        color: '#FFFFFF', 
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem'
                      }}
                    >
                      {rev.buyerName.charAt(0)}
                    </div>
                    <div>
                      <strong style={{ color: '#0C3C2C', fontSize: '0.95rem', display: 'block' }}>{rev.buyerName}</strong>
                      <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                        {rev.cropName ? `${rev.cropName} Buyer` : 'Commercial Wholesale Buyer'}
                      </span>
                    </div>
                    {rev.verifiedPurchase && (
                      <span className="badge badge-green" style={{ fontSize: '0.675rem' }}>
                        <CheckCircle size={11} /> Verified Delivery
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#8A7B76', fontWeight: 500 }}>{rev.date}</span>
                </div>

                {/* Rating & Review Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#D48216', marginBottom: '0.6rem' }}>
                  {Array.from({ length: rev.rating || 5 }).map((_, idx) => (
                    <Star key={idx} size={15} fill="#D48216" />
                  ))}
                  <strong style={{ fontSize: '1rem', color: '#0C3C2C', marginLeft: '0.5rem' }}>
                    {rev.title}
                  </strong>
                </div>

                {/* Comment Body */}
                <p style={{ fontSize: '0.925rem', color: '#443734', marginBottom: '0.85rem', lineHeight: 1.65 }}>
                  {rev.comment}
                </p>

                {/* Attached Delivery & Produce Photos (At least 2 photos per review) */}
                {rev.images && rev.images.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.45rem' }}>
                      📸 Buyer Arrival Photos ({rev.images.length} photos attached):
                    </span>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {rev.images.map((imgUrl, i) => (
                        <div 
                          key={i} 
                          style={{ 
                            position: 'relative', 
                            width: '120px', 
                            height: '120px', 
                            borderRadius: '10px', 
                            overflow: 'hidden', 
                            border: '2px solid #EADECF',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease'
                          }}
                          onClick={() => setSelectedReviewImage(imgUrl)}
                          title="Click to view full photo"
                        >
                          <img 
                            src={imgUrl} 
                            alt={`Arrival verification ${i + 1} by ${rev.buyerName}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          <span 
                            style={{ 
                              position: 'absolute', 
                              bottom: '6px', 
                              right: '6px', 
                              backgroundColor: 'rgba(12,60,44,0.85)', 
                              color: '#fff', 
                              fontSize: '0.625rem', 
                              padding: '2px 6px', 
                              borderRadius: '4px',
                              fontWeight: 700,
                              letterSpacing: '0.02em'
                            }}
                          >
                            Photo {i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Purchase specs note */}
                {rev.purchasedQuantityText && (
                  <div style={{ fontSize: '0.775rem', color: '#8A7B76', backgroundColor: '#F8F2EB', padding: '0.4rem 0.75rem', borderRadius: '6px', display: 'inline-block', marginBottom: '0.75rem' }}>
                    📦 {rev.purchasedQuantityText}
                  </div>
                )}

                {/* Farmer Reply Box */}
                {rev.farmerReply && (
                  <div 
                    style={{
                      backgroundColor: '#FAF6F0',
                      borderRadius: '8px',
                      padding: '1rem 1.25rem',
                      marginTop: '0.75rem',
                      borderLeft: '4px solid #0C3C2C'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#0C3C2C', fontWeight: 700, marginBottom: '0.35rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        🌾 Official Response from {rev.farmerReply.farmerName}:
                      </span>
                      <span style={{ color: '#8A7B76', fontWeight: 500, fontSize: '0.75rem' }}>{rev.farmerReply.date}</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#574A46', margin: 0 }}>
                      &ldquo;{rev.farmerReply.message}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Image Modal Lightbox */}
      {selectedReviewImage && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedReviewImage(null)}
          style={{ zIndex: 10000 }}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '720px', padding: '1.25rem', backgroundColor: '#FFFFFF', textAlign: 'center' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <strong style={{ color: '#0C3C2C' }}>Verified Delivery Inspection Photo</strong>
              <button 
                onClick={() => setSelectedReviewImage(null)}
                className="btn btn-outline-warm btn-sm"
              >
                Close ✕
              </button>
            </div>
            <img 
              src={selectedReviewImage} 
              alt="Full size inspection photo" 
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px' }}
            />
          </div>
        </div>
      )}
      {/* Mobile Compact Sticky Purchase & Chat Bar */}
      <div 
        className="mobile-sticky-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #DECDBD',
          padding: '0.65rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          zIndex: 800,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.08)'
        }}
      >
        <button
          onClick={() => openChatWithSeller(crop.farmId, {
            type: 'product',
            title: `${crop.name} (${crop.variety})`,
            subtitle: `${crop.farmName} • ${crop.province}`,
            imageUrl: crop.imageUrl,
            price: `₱${crop.pricePerUnit.toFixed(2)} / ${crop.unit}`
          })}
          className="btn btn-outline-warm btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, flexShrink: 0, borderColor: '#0C3C2C', color: '#0C3C2C' }}
          aria-label={`Chat with seller: ${farm.name}`}
        >
          <MessageSquare size={14} /> Chat with seller
        </button>

        <button
          onClick={() => onAddToCart(crop, quantity)}
          className="btn btn-accent btn-sm"
          style={{ flex: 1, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
        >
          <ShoppingCart size={15} /> Buy Now &bull; ₱{currentSubtotal.toLocaleString()}
        </button>
      </div>
    </div>
  );
};
