import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Sparkles,
  ShieldCheck,
  Send,
  CheckCircle,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Lock,
  Search,
  Scale
} from 'lucide-react';

export const HowItWorksPage = () => {
  const { navigateTo } = useApp();
  const [activeWorkflow, setActiveWorkflow] = useState('brand'); // 'brand' | 'creator'

  const brandSteps = [
    {
      step: '01',
      title: 'Build or AI-Generate Your Campaign Brief',
      description: 'Define your objectives, required deliverables (4K video, 3D worlds, virtual influencers), aspect ratios, and timeline. Use our AI Brief Builder to instantly structure rough prompts into production-ready briefs.',
      icon: <Sparkles size={24} color="var(--electric-teal)" />
    },
    {
      step: '02',
      title: 'Explainable AI Matching & Evidence Audit',
      description: 'Our proprietary matching engine evaluates creators based on verified tool mastery (Flux.1, ComfyUI, Runway Gen-3, ElevenLabs) and past client work. Review itemized match breakdowns, strengths, and risk gaps.',
      icon: <ShieldCheck size={24} color="var(--electric-teal)" />
    },
    {
      step: '03',
      title: 'Shortlist, Compare & Send Requests',
      description: 'Compare creator portfolios side-by-side on verified claims, pricing tiers, turnaround SLAs, and declared usage rights. Send direct collaboration invitations or receive proposals to open briefs.',
      icon: <Scale size={24} color="var(--electric-teal)" />
    },
    {
      step: '04',
      title: 'Milestone Escrow & Seamless Collaboration',
      description: 'Funds are securely deposited into CreatorProof Escrow. Collaborate with structured milestone reviews, inspect multi-version file previews, request revisions, and release payouts upon approving milestones.',
      icon: <Lock size={24} color="var(--electric-teal)" />
    }
  ];

  const creatorSteps = [
    {
      step: '01',
      title: 'Create Your Verified Creator Portfolio',
      description: 'Set up your specialized AI artist profile, declare your core tools (Flux.1, Midjourney, ComfyUI, ElevenLabs, Sora), showcase your case studies, and declare your standard commercial licensing terms.',
      icon: <Layers size={24} color="var(--electric-teal)" />
    },
    {
      step: '02',
      title: 'Submit Workflow Proof & Provenance',
      description: 'Upgrade your portfolio claims by linking raw generation node graphs, platform export logs, and verified client sign-offs to earn the Verified Creator badge.',
      icon: <ShieldCheck size={24} color="var(--electric-teal)" />
    },
    {
      step: '03',
      title: 'Discover Campaigns & Submit Custom Pitches',
      description: 'Browse brand campaigns matched to your exact skillset with explainable suitability scores. Submit custom proposals, milestone breakdowns, or counteroffers on budget and timelines.',
      icon: <FileSpreadsheet size={24} color="var(--electric-teal)" />
    },
    {
      step: '04',
      title: 'Deliver Work & Guaranteed Payouts',
      description: 'Once the brand funds escrow, upload your work versions and prompt archives. Payouts are guaranteed and instantly credited to your balance upon milestone sign-off.',
      icon: <CheckCircle size={24} color="var(--electric-teal)" />
    }
  ];

  return (
    <div style={{ padding: '60px 24px 100px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 214, 201, 0.12)',
          border: '1px solid rgba(0, 214, 201, 0.3)',
          padding: '4px 14px',
          borderRadius: 'var(--radius-full)',
          color: 'var(--electric-teal)',
          fontSize: '0.8rem',
          fontWeight: 700,
          marginBottom: '16px'
        }}>
          TRUSTED MARKETPLACE INFRASTRUCTURE
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '16px' }}>
          How CreatorProof AI Works
        </h1>
        <p style={{ color: 'var(--muted-gray)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          A frictionless, audited procurement workflow designed specifically for the unique requirements of generative AI creative production.
        </p>
      </div>

      {/* Role Toggle Switch */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <div style={{
          background: 'var(--ink-black)',
          padding: '6px',
          borderRadius: 'var(--radius-full)',
          display: 'inline-flex',
          gap: '6px'
        }}>
          <button
            onClick={() => setActiveWorkflow('brand')}
            style={{
              padding: '10px 28px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: activeWorkflow === 'brand' ? 'var(--electric-teal)' : 'transparent',
              color: activeWorkflow === 'brand' ? 'var(--ink-black)' : '#CCC',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <Building2 size={18} />
            <span>For Brands & Agencies</span>
          </button>

          <button
            onClick={() => setActiveWorkflow('creator')}
            style={{
              padding: '10px 28px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: activeWorkflow === 'creator' ? 'var(--electric-teal)' : 'transparent',
              color: activeWorkflow === 'creator' ? 'var(--ink-black)' : '#CCC',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={18} />
            <span>For AI Creators</span>
          </button>
        </div>
      </div>

      {/* Workflow Steps Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        marginBottom: '70px'
      }}>
        {(activeWorkflow === 'brand' ? brandSteps : creatorSteps).map((step, idx) => (
          <div
            key={idx}
            className="card card-hover"
            style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'var(--ink-black)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {step.icon}
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--soft-border)'
              }}>
                {step.step}
              </span>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px' }}>
              {step.title}
            </h3>

            <p style={{ color: 'var(--muted-gray)', fontSize: '0.88rem', lineHeight: 1.6, marginTop: 'auto' }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Verification Standard Box */}
      <div className="card" style={{
        background: 'radial-gradient(circle at 10% 20%, #1c2726 0%, #121212 100%)',
        color: 'var(--white)',
        padding: '40px',
        marginBottom: '60px'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--electric-teal)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '8px' }}>
            <ShieldCheck size={18} />
            <span>The CreatorProof Verification Standard</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '14px', color: 'var(--white)' }}>
            Never Guess an AI Creator's Authentic Capability
          </h2>
          <p style={{ color: '#BBB', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Unlike traditional portfolio platforms where anyone can copy-paste Midjourney prompts or showcase unowned renders, our system conducts automated hash audits, temporal coherence checks, and human peer reviews.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--electric-teal)' }}>✓</span> Cryptographic workflow seeds
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--electric-teal)' }}>✓</span> Commercial rights buyout contracts
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--electric-teal)' }}>✓</span> Custom LoRA weights delivery
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => navigateTo('auth', { defaultRole: activeWorkflow, defaultTab: 'signup' })}
          className="btn btn-primary btn-lg"
        >
          <span>Get Started as {activeWorkflow === 'brand' ? 'a Brand' : 'an AI Creator'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
