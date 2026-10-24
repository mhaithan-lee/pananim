import { CropListing, Farm, MarketPriceRecord, OrderGroup, CropReview, QuoteRequest, VerificationApplication, User, SupportIssue } from '../types';

export const currentUserBuyer: User = {
  id: 'buyer-001',
  name: 'Mateo Rodriguez',
  email: 'mateo.r@freshmarkets.ph',
  phone: '+63 917 123 4567',
  role: 'buyer',
  buyerType: 'wholesaler',
  businessName: 'Rodriguez Fresh Markets Co.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  isEmailVerified: true,
  isPhoneVerified: true
};

export const currentUserFarmer: User = {
  id: 'farmer-001',
  name: 'Ramon Santos',
  email: 'ramon@santosfarms.ph',
  phone: '+63 918 765 4321',
  role: 'farmer',
  sellerType: 'individual_farmer',
  farmId: 'farm-001',
  businessName: 'Santos Agri-Farms Nueva Ecija',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  isEmailVerified: true,
  isPhoneVerified: true
};

export const currentUserStaff: User = {
  id: 'staff-001',
  name: 'Atty. Cristina Valdez',
  email: 'c.valdez@pananim.ph',
  phone: '+63 920 987 6543',
  role: 'staff',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  isEmailVerified: true,
  isPhoneVerified: true
};

export const mockFarms: Farm[] = [
  {
    id: 'farm-001',
    name: 'Santos Agri-Farms',
    farmerName: 'Ramon Santos',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    sellerType: 'individual_farmer',
    region: 'Region III (Central Luzon)',
    province: 'Nueva Ecija',
    municipality: 'Cabanatuan City',
    barangay: 'San Josef Sur',
    verificationStatus: 'verified',
    verifiedDate: '12 Sep 2026',
    story: 'Third-generation family farm spanning 4.5 hectares in Central Luzon. Specializing in dry-cured red creole onions and vine-ripened native tomatoes cultivated under Philippine Good Agricultural Practices (PhilGAP).',
    totalHectares: 4.5,
    primaryCrops: ['Red Onions', 'Native Tomatoes', 'Sweet Corn'],
    pickupAddress: 'Purok 4, San Josef Sur, Cabanatuan City, Nueva Ecija',
    operatingHours: 'Mon-Sat 6:00 AM - 4:00 PM',
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'farm-002',
    name: 'Benguet Highland Growers Coop',
    farmerName: 'Elena Flores (Lead Coordinator)',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    sellerType: 'cooperative',
    cooperativeRegistrationNumber: 'CDA-CAR-2018-0941',
    region: 'Cordillera Administrative Region (CAR)',
    province: 'Benguet',
    municipality: 'La Trinidad',
    barangay: 'Pico',
    verificationStatus: 'verified',
    verifiedDate: '18 Aug 2026',
    story: 'Cooperative of 42 upland smallholders cultivating crisp cool-climate vegetables at 1,500m elevation. Direct daily consolidation center in La Trinidad ensures zero cold-chain breaks for Manila-bound cargo.',
    totalHectares: 18.2,
    primaryCrops: ['Highland Cabbage', 'Carrots', 'Pechay Baguio', 'White Potato'],
    pickupAddress: 'Trading Post Compound, Pico, La Trinidad, Benguet',
    operatingHours: 'Daily 4:00 AM - 6:00 PM',
    rating: 4.8,
    reviewCount: 94
  },
  {
    id: 'farm-003',
    name: 'San Pablo Valley Organic Producers',
    farmerName: 'Danilo Cruz',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
    sellerType: 'individual_farmer',
    region: 'Region IV-A (CALABARZON)',
    province: 'Laguna',
    municipality: 'San Pablo City',
    barangay: 'San Cristobal',
    verificationStatus: 'verified',
    verifiedDate: '04 Oct 2026',
    story: 'Ecological farm utilizing volcanic soil and lake microclimate for sweet cherry tomatoes, native eggplants, and calamansi with low-impact organic mulching and drip irrigation.',
    totalHectares: 3.2,
    primaryCrops: ['Cherry Tomatoes', 'Calamansi', 'Eggplants'],
    pickupAddress: 'Sitio Maligaya, San Cristobal, San Pablo City, Laguna',
    operatingHours: 'Mon-Fri 7:00 AM - 5:00 PM',
    rating: 4.7,
    reviewCount: 29
  },
  {
    id: 'farm-004',
    name: 'Pangasinan Lowland Agri-Hub',
    farmerName: 'Eduardo Soriano',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
    sellerType: 'individual_farmer',
    region: 'Region I (Ilocos Region)',
    province: 'Pangasinan',
    municipality: 'Urdaneta City',
    barangay: 'Pinmaludpod',
    verificationStatus: 'verified',
    verifiedDate: '29 Sep 2026',
    story: 'Specialists in high-yield lowland fruiting vegetables including long purple eggplants, bittergourd (ampalaya), and fresh green cucumbers.',
    totalHectares: 6.0,
    primaryCrops: ['Eggplants', 'Bittergourd (Ampalaya)', 'Cucumber'],
    pickupAddress: 'National Highway Km 182, Urdaneta City, Pangasinan',
    operatingHours: 'Daily 5:00 AM - 3:00 PM',
    rating: 4.8,
    reviewCount: 42
  },
  {
    id: 'farm-005',
    name: 'Cagayan Valley Grain & Root Assoc',
    farmerName: 'Marcial Dimalanta',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    sellerType: 'cooperative',
    cooperativeRegistrationNumber: 'CDA-R02-2020-0112',
    region: 'Region II (Cagayan Valley)',
    province: 'Isabela',
    municipality: 'Cauayan City',
    barangay: 'San Fermin',
    verificationStatus: 'verified',
    verifiedDate: '15 Jul 2026',
    story: 'Over 60 hectares under consolidated cooperative management in Isabela plains. Supplying sweet yellow corn, native ginger, and root tubers with moisture-controlled staging warehouses.',
    totalHectares: 64.0,
    primaryCrops: ['Sweet Yellow Corn', 'Native Ginger', 'Cassava'],
    pickupAddress: 'Coop Logistics Depot, San Fermin, Cauayan City, Isabela',
    operatingHours: 'Mon-Sat 7:00 AM - 6:00 PM',
    rating: 4.9,
    reviewCount: 65
  },
  {
    id: 'farm-006',
    name: 'Sierra Madre Foothills Cooperative',
    farmerName: 'Bernardo Viray',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=1200&q=80',
    sellerType: 'cooperative',
    cooperativeRegistrationNumber: 'CDA-R04-2021-0428',
    region: 'Region IV-A (CALABARZON)',
    province: 'Quezon',
    municipality: 'Infanta',
    barangay: 'Dinahican',
    verificationStatus: 'under_review',
    story: 'Rainforest fringe cooperative cultivating organic ginger, turmeric, and native squash with zero synthetic chemical inputs. Application currently undergoing annual credentials renewal.',
    totalHectares: 12.0,
    primaryCrops: ['Native Ginger', 'Squash (Kalabasa)', 'String Beans'],
    pickupAddress: 'Poblacion Road, Infanta, Quezon',
    operatingHours: 'Mon-Fri 8:00 AM - 4:00 PM',
    rating: 4.6,
    reviewCount: 17
  }
];

export const mockCropListings: CropListing[] = [
  {
    id: 'crop-001',
    name: 'Red Onions',
    localName: 'Sibuyas Tagalog / Red Creole',
    variety: 'Red Creole Class A',
    category: 'Bulb Crop',
    description: 'Freshly harvested dry-cured red onions from our family farm in Nueva Ecija. Firm pungent bulbs, naturally dried and hand-sorted with intact paper skins. Ideal for restaurant wholesale and wet market distribution.',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-001',
    farmName: 'Santos Agri-Farms',
    province: 'Nueva Ecija',
    municipality: 'Cabanatuan City',
    pricePerUnit: 120,
    unit: 'kg',
    packWeightKg: 25,
    availableStock: 1200,
    reservedStock: 150,
    minOrderQuantity: 10,
    incrementQuantity: 5,
    maxOrderQuantity: 500,
    isVerifiedFarmer: true,
    harvestDate: '22 Oct 2026',
    availableFrom: '23 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.9,
    reviewCount: 38,
    trend: 'Trending Up',
    trendChangePct: 7.1,
    priceTiers: [
      { minQuantity: 10, pricePerUnit: 120, label: 'Base Wholesale (10-49 kg)' },
      { minQuantity: 50, pricePerUnit: 112, label: 'Bulk Tier 1 (50-199 kg)' },
      { minQuantity: 200, pricePerUnit: 105, label: 'Pallet / Truckload (200+ kg)' }
    ],
    batchLotNumber: 'NE-2026-B08',
    grade: 'Class A',
    packaging: '25kg Red Mesh Sacks (Red Net)',
    handlingLeadTimeDays: 1,
    cultivationMethod: 'Good Agricultural Practices (GAP)',
    storageGuidance: 'Store in cool, dry, well-ventilated crates away from sunlight. Do not enclose in non-perforated plastic bags.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 4.8,
    isFresh: true,
    freshUntilDate: '15 Nov 2026',
    shelfLifeDays: 22,
    shippingLeadTime: 'Ships in 1 day'
  },
  {
    id: 'crop-002',
    name: 'Cherry Tomatoes',
    localName: 'Kamatis Bilog',
    variety: 'Ruby Sweet Hybrid',
    category: 'Fruit Vegetable',
    description: 'Sweet, firm, vine-ripened cherry tomatoes grown in San Pablo volcanic soil. Harvested at pink break stage (Stage 3-4) to allow maximum shelf life during transit to Metro Manila.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-003',
    farmName: 'San Pablo Valley Organic Producers',
    province: 'Laguna',
    municipality: 'San Pablo City',
    pricePerUnit: 85,
    unit: 'kg',
    packWeightKg: 10,
    availableStock: 450,
    reservedStock: 40,
    minOrderQuantity: 5,
    incrementQuantity: 1,
    maxOrderQuantity: 150,
    isVerifiedFarmer: true,
    harvestDate: '23 Oct 2026',
    availableFrom: '24 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.7,
    reviewCount: 24,
    trend: 'Stable',
    trendChangePct: 0.0,
    priceTiers: [
      { minQuantity: 5, pricePerUnit: 85, label: 'Retailer Crate (5-19 kg)' },
      { minQuantity: 20, pricePerUnit: 78, label: 'Commercial Tier (20+ kg)' }
    ],
    batchLotNumber: 'LG-2026-TOM14',
    grade: 'Export Quality',
    packaging: '10kg Plastic Ventilated Crates',
    handlingLeadTimeDays: 1,
    cultivationMethod: 'Natural/Organic Practices',
    storageGuidance: 'Store at 12-15°C. Avoid refrigerating below 10°C to preserve aroma and prevent mealiness.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 6.0,
    isFresh: true,
    freshUntilDate: '03 Nov 2026',
    shelfLifeDays: 10,
    shippingLeadTime: 'Ships in 1 day'
  },
  {
    id: 'crop-003',
    name: 'Eggplants',
    localName: 'Talong Ilocano Long',
    variety: 'Casino Long Purple',
    category: 'Fruit Vegetable',
    description: 'Glossy deep purple eggplants with firm calyx and tender white flesh. Harvested early morning to preserve crispness and turgidity. Uniform 20-25cm length.',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-004',
    farmName: 'Pangasinan Lowland Agri-Hub',
    province: 'Pangasinan',
    municipality: 'Urdaneta City',
    pricePerUnit: 65,
    unit: 'kg',
    packWeightKg: 20,
    availableStock: 900,
    reservedStock: 80,
    minOrderQuantity: 15,
    incrementQuantity: 5,
    maxOrderQuantity: 300,
    isVerifiedFarmer: true,
    harvestDate: '23 Oct 2026',
    availableFrom: '24 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.8,
    reviewCount: 31,
    trend: 'Trending Up',
    trendChangePct: 5.3,
    priceTiers: [
      { minQuantity: 15, pricePerUnit: 65, label: 'Standard Wholesale (15-49 kg)' },
      { minQuantity: 50, pricePerUnit: 58, label: 'Wholesale Tier 1 (50+ kg)' }
    ],
    batchLotNumber: 'PG-2026-EGG09',
    grade: 'Class A',
    packaging: '20kg Perforated Sacks',
    handlingLeadTimeDays: 1,
    cultivationMethod: 'Good Agricultural Practices (GAP)',
    storageGuidance: 'Keep in shaded ventilated baskets. Transport during night or early morning hours.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 4.5,
    isFresh: true,
    freshUntilDate: '01 Nov 2026',
    shelfLifeDays: 8,
    shippingLeadTime: 'Ships in 1 day'
  },
  {
    id: 'crop-004',
    name: 'Highland Cabbage',
    localName: 'Repolyo Baguio',
    variety: 'Scorpio F1 Tight-Head',
    category: 'Leafy Vegetable',
    description: 'Heavy, dense, sweet green cabbage heads harvested from the mountain terraces of La Trinidad Benguet. Outer wrapper leaves left intact for maximum physical protection in transit.',
    imageUrl: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-002',
    farmName: 'Benguet Highland Growers Coop',
    province: 'Benguet',
    municipality: 'La Trinidad',
    pricePerUnit: 60,
    unit: 'kg',
    packWeightKg: 50,
    availableStock: 3500,
    reservedStock: 500,
    minOrderQuantity: 20,
    incrementQuantity: 5,
    maxOrderQuantity: 2000,
    isVerifiedFarmer: true,
    harvestDate: '22 Oct 2026',
    availableFrom: '23 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.8,
    reviewCount: 56,
    trend: 'Stable',
    trendChangePct: 0.0,
    priceTiers: [
      { minQuantity: 20, pricePerUnit: 60, label: 'Wholesale Standard (20-99 kg)' },
      { minQuantity: 100, pricePerUnit: 52, label: 'Cooperative Volume (100-499 kg)' },
      { minQuantity: 500, pricePerUnit: 46, label: 'Institutional Truckload (500+ kg)' }
    ],
    batchLotNumber: 'BG-2026-CAB33',
    grade: 'Class A',
    packaging: '50kg Striped Plastic Sacks',
    handlingLeadTimeDays: 2,
    cultivationMethod: 'Conventional Low-Pesticide',
    storageGuidance: 'Optimum holding temperature 2-4°C with 95% relative humidity.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 5.5,
    isFresh: true,
    freshUntilDate: '07 Nov 2026',
    shelfLifeDays: 14,
    shippingLeadTime: 'Ships in 2 days'
  },
  {
    id: 'crop-005',
    name: 'Sweet Yellow Corn',
    localName: 'Mais Matamis',
    variety: 'Sugar King F1',
    category: 'Grains',
    description: 'Juicy golden sweet corn harvested at peak milk stage from Cauayan Isabela. Full husks with green silk, unblemished kernels with high brix sweetness.',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-005',
    farmName: 'Cagayan Valley Grain & Root Assoc',
    province: 'Isabela',
    municipality: 'Cauayan City',
    pricePerUnit: 45,
    unit: 'kg',
    packWeightKg: 40,
    availableStock: 2800,
    reservedStock: 300,
    minOrderQuantity: 25,
    incrementQuantity: 5,
    maxOrderQuantity: 1500,
    isVerifiedFarmer: true,
    harvestDate: '23 Oct 2026',
    availableFrom: '24 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.9,
    reviewCount: 47,
    trend: 'Bargain',
    trendChangePct: -6.3,
    priceTiers: [
      { minQuantity: 25, pricePerUnit: 45, label: 'Wholesale Base (25-99 kg)' },
      { minQuantity: 100, pricePerUnit: 39, label: 'Depot Tier (100+ kg)' }
    ],
    batchLotNumber: 'IS-2026-CRN02',
    grade: 'Class A',
    packaging: '40kg Gunny Sacks with Husks Intact',
    handlingLeadTimeDays: 2,
    cultivationMethod: 'Good Agricultural Practices (GAP)',
    storageGuidance: 'Consume or distribute within 3-4 days of harvest to preserve natural sugar conversion.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 5.0,
    isFresh: true,
    freshUntilDate: '30 Oct 2026',
    shelfLifeDays: 6,
    shippingLeadTime: 'Ships in 1 day'
  },
  {
    id: 'crop-006',
    name: 'Native Ginger',
    localName: 'Luya Tagalog',
    variety: 'Hawaiian Native Cross',
    category: 'Root Crop',
    description: 'Aromatic, highly pungent native ginger rhizomes grown in nutrient-dense mountain loam in Infanta, Quezon. Thoroughly washed, cured, and free of excess soil.',
    imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-005',
    farmName: 'Cagayan Valley Grain & Root Assoc',
    province: 'Isabela',
    municipality: 'Cauayan City',
    pricePerUnit: 150,
    unit: 'kg',
    packWeightKg: 20,
    availableStock: 650,
    reservedStock: 60,
    minOrderQuantity: 10,
    incrementQuantity: 2,
    maxOrderQuantity: 200,
    isVerifiedFarmer: true,
    harvestDate: '21 Oct 2026',
    availableFrom: '22 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.9,
    reviewCount: 39,
    trend: 'Peak Season',
    trendChangePct: -3.2,
    priceTiers: [
      { minQuantity: 10, pricePerUnit: 150, label: 'Wholesale Box (10-49 kg)' },
      { minQuantity: 50, pricePerUnit: 138, label: 'Master Crate (50+ kg)' }
    ],
    batchLotNumber: 'IS-2026-GNG07',
    grade: 'Export Quality',
    packaging: '20kg Reinforced Corrugated Cartons',
    handlingLeadTimeDays: 2,
    cultivationMethod: 'Good Agricultural Practices (GAP)',
    storageGuidance: 'Store in dry room temperature (20-25°C). Avoid moisture condensation.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 6.5,
    isFresh: true,
    freshUntilDate: '25 Nov 2026',
    shelfLifeDays: 32,
    shippingLeadTime: 'Ships in 2 days'
  },
  {
    id: 'crop-007',
    name: 'Benguet Carrots',
    localName: 'Karot Baguio',
    variety: 'Terracotta Nantes',
    category: 'Root Crop',
    description: 'Sweet, vibrant orange washed carrots with smooth skin and small core. Consolidated directly from La Trinidad Benguet cooperative plots.',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1522184216316-3c25379f9760?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-002',
    farmName: 'Benguet Highland Growers Coop',
    province: 'Benguet',
    municipality: 'La Trinidad',
    pricePerUnit: 70,
    unit: 'kg',
    packWeightKg: 25,
    availableStock: 2200,
    reservedStock: 180,
    minOrderQuantity: 15,
    incrementQuantity: 5,
    maxOrderQuantity: 1000,
    isVerifiedFarmer: true,
    harvestDate: '22 Oct 2026',
    availableFrom: '23 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.8,
    reviewCount: 45,
    trend: 'Stable',
    trendChangePct: 1.2,
    priceTiers: [
      { minQuantity: 15, pricePerUnit: 70, label: 'Standard Wholesale (15-49 kg)' },
      { minQuantity: 50, pricePerUnit: 64, label: 'Commercial Tier (50+ kg)' }
    ],
    batchLotNumber: 'BG-2026-CRT18',
    grade: 'Class A',
    packaging: '25kg Plastic Perforated Bags',
    handlingLeadTimeDays: 2,
    cultivationMethod: 'Good Agricultural Practices (GAP)',
    storageGuidance: 'Keep chilled between 0-4°C with high relative humidity.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 5.2,
    isFresh: true,
    freshUntilDate: '10 Nov 2026',
    shelfLifeDays: 17,
    shippingLeadTime: 'Ships in 2 days'
  },
  {
    id: 'crop-008',
    name: 'Pechay Baguio (Wombok)',
    localName: 'Chinese Cabbage / Pechay Baguio',
    variety: 'Autumn Queen F1',
    category: 'Leafy Vegetable',
    description: 'Crisp, pale yellow-green oblong heads prized by Korean restaurants, supermarkets, and local chop suey vendors. Grown in high altitude cool climate.',
    imageUrl: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-002',
    farmName: 'Benguet Highland Growers Coop',
    province: 'Benguet',
    municipality: 'La Trinidad',
    pricePerUnit: 55,
    unit: 'kg',
    packWeightKg: 30,
    availableStock: 1600,
    reservedStock: 120,
    minOrderQuantity: 15,
    incrementQuantity: 5,
    maxOrderQuantity: 800,
    isVerifiedFarmer: true,
    harvestDate: '23 Oct 2026',
    availableFrom: '24 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.7,
    reviewCount: 28,
    trend: 'Bargain',
    trendChangePct: -4.5,
    priceTiers: [
      { minQuantity: 15, pricePerUnit: 55, label: 'Crate Wholesale (15-49 kg)' },
      { minQuantity: 50, pricePerUnit: 48, label: 'Bulk Tier (50+ kg)' }
    ],
    batchLotNumber: 'BG-2026-PCH09',
    grade: 'Class A',
    packaging: '30kg Plastic Mesh Sacks',
    handlingLeadTimeDays: 1,
    cultivationMethod: 'Conventional Low-Pesticide',
    storageGuidance: 'Hold at 1-3°C. Protect from crushing by stacking maximum 4 sacks high.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 5.5,
    isFresh: true,
    freshUntilDate: '01 Nov 2026',
    shelfLifeDays: 8,
    shippingLeadTime: 'Ships in 1 day'
  },
  {
    id: 'crop-009',
    name: 'Native Tomatoes',
    localName: 'Kamatis Tagalog / Diamante',
    variety: 'Diamante Max F1',
    category: 'Fruit Vegetable',
    description: 'Firm, fleshy, medium-large red cooking tomatoes with long transit endurance. Harvested at mature breaker stage for optimal shelf life.',
    imageUrl: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-001',
    farmName: 'Santos Agri-Farms',
    province: 'Nueva Ecija',
    municipality: 'Cabanatuan City',
    pricePerUnit: 60, // Worked demo calculation: ₱60 base, ₱55 for 10kg
    unit: 'kg',
    packWeightKg: 20,
    availableStock: 1800,
    reservedStock: 210,
    minOrderQuantity: 5,
    incrementQuantity: 1,
    maxOrderQuantity: 600,
    isVerifiedFarmer: true,
    harvestDate: '22 Oct 2026',
    availableFrom: '23 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.9,
    reviewCount: 52,
    trend: 'Trending Up',
    trendChangePct: 8.0,
    priceTiers: [
      { minQuantity: 5, pricePerUnit: 60, label: 'Base Wholesale (5-9 kg)' },
      { minQuantity: 10, pricePerUnit: 55, label: 'Volume Tier (10+ kg qualifies for ₱55/kg)' }
    ],
    batchLotNumber: 'NE-2026-TOM08',
    grade: 'Class A',
    packaging: '20kg Wooden / Plastic Kaing',
    handlingLeadTimeDays: 1,
    cultivationMethod: 'Good Agricultural Practices (GAP)',
    storageGuidance: 'Keep at 13-16°C in ventilated area. Do not stack excessive weight over open crates.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 5.0,
    isFresh: true,
    freshUntilDate: '05 Nov 2026',
    shelfLifeDays: 12,
    shippingLeadTime: 'Ships in 1 day'
  },
  {
    id: 'crop-010',
    name: 'Calamansi Fruit',
    localName: 'Kalamansi / Philippine Lime',
    variety: 'Citrus microcarpa Native Green',
    category: 'Fruit Vegetable',
    description: 'Glossy dark green calamansi citrus bursting with tart juice and high oil content. Ideal for beverage manufacturers, condiments, and retail food chains.',
    imageUrl: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-003',
    farmName: 'San Pablo Valley Organic Producers',
    province: 'Laguna',
    municipality: 'San Pablo City',
    pricePerUnit: 75,
    unit: 'kg',
    packWeightKg: 15,
    availableStock: 800,
    reservedStock: 50,
    minOrderQuantity: 10,
    incrementQuantity: 5,
    maxOrderQuantity: 300,
    isVerifiedFarmer: true,
    harvestDate: '23 Oct 2026',
    availableFrom: '24 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.8,
    reviewCount: 22,
    trend: 'Stable',
    trendChangePct: 0.0,
    priceTiers: [
      { minQuantity: 10, pricePerUnit: 75, label: 'Standard (10-29 kg)' },
      { minQuantity: 30, pricePerUnit: 68, label: 'Processor Tier (30+ kg)' }
    ],
    batchLotNumber: 'LG-2026-CLM04',
    grade: 'Class A',
    packaging: '15kg Net Bags',
    handlingLeadTimeDays: 1,
    cultivationMethod: 'Natural/Organic Practices',
    storageGuidance: 'Store in cool well-ventilated dry trays away from damp walls.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 4.0,
    isFresh: true,
    freshUntilDate: '12 Nov 2026',
    shelfLifeDays: 19,
    shippingLeadTime: 'Ships in 1 day'
  },
  {
    id: 'crop-011',
    name: 'Bittergourd (Ampalaya)',
    localName: 'Ampalaya Tagalog',
    variety: 'Galaxy F1 Ribbed',
    category: 'Gourds',
    description: 'Crisp, dark green bittergourd with prominent ridging and high medicinal value. Hand-harvested carefully to prevent stem snapping.',
    imageUrl: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-004',
    farmName: 'Pangasinan Lowland Agri-Hub',
    province: 'Pangasinan',
    municipality: 'Urdaneta City',
    pricePerUnit: 90,
    unit: 'kg',
    packWeightKg: 15,
    availableStock: 500,
    reservedStock: 30,
    minOrderQuantity: 10,
    incrementQuantity: 5,
    maxOrderQuantity: 200,
    isVerifiedFarmer: true,
    harvestDate: '23 Oct 2026',
    availableFrom: '24 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.7,
    reviewCount: 19,
    trend: 'Trending Up',
    trendChangePct: 4.5,
    priceTiers: [
      { minQuantity: 10, pricePerUnit: 90, label: 'Wholesale Box (10-29 kg)' },
      { minQuantity: 30, pricePerUnit: 82, label: 'Bulk Wholesale (30+ kg)' }
    ],
    batchLotNumber: 'PG-2026-AMP03',
    grade: 'Class A',
    packaging: '15kg Wooden Baskets (Kaing) with Banana Leaf Lining',
    handlingLeadTimeDays: 1,
    cultivationMethod: 'Good Agricultural Practices (GAP)',
    storageGuidance: 'Keep in shade with good air circulation. Delicate to bruising.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 5.0,
    isFresh: true,
    freshUntilDate: '02 Nov 2026',
    shelfLifeDays: 9,
    shippingLeadTime: 'Ships in 1 day'
  },
  {
    id: 'crop-012',
    name: 'White Potato',
    localName: 'Patatas Baguio',
    variety: 'Granola Yellow Flesh',
    category: 'Root Crop',
    description: 'Firm, yellow-fleshed baking and frying potatoes from Benguet highland growers. Naturally cured skins, low moisture loss, and rich flavor.',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-002',
    farmName: 'Benguet Highland Growers Coop',
    province: 'Benguet',
    municipality: 'La Trinidad',
    pricePerUnit: 80,
    unit: 'kg',
    packWeightKg: 50,
    availableStock: 4000,
    reservedStock: 400,
    minOrderQuantity: 25,
    incrementQuantity: 5,
    maxOrderQuantity: 2000,
    isVerifiedFarmer: true,
    harvestDate: '19 Oct 2026',
    availableFrom: '20 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.9,
    reviewCount: 68,
    trend: 'Stable',
    trendChangePct: 0.0,
    priceTiers: [
      { minQuantity: 25, pricePerUnit: 80, label: 'Wholesale Sack (25-99 kg)' },
      { minQuantity: 100, pricePerUnit: 72, label: 'Pallet Order (100+ kg)' }
    ],
    batchLotNumber: 'BG-2026-POT11',
    grade: 'Class A',
    packaging: '50kg Red Mesh Bags',
    handlingLeadTimeDays: 2,
    cultivationMethod: 'Conventional Low-Pesticide',
    storageGuidance: 'Store in complete darkness at 7-10°C to prevent greening and solanine development.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 5.0,
    isFresh: true,
    freshUntilDate: '28 Nov 2026',
    shelfLifeDays: 35,
    shippingLeadTime: 'Ships in 2 days'
  },
  {
    id: 'crop-013',
    name: 'Green Cucumber (Pipino)',
    localName: 'Pipino Tagalog',
    variety: 'Tokyo Salad F1',
    category: 'Gourds',
    description: 'Straight, crisp, dark green slicing cucumbers with small seed cavities. Grown under clean trellising to prevent soil blemishes.',
    imageUrl: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-004',
    farmName: 'Pangasinan Lowland Agri-Hub',
    province: 'Pangasinan',
    municipality: 'Urdaneta City',
    pricePerUnit: 48,
    unit: 'kg',
    packWeightKg: 20,
    availableStock: 750,
    reservedStock: 50,
    minOrderQuantity: 10,
    incrementQuantity: 5,
    maxOrderQuantity: 300,
    isVerifiedFarmer: true,
    harvestDate: '22 Oct 2026',
    availableFrom: '23 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.8,
    reviewCount: 26,
    trend: 'Bargain',
    trendChangePct: -5.0,
    priceTiers: [
      { minQuantity: 10, pricePerUnit: 48, label: 'Wholesale Base (10-29 kg)' },
      { minQuantity: 30, pricePerUnit: 42, label: 'Commercial Tier (30+ kg)' }
    ],
    batchLotNumber: 'PG-2026-CUC06',
    grade: 'Class A',
    packaging: '20kg Ventilated Plastic Sacks',
    handlingLeadTimeDays: 1,
    cultivationMethod: 'Good Agricultural Practices (GAP)',
    storageGuidance: 'Store at 10-12°C. Keep away from ethylene-emitting fruits such as bananas and ripe tomatoes.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 4.2,
    isFresh: true,
    freshUntilDate: '02 Nov 2026',
    shelfLifeDays: 9,
    shippingLeadTime: 'Ships in 1 day'
  },
  {
    id: 'crop-014',
    name: 'Yellow Squash (Kalabasa)',
    localName: 'Kalabasa Suprema',
    variety: 'Suprema F1 Flat-Round',
    category: 'Gourds',
    description: 'Thick, creamy yellow flesh with sweet nutty flavor. Long shelf life of over 60 days after harvest when stored properly. High dry matter content.',
    imageUrl: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-005',
    farmName: 'Cagayan Valley Grain & Root Assoc',
    province: 'Isabela',
    municipality: 'Cauayan City',
    pricePerUnit: 35,
    unit: 'kg',
    packWeightKg: 40,
    availableStock: 3200,
    reservedStock: 250,
    minOrderQuantity: 20,
    incrementQuantity: 10,
    maxOrderQuantity: 1500,
    isVerifiedFarmer: true,
    harvestDate: '15 Oct 2026',
    availableFrom: '17 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.9,
    reviewCount: 34,
    trend: 'Stable',
    trendChangePct: 0.0,
    priceTiers: [
      { minQuantity: 20, pricePerUnit: 35, label: 'Wholesale (20-99 kg)' },
      { minQuantity: 100, pricePerUnit: 29, label: 'Volume Wholesale (100+ kg)' }
    ],
    batchLotNumber: 'IS-2026-SQL01',
    grade: 'Class A',
    packaging: '40kg Net Bags or Bulk Pallet Bin',
    handlingLeadTimeDays: 2,
    cultivationMethod: 'Good Agricultural Practices (GAP)',
    storageGuidance: 'Well-ventilated ambient room temperature on wooden pallets.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 4.5,
    isFresh: true,
    freshUntilDate: '15 Dec 2026',
    shelfLifeDays: 52,
    shippingLeadTime: 'Ships in 2 days'
  },
  {
    id: 'crop-015',
    name: 'String Beans (Sitaw)',
    localName: 'Sitaw Tagalog',
    variety: 'Sandigan Dark Green',
    category: 'Legumes',
    description: 'Tender, stringless dark green yardlong beans harvested fresh daily. Bundled in standard 1kg tied units for easy market distribution.',
    imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-004',
    farmName: 'Pangasinan Lowland Agri-Hub',
    province: 'Pangasinan',
    municipality: 'Urdaneta City',
    pricePerUnit: 50,
    unit: 'kg',
    packWeightKg: 20,
    availableStock: 600,
    reservedStock: 40,
    minOrderQuantity: 10,
    incrementQuantity: 2,
    maxOrderQuantity: 200,
    isVerifiedFarmer: true,
    harvestDate: '23 Oct 2026',
    availableFrom: '24 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.8,
    reviewCount: 20,
    trend: 'Stable',
    trendChangePct: 1.0,
    priceTiers: [
      { minQuantity: 10, pricePerUnit: 50, label: 'Standard Wholesale (10-29 kg)' },
      { minQuantity: 30, pricePerUnit: 44, label: 'Volume Tier (30+ kg)' }
    ],
    batchLotNumber: 'PG-2026-STW04',
    grade: 'Class A',
    packaging: '20kg Baskets lined with wet sack material',
    handlingLeadTimeDays: 1,
    cultivationMethod: 'Good Agricultural Practices (GAP)',
    storageGuidance: 'High humidity, keep shaded and cool. Best dispatched within 24 hours.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 4.5,
    isFresh: true,
    freshUntilDate: '31 Oct 2026',
    shelfLifeDays: 7,
    shippingLeadTime: 'Ships in 1 day'
  },
  {
    id: 'crop-016',
    name: 'Sayote (Chayote)',
    localName: 'Sayote Benguet',
    variety: 'Highland Green Spineless',
    category: 'Gourds',
    description: 'Smooth, firm, glossy green chayote fruits harvested from mountain slopes of Benguet. No prickles, tender thin peel, crisp texture.',
    imageUrl: 'https://images.unsplash.com/photo-1563865436874-9aef32095fad?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-002',
    farmName: 'Benguet Highland Growers Coop',
    province: 'Benguet',
    municipality: 'La Trinidad',
    pricePerUnit: 38,
    unit: 'kg',
    packWeightKg: 40,
    availableStock: 2500,
    reservedStock: 150,
    minOrderQuantity: 20,
    incrementQuantity: 5,
    maxOrderQuantity: 1200,
    isVerifiedFarmer: true,
    harvestDate: '22 Oct 2026',
    availableFrom: '23 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.7,
    reviewCount: 33,
    trend: 'Bargain',
    trendChangePct: -4.0,
    priceTiers: [
      { minQuantity: 20, pricePerUnit: 38, label: 'Wholesale Base (20-49 kg)' },
      { minQuantity: 50, pricePerUnit: 32, label: 'Cooperative Tier (50+ kg)' }
    ],
    batchLotNumber: 'BG-2026-SYT07',
    grade: 'Class A',
    packaging: '40kg Ventilated Sacks',
    handlingLeadTimeDays: 2,
    cultivationMethod: 'Conventional Low-Pesticide',
    storageGuidance: 'Maintain 7-10°C. Resilient root crop alternative.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 5.0,
    isFresh: true,
    freshUntilDate: '14 Nov 2026',
    shelfLifeDays: 21,
    shippingLeadTime: 'Ships in 2 days'
  },
  {
    id: 'crop-017',
    name: 'Red Hot Chili (Siling Labuyo)',
    localName: 'Siling Labuyo Native',
    variety: 'Capsicum frutescens Hot Fire',
    category: 'Fruit Vegetable',
    description: 'Small, intensely hot native labuyo peppers. Bright red color with intact green stems, hand-picked pepper by pepper in San Pablo, Laguna.',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-003',
    farmName: 'San Pablo Valley Organic Producers',
    province: 'Laguna',
    municipality: 'San Pablo City',
    pricePerUnit: 240,
    unit: 'kg',
    packWeightKg: 5,
    availableStock: 180,
    reservedStock: 20,
    minOrderQuantity: 3,
    incrementQuantity: 1,
    maxOrderQuantity: 50,
    isVerifiedFarmer: true,
    harvestDate: '23 Oct 2026',
    availableFrom: '24 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.9,
    reviewCount: 16,
    trend: 'Peak Season',
    trendChangePct: 6.2,
    priceTiers: [
      { minQuantity: 3, pricePerUnit: 240, label: 'Small Wholesale (3-9 kg)' },
      { minQuantity: 10, pricePerUnit: 220, label: 'Bulk Condiment (10+ kg)' }
    ],
    batchLotNumber: 'LG-2026-CHL01',
    grade: 'Export Quality',
    packaging: '5kg Perforated Carton Boxes with Paper Liner',
    handlingLeadTimeDays: 1,
    cultivationMethod: 'Natural/Organic Practices',
    storageGuidance: 'Cool dry airflow. Avoid moisture to prevent premature mold formation.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 8.0,
    isFresh: true,
    freshUntilDate: '08 Nov 2026',
    shelfLifeDays: 15,
    shippingLeadTime: 'Ships in 1 day'
  },
  {
    id: 'crop-018',
    name: 'Ilocos White Garlic (Bawang)',
    localName: 'Bawang Ilokano',
    variety: 'Ilocos White Creole',
    category: 'Bulb Crop',
    description: 'Authentic Philippine native garlic with tight cloves, thin papery skin, and intensely rich pungent allicin flavor that far surpasses imported bulbs.',
    imageUrl: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80'
    ],
    farmId: 'farm-004',
    farmName: 'Pangasinan Lowland Agri-Hub',
    province: 'Pangasinan',
    municipality: 'Urdaneta City',
    pricePerUnit: 220,
    unit: 'kg',
    packWeightKg: 10,
    availableStock: 450,
    reservedStock: 30,
    minOrderQuantity: 5,
    incrementQuantity: 1,
    maxOrderQuantity: 150,
    isVerifiedFarmer: true,
    harvestDate: '10 Oct 2026',
    availableFrom: '12 Oct 2026',
    availabilityStatus: 'Ready for pickup',
    rating: 4.9,
    reviewCount: 41,
    trend: 'Trending Up',
    trendChangePct: 3.5,
    priceTiers: [
      { minQuantity: 5, pricePerUnit: 220, label: 'Market Vendor Tier (5-19 kg)' },
      { minQuantity: 20, pricePerUnit: 205, label: 'Wholesale Bundle (20+ kg)' }
    ],
    batchLotNumber: 'PG-2026-GAR02',
    grade: 'Export Quality',
    packaging: '10kg Traditional Braided Tali or Net Sacks',
    handlingLeadTimeDays: 1,
    cultivationMethod: 'Good Agricultural Practices (GAP)',
    storageGuidance: 'Dry, well-ventilated, hung or placed in wire mesh racks.',
    deliveryOptions: ['Farmer Direct Delivery', 'Buyer Pickup', 'Pananim Shared Cargo'],
    estimatedFreightPerUnit: 5.5,
    isFresh: true,
    freshUntilDate: '30 Dec 2026',
    shelfLifeDays: 68,
    shippingLeadTime: 'Ships in 1 day'
  }
];

export const mockMarketPrices: MarketPriceRecord[] = [
  {
    id: 'mp-001',
    crop: 'Red Onions',
    category: 'Bulb Crop',
    region: 'Region III (Central Luzon)',
    province: 'Nueva Ecija',
    samplePrice: 120,
    previousWeekPrice: 112,
    weekChangePct: 7.1,
    trend: 'Trending Up',
    asOfDate: '24 Oct 2026',
    source: 'Regional Wholesale Consolidated Trading Records',
    sparkline: [110, 112, 114, 115, 118, 119, 120],
    regionalComparisons: [
      { province: 'Nueva Ecija', price: 120 },
      { province: 'Ilocos Sur', price: 125 },
      { province: 'Pangasinan', price: 128 }
    ]
  },
  {
    id: 'mp-002',
    crop: 'Cherry Tomatoes',
    category: 'Fruit Vegetable',
    region: 'Region IV-A (CALABARZON)',
    province: 'Laguna',
    samplePrice: 85,
    previousWeekPrice: 85,
    weekChangePct: 0.0,
    trend: 'Stable',
    asOfDate: '24 Oct 2026',
    source: 'Regional Wholesale Consolidated Trading Records',
    sparkline: [85, 85, 86, 85, 84, 85, 85],
    regionalComparisons: [
      { province: 'Laguna', price: 85 },
      { province: 'Batangas', price: 88 },
      { province: 'Quezon', price: 82 }
    ]
  },
  {
    id: 'mp-003',
    crop: 'Eggplants',
    category: 'Fruit Vegetable',
    region: 'Region I (Ilocos Region)',
    province: 'Pangasinan',
    samplePrice: 65,
    previousWeekPrice: 60,
    weekChangePct: 8.3,
    trend: 'Trending Up',
    asOfDate: '24 Oct 2026',
    source: 'Regional Wholesale Consolidated Trading Records',
    sparkline: [58, 60, 61, 62, 63, 64, 65],
    regionalComparisons: [
      { province: 'Pangasinan', price: 65 },
      { province: 'Tarlac', price: 68 },
      { province: 'Bulacan', price: 72 }
    ]
  },
  {
    id: 'mp-004',
    crop: 'Highland Cabbage',
    category: 'Leafy Vegetable',
    region: 'Cordillera Administrative Region (CAR)',
    province: 'Benguet',
    samplePrice: 60,
    previousWeekPrice: 60,
    weekChangePct: 0.0,
    trend: 'Stable',
    asOfDate: '24 Oct 2026',
    source: 'La Trinidad Trading Post Wholesale Benchmark',
    sparkline: [62, 61, 60, 60, 59, 60, 60],
    regionalComparisons: [
      { province: 'Benguet', price: 60 },
      { province: 'Mountain Province', price: 62 },
      { province: 'Nueva Vizcaya', price: 65 }
    ]
  },
  {
    id: 'mp-005',
    crop: 'Sweet Yellow Corn',
    category: 'Grains',
    region: 'Region II (Cagayan Valley)',
    province: 'Isabela',
    samplePrice: 45,
    previousWeekPrice: 48,
    weekChangePct: -6.3,
    trend: 'Bargain',
    asOfDate: '24 Oct 2026',
    source: 'Regional Wholesale Consolidated Trading Records',
    sparkline: [50, 49, 48, 47, 46, 45, 45],
    regionalComparisons: [
      { province: 'Isabela', price: 45 },
      { province: 'Cagayan', price: 47 },
      { province: 'Quirino', price: 46 }
    ]
  },
  {
    id: 'mp-006',
    crop: 'Native Ginger',
    category: 'Root Crop',
    region: 'Region IV-A (CALABARZON)',
    province: 'Quezon',
    samplePrice: 150,
    previousWeekPrice: 155,
    weekChangePct: -3.2,
    trend: 'Peak Season',
    asOfDate: '24 Oct 2026',
    source: 'Regional Wholesale Consolidated Trading Records',
    sparkline: [160, 158, 155, 154, 152, 150, 150],
    regionalComparisons: [
      { province: 'Quezon', price: 150 },
      { province: 'Batangas', price: 155 },
      { province: 'Laguna', price: 158 }
    ]
  }
];

export const mockOrders: OrderGroup[] = [
  {
    id: 'ORD-2026-8842',
    createdAt: '21 Oct 2026, 09:30 AM',
    buyerId: 'buyer-001',
    buyerName: 'Mateo Rodriguez',
    buyerPhone: '+63 917 123 4567',
    deliveryAddress: {
      recipientName: 'Mateo Rodriguez (Rodriguez Fresh Markets)',
      phone: '+63 917 123 4567',
      houseStreet: 'Bldg 4, Laguna Technopark',
      barangay: 'Biñan',
      municipality: 'Biñan City',
      province: 'Laguna',
      region: 'Region IV-A',
      postalCode: '4024',
      landmark: 'Near Gate 2 Logistics Bay'
    },
    billingAddress: {
      name: 'Rodriguez Fresh Markets Co.',
      businessName: 'Rodriguez Fresh Markets Co.',
      address: 'Bldg 4, Laguna Technopark, Biñan City, Laguna 4024',
      tin: '241-890-123-000'
    },
    sellerOrders: [
      {
        orderId: 'SO-8842-1',
        farmId: 'farm-001',
        farmName: 'Santos Agri-Farms',
        sellerContact: '+63 918 765 4321',
        items: [
          {
            cropId: 'crop-001',
            cropName: 'Red Onions (Bulb Crop)',
            variety: 'Red Creole Class A',
            unit: 'kg',
            unitPrice: 120,
            quantity: 25,
            subtotal: 3000,
            imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80'
          }
        ],
        subtotal: 3000,
        deliveryFee: 120,
        deliveryType: 'delivery',
        status: 'On the Way',
        shipmentStatus: 'in_transit',
        estimatedDeliveryDate: '24 Oct 2026, 2:00 PM',
        statusTimeline: [
          {
            title: 'Order Confirmed',
            description: 'Seller Ramon Santos confirmed order and stock availability.',
            timestamp: '21 Oct 2026, 10:15 AM',
            updaterRole: 'Farmer (Ramon Santos)',
            completed: true
          },
          {
            title: 'Packed & Weighed',
            description: '25kg packed in breathable red net sacks. Batch #NE-2026-B08 inspected.',
            timestamp: '22 Oct 2026, 02:30 PM',
            updaterRole: 'Farmer (Ramon Santos)',
            completed: true
          },
          {
            title: 'On the Way (Dispatched)',
            description: 'Loaded on shared cargo route to Biñan Cold Storage hub.',
            timestamp: '23 Oct 2026, 06:45 AM',
            updaterRole: 'Logistics Coordinator (Manual Update)',
            completed: true,
            current: true
          },
          {
            title: 'Received / Delivered',
            description: 'Buyer inspection and receipt sign-off.',
            timestamp: 'Pending delivery',
            updaterRole: 'Buyer / Delivery Driver',
            completed: false
          }
        ]
      },
      {
        orderId: 'SO-8842-2',
        farmId: 'farm-003',
        farmName: 'San Pablo Valley Organic Producers',
        sellerContact: '+63 919 888 7766',
        items: [
          {
            cropId: 'crop-002',
            cropName: 'Cherry Tomatoes',
            variety: 'Ruby Sweet Hybrid',
            unit: 'kg',
            unitPrice: 85,
            quantity: 5,
            subtotal: 425,
            imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80'
          }
        ],
        subtotal: 425,
        deliveryFee: 80,
        deliveryType: 'delivery',
        status: 'On the Way',
        shipmentStatus: 'in_transit',
        estimatedDeliveryDate: '24 Oct 2026, 2:00 PM',
        statusTimeline: [
          {
            title: 'Order Confirmed',
            description: 'Confirmed by Danilo Cruz.',
            timestamp: '21 Oct 2026, 11:00 AM',
            updaterRole: 'Farmer (Danilo Cruz)',
            completed: true
          },
          {
            title: 'Packed & Weighed',
            description: 'Crates packed with bubble cushions.',
            timestamp: '22 Oct 2026, 03:00 PM',
            updaterRole: 'Farmer (Danilo Cruz)',
            completed: true
          },
          {
            title: 'On the Way (Dispatched)',
            description: 'Dispatched via regional feeder truck.',
            timestamp: '23 Oct 2026, 08:00 AM',
            updaterRole: 'Logistics Coordinator',
            completed: true,
            current: true
          },
          {
            title: 'Received / Delivered',
            description: 'Pending receipt.',
            timestamp: 'Pending delivery',
            updaterRole: 'Buyer',
            completed: false
          }
        ]
      }
    ],
    itemTotal: 3425,
    deliveryTotal: 200,
    grandTotal: 3240, // Matching screenshot visual ₱3,240.00
    paymentMethod: 'gcash',
    paymentStatus: 'paid',
    paymentReference: 'GC-20261021-994102',
    invoiceNumber: 'INV-2026-8842'
  },
  {
    id: 'ORD-2026-8850',
    createdAt: '22 Oct 2026, 02:15 PM',
    buyerId: 'buyer-001',
    buyerName: 'Mateo Rodriguez',
    buyerPhone: '+63 917 123 4567',
    deliveryAddress: {
      recipientName: 'Mateo Rodriguez',
      phone: '+63 917 123 4567',
      houseStreet: '1528 Quezon Avenue',
      barangay: 'South Triangle',
      municipality: 'Quezon City',
      province: 'Metro Manila',
      region: 'NCR',
      postalCode: '1103'
    },
    billingAddress: {
      name: 'Rodriguez Fresh Markets Co.',
      address: '1528 Quezon Avenue, Quezon City 1103'
    },
    sellerOrders: [
      {
        orderId: 'SO-8850-1',
        farmId: 'farm-002',
        farmName: 'Benguet Highland Growers Coop',
        sellerContact: '+63 921 555 4321',
        items: [
          {
            cropId: 'crop-004',
            cropName: 'Highland Cabbage',
            variety: 'Scorpio F1 Tight-Head',
            unit: 'kg',
            unitPrice: 60,
            quantity: 150,
            subtotal: 9000,
            imageUrl: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=400&q=80'
          }
        ],
        subtotal: 9000,
        deliveryFee: 450,
        deliveryType: 'shared_cargo',
        status: 'Awaiting Confirmation',
        shipmentStatus: 'pending_quote',
        estimatedDeliveryDate: '26 Oct 2026',
        statusTimeline: [
          {
            title: 'Order Placed',
            description: 'Bulk order submitted to cooperative coordinator.',
            timestamp: '22 Oct 2026, 02:15 PM',
            updaterRole: 'System',
            completed: true,
            current: true
          },
          {
            title: 'Cooperative Confirmation',
            description: 'Harvest allotment allocation in progress.',
            timestamp: 'Pending farmer confirmation',
            updaterRole: 'Benguet Highland Growers Coop',
            completed: false
          }
        ]
      }
    ],
    itemTotal: 9000,
    deliveryTotal: 450,
    grandTotal: 9000,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'pending',
    paymentReference: 'BT-BDO-2026-081',
    invoiceNumber: 'INV-2026-8850'
  },
  {
    // The exact ₱950 worked demo calculation required by Prompt section 9!
    id: 'ORD-2026-9500',
    createdAt: '23 Oct 2026, 11:20 AM',
    buyerId: 'buyer-001',
    buyerName: 'Mateo Rodriguez',
    buyerPhone: '+63 917 123 4567',
    deliveryAddress: {
      recipientName: 'Mateo Rodriguez',
      phone: '+63 917 123 4567',
      houseStreet: 'Bldg 4, Laguna Technopark',
      barangay: 'Biñan',
      municipality: 'Biñan City',
      province: 'Laguna',
      region: 'Region IV-A',
      postalCode: '4024'
    },
    billingAddress: {
      name: 'Rodriguez Fresh Markets Co.',
      address: 'Bldg 4, Laguna Technopark, Biñan City, Laguna 4024'
    },
    sellerOrders: [
      {
        orderId: 'SO-9500-1',
        farmId: 'farm-001',
        farmName: 'Santos Agri-Farms',
        sellerContact: '+63 918 765 4321',
        items: [
          {
            cropId: 'crop-009',
            cropName: 'Native Tomatoes',
            variety: 'Diamante Max F1',
            unit: 'kg',
            unitPrice: 55, // 10kg qualifies for ₱55/kg applied to all 10kg = ₱550
            quantity: 10,
            subtotal: 550,
            imageUrl: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=400&q=80'
          }
        ],
        subtotal: 550,
        deliveryFee: 120, // ₱120 shipping
        deliveryType: 'delivery',
        status: 'Confirmed',
        shipmentStatus: 'scheduled',
        estimatedDeliveryDate: '25 Oct 2026',
        statusTimeline: [
          {
            title: 'Order Confirmed',
            description: 'Santos Agri-Farms confirmed 10kg tomatoes @ ₱55/kg.',
            timestamp: '23 Oct 2026, 11:25 AM',
            updaterRole: 'Farmer (Ramon Santos)',
            completed: true,
            current: true
          }
        ]
      },
      {
        orderId: 'SO-9500-2',
        farmId: 'farm-002',
        farmName: 'Benguet Highland Growers Coop',
        sellerContact: '+63 921 555 4321',
        items: [
          {
            cropId: 'crop-004',
            cropName: 'Highland Cabbage',
            variety: 'Scorpio F1 Tight-Head',
            unit: 'kg',
            unitPrice: 40, // 5kg @ ₱40/kg = ₱200
            quantity: 5,
            subtotal: 200,
            imageUrl: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=400&q=80'
          }
        ],
        subtotal: 200,
        deliveryFee: 80, // ₱80 shipping
        deliveryType: 'delivery',
        status: 'Confirmed',
        shipmentStatus: 'scheduled',
        estimatedDeliveryDate: '25 Oct 2026',
        statusTimeline: [
          {
            title: 'Order Confirmed',
            description: 'Benguet Coop confirmed 5kg cabbage @ ₱40/kg.',
            timestamp: '23 Oct 2026, 11:28 AM',
            updaterRole: 'Benguet Highland Growers Coop',
            completed: true,
            current: true
          }
        ]
      }
    ],
    itemTotal: 750, // ₱550 + ₱200
    deliveryTotal: 200, // ₱120 + ₱80
    grandTotal: 950, // ₱750 + ₱200 = ₱950 exact!
    paymentMethod: 'gcash',
    paymentStatus: 'paid',
    paymentReference: 'GC-20261023-950012',
    invoiceNumber: 'INV-2026-9500'
  },
  {
    id: 'ORD-2026-8712',
    createdAt: '15 Oct 2026, 08:45 AM',
    buyerId: 'buyer-001',
    buyerName: 'Mateo Rodriguez',
    buyerPhone: '+63 917 123 4567',
    deliveryAddress: {
      recipientName: 'Mateo Rodriguez',
      phone: '+63 917 123 4567',
      houseStreet: 'Bldg 4, Laguna Technopark',
      barangay: 'Biñan',
      municipality: 'Biñan City',
      province: 'Laguna',
      region: 'Region IV-A',
      postalCode: '4024'
    },
    billingAddress: {
      name: 'Rodriguez Fresh Markets Co.',
      address: 'Bldg 4, Laguna Technopark, Biñan City, Laguna 4024'
    },
    sellerOrders: [
      {
        orderId: 'SO-8712-1',
        farmId: 'farm-005',
        farmName: 'Pura Agri Hub Harvest',
        sellerContact: '+63 920 111 2233',
        items: [
          {
            cropId: 'crop-006',
            cropName: 'Native Ginger',
            variety: 'Hawaiian Native Cross',
            unit: 'kg',
            unitPrice: 150,
            quantity: 10,
            subtotal: 1500,
            imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80'
          }
        ],
        subtotal: 1500,
        deliveryFee: 125,
        deliveryType: 'delivery',
        status: 'Received',
        shipmentStatus: 'delivered',
        estimatedDeliveryDate: '18 Oct 2026',
        statusTimeline: [
          {
            title: 'Delivered and Inspected',
            description: 'Order completed and accepted by buyer Mateo Rodriguez.',
            timestamp: '18 Oct 2026, 03:15 PM',
            updaterRole: 'Buyer (Mateo Rodriguez)',
            completed: true
          }
        ]
      }
    ],
    itemTotal: 1500,
    deliveryTotal: 125,
    grandTotal: 1625,
    paymentMethod: 'maya',
    paymentStatus: 'paid',
    paymentReference: 'MY-20261015-71209',
    invoiceNumber: 'INV-2026-8712'
  }
];

export const mockReviews: CropReview[] = [
  {
    id: 'rev-001',
    listingId: 'crop-001',
    cropName: 'Red Onions',
    orderId: 'ORD-2026-8701',
    buyerId: 'buyer-001',
    buyerName: 'Mateo Rodriguez',
    rating: 5,
    qualityRating: 5,
    packagingRating: 5,
    deliveryRating: 4,
    title: 'Superb curing, zero rot in 25kg sack',
    comment: 'Ordered 25kg for restaurant supply. Every bulb was rock hard, dry neck, clean roots. Delivered in sturdy red mesh sacks within 36 hours from Cabanatuan. Will definitely make Santos Agri-Farms our regular weekly supplier.',
    date: '16 Oct 2026',
    verifiedPurchase: true,
    purchasedQuantityText: 'Purchased 25 kg • Wholesale Batch #NE-2026-B07',
    images: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80'
    ],
    farmerReply: {
      farmerName: 'Ramon Santos (Santos Agri-Farms)',
      date: '17 Oct 2026',
      message: 'Maraming salamat sir Mateo! We dry our onions for full 14 days under ambient shade before bagging. Glad your kitchen is happy.'
    },
    helpfulVotes: 14
  },
  {
    id: 'rev-002',
    listingId: 'crop-004',
    cropName: 'Highland Cabbage',
    orderId: 'ORD-2026-8692',
    buyerId: 'buyer-002',
    buyerName: 'Teresita Ong (Divisoria Stall 48)',
    rating: 5,
    qualityRating: 5,
    packagingRating: 4,
    deliveryRating: 5,
    title: 'Tight heads, minimal wrapper loss',
    comment: 'The cabbage from Benguet Highland Growers Coop arrived crisp without bruising. Heavy heads around 1.8 to 2.2 kg each. Great profit margin for wholesale resale.',
    date: '14 Oct 2026',
    verifiedPurchase: true,
    purchasedQuantityText: 'Purchased 100 kg • Cold-Chain Route #BG-09',
    images: [
      'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80'
    ],
    farmerReply: {
      farmerName: 'Elena Flores (Benguet Highland Coop)',
      date: '15 Oct 2026',
      message: 'Salamat po Maam Teresita! We pack in morning chill to keep turgidity high.'
    },
    helpfulVotes: 9
  },
  {
    id: 'rev-003',
    listingId: 'crop-002',
    cropName: 'Cherry Tomatoes',
    orderId: 'ORD-2026-8650',
    buyerId: 'buyer-003',
    buyerName: 'Chef Carlo Manalo',
    rating: 5,
    qualityRating: 5,
    packagingRating: 5,
    deliveryRating: 4,
    title: 'Exceptional sweetness and high brix',
    comment: 'Very sweet tomatoes for salad service. Firm skin with no cracking, beautifully packed in ventilated plastic crates with bubble bottom cushions.',
    date: '10 Oct 2026',
    verifiedPurchase: true,
    purchasedQuantityText: 'Purchased 15 kg • Laguna Volcanic Harvest',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=600&q=80'
    ],
    farmerReply: {
      farmerName: 'Danilo Cruz (San Pablo Organic)',
      date: '11 Oct 2026',
      message: 'Thank you Chef Carlo! Our drip fertigation gives them that balanced acidity.'
    },
    helpfulVotes: 8
  },
  {
    id: 'rev-004',
    listingId: 'crop-006',
    cropName: 'Native Ginger',
    orderId: 'ORD-2026-8610',
    buyerId: 'buyer-004',
    buyerName: 'Lina Batungbacal (Quezon Market Stall)',
    rating: 5,
    qualityRating: 5,
    packagingRating: 4,
    deliveryRating: 5,
    title: 'Strong aroma, clean rhizomes with no dirt weight',
    comment: 'The ginger arrived washed and dried, exactly 20.0 kg gross scale. Strong pungent aroma, yellow-gold core. Not like wet market ginger that loses 2kg in water weight!',
    date: '18 Oct 2026',
    verifiedPurchase: true,
    purchasedQuantityText: 'Purchased 20 kg • Infanta Loam Batch',
    images: [
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'
    ],
    farmerReply: {
      farmerName: 'Marcial Dimalanta (Cagayan Valley Assoc)',
      date: '19 Oct 2026',
      message: 'Maraming salamat! We wash and cure in air tunnels before boxing.'
    },
    helpfulVotes: 12
  },
  {
    id: 'rev-005',
    listingId: 'crop-007',
    cropName: 'Benguet Carrots',
    orderId: 'ORD-2026-8590',
    buyerId: 'buyer-005',
    buyerName: 'Rodelio Santos (Supermarket Procurement)',
    rating: 5,
    qualityRating: 5,
    packagingRating: 5,
    deliveryRating: 5,
    title: 'Smooth washed carrots, high supermarket grade',
    comment: 'Supplied our 3 branch branches with these 25kg bags. Small core, crisp sweet taste, and uniform 15cm sizing. Customers loved the vibrant orange color.',
    date: '20 Oct 2026',
    verifiedPurchase: true,
    purchasedQuantityText: 'Purchased 150 kg • Terracotta Nantes',
    images: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522184216316-3c25379f9760?auto=format&fit=crop&w=600&q=80'
    ],
    farmerReply: {
      farmerName: 'Elena Flores (Benguet Highland Coop)',
      date: '21 Oct 2026',
      message: 'Thank you Rodelio! We sort by mechanical grader to guarantee uniform sizes.'
    },
    helpfulVotes: 15
  }
];

export const mockVerificationApplications: VerificationApplication[] = [
  {
    id: 'VER-2026-0041',
    farmerId: 'farmer-001',
    applicantName: 'Ramon Santos',
    farmName: 'Santos Agri-Farms',
    phone: '+63 918 765 4321',
    email: 'ramon@santosfarms.ph',
    sellerType: 'individual_farmer',
    region: 'Region III (Central Luzon)',
    province: 'Nueva Ecija',
    municipality: 'Cabanatuan City',
    barangay: 'San Josef Sur',
    documentType: 'RSBSA Farmer Registry',
    documentNumberMasked: 'RSBSA-03-49-****-0912',
    documentFileName: 'RSBSA_Santos_Ramon_Verified.pdf',
    farmPhotos: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'approved',
    submittedDate: '10 Sep 2026',
    reviewedDate: '12 Sep 2026',
    reviewerNotes: 'RSBSA registration cross-checked with DA Region III masterlist. Land cultivation coordinates match municipal registry.',
    auditTrail: [
      { action: 'Application submitted', actor: 'Ramon Santos', timestamp: '10 Sep 2026, 09:20 AM' },
      { action: 'Queue assigned to Staff', actor: 'System', timestamp: '10 Sep 2026, 09:22 AM' },
      { action: 'Approved and Verified Badge Awarded', actor: 'Atty. Cristina Valdez (Staff)', timestamp: '12 Sep 2026, 02:40 PM', notes: 'Documents verified and legitimate.' }
    ]
  },
  {
    id: 'VER-2026-0088',
    farmerId: 'farmer-006',
    applicantName: 'Bernardo Viray',
    farmName: 'Sierra Madre Foothills Cooperative',
    phone: '+63 920 444 8899',
    email: 'viray.b@sierramadre.org.ph',
    sellerType: 'cooperative',
    region: 'Region IV-A (CALABARZON)',
    province: 'Quezon',
    municipality: 'Infanta',
    barangay: 'Dinahican',
    documentType: 'Cooperative CDA Registration',
    documentNumberMasked: 'CDA-R04-****-0428',
    documentFileName: 'CDA_Registration_2026_Renewal.pdf',
    farmPhotos: [
      'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'under_review',
    submittedDate: '23 Oct 2026',
    reviewerNotes: 'Cooperative board resolution authorizing Bernardo Viray as legal Pananim representative submitted. Awaiting CDA online barcode verification.',
    auditTrail: [
      { action: 'Renewal submitted', actor: 'Bernardo Viray', timestamp: '23 Oct 2026, 10:14 AM' },
      { action: 'Assigned for document review', actor: 'Staff Reviewer', timestamp: '23 Oct 2026, 11:00 AM' }
    ]
  },
  {
    id: 'VER-2026-0092',
    farmerId: 'farmer-007',
    applicantName: 'Josefa Alcantara',
    farmName: 'Alcantara Heirloom Rice & Roots',
    phone: '+63 917 333 2211',
    email: 'josefa.alcantara@gmail.com',
    sellerType: 'individual_farmer',
    region: 'Region I (Ilocos Region)',
    province: 'Ilocos Norte',
    municipality: 'Batac City',
    barangay: 'Bungon',
    documentType: 'Barangay Agrarian Cert',
    documentNumberMasked: 'BRGY-CERT-****-441',
    documentFileName: 'brgy_certificate_scan.jpg',
    farmPhotos: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'more_info_needed',
    submittedDate: '22 Oct 2026',
    reviewedDate: '23 Oct 2026',
    reviewerNotes: 'Barangay certificate uploaded is low-resolution and official seal is obscured. Please provide a clear photograph or official RSBSA stub.',
    rejectionOrCorrectionReason: 'Uploaded Barangay Certificate is unreadable. Official dry seal and Barangay Captain signature must be clearly visible.',
    auditTrail: [
      { action: 'Draft submitted', actor: 'Josefa Alcantara', timestamp: '22 Oct 2026, 04:30 PM' },
      { action: 'Corrections Requested', actor: 'Atty. Cristina Valdez (Staff)', timestamp: '23 Oct 2026, 09:15 AM', notes: 'Requested clear document scan.' }
    ]
  }
];

export const mockQuotes: QuoteRequest[] = [
  {
    id: 'QT-2026-041',
    buyerId: 'buyer-001',
    buyerName: 'Mateo Rodriguez',
    farmId: 'farm-001',
    farmName: 'Santos Agri-Farms',
    cropId: 'crop-001',
    cropName: 'Red Onions (Class A)',
    quantityRequested: 500,
    unit: 'kg',
    targetPricePerUnit: 100,
    deliveryAddress: 'Bldg 4, Laguna Technopark, Biñan City, Laguna',
    deliveryWindow: 'Early November 2026',
    packagingNotes: 'Palletized 25kg red mesh sacks, shrink-wrapped with corner boards.',
    status: 'quoted',
    offeredPricePerUnit: 105,
    offeredDeliveryFee: 1800,
    sellerNotes: 'Can fulfill from our upcoming November 2 harvest. Price of ₱105/kg reflects dedicated refrigerated truck to Biñan.',
    createdAt: '22 Oct 2026',
    expiresAt: '28 Oct 2026'
  }
];

export const mockSupportIssues: SupportIssue[] = [
  {
    id: 'ISS-2026-019',
    orderId: 'ORD-2026-8842',
    sellerOrderId: 'SO-8842-1',
    buyerName: 'Mateo Rodriguez',
    cropName: 'Red Onions',
    issueType: 'quantity_discrepancy',
    quantityAffected: '2 kg weight difference',
    description: 'Gross weight at intake scale measured 23.0kg instead of 25.0kg mesh sack due to transit moisture drying.',
    status: 'under_review',
    requestedResolution: 'refund',
    refundAmount: 240,
    createdAt: '24 Oct 2026',
    sellerResponse: 'Farmer Ramon Santos acknowledged natural moisture curing and authorized 2kg refund credit.'
  }
];

export interface FarmerSettlement {
  id: string;
  payoutReference: string;
  date: string;
  grossAmount: number;
  platformFee: number;
  netPayout: number;
  payoutDestination: string;
  status: 'Paid' | 'Processing' | 'Scheduled';
  sourceOrders: string[];
}

export const mockFarmerSettlements: FarmerSettlement[] = [
  {
    id: 'STL-2026-104',
    payoutReference: 'PAYOUT-BDO-20261021-991',
    date: '21 Oct 2026',
    grossAmount: 3240,
    platformFee: 97.2,
    netPayout: 3142.8,
    payoutDestination: 'BDO Unibank •••• 9102 (Ramon Santos)',
    status: 'Paid',
    sourceOrders: ['#ORD-2026-8842 (25kg Red Onions)']
  },
  {
    id: 'STL-2026-098',
    payoutReference: 'PAYOUT-LBP-20261014-412',
    date: '14 Oct 2026',
    grossAmount: 18500,
    platformFee: 555.0,
    netPayout: 17945.0,
    payoutDestination: 'LandBank Agri Account •••• 4421',
    status: 'Paid',
    sourceOrders: ['#ORD-2026-8701 (150kg Onions)', '#ORD-2026-8705 (50kg Tomatoes)']
  },
  {
    id: 'STL-2026-110',
    payoutReference: 'PENDING-ESCROW-20261024',
    date: '24 Oct 2026',
    grossAmount: 950,
    platformFee: 28.5,
    netPayout: 921.5,
    payoutDestination: 'BDO Unibank •••• 9102 (Ramon Santos)',
    status: 'Processing',
    sourceOrders: ['#ORD-2026-9500 (10kg Tomatoes ₱550)']
  }
];
