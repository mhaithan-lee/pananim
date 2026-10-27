import React from 'react';
import { AlertTriangle, Lock, ShieldAlert, RefreshCw, ArrowLeft, Home } from 'lucide-react';

interface ErrorPageProps {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<ErrorPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '5rem 0 7rem 0', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div style={{ fontSize: '4.5rem', fontWeight: 800, color: '#0C3C2C', fontFamily: 'var(--font-headings)' }}>
          404
        </div>
        <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C', marginBottom: '0.75rem' }}>Harvest Not Found</h2>
        <p style={{ color: '#574A46', marginBottom: '2rem' }}>
          The page or crop listing you requested does not exist or may have been archived by the farmer.
        </p>
        <button onClick={() => onNavigate('/')} className="btn btn-primary btn-lg">
          <Home size={18} /> Return to Homepage
        </button>
      </div>
    </div>
  );
};

export const ForbiddenPage: React.FC<ErrorPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '5rem 0 7rem 0', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#FCEBE6', color: '#9B3C1B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <Lock size={36} />
        </div>
        <span className="badge badge-terracotta" style={{ marginBottom: '0.5rem' }}>403 Forbidden</span>
        <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C', marginBottom: '0.75rem' }}>Restricted Access Area</h2>
        <p style={{ color: '#574A46', marginBottom: '2rem' }}>
          This route requires elevated staff compliance permissions. Ordinary buyer or farmer accounts cannot view private verification documents.
        </p>
        <button onClick={() => onNavigate('/')} className="btn btn-secondary">
          Return to Public Marketplace
        </button>
      </div>
    </div>
  );
};

export const ServiceUnavailablePage: React.FC<ErrorPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '5rem 0 7rem 0', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '540px' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#FEF3E2', color: '#D48216', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <RefreshCw size={36} />
        </div>
        <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Temporary Interruption</span>
        <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C', marginBottom: '0.75rem' }}>Service Temporarily Unavailable</h2>
        <p style={{ color: '#574A46', marginBottom: '2rem' }}>
          Our agricultural pricing feed or transport dispatcher is undergoing scheduled maintenance. Your session and cart data are safely preserved locally.
        </p>
        <button onClick={() => onNavigate('/shop')} className="btn btn-primary">
          <RefreshCw size={16} /> Retry Connection
        </button>
      </div>
    </div>
  );
};

export const SessionExpiredPage: React.FC<ErrorPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '5rem 0 7rem 0', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <ShieldAlert size={36} />
        </div>
        <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C', marginBottom: '0.75rem' }}>Session Expired</h2>
        <p style={{ color: '#574A46', marginBottom: '2rem' }}>
          For security and financial protection, inactive sessions are automatically refreshed. Please sign in to resume your pending order.
        </p>
        <button onClick={() => onNavigate('/login')} className="btn btn-primary btn-lg">
          Sign In Again
        </button>
      </div>
    </div>
  );
};

export const OrderNotFoundPage: React.FC<{ orderId?: string; onNavigate: (route: string) => void }> = ({
  orderId,
  onNavigate
}) => {
  return (
    <div style={{ padding: '5rem 0 7rem 0', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#FEF3E2', color: '#D48216', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <AlertTriangle size={36} />
        </div>
        <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Order Not Found</span>
        <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C', marginBottom: '0.75rem' }}>
          Could Not Find Order
        </h2>
        <p style={{ color: '#574A46', marginBottom: '2rem' }}>
          Order {orderId ? `"${orderId}"` : 'referenced'} does not exist in your account history or may belong to another session.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => onNavigate('/buyer/orders')} className="btn btn-primary">
            View All My Orders
          </button>
          <button onClick={() => onNavigate('/shop')} className="btn btn-outline-warm">
            Return to Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};

export const CropNotFoundPage: React.FC<{ cropId?: string; onNavigate: (route: string) => void }> = ({
  cropId,
  onNavigate
}) => {
  return (
    <div style={{ padding: '5rem 0 7rem 0', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌱</div>
        <span className="badge badge-terracotta" style={{ marginBottom: '0.5rem' }}>Listing Unavailable</span>
        <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C', marginBottom: '0.75rem' }}>
          Crop Listing Not Found
        </h2>
        <p style={{ color: '#574A46', marginBottom: '2rem' }}>
          The harvest listing {cropId ? `"${cropId}"` : 'requested'} is currently unavailable, out of stock, or has concluded its harvest season.
        </p>
        <button onClick={() => onNavigate('/shop')} className="btn btn-primary btn-lg">
          Browse Available Harvests
        </button>
      </div>
    </div>
  );
};
