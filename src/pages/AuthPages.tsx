import React, { useState } from 'react';
import { User, Role } from '../types';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  ArrowRight, 
  CheckCircle, 
  Building2, 
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import { Logo } from '../components/Logo';

interface AuthPageProps {
  onNavigate: (route: string) => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<AuthPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('mateo.r@freshmarkets.ph');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Default to Mateo Rodriguez buyer fixture
    const user: User = {
      id: 'buyer-001',
      name: 'Mateo Rodriguez',
      email: identifier.includes('@') ? identifier : 'mateo.r@freshmarkets.ph',
      phone: '+63 917 123 4567',
      role: 'buyer',
      buyerType: 'wholesaler',
      businessName: 'Rodriguez Fresh Markets Co.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isEmailVerified: true,
      isPhoneVerified: true
    };

    onLoginSuccess(user);
    onNavigate('/buyer/orders');
  };

  return (
    <div style={{ padding: '4rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="card" style={{ padding: '2.5rem 2rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <Logo size="md" variant="green" showTagline={true} />
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C' }}>Welcome Back</h2>
            <p style={{ fontSize: '0.85rem' }}>Access your wholesale buying or farm management workspace.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                Email or Philippine Mobile
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@company.ph or 0917..."
                required
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46' }}>Password</label>
                <button type="button" onClick={() => onNavigate('/forgot-password')} style={{ fontSize: '0.75rem', color: '#9B3C1B' }}>
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', fontWeight: 700, marginTop: '0.5rem' }}>
              Sign In to Account
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#8A7B76', marginTop: '0.5rem' }}>
              Don&apos;t have an account yet?{' '}
              <button type="button" onClick={() => onNavigate('/register')} style={{ color: '#0C3C2C', fontWeight: 700, textDecoration: 'underline' }}>
                Register here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '4rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Logo size="lg" variant="green" showTagline={true} />
          </div>
          <h1 style={{ fontSize: '2.2rem', color: '#0C3C2C' }}>Select Your Platform Account Type</h1>
          <p style={{ maxWidth: '520px', margin: '0.5rem auto 0 auto' }}>
            Are you sourcing wholesale agricultural produce, or are you a farmer bringing your harvest to market?
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Buyer Card */}
          <div 
            onClick={() => onNavigate('/register/buyer')}
            className="card card-hover" 
            style={{ padding: '2rem', backgroundColor: '#FFFFFF', cursor: 'pointer', textAlign: 'center', border: '2px solid transparent' }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <Building2 size={30} />
            </div>
            <h3 style={{ fontSize: '1.35rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>Wholesale Buyer</h3>
            <p style={{ fontSize: '0.85rem', color: '#574A46', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              For supermarkets, retailers, restaurant kitchens, institutions, and wet market stall vendors sourcing bulk crops directly from growers.
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }}>
              Register as Buyer &rarr;
            </button>
          </div>

          {/* Farmer Card */}
          <div 
            onClick={() => onNavigate('/register/farmer')}
            className="card card-hover" 
            style={{ padding: '2rem', backgroundColor: '#FFFFFF', cursor: 'pointer', textAlign: 'center', border: '2px solid transparent' }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#FEF3E2', color: '#D48216', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <span style={{ fontSize: '1.8rem' }}>🌾</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>Farmer / Cooperative</h3>
            <p style={{ fontSize: '0.85rem', color: '#574A46', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              For individual crop producers and registered agricultural cooperatives ready to sell harvests directly with organized transport logistics.
            </p>
            <button className="btn btn-accent" style={{ width: '100%', fontWeight: 700 }}>
              Register as Seller &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BuyerRegisterPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Logo size="md" variant="green" showTagline={true} />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: '#0C3C2C', marginBottom: '0.25rem' }}>Buyer Registration</h2>
          <p style={{ fontSize: '0.85rem', marginBottom: '1.75rem' }}>Create your commercial sourcing profile on Pananim.</p>

          <form onSubmit={(e) => { e.preventDefault(); onNavigate('/verify-contact'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>First Name *</label>
                <input type="text" defaultValue="Mateo" required />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>Last Name *</label>
                <input type="text" defaultValue="Rodriguez" required />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>Email Address *</label>
              <input type="email" defaultValue="mateo.r@freshmarkets.ph" required />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>Philippine Mobile *</label>
              <input type="text" defaultValue="+63 917 123 4567" required />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>Buyer Classification *</label>
              <select defaultValue="wholesaler">
                <option value="wholesaler">Wholesaler / Distributor</option>
                <option value="retailer">Supermarket / Grocery Retailer</option>
                <option value="market_vendor">Wet Market Stall Vendor</option>
                <option value="individual">Commercial Food Kitchen</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>Create Password (min. 12 characters) *</label>
              <input type="password" defaultValue="Password123456!" required />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem', fontWeight: 700 }}>
              Create Account &amp; Verify Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const VerifyContactPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const [otp, setOtp] = useState('741920');

  return (
    <div style={{ padding: '4rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
            <Phone size={26} />
          </div>
          <h2 style={{ fontSize: '1.6rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>Verify Mobile Number</h2>
          <p style={{ fontSize: '0.85rem', color: '#574A46', marginBottom: '1.5rem' }}>
            We sent a 6-digit confirmation code to <strong>+63 917 ••• 4567</strong> (Simulated Demo Code: 741920).
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                fontSize: '1.8rem',
                letterSpacing: '0.35em',
                textAlign: 'center',
                fontWeight: 800,
                color: '#0C3C2C'
              }}
              maxLength={6}
            />
          </div>

          <button
            onClick={() => {
              alert('Contact number verified successfully!');
              onNavigate('/buyer/orders');
            }}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', fontWeight: 700 }}
          >
            Verify &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};
