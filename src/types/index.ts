export type Role = 'guest' | 'buyer' | 'farmer' | 'staff';

export type BuyerType = 'individual' | 'retailer' | 'wholesaler' | 'market_vendor' | 'other_business';

export type SellerType = 'individual_farmer' | 'cooperative';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  buyerType?: BuyerType;
  businessName?: string;
  sellerType?: SellerType;
  farmId?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

export type CropCategory = 
  | 'Bulb Crop'
  | 'Fruit Vegetable'
  | 'Leafy Vegetable'
  | 'Root Crop'
  | 'Grains'
  | 'Legumes'
  | 'Gourds';

export type PriceTrend = 'Trending Up' | 'Stable' | 'Bargain' | 'Peak Season' | 'Trending Down';

export interface PriceTier {
  minQuantity: number;
  pricePerUnit: number; // in PHP
  label: string;
}

export interface CropListing {
  id: string;
  name: string;
  localName?: string;
  variety: string;
  category: CropCategory;
  description: string;
  imageUrl: string;
  additionalImages?: string[];
  farmId: string;
  farmName: string;
  province: string;
  municipality: string;
  pricePerUnit: number; // in PHP (Centavos math internally)
  unit: 'kg' | 'sack' | 'crate' | 'kaing';
  packWeightKg?: number;
  availableStock: number;
  reservedStock: number;
  minOrderQuantity: number;
  incrementQuantity: number;
  maxOrderQuantity?: number;
  isVerifiedFarmer: boolean;
  harvestDate: string;
  availableFrom: string;
  availabilityStatus: 'Ready for pickup' | 'Harvest in progress' | 'Upcoming harvest' | 'Sold out';
  rating: number;
  reviewCount: number;
  trend: PriceTrend;
  trendChangePct?: number;
  priceTiers: PriceTier[];
  batchLotNumber: string;
  grade: 'Class A' | 'Class B' | 'Standard Wholesale' | 'Export Quality';
  packaging: string;
  handlingLeadTimeDays: number;
  cultivationMethod: 'Good Agricultural Practices (GAP)' | 'Conventional Low-Pesticide' | 'Natural/Organic Practices';
  storageGuidance: string;
  deliveryOptions: ('Farmer Direct Delivery' | 'Buyer Pickup' | 'Pananim Shared Cargo')[];
  estimatedFreightPerUnit: number;
  isFresh: boolean;
  freshUntilDate: string;
  shelfLifeDays: number;
  shippingLeadTime: string;
}

export interface Farm {
  id: string;
  name: string;
  farmerName: string;
  avatarUrl: string;
  coverImageUrl: string;
  sellerType: SellerType;
  cooperativeRegistrationNumber?: string;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
  verificationStatus: 'verified' | 'under_review' | 'changes_requested' | 'unverified';
  verifiedDate?: string;
  story: string;
  totalHectares?: number;
  primaryCrops: string[];
  pickupAddress: string;
  operatingHours: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  listingId: string;
  crop: CropListing;
  quantity: number;
  selectedTierPrice: number;
  subtotal: number;
  fulfillmentType: 'delivery' | 'pickup' | 'shared_cargo';
}

export type OrderStatus = 
  | 'Awaiting Confirmation'
  | 'Confirmed'
  | 'Packed'
  | 'On the Way'
  | 'Received'
  | 'Cancelled'
  | 'Disputed';

export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded';
export type ShipmentStatus = 'pending_quote' | 'scheduled' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';

export interface SellerOrder {
  orderId: string;
  farmId: string;
  farmName: string;
  sellerContact: string;
  items: {
    cropId: string;
    cropName: string;
    variety: string;
    unit: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
    imageUrl: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  deliveryType: 'delivery' | 'pickup' | 'shared_cargo';
  status: OrderStatus;
  shipmentStatus: ShipmentStatus;
  statusTimeline: {
    title: string;
    description: string;
    timestamp: string;
    updaterRole: string;
    completed: boolean;
    current?: boolean;
  }[];
  pickupScheduledTime?: string;
  estimatedDeliveryDate: string;
}

export interface OrderGroup {
  id: string; // e.g. #ORD-2026-8842
  createdAt: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  deliveryAddress: {
    recipientName: string;
    phone: string;
    houseStreet: string;
    barangay: string;
    municipality: string;
    province: string;
    region: string;
    postalCode: string;
    landmark?: string;
    notes?: string;
  };
  billingAddress: {
    name: string;
    businessName?: string;
    address: string;
    tin?: string;
  };
  sellerOrders: SellerOrder[];
  itemTotal: number;
  deliveryTotal: number;
  grandTotal: number;
  paymentMethod: 'gcash' | 'maya' | 'card' | 'bank_transfer' | 'cod';
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  invoiceNumber: string;
}

export interface MarketPriceRecord {
  id: string;
  crop: string;
  category: CropCategory;
  region: string;
  province: string;
  samplePrice: number;
  previousWeekPrice: number;
  weekChangePct: number;
  trend: PriceTrend;
  asOfDate: string;
  source: string;
  sparkline: number[];
  regionalComparisons: {
    province: string;
    price: number;
  }[];
}

export interface CropReview {
  id: string;
  listingId: string;
  cropName: string;
  orderId: string;
  buyerId: string;
  buyerName: string;
  rating: number; // 1 to 5
  qualityRating?: number;
  packagingRating?: number;
  deliveryRating?: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  purchasedQuantityText?: string;
  images?: string[];
  farmerReply?: {
    farmerName: string;
    date: string;
    message: string;
  };
  helpfulVotes: number;
}

export interface QuoteRequest {
  id: string;
  buyerId: string;
  buyerName: string;
  farmId: string;
  farmName: string;
  cropId: string;
  cropName: string;
  quantityRequested: number;
  unit: string;
  targetPricePerUnit?: number;
  deliveryAddress: string;
  deliveryWindow: string;
  packagingNotes: string;
  status: 'requested' | 'negotiating' | 'quoted' | 'accepted' | 'declined' | 'converted';
  offeredPricePerUnit?: number;
  offeredDeliveryFee?: number;
  sellerNotes?: string;
  createdAt: string;
  expiresAt: string;
}

export interface VerificationApplication {
  id: string;
  farmerId: string;
  applicantName: string;
  farmName: string;
  phone: string;
  email: string;
  sellerType: SellerType;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
  documentType: 'RSBSA Farmer Registry' | 'DA Certificate' | 'Barangay Agrarian Cert' | 'Cooperative CDA Registration';
  documentNumberMasked: string;
  documentFileName: string;
  farmPhotos: string[];
  status: 'draft' | 'submitted' | 'under_review' | 'more_info_needed' | 'approved' | 'rejected';
  submittedDate?: string;
  reviewedDate?: string;
  reviewerNotes?: string;
  rejectionOrCorrectionReason?: string;
  auditTrail: {
    action: string;
    actor: string;
    timestamp: string;
    notes?: string;
  }[];
}

export interface SupportIssue {
  id: string;
  orderId: string;
  sellerOrderId: string;
  buyerName: string;
  cropName: string;
  issueType: 'damaged_spoiled' | 'missing' | 'wrong_item' | 'quantity_discrepancy' | 'delivery_issue' | 'payment_issue';
  quantityAffected: string;
  description: string;
  status: 'submitted' | 'under_review' | 'approved' | 'refund_processing' | 'refunded' | 'rejected';
  requestedResolution: 'refund' | 'replacement' | 'credit';
  refundAmount?: number;
  createdAt: string;
  sellerResponse?: string;
  resolutionNotes?: string;
}
