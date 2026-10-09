import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ShieldCheck, Heart, ExternalLink, Award } from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useApp();

  return (
    <footer style={{
      backgroundColor: '#FFFFFF',
      color: 'var(--text-secondary)',
      borderTop: '1px solid var(--border-light)',
      paddingTop: '56px',
      paddingBottom: '36px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Brand Info */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)'
              }}>
                <Sparkles size={16} color="#FFFFFF" />
              </div>
              <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.15rem' }}>
                CreatorProof<span style={{ color: 'var(--primary)' }}>.ai</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
              The premier AI-native creative marketplace connecting brands with vetted AI filmmakers, 3D animators, and generative artists.
            </p>
            <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--bg-secondary)', padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Award size={14} color="#6366F1" />
              <span>ByteXL HackXlarate 2026 • Challenge: Kampus.VC</span>
            </div>
          </div>

          {/* Marketplace Column */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Marketplace
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '0.875rem' }}>
              <li>
                <button onClick={() => navigateTo('directory')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  Explore Creators
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('how-it-works')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('directory')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  AI Filmmakers & 3D
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('directory')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  Product & Luxury Commercials
                </button>
              </li>
            </ul>
          </div>

          {/* Brands & Agencies */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              For Brands
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '0.875rem' }}>
              <li>
                <button onClick={() => navigateTo('brand-dashboard')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  Brand Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('ai-brief-builder')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  AI Brief Builder
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('create-campaign')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  Create Creative Brief
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shortlist-compare')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  Shortlist & Compare
                </button>
              </li>
            </ul>
          </div>

          {/* For AI Creators */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              For AI Creators
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '0.875rem' }}>
              <li>
                <button onClick={() => navigateTo('creator-dashboard')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  Creator Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('portfolio-manager')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  Portfolio Manager
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('available-campaigns')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  Explore Brand Briefs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('evidence-verification')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>
                  Trust & Verification Hub
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.825rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 CreatorProof AI • Kampus.VC Challenge • ByteXL HackXlarate 2026. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Commercial Rights Licensing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
