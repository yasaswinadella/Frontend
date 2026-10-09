import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Users,
  Play,
  X
} from 'lucide-react';

export const LandingPage = () => {
  const { navigateTo, switchRole, creators } = useApp();
  const [selectedPreview, setSelectedPreview] = useState(null);

  const showcaseCards = [
    {
      id: 'creator-1',
      tag: 'PRODUCT VISUALS',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
      title: 'Sophia Chan',
      subtitle: 'AI Filmmaker & Visual Artist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      projectTitle: 'Velora Eau De Parfum Botanical Campaign',
      tools: ['Flux.1 Pro', 'ComfyUI', 'Runway Gen-3'],
      evidence: 'C2PA Manifest Verified • 8K Octane Render'
    },
    {
      id: 'creator-2',
      tag: 'AI FILM',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      title: 'Daniel Kim',
      subtitle: 'AI Filmmaker',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      projectTitle: 'Citadel in the Clouds: Fantasy Film Trailer',
      tools: ['OpenAI Sora', 'Runway Gen-3', 'Midjourney v6.1'],
      evidence: 'C2PA Manifest Signed • Multi-Angle Consistency'
    },
    {
      id: 'creator-3',
      tag: 'AI FASHION',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      title: 'Lily Park',
      subtitle: 'AI Fashion Creator',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      projectTitle: 'Obsidian Horizon Techwear Lookbook',
      tools: ['Flux.1 Pro', 'ComfyUI', 'Magnific AI'],
      evidence: 'Audited Model Weights Hash • Custom LoRA'
    },
    {
      id: 'creator-4',
      tag: '3D ANIMATION',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      title: 'Ravi Patel',
      subtitle: '3D Animator & Storyteller',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      projectTitle: 'Nova & Bot: The Floating Sky Islands',
      tools: ['Blender 4.2', 'Runway Gen-3', 'ComfyUI 3D'],
      evidence: 'Audited Blender+AI Hash • Neural Keyframes'
    }
  ];

  const handleCardClick = (card) => {
    const creator = creators.find(c => c.id === card.id);
    if (creator) {
      navigateTo('creator-detail', { creatorId: card.id });
    } else {
      navigateTo('directory');
    }
  };

  const handlePlayClick = (e, card) => {
    e.stopPropagation();
    setSelectedPreview(card);
  };

  return (
    <div style={{ background: 'var(--warm-ivory)', minHeight: '100vh', color: 'var(--ink-black)' }}>
      {/* 1. Hero Introduction Header */}
      <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '52px 24px 28px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--warm-ivory-light)',
          border: '1px solid var(--soft-border)',
          padding: '5px 14px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--ink-black)',
          letterSpacing: '0.05em',
          marginBottom: '16px',
          textTransform: 'uppercase'
        }}>
          <Sparkles size={14} color="#00D6C9" />
          THE AI CREATOR MARKETPLACE
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 4.8vw, 3.6rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '14px',
          color: 'var(--ink-black)',
          letterSpacing: '-0.025em'
        }}>
          Creativity Meets Opportunity.
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--muted-gray)',
          maxWidth: '680px',
          margin: '0 auto 36px',
          lineHeight: 1.55
        }}>
          A verified marketplace where brands discover top AI creators, audit proof of authenticity, and build real campaigns.
        </p>
      </section>

      {/* 2. "A World of AI Creativity" Section (Exact Reference Layout) */}
      <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px 64px' }}>
        {/* Teal Accent Pill */}
        <div style={{
          width: '32px',
          height: '4px',
          background: 'var(--electric-teal)',
          borderRadius: '9999px',
          margin: '0 auto 16px'
        }} />

        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.2vw, 2.3rem)',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '8px',
          color: 'var(--ink-black)',
          letterSpacing: '-0.02em'
        }}>
          A World of AI Creativity
        </h2>

        <p style={{
          fontSize: '1rem',
          color: 'var(--muted-gray)',
          textAlign: 'center',
          marginBottom: '36px'
        }}>
          Explore what creators can bring to life.
        </p>

        {/* 4-Card Showcase Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {showcaseCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              style={{
                background: 'var(--white)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
                border: '1px solid var(--soft-border)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.06)';
              }}
            >
              {/* Image Preview Container */}
              <div style={{
                position: 'relative',
                height: '185px',
                width: '100%',
                background: '#121212',
                overflow: 'hidden'
              }}>
                <img
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Top-Left Category Tag */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'var(--electric-teal)',
                  color: 'var(--ink-black)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
                }}>
                  {card.tag}
                </div>

                {/* Bottom-Right Play Button */}
                <button
                  onClick={(e) => handlePlayClick(e, card)}
                  title="Play preview render"
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(18, 18, 18, 0.75)',
                    backdropFilter: 'blur(6px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--white)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'transform 0.15s ease, background 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.12)';
                    e.currentTarget.style.background = 'var(--electric-teal)';
                    e.currentTarget.style.color = 'var(--ink-black)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'rgba(18, 18, 18, 0.75)';
                    e.currentTarget.style.color = 'var(--white)';
                  }}
                >
                  <Play size={14} fill="currentColor" style={{ marginLeft: '2px' }} />
                </button>
              </div>

              {/* Creator Info Footer */}
              <div style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'var(--white)'
              }}>
                <img
                  src={card.avatar}
                  alt={card.title}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid var(--soft-border)',
                    flexShrink: 0
                  }}
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: 'var(--ink-black)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {card.title}
                  </div>
                  <div style={{
                    fontSize: '0.74rem',
                    color: 'var(--muted-gray)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {card.subtitle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. "From Creative Idea to Campaign" Section (Exact Reference Layout in Dark Box) */}
      <section style={{ maxWidth: '1180px', margin: '0 auto 48px', padding: '0 24px' }}>
        <div style={{
          background: 'var(--ink-black)',
          borderRadius: '24px',
          padding: '64px 36px 48px',
          color: 'var(--white)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Ambient Teal Mesh in background */}
          <div style={{
            position: 'absolute',
            bottom: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '240px',
            background: 'radial-gradient(ellipse at center, rgba(0, 214, 201, 0.14) 0%, rgba(18, 18, 18, 0) 70%)',
            pointerEvents: 'none'
          }} />

          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px', position: 'relative' }}>
            <h2 style={{
              fontSize: 'clamp(1.9rem, 3.4vw, 2.4rem)',
              fontWeight: 800,
              color: 'var(--white)',
              marginBottom: '10px',
              letterSpacing: '-0.02em'
            }}>
              From Creative Idea to Campaign
            </h2>
            <p style={{
              fontSize: '0.98rem',
              color: '#A0A0A0',
              lineHeight: 1.55,
              margin: 0
            }}>
              Everything you need to find the right creators, evaluate their work, and build real collaborations.
            </p>
          </div>

          {/* 3 Columns with Vertical Dividing Lines */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0px',
            maxWidth: '1020px',
            margin: '0 auto 52px',
            position: 'relative'
          }}>
            {/* Column 1: Discover Talent */}
            <div style={{
              textAlign: 'center',
              padding: '16px 28px',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '1.5px solid var(--electric-teal)',
                color: 'var(--electric-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                background: 'rgba(0, 214, 201, 0.05)'
              }}>
                <Search size={22} color="var(--electric-teal)" />
              </div>
              <h3 style={{
                fontSize: '1.12rem',
                fontWeight: 800,
                color: 'var(--white)',
                marginBottom: '8px'
              }}>
                Discover Talent
              </h3>
              <p style={{
                fontSize: '0.86rem',
                color: '#9E9E9E',
                lineHeight: 1.55,
                margin: 0
              }}>
                Find AI creators with the right skills, tools and style for your campaign.
              </p>
            </div>

            {/* Column 2: See the Evidence */}
            <div style={{
              textAlign: 'center',
              padding: '16px 28px',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '1.5px solid var(--electric-teal)',
                color: 'var(--electric-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                background: 'rgba(0, 214, 201, 0.05)'
              }}>
                <ShieldCheck size={22} color="var(--electric-teal)" />
              </div>
              <h3 style={{
                fontSize: '1.12rem',
                fontWeight: 800,
                color: 'var(--white)',
                marginBottom: '8px'
              }}>
                See the Evidence
              </h3>
              <p style={{
                fontSize: '0.86rem',
                color: '#9E9E9E',
                lineHeight: 1.55,
                margin: 0
              }}>
                Explore real portfolio work and supporting evidence for every claim.
              </p>
            </div>

            {/* Column 3: Collaborate with Confidence */}
            <div style={{
              textAlign: 'center',
              padding: '16px 28px'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '1.5px solid var(--electric-teal)',
                color: 'var(--electric-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                background: 'rgba(0, 214, 201, 0.05)'
              }}>
                <Users size={22} color="var(--electric-teal)" />
              </div>
              <h3 style={{
                fontSize: '1.12rem',
                fontWeight: 800,
                color: 'var(--white)',
                marginBottom: '8px'
              }}>
                Collaborate with Confidence
              </h3>
              <p style={{
                fontSize: '0.86rem',
                color: '#9E9E9E',
                lineHeight: 1.55,
                margin: 0
              }}>
                Send requests, review deliverables, and manage projects — all in one place.
              </p>
            </div>
          </div>

          {/* Bottom CTA Inside Dark Container */}
          <div style={{ textAlign: 'center', position: 'relative', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: 'var(--white)',
              marginBottom: '18px'
            }}>
              Have an idea worth creating?
            </h3>
            <button
              onClick={() => navigateTo('directory')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--electric-teal)',
                color: 'var(--ink-black)',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(0, 214, 201, 0.35)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 22px rgba(0, 214, 201, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 214, 201, 0.35)';
              }}
            >
              Explore the Marketplace <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Render / Video Preview Modal */}
      {selectedPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(18, 18, 18, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--white)',
            borderRadius: '20px',
            maxWidth: '680px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            border: '1px solid var(--soft-border)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--soft-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  background: 'var(--electric-teal)',
                  color: 'var(--ink-black)',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: 800
                }}>
                  {selectedPreview.tag}
                </span>
                <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{selectedPreview.projectTitle}</span>
              </div>
              <button
                onClick={() => setSelectedPreview(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted-gray)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Media Image Showcase */}
            <div style={{ position: 'relative', width: '100%', height: '320px', background: '#121212' }}>
              <img
                src={selectedPreview.image}
                alt={selectedPreview.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(18, 18, 18, 0.85)',
                color: 'var(--white)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldCheck size={16} color="var(--electric-teal)" />
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
                    <div style={{ color: 'var(--muted-gray)', fontSize: '0.82rem' }}>{selectedPreview.subtitle}</div>
                  </div>
                </div>

                <button
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
                background: 'var(--warm-ivory-light)',
                padding: '12px 16px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem'
              }}>
                <span style={{ fontWeight: 700, color: 'var(--muted-gray)' }}>Tools Used:</span>
                {selectedPreview.tools.map((t, idx) => (
                  <span key={idx} style={{ background: 'var(--white)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--soft-border)', fontWeight: 600 }}>
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
