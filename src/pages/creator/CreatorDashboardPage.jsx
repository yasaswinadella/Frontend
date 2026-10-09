import React from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge, MatchScoreBadge } from '../../components/common/Badge';
import {
  Sparkles,
  TrendingUp,
  Inbox,
  Compass,
  FolderKanban,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Edit,
  DollarSign,
  Clock,
  Eye,
  Lock,
  MessageSquare,
  Upload,
  Check,
  FileText
} from 'lucide-react';

export const CreatorDashboardPage = () => {
  const {
    activeCreatorProfile,
    campaigns,
    collaborationRequests,
    projects,
    conversations,
    evidenceRecords,
    navigateTo,
    setSelectedCampaignId,
    setSelectedProjectId
  } = useApp();

  const myEngagements = projects.filter((p) => p.creatorId === activeCreatorProfile.id || p.id === 'proj-101');
  const myRequests = collaborationRequests.filter((r) => r.creatorId === activeCreatorProfile.id || r.type === 'Brand Invitation');

  return (
    <div className="page-content animate-fade-in" style={{ padding: '28px 32px' }}>
      {/* Top Status Indicators */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <span style={{
          background: '#ECFDF5',
          border: '1px solid #A7F3D0',
          color: '#059669',
          padding: '3px 10px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.72rem',
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }} />
          VERIFIED TALENT
        </span>

        <span style={{
          background: 'rgba(0, 214, 201, 0.12)',
          border: '1px solid rgba(0, 214, 201, 0.4)',
          color: '#008f87',
          padding: '3px 10px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.72rem',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--electric-teal)' }} />
          Open for Collabs
        </span>
      </div>

      {/* Header & Quick Action Buttons */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--muted-gray)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
          SYSTEM OPERATIONAL • CRYPTOGRAPHIC LEDGER ONLINE
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, color: 'var(--ink-black)', letterSpacing: '-0.02em' }}>
              Welcome back, {activeCreatorProfile.name || 'Elena Vance'}
            </h1>
            <p style={{ color: 'var(--muted-gray)', fontSize: '0.95rem', marginTop: '4px' }}>
              Verified Level 2 Creator • Audit ID <strong>#8461-CP</strong> • Your synthetic media proofs perform in <strong>top 2% platform-wide</strong>.
            </p>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('available-campaigns')}
              className="btn btn-primary btn-sm"
            >
              <Compass size={15} />
              <span>Explore Campaigns</span>
            </button>
            <button
              onClick={() => navigateTo('portfolio-manager')}
              className="btn btn-outline btn-sm"
              style={{ background: 'var(--white)', fontWeight: 600 }}
            >
              <span>Manage Portfolio</span>
            </button>
            <button
              onClick={() => navigateTo('creator-requests')}
              className="btn btn-outline btn-sm"
              style={{ background: 'var(--white)', fontWeight: 600 }}
            >
              <Inbox size={14} />
              <span>View Requests</span>
            </button>
            <button
              onClick={() => navigateTo('creator-profile')}
              className="btn btn-outline btn-sm"
              style={{ background: 'var(--white)', fontWeight: 600 }}
            >
              <Edit size={14} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Readiness & Evidence Bar (Exact Reference Component) */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>Profile Readiness:</span>
            <span style={{ color: '#008f87' }}>88% Complete</span>
            <span style={{ color: 'var(--muted-gray)', fontWeight: 400 }}>• Level 2 → Level 3 Target</span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--muted-gray)' }}>
            Add client contract proof to reach 100% Verified Level 3 status
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ height: '6px', background: 'var(--warm-ivory-light)', borderRadius: '3px', overflow: 'hidden', marginBottom: '14px' }}>
          <div style={{ width: '88%', height: '100%', background: 'var(--electric-teal)' }} />
        </div>

        {/* Proof Status Pills */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
              ✓ 14 Claims Verified
            </span>
            <span style={{ background: '#F0F9FF', color: '#0284C7', border: '1px solid #BAE6FD', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
              ● 2 Evidence-Linked
            </span>
            <span style={{ background: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
              ! 0 Unverified
            </span>
          </div>

          <button
            onClick={() => navigateTo('evidence-verification')}
            style={{ background: 'none', border: 'none', color: 'var(--electric-teal)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>Manage Evidence & Logs</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards (Exact Reference Design) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '18px',
        marginBottom: '32px'
      }}>
        {/* Card 1: Active Engagements */}
        <div
          className="card card-hover"
          onClick={() => navigateTo('creator-projects')}
          style={{ cursor: 'pointer', padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-gray)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Engagements
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--warm-ivory-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FolderKanban size={14} color="var(--ink-black)" />
            </div>
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--ink-black)', lineHeight: 1.1 }}>
            2 Ongoing
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, marginTop: '8px' }}>
            PROJECTS ON TRACK • LIME USA
          </div>
        </div>

        {/* Card 2: Collaboration Invitations */}
        <div
          className="card card-hover"
          onClick={() => navigateTo('creator-requests')}
          style={{ cursor: 'pointer', padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-gray)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Collaboration Invitations
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Inbox size={14} color="#D97706" />
            </div>
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--ink-black)', lineHeight: 1.1 }}>
            3 Pending
          </div>
          <div style={{ fontSize: '0.78rem', color: '#D97706', fontWeight: 600, marginTop: '8px' }}>
            APEX, SOBA & LUMA • Review
          </div>
        </div>

        {/* Card 3: Avg AI Match Score */}
        <div
          className="card card-hover"
          onClick={() => navigateTo('available-campaigns')}
          style={{ cursor: 'pointer', padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-gray)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Avg AI Match Score
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--electric-teal-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={14} color="#008f87" />
            </div>
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--ink-black)', lineHeight: 1.1 }}>
            96%
          </div>
          <div style={{ fontSize: '0.78rem', color: '#008f87', fontWeight: 600, marginTop: '8px' }}>
            TOP-TIER RESONANCE • +4.2% MoM
          </div>
        </div>

        {/* Card 4: Escrow Earnings */}
        <div
          className="card card-hover"
          onClick={() => navigateTo('creator-projects')}
          style={{ cursor: 'pointer', padding: '20px 22px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-gray)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Escrow Earnings
            </span>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={14} color="#059669" />
            </div>
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--ink-black)', lineHeight: 1.1 }}>
            $14,200
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, marginTop: '8px' }}>
            ESCROW SECURED • Next payout in 2d
          </div>
        </div>
      </div>

      {/* Main Two-Column Lower Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)', gap: '28px', alignItems: 'start' }}>
        {/* LEFT COLUMN: Active Engagements & Milestone Tracker + Recommended Campaigns */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Active Engagement Card */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                  Active Engagements & Milestone Tracker
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted-gray)' }}>1 Milestone Pending</span>
              </div>

              <button
                onClick={() => navigateTo('creator-projects')}
                style={{ background: 'none', border: 'none', color: 'var(--electric-teal)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>View All Projects</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Project Box */}
            <div style={{ background: 'var(--warm-ivory-light)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--soft-border)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                      Aether Cosmetics Spring Campaign
                    </h4>
                    <span style={{ fontSize: '0.7rem', background: '#FEF2F2', color: '#DC2626', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                      ACTION REQUIRED
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted-gray)', marginTop: '3px' }}>
                    Client: <strong>Aether Luxury Paris</strong> • Deliverable Batch 02 of 4 • Escrow Locked: <strong>$3,500</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted-gray)', textTransform: 'uppercase', fontWeight: 700 }}>BATCH STATUS</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink-black)' }}>50%</div>
                </div>
              </div>

              {/* Revision Notice Box */}
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '14px', color: '#78350F', fontSize: '0.84rem' }}>
                <div style={{ fontWeight: 800, color: '#B45309', marginBottom: '3px' }}>
                  Revision Requested by Creative Lead:
                </div>
                <p style={{ fontStyle: 'italic', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                  "Warm lighting adjustment on serum reflection highlights to match neutral daylight tone. Diffusion passes uploaded in chat."
                </p>

                <button
                  onClick={() => navigateTo('creator-projects', { projectId: 'proj-101' })}
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '0.78rem' }}
                >
                  <Upload size={14} />
                  <span>Upload Revision v2</span>
                </button>
              </div>

              {/* Sub-bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--muted-gray)', borderTop: '1px solid var(--soft-border)', paddingTop: '10px' }}>
                <span>C2PA Provenance Manifest Attached • Checksum: 0x89abfa...e12b</span>
                <span style={{ color: '#DC2626', fontWeight: 700 }}>Due in 24 hours</span>
              </div>
            </div>
          </div>

          {/* Recommended Campaigns [Smart Match] */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="var(--electric-teal)" />
                  <span>Recommended Campaigns</span>
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted-gray)' }}>Calibrated by AI Portfolio Audit</span>
              </div>

              <button
                onClick={() => navigateTo('available-campaigns')}
                style={{ background: 'none', border: 'none', color: 'var(--electric-teal)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                View All Available
              </button>
            </div>

            {/* Campaign 1 Card */}
            <div style={{ background: 'var(--warm-ivory-light)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--soft-border)', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted-gray)', fontWeight: 600 }}>Nike Vision</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '2px 0 0' }}>
                    Autonomous Runner 2026
                  </h4>
                  <div style={{ marginTop: '4px' }}>
                    <MatchScoreBadge score={98} size="small" />
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontSize: '0.82rem' }}>
                  <div>BUDGET: <strong>$4,500</strong></div>
                  <div>DEADLINE: <strong>Apr 15</strong></div>
                  <div style={{ color: 'var(--muted-gray)' }}>SCOPE: 6 Key Visuals</div>
                </div>
              </div>

              {/* Rationale */}
              <div style={{ background: 'var(--white)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--soft-border)', fontSize: '0.82rem', marginTop: '10px', marginBottom: '12px' }}>
                <strong style={{ color: '#008f87' }}>Why You Match:</strong> Matches your verified ComfyUI photoreal style, athletic commercial portfolio assets, and 48hr SLA turn.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  onClick={() => navigateTo('creator-campaign-detail', { campaignId: 'camp-1' })}
                  className="btn btn-outline btn-sm"
                  style={{ background: 'var(--white)', fontSize: '0.75rem' }}
                >
                  View Brief
                </button>
                <button
                  onClick={() => navigateTo('submit-proposal', { campaignId: 'camp-1' })}
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '0.75rem' }}
                >
                  Submit Proposal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Proposals in Pipeline + Recent Messages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Proposals in Pipeline Widget */}
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                Proposals in Pipeline
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted-gray)' }}>2 Active Proposals</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Proposal 1 */}
              <div style={{ background: 'var(--warm-ivory-light)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.92rem' }}>Cyberpunk Spring Launch</strong>
                  <span style={{ fontSize: '0.7rem', background: '#F3F4F6', color: '#4B5563', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                    IN REVIEW
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted-gray)' }}>
                  Under review by creative director at Studio Neo.
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--muted-gray)' }}>Submitted 2d ago</span>
                  <strong>$3,400 Bid</strong>
                </div>
              </div>

              {/* Proposal 2 */}
              <div style={{ background: 'var(--warm-ivory-light)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.92rem' }}>Luma Cinematic Title Sequence</strong>
                  <span style={{ fontSize: '0.7rem', background: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                    ACCEPTED
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted-gray)' }}>
                  Counteroffer accepted; pending smart contract deposit setup.
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.78rem' }}>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Contract Ready</span>
                  <strong>$5,200 Locked</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Messages Widget */}
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                Recent Messages
              </h3>
              <button
                onClick={() => navigateTo('creator-messages')}
                style={{ background: 'none', border: 'none', color: 'var(--electric-teal)', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}
              >
                Open Inbox
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                onClick={() => navigateTo('creator-messages')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--ink-black)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>
                  AC
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <strong>Apex Creative</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted-gray)' }}>14m ago</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-gray)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    "Please check the lighting notes..."
                  </div>
                </div>
              </div>

              <div
                onClick={() => navigateTo('creator-messages')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--ink-black)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>
                  KS
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <strong>Kura Studio</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted-gray)' }}>2h ago</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-gray)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    "Loved your portfolio samples..."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
