import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Shield, Lock, FileCheck, ExternalLink, Heart } from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useApp();

  return (
    <footer style={{
      background: 'var(--ink-black)',
      color: '#A3A3A3',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '64px',
      paddingBottom: '40px'
    }}>
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Brand Info */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--electric-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} color="#121212" strokeWidth={2.5} />
              </div>
              <span style={{ color: 'var(--white)', fontWeight: 800, fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
                CreatorProof<span style={{ color: 'var(--electric-teal)' }}>.ai</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#888' }}>
              The verified marketplace connecting brands with vetted generative AI creators. Audited workflows, explainable AI matching, and milestone-backed escrow.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                background: 'rgba(255,255,255,0.06)',
                padding: '4px 10px',
                borderRadius: '4px',
                color: '#BBB'
              }}>
                <Shield size={12} color="var(--electric-teal)" /> Audited Proof Engine
              </span>
            </div>
          </div>

          {/* Marketplace Column */}
          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '0.95rem', marginBottom: '16px', fontWeight: 600 }}>
              Marketplace
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <button onClick={() => navigateTo('directory')} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  Top AI Creators
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('directory')} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  ComfyUI & Flux Specialists
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('directory')} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  Runway & Sora Video Directors
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('directory')} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  ElevenLabs Voice Producers
                </button>
              </li>
            </ul>
          </div>

          {/* Brands & Agencies */}
          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '0.95rem', marginBottom: '16px', fontWeight: 600 }}>
              For Brands & Agencies
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <button onClick={() => navigateTo('how-it-works')} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  How AI Matching Works
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('ai-brief-builder')} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  AI Brief Builder
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('brand-dashboard')} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  Brand Workspace Portal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shortlist-compare')} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  Shortlist & Compare
                </button>
              </li>
            </ul>
          </div>

          {/* Creators */}
          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '0.95rem', marginBottom: '16px', fontWeight: 600 }}>
              For AI Creators
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <button onClick={() => navigateTo('auth', { defaultTab: 'signup' })} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  Join as AI Creator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('evidence-verification')} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  Evidence & Verification
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('available-campaigns')} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  Browse Open Campaigns
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('portfolio-manager')} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', textAlign: 'left' }}>
                  Portfolio Hub
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.82rem',
          color: '#777'
        }}>
          <div>
            © {new Date().getFullYear()} CreatorProof AI Technologies, Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Commercial Terms</span>
            <span>AI Evidence Audit Standard v2.4</span>
            <span>Security & Escrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
