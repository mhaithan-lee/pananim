import React, { useState } from 'react';
import { OrderGroup, CropListing } from '../../types';
import { 
  ShoppingBag, 
  Truck, 
  TrendingUp, 
  Search, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Eye,
  ChevronRight
} from 'lucide-react';

interface FarmerOrdersPageProps {
  orders: OrderGroup[];
  cropListings: CropListing[];
  onNavigate: (route: string) => void;
}

export const FarmerOrdersPage: React.FC<FarmerOrdersPageProps> = ({
  orders,
  cropListings,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'requests' | 'pickups' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [approvedOrderIds, setApprovedOrderIds] = useState<string[]>([]);

  const handleApprove = (orderId: string) => {
    setApprovedOrderIds([...approvedOrderIds, orderId]);
    setToastMessage(`Order #${orderId} approved and staged for dispatch!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleConfirmPickup = (orderId: string) => {
    setToastMessage(`Order #${orderId} marked as picked up by buyer.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const pendingCount = orders.filter(o => o.sellerOrders?.some(so => so.status === 'Awaiting Confirmation' || so.status === 'Confirmed')).length || 5;

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5E6E64' }}>
          <span onClick={() => onNavigate('/farmer/dashboard')} style={{ cursor: 'pointer', color: '#0C3C2C', fontWeight: 600 }}>Overview</span>
          <span>&rsaquo;</span>
          <span style={{ color: '#1D2D24', fontWeight: 600 }}>Farmer Sales & Orders</span>
        </div>
        <button
          onClick={() => onNavigate('/farmer/dashboard')}
          style={{ background: 'none', border: 'none', color: '#0C3C2C', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          &larr; Back to Overview
        </button>
      </div>

      {/* Title and Top Export CTA matching Farmer Sales · Pananim.png */}
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
            My Orders &amp; Sales
          </h1>
          <p style={{ color: '#5E6E64', maxWidth: '650px', margin: 0 }}>
            Track wholesale sales performance and manage restaurant and supermarket procurement requests.
          </p>
        </div>

        <button
          onClick={() => {
            setToastMessage('Exporting sales report CSV for tax and bookkeeping...');
            setTimeout(() => setToastMessage(''), 3000);
          }}
          className="farmer-btn-secondary"
        >
          <Download size={16} /> Export Sales Report
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

      {/* 3 Metric Stat Cards strictly matching Farmer Sales · Pananim.png */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}
      >
        {/* Card 1: Total Sales */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">TOTAL SALES VOLUME</span>
            <div className="farmer-stat-icon-wrapper" style={{ backgroundColor: '#E8F5EE', color: '#1B7A43' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.2rem 0' }}>
            <span className="farmer-stat-value" style={{ margin: 0 }}>
              ₱284,500
            </span>
            <span style={{ fontSize: '0.85rem', color: '#1B7A43', fontWeight: 600 }}>+18% this month</span>
          </div>
        </div>

        {/* Card 2: Orders Received */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">TOTAL ORDERS</span>
            <div className="farmer-stat-icon-wrapper">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.2rem 0' }}>
            <span className="farmer-stat-value" style={{ margin: 0 }}>
              {orders.length + 8}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#5E6E64' }}>fulfilled via Pananim escrow</span>
          </div>
        </div>

        {/* Card 3: Pending Action */}
        <div className="farmer-stat-card">
          <div className="farmer-stat-header">
            <span className="farmer-stat-label">AWAITING ACTION</span>
            <div className="farmer-stat-icon-wrapper" style={{ backgroundColor: '#FEF3E2', color: '#D48216' }}>
              <Clock size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.2rem 0' }}>
            <span className="farmer-stat-value" style={{ margin: 0 }}>
              {pendingCount}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#D48216', fontWeight: 600 }}>needs dispatch confirmation</span>
          </div>
        </div>
      </div>

      {/* Main Table Card Container */}
      <div className="farmer-card" style={{ padding: '2rem' }}>
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
              All Orders
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0 0 0.5rem 0',
                fontSize: '0.95rem',
                fontWeight: activeTab === 'requests' ? 700 : 500,
                color: activeTab === 'requests' ? '#0C3C2C' : '#5E6E64',
                borderBottom: activeTab === 'requests' ? '2px solid #0C3C2C' : 'none',
                cursor: 'pointer'
              }}
            >
              Pending Confirmation ({pendingCount})
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by buyer or order ID..."
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
        </div>

        {/* Orders Table */}
        <div className="farmer-table-container">
          <table className="farmer-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Buyer / Client</th>
                <th>Crop Items</th>
                <th>Total Value</th>
                <th>Fulfillment</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => {
                const isApproved = approvedOrderIds.includes(order.id);
                const sellerOrder = order.sellerOrders?.[0];
                const firstItem = sellerOrder?.items?.[0];
                return (
                  <tr key={order.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0C3C2C' }}>{order.id}</div>
                      <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>{order.createdAt || '23 Oct 2026'}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#1D2D24' }}>{order.buyerName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>Institutional Buyer</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0C3C2C' }}>
                        {sellerOrder?.items?.length || 1} crops ({firstItem?.quantity || 50} kg)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>
                        {firstItem?.cropName || 'Red Onions, Native Grade'}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '1rem' }}>
                        ₱{order.grandTotal.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: '#1B7A43' }}>Escrow Guaranteed</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem', color: '#1D2D24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Truck size={14} color="#D48216" /> Farm Gate Pickup
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#5E6E64' }}>Delivery Slot: Tomorrow Morning</div>
                    </td>
                    <td>
                      <span className={`farmer-badge ${isApproved ? 'green' : idx === 0 ? 'orange' : 'green'}`}>
                        {isApproved ? 'Ready for Dispatch' : idx === 0 ? 'Awaiting Schedule' : 'Confirmed'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        {!isApproved && idx === 0 ? (
                          <button
                            onClick={() => handleApprove(order.id)}
                            className="farmer-btn-primary"
                            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                          >
                            Approve &amp; Schedule
                          </button>
                        ) : (
                          <button
                            onClick={() => handleConfirmPickup(order.id)}
                            className="farmer-btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                          >
                            Confirm Pickup
                          </button>
                        )}
                        <button
                          onClick={() => onNavigate(`/orders/${order.id}/confirmation`)}
                          className="farmer-btn-forest"
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          View Bill
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
    </div>
  );
};
