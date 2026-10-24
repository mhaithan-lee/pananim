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
  Sparkles,
  Star,
  X,
  CheckCircle2,
  Camera
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
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewTags, setReviewTags] = useState<string[]>(['Fresh Quality', 'Accurate Weight']);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

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

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge badge-green">
                <Check size={12} /> Completed
              </span>
              <button 
                onClick={() => setShowDetailsModal(true)}
                className="btn btn-outline-warm btn-sm"
                style={{ fontWeight: 600, color: '#0C3C2C', borderColor: '#0C3C2C', padding: '0.35rem 0.75rem' }}
              >
                View Details
              </button>
              <button 
                onClick={() => { setShowReviewModal(true); setReviewSubmitted(false); }}
                className="btn btn-accent btn-sm"
                style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.85rem' }}
              >
                <Star size={13} fill="#FFFFFF" /> Give Us a Review
              </button>
              <button 
                onClick={() => onNavigate('/shop')}
                style={{ fontSize: '0.85rem', color: '#0C3C2C', fontWeight: 700, textDecoration: 'underline', marginLeft: '0.25rem' }}
              >
                Order Again
              </button>
            </div>
          </div>
        </div>

        {/* Order Details Modal for Recently Completed Order */}
        {showDetailsModal && (
          <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
            <div 
              className="card" 
              style={{
                maxWidth: '620px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '16px',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid #F5EDE2', paddingBottom: '1rem' }}>
                <div>
                  <span className="badge badge-green" style={{ marginBottom: '0.4rem' }}>
                    <Check size={12} /> Completed &amp; Inspected
                  </span>
                  <h3 style={{ fontSize: '1.4rem', color: '#0C3C2C', margin: 0 }}>
                    Order Details: #ORD-2026-8712
                  </h3>
                  <span style={{ fontSize: '0.825rem', color: '#8A7B76' }}>
                    Completed on 15 Oct 2026 &bull; Delivered via Pananim Shared Cargo Line
                  </span>
                </div>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A7B76', padding: '0.25rem' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Farm & Delivery Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', backgroundColor: '#FAF6F0', padding: '1rem 1.25rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid #EAE0D5' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase' }}>Supplier / Farm</span>
                  <strong style={{ display: 'block', color: '#0C3C2C', fontSize: '0.95rem' }}>Pura Agri Hub Harvest</strong>
                  <span style={{ fontSize: '0.8rem', color: '#574A46' }}>Tarlac Agricultural Hub, Central Luzon</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase' }}>Delivery Destination</span>
                  <strong style={{ display: 'block', color: '#0C3C2C', fontSize: '0.95rem' }}>Commercial Delivery Bay</strong>
                  <span style={{ fontSize: '0.8rem', color: '#574A46' }}>42 Esteban St., Legaspi Village, Makati</span>
                </div>
              </div>

              {/* Items Table */}
              <h4 style={{ fontSize: '1rem', color: '#0C3C2C', marginBottom: '0.75rem' }}>Ordered Harvest Items</h4>
              <div style={{ border: '1px solid #EAE0D5', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead style={{ backgroundColor: '#F5EDE2', color: '#0C3C2C', textAlign: 'left' }}>
                    <tr>
                      <th style={{ padding: '0.65rem 0.85rem' }}>Harvest Item</th>
                      <th style={{ padding: '0.65rem 0.85rem', textAlign: 'center' }}>Qty</th>
                      <th style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>Price/Unit</th>
                      <th style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #F5EDE2' }}>
                      <td style={{ padding: '0.75rem 0.85rem', fontWeight: 600, color: '#0C3C2C' }}>
                        🧅 Red Creole Onions (Grade A Wholesale)
                      </td>
                      <td style={{ padding: '0.75rem 0.85rem', textAlign: 'center' }}>20 kg</td>
                      <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right' }}>₱50.00</td>
                      <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right', fontWeight: 700 }}>₱1,000.00</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem 0.85rem', fontWeight: 600, color: '#0C3C2C' }}>
                        🧄 Native Dry Garlic (Mesh Sacks)
                      </td>
                      <td style={{ padding: '0.75rem 0.85rem', textAlign: 'center' }}>10 kg</td>
                      <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right' }}>₱62.50</td>
                      <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right', fontWeight: 700 }}>₱625.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Financial Totals */}
              <div style={{ borderTop: '1px solid #F5EDE2', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#574A46' }}>
                  <span>Subtotal:</span>
                  <span>₱1,625.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#574A46' }}>
                  <span>Logistics &amp; Cold-Chain Freight:</span>
                  <span style={{ color: '#2B785E', fontWeight: 600 }}>FREE (Consolidated Route)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: 700, color: '#0C3C2C' }}>
                  <span>Total Settled:</span>
                  <span>₱1,625.00</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', color: '#8A7B76' }}>
                  <CheckCircle2 size={13} color="#2B785E" /> Paid via GCash Escrow Settlement &bull; Reference #PAY-8712-4412
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowReviewModal(true);
                  }}
                  className="btn btn-accent btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}
                >
                  <Star size={14} fill="#FFFFFF" /> Give Us a Review
                </button>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => {
                      setShowDetailsModal(false);
                      onNavigate('/buyer/orders/ORD-2026-8842/invoice');
                    }}
                    className="btn btn-outline-warm btn-sm"
                  >
                    View Official Invoice
                  </button>
                  <button 
                    onClick={() => setShowDetailsModal(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Modal for Recently Completed Order */}
        {showReviewModal && (
          <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
            <div 
              className="card" 
              style={{
                maxWidth: '560px',
                width: '100%',
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '16px',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid #F5EDE2', paddingBottom: '0.85rem' }}>
                <div>
                  <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
                    Buyer Verified Review
                  </span>
                  <h3 style={{ fontSize: '1.35rem', color: '#0C3C2C', margin: 0 }}>
                    Give Us a Review
                  </h3>
                  <span style={{ fontSize: '0.825rem', color: '#8A7B76' }}>
                    Pura Agri Hub Harvest &bull; Order #ORD-2026-8712
                  </span>
                </div>
                <button 
                  onClick={() => setShowReviewModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A7B76', padding: '0.25rem' }}
                >
                  <X size={20} />
                </button>
              </div>

              {reviewSubmitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                    <CheckCircle2 size={36} color="#0C3C2C" />
                  </div>
                  <h3 style={{ color: '#0C3C2C', marginBottom: '0.5rem' }}>Thank You for Your Review!</h3>
                  <p style={{ color: '#574A46', fontSize: '0.925rem', maxWidth: '380px', margin: '0 auto 1.5rem auto' }}>
                    Your feedback and {reviewRating}-star rating have been submitted to Pura Agri Hub Harvest. Reviews help fellow commercial buyers make confident sourcing decisions.
                  </p>
                  <button 
                    onClick={() => setShowReviewModal(false)}
                    className="btn btn-primary"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div>
                  {/* Star Rating Interactive Selector */}
                  <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#0C3C2C', marginBottom: '0.5rem' }}>
                      Overall Harvest &amp; Delivery Rating:
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            transform: reviewRating >= star ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.15s ease'
                          }}
                        >
                          <Star 
                            size={32} 
                            fill={reviewRating >= star ? '#D48216' : 'none'} 
                            color={reviewRating >= star ? '#D48216' : '#C4B5A5'} 
                          />
                        </button>
                      ))}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#D48216', fontWeight: 700, marginTop: '0.25rem', display: 'block' }}>
                      {reviewRating === 5 && 'Outstanding (5.0 / 5.0) - Exceeded Expectations!'}
                      {reviewRating === 4 && 'Very Good (4.0 / 5.0) - High Quality'}
                      {reviewRating === 3 && 'Satisfactory (3.0 / 5.0) - Standard Grade'}
                      {reviewRating === 2 && 'Needs Improvement (2.0 / 5.0)'}
                      {reviewRating === 1 && 'Unsatisfactory (1.0 / 5.0)'}
                    </span>
                  </div>

                  {/* Quick Highlight Tags */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#0C3C2C', marginBottom: '0.5rem' }}>
                      Select Highlights:
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {['Fresh Quality', 'Accurate Weight', 'Fast Cold-Chain', 'Clean Sorting', 'Responsive Farmer'].map((tag) => {
                        const isSelected = reviewTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setReviewTags(reviewTags.filter(t => t !== tag));
                              } else {
                                setReviewTags([...reviewTags, tag]);
                              }
                            }}
                            style={{
                              padding: '0.35rem 0.75rem',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              border: isSelected ? '1.5px solid #0C3C2C' : '1px solid #DECDBD',
                              backgroundColor: isSelected ? '#0C3C2C' : '#FFFFFF',
                              color: isSelected ? '#FFFFFF' : '#574A46',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {isSelected ? '✓ ' : '+ '}{tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Comment */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#0C3C2C', marginBottom: '0.35rem' }}>
                      Your Review / Notes:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share details about harvest freshness, firm texture, weight accuracy, or cold-chain delivery..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1.5px solid #DECDBD',
                        fontSize: '0.875rem',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Photo attachment preview */}
                  <div style={{ marginBottom: '1.5rem', backgroundColor: '#FAF6F0', padding: '0.85rem', borderRadius: '8px', border: '1px dashed #DECDBD' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Camera size={16} color="#0C3C2C" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0C3C2C' }}>
                        Arrival Photos Attached (2):
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=200&q=80" 
                        alt="Arrival photo 1" 
                        style={{ width: '56px', height: '56px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #DECDBD' }} 
                      />
                      <img 
                        src="https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=200&q=80" 
                        alt="Arrival photo 2" 
                        style={{ width: '56px', height: '56px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #DECDBD' }} 
                      />
                      <div style={{ width: '56px', height: '56px', borderRadius: '6px', border: '1px dashed #A89B8C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#8A7B76', cursor: 'pointer' }}>
                        + Add
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button 
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="btn btn-secondary btn-sm"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button"
                      onClick={() => setReviewSubmitted(true)}
                      className="btn btn-accent"
                      style={{ fontWeight: 700 }}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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
