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
  Sparkles,
  RefreshCw,
  AlertCircle,
  X,
  KeyRound,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { Logo } from '../components/Logo';

interface AuthPageProps {
  onNavigate: (route: string) => void;
  onLoginSuccess: (user: User) => void;
  initialRole?: Role;
}

// Demo quick-login account presets
export const DEMO_ACCOUNTS = {
  buyer: {
    id: 'buyer-001',
    name: 'Mateo Rodriguez',
    email: 'mateo.r@freshmarkets.ph',
    phone: '+63 917 123 4567',
    role: 'buyer' as Role,
    buyerType: 'wholesaler' as const,
    businessName: 'Rodriguez Fresh Markets Co.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    isEmailVerified: true,
    isPhoneVerified: true
  },
  farmer: {
    id: 'farmer-001',
    name: 'Ramon Santos',
    email: 'ramon.santos@santosfarms.ph',
    phone: '+63 918 234 5678',
    role: 'farmer' as Role,
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80',
    isEmailVerified: true,
    isPhoneVerified: true
  },
  admin: {
    id: 'admin-001',
    name: 'Ana Santos',
    email: 'ana.santos@pananim.ph',
    phone: '0917-000-0000',
    role: 'staff' as Role,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    isEmailVerified: true,
    isPhoneVerified: true
  }
};

// =============================================================================
// LOGIN PAGE & SIMULATED AUTHENTICATION
// =============================================================================
export const LoginPage: React.FC<AuthPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('mateo.r@freshmarkets.ph');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<Role>('buyer');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryStep, setRecoveryStep] = useState<'input' | 'demo_code' | 'success'>('input');
  const [demoRecoveryCode, setDemoRecoveryCode] = useState('RECOVER-8492');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setErrorMessage('Please enter your email/phone and password.');
      return;
    }

    // Determine user profile based on role or input
    let user: User;
    if (selectedRole === 'farmer' || identifier.includes('farmer') || identifier.includes('santosfarms')) {
      user = {
        ...DEMO_ACCOUNTS.farmer,
        email: identifier.includes('@') ? identifier : DEMO_ACCOUNTS.farmer.email
      };
      onLoginSuccess(user);
      onNavigate('/farmer/dashboard');
    } else if (selectedRole === 'staff' || identifier.includes('admin') || identifier.includes('pananim.ph')) {
      user = {
        ...DEMO_ACCOUNTS.admin,
        email: identifier.includes('@') ? identifier : DEMO_ACCOUNTS.admin.email
      };
      onLoginSuccess(user);
      onNavigate('/admin');
    } else {
      user = {
        ...DEMO_ACCOUNTS.buyer,
        email: identifier.includes('@') ? identifier : DEMO_ACCOUNTS.buyer.email
      };
      onLoginSuccess(user);
      onNavigate('/buyer/orders');
    }
  };

  const handleQuickLogin = (role: 'buyer' | 'farmer' | 'admin') => {
    const account = DEMO_ACCOUNTS[role];
    setIdentifier(account.email);
    setPassword('password123');
    setSelectedRole(account.role);
    onLoginSuccess(account);
    if (role === 'buyer') onNavigate('/buyer/orders');
    else if (role === 'farmer') onNavigate('/farmer/dashboard');
    else onNavigate('/admin');
  };

  return (
    <div style={{ padding: '3.5rem 0 6rem 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container" style={{ maxWidth: '460px' }}>
        <div className="card" style={{ padding: '2.5rem 2.25rem', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 4px 20px rgba(12, 60, 44, 0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <Logo size="md" variant="green" showTagline={true} />
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C', fontWeight: 800 }}>Welcome Back</h2>
            <p style={{ fontSize: '0.85rem', color: '#574A46', marginTop: '0.25rem' }}>
              Access your wholesale buyer, farmer, or staff workspace.
            </p>
          </div>

          {/* Persona selector tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '1.5rem', backgroundColor: '#F5EDE2', padding: '4px', borderRadius: '10px' }}>
            <button
              type="button"
              onClick={() => { setSelectedRole('buyer'); setIdentifier(DEMO_ACCOUNTS.buyer.email); }}
              style={{
                padding: '0.45rem 0',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedRole === 'buyer' ? '#0C3C2C' : 'transparent',
                color: selectedRole === 'buyer' ? '#FFFFFF' : '#574A46',
                transition: 'all 0.15s ease'
              }}
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => { setSelectedRole('farmer'); setIdentifier(DEMO_ACCOUNTS.farmer.email); }}
              style={{
                padding: '0.45rem 0',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedRole === 'farmer' ? '#0C3C2C' : 'transparent',
                color: selectedRole === 'farmer' ? '#FFFFFF' : '#574A46',
                transition: 'all 0.15s ease'
              }}
            >
              Farmer
            </button>
            <button
              type="button"
              onClick={() => { setSelectedRole('staff'); setIdentifier(DEMO_ACCOUNTS.admin.email); }}
              style={{
                padding: '0.45rem 0',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedRole === 'staff' ? '#0C3C2C' : 'transparent',
                color: selectedRole === 'staff' ? '#FFFFFF' : '#574A46',
                transition: 'all 0.15s ease'
              }}
            >
              Admin
            </button>
          </div>

          {errorMessage && (
            <div style={{ backgroundColor: '#FCEBE6', border: '1px solid #BA4B24', color: '#BA4B24', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.825rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                Email or Philippine Mobile
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => { setIdentifier(e.target.value); setErrorMessage(''); }}
                placeholder="name@company.ph or 0917..."
                required
                style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46' }}>Password</label>
                <button 
                  type="button" 
                  onClick={() => { setForgotModalOpen(true); setRecoveryEmail(identifier); }} 
                  style={{ fontSize: '0.75rem', color: '#BA4B24', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', fontWeight: 700, marginTop: '0.5rem' }}>
              Sign In to {selectedRole === 'farmer' ? 'Farmer' : selectedRole === 'staff' ? 'Admin' : 'Buyer'} Workspace
            </button>

            {/* Quick Demo Login Switcher */}
            <div style={{ marginTop: '0.5rem', borderTop: '1px solid #F0E8DD', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8A7B76', textAlign: 'center', marginBottom: '0.65rem' }}>
                ⚡ One-Click Demo Accounts
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('buyer')}
                  style={{ padding: '0.45rem 0.25rem', fontSize: '0.72rem', fontWeight: 600, border: '1px solid #DECDBD', borderRadius: '6px', backgroundColor: '#FAF7F2', cursor: 'pointer', color: '#0C3C2C' }}
                >
                  🛒 Mateo (Buyer)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('farmer')}
                  style={{ padding: '0.45rem 0.25rem', fontSize: '0.72rem', fontWeight: 600, border: '1px solid #DECDBD', borderRadius: '6px', backgroundColor: '#FAF7F2', cursor: 'pointer', color: '#0C3C2C' }}
                >
                  🌾 Ramon (Farmer)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  style={{ padding: '0.45rem 0.25rem', fontSize: '0.72rem', fontWeight: 600, border: '1px solid #DECDBD', borderRadius: '6px', backgroundColor: '#FAF7F2', cursor: 'pointer', color: '#0C3C2C' }}
                >
                  🛡️ Ana (Admin)
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#8A7B76', marginTop: '0.5rem' }}>
              Don&apos;t have an account yet?{' '}
              <button 
                type="button" 
                onClick={() => onNavigate('/register')} 
                style={{ color: '#0C3C2C', fontWeight: 700, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Register here
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Simulated Forgot Password Modal */}
      {forgotModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(7, 39, 28, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
        >
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '0 20px 48px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => { setForgotModalOpen(false); setRecoveryStep('input'); }}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#8A7B76' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FEF3E2', color: '#D48216', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                <KeyRound size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#0C3C2C', margin: 0 }}>Simulated Password Recovery</h3>
              <p style={{ fontSize: '0.8rem', color: '#8A7B76', marginTop: '0.35rem' }}>
                This is a simulated demo environment. No real external email or SMS is dispatched.
              </p>
            </div>

            {recoveryStep === 'input' && (
              <form onSubmit={(e) => { e.preventDefault(); setRecoveryStep('demo_code'); }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="name@company.ph"
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD', marginBottom: '1.25rem' }}
                />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', fontWeight: 700 }}>
                  Generate Demo Reset Token &rarr;
                </button>
              </form>
            )}

            {recoveryStep === 'demo_code' && (
              <div>
                <div style={{ backgroundColor: '#E2ECE5', border: '1.5px dashed #0C3C2C', borderRadius: '10px', padding: '1rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0C3C2C', textTransform: 'uppercase' }}>Demo Recovery Token</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0C3C2C', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                    {demoRecoveryCode}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#574A46', marginTop: '0.25rem' }}>
                    Simulated verification for {recoveryEmail}
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setRecoveryStep('success'); }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Set New Demo Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    required
                    style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD', marginBottom: '1.25rem' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', fontWeight: 700 }}>
                    Save Password &amp; Continue &rarr;
                  </button>
                </form>
              </div>
            )}

            {recoveryStep === 'success' && (
              <div style={{ textAlign: 'center' }}>
                <CheckCircle2 size={40} color="#1B7A43" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ fontSize: '1.15rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>Demo Password Updated</h4>
                <p style={{ fontSize: '0.85rem', color: '#574A46', marginBottom: '1.25rem' }}>
                  Your password simulation has been refreshed. You can now sign in immediately.
                </p>
                <button
                  type="button"
                  onClick={() => { setForgotModalOpen(false); setRecoveryStep('input'); }}
                  className="btn btn-primary"
                  style={{ width: '100%', fontWeight: 700 }}
                >
                  Return to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// UNIFIED REGISTRATION PAGE (Supports Buyer & Farmer in ONE component)
// =============================================================================
interface RegisterPageProps {
  onNavigate: (route: string) => void;
  onLoginSuccess?: (user: User) => void;
  initialRole?: 'buyer' | 'farmer';
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ 
  onNavigate, 
  onLoginSuccess,
  initialRole = 'buyer' 
}) => {
  const [role, setRole] = useState<'buyer' | 'farmer'>(initialRole);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Common Fields
  const [firstName, setFirstName] = useState(role === 'buyer' ? 'Mateo' : 'Ramon');
  const [lastName, setLastName] = useState(role === 'buyer' ? 'Rodriguez' : 'Santos');
  const [email, setEmail] = useState(role === 'buyer' ? 'mateo.r@freshmarkets.ph' : 'ramon.santos@santosfarms.ph');
  const [phone, setPhone] = useState('+63 917 123 4567');
  const [password, setPassword] = useState('Password123456!');
  const [confirmPassword, setConfirmPassword] = useState('Password123456!');

  // Buyer Specific
  const [buyerType, setBuyerType] = useState('wholesaler');
  const [businessName, setBusinessName] = useState('Rodriguez Fresh Markets Co.');

  // Farmer Specific
  const [farmerType, setFarmerType] = useState('individual');
  const [farmName, setFarmName] = useState('Santos Organic Farms');
  const [province, setProvince] = useState('Benguet');
  const [farmHectares, setFarmHectares] = useState('4.5');

  // Simulated OTP State
  const [demoOtp, setDemoOtp] = useState('849201');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  // Validation Error
  const [formError, setFormError] = useState('');

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !password) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setFormError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match. Please re-enter.');
      return;
    }

    // Generate fresh demo 6-digit code
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoOtp(generated);
    setEnteredOtp('');
    setOtpError('');
    setStep(2);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      if (enteredOtp.trim() !== demoOtp.trim()) {
        setOtpError(`Incorrect verification code. Please enter the demo code: ${demoOtp}`);
        return;
      }

      // Create new user profile object
      const newUser: User = {
        id: role === 'farmer' ? `farmer-${Date.now()}` : `buyer-${Date.now()}`,
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        role: role as Role,
        buyerType: role === 'buyer' ? (buyerType as any) : undefined,
        businessName: role === 'buyer' ? businessName : farmName,
        avatarUrl: role === 'farmer' 
          ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        isEmailVerified: true,
        isPhoneVerified: true
      };

      // Save non-sensitive demo session in localStorage
      try {
        localStorage.setItem('pananim_demo_user', JSON.stringify(newUser));
        localStorage.setItem('pananim_demo_role', role);
      } catch (err) {
        // Fallback for private mode
      }

      if (onLoginSuccess) {
        onLoginSuccess(newUser);
      }

      setStep(3);
    }, 400);
  };

  const handleResendOtp = () => {
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoOtp(generated);
    setEnteredOtp('');
    setOtpError('');
    setResendCooldown(30);

    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div style={{ padding: '3rem 0 6rem 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        {/* Step Indicator Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Logo size="md" variant="green" showTagline={true} />
          </div>
          <h1 style={{ fontSize: '2.1rem', color: '#0C3C2C', fontWeight: 800, marginBottom: '0.35rem' }}>
            {step === 1 ? 'Create Your Pananim Account' : step === 2 ? 'Verify Contact Number' : 'Welcome to Pananim!'}
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#574A46' }}>
            {step === 1 && 'Join the digital marketplace connecting Filipino agricultural producers with wholesale buyers.'}
            {step === 2 && `Simulated 6-digit confirmation code dispatched to ${phone}.`}
            {step === 3 && 'Your demo registration is complete and your workspace is ready.'}
          </p>

          {/* Stepper Progress Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: step >= 1 ? '#0C3C2C' : '#DECDBD', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                1
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: step === 1 ? 700 : 500, color: step >= 1 ? '#0C3C2C' : '#8A7B76' }}>Account Info</span>
            </div>
            <div style={{ width: '32px', height: '2px', backgroundColor: step >= 2 ? '#0C3C2C' : '#DECDBD' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: step >= 2 ? '#0C3C2C' : '#DECDBD', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                2
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: step === 2 ? 700 : 500, color: step >= 2 ? '#0C3C2C' : '#8A7B76' }}>Verification</span>
            </div>
            <div style={{ width: '32px', height: '2px', backgroundColor: step >= 3 ? '#0C3C2C' : '#DECDBD' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: step >= 3 ? '#0C3C2C' : '#DECDBD', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                3
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: step === 3 ? 700 : 500, color: step >= 3 ? '#0C3C2C' : '#8A7B76' }}>Complete</span>
            </div>
          </div>
        </div>

        {/* STEP 1: ACCOUNT DETAILS & ROLE CONDITIONAL FIELDS */}
        {step === 1 && (
          <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 4px 20px rgba(12, 60, 44, 0.08)' }}>
            {/* Account Type Selector Segmented Toggle */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.5rem' }}>
                I am registering as:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div
                  onClick={() => setRole('buyer')}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: role === 'buyer' ? '2px solid #0C3C2C' : '1.5px solid #DECDBD',
                    backgroundColor: role === 'buyer' ? '#F5FAF7' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: role === 'buyer' ? '#0C3C2C' : '#F5EDE2', color: role === 'buyer' ? '#FFFFFF' : '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: '#0C3C2C', display: 'block' }}>Wholesale Buyer</strong>
                    <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Retailer, Supermarket, Kitchen</span>
                  </div>
                </div>

                <div
                  onClick={() => setRole('farmer')}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: role === 'farmer' ? '2px solid #0C3C2C' : '1.5px solid #DECDBD',
                    backgroundColor: role === 'farmer' ? '#F5FAF7' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: role === 'farmer' ? '#0C3C2C' : '#FEF3E2', color: role === 'farmer' ? '#FFFFFF' : '#D48216', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '1.25rem' }}>🌾</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: '#0C3C2C', display: 'block' }}>Farmer / Cooperative</strong>
                    <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>Grower, ARB, Agri Association</span>
                  </div>
                </div>
              </div>
            </div>

            {formError && (
              <div style={{ backgroundColor: '#FCEBE6', border: '1px solid #BA4B24', color: '#BA4B24', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.825rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleStep1Submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {/* Names */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD' }}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                    Philippine Mobile *
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+63 917 123 4567"
                    required
                    style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD' }}
                  />
                </div>
              </div>

              {/* Conditional Role Fields */}
              {role === 'buyer' ? (
                <div style={{ backgroundColor: '#FAF7F2', padding: '1rem', borderRadius: '10px', border: '1px solid #EBE4DA', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0C3C2C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Wholesale Sourcing Details
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                        Buyer Classification *
                      </label>
                      <select 
                        value={buyerType} 
                        onChange={(e) => setBuyerType(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.85rem', borderRadius: '8px', border: '1.5px solid #DECDBD', backgroundColor: '#FFFFFF' }}
                      >
                        <option value="wholesaler">Wholesaler / Distributor</option>
                        <option value="retailer">Supermarket / Grocery Retailer</option>
                        <option value="market_vendor">Wet Market Stall Vendor</option>
                        <option value="individual">Commercial Food Kitchen</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                        Business / Store Name
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g., Rodriguez Fresh Markets"
                        style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD', backgroundColor: '#FFFFFF' }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ backgroundColor: '#FAF7F2', padding: '1rem', borderRadius: '10px', border: '1px solid #EBE4DA', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0C3C2C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Farm &amp; Producer Information
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                        Producer Type *
                      </label>
                      <select 
                        value={farmerType} 
                        onChange={(e) => setFarmerType(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.85rem', borderRadius: '8px', border: '1.5px solid #DECDBD', backgroundColor: '#FFFFFF' }}
                      >
                        <option value="individual">Individual Grower / Smallholder</option>
                        <option value="cooperative">Registered Agri Cooperative</option>
                        <option value="arb">Agrarian Reform Beneficiary (ARB)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                        Farm / Estate Name *
                      </label>
                      <input
                        type="text"
                        value={farmName}
                        onChange={(e) => setFarmName(e.target.value)}
                        required
                        placeholder="e.g., Santos Organic Farms"
                        style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD', backgroundColor: '#FFFFFF' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                        Primary Province *
                      </label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.85rem', borderRadius: '8px', border: '1.5px solid #DECDBD', backgroundColor: '#FFFFFF' }}
                      >
                        <option value="Benguet">Benguet (Highland Crops)</option>
                        <option value="Nueva Ecija">Nueva Ecija (Central Luzon)</option>
                        <option value="Pangasinan">Pangasinan</option>
                        <option value="Bukidnon">Bukidnon (Mindanao)</option>
                        <option value="Batangas">Batangas (Calabarzon)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                        Estimated Farm Size (Hectares)
                      </label>
                      <input
                        type="number"
                        value={farmHectares}
                        onChange={(e) => setFarmHectares(e.target.value)}
                        step="0.5"
                        min="0.5"
                        style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD', backgroundColor: '#FFFFFF' }}
                      />
                    </div>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: '#8A7B76', margin: 0 }}>
                    💡 Farm accreditation documents &amp; RSBSA credentials can be uploaded anytime later from your Farm Account workspace.
                  </p>
                </div>
              )}

              {/* Passwords */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                    Password (min. 8 chars) *
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '0.9rem', borderRadius: '8px', border: '1.5px solid #DECDBD' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem', fontWeight: 700 }}>
                Continue to Contact Verification &rarr;
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#8A7B76' }}>
                Already registered on Pananim?{' '}
                <button 
                  type="button" 
                  onClick={() => onNavigate('/login')} 
                  style={{ color: '#0C3C2C', fontWeight: 700, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Sign In here
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: SIMULATED CONTACT VERIFICATION */}
        {step === 2 && (
          <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 4px 20px rgba(12, 60, 44, 0.08)', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <Phone size={26} />
            </div>
            <h2 style={{ fontSize: '1.6rem', color: '#0C3C2C', marginBottom: '0.35rem' }}>Verify Mobile Number</h2>
            <p style={{ fontSize: '0.85rem', color: '#574A46', marginBottom: '1.25rem' }}>
              We simulated dispatching a 6-digit confirmation code to <strong>{phone}</strong>.
            </p>

            {/* Clear Demo Code Banner */}
            <div style={{ backgroundColor: '#FEF3E2', border: '1.5px dashed #D48216', borderRadius: '10px', padding: '0.85rem', marginBottom: '1.5rem', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#D48216', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Simulated Demo Verification Code
              </span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0C3C2C', letterSpacing: '0.25em' }}>
                {demoOtp}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#574A46' }}>
                Type this 6-digit number below to simulate verification.
              </span>
            </div>

            {otpError && (
              <div style={{ backgroundColor: '#FCEBE6', border: '1px solid #BA4B24', color: '#BA4B24', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.825rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{otpError}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
              <input
                type="text"
                value={enteredOtp}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                  setEnteredOtp(val);
                  setOtpError('');
                }}
                placeholder="••••••"
                maxLength={6}
                required
                style={{
                  fontSize: '1.8rem',
                  letterSpacing: '0.4em',
                  textAlign: 'center',
                  fontWeight: 800,
                  color: '#0C3C2C',
                  width: '240px',
                  padding: '0.65rem 0.5rem',
                  borderRadius: '10px',
                  border: '2px solid #0C3C2C',
                  outline: 'none'
                }}
              />

              <div style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '340px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-outline-warm"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="submit"
                  disabled={enteredOtp.length !== 6 || isVerifying}
                  className="btn btn-primary"
                  style={{ flex: 2, fontWeight: 700 }}
                >
                  {isVerifying ? 'Checking...' : 'Verify & Continue'}
                </button>
              </div>

              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#8A7B76' }}>
                Didn&apos;t receive code?{' '}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0}
                  style={{
                    color: resendCooldown > 0 ? '#8A7B76' : '#0C3C2C',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    background: 'none',
                    border: 'none',
                    cursor: resendCooldown > 0 ? 'default' : 'pointer',
                    padding: 0
                  }}
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend new demo code'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: REGISTRATION COMPLETE */}
        {step === 3 && (
          <div className="card" style={{ padding: '3rem 2rem', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 4px 20px rgba(12, 60, 44, 0.08)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#E2ECE5', color: '#0C3C2C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle2 size={36} color="#1B7A43" />
            </div>
            <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Demo Account Activated</span>
            <h2 style={{ fontSize: '1.9rem', color: '#0C3C2C', fontWeight: 800, marginBottom: '0.5rem' }}>
              Welcome, {firstName}!
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#574A46', maxWidth: '440px', margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
              Your {role === 'farmer' ? 'Farmer / Cooperative' : 'Wholesale Buyer'} profile has been verified and registered in your local demo session.
            </p>

            <div style={{ backgroundColor: '#FAF7F2', borderRadius: '12px', padding: '1.25rem', border: '1px solid #DECDBD', maxWidth: '440px', margin: '0 auto 2rem auto', textAlign: 'left', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: '#8A7B76' }}>Account Type:</span>
                <strong style={{ color: '#0C3C2C', textTransform: 'capitalize' }}>{role === 'farmer' ? 'Farmer Producer' : 'Commercial Buyer'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: '#8A7B76' }}>Registered Name:</span>
                <strong style={{ color: '#0C3C2C' }}>{firstName} {lastName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: '#8A7B76' }}>Mobile:</span>
                <strong style={{ color: '#0C3C2C' }}>{phone}</strong>
              </div>
              {role === 'buyer' && businessName && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8A7B76' }}>Business:</span>
                  <strong style={{ color: '#0C3C2C' }}>{businessName}</strong>
                </div>
              )}
              {role === 'farmer' && farmName && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8A7B76' }}>Farm:</span>
                  <strong style={{ color: '#0C3C2C' }}>{farmName} ({province})</strong>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  if (role === 'farmer') {
                    onNavigate('/farmer/dashboard');
                  } else {
                    onNavigate('/buyer/orders');
                  }
                }}
                className="btn btn-primary btn-lg"
                style={{ fontWeight: 700 }}
              >
                Enter {role === 'farmer' ? 'Farmer' : 'Buyer'} Workspace &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Aliases for backward compatibility
export const BuyerRegisterPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  return <RegisterPage onNavigate={onNavigate} initialRole="buyer" />;
};

export const VerifyContactPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  return <RegisterPage onNavigate={onNavigate} initialRole="buyer" />;
};
