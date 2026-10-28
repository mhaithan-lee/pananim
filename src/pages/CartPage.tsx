import React from 'react';
import { CartItem, CropListing } from '../types';
import { 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  Truck, 
  MapPin, 
  ShieldCheck, 
  AlertCircle,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useChat } from '../context/ChatContext';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onNavigate: (route: string) => void;
  onLoadWorkedExample: () => void;
  onLoadSampleVeggies?: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  onLoadWorkedExample,
  onLoadSampleVeggies
}) => {
  const { openChatWithSeller } = useChat();
  // Group cart items by farm
  const itemsByFarm = cartItems.reduce((acc, item) => {
    const farmId = item.crop.farmId;
    if (!acc[farmId]) {
      acc[farmId] = {
        farmName: item.crop.farmName,
        province: item.crop.province,
        items: []
      };
    }
    acc[farmId].items.push(item);
    return acc;
  }, {} as Record<string, { farmName: string; province: string; items: CartItem[] }>);

  const totalItemSubtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  // Each farm adds separate delivery charge based on prompt specifications
  const estimatedDeliveryTotal = Object.keys(itemsByFarm).length * 100; // estimated fallback
  const estimatedGrandTotal = totalItemSubtotal + estimatedDeliveryTotal;

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Wholesale Sourcing Cart</span>
            <h1>Your Crop Order</h1>
            <p>Items grouped by provincial farm. Multi-farmer orders generate separate seller shipments.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            {onLoadSampleVeggies && (
              <button
                onClick={onLoadSampleVeggies}
                className="btn btn-outline-warm btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderColor: '#0C3C2C', color: '#0C3C2C' }}
              >
                <ShoppingBag size={14} /> Fill Fresh Veggies Cart
              </button>
            )}
            <button
              onClick={onLoadWorkedExample}
              className="btn btn-outline-warm btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderColor: '#9B3C1B', color: '#9B3C1B' }}
            >
              <Sparkles size={14} /> Load ₱950 Worked Demo Cart (Section 9)
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div 
            className="card"
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🛒</div>
            <h3>Your Cart is Currently Empty</h3>
            <p style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
              Explore fresh harvests directly from verified Filipino farms and agricultural cooperatives.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('/shop')} className="btn btn-primary">
                Browse Available Crops
              </button>
              {onLoadSampleVeggies && (
                <button onClick={onLoadSampleVeggies} className="btn btn-secondary">
                  Fill Fresh Veggies Cart
                </button>
              )}
              <button onClick={onLoadWorkedExample} className="btn btn-accent">
                Load ₱950 Demo Cart
              </button>
            </div>
          </div>
        ) : (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem',
              alignItems: 'start'
            }}
          >
            {/* Left: Farm-Grouped Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Multi-farmer notification banner */}
              {Object.keys(itemsByFarm).length > 1 && (
                <div 
                  style={{
                    backgroundColor: '#FEF3E2',
                    border: '1.5px solid #F8D7A6',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.85rem',
                    color: '#8A5308'
                  }}
                >
                  <AlertCircle size={20} color="#D48216" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Multi-Farmer Purchase Group:</strong> Your order contains crops from {Object.keys(itemsByFarm).length} separate farms. Each seller packs and dispatches separately with dedicated freight charges.
                  </div>
                </div>
              )}

              {Object.entries(itemsByFarm).map(([farmId, group]) => {
                const groupSubtotal = group.items.reduce((s, it) => s + it.subtotal, 0);

                return (
                  <div key={farmId} className="card" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
                    {/* Farm Group Header */}
                    <div 
                      style={{
                        backgroundColor: '#F8F2EB',
                        padding: '1rem 1.5rem',
                        borderBottom: '1px solid #DECDBD',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>🌱</span>
                        <div>
                          <strong style={{ color: '#0C3C2C', fontSize: '1.05rem', display: 'block' }}>
                            {group.farmName}
                          </strong>
                          <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                            Origin: {group.province} &bull; Inspected Grower
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => openChatWithSeller(farmId, {
                            type: 'cart',
                            title: `Cart Sourcing Inquiry (${group.farmName})`,
                            subtitle: `${group.items.length} item(s): ${group.items.map(i => `${i.crop.name} (${i.quantity}${i.crop.unit})`).join(', ')}`,
                            imageUrl: group.items[0]?.crop.imageUrl,
                            price: `₱${groupSubtotal.toLocaleString()}`,
                            unit: 'seller items total',
                            disclaimer: 'Context includes only items from this grower. Never discloses other growers in your cart.'
                          })}
                          className="btn btn-outline-warm btn-sm"
                          style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', borderColor: '#0C3C2C', color: '#0C3C2C' }}
                          aria-label={`Chat with seller: ${group.farmName}`}
                        >
                          <MessageSquare size={14} /> Chat with seller
                        </button>
                        <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                          Separate Seller Shipment
                        </span>
                      </div>
                    </div>

                    {/* Farm Items List */}
                    <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {group.items.map((item) => (
                        <div 
                          key={item.id}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '80px 1fr auto',
                            gap: '1.25rem',
                            alignItems: 'center',
                            borderBottom: '1px solid #F5EDE2',
                            paddingBottom: '1.25rem'
                          }}
                        >
                          <img
                            src={item.crop.imageUrl}
                            alt={item.crop.name}
                            style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: '8px',
                              objectFit: 'cover'
                            }}
                          />

                          <div>
                            <h4 style={{ fontSize: '1.05rem', color: '#0C3C2C', marginBottom: '0.2rem' }}>
                              {item.crop.name}
                            </h4>
                            <p style={{ fontSize: '0.8rem', color: '#8A7B76', marginBottom: '0.5rem' }}>
                              {item.crop.variety} &bull; Unit: {item.crop.unit} &bull; Applied: ₱{item.selectedTierPrice}/{item.crop.unit}
                            </p>

                            {/* Quantity Adjuster */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontSize: '0.75rem', color: '#574A46', fontWeight: 600 }}>
                                Qty:
                              </span>
                              <div 
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  border: '1px solid #DECDBD',
                                  borderRadius: '6px',
                                  backgroundColor: '#FFFFFF',
                                  overflow: 'hidden'
                                }}
                              >
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity - item.crop.incrementQuantity)}
                                  disabled={item.quantity <= item.crop.minOrderQuantity}
                                  style={{ padding: '0.25rem 0.6rem', fontWeight: 700, color: '#0C3C2C' }}
                                >
                                  -
                                </button>
                                <span style={{ padding: '0.25rem 0.6rem', fontWeight: 700, fontSize: '0.85rem' }}>
                                  {item.quantity} {item.crop.unit}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + item.crop.incrementQuantity)}
                                  disabled={item.quantity >= item.crop.availableStock}
                                  style={{ padding: '0.25rem 0.6rem', fontWeight: 700, color: '#0C3C2C' }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: 'var(--font-headings)', fontSize: '1.2rem', fontWeight: 800, color: '#0C3C2C', marginBottom: '0.5rem' }}>
                              ₱{item.subtotal.toFixed(2)}
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              style={{ color: '#9B3C1B', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                            >
                              <Trash2 size={13} /> Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', fontSize: '0.9rem' }}>
                        <span style={{ color: '#8A7B76' }}>Farm Goods Subtotal:</span>
                        <strong style={{ color: '#0C3C2C' }}>₱{groupSubtotal.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Order Summary Card */}
            <div>
              <div 
                className="card"
                style={{
                  padding: '2rem',
                  backgroundColor: '#FFFFFF',
                  position: 'sticky',
                  top: '90px'
                }}
              >
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: '#0C3C2C' }}>
                  Purchase Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.925rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#574A46' }}>Crop Goods Total</span>
                    <strong>₱{totalItemSubtotal.toFixed(2)}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#574A46' }}>Estimated Seller Freight ({Object.keys(itemsByFarm).length} shipments)</span>
                    <strong>₱{estimatedDeliveryTotal.toFixed(2)}</strong>
                  </div>

                  <div style={{ borderTop: '1.5px solid #F5EDE2', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0C3C2C' }}>Estimated Total</span>
                    <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0C3C2C' }}>
                      ₱{estimatedGrandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('/checkout/address')}
                  className="btn btn-accent btn-lg"
                  style={{ width: '100%', marginBottom: '1rem', fontWeight: 700 }}
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => onNavigate('/shop')}
                  className="btn btn-outline-warm"
                  style={{ width: '100%', fontSize: '0.85rem' }}
                >
                  Continue Shopping
                </button>

                <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#FAF6F0', borderRadius: '8px', fontSize: '0.75rem', color: '#8A7B76', lineHeight: 1.5 }}>
                  <strong style={{ color: '#0C3C2C', display: 'block', marginBottom: '0.2rem' }}>
                    Wholesale Order Protection
                  </strong>
                  Accurate delivery quotes and pickup slots are confirmed in the next step before payment escrow is authorized.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
