import React, { useState } from 'react';
import { OrderGroup, Farm } from '../types';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  ArrowRight, 
  Calendar, 
  FileText, 
  MessageSquare, 
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Printer
} from 'lucide-react';

interface FarmerOrdersPageProps {
  orders: OrderGroup[];
  farmer: Farm;
  onNavigate: (route: string) => void;
}

export const FarmerOrdersPage: React.FC<FarmerOrdersPageProps> = ({
  orders,
  farmer,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'packed' | 'shipping' | 'delivered'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [packedOrders, setPackedOrders] = useState<Record<string, boolean>>({
    'SO-8842-1': true
  });
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleMarkPacked = (sellerOrderId: string) => {
    setPackedOrders(prev => ({ ...prev, [sellerOrderId]: true }));
    showNotification(`Order ${sellerOrderId} marked as Packed & Inspected for Carrier.`);
  };

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* Top Banner */}
      <section className="hero-banner" style={{ padding: '3.5rem 0 4rem 0' }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              FARMER WORKSPACE &bull; MY SALES
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
              Wholesale Orders &amp; Dispatch
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1rem', marginBottom: 0 }}>
              Track incoming commercial harvest purchases, manage sorting &amp; packing milestones, and coordinate dispatch for {farmer.name}.
            </p>
          </div>
        </div>
      </section>

      {/* KPI Stats Bar */}
      <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}
        >
          <div className="card" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #EADECF' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase' }}>Total Sales This Month</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0C3C2C', marginTop: '0.25rem' }}>₱148,250.00</div>
            <span style={{ fontSize: '0.75rem', color: '#1B7A43', fontWeight: 600 }}>↑ 18.4% from last harvest cycle</span>
          </div>

          <div className="card" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #EADECF' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase' }}>Orders Awaiting Packing</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D48216', marginTop: '0.25rem' }}>2 Orders</div>
            <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>55 kg produce to pack today</span>
          </div>

          <div className="card" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #EADECF' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase' }}>In Transit / Shared Cargo</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0C3C2C', marginTop: '0.25rem' }}>1 Batch</div>
            <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>On route to Balintawak Hub</span>
          </div>

          <div className="card" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #EADECF' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase' }}>Pending Settlement Escrow</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#9B3C1B', marginTop: '0.25rem' }}>₱18,200.00</div>
            <button 
              onClick={() => onNavigate('/farmer/settlements')}
              style={{ fontSize: '0.75rem', color: '#0C3C2C', fontWeight: 700, textDecoration: 'underline', marginTop: '0.25rem', display: 'block' }}
            >
              View Earnings &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        {actionNotice && (
          <div 
            style={{ 
              backgroundColor: '#E8F5EE', 
              border: '1px solid #B8E2CB', 
              color: '#1B7A43', 
              padding: '0.85rem 1.25rem', 
              borderRadius: '8px', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            <CheckCircle size={18} /> {actionNotice}
          </div>
        )}

        {/* Filters and Tabs */}
        <div 
          className="card"
          style={{
            backgroundColor: '#FFFFFF',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('all')}
              className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-outline-warm'}`}
              style={{ fontWeight: 700 }}
            >
              All Orders (4)
            </button>
            <button
              onClick={() => setActiveTab('confirmed')}
              className={`btn btn-sm ${activeTab === 'confirmed' ? 'btn-primary' : 'btn-outline-warm'}`}
              style={{ fontWeight: 700 }}
            >
              Confirmed (1)
            </button>
            <button
              onClick={() => setActiveTab('packed')}
              className={`btn btn-sm ${activeTab === 'packed' ? 'btn-primary' : 'btn-outline-warm'}`}
              style={{ fontWeight: 700 }}
            >
              Packed &amp; Ready (1)
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`btn btn-sm ${activeTab === 'shipping' ? 'btn-primary' : 'btn-outline-warm'}`}
              style={{ fontWeight: 700 }}
            >
              On The Way (1)
            </button>
            <button
              onClick={() => setActiveTab('delivered')}
              className={`btn btn-sm ${activeTab === 'delivered' ? 'btn-primary' : 'btn-outline-warm'}`}
              style={{ fontWeight: 700 }}
            >
              Completed (1)
            </button>
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#8A7B76' }} />
            <input
              type="text"
              placeholder="Search by Order ID or Buyer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.3rem', width: '100%', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* Orders List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Order Item 1 */}
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #DECDBD' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #F5EDE2', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C' }}>#ORD-2026-8842</h3>
                  <span className="badge badge-green">Confirmed • Preparing Produce</span>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', fontWeight: 600 }}>Batch #NE-2026-B08</span>
                </div>
                <div style={{ fontSize: '0.825rem', color: '#574A46' }}>
                  Buyer: <strong>Mateo Rodriguez (Rodriguez Fresh Markets Co.)</strong> &bull; Ordered on 24 Oct 2026, 09:14 AM
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0C3C2C' }}>
                  ₱3,000.00
                </div>
                <div style={{ fontSize: '0.75rem', color: '#8A7B76' }}>
                  Net Payout: <strong>₱2,910.00</strong> (3% platform fee deducted)
                </div>
              </div>
            </div>

            {/* Produce Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#8A7B76', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Crops in Order</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img
                    src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=200&q=80"
                    alt="Red Onions"
                    style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <strong style={{ fontSize: '1rem', color: '#0C3C2C', display: 'block' }}>Red Onions (Class A)</strong>
                    <span style={{ fontSize: '0.825rem', color: '#574A46' }}>25 kg @ ₱120.00/kg &bull; Red Mesh Sacks</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#8A7B76', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Fulfillment &amp; Transport</h4>
                <div style={{ fontSize: '0.85rem', color: '#574A46', lineHeight: 1.6 }}>
                  <div>Type: <strong>Pananim Shared Cargo (Consolidated)</strong></div>
                  <div>Pickup: <strong>Purok 4, San Josef Sur, Cabanatuan City</strong></div>
                  <div>Delivery To: <strong>Valenzuela Wholesale Distribution Hub</strong></div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#8A7B76', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Logistics Status</h4>
                <div style={{ fontSize: '0.85rem', color: '#574A46' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: packedOrders['SO-8842-1'] ? '#1B7A43' : '#D48216', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {packedOrders['SO-8842-1'] ? <CheckCircle size={15} /> : <Clock size={15} />}
                    {packedOrders['SO-8842-1'] ? 'Packed & Bagged in Mesh' : 'Awaiting Harvest Sacking'}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Consolidated Carrier dispatch scheduled for 3:00 PM today</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid #F5EDE2', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => onNavigate('/buyer/orders/ORD-2026-8842/invoice')}
                  className="btn btn-outline-warm btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <FileText size={14} /> Consignment Note
                </button>
                <button 
                  onClick={() => onNavigate('/buyer/orders/ORD-2026-8842/tracking')}
                  className="btn btn-outline-warm btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Truck size={14} /> Cargo Tracking
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {!packedOrders['SO-8842-1'] ? (
                  <button 
                    onClick={() => handleMarkPacked('SO-8842-1')}
                    className="btn btn-accent btn-sm"
                    style={{ fontWeight: 700 }}
                  >
                    ✓ Mark Sacked &amp; Packed
                  </button>
                ) : (
                  <span className="badge badge-green" style={{ padding: '0.45rem 0.85rem' }}>
                    ✓ Sacked for Driver Pickup
                  </span>
                )}
                <button 
                  onClick={() => showNotification("Contacted buyer Mateo Rodriguez via SMS notification.")}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <MessageSquare size={14} /> Message Buyer
                </button>
              </div>
            </div>
          </div>

          {/* Order Item 2 */}
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #DECDBD' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #F5EDE2', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C' }}>#ORD-2026-8701</h3>
                  <span className="badge badge-green">Delivered &amp; Paid</span>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', fontWeight: 600 }}>Batch #NE-2026-B07</span>
                </div>
                <div style={{ fontSize: '0.825rem', color: '#574A46' }}>
                  Buyer: <strong>Mateo Rodriguez</strong> &bull; Completed 16 Oct 2026
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0C3C2C' }}>
                  ₱3,240.00
                </div>
                <div style={{ fontSize: '0.75rem', color: '#1B7A43', fontWeight: 700 }}>
                  Settled into BDO Account •••• 9102
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#8A7B76', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Crops</h4>
                <div style={{ fontSize: '0.875rem', color: '#0C3C2C' }}>
                  <strong>Red Onions (Class A) &bull; 25 kg</strong>
                  <div style={{ fontSize: '0.8rem', color: '#8A7B76' }}>Buyer Rating: ⭐⭐⭐⭐⭐ 5.0 (Zero rot, clean roots)</div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#8A7B76', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Fulfillment</h4>
                <div style={{ fontSize: '0.85rem', color: '#574A46' }}>
                  Farmer Direct Delivery via Regional Reefer Van
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#8A7B76', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Earnings Reference</h4>
                <div style={{ fontSize: '0.85rem', color: '#574A46' }}>
                  Settlement ID: <strong>STL-2026-104</strong> (Paid out on Oct 21)
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid #F5EDE2', paddingTop: '1rem' }}>
              <button 
                onClick={() => onNavigate('/farmer/settlements')}
                className="btn btn-outline-warm btn-sm"
              >
                View Settlement Receipt &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
