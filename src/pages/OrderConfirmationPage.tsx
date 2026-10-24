import React from 'react';
import { OrderGroup } from '../types';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Printer, 
  ArrowRight, 
  MapPin, 
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface OrderConfirmationPageProps {
  order: OrderGroup;
  onNavigate: (route: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  onNavigate
}) => {
  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        {/* Success Header Card */}
        <div 
          className="card"
          style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            marginBottom: '2rem',
            borderTop: '5px solid #0C3C2C'
          }}
        >
          <div 
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: '#E2ECE5',
              color: '#0C3C2C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}
          >
            <CheckCircle size={38} />
          </div>

          <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>
            Escrow Authorized &bull; Order Confirmed
          </span>

          <h1 style={{ fontSize: '2.4rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>
            Thank You for Your Order!
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#574A46', maxWidth: '580px', margin: '0 auto 1.5rem auto' }}>
            Your wholesale crop order <strong>#{order.id}</strong> has been transmitted directly to our provincial growers for harvest allotment and packing.
          </p>

          <div 
            style={{
              display: 'inline-flex',
              gap: '1rem',
              backgroundColor: '#F8F2EB',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              fontSize: '0.875rem'
            }}
          >
            <div>
              <span style={{ color: '#8A7B76', display: 'block' }}>Payment Method:</span>
              <strong style={{ color: '#0C3C2C', textTransform: 'uppercase' }}>{order.paymentMethod}</strong>
            </div>
            <div style={{ borderLeft: '1px solid #DECDBD', paddingLeft: '1rem' }}>
              <span style={{ color: '#8A7B76', display: 'block' }}>Payment Reference:</span>
              <strong style={{ color: '#0C3C2C' }}>{order.paymentReference}</strong>
            </div>
            <div style={{ borderLeft: '1px solid #DECDBD', paddingLeft: '1rem' }}>
              <span style={{ color: '#8A7B76', display: 'block' }}>Total Paid:</span>
              <strong style={{ color: '#0C3C2C', fontSize: '1.05rem' }}>₱{order.grandTotal.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        {/* Individual Seller Orders Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#0C3C2C' }}>
            Consolidated Seller Orders ({order.sellerOrders.length} Shipments)
          </h3>

          {order.sellerOrders.map((so) => (
            <div key={so.orderId} className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #F5EDE2', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#8A7B76', textTransform: 'uppercase', fontWeight: 600 }}>
                    Seller Order Reference: {so.orderId}
                  </span>
                  <h4 style={{ fontSize: '1.15rem', color: '#0C3C2C' }}>{so.farmName}</h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-green">{so.status}</span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#8A7B76', marginTop: '0.2rem' }}>
                    Est. Arrival: {so.estimatedDeliveryDate}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                {so.items.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={it.imageUrl} alt={it.cropName} style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        <strong>{it.cropName}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#8A7B76' }}>
                          {it.quantity} {it.unit} &bull; ₱{it.unitPrice}/{it.unit}
                        </span>
                      </div>
                    </div>
                    <strong>₱{it.subtotal.toFixed(2)}</strong>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F5EDE2', paddingTop: '0.75rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#8A7B76' }}>Fulfillment: Direct Cargo ({so.deliveryType})</span>
                <div>
                  <span>Freight Fee: <strong>₱{so.deliveryFee.toFixed(2)}</strong> &bull; Subtotal: </span>
                  <strong style={{ color: '#0C3C2C', fontSize: '1.05rem' }}>
                    ₱{(so.subtotal + so.deliveryFee).toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            onClick={() => onNavigate('/buyer/orders')}
            className="btn btn-primary btn-lg"
          >
            <Truck size={18} /> View in My Orders
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => onNavigate(`/buyer/orders/${order.id}/invoice`)}
              className="btn btn-outline-warm"
            >
              <Printer size={16} /> Print Official Invoice
            </button>
            <button
              onClick={() => onNavigate('/shop')}
              className="btn btn-secondary"
            >
              Return to Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
