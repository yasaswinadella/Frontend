import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Search, LogIn, UserPlus, Shield, Compass, BookOpen, Layers } from 'lucide-react';

export const Navbar = () => {
  const { currentPage, navigateTo, switchRole } = useApp();

  return (
    <header style={{
      background: 'var(--ink-black)',
      color: 'var(--white)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        padding: '0 32px',
        height: '74px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div
          onClick={() => navigateTo('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00D6C9 0%, #009e94 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 214, 201, 0.35)'
          }}>
            <Sparkles size={22} color="#121212" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              color: 'var(--white)',
              lineHeight: 1.1
            }}>
              CreatorProof<span style={{ color: 'var(--electric-teal)' }}>.ai</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#999', letterSpacing: '0.04em' }}>
              VERIFIED AI CREATOR MARKETPLACE
            </div>
          </div>
        </div>

        {/* Public Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <button
            onClick={() => {
              navigateTo('landing');
              const el = document.getElementById('about-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#CCC',
              fontWeight: 500,
              fontSize: '0.925rem',
              cursor: 'pointer'
            }}
          >
            About
          </button>

          <button
            onClick={() => navigateTo('how-it-works')}
            style={{
              background: 'transparent',
              border: 'none',
              color: currentPage === 'how-it-works' ? 'var(--electric-teal)' : '#CCC',
              fontWeight: currentPage === 'how-it-works' ? 700 : 500,
              fontSize: '0.925rem',
              cursor: 'pointer'
            }}
          >
            How It Works
          </button>

          <button
            onClick={() => navigateTo('directory')}
            style={{
              background: 'transparent',
              border: 'none',
              color: currentPage === 'directory' ? 'var(--electric-teal)' : '#CCC',
              fontWeight: currentPage === 'directory' ? 700 : 500,
              fontSize: '0.925rem',
              cursor: 'pointer'
            }}
          >
            Explore Creators
          </button>
        </nav>

        {/* Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => navigateTo('auth', { defaultTab: 'signin' })}
            className="btn btn-ghost"
            style={{ color: 'var(--white)' }}
          >
            <LogIn size={16} />
            Sign In
          </button>

          <button
            onClick={() => navigateTo('auth', { defaultTab: 'signup' })}
            className="btn btn-primary"
          >
            <UserPlus size={16} />
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};
