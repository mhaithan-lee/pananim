import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import { 
  X, 
  Send, 
  Image as ImageIcon, 
  Check, 
  CheckCheck, 
  AlertCircle, 
  RotateCw, 
  ShieldCheck, 
  ExternalLink, 
  MoreVertical, 
  ArrowLeft, 
  Inbox, 
  Paperclip,
  CheckCircle,
  HelpCircle,
  WifiOff
} from 'lucide-react';
import { PRODUCT_CONVERSATION_STARTERS } from '../types/chat';

interface ChatDrawerProps {
  onNavigate: (route: string) => void;
  onLoginAsBuyer?: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ 
  onNavigate,
  onLoginAsBuyer 
}) => {
  const {
    activeConversation,
    activeConversationId,
    isDrawerOpen,
    closeChat,
    messages,
    sendMessage,
    retryMessage,
    drafts,
    setDraft,
    pendingContextCard,
    clearPendingContext,
    pendingStarterText,
    clearPendingStarterText,
    blockSeller,
    reportAbuse,
    simulateFarmerReply,
    simulateNetworkFailure,
    setSimulateNetworkFailure,
    guestPrompt,
    closeGuestPrompt,
    completeGuestAuthAndOpenChat
  } = useChat();

  const [messageText, setMessageText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const composerInputRef = useRef<HTMLTextAreaElement>(null);

  // Resize listener for mobile/desktop adaptation
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Restore draft and starter text when switching conversation
  useEffect(() => {
    if (activeConversationId) {
      if (pendingStarterText) {
        setMessageText(pendingStarterText);
        clearPendingStarterText();
      } else {
        setMessageText(drafts[activeConversationId] || '');
      }
      setSelectedImage(null);
    }
  }, [activeConversationId, pendingStarterText]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isDrawerOpen && activeConversationId) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isDrawerOpen, activeConversationId, messages]);

  // Handle draft changes
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMessageText(val);
    if (activeConversationId) {
      setDraft(activeConversationId, val);
    }
  };

  // Quick conversation starter clicked: fills composer without sending!
  const handleSelectStarter = (starter: string) => {
    setMessageText(starter);
    if (activeConversationId) {
      setDraft(activeConversationId, starter);
    }
    composerInputRef.current?.focus();
  };

  // Submit message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeConversationId) return;
    if (!messageText.trim() && !selectedImage) return;

    sendMessage(
      activeConversationId, 
      messageText, 
      pendingContextCard || undefined, 
      selectedImage || undefined
    );
    setMessageText('');
    setSelectedImage(null);
  };

  // Handle keydown Enter to send (Shift+Enter for newline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle simulated image attachment
  const handleAttachImage = () => {
    // Provide realistic harvest inspection photo attachment
    const sampleImages = [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=80'
    ];
    const picked = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setSelectedImage(picked);
  };

  // Active messages
  const currentMessages = (activeConversationId && messages[activeConversationId]) || [];

  // Group messages by date
  const groupedMessages: { dateKey: string; items: typeof currentMessages }[] = [];
  currentMessages.forEach(msg => {
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    if (lastGroup && lastGroup.dateKey === msg.dateKey) {
      lastGroup.items.push(msg);
    } else {
      groupedMessages.push({ dateKey: msg.dateKey, items: [msg] });
    }
  });

  return (
    <>
      {/* Guest Authentication Prompt Modal (Journey 4: Visitor clicks chat -> sign in -> resume chat with context & cart intact) */}
      {guestPrompt.isOpen && (
        <div className="modal-overlay" onClick={closeGuestPrompt}>
          <div 
            className="card" 
            style={{
              maxWidth: '460px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              padding: '2.25rem',
              borderRadius: '16px',
              textAlign: 'center'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <ShieldCheck size={32} color="#0C3C2C" />
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>
              Sign In to Chat with Seller
            </h3>
            <p style={{ color: '#574A46', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Connect directly with <strong>{guestPrompt.farmName || 'this verified grower'}</strong> to ask harvest inquiries, confirm delivery zones, or negotiate bulk orders.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                onClick={() => {
                  if (onLoginAsBuyer) {
                    onLoginAsBuyer();
                    completeGuestAuthAndOpenChat();
                  } else {
                    onNavigate('/login');
                    closeGuestPrompt();
                  }
                }}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Sign In as Buyer Demo
              </button>

              <button 
                onClick={() => {
                  closeGuestPrompt();
                  onNavigate('/register/buyer');
                }}
                className="btn btn-outline-warm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Create Free Buyer Account
              </button>

              <button 
                onClick={closeGuestPrompt}
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '0.5rem' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Abuse Report Modal */}
      {reportModalOpen && (
        <div className="modal-overlay" onClick={() => setReportModalOpen(false)}>
          <div 
            className="card" 
            style={{ maxWidth: '440px', width: '100%', backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '16px' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C', marginBottom: '0.75rem' }}>
              Report Inappropriate Messaging
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#574A46', marginBottom: '1rem' }}>
              Pananim prohibits offline payment diversion, harassment, or fraudulent crop quality representations.
            </p>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0C3C2C', display: 'block', marginBottom: '0.4rem' }}>
                Select Violation Reason:
              </label>
              <select 
                value={reportReason} 
                onChange={e => setReportReason(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1.5px solid #DECDBD', fontSize: '0.875rem' }}
              >
                <option value="">-- Choose a reason --</option>
                <option value="Off-platform payment solicitation (circumventing escrow)">Off-platform payment solicitation</option>
                <option value="Unsolicited advertising / Spam">Unsolicited advertising / Spam</option>
                <option value="Misrepresentation of harvest grade or origin">Misrepresentation of crop grade</option>
                <option value="Unprofessional or abusive conduct">Unprofessional conduct</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setReportModalOpen(false)} className="btn btn-secondary btn-sm">Cancel</button>
              <button 
                onClick={() => {
                  if (!reportReason) {
                    alert('Please select a reason.');
                    return;
                  }
                  if (activeConversationId) reportAbuse(activeConversationId, reportReason);
                  setReportModalOpen(false);
                  setReportReason('');
                }}
                className="btn btn-accent btn-sm"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Drawer (Desktop: Right-Side Flyout Drawer | Mobile: Full-Screen View) */}
      {isDrawerOpen && activeConversation && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Chat with seller: ${activeConversation.farmName}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1050,
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: isMobile ? '#FAF6F0' : 'rgba(12, 60, 44, 0.45)',
            backdropFilter: isMobile ? 'none' : 'blur(3px)',
            transition: 'opacity 0.2s ease'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isMobile) {
              closeChat();
            }
          }}
        >
          <div
            style={{
              width: isMobile ? '100%' : '440px',
              height: '100%',
              backgroundColor: '#FAF6F0',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: isMobile ? 'none' : '-8px 0 30px rgba(12, 60, 44, 0.25)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top Testing Controls Bar for Journeys 5 & 6 (Discrete Dev Tools) */}
            <div 
              style={{
                backgroundColor: '#07271C',
                color: '#D5E6DE',
                padding: '0.4rem 1rem',
                fontSize: '0.72rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #144434'
              }}
            >
              <span style={{ fontWeight: 600 }}>🛠️ Chat Journey Testing</span>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => simulateFarmerReply(activeConversation.id)}
                  style={{
                    backgroundColor: '#13533E',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}
                  title="Simulate incoming reply from seller (Journey 5)"
                >
                  + Simulate Seller Reply
                </button>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} title="Toggle simulated network error (Journey 6)">
                  <input 
                    type="checkbox" 
                    checked={simulateNetworkFailure} 
                    onChange={e => setSimulateNetworkFailure(e.target.checked)} 
                    style={{ cursor: 'pointer' }}
                  />
                  <span>Fail next send</span>
                </label>
              </div>
            </div>

            {/* Header: Farm name, avatar, verified badge, storefront link, and close/back controls */}
            <div
              style={{
                backgroundColor: '#0C3C2C',
                color: '#FFFFFF',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 10
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                {isMobile && (
                  <button
                    onClick={closeChat}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      padding: '0.35rem',
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '-0.25rem'
                    }}
                    aria-label="Back to previous page"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}

                {/* Farmer Avatar */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    src={activeConversation.farmerAvatar}
                    alt={activeConversation.farmerName}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #FFFFFF'
                    }}
                  />
                  {activeConversation.isVerified && (
                    <span 
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        right: '-2px',
                        backgroundColor: '#2B785E',
                        color: '#FFFFFF',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1.5px solid #0C3C2C'
                      }}
                      title="Verified Platform Grower"
                    >
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                </div>

                {/* Farm & Coordinator Names */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <h3 
                      style={{ 
                        fontSize: '1.05rem', 
                        color: '#FFFFFF', 
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {activeConversation.farmName}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#D5E6DE' }}>
                    <span>{activeConversation.farmerName}</span>
                    <span>&bull;</span>
                    <button
                      onClick={() => {
                        onNavigate(`/farmers/${activeConversation.farmId}`);
                        closeChat();
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#D48216',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontWeight: 600,
                        textDecoration: 'underline'
                      }}
                    >
                      Storefront <ExternalLink size={10} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions: Open full inbox, options menu, close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
                <button
                  onClick={() => {
                    closeChat();
                    onNavigate('/buyer/messages');
                  }}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: isMobile ? 'none' : 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                  title="Open full-screen messages inbox"
                >
                  <Inbox size={13} /> Full Inbox
                </button>

                {/* Options 3-dots */}
                <button
                  onClick={() => setOptionsMenuOpen(!optionsMenuOpen)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    padding: '0.4rem',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label="Conversation options"
                >
                  <MoreVertical size={18} />
                </button>

                {/* Close Button on Desktop */}
                {!isMobile && (
                  <button
                    onClick={closeChat}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      padding: '0.4rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    aria-label="Close chat drawer"
                  >
                    <X size={20} />
                  </button>
                )}

                {/* Options Menu Dropdown */}
                {optionsMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      marginTop: '0.5rem',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                      padding: '0.5rem 0',
                      width: '210px',
                      zIndex: 100,
                      border: '1px solid #DECDBD'
                    }}
                  >
                    <button
                      onClick={() => {
                        setOptionsMenuOpen(false);
                        onNavigate('/buyer/orders');
                        closeChat();
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.6rem 1rem',
                        fontSize: '0.8rem',
                        color: '#0C3C2C',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      View Existing Orders
                    </button>
                    <button
                      onClick={() => {
                        setOptionsMenuOpen(false);
                        setReportModalOpen(true);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.6rem 1rem',
                        fontSize: '0.8rem',
                        color: '#9B3C1B',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <AlertCircle size={14} /> Report Abuse / Policy Issue
                    </button>
                    <button
                      onClick={() => {
                        setOptionsMenuOpen(false);
                        if (confirm(`Block ${activeConversation.farmName}? You will stop receiving unsolicited messages, but transaction records remain.`)) {
                          blockSeller(activeConversation.id);
                        }
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.6rem 1rem',
                        fontSize: '0.8rem',
                        color: '#574A46',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Block Seller
                    </button>
                    <div style={{ borderTop: '1px solid #F5EDE2', margin: '0.35rem 0' }} />
                    <button
                      onClick={() => {
                        setOptionsMenuOpen(false);
                        onNavigate('/help');
                        closeChat();
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.6rem 1rem',
                        fontSize: '0.8rem',
                        color: '#0C3C2C',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <HelpCircle size={14} /> Contact Pananim Support
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Trust & Safety Notice */}
            <div
              style={{
                backgroundColor: '#FAF6F0',
                borderBottom: '1px solid #EADECF',
                padding: '0.45rem 1rem',
                fontSize: '0.72rem',
                color: '#574A46',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <ShieldCheck size={13} color="#2B785E" style={{ flexShrink: 0 }} />
              <span>
                Protected Conversation &bull; Wholesale prices shown in chat are contextual benchmarks. Formal orders settle via escrow.
              </span>
            </div>

            {/* Conversation Messages Body */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.25rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {groupedMessages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: '#8A7B76' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                    <ShieldCheck size={28} />
                  </div>
                  <h4 style={{ color: '#0C3C2C', marginBottom: '0.35rem' }}>Direct Conversation with {activeConversation.farmName}</h4>
                  <p style={{ fontSize: '0.825rem', lineHeight: 1.5, maxWidth: '280px', margin: '0 auto' }}>
                    Send an inquiry about current harvest volume, packaging preferences, or delivery schedule.
                  </p>
                </div>
              ) : (
                groupedMessages.map((grp, gIdx) => (
                  <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {/* Date Separator */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem 0' }}>
                      <span
                        style={{
                          backgroundColor: '#EADECF',
                          color: '#574A46',
                          fontSize: '0.675rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.65rem',
                          borderRadius: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em'
                        }}
                      >
                        {grp.dateKey === new Date().toISOString().split('T')[0] ? 'Today' : grp.dateKey}
                      </span>
                    </div>

                    {/* Messages in group */}
                    {grp.items.map((msg) => {
                      const isMe = msg.senderRole === 'buyer';

                      return (
                        <div
                          key={msg.id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isMe ? 'flex-end' : 'flex-start',
                            maxWidth: '85%',
                            alignSelf: isMe ? 'flex-end' : 'flex-start'
                          }}
                        >
                          {/* Sender name for seller */}
                          {!isMe && (
                            <span style={{ fontSize: '0.7rem', color: '#8A7B76', fontWeight: 600, marginBottom: '0.2rem', marginLeft: '0.35rem' }}>
                              {msg.senderName}
                            </span>
                          )}

                          {/* Message Bubble */}
                          <div
                            style={{
                              backgroundColor: isMe ? '#0C3C2C' : '#FFFFFF',
                              color: isMe ? '#FFFFFF' : '#0C3C2C',
                              padding: '0.75rem 0.95rem',
                              borderRadius: isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                              boxShadow: '0 2px 8px rgba(12, 60, 44, 0.08)',
                              border: isMe ? 'none' : '1px solid #EADECF',
                              fontSize: '0.875rem',
                              lineHeight: 1.5,
                              wordBreak: 'break-word'
                            }}
                          >
                            {/* Attached Context Card */}
                            {msg.contextCard && (
                              <div
                                style={{
                                  backgroundColor: isMe ? 'rgba(255,255,255,0.12)' : '#FAF6F0',
                                  border: isMe ? '1px solid rgba(255,255,255,0.2)' : '1px solid #DECDBD',
                                  borderRadius: '8px',
                                  padding: '0.65rem',
                                  marginBottom: '0.6rem'
                                }}
                              >
                                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                                  {msg.contextCard.imageUrl && (
                                    <img
                                      src={msg.contextCard.imageUrl}
                                      alt={msg.contextCard.title}
                                      style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }}
                                    />
                                  )}
                                  <div>
                                    <strong style={{ fontSize: '0.825rem', display: 'block', color: isMe ? '#FFFFFF' : '#0C3C2C' }}>
                                      {msg.contextCard.title}
                                    </strong>
                                    {msg.contextCard.subtitle && (
                                      <span style={{ fontSize: '0.725rem', color: isMe ? '#D5E6DE' : '#8A7B76', display: 'block' }}>
                                        {msg.contextCard.subtitle}
                                      </span>
                                    )}
                                    {msg.contextCard.price && (
                                      <span style={{ fontSize: '0.775rem', fontWeight: 700, color: isMe ? '#F8D7A6' : '#9B3C1B' }}>
                                        {msg.contextCard.price} {msg.contextCard.unit ? `• ${msg.contextCard.unit}` : ''}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {msg.contextCard.disclaimer && (
                                  <p style={{ fontSize: '0.65rem', color: isMe ? '#C2D9CE' : '#8A7B76', margin: '0.35rem 0 0 0', lineHeight: 1.3 }}>
                                    {msg.contextCard.disclaimer}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Attached Image */}
                            {msg.imageUrl && (
                              <img
                                src={msg.imageUrl}
                                alt="Attached crop inspection"
                                style={{
                                  width: '100%',
                                  maxHeight: '180px',
                                  objectFit: 'cover',
                                  borderRadius: '6px',
                                  marginBottom: msg.text ? '0.5rem' : 0
                                }}
                              />
                            )}

                            {/* Message Text */}
                            {msg.text && <div>{msg.text}</div>}
                          </div>

                          {/* Footer with Timestamp and Delivery Status */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              marginTop: '0.2rem',
                              fontSize: '0.675rem',
                              color: '#8A7B76',
                              marginRight: isMe ? '0.25rem' : 0,
                              marginLeft: !isMe ? '0.25rem' : 0
                            }}
                          >
                            <span>{msg.timestamp}</span>

                            {isMe && (
                              <>
                                {msg.status === 'sending' && <span>&bull; Sending...</span>}
                                {msg.status === 'sent' && <Check size={11} color="#8A7B76" />}
                                {msg.status === 'delivered' && <CheckCheck size={12} color="#8A7B76" />}
                                {msg.status === 'read' && <span title="Read"><CheckCheck size={12} color="#2B785E" /></span>}
                                {msg.status === 'failed' && (
                                  <span style={{ color: '#9B3C1B', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    &bull; Failed
                                    <button
                                      type="button"
                                      onClick={() => retryMessage(activeConversation.id, msg.id)}
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#9B3C1B',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        padding: 0,
                                        textDecoration: 'underline',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '2px'
                                      }}
                                    >
                                      <RotateCw size={9} /> Retry
                                    </button>
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Removable Pending Context Preview Card (Before Sending) */}
            {pendingContextCard && (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid #EADECF',
                  borderBottom: '1px solid #EADECF',
                  padding: '0.65rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', minWidth: 0 }}>
                  {pendingContextCard.imageUrl && (
                    <img
                      src={pendingContextCard.imageUrl}
                      alt={pendingContextCard.title}
                      style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                    />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9B3C1B', textTransform: 'uppercase' }}>
                      Attaching Context:
                    </span>
                    <strong style={{ fontSize: '0.8rem', color: '#0C3C2C', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pendingContextCard.title}
                    </strong>
                    {pendingContextCard.price && (
                      <span style={{ fontSize: '0.725rem', color: '#574A46' }}>
                        {pendingContextCard.price} {pendingContextCard.unit ? `• ${pendingContextCard.unit}` : ''}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={clearPendingContext}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#8A7B76',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    flexShrink: 0
                  }}
                  title="Remove attached context card"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Conversation Starter Chips (Only shown when relevant or composer is empty) */}
            {(!messageText.trim() || pendingContextCard?.type === 'product') && (
              <div
                style={{
                  padding: '0.5rem 1rem 0.25rem 1rem',
                  display: 'flex',
                  gap: '0.4rem',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  scrollbarWidth: 'none'
                }}
              >
                {PRODUCT_CONVERSATION_STARTERS.map((starter, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => handleSelectStarter(starter)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #DECDBD',
                      color: '#0C3C2C',
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      padding: '0.3rem 0.65rem',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0C3C2C'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#DECDBD'; }}
                  >
                    💬 {starter}
                  </button>
                ))}
              </div>
            )}

            {/* Selected Image Thumbnail Preview */}
            {selectedImage && (
              <div
                style={{
                  padding: '0.4rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid #EADECF'
                }}
              >
                <img
                  src={selectedImage}
                  alt="Attachment preview"
                  style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.75rem', color: '#574A46' }}>Photo ready to send</span>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  style={{ background: 'none', border: 'none', color: '#9B3C1B', cursor: 'pointer', marginLeft: 'auto' }}
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Message Composer Footer */}
            <form
              onSubmit={handleSendMessage}
              style={{
                backgroundColor: '#FFFFFF',
                borderTop: '1.5px solid #EADECF',
                padding: '0.75rem 1rem 1rem 1rem',
                display: 'flex',
                alignItems: 'flex-end',
                gap: '0.5rem'
              }}
            >
              {/* Image Attachment Button */}
              <button
                type="button"
                onClick={handleAttachImage}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#F8F2EB',
                  border: '1px solid #DECDBD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0C3C2C',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                title="Attach harvest arrival or specification photo"
                aria-label="Attach photo"
              >
                <ImageIcon size={18} />
              </button>

              {/* Text Area Input */}
              <div style={{ flex: 1, position: 'relative' }}>
                <textarea
                  ref={composerInputRef}
                  rows={2}
                  value={messageText}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message ${activeConversation.farmerName}...`}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '12px',
                    border: '1.5px solid #DECDBD',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    resize: 'none',
                    lineHeight: 1.4,
                    outline: 'none',
                    color: '#0C3C2C',
                    backgroundColor: '#FAF6F0'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#0C3C2C'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#DECDBD'; }}
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!messageText.trim() && !selectedImage}
                className="btn btn-accent"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  opacity: (!messageText.trim() && !selectedImage) ? 0.45 : 1,
                  cursor: (!messageText.trim() && !selectedImage) ? 'not-allowed' : 'pointer'
                }}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
