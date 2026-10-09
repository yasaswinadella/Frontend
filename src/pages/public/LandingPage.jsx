import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge } from '../../components/common/Badge';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Users,
  Play,
  X,
  Building2,
  Palette,
  Briefcase,
  Star,
  CheckCircle2,
  Layers,
  FileCheck2,
  Lock,
  Compass,
  DollarSign
} from 'lucide-react';

export const LandingPage = () => {
  const { navigateTo, switchRole, creators } = useApp();
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [howItWorksTab, setHowItWorksTab] = useState('brand'); // 'brand' | 'creator'

  const categories = ['All', 'Product Visuals', 'AI Film', 'AI Fashion', '3D Animation', 'Character Design'];

  const showcaseCards = [
    {
      id: 'creator-1',
      tag: 'Product Visuals',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
      title: 'Sophia Chan',
      subtitle: 'AI Filmmaker & Visual Artist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      projectTitle: 'Velora Eau De Parfum Botanical Campaign',
      tools: ['Flux.1 Pro', 'ComfyUI', 'Runway Gen-3'],
      evidence: 'C2PA Manifest Verified • 8K Octane Render',
      price: '$1,800',
      rating: 4.98
    },
    {
      id: 'creator-2',
      tag: 'AI Film',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      title: 'Daniel Kim',
      subtitle: 'Cinematic AI Trailer & VFX Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      projectTitle: 'Citadel in the Clouds: Fantasy Film Trailer',
      tools: ['OpenAI Sora', 'Runway Gen-3', 'Midjourney v6.1'],
      evidence: 'C2PA Manifest Signed • Multi-Angle Consistency',
      price: '$2,000',
      rating: 4.96
    },
    {
      id: 'creator-3',
      tag: 'AI Fashion',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      title: 'Lily Park',
      subtitle: 'Digital Couture & Virtual Lookbooks',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      projectTitle: 'Obsidian Horizon Techwear Lookbook',
      tools: ['Flux.1 Pro', 'ComfyUI', 'Magnific AI'],
      evidence: 'Audited Model Weights Hash • Custom LoRA',
      price: '$1,600',
      rating: 4.94
    },
    {
      id: 'creator-4',
      tag: '3D Animation',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      title: 'Ravi Patel',
      subtitle: '3D Animator & Neural Storyteller',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      projectTitle: 'Nova & Bot: The Floating Sky Islands',
      tools: ['Blender 4.2', 'Runway Gen-3', 'ComfyUI 3D'],
      evidence: 'Audited Blender+AI Hash • Neural Keyframes',
      price: '$1,400',
      rating: 4.92
    }
  ];

  const filteredCards = activeCategoryFilter === 'All'
    ? showcaseCards
    : showcaseCards.filter(c => c.tag === activeCategoryFilter);

  const handleCardClick = (card) => {
    navigateTo('creator-detail', { creatorId: card.id });
  };

  const handlePlayClick = (e, card) => {
    e.stopPropagation();
    setSelectedPreview(card);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* 1. HERO SECTION */}
      <section style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        borderBottom: '1px solid var(--border-light)',
        padding: '64px 24px 72px'
      }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', textAlign: 'center' }}>
          {/* Top Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--primary-light)',
            border: '1px solid #C7D2FE',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--primary)',
            letterSpacing: '0.04em',
            marginBottom: '20px',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={14} color="#6366F1" />
            ByteXL HackXlarate 2026 • Kampus.VC Challenge
          </div>

          {/* Prompt Heading */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '18px',
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em'
          }}>
            Where AI Creativity <br />
            <span style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Meets Opportunity
            </span>
          </h1>

          {/* Prompt Subheading */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            maxWidth: '740px',
            margin: '0 auto 48px',
            lineHeight: 1.6
          }}>
            Discover talented AI creators, showcase exceptional AI-generated work, and collaborate with brands to bring creative ideas to life.
          </p>

          {/* TWO PROMINENT SELECTION CARDS (MANDATORY REQUIREMENT) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            maxWidth: '920px',
            margin: '0 auto 24px'
          }}>
            {/* CARD 1: I'm a Brand */}
            <div
              className="card card-hover"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '36px 30px',
                textAlign: 'left',
                border: '1.5px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)'
                }}>
                  <Building2 size={28} />
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--primary)',
                  marginBottom: '6px'
                }}>
                  For Businesses & Creative Agencies
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
                  I'm a Brand
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '28px' }}>
                  Find talented AI creators for your next campaign.
                </p>
              </div>

              <button
                onClick={() => switchRole('brand')}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <span>Hire AI Creators</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* CARD 2: I'm an AI Creator */}
            <div
              className="card card-hover"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '36px 30px',
                textAlign: 'left',
                border: '1.5px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--secondary-light)',
                  color: '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)'
                }}>
                  <Palette size={28} />
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#7C3AED',
                  marginBottom: '6px'
                }}>
                  For Generative Artists & Filmmakers
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
                  I'm an AI Creator
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '28px' }}>
                  Showcase your AI portfolio and discover exciting opportunities.
                </p>
              </div>

              <button
                onClick={() => switchRole('creator')}
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#7C3AED',
                  color: '#FFFFFF',
                  borderColor: '#7C3AED'
                }}
              >
                <span>Start Creating</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED AI CREATORS SECTION */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              <Sparkles size={14} />
              <span>Vetted Industry Talent</span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Featured AI Creators
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
              Top rated creators with audited workflows and proven commercial results.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  borderColor: activeCategoryFilter === cat ? 'var(--primary)' : 'var(--border-light)',
                  backgroundColor: activeCategoryFilter === cat ? 'var(--primary-light)' : '#FFFFFF',
                  color: activeCategoryFilter === cat ? 'var(--primary)' : 'var(--text-secondary)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Creator Showcase Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="card card-hover"
              style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              {/* Media Preview */}
              <div style={{ position: 'relative', height: '190px', width: '100%', backgroundColor: '#0F172A' }}>
                <img
                  src={card.image}
                  alt={card.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  textTransform: 'uppercase'
                }}>
                  {card.tag}
                </div>

                <button
                  type="button"
                  onClick={(e) => handlePlayClick(e, card)}
                  title="Play video render"
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: 'var(--primary)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <Play size={14} fill="currentColor" style={{ marginLeft: '2px' }} />
                </button>
              </div>

              {/* Creator Card Content */}
              <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <img
                    src={card.avatar}
                    alt={card.title}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFFFFF', boxShadow: 'var(--shadow-xs)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                      {card.title}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      {card.subtitle}
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <ShieldCheck size={14} color="#059669" />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.evidence}</span>
                </div>

                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-light)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>From </span>
                    <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>{card.price}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 700 }}>
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <span>{card.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigateTo('directory')}
            className="btn btn-outline"
            style={{ padding: '10px 24px', fontWeight: 700 }}
          >
            <span>View All Verified Creators ({creators.length})</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* 3. HOW THE MARKETPLACE WORKS */}
      <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
              <Compass size={14} />
              <span>Simple, Transparent Workflow</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
              How the Marketplace Works
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 24px' }}>
              From initial AI brief formulation to final deliverable release and commercial buyout.
            </p>

            {/* Role Tab Selector */}
            <div style={{
              display: 'inline-flex',
              backgroundColor: 'var(--bg-secondary)',
              padding: '4px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-light)'
            }}>
              <button
                type="button"
                onClick={() => setHowItWorksTab('brand')}
                style={{
                  padding: '8px 24px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: howItWorksTab === 'brand' ? '#FFFFFF' : 'transparent',
                  color: howItWorksTab === 'brand' ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  boxShadow: howItWorksTab === 'brand' ? 'var(--shadow-xs)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                For Brands & Agencies
              </button>
              <button
                type="button"
                onClick={() => setHowItWorksTab('creator')}
                style={{
                  padding: '8px 24px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: howItWorksTab === 'creator' ? '#FFFFFF' : 'transparent',
                  color: howItWorksTab === 'creator' ? '#7C3AED' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  boxShadow: howItWorksTab === 'creator' ? 'var(--shadow-xs)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                For AI Creators
              </button>
            </div>
          </div>

          {/* 3 Step Cards */}
          {howItWorksTab === 'brand' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              <div className="card" style={{ padding: '30px 24px', textAlign: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                  fontWeight: 800,
                  fontSize: '1.2rem'
                }}>
                  1
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                  Create or AI-Generate Brief
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Define campaign specs, aspect ratios (16:9, 9:16), required tools, and budget, or let our AI Brief Builder structure your rough concept.
                </p>
              </div>

              <div className="card" style={{ padding: '30px 24px', textAlign: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                  fontWeight: 800,
                  fontSize: '1.2rem'
                }}>
                  2
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                  Match & Audit Verified Talent
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Discover creators with transparent match scores, audited ComfyUI node workflows, C2PA cryptographic signatures, and sample portfolios.
                </p>
              </div>

              <div className="card" style={{ padding: '30px 24px', textAlign: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                  fontWeight: 800,
                  fontSize: '1.2rem'
                }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                  Escrow-Safe Delivery
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Collaborate through milestones, inspect revisions, and release escrow upon receiving 4K master files and full commercial rights.
                </p>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              <div className="card" style={{ padding: '30px 24px', textAlign: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary-light)',
                  color: '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                  fontWeight: 800,
                  fontSize: '1.2rem'
                }}>
                  1
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                  Showcase Portfolio & Workflows
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Upload high-res generative images and videos, link ComfyUI node graphs, seeds, and training LoRAs to earn verified creator badges.
                </p>
              </div>

              <div className="card" style={{ padding: '30px 24px', textAlign: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary-light)',
                  color: '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                  fontWeight: 800,
                  fontSize: '1.2rem'
                }}>
                  2
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                  Receive Direct Brand Invites
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Get matched with top funded briefs, submit competitive proposals or counteroffers, and lock in milestone scopes.
                </p>
              </div>

              <div className="card" style={{ padding: '30px 24px', textAlign: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary-light)',
                  color: '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                  fontWeight: 800,
                  fontSize: '1.2rem'
                }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                  Deliver & Secure Fast Payouts
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Deliver master assets with C2PA metadata, handle client feedback seamlessly, and get paid automatically with escrow protection.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. PLATFORM BENEFITS */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
            <ShieldCheck size={14} />
            <span>Built for Modern AI Production</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Platform Benefits
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
            Enterprise-grade infrastructure designed for authentic generative collaboration.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          <div className="card" style={{ padding: '28px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
              Trust & Verification Signals
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Transparent verification statuses (Self-Reported, Verification Pending, Verified) based on actual reproducible generation proofs.
            </p>
          </div>

          <div className="card" style={{ padding: '28px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'var(--secondary-light)', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
              AI-Assisted Brief Builder
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Convert natural language ideas into structured campaign briefs with automated toolchain and aspect ratio recommendations.
            </p>
          </div>

          <div className="card" style={{ padding: '28px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <DollarSign size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
              Milestone Escrow Protection
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Funds remain securely escrowed until milestone criteria are verified and approved by the brand team.
            </p>
          </div>

          <div className="card" style={{ padding: '28px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#F0F9FF', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <FileCheck2 size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
              Commercial-Use Licensing
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Explicit commercial buyout agreements, LoRA checkpoint transfers, and worldwide broadcast rights management.
            </p>
          </div>
        </div>
      </section>

      {/* 5. MEDIA PREVIEW MODAL */}
      {selectedPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '680px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border-light)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-indigo">
                  {selectedPreview.tag}
                </span>
                <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{selectedPreview.projectTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPreview(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Media Image Showcase */}
            <div style={{ position: 'relative', width: '100%', height: '320px', backgroundColor: '#0F172A' }}>
              <img
                src={selectedPreview.image}
                alt={selectedPreview.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldCheck size={16} color="#10B981" />
                {selectedPreview.evidence}
              </div>
            </div>

            {/* Creator & Tool Metadata */}
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={selectedPreview.avatar}
                    alt={selectedPreview.title}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{selectedPreview.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{selectedPreview.subtitle}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const cid = selectedPreview.id;
                    setSelectedPreview(null);
                    navigateTo('creator-detail', { creatorId: cid });
                  }}
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.88rem' }}
                >
                  View Creator Profile
                </button>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '12px 16px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem'
              }}>
                <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>AI Tools Used:</span>
                {selectedPreview.tools.map((t, idx) => (
                  <span key={idx} className="badge badge-gray" style={{ background: '#FFFFFF' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
