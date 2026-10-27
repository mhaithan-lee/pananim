import React, { useState, useEffect } from 'react';
import { 
  User, 
  Role, 
  CropListing, 
  CartItem, 
  OrderGroup, 
  Farm, 
  MarketPriceRecord, 
  CropReview, 
  VerificationApplication 
} from './types';
import { 
  currentUserBuyer, 
  currentUserFarmer, 
  currentUserStaff, 
  mockCropListings, 
  mockFarms, 
  mockMarketPrices, 
  mockOrders, 
  mockReviews, 
  mockVerificationApplications 
} from './data/mockData';

// Components
import { DevScenarioBar } from './components/DevScenarioBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatDrawer } from './components/ChatDrawer';
import { ChatProvider } from './context/ChatContext';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CropDetailPage } from './pages/CropDetailPage';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { FarmersPage, FarmerStorefrontPage } from './pages/FarmersPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { BuyerOrdersPage } from './pages/BuyerOrdersPage';
import { BuyerProfilePage } from './pages/BuyerProfilePage';
// Redesigned Farmer Workspace Components (from /farmer PNG references)
import { FarmerLayout } from './farmer/FarmerLayout';
import { FarmerDashboardPage } from './farmer/pages/FarmerDashboardPage';
import { FarmerCropsPage } from './farmer/pages/FarmerCropsPage';
import { FarmerCropDetailPage } from './farmer/pages/FarmerCropDetailPage';
import { FarmerOrdersPage } from './farmer/pages/FarmerOrdersPage';
import { FarmerWalletPage } from './farmer/pages/FarmerWalletPage';
import { FarmerMessagesPage } from './farmer/pages/FarmerMessagesPage';
import { FarmerVerificationPage } from './farmer/pages/FarmerVerificationPage';
import { FarmerInfoPage } from './farmer/pages/FarmerInfoPage';
import { FarmerNewListingPage } from './farmer/pages/FarmerNewListingPage';

// Redesigned Admin Console Components (from /admin PNG references)
import { AdminLayout } from './admin/AdminLayout';
import { AdminOverviewPage } from './admin/pages/AdminOverviewPage';
import { AdminCropListingsPage } from './admin/pages/AdminCropListingsPage';
import { AdminFarmersBuyersPage } from './admin/pages/AdminFarmersBuyersPage';
import { AdminTransactionsPage } from './admin/pages/AdminTransactionsPage';
import { AdminDisputesPage } from './admin/pages/AdminDisputesPage';
import { AdminMarketPricesPage } from './admin/pages/AdminMarketPricesPage';
import { AdminAuditLogPage } from './admin/pages/AdminAuditLogPage';
import { AdminSettingsPage } from './admin/pages/AdminSettingsPage';
import { AdminLoginPage } from './admin/pages/AdminLoginPage';
import { 
  InvoicePage, 
  OrderTrackingPage, 
  IssueReportPage, 
  QuotesPage, 
  ReviewsHubPage, 
  DeliveriesTrackingHubPage 
} from './pages/OperationalPages';
import { 
  HowItWorksPage, 
  SellWithPananimPage, 
  DeliveryCoveragePage, 
  AboutPage, 
  HelpPage, 
  ContactPage, 
  PoliciesPage 
} from './pages/InformationPages';
import { 
  LoginPage, 
  RegisterPage, 
  BuyerRegisterPage, 
  VerifyContactPage 
} from './pages/AuthPages';
import { 
  NotFoundPage, 
  ForbiddenPage, 
  ServiceUnavailablePage, 
  SessionExpiredPage 
} from './pages/ErrorPages';
import { MessagesInboxPage } from './pages/MessagesInboxPage';

export const App: React.FC = () => {
  // Application State
  const [currentRole, setCurrentRole] = useState<Role>('buyer');
  const [currentUser, setCurrentUser] = useState<User | null>(currentUserBuyer);
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [cropListings, setCropListings] = useState<CropListing[]>(mockCropListings);
  const [farms, setFarms] = useState<Farm[]>(mockFarms);
  const [orders, setOrders] = useState<OrderGroup[]>(mockOrders);
  const [reviews, setReviews] = useState<CropReview[]>(mockReviews);
  const [applications, setApplications] = useState<VerificationApplication[]>(mockVerificationApplications);

  // Cart State (Preloaded with Santos Farms delivery items for rich initial realism)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      listingId: 'crop-001',
      crop: mockCropListings[0], // Red Onions
      quantity: 25,
      selectedTierPrice: 120,
      subtotal: 3000,
      fulfillmentType: 'delivery'
    },
    {
      id: 'cart-2',
      listingId: 'crop-002',
      crop: mockCropListings[1], // Cherry Tomatoes
      quantity: 5,
      selectedTierPrice: 85,
      subtotal: 425,
      fulfillmentType: 'delivery'
    }
  ]);

  // Synchronize browser history / popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState(null, '', route);
    } catch (e) {
      // Fallback in some iframe or file preview contexts
    }
  };

  // Switch persona handler
  const handleSwitchRole = (role: Role) => {
    setCurrentRole(role);
    if (role === 'buyer') {
      setCurrentUser(currentUserBuyer);
    } else if (role === 'farmer') {
      setCurrentUser(currentUserFarmer);
    } else if (role === 'staff') {
      setCurrentUser(currentUserStaff);
      navigate('/admin');
    } else {
      setCurrentUser(null);
    }
  };

  // Worked Demo ₱950 calculation loader (Section 9 Prompt Spec)
  const handleLoadWorkedExample950 = () => {
    const tomatoes = mockCropListings.find(c => c.id === 'crop-009') || mockCropListings[8];
    const cabbage = mockCropListings.find(c => c.id === 'crop-004') || mockCropListings[3];

    const workedCart: CartItem[] = [
      {
        id: 'worked-1',
        listingId: tomatoes.id,
        crop: tomatoes,
        quantity: 10, // 10kg qualifies for ₱55/kg = ₱550
        selectedTierPrice: 55,
        subtotal: 550,
        fulfillmentType: 'delivery'
      },
      {
        id: 'worked-2',
        listingId: cabbage.id,
        crop: cabbage,
        quantity: 5, // 5kg @ ₱40/kg = ₱200
        selectedTierPrice: 40,
        subtotal: 200,
        fulfillmentType: 'delivery'
      }
    ];

    setCartItems(workedCart);
    navigate('/cart');
  };

  // Add to cart
  const handleAddToCart = (crop: CropListing, quantity: number) => {
    const existing = cartItems.find(it => it.listingId === crop.id);
    const activeTier = [...crop.priceTiers].reverse().find(t => quantity >= t.minQuantity) || crop.priceTiers[0];
    const tierPrice = activeTier ? activeTier.pricePerUnit : crop.pricePerUnit;

    if (existing) {
      const newQty = existing.quantity + quantity;
      setCartItems(cartItems.map(it => it.id === existing.id ? {
        ...it,
        quantity: newQty,
        selectedTierPrice: tierPrice,
        subtotal: newQty * tierPrice
      } : it));
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        listingId: crop.id,
        crop,
        quantity,
        selectedTierPrice: tierPrice,
        subtotal: quantity * tierPrice,
        fulfillmentType: 'delivery'
      };
      setCartItems([...cartItems, newItem]);
    }

    navigate('/cart');
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    setCartItems(cartItems.map(it => {
      if (it.id === itemId) {
        return {
          ...it,
          quantity: newQty,
          subtotal: newQty * it.selectedTierPrice
        };
      }
      return it;
    }));
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems(cartItems.filter(it => it.id !== itemId));
  };

  const handlePlaceOrder = (newOrder: OrderGroup) => {
    setOrders([newOrder, ...orders]);
    setCartItems([]);
  };

  const handleUpdateCropStock = (cropId: string, newStock: number) => {
    setCropListings(cropListings.map(c => c.id === cropId ? { ...c, availableStock: newStock } : c));
  };

  const handleAddListing = (listing: CropListing) => {
    setCropListings([listing, ...cropListings]);
  };

  const handleUpdateApplicationStatus = (appId: string, status: VerificationApplication['status'], notes?: string) => {
    setApplications(applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status,
          reviewerNotes: notes || app.reviewerNotes,
          reviewedDate: '24 Oct 2026',
          auditTrail: [
            ...app.auditTrail,
            { action: `Status changed to ${status}`, actor: currentUser?.name || 'Staff Reviewer', timestamp: '24 Oct 2026' }
          ]
        };
      }
      return app;
    }));

    // If approved, update farmer's verification badge!
    if (status === 'approved') {
      const app = applications.find(a => a.id === appId);
      if (app) {
        setFarms(farms.map(f => f.id === app.farmerId ? { ...f, verificationStatus: 'verified' } : f));
        setCropListings(cropListings.map(c => c.farmId === app.farmerId ? { ...c, isVerifiedFarmer: true } : c));
      }
    }
  };

  // Route Renderer
  const renderRoute = () => {
    // Exact or pattern matched routes
    if (currentRoute === '/') {
      return (
        <HomePage 
          cropListings={cropListings} 
          farms={farms} 
          onNavigate={navigate} 
          onAddToCart={handleAddToCart} 
        />
      );
    }

    if (currentRoute === '/shop' || currentRoute.startsWith('/shop?')) {
      const urlParams = new URLSearchParams(currentRoute.split('?')[1] || '');
      return (
        <ShopPage 
          cropListings={cropListings} 
          onNavigate={navigate} 
          onAddToCart={handleAddToCart}
          initialCategory={urlParams.get('category') || ''}
          initialSearch={urlParams.get('q') || ''}
        />
      );
    }

    if (currentRoute.startsWith('/crops/')) {
      const cropId = currentRoute.replace('/crops/', '');
      const crop = cropListings.find(c => c.id === cropId) || cropListings[0];
      const farm = farms.find(f => f.id === crop.farmId) || farms[0];
      return (
        <CropDetailPage 
          crop={crop} 
          farm={farm} 
          reviews={reviews} 
          onNavigate={navigate} 
          onAddToCart={handleAddToCart} 
          onOpenQuoteModal={() => navigate('/buyer/quotes')}
        />
      );
    }

    if (currentRoute === '/market-prices') {
      return (
        <MarketPricesPage 
          priceRecords={mockMarketPrices} 
          onNavigate={navigate} 
        />
      );
    }

    if (currentRoute === '/farmers') {
      return (
        <FarmersPage 
          farms={farms} 
          onNavigate={navigate} 
        />
      );
    }

    if (currentRoute.startsWith('/farmers/')) {
      const farmId = currentRoute.replace('/farmers/', '');
      const farm = farms.find(f => f.id === farmId) || farms[0];
      return (
        <FarmerStorefrontPage 
          farm={farm} 
          listings={cropListings} 
          onNavigate={navigate} 
          onAddToCart={handleAddToCart} 
        />
      );
    }

    if (currentRoute === '/cart') {
      return (
        <CartPage 
          cartItems={cartItems} 
          onUpdateQuantity={handleUpdateQuantity} 
          onRemoveItem={handleRemoveCartItem} 
          onNavigate={navigate} 
          onLoadWorkedExample={handleLoadWorkedExample950}
        />
      );
    }

    if (currentRoute.startsWith('/checkout')) {
      let activeStep: 1 | 2 | 3 | 4 = 1;
      if (currentRoute === '/checkout/delivery') activeStep = 2;
      if (currentRoute === '/checkout/payment') activeStep = 3;
      if (currentRoute === '/checkout/review') activeStep = 4;

      return (
        <CheckoutPage 
          cartItems={cartItems} 
          currentUser={currentUser} 
          onNavigate={navigate} 
          onPlaceOrder={handlePlaceOrder}
          activeStep={activeStep}
        />
      );
    }

    if (currentRoute.startsWith('/orders/') && currentRoute.includes('/confirmation')) {
      const order = orders[0];
      return <OrderConfirmationPage order={order} onNavigate={navigate} />;
    }

    if (currentRoute === '/buyer/orders' || currentRoute === '/buyer/dashboard') {
      return (
        <BuyerOrdersPage 
          orders={orders} 
          onNavigate={navigate} 
          onTrackOrder={(orderId) => navigate(`/buyer/orders/${orderId}/tracking`)}
        />
      );
    }

    if (currentRoute.startsWith('/buyer/orders/') && currentRoute.includes('/tracking')) {
      const order = orders[0];
      return <OrderTrackingPage order={order} onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/buyer/orders/') && currentRoute.includes('/invoice')) {
      const order = orders[0];
      return <InvoicePage order={order} onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/buyer/orders/') && currentRoute.includes('/issue')) {
      const order = orders[0];
      return <IssueReportPage order={order} onNavigate={navigate} />;
    }

    if (currentRoute === '/buyer/profile' || currentRoute === '/buyer/addresses') {
      return <BuyerProfilePage currentUser={currentUser} onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/farmer')) {
      return renderFarmerRoute();
    }

    if (currentRoute === '/buyer/quotes') {
      return <QuotesPage isFarmer={false} onNavigate={navigate} />;
    }

    if (currentRoute === '/buyer/reviews') {
      return <ReviewsHubPage isFarmer={false} onNavigate={navigate} />;
    }

    if (currentRoute === '/buyer/deliveries') {
      return <DeliveriesTrackingHubPage isFarmer={false} onNavigate={navigate} />;
    }

    if (currentRoute === '/buyer/messages') {
      return <MessagesInboxPage isFarmer={false} onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/staff/verifications')) {
      return (
        <AdminFarmersBuyersPage 
          farms={farms} 
          applications={applications} 
          onNavigate={navigate} 
          onUpdateFarm={(updatedFarm) => {
            setFarms(farms.map(f => f.id === updatedFarm.id ? updatedFarm : f));
          }}
        />
      );
    }

    // Informational pages
    if (currentRoute === '/how-it-works') return <HowItWorksPage onNavigate={navigate} />;
    if (currentRoute === '/sell-with-pananim') return <SellWithPananimPage onNavigate={navigate} />;
    if (currentRoute === '/delivery-coverage') return <DeliveryCoveragePage onNavigate={navigate} />;
    if (currentRoute === '/about') return <AboutPage onNavigate={navigate} />;
    if (currentRoute === '/help') return <HelpPage onNavigate={navigate} />;
    if (currentRoute === '/contact') return <ContactPage onNavigate={navigate} />;
    if (currentRoute.startsWith('/policies')) return <PoliciesPage onNavigate={navigate} />;

    // Auth pages
    if (currentRoute === '/login') return <LoginPage onNavigate={navigate} onLoginSuccess={(u) => { setCurrentUser(u); setCurrentRole('buyer'); }} />;
    if (currentRoute === '/register') return <RegisterPage onNavigate={navigate} />;
    if (currentRoute === '/register/buyer') return <BuyerRegisterPage onNavigate={navigate} />;
    if (currentRoute === '/register/farmer') return <FarmerVerificationPage currentUser={currentUser} onNavigate={navigate} onSubmitApplication={(app) => setApplications([app, ...applications])} />;
    if (currentRoute === '/verify-contact') return <VerifyContactPage onNavigate={navigate} />;
    if (currentRoute === '/forgot-password') return <LoginPage onNavigate={navigate} onLoginSuccess={(u) => { setCurrentUser(u); setCurrentRole('buyer'); }} />;

    // Error pages
    if (currentRoute === '/403') return <ForbiddenPage onNavigate={navigate} />;
    if (currentRoute === '/service-unavailable') return <ServiceUnavailablePage onNavigate={navigate} />;
    if (currentRoute === '/session-expired') return <SessionExpiredPage onNavigate={navigate} />;

    return <NotFoundPage onNavigate={navigate} />;
  };

  // Redesigned Farmer Route Renderer strictly utilizing PNG reference screens from /farmer
  const renderFarmerRoute = () => {
    if (currentRoute === '/farmer' || currentRoute === '/farmer/dashboard') {
      return (
        <FarmerDashboardPage 
          cropListings={cropListings} 
          farms={farms} 
          orders={orders} 
          applications={applications} 
          onNavigate={navigate} 
          onUpdateCropStock={handleUpdateCropStock}
        />
      );
    }

    if (currentRoute === '/farmer/inventory' || currentRoute === '/farmer/crops') {
      return (
        <FarmerCropsPage 
          crops={cropListings} 
          onNavigate={navigate} 
          onUpdateCropStock={handleUpdateCropStock} 
        />
      );
    }

    if (currentRoute.startsWith('/farmer/crops/')) {
      const cropId = currentRoute.replace('/farmer/crops/', '');
      return (
        <FarmerCropDetailPage 
          cropId={cropId} 
          cropListings={cropListings} 
          farms={farms} 
          reviews={reviews} 
          onNavigate={navigate}
          onUpdateCropStock={handleUpdateCropStock}
        />
      );
    }

    if (currentRoute === '/farmer/inventory/new') {
      return (
        <FarmerNewListingPage 
          farmer={farms[0]} 
          onNavigate={navigate} 
          onAddListing={handleAddListing} 
        />
      );
    }

    if (currentRoute === '/farmer/orders' || currentRoute === '/farmer/sales') {
      return (
        <FarmerOrdersPage 
          orders={orders} 
          cropListings={cropListings} 
          onNavigate={navigate} 
        />
      );
    }

    if (currentRoute === '/farmer/settlements' || currentRoute === '/farmer/wallet' || currentRoute === '/farmer/transactions') {
      return (
        <FarmerWalletPage onNavigate={navigate} />
      );
    }

    if (currentRoute === '/farmer/messages') {
      return (
        <FarmerMessagesPage onNavigate={navigate} />
      );
    }

    if (currentRoute.startsWith('/farmer/verification')) {
      return (
        <FarmerVerificationPage 
          currentUser={currentUser} 
          onNavigate={navigate} 
          onSubmitApplication={(app) => setApplications([app, ...applications])}
        />
      );
    }

    if (currentRoute === '/farmer/storefront' || currentRoute === '/farmer/profile') {
      return (
        <FarmerInfoPage 
          farm={farms[0]} 
          currentUser={currentUser} 
          onNavigate={navigate} 
        />
      );
    }

    // Default fallback
    return (
      <FarmerDashboardPage 
        cropListings={cropListings} 
        farms={farms} 
        orders={orders} 
        applications={applications} 
        onNavigate={navigate} 
        onUpdateCropStock={handleUpdateCropStock}
      />
    );
  };

  // Redesigned Admin Route Renderer strictly utilizing PNG reference screens from /admin
  const renderAdminRoute = () => {
    if (currentRoute === '/admin' || currentRoute === '/admin/overview' || currentRoute === '/admin/dashboard' || currentRoute === '/staff') {
      return (
        <AdminOverviewPage 
          cropListings={cropListings} 
          farms={farms} 
          orders={orders} 
          applications={applications} 
          onNavigate={navigate} 
          onUpdateCropStock={handleUpdateCropStock}
          onUpdateApplicationStatus={handleUpdateApplicationStatus}
        />
      );
    }

    if (currentRoute.startsWith('/admin/crops')) {
      return (
        <AdminCropListingsPage 
          cropListings={cropListings} 
          onNavigate={navigate} 
          onUpdateCropStock={handleUpdateCropStock} 
        />
      );
    }

    if (currentRoute.startsWith('/admin/farmers') || currentRoute.startsWith('/admin/users') || currentRoute.startsWith('/admin/verifications') || currentRoute.startsWith('/staff/verifications')) {
      return (
        <AdminFarmersBuyersPage 
          farms={farms} 
          applications={applications} 
          onNavigate={navigate} 
          onUpdateFarm={(updatedFarm) => {
            setFarms(farms.map(f => f.id === updatedFarm.id ? updatedFarm : f));
          }}
        />
      );
    }

    if (currentRoute.startsWith('/admin/transactions') || currentRoute.startsWith('/admin/finance')) {
      return (
        <AdminTransactionsPage 
          orders={orders} 
          onNavigate={navigate} 
        />
      );
    }

    if (currentRoute.startsWith('/admin/market-prices')) {
      return (
        <AdminMarketPricesPage onNavigate={navigate} />
      );
    }

    if (currentRoute.startsWith('/admin/reports') || currentRoute.startsWith('/admin/disputes')) {
      return (
        <AdminDisputesPage onNavigate={navigate} />
      );
    }

    if (currentRoute.startsWith('/admin/audit-log')) {
      return (
        <AdminAuditLogPage onNavigate={navigate} />
      );
    }

    if (currentRoute.startsWith('/admin/settings')) {
      return (
        <AdminSettingsPage onNavigate={navigate} />
      );
    }

    // Default fallback to Admin Overview
    return (
      <AdminOverviewPage 
        cropListings={cropListings} 
        farms={farms} 
        orders={orders} 
        applications={applications} 
        onNavigate={navigate} 
        onUpdateCropStock={handleUpdateCropStock}
        onUpdateApplicationStatus={handleUpdateApplicationStatus}
      />
    );
  };

  const isAdminRoute = currentRoute.startsWith('/admin') || currentRoute.startsWith('/staff') || (currentRole === 'staff' && (currentRoute === '/' || currentRoute === '/admin'));
  const isFarmerRoute = currentRoute.startsWith('/farmer') || (currentRole === 'farmer' && (currentRoute === '/' || currentRoute === '/farmer'));

  return (
    <ChatProvider currentUser={currentUser} onNavigate={navigate} farms={farms}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Dev Scenario and Route Navigator Bar */}
        <DevScenarioBar 
          currentRole={currentRole} 
          onSwitchRole={handleSwitchRole} 
          currentRoute={currentRoute} 
          onNavigate={navigate} 
          onLoadWorkedExample950={handleLoadWorkedExample950}
        />

        {currentRoute === '/admin/login' ? (
          <AdminLoginPage 
            onLoginSuccess={(u) => { setCurrentUser(u); setCurrentRole('staff'); }} 
            onNavigate={navigate} 
          />
        ) : isAdminRoute ? (
          <AdminLayout
            currentRoute={currentRoute}
            onNavigate={navigate}
            currentUser={currentUser}
            pendingVerificationsCount={applications.filter(a => a.status === 'submitted' || a.status === 'under_review').length}
            unreadMessagesCount={3}
            onSwitchRole={handleSwitchRole}
            onLogout={() => { setCurrentUser(null); setCurrentRole('guest'); navigate('/'); }}
          >
            {renderAdminRoute()}
          </AdminLayout>
        ) : isFarmerRoute ? (
          <FarmerLayout
            currentRoute={currentRoute}
            onNavigate={navigate}
            currentUser={currentUser}
            unreadMessagesCount={3}
            onSwitchRole={handleSwitchRole}
            onLogout={() => { setCurrentUser(null); setCurrentRole('guest'); navigate('/'); }}
            showHero={currentRoute === '/farmer' || currentRoute === '/farmer/dashboard'}
          >
            {renderFarmerRoute()}
          </FarmerLayout>
        ) : (
          <>
            {/* Main Top Header Navbar matching Screenshot 215453 */}
            <Navbar 
              currentRoute={currentRoute} 
              onNavigate={navigate} 
              currentUser={currentUser} 
              currentRole={currentRole} 
              cartCount={cartItems.length} 
              onLogout={() => { setCurrentUser(null); setCurrentRole('guest'); navigate('/'); }}
            />

            {/* Main Page Body */}
            <main style={{ flex: 1 }}>
              {renderRoute()}
            </main>

            {/* Global Chat with Seller Drawer / Fullscreen Mobile View */}
            <ChatDrawer 
              onNavigate={navigate} 
              onLoginAsBuyer={() => {
                setCurrentUser(currentUserBuyer);
                setCurrentRole('buyer');
              }}
            />

            {/* Brand Footer matching Screenshot 215453 */}
            <Footer onNavigate={navigate} />
          </>
        )}
      </div>
    </ChatProvider>
  );
};
