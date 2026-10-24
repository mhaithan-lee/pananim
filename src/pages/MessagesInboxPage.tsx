import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import { 
  Search, 
  Send, 
  Image as ImageIcon, 
  Check, 
  CheckCheck, 
  ShieldCheck, 
  ExternalLink, 
  MoreVertical, 
  RotateCw, 
  X, 
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import { PRODUCT_CONVERSATION_STARTERS } from '../types/chat';

interface MessagesInboxPageProps {
  isFarmer?: boolean;
  onNavigate: (route: string) => void;
}

export const MessagesInboxPage: React.FC<MessagesInboxPageProps> = ({
  isFarmer = false,
  onNavigate
}) => {
  const {
    conversations,
    messages,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    retryMessage,
    drafts,
    setDraft,
    pendingContextCard,
    clearPendingContext,
    markConversationRead,
    blockSeller,
    reportAbuse,
    simulateFarmerReply,
    simulateNetworkFailure,
    setSimulateNetworkFailure
  } = useChat();

  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-select first conversation if none selected
  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [activeConversationId, conversations, setActiveConversationId]);

  // Mark active conversation read
  useEffect(() => {
    if (activeConversationId) {
      markConversationRead(activeConversationId, isFarmer ? 'farmer' : 'buyer');
      setInputText(drafts[activeConversationId] || '');
      setSelectedImage(null);
    }
  }, [activeConversationId, isFarmer]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConversationId]);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const activeMsgs = (activeConv && messages[activeConv.id]) || [];

  const filteredConversations = conversations.filter(c => {
    const q = searchQuery.toLowerCase();
    return c.farmName.toLowerCase().includes(q) ||
           c.farmerName.toLowerCase().includes(q) ||
           c.buyerName.toLowerCase().includes(q);
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    if (activeConv) {
      setDraft(activeConv.id, val);
    }
  };

  const handleSelectStarter = (starter: string) => {
    setInputText(starter);
    if (activeConv) {
      setDraft(activeConv.id, starter);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeConv) return;
    if (!inputText.trim() && !selectedImage) return;

    sendMessage(
      activeConv.id,
      inputText,
      pendingContextCard || undefined,
      selectedImage || undefined
    );
    setInputText('');
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachImage = () => {
    const sampleImages = [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=80'
    ];
    setSelectedImage(sampleImages[Math.floor(Math.random() * sampleImages.length)]);
  };

  return (
    <div style={{ backgroundColor: '#FAF6F0', minHeight: 'calc(100vh - 140px)', paddingBottom: '3rem' }}>
      {/* Header Breadcrumb Banner */}
      <section style={{ backgroundColor: '#0C3C2C', color: '#FFFFFF', padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D48216', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isFarmer ? 'FARMER WORKSPACE' : 'BUYER COMMERCE'} &bull; DIRECT MESSAGING
              </span>
              <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: '0.2rem 0 0 0' }}>
                {isFarmer ? 'Grower Communications' : 'Messages & Sourcing Inquiries'}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => activeConv && simulateFarmerReply(activeConv.id)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem' }}
                title="Simulate incoming reply (Journey 5 testing)"
              >
                + Simulate Reply
              </button>
              <button
                onClick={() => onNavigate(isFarmer ? '/farmer/dashboard' : '/buyer/orders')}
                className="btn btn-outline-warm btn-sm"
                style={{ color: '#FFFFFF', borderColor: '#FFFFFF', backgroundColor: 'transparent' }}
              >
                <ArrowLeft size={14} /> Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Inbox Interface Grid */}
      <div className="container" style={{ marginTop: '2rem' }}>
        <div 
          className="card"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #DECDBD',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            minHeight: '680px',
            boxShadow: '0 8px 30px rgba(12, 60, 44, 0.08)'
          }}
        >
          {/* Left Panel: Conversations List */}
          <div 
            style={{ 
              borderRight: '1px solid #DECDBD', 
              display: 'flex', 
              flexDirection: 'column',
              backgroundColor: '#FAF6F0'
            }}
          >
            {/* Search Input */}
            <div style={{ padding: '1rem', borderBottom: '1px solid #EADECF' }}>
              <div style={{ position: 'relative' }}>
                <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#8A7B76' }} />
                <input
                  type="text"
                  placeholder="Search farmers or crops..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '2.2rem',
                    paddingRight: '0.75rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    borderRadius: '8px',
                    border: '1.5px solid #DECDBD',
                    fontSize: '0.85rem',
                    backgroundColor: '#FFFFFF',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Conversations Scroll Area */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredConversations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#8A7B76', fontSize: '0.85rem' }}>
                  No conversations match your search.
                </div>
              ) : (
                filteredConversations.map(conv => {
                  const isActive = conv.id === activeConv?.id;
                  const unread = isFarmer ? conv.unreadCountFarmer : conv.unreadCountBuyer;

                  return (
                    <div
                      key={conv.id}
                      onClick={() => setActiveConversationId(conv.id)}
                      style={{
                        padding: '1rem',
                        borderBottom: '1px solid #EADECF',
                        cursor: 'pointer',
                        backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                        borderLeft: isActive ? '4px solid #0C3C2C' : '4px solid transparent',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                          <img
                            src={conv.farmerAvatar}
                            alt={conv.farmerName}
                            style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          {conv.isVerified && (
                            <span 
                              style={{
                                position: 'absolute',
                                bottom: '-2px',
                                right: '-2px',
                                backgroundColor: '#2B785E',
                                color: '#FFFFFF',
                                borderRadius: '50%',
                                width: '15px',
                                height: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Verified Platform Grower"
                            >
                              <Check size={9} strokeWidth={3} />
                            </span>
                          )}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.15rem' }}>
                            <strong 
                              style={{ 
                                fontSize: '0.9rem', 
                                color: '#0C3C2C',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {isFarmer ? conv.buyerName : conv.farmName}
                            </strong>
                            <span style={{ fontSize: '0.7rem', color: '#8A7B76', flexShrink: 0 }}>
                              {conv.lastActivity}
                            </span>
                          </div>

                          <span style={{ fontSize: '0.75rem', color: '#574A46', display: 'block', marginBottom: '0.2rem' }}>
                            {isFarmer ? 'Buyer' : conv.farmerName}
                          </span>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p 
                              style={{ 
                                fontSize: '0.75rem', 
                                color: unread > 0 ? '#0C3C2C' : '#8A7B76', 
                                fontWeight: unread > 0 ? 700 : 400,
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '180px'
                              }}
                            >
                              {conv.lastMessage?.text || 'New inquiry thread...'}
                            </p>

                            {unread > 0 && (
                              <span 
                                style={{
                                  backgroundColor: '#9B3C1B',
                                  color: '#FFFFFF',
                                  fontSize: '0.65rem',
                                  fontWeight: 800,
                                  borderRadius: '10px',
                                  padding: '1px 6px',
                                  minWidth: '18px',
                                  textAlign: 'center'
                                }}
                                aria-label={`${unread} unread messages`}
                              >
                                {unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Active Conversation View */}
          {activeConv ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFFFF' }}>
              {/* Conversation Top Header */}
              <div 
                style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: '1px solid #EADECF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img
                    src={activeConv.farmerAvatar}
                    alt={activeConv.farmerName}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <h2 style={{ fontSize: '1.2rem', color: '#0C3C2C', margin: 0 }}>
                        {isFarmer ? activeConv.buyerName : activeConv.farmName}
                      </h2>
                      {activeConv.isVerified && (
                        <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                          <CheckCircle size={10} /> Verified Grower
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#8A7B76' }}>
                      {isFarmer ? 'Commercial Buyer' : `Lead Coordinator: ${activeConv.farmerName}`}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
                  <button
                    onClick={() => onNavigate(`/farmers/${activeConv.farmId}`)}
                    className="btn btn-outline-warm btn-sm"
                  >
                    View Storefront <ExternalLink size={12} />
                  </button>

                  <button
                    onClick={() => setOptionsOpen(!optionsOpen)}
                    style={{ background: 'none', border: 'none', color: '#8A7B76', cursor: 'pointer', padding: '0.4rem' }}
                    aria-label="More options"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {optionsOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '100%',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        border: '1px solid #DECDBD',
                        width: '190px',
                        zIndex: 10,
                        padding: '0.4rem 0'
                      }}
                    >
                      <button
                        onClick={() => {
                          setOptionsOpen(false);
                          if (confirm(`Block ${activeConv.farmName}?`)) blockSeller(activeConv.id);
                        }}
                        style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer', color: '#574A46' }}
                      >
                        Block Contact
                      </button>
                      <button
                        onClick={() => {
                          setOptionsOpen(false);
                          reportAbuse(activeConv.id, 'Spam / Off-platform diversion');
                        }}
                        style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer', color: '#9B3C1B' }}
                      >
                        Report Abuse
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Messages Area */}
              <div 
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  backgroundColor: '#FAF6F0'
                }}
              >
                {activeMsgs.map((msg) => {
                  const isMe = msg.senderRole === (isFarmer ? 'farmer' : 'buyer');

                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMe ? 'flex-end' : 'flex-start',
                        maxWidth: '75%',
                        alignSelf: isMe ? 'flex-end' : 'flex-start'
                      }}
                    >
                      {!isMe && (
                        <span style={{ fontSize: '0.725rem', color: '#8A7B76', fontWeight: 600, marginBottom: '0.2rem', marginLeft: '0.35rem' }}>
                          {msg.senderName}
                        </span>
                      )}

                      <div
                        style={{
                          backgroundColor: isMe ? '#0C3C2C' : '#FFFFFF',
                          color: isMe ? '#FFFFFF' : '#0C3C2C',
                          padding: '0.85rem 1.1rem',
                          borderRadius: isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                          boxShadow: '0 2px 8px rgba(12, 60, 44, 0.08)',
                          border: isMe ? 'none' : '1px solid #EADECF',
                          fontSize: '0.9rem',
                          lineHeight: 1.5
                        }}
                      >
                        {/* Context card in message */}
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
                            <strong style={{ fontSize: '0.85rem', display: 'block', color: isMe ? '#FFFFFF' : '#0C3C2C' }}>
                              {msg.contextCard.title}
                            </strong>
                            {msg.contextCard.subtitle && (
                              <span style={{ fontSize: '0.75rem', color: isMe ? '#D5E6DE' : '#8A7B76', display: 'block' }}>
                                {msg.contextCard.subtitle}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Image attachment */}
                        {msg.imageUrl && (
                          <img
                            src={msg.imageUrl}
                            alt="Arrival photo"
                            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '6px', marginBottom: msg.text ? '0.5rem' : 0 }}
                          />
                        )}

                        {msg.text}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem', fontSize: '0.7rem', color: '#8A7B76' }}>
                        <span>{msg.timestamp}</span>
                        {isMe && (
                          <>
                            {msg.status === 'sent' && <Check size={12} />}
                            {msg.status === 'delivered' && <CheckCheck size={13} />}
                            {msg.status === 'read' && <CheckCheck size={13} color="#2B785E" />}
                            {msg.status === 'failed' && (
                              <span style={{ color: '#9B3C1B' }}>
                                &bull; Failed <button onClick={() => retryMessage(activeConv.id, msg.id)} style={{ background: 'none', border: 'none', color: '#9B3C1B', fontWeight: 700, cursor: 'pointer' }}>Retry</button>
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Starter chips */}
              {PRODUCT_CONVERSATION_STARTERS.length > 0 && (
                <div style={{ padding: '0.5rem 1.5rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', backgroundColor: '#FFFFFF', borderTop: '1px solid #EADECF' }}>
                  {PRODUCT_CONVERSATION_STARTERS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectStarter(s)}
                      style={{
                        backgroundColor: '#FAF6F0',
                        border: '1px solid #DECDBD',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '16px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#0C3C2C',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    >
                      💬 {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Composer */}
              <form
                onSubmit={handleSendMessage}
                style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid #DECDBD',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '0.75rem',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <button
                  type="button"
                  onClick={handleAttachImage}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#FAF6F0',
                    border: '1px solid #DECDBD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#0C3C2C'
                  }}
                  title="Attach crop photo"
                >
                  <ImageIcon size={20} />
                </button>

                <div style={{ flex: 1 }}>
                  <textarea
                    rows={2}
                    value={inputText}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    placeholder={`Message ${activeConv.farmerName}...`}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1.5px solid #DECDBD',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit',
                      resize: 'none',
                      outline: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim() && !selectedImage}
                  className="btn btn-accent"
                  style={{ height: '42px', padding: '0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}
                >
                  <Send size={16} /> Send
                </button>
              </form>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8A7B76' }}>
              Select a conversation to start messaging.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
