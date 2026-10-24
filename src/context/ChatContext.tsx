import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ChatConversation, 
  ChatMessage, 
  ChatContextCard, 
  MessageSenderRole 
} from '../types/chat';
import { Farm, User } from '../types';
import { mockFarms } from '../data/mockData';

interface GuestPromptState {
  isOpen: boolean;
  farmName?: string;
  farmId?: string;
  contextCard?: ChatContextCard;
  starterText?: string;
}

interface ChatContextType {
  conversations: ChatConversation[];
  messages: Record<string, ChatMessage[]>;
  activeConversationId: string | null;
  activeConversation: ChatConversation | null;
  isDrawerOpen: boolean;
  pendingContextCard: ChatContextCard | null;
  pendingStarterText: string | null;
  drafts: Record<string, string>;
  totalUnreadBuyer: number;
  totalUnreadFarmer: number;
  unreadCount: number;
  simulateNetworkFailure: boolean;
  guestPrompt: GuestPromptState;
  
  // Actions
  openChatWithSeller: (farmId: string, contextCard?: ChatContextCard, starterText?: string) => void;
  closeChat: () => void;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string, contextCard?: ChatContextCard, imageUrl?: string) => void;
  retryMessage: (conversationId: string, messageId: string) => void;
  setDraft: (conversationId: string, draft: string) => void;
  clearPendingContext: () => void;
  clearPendingStarterText: () => void;
  markConversationRead: (conversationId: string, role?: 'buyer' | 'farmer') => void;
  blockSeller: (conversationId: string) => void;
  reportAbuse: (conversationId: string, reason: string) => void;
  simulateFarmerReply: (conversationId: string, text?: string) => void;
  setSimulateNetworkFailure: (val: boolean) => void;
  closeGuestPrompt: () => void;
  completeGuestAuthAndOpenChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const DRAFTS_STORAGE_KEY = 'pananim_chat_drafts_v1';

// Initial authentic mock conversations matching Pananim marketplace farms
const initialConversations: ChatConversation[] = [
  {
    id: 'conv-farm-001',
    farmId: 'farm-001',
    farmName: 'Santos Agri-Farms',
    farmerName: 'Ramon Santos',
    farmerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    buyerId: 'buyer-101',
    buyerName: 'Mateo Rodriguez',
    unreadCountBuyer: 1,
    unreadCountFarmer: 0,
    lastActivity: '10:45 AM',
    lastMessage: {
      text: 'Good day sir Mateo! The Red Pinoy onions for Order #ORD-2026-8842 are bagged and loaded in the 6-wheeler refrigerated cargo.',
      timestamp: '10:45 AM',
      senderRole: 'farmer',
      status: 'delivered'
    }
  },
  {
    id: 'conv-farm-002',
    farmId: 'farm-002',
    farmName: 'Benguet Highland Growers Coop',
    farmerName: 'Elena Flores (Lead Coordinator)',
    farmerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    buyerId: 'buyer-101',
    buyerName: 'Mateo Rodriguez',
    unreadCountBuyer: 0,
    unreadCountFarmer: 1,
    lastActivity: 'Yesterday',
    lastMessage: {
      text: 'We have reserved 250kg Scorpio F1 Cabbage for your scheduled weekend pickup in La Trinidad.',
      timestamp: 'Yesterday 3:15 PM',
      senderRole: 'farmer',
      status: 'read'
    }
  },
  {
    id: 'conv-farm-003',
    farmId: 'farm-003',
    farmName: 'San Pablo Valley Organic Producers',
    farmerName: 'Danilo Cruz',
    farmerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    buyerId: 'buyer-101',
    buyerName: 'Mateo Rodriguez',
    unreadCountBuyer: 0,
    unreadCountFarmer: 0,
    lastActivity: '18 Oct 2026',
    lastMessage: {
      text: 'Our sweet cherry tomatoes are picked at 5:00 AM on dispatch day to ensure zero loss of turgidity.',
      timestamp: '18 Oct 2026',
      senderRole: 'farmer',
      status: 'read'
    }
  }
];

const initialMessages: Record<string, ChatMessage[]> = {
  'conv-farm-001': [
    {
      id: 'msg-101',
      conversationId: 'conv-farm-001',
      senderId: 'buyer-101',
      senderName: 'Mateo Rodriguez',
      senderRole: 'buyer',
      text: 'Hello sir Ramon! Inquiring regarding Red Creole Onions harvest for our restaurant commissary in Makati.',
      timestamp: '15 Oct 2026, 9:20 AM',
      dateKey: '2026-10-15',
      status: 'read',
      contextCard: {
        type: 'product',
        title: 'Red Creole Onions (Variety: Red Pinoy)',
        subtitle: 'Santos Agri-Farms • Nueva Ecija',
        imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80',
        price: '₱120.00 / kg',
        unit: '25kg red mesh sacks',
        linkUrl: '/crops/crop-001',
        disclaimer: 'Product prices shown in chat are contextual wholesale benchmarks and not binding purchase contracts until confirmed via checkout.'
      }
    },
    {
      id: 'msg-102',
      conversationId: 'conv-farm-001',
      senderId: 'farm-001',
      senderName: 'Ramon Santos',
      senderRole: 'farmer',
      text: 'Magandang araw sir Mateo! Yes po, our current batch has undergone full 14-day ambient curing in Cabanatuan. Very firm necks and zero moisture rot.',
      timestamp: '15 Oct 2026, 9:32 AM',
      dateKey: '2026-10-15',
      status: 'read'
    },
    {
      id: 'msg-103',
      conversationId: 'conv-farm-001',
      senderId: 'buyer-101',
      senderName: 'Mateo Rodriguez',
      senderRole: 'buyer',
      text: 'Placed Order #ORD-2026-8842 for 25kg. Please ensure ventilated packaging.',
      timestamp: '16 Oct 2026, 11:05 AM',
      dateKey: '2026-10-16',
      status: 'read',
      contextCard: {
        type: 'order',
        title: 'Order Reference #ORD-2026-8842',
        subtitle: '25kg Red Creole Onions (₱3,000.00) • Status: Confirmed',
        referenceId: 'ORD-2026-8842',
        disclaimer: 'Note: Chat messages are for seller coordination and harvest inquiry. Formal shortages or cancellations must be filed via Report an Issue.'
      }
    },
    {
      id: 'msg-104',
      conversationId: 'conv-farm-001',
      senderId: 'farm-001',
      senderName: 'Ramon Santos',
      senderRole: 'farmer',
      text: 'Good day sir Mateo! The Red Pinoy onions for Order #ORD-2026-8842 are bagged and loaded in the 6-wheeler refrigerated cargo.',
      timestamp: 'Today, 10:45 AM',
      dateKey: '2026-10-25',
      status: 'delivered'
    }
  ],
  'conv-farm-002': [
    {
      id: 'msg-201',
      conversationId: 'conv-farm-002',
      senderId: 'buyer-101',
      senderName: 'Mateo Rodriguez',
      senderRole: 'buyer',
      text: 'Hi Elena, can Benguet Highland Growers supply 250kg Scorpio Cabbage every Tuesday?',
      timestamp: 'Yesterday 2:30 PM',
      dateKey: '2026-10-24',
      status: 'read'
    },
    {
      id: 'msg-202',
      conversationId: 'conv-farm-002',
      senderId: 'farm-002',
      senderName: 'Elena Flores (Lead Coordinator)',
      senderRole: 'farmer',
      text: 'We have reserved 250kg Scorpio F1 Cabbage for your scheduled weekend pickup in La Trinidad.',
      timestamp: 'Yesterday 3:15 PM',
      dateKey: '2026-10-24',
      status: 'read'
    }
  ],
  'conv-farm-003': [
    {
      id: 'msg-301',
      conversationId: 'conv-farm-003',
      senderId: 'buyer-101',
      senderName: 'Mateo Rodriguez',
      senderRole: 'buyer',
      text: 'What time is early harvest collection in San Pablo?',
      timestamp: '18 Oct 2026',
      dateKey: '2026-10-18',
      status: 'read'
    },
    {
      id: 'msg-302',
      conversationId: 'conv-farm-003',
      senderId: 'farm-003',
      senderName: 'Danilo Cruz',
      senderRole: 'farmer',
      text: 'Our sweet cherry tomatoes are picked at 5:00 AM on dispatch day to ensure zero loss of turgidity.',
      timestamp: '18 Oct 2026',
      dateKey: '2026-10-18',
      status: 'read'
    }
  ]
};

interface ChatProviderProps {
  children: ReactNode;
  currentUser: User | null;
  onNavigate: (route: string) => void;
  farms: Farm[];
}

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  currentUser,
  onNavigate,
  farms
}) => {
  const [conversations, setConversations] = useState<ChatConversation[]>(initialConversations);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initialMessages);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [pendingContextCard, setPendingContextCard] = useState<ChatContextCard | null>(null);
  const [pendingStarterText, setPendingStarterText] = useState<string | null>(null);
  const [simulateNetworkFailure, setSimulateNetworkFailure] = useState<boolean>(false);
  const [guestPrompt, setGuestPrompt] = useState<GuestPromptState>({ isOpen: false });

  // Load and save drafts to safe storage
  const [drafts, setDraftsState] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(DRAFTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const setDraft = (conversationId: string, draft: string) => {
    setDraftsState(prev => {
      const next = { ...prev, [conversationId]: draft };
      try {
        localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

  const totalUnreadBuyer = conversations.reduce((acc, c) => acc + (c.unreadCountBuyer || 0), 0);
  const totalUnreadFarmer = conversations.reduce((acc, c) => acc + (c.unreadCountFarmer || 0), 0);

  // Helper to find farm by ID
  const getFarm = (farmId: string): Farm | undefined => {
    return farms.find(f => f.id === farmId) || mockFarms.find(f => f.id === farmId);
  };

  // Open chat with seller
  const openChatWithSeller = (farmId: string, contextCard?: ChatContextCard, starterText?: string) => {
    const farm = getFarm(farmId);
    const farmName = farm?.name || 'Verified Farmer';

    // Journey 4: Visitors can see buttons, but clicking prompts sign in
    if (!currentUser || currentUser.role === 'guest') {
      setGuestPrompt({
        isOpen: true,
        farmName,
        farmId,
        contextCard,
        starterText
      });
      return;
    }

    // Prevent buyers from messaging themselves if they are that farmer
    if (currentUser.farmId && currentUser.farmId === farmId) {
      alert("You cannot initiate a buyer chat with your own farm profile.");
      return;
    }

    // Reuse existing buyer-seller conversation instead of creating duplicates
    const buyerId = currentUser.id || 'buyer-101';
    let targetConv = conversations.find(c => c.farmId === farmId && c.buyerId === buyerId);

    if (!targetConv) {
      const newConvId = `conv-${farmId}-${buyerId}`;
      const newConv: ChatConversation = {
        id: newConvId,
        farmId,
        farmName: farm?.name || 'Provincial Farm Hub',
        farmerName: farm?.farmerName || 'Agricultural Producer',
        farmerAvatar: farm?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        isVerified: farm?.verificationStatus === 'verified',
        buyerId,
        buyerName: currentUser.name || 'Wholesale Buyer',
        buyerAvatar: currentUser.avatarUrl,
        unreadCountBuyer: 0,
        unreadCountFarmer: 0,
        lastActivity: 'Just now'
      };

      setConversations(prev => [newConv, ...prev]);
      setMessages(prev => ({ ...prev, [newConvId]: [] }));
      targetConv = newConv;
    }

    setActiveConversationId(targetConv.id);
    if (contextCard) {
      setPendingContextCard(contextCard);
    }
    if (starterText) {
      setPendingStarterText(starterText);
    }

    // Mark as read for buyer
    setConversations(prev => prev.map(c => c.id === targetConv!.id ? { ...c, unreadCountBuyer: 0 } : c));
    setIsDrawerOpen(true);
  };

  const closeChat = () => {
    setIsDrawerOpen(false);
  };

  const clearPendingContext = () => {
    setPendingContextCard(null);
  };

  const clearPendingStarterText = () => {
    setPendingStarterText(null);
  };

  const closeGuestPrompt = () => {
    setGuestPrompt({ isOpen: false });
  };

  const completeGuestAuthAndOpenChat = () => {
    const { farmId, contextCard, starterText } = guestPrompt;
    setGuestPrompt({ isOpen: false });
    if (farmId) {
      setTimeout(() => {
        openChatWithSeller(farmId, contextCard, starterText);
      }, 100);
    }
  };

  // Send message
  const sendMessage = (
    conversationId: string, 
    text: string, 
    contextCard?: ChatContextCard,
    imageUrl?: string
  ) => {
    const trimmed = text.trim();
    if (!trimmed && !imageUrl) return;

    const messageId = `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateKey = now.toISOString().split('T')[0];

    const isFailed = simulateNetworkFailure;

    const newMsg: ChatMessage = {
      id: messageId,
      conversationId,
      senderId: currentUser?.id || 'buyer-101',
      senderName: currentUser?.name || 'Mateo Rodriguez',
      senderRole: (currentUser?.role === 'farmer' ? 'farmer' : 'buyer') as MessageSenderRole,
      text: trimmed,
      timestamp: timeStr,
      dateKey,
      status: isFailed ? 'failed' : 'sending',
      imageUrl,
      contextCard: contextCard || pendingContextCard || undefined
    };

    // Add to message history
    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg]
    }));

    // Clear pending context & starter text once sent
    setPendingContextCard(null);
    setPendingStarterText(null);

    // Clear draft
    setDraft(conversationId, '');

    // If failed due to simulation, do not advance
    if (isFailed) {
      return;
    }

    // Transition sending -> sent -> delivered
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [conversationId]: (prev[conversationId] || []).map(m => 
          m.id === messageId ? { ...m, status: 'sent' } : m
        )
      }));

      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [conversationId]: (prev[conversationId] || []).map(m => 
            m.id === messageId ? { ...m, status: 'delivered' } : m
          )
        }));
      }, 600);
    }, 400);

    // Update conversation metadata
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastActivity: timeStr,
          lastMessage: {
            text: trimmed || (imageUrl ? '📷 [Image attachment]' : ''),
            timestamp: timeStr,
            senderRole: newMsg.senderRole,
            status: isFailed ? 'failed' : 'delivered'
          },
          unreadCountFarmer: c.unreadCountFarmer + 1
        };
      }
      return c;
    }));
  };

  // Retry message (Prevent duplicate messages on retry!)
  const retryMessage = (conversationId: string, messageId: string) => {
    setMessages(prev => ({
      ...prev,
      [conversationId]: (prev[conversationId] || []).map(m => 
        m.id === messageId ? { ...m, status: 'sending' } : m
      )
    }));

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [conversationId]: (prev[conversationId] || []).map(m => 
          m.id === messageId ? { ...m, status: 'sent' } : m
        )
      }));

      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [conversationId]: (prev[conversationId] || []).map(m => 
            m.id === messageId ? { ...m, status: 'delivered' } : m
          )
        }));
      }, 600);
    }, 400);
  };

  // Mark conversation read
  const markConversationRead = (conversationId: string, role: 'buyer' | 'farmer' = 'buyer') => {
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return role === 'buyer' 
          ? { ...c, unreadCountBuyer: 0 } 
          : { ...c, unreadCountFarmer: 0 };
      }
      return c;
    }));
  };

  // Block seller
  const blockSeller = (conversationId: string) => {
    setConversations(prev => prev.map(c => 
      c.id === conversationId ? { ...c, isBlocked: true } : c
    ));
    alert('Seller blocked. You will not receive new unsolicited messages from this grower, but transaction history and Pananim dispute support remain accessible.');
  };

  // Report abuse
  const reportAbuse = (conversationId: string, reason: string) => {
    alert(`Report submitted for conversation (${reason}). Pananim Trust & Safety will inspect the message log and take appropriate platform action.`);
  };

  // Simulate seller response (for testing journey 5: matching buyer conversation and accurate unread count)
  const simulateFarmerReply = (conversationId: string, customText?: string) => {
    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return;

    const replies = [
      `Salamat po! We verified the lot. Quality is top-grade and ready for scheduled harvest dispatch.`,
      `Yes, we can consolidate this with your upcoming Pananim Shared Cargo shipment.`,
      `Good day! We have noted your specifications and will attach harvest photos as soon as crates are packed.`,
      `Thank you for reaching out! We can accommodate your required quantity for next week delivery.`
    ];
    const text = customText || replies[Math.floor(Math.random() * replies.length)];

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateKey = now.toISOString().split('T')[0];

    const replyMsg: ChatMessage = {
      id: `msg-farmer-${Date.now()}`,
      conversationId,
      senderId: conv.farmId,
      senderName: conv.farmerName,
      senderRole: 'farmer',
      text,
      timestamp: timeStr,
      dateKey,
      status: 'delivered'
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), replyMsg]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        const isCurrentlyViewing = isDrawerOpen && activeConversationId === conversationId;
        return {
          ...c,
          lastActivity: timeStr,
          lastMessage: {
            text,
            timestamp: timeStr,
            senderRole: 'farmer',
            status: 'delivered'
          },
          unreadCountBuyer: isCurrentlyViewing ? 0 : c.unreadCountBuyer + 1
        };
      }
      return c;
    }));
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        messages,
        activeConversationId,
        activeConversation,
        isDrawerOpen,
        pendingContextCard,
        pendingStarterText,
        drafts,
        totalUnreadBuyer,
        totalUnreadFarmer,
        unreadCount: totalUnreadBuyer,
        simulateNetworkFailure,
        guestPrompt,
        openChatWithSeller,
        closeChat,
        setActiveConversationId,
        sendMessage,
        retryMessage,
        setDraft,
        clearPendingContext,
        clearPendingStarterText,
        markConversationRead,
        blockSeller,
        reportAbuse,
        simulateFarmerReply,
        setSimulateNetworkFailure,
        closeGuestPrompt,
        completeGuestAuthAndOpenChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
