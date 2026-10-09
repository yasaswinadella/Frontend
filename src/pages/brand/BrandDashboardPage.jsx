import React from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge, MatchScoreBadge } from '../../components/common/Badge';
import {
  Briefcase,
  Users,
  Send,
  FolderKanban,
  Sparkles,
  PlusCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
  Scale,
  DollarSign,
  Layers,
  FileCheck2,
  Calendar,
  Lock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const BrandDashboardPage = () => {
  const {
    brandProfile,
    campaigns,
    creators,
    projects,
    collaborationRequests,
    shortlistedCreatorIds,
    toggleShortlist,
    navigateTo,
    setSelectedCreatorId,
    setSelectedCampaignId,
    setSelectedProjectId
  } = useApp();

  const activeCampaigns = campaigns.filter((c) => c.status === 'Active');
  const activeProjects = projects.filter((p) => p.status === 'In Progress' || p.status === 'Submitted' || p.status === 'Revision Requested');
  const pendingRequests = collaborationRequests.filter((r) => r.status === 'Sent' || r.status === 'Counteroffer' || r.status === 'Incoming');

  // Explainable AI Matches
  const matchedCreators = [
    {
      id: 'creator-1',
      name: 'Elena Vance',
      handle: '@elenavance_ai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      title: 'Photorealistic Visuals & Synthetic Art Direction',
      evidenceStatus: 'verified',
      tools: ['ComfyUI', 'SDXL Pro', 'Magnific 4K', 'C2PA Signed'],
      matchScore: 98,
      rate: 'From $1,850 / project',
      rationale: '98% aesthetic alignment with brand moodboard, 14 cryptographically verified commercial deliverables, verified C2PA seed lineage. Guaranteed SLA: 48-hour turn for initial batch renders.'
    },
    {
      id: 'creator-2',
      name: 'Marcus Chen',
      handle: '@marcus_vfx',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      title: 'AI Video Generation & Dynamic Camera VFX',
      evidenceStatus: 'evidence-linked',
      tools: ['Runway Gen-3', 'Luma Ray 2', 'After Effects'],
      matchScore: 94,
      rate: 'Avg $2,400 video deliverable',
      rationale: 'Motion optical flow precisely maps to your tempo keyframes. Scheduling Note: High demand creator; available pipeline slot opens in 10 calendar days.'
    }
  ];

  return (
    <div className="page-content animate-fade-in" style={{ padding: '28px 32px' }}>
      {/* Top Tag & Welcome Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0, 214, 201, 0.12)',
          border: '1px solid rgba(0, 214, 201, 0.35)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          color: 'var(--electric-teal)',
          fontSize: '0.75rem',
          fontWeight: 700,
          marginBottom: '12px',
          letterSpacing: '0.04em'
        }}>
          <ShieldCheck size={14} />
          <span>CRYPTOGRAPHICALLY AUDITED • C2PA Manifest v2.4 Active</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, color: 'var(--ink-black)', letterSpacing: '-0.02em' }}>
              Welcome back, {brandProfile.name || 'Apex Creative Studio'}
            </h1>
            <p style={{ color: 'var(--muted-gray)', fontSize: '0.95rem', marginTop: '4px' }}>
              Enterprise Tier • <strong>{activeCampaigns.length} active generative pipelines</strong> running with <strong>98.4% cryptographic audit accuracy</strong>.
            </p>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('explore-creators')}
              className="btn btn-outline btn-sm"
              style={{ background: 'var(--white)', fontWeight: 600 }}
            >
              <Sparkles size={14} color="var(--electric-teal)" />
              <span>Explore Creators</span>
            </button>
            <button
              onClick={() => navigateTo('brand-requests')}
              className="btn btn-outline btn-sm"
              style={{ background: 'var(--white)', fontWeight: 600 }}
            >
              <Send size={14} />
              <span>View Requests</span>
            </button>
            <button
              onClick={() => navigateTo('create-campaign')}
              className="btn btn-primary btn-sm"
            >
              <PlusCircle size={15} />
              <span>+ Create Campaign</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards (Exact Reference Design) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '18px',
        marginBottom: '32px'
      }}>
        {/* Card 1: Active Campaigns */}
        <div
          className="card card-hover"
          onClick={() => navigateTo('my-campaigns')}
          style={{ cursor: 'pointer', padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-gray)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Campaigns
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--warm-ivory-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={14} color="var(--ink-black)" />
            </div>
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--ink-black)', lineHeight: 1.1 }}>
            {activeCampaigns.length} Live
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, marginTop: '8px' }}>
            + 2 in production, 1 drafting
          </div>
        </div>

        {/* Card 2: Shortlisted Talent */}
        <div
          className="card card-hover"
          onClick={() => navigateTo('shortlist-compare')}
          style={{ cursor: 'pointer', padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-gray)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Shortlisted Talent
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--electric-teal-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={14} color="#008f87" />
            </div>
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--ink-black)', lineHeight: 1.1 }}>
            {shortlistedCreatorIds.length || 8} Saved
          </div>
          <div style={{ fontSize: '0.78rem', color: '#008f87', fontWeight: 600, marginTop: '8px' }}>
            Top 3% verified AI talent
          </div>
        </div>

        {/* Card 3: Collaboration Requests */}
        <div
          className="card card-hover"
          onClick={() => navigateTo('brand-requests')}
          style={{ cursor: 'pointer', padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-gray)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Collaboration Requests
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={14} color="#D97706" />
            </div>
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--ink-black)', lineHeight: 1.1 }}>
            4 Pending
          </div>
          <div style={{ fontSize: '0.78rem', color: '#D97706', fontWeight: 600, marginTop: '8px' }}>
            2 awaiting reply, 2 counteroffers
          </div>
        </div>

        {/* Card 4: Active Escrow & Projects */}
        <div
          className="card card-hover"
          onClick={() => navigateTo('brand-projects')}
          style={{ cursor: 'pointer', padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-gray)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Escrow & Projects
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--warm-ivory-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={14} color="var(--ink-black)" />
            </div>
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--ink-black)', lineHeight: 1.1 }}>
            2 Active
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, marginTop: '8px' }}>
            $4,850 locked in escrow
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout (Matches Reference Screenshot) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)', gap: '28px', alignItems: 'start' }}>
        {/* LEFT COLUMN: Explainable AI Matches & Active Campaigns Ledger */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Section Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '1.25rem', color: 'var(--ink-black)' }}>
                <span style={{ color: 'var(--electric-teal)' }}>✦</span>
                <span>Explainable AI Matches</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted-gray)', marginTop: '2px' }}>
                Calibrated algorithmically against brief: <strong>"Cyberpunk Spring Launch 2026"</strong>
              </div>
            </div>

            <button
              onClick={() => navigateTo('explore-creators')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--electric-teal)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>View all 18 matches</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* AI Match Cards */}
          {matchedCreators.map((creator) => (
            <div
              key={creator.id}
              className="card card-hover"
              style={{ padding: '22px', border: '1px solid var(--soft-border)' }}
            >
              {/* Creator Top Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    style={{ width: '54px', height: '54px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--electric-teal)' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3
                        onClick={() => navigateTo('brand-creator-detail', { creatorId: creator.id })}
                        style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, cursor: 'pointer' }}
                      >
                        {creator.name}
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted-gray)' }}>{creator.handle}</span>
                      <EvidenceBadge status={creator.evidenceStatus} size="small" />
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted-gray)', marginTop: '2px' }}>
                      {creator.title}
                    </div>
                    {/* Tool Badges */}
                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                      {creator.tools.map((t, idx) => (
                        <span key={idx} style={{ background: 'var(--warm-ivory-light)', border: '1px solid var(--soft-border)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Match Score & Rate */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(0, 214, 201, 0.15)',
                    border: '1px solid var(--electric-teal)',
                    color: '#006b64',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 800,
                    fontSize: '0.8rem'
                  }}>
                    <span>✦</span>
                    <span>{creator.matchScore}% MATCH</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-gray)', marginTop: '4px' }}>
                    {creator.rate}
                  </div>
                </div>
              </div>

              {/* Verification & Match Rationale Box */}
              <div style={{
                background: 'var(--warm-ivory-light)',
                border: '1px solid var(--soft-border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ink-black)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={13} color="var(--electric-teal)" />
                  <span>VERIFICATION & MATCH RATIONALE</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#444', lineHeight: 1.45, margin: 0 }}>
                  {creator.rationale}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => toggleShortlist(creator.id)}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.78rem', background: 'var(--white)' }}
                  >
                    <span>Shortlist</span>
                  </button>
                  <button
                    onClick={() => navigateTo('shortlist-compare')}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.78rem', background: 'var(--white)' }}
                  >
                    <span>Compare Specs</span>
                  </button>
                </div>

                <button
                  onClick={() => navigateTo('brand-creator-detail', { creatorId: creator.id })}
                  className="btn btn-primary btn-sm"
                >
                  <span>Request Collab</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Active Campaigns Ledger Section */}
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Active Campaigns Ledger
              </h3>
              <button
                onClick={() => navigateTo('my-campaigns')}
                style={{ background: 'none', border: 'none', color: 'var(--electric-teal)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Open Campaign Manager
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {campaigns.slice(0, 2).map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigateTo('my-campaigns', { campaignId: c.id })}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--warm-ivory-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{c.title}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted-gray)' }}>
                    ${c.budget} • <strong>{c.applicantsCount}</strong> proposals
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Upcoming Deadlines & Collaboration Bids */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Upcoming Deadlines Widget */}
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} color="var(--electric-teal)" />
                <span>Upcoming Deadlines</span>
              </h3>
              <span style={{ fontSize: '0.72rem', background: '#FEF2F2', color: '#DC2626', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                ACTION REQ
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Item 1 */}
              <div style={{ background: 'var(--warm-ivory-light)', padding: '14px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #DC2626' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#DC2626', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                  <span>DUE IN 18 HOURS</span>
                  <span>Milestone 1</span>
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, margin: '2px 0 4px' }}>
                  Aether Luxury Botanicals
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted-gray)', marginBottom: '10px', lineHeight: 1.4 }}>
                  Sofia K. submitted 8 synthetic renders for concept sign-off.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-black)' }}>
                    $1,400 pending
                  </span>
                  <button
                    onClick={() => navigateTo('brand-projects', { projectId: 'proj-101' })}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '5px 12px' }}
                  >
                    Review Milestone
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div style={{ background: 'var(--warm-ivory-light)', padding: '14px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #059669' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                  <span>DUE IN 4 DAYS</span>
                  <span>Milestone 2</span>
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, margin: '2px 0 4px' }}>
                  Neon Kinetic Apparel
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted-gray)', marginBottom: '10px', lineHeight: 1.4 }}>
                  Elena Vance: Generative asset training in progress.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--muted-gray)' }}>
                    $3,200 Locked
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>
                    ● On Track
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration Bids / Counteroffers */}
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                Collaboration Bids
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted-gray)' }}>2 Counteroffers</span>
            </div>

            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Sofia K.</div>
                  <div style={{ fontSize: '0.72rem', color: '#B45309', fontWeight: 700 }}>Counteroffer Received</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#B45309' }}>$3,200</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted-gray)', textDecoration: 'line-through' }}>Orig $2,800</div>
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: '#78350F', lineHeight: 1.4, margin: '6px 0 10px' }}>
                "Includes +2 additional 8K animated seamless loops formatted for vertical displays."
              </p>

              <button
                onClick={() => navigateTo('brand-requests')}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', fontSize: '0.78rem' }}
              >
                Review Counteroffer Terms
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
