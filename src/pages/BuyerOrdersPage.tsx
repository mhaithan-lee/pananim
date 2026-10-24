import React, { useState } from 'react';
import { OrderGroup } from '../types';
import { 
  Search, 
  ChevronRight, 
  Check, 
  Clock, 
  Truck, 
  MessageSquare, 
  ExternalLink,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface BuyerOrdersPageProps {
  orders: OrderGroup[];
  onNavigate: (route: string) => void;
  onTrackOrder: (orderId: string) => void;
}

export const BuyerOrdersPage: React.FC<BuyerOrdersPageProps> = ({
  orders,
  onNavigate,
  onTrackOrder
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [searchId, setSearchId] = useState('');

  const filteredOrders = orders.filter((o) => {
    return o.id.toLowerCase().includes(searchId.toLowerCase()) ||
      o.sellerOrders.some(so => so.farmName.toLowerCase().includes(searchId.toLowerCase()));
  });

  return (
    <div style={{ padding: '2.5rem 0 5rem 0' }}>
      <div className="container">
        {/* Header Breadcrumb & Title matching Screenshot 215520 */}
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9B3C1B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          MEMBER DASHBOARD
        </span>
        <h1 style={{ fontSize: '2.4rem', color: '#0C3C2C', marginBottom: '1.5rem', marginTop: '0.25rem' }}>
          My Orders
        </h1>

        {/* Tab Bar & Search / Sort Controls matching Screenshot 215520 */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1.5px solid #DECDBD',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '2rem' }}>
            <button
              onClick={() => setActiveTab('active')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: 700,
                fontSize: '1rem',
                color: activeTab === 'active' ? '#0C3C2C' : '#8A7B76',
                borderBottom: activeTab === 'active' ? '3px solid #D48216' : '3px solid transparent',
                paddingBottom: '0.75rem',
                marginBottom: '-2px'
              }}
            >
              Active Orders
            </button>
            <button
              onClick={() => setActiveTab('history')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: 700,
                fontSize: '1rem',
                color: activeTab === 'history' ? '#0C3C2C' : '#8A7B76',
                borderBottom: activeTab === 'history' ? '3px solid #D48216' : '3px solid transparent',
                paddingBottom: '0.75rem',
                marginBottom: '-2px'
              }}
            >
              Order History
            </button>
          </div>

          {/* Search ID and Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '0.5rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#8A7B76' }} />
              <input
                type="text"
                placeholder="Search order ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                style={{
                  paddingLeft: '2.2rem',
                  paddingTop: '0.4rem',
                  paddingBottom: '0.4rem',
                  fontSize: '0.85rem',
                  width: '200px',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Sort by:</span>
              <select style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', width: 'auto', backgroundColor: '#FFFFFF' }}>
                <option value="recent">Recent</option>
                <option value="amount">Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Order Cards matching Screenshot 215520 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3.5rem' }}>
          {filteredOrders.map((order) => {
            const isCompleted = order.sellerOrders.every(so => so.status === 'Received');
            if (activeTab === 'active' && isCompleted) return null;
            if (activeTab === 'history' && !isCompleted) return null;

            return (
              <div 
                key={order.id} 
                className="card"
                style={{
                  padding: '1.75rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px'
                }}
              >
                {/* Order Top Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#8A7B76', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
                      ORDER ID: #{order.id}
                    </span>
                    <h3 style={{ fontSize: '1.35rem', color: '#0C3C2C', marginTop: '0.2rem' }}>
                      {order.sellerOrders[0]?.farmName || 'Wholesale Farm'} Delivery
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#8A7B76' }}>
                      Ordered on {order.createdAt}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span 
                      className={`badge ${
                        order.sellerOrders[0]?.status === 'On the Way' ? 'badge-green' :
                        order.sellerOrders[0]?.status === 'Received' ? 'badge-green' : 'badge-gold'
                      }`}
                      style={{ marginBottom: '0.4rem', textTransform: 'capitalize' }}
                    >
                      {order.sellerOrders[0]?.status || 'In Transit'}
                    </span>
                    <div style={{ fontFamily: 'var(--font-headings)', fontSize: '1.65rem', fontWeight: 800, color: '#9B3C1B' }}>
                      ₱{order.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* Progress Stepper Line matching Screenshot 215520 */}
                <div style={{ margin: '1.75rem 0', padding: '0 0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                    {/* Stepper horizontal line */}
                    <div style={{ position: 'absolute', left: '16px', right: '16px', top: '12px', height: '3px', backgroundColor: '#E2ECE5', zIndex: 1 }} />
                    <div 
                      style={{ 
                        position: 'absolute', 
                        left: '16px', 
                        top: '12px', 
                        height: '3px', 
                        backgroundColor: '#D48216', 
                        zIndex: 2,
                        width: order.sellerOrders[0]?.status === 'Received' ? '100%' :
                               order.sellerOrders[0]?.status === 'On the Way' ? '66%' :
                               order.sellerOrders[0]?.status === 'Packed' ? '33%' : '0%'
                      }} 
                    />

                    {/* Step 1: Confirmed */}
                    <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#D48216', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                        <Check size={14} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0C3C2C', marginTop: '0.4rem' }}>Confirmed</span>
                    </div>

                    {/* Step 2: Packed */}
                    <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          backgroundColor: ['Packed', 'On the Way', 'Received'].includes(order.sellerOrders[0]?.status || '') ? '#D48216' : '#FFFFFF',
                          color: '#FFFFFF',
                          border: '2px solid #D48216',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}
                      >
                        {['Packed', 'On the Way', 'Received'].includes(order.sellerOrders[0]?.status || '') && <Check size={14} />}
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#574A46', marginTop: '0.4rem' }}>Packed</span>
                    </div>

                    {/* Step 3: On the Way */}
                    <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          backgroundColor: order.sellerOrders[0]?.status === 'Received' ? '#D48216' : '#FFFFFF',
                          border: order.sellerOrders[0]?.status === 'On the Way' ? '3px solid #D48216' : '2px solid #DECDBD',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          boxShadow: order.sellerOrders[0]?.status === 'On the Way' ? '0 0 0 3px rgba(212,130,22,0.2)' : 'none'
                        }}
                      >
                        {order.sellerOrders[0]?.status === 'Received' && <Check size={14} color="#FFFFFF" />}
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: order.sellerOrders[0]?.status === 'On the Way' ? 700 : 500, color: order.sellerOrders[0]?.status === 'On the Way' ? '#D48216' : '#8A7B76', marginTop: '0.4rem' }}>
                        On the Way
                      </span>
                    </div>

                    {/* Step 4: Received */}
                    <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          backgroundColor: order.sellerOrders[0]?.status === 'Received' ? '#0C3C2C' : '#E2ECE5',
                          color: '#FFFFFF',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}
                      >
                        {order.sellerOrders[0]?.status === 'Received' && <Check size={14} />}
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#8A7B76', marginTop: '0.4rem' }}>Received</span>
                    </div>
                  </div>
                </div>

                {/* Items Row & Action Buttons matching Screenshot 215520 */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #F5EDE2',
                    paddingTop: '1.25rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {order.sellerOrders.flatMap(so => so.items).map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={item.imageUrl} alt={item.cropName} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div>
                          <strong style={{ fontSize: '0.9rem', color: '#0C3C2C', display: 'block' }}>{item.cropName}</strong>
                          <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                            Quantity: {item.quantity}{item.unit} &bull; ₱{item.unitPrice}/{item.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => onNavigate(`/buyer/orders/${order.id}/issue`)}
                      className="btn btn-outline-warm btn-sm"
                      title="Report shortage or quality dispute"
                    >
                      Report Issue
                    </button>
                    <button
                      onClick={() => onNavigate(`/buyer/orders/${order.id}/invoice`)}
                      className="btn btn-outline-warm btn-sm"
                      title="View printable invoice"
                    >
                      Invoice
                    </button>
                    <button
                      onClick={() => onTrackOrder(order.id)}
                      className="btn btn-accent btn-sm"
                      style={{ fontWeight: 700 }}
                    >
                      Track Shipment
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recently Completed section matching Screenshot 215520 */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C' }}>Recently Completed</h3>
            <button 
              onClick={() => setActiveTab('history')}
              style={{ fontSize: '0.85rem', color: '#9B3C1B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              View All History &gt;
            </button>
          </div>

          <div 
            className="card"
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', color: '#8A7B76', fontWeight: 600 }}>#ORD-2026-8712</span>
              <strong style={{ color: '#0C3C2C' }}>Pura Agri Hub Harvest</strong>
              <span style={{ fontSize: '0.85rem', color: '#8A7B76' }}>15 Oct 2026</span>
              <strong style={{ color: '#0C3C2C' }}>₱1,625.00</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="badge badge-green">
                <Check size={12} /> Completed
              </span>
              <button 
                onClick={() => onNavigate('/shop')}
                style={{ fontSize: '0.85rem', color: '#0C3C2C', fontWeight: 700, textDecoration: 'underline' }}
              >
                Order Again
              </button>
            </div>
          </div>
        </div>

        {/* Need Help Banner matching Screenshot 215520 */}
        <div 
          className="card"
          style={{
            backgroundColor: '#E2ECE5',
            borderColor: '#C6DDD0',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.4rem', color: '#0C3C2C', marginBottom: '0.25rem' }}>
              Need help with your orders?
            </h3>
            <p style={{ color: '#16533F', fontSize: '0.9rem' }}>
              Our support team is available to assist with logistics, farmer communication, and payment disputes.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => onNavigate('/contact')} className="btn btn-accent btn-sm" style={{ fontWeight: 700 }}>
              Contact Support
            </button>
            <button onClick={() => onNavigate('/help')} className="btn btn-outline-warm btn-sm" style={{ backgroundColor: '#D48216', color: '#FFFFFF', borderColor: '#D48216' }}>
              Order FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
