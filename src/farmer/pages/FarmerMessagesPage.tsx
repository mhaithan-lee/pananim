import React, { useState } from 'react';
import { 
  Search, 
  Phone, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Send, 
  ShieldCheck, 
  CheckCheck,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

interface FarmerMessagesPageProps {
  onNavigate: (route: string) => void;
}

export const FarmerMessagesPage: React.FC<FarmerMessagesPageProps> = ({ onNavigate }) => {
  const [activeChatId, setActiveChatId] = useState('chat-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const [chats, setChats] = useState([
    {
      id: 'chat-1',
      name: 'Juan Dela Cruz',
      role: 'Wholesale Retailer · Manila Supermarket Chain',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      time: '10:45 AM',
      unread: false,
      online: true,
      messages: [
        {
          id: 'm1',
          sender: 'them',
          text: 'Good morning! I saw your platform listing for Red Onions. Is the 1,200kg stock still available for bulk purchase?',
          time: '10:42 AM'
        },
        {
          id: 'm2',
          sender: 'me',
          text: 'Good morning, Juan! Yes, the stock is currently available and ready for pickup starting tomorrow, Oct 29.',
          time: '10:45 AM'
        },
        {
          id: 'm3',
          sender: 'them',
          text: "Great! Can we discuss a slight discount if I take the whole batch? I'm looking to stock up for our retail branches in Metro Manila.",
          time: '10:46 AM'
        }
      ]
    },
    {
      id: 'chat-2',
      name: 'Pananim Support & DA Desk',
      role: 'Official Liaison Officer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      time: 'Yesterday',
      unread: false,
      online: false,
      messages: [
        {
          id: 's1',
          sender: 'them',
          text: 'Hello Ramon, your RSBSA updated certificate has been verified by the regional field validator.',
          time: 'Yesterday'
        }
      ]
    },
    {
      id: 'chat-3',
      name: 'Chef Marco Sison',
      role: 'Farm-to-Table Bistro Manila',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      time: '2 days ago',
      unread: false,
      online: false,
      messages: [
        {
          id: 'c1',
          sender: 'them',
          text: 'Hi Ramon! Are your Benguet tomatoes already vine-ripened? We need 150kg for our weekend service.',
          time: '2 days ago'
        }
      ]
    }
  ]);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `m_${Date.now()}`,
      sender: 'me',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(chats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMsg]
        };
      }
      return chat;
    }));

    setInputMessage('');
  };

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5E6E64' }}>
          <span onClick={() => onNavigate('/farmer/dashboard')} style={{ cursor: 'pointer', color: '#0C3C2C', fontWeight: 600 }}>Overview</span>
          <span>&rsaquo;</span>
          <span style={{ color: '#1D2D24', fontWeight: 600 }}>Buyer Inquiries &amp; Messages</span>
        </div>
        <button
          onClick={() => onNavigate('/farmer/dashboard')}
          style={{ background: 'none', border: 'none', color: '#0C3C2C', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          &larr; Back to Overview
        </button>
      </div>

      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h1 style={{ fontSize: '2.4rem', color: '#0C3C2C', margin: '0 0 0.35rem 0', fontWeight: 800 }}>
            Buyer Messages
          </h1>
          <p style={{ color: '#5E6E64', maxWidth: '650px', margin: 0 }}>
            Direct communication with verified institutional wholesale buyers, restaurants, and logistics coordinators.
          </p>
        </div>
      </div>

      {/* 2-Pane Chat Interface matching Farmer Messages · Pananim.png */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(300px, 360px) 1fr', 
          gap: '1.5rem', 
          minHeight: '620px',
          alignItems: 'stretch'
        }}
      >
        {/* Left Pane: Chat List */}
        <div className="farmer-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', margin: 0 }}>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid #D5CABE',
                fontSize: '0.85rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <Search size={16} color="#8A7B76" style={{ position: 'absolute', left: '12px', top: '10px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
            {chats.map(chat => {
              const isSelected = chat.id === activeChatId;
              const lastMsg = chat.messages[chat.messages.length - 1];
              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? '#FAF7F2' : 'transparent',
                    border: `1.5px solid ${isSelected ? '#0C3C2C' : 'transparent'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    {chat.online && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '1px',
                          right: '1px',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#1B7A43',
                          border: '2px solid #FFFFFF'
                        }}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '0.9rem' }}>{chat.name}</span>
                      <span style={{ fontSize: '0.7rem', color: '#8A7B76' }}>{chat.time}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#5E6E64', marginBottom: '2px' }}>{chat.role}</div>
                    <div style={{ fontSize: '0.775rem', color: '#8A7B76', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lastMsg ? lastMsg.text : ''}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Active Thread */}
        <div className="farmer-card" style={{ padding: 0, display: 'flex', flexDirection: 'column', margin: 0, overflow: 'hidden' }}>
          {/* Header */}
          <div 
            style={{ 
              padding: '1rem 1.5rem', 
              borderBottom: '1px solid #EBE4DA', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              backgroundColor: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, color: '#0C3C2C', fontSize: '1.05rem' }}>{activeChat.name}</div>
                <div style={{ fontSize: '0.775rem', color: '#1B7A43', fontWeight: 600 }}>
                  ● Verified Institutional Buyer · {activeChat.online ? 'Online now' : 'Active 2h ago'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onNavigate('/farmer/orders')}
                className="farmer-btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                Create Custom Wholesale Quote
              </button>
            </div>
          </div>

          {/* Thread messages area */}
          <div 
            style={{ 
              flex: 1, 
              padding: '1.5rem', 
              backgroundColor: '#FAF7F2', 
              overflowY: 'auto', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem' 
            }}
          >
            {activeChat.messages.map(msg => {
              const isMe = msg.sender === 'me';
              return (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '75%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      backgroundColor: isMe ? '#0C3C2C' : '#FFFFFF',
                      color: isMe ? '#FFFFFF' : '#1D2D24',
                      border: isMe ? 'none' : '1px solid #EBE4DA',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5
                    }}
                  >
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#8A7B76', marginTop: '4px' }}>
                    {msg.time} {isMe && '✓✓'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Input field */}
          <form 
            onSubmit={handleSendMessage}
            style={{ 
              padding: '1rem 1.5rem', 
              backgroundColor: '#FFFFFF', 
              borderTop: '1px solid #EBE4DA',
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Type your message to buyer..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #D5CABE',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="farmer-btn-primary"
              style={{ padding: '12px 20px', borderRadius: '10px' }}
            >
              <Send size={16} /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
