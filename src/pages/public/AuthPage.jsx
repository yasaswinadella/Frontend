import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Building2,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  Key,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const AuthPage = ({ defaultTab = 'signin', defaultRole = 'brand' }) => {
  const { switchRole, navigateTo, addToast } = useApp();

  const [authMode, setAuthMode] = useState(defaultTab); // 'signin' | 'signup' | 'forgot' | 'reset'
  const [selectedRole, setSelectedRole] = useState(defaultRole); // 'brand' | 'creator'

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    switchRole(selectedRole);
    addToast({
      title: `Welcome Back!`,
      message: `Logged in successfully as ${selectedRole === 'brand' ? 'Acme Health & Tech' : 'Elena Rostova'}.`,
      type: 'success'
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    switchRole(selectedRole);
    addToast({
      title: `Account Created!`,
      message: `Welcome to CreatorProof AI as a ${selectedRole === 'brand' ? 'Brand / Agency' : 'Verified AI Creator'}.`,
      type: 'success'
    });
  };

  const handleForgot = (e) => {
    e.preventDefault();
    addToast({
      title: 'Reset Link Dispatched',
      message: `A password reset link was sent to ${email || 'your email address'}.`,
      type: 'info'
    });
    setAuthMode('signin');
  };

  // Quick 1-Click Demo Logins
  const loginAsDemoBrand = () => {
    switchRole('brand');
    addToast({
      title: 'Demo Session Activated',
      message: 'Logged in as Acme Health & Tech (Brand Admin)',
      type: 'success'
    });
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px 80px'
    }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        {/* Logo and Intro */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'var(--ink-black)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            boxShadow: '0 4px 14px rgba(0, 214, 201, 0.3)'
          }}>
            <Sparkles size={24} color="var(--electric-teal)" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
            {authMode === 'signin' && 'Welcome to CreatorProof AI'}
            {authMode === 'signup' && 'Create Your Account'}
            {authMode === 'forgot' && 'Reset Your Password'}
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem' }}>
            {authMode === 'signin' && 'Sign in to manage your campaigns, proposals, and audited proofs.'}
            {authMode === 'signup' && 'Select your role to access specialized brand or creator tools.'}
            {authMode === 'forgot' && 'Enter your verified email to receive instructions.'}
          </p>
        </div>

        {/* 1-Click Instant Demo Login Banner */}
        <div className="card" style={{
          background: 'radial-gradient(circle at top right, #1f2a29 0%, #121212 100%)',
          color: 'var(--white)',
          padding: '18px 20px',
          marginBottom: '24px',
          border: '1px solid rgba(0, 214, 201, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--electric-teal)', fontWeight: 700, marginBottom: '10px' }}>
            <Sparkles size={14} />
            <span>ONE-CLICK DEMO LOGIN (EASY TEST DRIVE)</span>
          </div>
          <div>
            <button
              onClick={loginAsDemoBrand}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.78rem', width: '100%', justifyContent: 'center' }}
            >
              <Building2 size={14} />
              <span>Login as Brand</span>
            </button>
          </div>
        </div>

        {/* Main Auth Card */}
        <div className="card" style={{ padding: '32px' }}>
          {/* Auth Mode Toggle */}
          {authMode !== 'forgot' && (
            <div style={{
              display: 'flex',
              background: 'var(--warm-ivory-light)',
              borderRadius: 'var(--radius-md)',
              padding: '4px',
              marginBottom: '24px'
            }}>
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: authMode === 'signin' ? 'var(--white)' : 'transparent',
                  fontWeight: authMode === 'signin' ? 700 : 500,
                  boxShadow: authMode === 'signin' ? 'var(--shadow-sm)' : 'none',
                  cursor: 'pointer',
                  color: 'var(--ink-black)',
                  fontSize: '0.88rem'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: authMode === 'signup' ? 'var(--white)' : 'transparent',
                  fontWeight: authMode === 'signup' ? 700 : 500,
                  boxShadow: authMode === 'signup' ? 'var(--shadow-sm)' : 'none',
                  cursor: 'pointer',
                  color: 'var(--ink-black)',
                  fontSize: '0.88rem'
                }}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Role Picker (Brand vs Creator) */}
          <div style={{ marginBottom: '22px' }}>
            <label className="form-label" style={{ marginBottom: '8px' }}>
              Choose Your Primary Account Role:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div
                onClick={() => setSelectedRole('brand')}
                style={{
                  border: `2px solid ${selectedRole === 'brand' ? 'var(--electric-teal)' : 'var(--soft-border)'}`,
                  background: selectedRole === 'brand' ? 'var(--electric-teal-subtle)' : 'var(--white)',
                  padding: '14px 12px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <Building2 size={22} color={selectedRole === 'brand' ? 'var(--ink-black)' : 'var(--muted-gray)'} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Brand / Agency</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--muted-gray)', marginTop: '2px' }}>Post briefs & hire verified creators</div>
              </div>

              <div
                onClick={() => setSelectedRole('creator')}
                style={{
                  border: `2px solid ${selectedRole === 'creator' ? 'var(--electric-teal)' : 'var(--soft-border)'}`,
                  background: selectedRole === 'creator' ? 'var(--electric-teal-subtle)' : 'var(--white)',
                  padding: '14px 12px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <Sparkles size={22} color={selectedRole === 'creator' ? 'var(--ink-black)' : 'var(--muted-gray)'} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Customer / AI Creator</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--muted-gray)', marginTop: '2px' }}>Submit proposals & get paid via escrow</div>
              </div>
            </div>
          </div>

          {/* SIGN IN FORM */}
          {authMode === 'signin' && (
            <form onSubmit={handleSignIn}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@company.com"
                  defaultValue={selectedRole === 'brand' ? 'marketing@acmehealth.tech' : 'elena@rostova.ai'}
                  required
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Password</label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    style={{ background: 'none', border: 'none', color: 'var(--muted-gray)', fontSize: '0.78rem', cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••••••"
                  defaultValue="password123"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '10px' }}
              >
                <span>Sign In to {selectedRole === 'brand' ? 'Brand Workspace' : 'Creator Workspace'}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* SIGN UP FORM */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alex Morgan"
                  required
                />
              </div>

              {selectedRole === 'brand' && (
                <div className="form-group">
                  <label className="form-label">Company / Brand Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Acme Health & Tech"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Work Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--muted-gray)', marginBottom: '18px', lineHeight: 1.4 }}>
                By signing up, you agree to CreatorProof AI's Commercial Licensing Standard and Escrow Agreement.
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <span>Create {selectedRole === 'brand' ? 'Brand' : 'Creator'} Account</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {authMode === 'forgot' && (
            <form onSubmit={handleForgot}>
              <div className="form-group">
                <label className="form-label">Enter Account Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '12px' }}
              >
                Send Password Reset Link
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className="btn btn-outline"
                style={{ width: '100%' }}
              >
                Back to Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
