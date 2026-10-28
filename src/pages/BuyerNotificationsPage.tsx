import React, { useState } from 'react';
import {
  Bell,
  Truck,
  FileText,
  TrendingDown,
  ShieldCheck,
  MessageSquare,
  CheckCheck,
  Search,
  Trash2,
  Clock,
  RotateCcw
} from 'lucide-react';
import { useChat } from '../context/ChatContext';

export type BuyerNotificationCategory =
  | 'orders_logistics'
  | 'quotes_escrow'
  | 'price_harvest'
  | 'disputes_support';

export interface BuyerNotificationItem {
  id: string;
  category: BuyerNotificationCategory;
  title: string;
  body: string;
  timestamp: string;
  sortOrder: number;
  isRead: boolean;
  isUrgent?: boolean;
  referenceCode: string;
  farmId?: string;
  farmName?: string;
  primaryActionLabel: string;
  primaryActionRoute: string;
  secondaryActionLabel?: string;
  secondaryActionRoute?: string;
}

export const INITIAL_BUYER_NOTIFICATIONS: BuyerNotificationItem[] = [
  {
    id: 'notif-001',
    category: 'orders_logistics',
    title: 'Order #ORD-2026-8842 is on the way',
    body: 'Your 25kg Red Onions and 5kg Cherry Tomatoes from Santos Agri-Farms are in transit to Biñan. Estimated arrival: Today, 2:00 PM.',
    timestamp: '25 mins ago',
    sortOrder: 100,
    isRead: false,
    isUrgent: true,
    referenceCode: 'ORD-2026-8842',
    farmId: 'farm-001',
    farmName: 'Santos Agri-Farms',
    primaryActionLabel: 'Track Order',
    primaryActionRoute: '/buyer/orders/ORD-2026-8842/tracking'
  },
  {
    id: 'notif-002',
    category: 'quotes_escrow',
    title: 'New price quote received for 500kg Red Onions',
    body: 'Santos Agri-Farms offered ₱105/kg (down from ₱120/kg) for your bulk request #QT-2026-041.',
    timestamp: '2 hours ago',
    sortOrder: 95,
    isRead: false,
    isUrgent: true,
    referenceCode: 'QT-2026-041',
    farmId: 'farm-001',
    farmName: 'Santos Agri-Farms',
    primaryActionLabel: 'View Quote',
    primaryActionRoute: '/buyer/quotes'
  },
  {
    id: 'notif-003',
    category: 'quotes_escrow',
    title: 'Payment pending for Order #ORD-2026-8850',
    body: 'Your 150kg Highland Cabbage order (₱9,000.00) with Benguet Highland Growers Coop is waiting for bank transfer confirmation.',
    timestamp: '4 hours ago',
    sortOrder: 90,
    isRead: false,
    isUrgent: false,
    referenceCode: 'ORD-2026-8850',
    farmId: 'farm-002',
    farmName: 'Benguet Highland Growers Coop',
    primaryActionLabel: 'View Invoice',
    primaryActionRoute: '/buyer/orders/ORD-2026-8850/invoice'
  },
  {
    id: 'notif-004',
    category: 'disputes_support',
    title: 'Refund of ₱240.00 approved for Order #ORD-2026-8842',
    body: 'Farmer Ramon Santos approved your 2kg weight adjustment claim (#ISS-2026-019).',
    timestamp: 'Yesterday',
    sortOrder: 80,
    isRead: false,
    isUrgent: false,
    referenceCode: 'ISS-2026-019',
    farmId: 'farm-001',
    farmName: 'Santos Agri-Farms',
    primaryActionLabel: 'View Details',
    primaryActionRoute: '/buyer/orders/ORD-2026-8842/issue'
  },
  {
    id: 'notif-005',
    category: 'price_harvest',
    title: 'Price Drop: Highland Cabbage is now ₱40/kg',
    body: 'Benguet Highland Growers Coop lowered their bulk price for Scorpio F1 Highland Cabbage.',
    timestamp: 'Yesterday',
    sortOrder: 75,
    isRead: true,
    isUrgent: false,
    referenceCode: 'CROP-004',
    farmId: 'farm-002',
    farmName: 'Benguet Highland Growers Coop',
    primaryActionLabel: 'View Crop',
    primaryActionRoute: '/crops/crop-004'
  },
  {
    id: 'notif-006',
    category: 'orders_logistics',
    title: 'Order #ORD-2026-9500 confirmed by sellers',
    body: 'Santos Agri-Farms (10kg Native Tomatoes) and Benguet Coop (5kg Cabbage) confirmed your ₱950.00 order.',
    timestamp: '23 Oct 2026',
    sortOrder: 70,
    isRead: true,
    isUrgent: false,
    referenceCode: 'ORD-2026-9500',
    farmId: 'farm-001',
    farmName: 'Santos Agri-Farms & Benguet Coop',
    primaryActionLabel: 'View Order',
    primaryActionRoute: '/orders/ORD-2026-9500/confirmation'
  }
];

interface BuyerNotificationsPageProps {
  notifications: BuyerNotificationItem[];
  onUpdateNotifications: (updated: BuyerNotificationItem[]) => void;
  onNavigate: (route: string) => void;
}

export const BuyerNotificationsPage: React.FC<BuyerNotificationsPageProps> = ({
  notifications,
  onUpdateNotifications,
  onNavigate
}) => {
  const { unreadCount: unreadMessagesCount } = useChat();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const handleToggleRead = (id: string) => {
    onUpdateNotifications(
      notifications.map(n => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    onUpdateNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: string) => {
    onUpdateNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(item => {
    if (filter === 'unread' && item.isRead) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.body.toLowerCase().includes(q) ||
        item.referenceCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getIcon = (category: BuyerNotificationCategory) => {
    switch (category) {
      case 'orders_logistics':
        return { icon: <Truck size={18} />, bg: '#E2ECE5', color: '#0C3C2C', label: 'Order Update' };
      case 'quotes_escrow':
        return { icon: <FileText size={18} />, bg: '#FEF3E2', color: '#A36009', label: 'Quote & Payment' };
      case 'price_harvest':
        return { icon: <TrendingDown size={18} />, bg: '#E8F5EE', color: '#1B7A43', label: 'Price Alert' };
      case 'disputes_support':
        return { icon: <ShieldCheck size={18} />, bg: '#FCEBE6', color: '#9B3C1B', label: 'Refund & Support' };
    }
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem 0' }}>
      <div className="container">
        {/* Header Breadcrumb & Title matching BuyerOrdersPage */}
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#9B3C1B',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          MEMBER DASHBOARD
        </span>
        <h1 style={{ fontSize: '2.4rem', color: '#0C3C2C', marginBottom: '1.5rem', marginTop: '0.25rem' }}>
          Notifications
        </h1>

        {/* Exact Same Tab Bar as My Orders Page */}
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
          {/* Left Navigation Tabs */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('/buyer/orders')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#8A7B76',
                borderBottom: '3px solid transparent',
                paddingBottom: '0.75rem',
                marginBottom: '-2px'
              }}
            >
              Active Orders
            </button>

            <button
              onClick={() => onNavigate('/buyer/orders?tab=history')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#8A7B76',
                borderBottom: '3px solid transparent',
                paddingBottom: '0.75rem',
                marginBottom: '-2px'
              }}
            >
              Order History
            </button>

            <button
              onClick={() => onNavigate('/buyer/messages')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#8A7B76',
                borderBottom: '3px solid transparent',
                paddingBottom: '0.75rem',
                marginBottom: '-2px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <MessageSquare size={16} />
              Messages
              {unreadMessagesCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#9B3C1B',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    borderRadius: '10px',
                    padding: '0.1rem 0.45rem',
                    lineHeight: 1
                  }}
                >
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('/buyer/notifications')}
              style={{
                fontFamily: 'var(--font-headings)',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#0C3C2C',
                borderBottom: '3px solid #D48216',
                paddingBottom: '0.75rem',
                marginBottom: '-2px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <Bell size={16} />
              Notifications
              {unreadNotificationsCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#D48216',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    borderRadius: '10px',
                    padding: '0.1rem 0.45rem',
                    lineHeight: 1
                  }}
                >
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          </div>

          {/* Right Controls: Simple Search, All/Unread Filter & Mark All Read */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={15}
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#8A7B76'
                }}
              />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
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

            <select
              value={filter}
              onChange={e => setFilter(e.target.value as 'all' | 'unread')}
              style={{
                padding: '0.4rem 0.75rem',
                fontSize: '0.85rem',
                width: 'auto',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="all">All ({notifications.length})</option>
              <option value="unread">Unread ({unreadNotificationsCount})</option>
            </select>

            {unreadNotificationsCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="btn btn-outline-warm btn-sm"
                style={{ backgroundColor: '#FFFFFF', fontSize: '0.8rem' }}
              >
                <CheckCheck size={14} /> Mark all read
              </button>
            )}
          </div>
        </div>

        {/* Simple, Easy-to-Understand Notification List */}
        {filteredNotifications.length === 0 ? (
          <div
            className="card"
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px'
            }}
          >
            <Bell size={28} color="#8A7B76" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#0C3C2C', marginBottom: '0.35rem' }}>
              No notifications found
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#8A7B76', marginBottom: '1.25rem' }}>
              You're all caught up on your orders and price updates.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter('all');
                setSearchQuery('');
                if (notifications.length === 0) {
                  onUpdateNotifications(INITIAL_BUYER_NOTIFICATIONS);
                }
              }}
              className="btn btn-outline-warm btn-sm"
            >
              <RotateCcw size={14} /> Reset Notifications
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredNotifications.map(item => {
              const meta = getIcon(item.category);

              return (
                <div
                  key={item.id}
                  className="card"
                  style={{
                    padding: '1.35rem 1.5rem',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    borderLeft: item.isRead ? '1px solid #DECDBD' : '4px solid #D48216',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.25rem',
                    flexWrap: 'wrap'
                  }}
                >
                  {/* Left: Icon + Simple Text */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '260px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: meta.bg,
                        color: meta.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      {meta.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: meta.color,
                            backgroundColor: meta.bg,
                            padding: '0.15rem 0.55rem',
                            borderRadius: '999px'
                          }}
                        >
                          {meta.label}
                        </span>

                        <span style={{ fontSize: '0.78rem', color: '#8A7B76', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={12} /> {item.timestamp}
                        </span>

                        {!item.isRead && (
                          <span
                            style={{
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              color: '#D48216'
                            }}
                          >
                            &bull; New
                          </span>
                        )}
                      </div>

                      <h3
                        style={{
                          fontSize: '1.05rem',
                          color: '#0C3C2C',
                          fontWeight: item.isRead ? 600 : 700,
                          marginBottom: '0.25rem'
                        }}
                      >
                        {item.title}
                      </h3>

                      <p style={{ fontSize: '0.875rem', color: '#574A46', margin: 0 }}>
                        {item.body}
                      </p>
                    </div>
                  </div>

                  {/* Right: Simple Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (!item.isRead) handleToggleRead(item.id);
                        onNavigate(item.primaryActionRoute);
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      {item.primaryActionLabel}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleRead(item.id)}
                      className="btn btn-outline-warm btn-sm"
                      style={{ fontSize: '0.78rem' }}
                    >
                      {item.isRead ? 'Mark Unread' : 'Mark Read'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      style={{
                        color: '#8A7B76',
                        padding: '0.4rem',
                        borderRadius: '6px'
                      }}
                      title="Remove notification"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
