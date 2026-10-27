import React from 'react';
import { Package, PlusCircle, ShoppingBag, Wallet, RefreshCw, BarChart2 } from 'lucide-react';

interface FarmerHeroBannerProps {
  farmerName?: string;
  farmName?: string;
  activeSection?: string;
  onNavigate: (route: string) => void;
  onOpenUpdateStockModal?: () => void;
}

export const FarmerHeroBanner: React.FC<FarmerHeroBannerProps> = ({
  farmerName = 'Ramon',
  farmName = 'Santos Organic Farms',
  activeSection = 'overview',
  onNavigate,
  onOpenUpdateStockModal
}) => {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#0C3C2C',
        backgroundImage: `linear-gradient(90deg, rgba(7, 39, 28, 0.95) 0%, rgba(12, 60, 44, 0.88) 55%, rgba(12, 60, 44, 0.7) 100%), url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        color: '#FFFFFF',
        padding: '3rem 0 3.5rem 0',
        borderBottom: '3px solid #D48216'
      }}
    >
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px' }}>
        {/* Overline Indicator */}
        <div 
          style={{ 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            letterSpacing: '0.12em', 
            textTransform: 'uppercase', 
            color: '#F8D28A', 
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ width: '20px', height: '2px', backgroundColor: '#D48216', display: 'inline-block' }} />
          FARMER PRODUCER OPERATIONS · {farmName.toUpperCase()}
        </div>

        {/* Heading */}
        <h1 
          style={{ 
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', 
            fontWeight: 800, 
            color: '#FFFFFF', 
            lineHeight: 1.15,
            marginBottom: '0.85rem'
          }}
        >
          Welcome back, {farmerName}!
        </h1>

        {/* Subtitle */}
        <p 
          style={{ 
            fontSize: '1rem', 
            color: '#E2ECE5', 
            maxWidth: '680px', 
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}
        >
          Manage your harvest batches, update warehouse stock, process incoming restaurant orders, and track your wholesale earnings with fair market transparency.
        </p>

        {/* Action Pills */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.75rem', 
            alignItems: 'center' 
          }}
        >
          <button
            onClick={() => onNavigate('/farmer/inventory/new')}
            style={{
              backgroundColor: '#D48216',
              color: '#FFFFFF',
              border: '1px solid #D48216',
              borderRadius: '8px',
              padding: '0.65rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 2px 8px rgba(212, 130, 22, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            <PlusCircle size={16} />
            List New Crop
          </button>

          <button
            onClick={() => onNavigate('/farmer/inventory')}
            style={{
              backgroundColor: 'rgba(7, 39, 28, 0.85)',
              color: '#FFFFFF',
              border: '1px solid #2C5E4E',
              borderRadius: '8px',
              padding: '0.65rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Package size={16} />
            My Crops & Stock
          </button>

          <button
            onClick={() => onNavigate('/farmer/orders')}
            style={{
              backgroundColor: 'rgba(7, 39, 28, 0.85)',
              color: '#FFFFFF',
              border: '1px solid #2C5E4E',
              borderRadius: '8px',
              padding: '0.65rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <ShoppingBag size={16} />
            Wholesale Orders
          </button>

          <button
            onClick={() => onNavigate('/farmer/settlements')}
            style={{
              backgroundColor: 'rgba(7, 39, 28, 0.85)',
              color: '#FFFFFF',
              border: '1px solid #2C5E4E',
              borderRadius: '8px',
              padding: '0.65rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Wallet size={16} />
            Wallet & Earnings
          </button>
        </div>
      </div>
    </div>
  );
};
