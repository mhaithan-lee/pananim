export type MessageSenderRole = 'buyer' | 'farmer' | 'support';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export type ContextCardType = 'product' | 'order' | 'quote' | 'cart';

export interface ChatContextCard {
  type: ContextCardType;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  price?: string;
  unit?: string;
  quantity?: string | number;
  referenceId?: string;
  linkUrl?: string;
  disclaimer?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: MessageSenderRole;
  text: string;
  timestamp: string; // ISO or readable e.g. "10:24 AM"
  dateKey: string; // e.g. "2026-10-25" for date separators
  status: MessageStatus;
  imageUrl?: string;
  contextCard?: ChatContextCard;
}

export interface ChatConversation {
  id: string;
  farmId: string;
  farmName: string;
  farmerName: string;
  farmerAvatar: string;
  isVerified: boolean;
  buyerId: string;
  buyerName: string;
  buyerAvatar?: string;
  unreadCountBuyer: number;
  unreadCountFarmer: number;
  lastMessage?: {
    text: string;
    timestamp: string;
    senderRole: MessageSenderRole;
    status: MessageStatus;
  };
  lastActivity: string;
  isBlocked?: boolean;
  isFarmerSuspended?: boolean;
  draftText?: string;
}

export const PRODUCT_CONVERSATION_STARTERS = [
  'Is this crop available?',
  'Can you supply my required quantity?',
  'Do you deliver to my location?',
  'Can I request a bulk price?'
];
