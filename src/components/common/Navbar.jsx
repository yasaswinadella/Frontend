import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, Building2, User, LogIn, UserPlus } from 'lucide-react';

export const Navbar = () => {
  const { currentPage, navigateTo, switchRole } = useApp();

  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* CreatorProof AI Logo */}
        <div
          onClick={() => navigateTo('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 3px 10px rgba(99, 102, 241, 0.3)'
          }}>
            <Sparkles size={20} color="#FFFFFF" />
          </div>
          <div>
            <div style={{
              fontWeight: 800,
              fontSize: '1.2rem',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.1
            }}>
              CreatorProof<span style={{ color: 'var(--primary)' }}>.ai</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
              AI CONTENT CREATOR MARKETPLACE
            </div>
          </div>
        </div>

        {/* Public Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button
            onClick={() => navigateTo('directory')}
            style={{
              background: 'transparent',
              border: 'none',
              color: currentPage === 'directory' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: currentPage === 'directory' ? 700 : 500,
              fontSize: '0.925rem',
              cursor: 'pointer',
              transition: 'color 0.15s ease'
            }}
          >
            Explore Creators
          </button>

          <button
            onClick={() => navigateTo('how-it-works')}
            style={{
              background: 'transparent',
              border: 'none',
              color: currentPage === 'how-it-works' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: currentPage === 'how-it-works' ? 700 : 500,
              fontSize: '0.925rem',
              cursor: 'pointer',
              transition: 'color 0.15s ease'
            }}
          >
            How It Works
          </button>
        </nav>

        {/* Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => navigateTo('auth', { defaultTab: 'signin' })}
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--text-primary)', fontWeight: 600 }}
          >
            <LogIn size={15} />
            <span>Login</span>
          </button>

          <button
            onClick={() => navigateTo('auth', { defaultTab: 'signup' })}
            className="btn btn-primary btn-sm"
          >
            <UserPlus size={15} />
            <span>Sign Up</span>
          </button>

          {/* Quick Demo Workspace Launcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginLeft: '12px',
            paddingLeft: '12px',
            borderLeft: '1px solid var(--border-light)'
          }}>
            <button
              onClick={() => switchRole('brand')}
              className="btn btn-outline btn-sm"
              title="Quick jump to Brand Dashboard"
              style={{ fontSize: '0.78rem', padding: '5px 10px', color: 'var(--primary)', borderColor: '#C7D2FE' }}
            >
              <Building2 size={13} />
              <span>Brand Demo</span>
            </button>
            <button
              onClick={() => switchRole('creator')}
              className="btn btn-outline btn-sm"
              title="Quick jump to Creator Dashboard"
              style={{ fontSize: '0.78rem', padding: '5px 10px', color: '#7C3AED', borderColor: '#DDD6FE' }}
            >
              <User size={13} />
              <span>Creator Demo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
