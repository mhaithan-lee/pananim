import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sprout, 
  Truck, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';
import { User, Role } from '../../types';

interface AdminLoginPageProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (route: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigate
}) => {
  const [email, setEmail] = useState('ana.santos@pananim.ph');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      id: 'admin-001',
      name: 'Ana Santos',
      email,
      phone: '0917-000-0000',
      role: 'staff',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      isEmailVerified: true,
      isPhoneVerified: true
    });
    onNavigate('/admin');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAF7F2', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Left Column: Agricultural photo banner matching Pananim admin login.png */}
      <div 
        style={{ 
          flex: 1, 
          position: 'relative',
          backgroundImage: `linear-gradient(rgba(7, 39, 28, 0.45), rgba(7, 39, 28, 0.85)), url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path d="M16 6C16 6 12 11 12 16C12 21 16 26 16 26" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 6C16 6 20 11 20 16C20 21 16 26 16 26" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="6" x2="16" y2="26" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="6" r="2.5" fill="#E8A838" />
            <circle cx="12" cy="16" r="2" fill="#E8A838" />
            <circle cx="20" cy="16" r="2" fill="#E8A838" />
          </svg>
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.35rem', lineHeight: 1.1 }}>Pananim</div>
            <div style={{ color: '#A8C9B9', fontSize: '0.65rem', letterSpacing: '0.12em', fontWeight: 600 }}>BRIDGING FARMS &amp; MARKETS</div>
          </div>
        </div>

        {/* Content in center/bottom */}
        <div style={{ maxWidth: '480px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F8D28A', marginBottom: '12px' }}>
            PANANIM ADMINISTRATION
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px' }}>
            A trusted marketplace starts with you.
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#E2ECE5', lineHeight: 1.6, marginBottom: '32px' }}>
            Support our farmers, connect our buyers, and keep every harvest moving from farm to market.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sprout size={20} color="#22C55E" />
              <span>Care for every crop listing</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Truck size={20} color="#22C55E" />
              <span>Keep farms and markets connected</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={20} color="#22C55E" />
              <span>Build trust with every transaction</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ fontSize: '0.8rem', color: '#A8C9B9' }}>
          Here to help you grow.
        </div>
      </div>

      {/* Right Column: Sign in form matching Pananim admin login.png */}
      <div 
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          padding: '32px 48px'
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0C3C2C', fontWeight: 600, fontSize: '0.85rem' }}>
            <ShieldCheck size={16} color="#1B7A43" />
            <span>Admin workspace</span>
          </div>

          <a 
            onClick={() => onNavigate('/')} 
            style={{ color: '#5E6E64', fontSize: '0.825rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            View marketplace ↗
          </a>
        </div>

        {/* Form Container */}
        <div style={{ maxWidth: '440px', width: '100%', margin: '0 auto' }}>
          <div 
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '20px', 
              padding: '40px', 
              boxShadow: '0 4px 20px rgba(7, 39, 28, 0.06)',
              border: '1px solid #EBE4DA'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#BA4B24', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              ADMIN ACCESS
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0C3C2C', margin: '0 0 8px 0' }}>
              Welcome back
            </h2>
            <p style={{ color: '#5E6E64', fontSize: '0.875rem', margin: '0 0 24px 0' }}>
              Sign in to manage the Pananim marketplace.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D5CABE',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1D2D24', marginBottom: '6px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    style={{
                      width: '100%',
                      padding: '11px 40px 11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D5CABE',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#8A7B76'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#5E6E64', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a style={{ color: '#0C3C2C', fontWeight: 600, cursor: 'pointer' }}>Forgot password?</a>
              </div>

              <button
                type="submit"
                className="admin-btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  marginTop: '8px'
                }}
              >
                <span>Sign in</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ borderTop: '1px solid #EBE4DA', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#8A7B76' }}>
                <Lock size={14} />
                <span>For authorized Pananim administrators only.</span>
              </div>
            </form>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem', color: '#5E6E64' }}>
            Need help accessing your account?{' '}
            <span style={{ color: '#0C3C2C', fontWeight: 600, cursor: 'pointer' }}>Contact support ↗</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8A7B76' }}>
          <div>© 2026 Pananim. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
