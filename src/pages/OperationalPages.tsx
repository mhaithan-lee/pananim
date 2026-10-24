import React, { useState } from 'react';
import { OrderGroup, SupportIssue, QuoteRequest } from '../types';
import { 
  Printer, 
  ArrowLeft, 
  Truck, 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText,
  ShieldCheck,
  Send
} from 'lucide-react';

interface InvoicePageProps {
  order: OrderGroup;
  onNavigate: (route: string) => void;
}

export const InvoicePage: React.FC<InvoicePageProps> = ({ order, onNavigate }) => {
  return (
    <div style={{ padding: '3rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <button onClick={() => onNavigate('/buyer/orders')} className="btn btn-outline-warm btn-sm">
            <ArrowLeft size={16} /> Back to My Orders
          </button>
          <button onClick={() => window.print()} className="btn btn-primary btn-sm">
            <Printer size={16} /> Print Official Document
          </button>
        </div>

        {/* Printable Official Invoice Card */}
        <div 
          className="card"
          style={{
            padding: '3rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid #DECDBD',
            boxShadow: 'none'
          }}
        >
          {/* Invoice Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0C3C2C', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-headings)', fontSize: '1.8rem', fontWeight: 800, color: '#0C3C2C' }}>
                PANANIM
              </div>
              <span style={{ fontSize: '0.8rem', color: '#574A46' }}>
                Philippine Agricultural Logistics &amp; Wholesale Marketplace
              </span>
              <p style={{ fontSize: '0.75rem', color: '#8A7B76', marginTop: '0.25rem' }}>
                TIN: 009-412-884-000 &bull; Escrow Clearing Settlement Depot
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0C3C2C', display: 'block' }}>
                BILLING SUMMARY
              </span>
              <span style={{ fontSize: '0.85rem', color: '#574A46', fontWeight: 700 }}>
                Invoice Ref: {order.invoiceNumber}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'block' }}>
                Date: {order.createdAt}
              </span>
            </div>
          </div>

          {/* Billed To / Shipped To */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem', fontSize: '0.875rem' }}>
            <div>
              <strong style={{ color: '#0C3C2C', textTransform: 'uppercase', fontSize: '0.75rem', display: 'block', marginBottom: '0.4rem' }}>
                Billed To:
              </strong>
              <div style={{ fontWeight: 700 }}>{order.billingAddress.name}</div>
              {order.billingAddress.businessName && <div>{order.billingAddress.businessName}</div>}
              <div style={{ color: '#574A46' }}>{order.billingAddress.address}</div>
              {order.billingAddress.tin && <div style={{ color: '#8A7B76' }}>TIN: {order.billingAddress.tin}</div>}
            </div>

            <div>
              <strong style={{ color: '#0C3C2C', textTransform: 'uppercase', fontSize: '0.75rem', display: 'block', marginBottom: '0.4rem' }}>
                Delivery Destination:
              </strong>
              <div style={{ fontWeight: 700 }}>{order.deliveryAddress.recipientName}</div>
              <div style={{ color: '#574A46' }}>
                {order.deliveryAddress.houseStreet}, {order.deliveryAddress.barangay}, {order.deliveryAddress.municipality}, {order.deliveryAddress.province}
              </div>
              <div style={{ color: '#8A7B76' }}>Contact: {order.deliveryAddress.phone}</div>
            </div>
          </div>

          {/* Line Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8F2EB', borderBottom: '1.5px solid #DECDBD' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Item &amp; Seller Origin</th>
                <th style={{ padding: '0.75rem', textAlign: 'center' }}>Unit</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Price</th>
                <th style={{ padding: '0.75rem', textAlign: 'center' }}>Qty</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Amount (PHP)</th>
              </tr>
            </thead>
            <tbody>
              {order.sellerOrders.map((so) => (
                <React.Fragment key={so.orderId}>
                  <tr style={{ backgroundColor: '#FAF6F0', fontWeight: 600 }}>
                    <td colSpan={5} style={{ padding: '0.5rem 0.75rem', color: '#0C3C2C', fontSize: '0.8rem' }}>
                      Farm: {so.farmName} &bull; Delivery Leg: {so.deliveryType} (₱{so.deliveryFee.toFixed(2)})
                    </td>
                  </tr>
                  {so.items.map((it, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F5EDE2' }}>
                      <td style={{ padding: '0.75rem' }}>
                        <strong>{it.cropName}</strong> &bull; <span style={{ color: '#8A7B76' }}>{it.variety}</span>
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>{it.unit}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>₱{it.unitPrice.toFixed(2)}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>{it.quantity}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 700 }}>₱{it.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Subtotals & Grand Total */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2.5rem' }}>
            <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#574A46' }}>Crop Goods Total:</span>
                <strong>₱{order.itemTotal.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#574A46' }}>Seller Deliveries ({order.sellerOrders.length} legs):</span>
                <strong>₱{order.deliveryTotal.toFixed(2)}</strong>
              </div>
              <div style={{ borderTop: '2px solid #0C3C2C', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                <strong style={{ color: '#0C3C2C' }}>Total Paid:</strong>
                <strong style={{ color: '#0C3C2C' }}>₱{order.grandTotal.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {/* Payment Status Footer */}
          <div style={{ backgroundColor: '#F8F2EB', padding: '1rem 1.25rem', borderRadius: '8px', fontSize: '0.8rem', color: '#574A46' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Payment Method: <strong>{order.paymentMethod.toUpperCase()}</strong></span>
              <span>Reference: <strong>{order.paymentReference}</strong></span>
              <span>Status: <strong style={{ color: '#1B7A43' }}>AUTHORIZED ESCROW</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderTrackingPage: React.FC<{ order: OrderGroup; onNavigate: (route: string) => void }> = ({
  order,
  onNavigate
}) => {
  return (
    <div style={{ padding: '3rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <button onClick={() => onNavigate('/buyer/orders')} className="btn btn-outline-warm btn-sm" style={{ marginBottom: '1.5rem' }}>
          <ArrowLeft size={16} /> Back to My Orders
        </button>

        <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF', marginBottom: '2rem' }}>
          <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Manual Logistics Updates</span>
          <h1 style={{ fontSize: '2rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>
            Shipment Status for #{order.id}
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#8A7B76' }}>
            Per Section 9 specification, delivery statuses are manually confirmed by provincial farmers and transport drivers at physical milestones.
          </p>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {order.sellerOrders.map((so) => (
              <div key={so.orderId} style={{ border: '1.5px solid #DECDBD', borderRadius: '12px', padding: '1.5rem', backgroundColor: '#FAF6F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #DECDBD', paddingBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: '#0C3C2C' }}>{so.farmName}</h3>
                    <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Shipment Ref: {so.orderId}</span>
                  </div>
                  <span className="badge badge-green">{so.status}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {so.statusTimeline.map((tl, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: tl.completed ? '#0C3C2C' : '#E2ECE5', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        {tl.completed ? <CheckCircle size={16} /> : <Clock size={16} color="#8A7B76" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: '#0C3C2C', display: 'block' }}>{tl.title}</strong>
                        <p style={{ fontSize: '0.85rem', color: '#574A46', margin: '0.15rem 0' }}>{tl.description}</p>
                        <div style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                          Timestamp: {tl.timestamp} &bull; Updated by: {tl.updaterRole}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const IssueReportPage: React.FC<{ order: OrderGroup; onNavigate: (route: string) => void }> = ({
  order,
  onNavigate
}) => {
  const [issueType, setIssueType] = useState('quantity_discrepancy');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ padding: '3rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <button onClick={() => onNavigate('/buyer/orders')} className="btn btn-outline-warm btn-sm" style={{ marginBottom: '1.5rem' }}>
          <ArrowLeft size={16} /> Back to Orders
        </button>

        <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
          <h2 style={{ fontSize: '1.7rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>Report Produce Shortage or Quality Issue</h2>
          <p style={{ fontSize: '0.85rem', color: '#574A46', marginBottom: '1.75rem' }}>
            Protected reporting for Order #{order.id}. Claims are reviewed for refund credits directly through platform escrow.
          </p>

          {submitted ? (
            <div style={{ backgroundColor: '#E8F5EE', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
              <CheckCircle size={36} color="#1B7A43" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ color: '#1B7A43', marginBottom: '0.5rem' }}>Issue Case Submitted</h3>
              <p style={{ fontSize: '0.85rem', color: '#2A6348', marginBottom: '1.5rem' }}>
                Your dispute ticket has been logged with evidence. The farmer will be notified to review and authorize refund adjustment.
              </p>
              <button onClick={() => onNavigate('/buyer/orders')} className="btn btn-primary">
                Return to Orders
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                  Issue Classification *
                </label>
                <select value={issueType} onChange={(e) => setIssueType(e.target.value)}>
                  <option value="quantity_discrepancy">Quantity / Weight Scale Shortage</option>
                  <option value="damaged_spoiled">Transit Spoilage / Crushed Packaging</option>
                  <option value="wrong_item">Incorrect Crop Variety Delivered</option>
                  <option value="delivery_issue">Driver Missed Delivery Window</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                  Affected Quantity (e.g. 2kg underweight, 1 crate spoiled) *
                </label>
                <input type="text" placeholder="e.g. 5kg out of 50kg sack" required />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                  Detailed Description *
                </label>
                <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what you observed upon intake inspection..." required />
              </div>

              <button type="submit" className="btn btn-accent btn-lg" style={{ fontWeight: 700 }}>
                Submit Dispute Claim
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// QUOTES & BIDS PAGE (For /buyer/quotes and /farmer/quotes)
export const QuotesPage: React.FC<{ isFarmer?: boolean; onNavigate: (route: string) => void }> = ({ isFarmer = false, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'quoted' | 'accepted'>('all');
  const [responseNotice, setResponseNotice] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setResponseNotice(msg);
    setTimeout(() => setResponseNotice(null), 3000);
  };

  return (
    <div style={{ paddingBottom: '6rem' }}>
      <section className="hero-banner" style={{ padding: '3.5rem 0 4rem 0' }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              {isFarmer ? 'FARMER WORKSPACE' : 'BUYER COMMERCE'} &bull; WHOLESALE QUOTES &amp; BIDS
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
              {isFarmer ? 'Incoming Harvest Bids &amp; RFQs' : 'My Bulk RFQ Inquiries'}
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1rem', marginBottom: 0 }}>
              Negotiate multi-ton institutional volume orders, custom pallet packaging, and scheduled harvest dispatch.
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {responseNotice && (
          <div style={{ backgroundColor: '#E8F5EE', color: '#1B7A43', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 600 }}>
            <CheckCircle size={18} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
            {responseNotice}
          </div>
        )}

        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #DECDBD', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #F5EDE2', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#0C3C2C' }}>#QT-2026-041 &bull; Red Onions (Class A)</h3>
                <span className="badge badge-gold">Quoted &bull; Awaiting Buyer Acceptance</span>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#574A46' }}>
                Volume: <strong>500 kg</strong> &bull; Target: ₱100.00/kg &bull; Counter-Offer: <strong>₱105.00/kg</strong>
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0C3C2C' }}>₱52,500.00</div>
              <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Delivery window: Early November 2026</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#FAF6F0', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.85rem', color: '#574A46' }}>
            <strong>Farmer Note:</strong> &ldquo;Can fulfill from our upcoming November 2 harvest. Price of ₱105/kg reflects dedicated refrigerated truck delivery to Biñan, Laguna with palletized mesh sacks.&rdquo;
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            {isFarmer ? (
              <>
                <button onClick={() => handleAction("Counter-offer price updated to ₱103.00/kg.")} className="btn btn-outline-warm btn-sm">
                  Revise Counter-Offer
                </button>
                <button onClick={() => handleAction("Accepted buyer terms for 500kg harvest reservation.")} className="btn btn-accent btn-sm" style={{ fontWeight: 700 }}>
                  Confirm Reservation
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleAction("Request for ₱102/kg counter sent to Ramon Santos.")} className="btn btn-outline-warm btn-sm">
                  Counter at ₱102/kg
                </button>
                <button onClick={() => { handleAction("Quotation accepted! Transferred to checkout reservation."); onNavigate('/cart'); }} className="btn btn-accent btn-sm" style={{ fontWeight: 700 }}>
                  Accept &amp; Book Harvest
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// REVIEWS HUB PAGE (For /buyer/reviews and /farmer/reviews)
export const ReviewsHubPage: React.FC<{ isFarmer?: boolean; onNavigate: (route: string) => void }> = ({ isFarmer = false, onNavigate }) => {
  return (
    <div style={{ paddingBottom: '6rem' }}>
      <section className="hero-banner" style={{ padding: '3.5rem 0 4rem 0' }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              {isFarmer ? 'FARMER WORKSPACE' : 'BUYER ACCOUNT'} &bull; REPUTATION &amp; REVIEWS
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
              {isFarmer ? 'Farmer Reviews &amp; Public Replies' : 'My Verified Produce Reviews'}
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1rem', marginBottom: 0 }}>
              Inspected produce quality, photo evidence, scale accuracy ratings, and transparent farmer communication.
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF', border: '1px solid #DECDBD' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#0C3C2C', marginBottom: '1.5rem' }}>
            {isFarmer ? 'Customer Feedback for Santos Agri-Farms' : 'Your Verified Reviews'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ borderBottom: '1px solid #F5EDE2', paddingBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#0C3C2C' }}>Mateo Rodriguez &bull; Red Onions (25kg)</strong>
                <span style={{ fontSize: '0.8rem', color: '#8A7B76' }}>16 Oct 2026</span>
              </div>
              <div style={{ color: '#D48216', marginBottom: '0.5rem' }}>⭐⭐⭐⭐⭐ <strong>Superb curing, zero rot in 25kg sack</strong></div>
              <p style={{ fontSize: '0.9rem', color: '#574A46', marginBottom: '0.75rem' }}>
                Ordered 25kg for restaurant supply. Every bulb was rock hard, dry neck, clean roots. Delivered in sturdy red mesh sacks within 36 hours.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <img src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=200&q=80" alt="Review 1" style={{ width: '80px', height: '80px', borderRadius: '6px', objectFit: 'cover' }} />
                <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=200&q=80" alt="Review 2" style={{ width: '80px', height: '80px', borderRadius: '6px', objectFit: 'cover' }} />
              </div>
              <div style={{ backgroundColor: '#FAF6F0', padding: '0.75rem 1rem', borderRadius: '6px', borderLeft: '3px solid #0C3C2C', fontSize: '0.85rem' }}>
                <strong>Farmer Reply:</strong> &ldquo;Maraming salamat sir Mateo! We dry our onions for full 14 days under ambient shade before bagging.&rdquo;
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#0C3C2C' }}>Chef Carlo Manalo &bull; Cherry Tomatoes (15kg)</strong>
                <span style={{ fontSize: '0.8rem', color: '#8A7B76' }}>10 Oct 2026</span>
              </div>
              <div style={{ color: '#D48216', marginBottom: '0.5rem' }}>⭐⭐⭐⭐⭐ <strong>Exceptional sweetness and high brix</strong></div>
              <p style={{ fontSize: '0.9rem', color: '#574A46', marginBottom: '0.75rem' }}>
                Very sweet tomatoes for salad service. Firm skin with no cracking, beautifully packed in ventilated plastic crates with bubble bottom cushions.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80" alt="Review 1" style={{ width: '80px', height: '80px', borderRadius: '6px', objectFit: 'cover' }} />
                <img src="https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=200&q=80" alt="Review 2" style={{ width: '80px', height: '80px', borderRadius: '6px', objectFit: 'cover' }} />
              </div>
              <div style={{ backgroundColor: '#FAF6F0', padding: '0.75rem 1rem', borderRadius: '6px', borderLeft: '3px solid #0C3C2C', fontSize: '0.85rem' }}>
                <strong>Farmer Reply:</strong> &ldquo;Thank you Chef Carlo! Our drip fertigation gives them that balanced acidity.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// DELIVERIES PAGE (For /farmer/deliveries and /buyer/deliveries)
export const DeliveriesTrackingHubPage: React.FC<{ isFarmer?: boolean; onNavigate: (route: string) => void }> = ({ isFarmer = false, onNavigate }) => {
  return (
    <div style={{ paddingBottom: '6rem' }}>
      <section className="hero-banner" style={{ padding: '3.5rem 0 4rem 0' }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              {isFarmer ? 'FARMER LOGISTICS' : 'BUYER FREIGHT'} &bull; CONSOLIDATED CARGO
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
              Shared Transport &amp; Freight Schedule
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1rem', marginBottom: 0 }}>
              Regional logistics coordination linking provincial growing hubs with urban wholesale drop-off points.
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF', border: '1px solid #DECDBD' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#0C3C2C' }}>Active Regional Freight Consignments</h3>
              <p style={{ fontSize: '0.85rem', color: '#574A46' }}>Pananim Shared Cargo truck runs currently en route or boarding cargo.</p>
            </div>
            <button onClick={() => onNavigate('/delivery-coverage')} className="btn btn-outline-warm btn-sm">
              View Geographic Coverage &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ border: '1px solid #EADECF', borderRadius: '10px', padding: '1.5rem', backgroundColor: '#FAF6F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span className="badge badge-green">🚚 In Transit &bull; Nueva Ecija &rarr; Metro Manila</span>
                    <strong style={{ fontSize: '1.1rem', color: '#0C3C2C' }}>Route #NL-2026-104</strong>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#574A46' }}>
                    Carrier: <strong>Luzon Agri-Express Logistics (Reefer Truck #NAA-4819)</strong>
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.85rem', color: '#1B7A43', fontWeight: 700 }}>ETA: Today, 3:30 PM</span>
                  <div style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Dest: Balintawak Wholesale Trading Hub</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.85rem', color: '#574A46', borderTop: '1px solid #EADECF', paddingTop: '1rem' }}>
                <div>Cargo Volume: <strong>1,850 kg consolidated</strong></div>
                <div>Temperature: <strong>14°C Controlled</strong></div>
                <div>Driver: <strong>Rogelio D. (+63 919 443 2190)</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
