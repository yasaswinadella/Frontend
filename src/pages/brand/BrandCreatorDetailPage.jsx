import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge, MatchScoreBadge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Send,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ArrowLeft,
  Briefcase,
  Layers,
  FileCode2,
  Calendar,
  Award,
  DollarSign,
  TrendingUp,
  Sliders,
  Check
} from 'lucide-react';

export const BrandCreatorDetailPage = () => {
  const {
    selectedCreatorId,
    creators,
    evidenceRecords,
    campaigns,
    navigateTo,
    shortlistedCreatorIds,
    toggleShortlist,
    sendCollaborationRequest
  } = useApp();

  const creator = creators.find((c) => c.id === selectedCreatorId) || creators[0];
  const isShortlisted = shortlistedCreatorIds.includes(creator.id);
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'experience' | 'portfolio' | 'evidence' | 'pricing'
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);

  // Proposal form state
  const [proposalCampaignId, setProposalCampaignId] = useState(campaigns[0]?.id || '');
  const [proposalTitle, setProposalTitle] = useState(`Campaign Collaboration: ${campaigns[0]?.title || 'Custom Campaign'}`);
  const [proposalBudget, setProposalBudget] = useState(creator.startingPrice);
  const [proposalTimeline, setProposalTimeline] = useState('2 Weeks');
  const [proposalMilestones, setProposalMilestones] = useState('Milestone 1 (30%): Concept & Styleframes\nMilestone 2 (40%): 4K Master Renders\nMilestone 3 (30%): Source LoRA & Final C2PA Delivery');
  const [proposalMessage, setProposalMessage] = useState(
    `Hi ${creator.name},\n\nWe were impressed by your audited portfolio and verified ${creator.tools[0]} workflows. We would love to invite you to collaborate on our active campaign with escrow-protected milestones.`
  );

  const creatorEvidence = evidenceRecords.filter((e) => e.creatorId === creator.id);

  const handleSendProposal = (e) => {
    e.preventDefault();
    sendCollaborationRequest({
      campaignId: proposalCampaignId,
      creatorId: creator.id,
      budget: Number(proposalBudget),
      deadline: proposalTimeline,
      message: `${proposalTitle}\n\n${proposalMessage}\n\nMilestones:\n${proposalMilestones}`
    });
    setIsCollabModalOpen(false);
  };

  return (
    <div className="page-content animate-fade-in">
      {/* Back Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => navigateTo('explore-creators')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: 'var(--muted-gray)',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} />
          Back to Explore Creators
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => toggleShortlist(creator.id)}
            className="btn btn-outline btn-sm"
          >
            <Bookmark size={15} fill={isShortlisted ? 'var(--electric-teal)' : 'none'} color={isShortlisted ? 'var(--electric-teal)' : 'currentColor'} />
            <span>{isShortlisted ? 'Shortlisted' : 'Save Creator'}</span>
          </button>
          <button
            onClick={() => setIsCollabModalOpen(true)}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: 800 }}
          >
            <Send size={15} />
            <span>Send Proposal / Brief</span>
          </button>
        </div>
      </div>

      {/* Creator Header Profile Card */}
      <div className="card" style={{ marginBottom: '28px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
            <img
              src={creator.avatar}
              alt={creator.name}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '20px',
                objectFit: 'cover',
                border: '3px solid var(--electric-teal)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.1)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0 }}>
                  {creator.name}
                </h1>
                <span style={{ color: 'var(--muted-gray)', fontSize: '0.95rem' }}>{creator.handle}</span>
                <EvidenceBadge status={creator.evidenceStatus} />
                <MatchScoreBadge score={creator.matchScore} />
              </div>
              <p style={{ color: 'var(--muted-gray)', fontSize: '0.94rem', marginTop: '6px', maxWidth: '780px', lineHeight: 1.5 }}>
                {creator.headline}
              </p>
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', marginTop: '12px', fontSize: '0.86rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#EAB308', fontWeight: 700 }}>
                  ★ {creator.rating} ({creator.reviewsCount} reviews)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--muted-gray)' }}>
                  <MapPin size={15} /> {creator.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontWeight: 700 }}>
                  <Clock size={15} /> {creator.availability}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--ink-black)', fontWeight: 600 }}>
                  <Briefcase size={15} /> {creator.completedJobs} Completed Campaigns
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '220px' }}>
            <button
              onClick={() => setIsCollabModalOpen(true)}
              className="btn btn-primary"
              style={{ padding: '12px 20px', fontSize: '0.95rem', fontWeight: 800, justifyContent: 'center' }}
            >
              <Send size={16} />
              <span>Send Proposal / Brief</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          background: 'var(--warm-ivory-light)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--soft-border)'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted-gray)', fontWeight: 700, textTransform: 'uppercase' }}>Hourly Rate</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink-black)' }}>${creator.hourlyRate} / hr</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted-gray)', fontWeight: 700, textTransform: 'uppercase' }}>Deliverable Pack</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink-black)' }}>Starts at ${creator.startingPrice}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted-gray)', fontWeight: 700, textTransform: 'uppercase' }}>Audited Provenance</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--electric-teal)' }}>{creator.verifiedCount} C2PA Proofs</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted-gray)', fontWeight: 700, textTransform: 'uppercase' }}>Campaign Match</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>{creator.matchScore}% Compatibility</div>
          </div>
        </div>
      </div>

      {/* Main Detail Navigation Tabs */}
      <div className="tab-list">
        <button
          className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <Sparkles size={15} style={{ display: 'inline', marginRight: '6px' }} />
          About Creator & Skills
        </button>
        <button
          className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          <Briefcase size={15} style={{ display: 'inline', marginRight: '6px' }} />
          Experience & Track Record
        </button>
        <button
          className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          <Layers size={15} style={{ display: 'inline', marginRight: '6px' }} />
          Portfolio & Work ({creator.portfolio.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'evidence' ? 'active' : ''}`}
          onClick={() => setActiveTab('evidence')}
        >
          <ShieldCheck size={15} style={{ display: 'inline', marginRight: '6px' }} />
          Audited Provenance ({creatorEvidence.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setActiveTab('pricing')}
        >
          <DollarSign size={15} style={{ display: 'inline', marginRight: '6px' }} />
          Pricing & Licensing Terms
        </button>
      </div>

      {/* TAB 1: ABOUT CREATOR & SKILLS */}
      {activeTab === 'about' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '14px' }}>
              Creative Bio & Approach
            </h3>
            <p style={{ fontSize: '0.96rem', color: 'var(--ink-black)', lineHeight: 1.7, margin: 0 }}>
              {creator.bio}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {/* Mastered AI Toolchain */}
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--electric-teal)" />
                Mastered AI Toolchains
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {creator.tools.map((tool, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--warm-ivory-light)',
                      border: '1px solid var(--soft-border)',
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <CheckCircle2 size={14} color="var(--electric-teal)" />
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Specialized Disciplines */}
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="var(--electric-teal)" />
                Core Disciplines & Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {creator.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'var(--ink-black)',
                      color: 'var(--white)',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.84rem',
                      fontWeight: 700
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THEIR EXPERIENCE & TRACK RECORD */}
      {activeTab === 'experience' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Key Strengths & Commercial Proven Track Record */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            <div className="card" style={{ borderLeft: '4px solid #059669' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#059669' }}>
                <TrendingUp size={20} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'inherit' }}>
                  Audited Technical Strengths ({creator.matchScore}% Match)
                </h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0, margin: 0 }}>
                {creator.matchStrengths.map((strength, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <Check size={13} />
                    </div>
                    <span style={{ color: 'var(--ink-black)', lineHeight: 1.5 }}>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card" style={{ borderLeft: '4px solid #D97706' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#D97706' }}>
                <AlertTriangle size={20} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'inherit' }}>
                  Identified Gaps & SLA Turnaround Considerations
                </h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0, margin: 0 }}>
                {creator.matchGaps?.map((gap, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      !
                    </div>
                    <span style={{ color: 'var(--ink-black)', lineHeight: 1.5 }}>{gap}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '18px', background: '#FFFBEB', padding: '12px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.84rem', color: '#92400E' }}>
                <strong>Procurement Tip:</strong> Include a 3-5 business day review buffer when submitting your proposal milestones.
              </div>
            </div>
          </div>

          {/* Past Commercial Milestones */}
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} color="var(--electric-teal)" />
              Commercial Brand Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ padding: '16px', background: 'var(--warm-ivory-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--soft-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>Global Brand Commercials & Spec Releases</h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--muted-gray)', fontWeight: 600 }}>52 Completed Deliverables</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted-gray)', margin: 0, lineHeight: 1.5 }}>
                  Delivered multi-scene visual assets, commercial fashion lookbooks, and high-coherence product videos across major consumer brand categories.
                </p>
              </div>

              <div style={{ padding: '16px', background: 'var(--warm-ivory-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--soft-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>Cryptographic Audit Provenance</h4>
                  <span style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 700 }}>100% C2PA Verified</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted-gray)', margin: 0, lineHeight: 1.5 }}>
                  All delivered generative assets include verified node graphs, parameter hashes, and license certificates for enterprise IP safety.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                onClick={() => setIsCollabModalOpen(true)}
                className="btn btn-primary"
              >
                <Send size={16} />
                <span>Send Proposal to {creator.name}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PORTFOLIO & WORK */}
      {activeTab === 'portfolio' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {creator.portfolio.map((item) => (
              <div
                key={item.id}
                className="card card-hover"
                style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                onClick={() => setSelectedPortfolioItem(item)}
              >
                <div style={{ position: 'relative', height: '230px', background: '#121212' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'var(--electric-teal)',
                    color: 'var(--ink-black)',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: 800
                  }}>
                    {item.category}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(18,18,18,0.85)',
                    color: 'var(--white)',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}>
                    {item.evidenceType}
                  </div>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted-gray)', marginBottom: '14px', lineHeight: 1.5, flex: 1 }}>
                    {item.description}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {item.tools.map((t, idx) => (
                      <span key={idx} className="badge badge-teal" style={{ fontSize: '0.72rem' }}>{t}</span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPortfolioItem(item);
                    }}
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Inspect Prompt & Node Recipe</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Proposal Banner at bottom of portfolio */}
          <div style={{
            background: 'var(--ink-black)',
            color: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--white)' }}>
                Like {creator.name}'s portfolio style?
              </h3>
              <p style={{ color: '#AAA', fontSize: '0.9rem', margin: '4px 0 0' }}>
                Submit a campaign brief proposal and secure your project milestones in escrow.
              </p>
            </div>
            <button
              onClick={() => setIsCollabModalOpen(true)}
              className="btn btn-primary"
              style={{ fontWeight: 800, padding: '12px 24px' }}
            >
              <Send size={16} />
              <span>Send Project Proposal</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: AUDITED PROVENANCE EVIDENCE */}
      {activeTab === 'evidence' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {creatorEvidence.map((ev) => (
            <div key={ev.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ maxWidth: '750px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{ev.claimTitle}</h4>
                  <EvidenceBadge status={ev.status} size="small" />
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-black)', marginBottom: '8px', lineHeight: 1.5 }}>
                  {ev.claimDescription}
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted-gray)' }}>
                  Audit Hash: <span style={{ fontFamily: 'monospace', color: 'var(--ink-black)' }}>{ev.hash || 'Verified by C2PA standard'}</span>
                </div>
              </div>

              {ev.evidenceUrl && (
                <a href={ev.evidenceUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                  <span>Verify Link</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: PRICING & LICENSING TERMS */}
      {activeTab === 'pricing' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          <div className="card" style={{ border: '2px solid var(--electric-teal)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
              Standard Deliverable Package
            </h3>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, margin: '12px 0', color: 'var(--ink-black)' }}>
              ${creator.startingPrice} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--muted-gray)' }}>/ deliverable pack</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '24px', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--electric-teal)" />
                <span>Full commercial usage rights included</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--electric-teal)" />
                <span>Source LoRA & ComfyUI workflow delivered</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--electric-teal)" />
                <span>2 Free revision rounds included</span>
              </li>
            </ul>
            <button
              onClick={() => setIsCollabModalOpen(true)}
              className="btn btn-primary"
              style={{ width: '100%', fontWeight: 800 }}
            >
              <Send size={16} />
              <span>Send Campaign Proposal</span>
            </button>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>
              Declared Licensing & Usage Terms
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--muted-gray)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Commercial Rights</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{creator.usageTerms.commercialRights}</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--muted-gray)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Model Weights & Checkpoints</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{creator.usageTerms.modelWeights}</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--muted-gray)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Attribution</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{creator.usageTerms.attribution}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Portfolio Item Modal */}
      {selectedPortfolioItem && (
        <Modal
          isOpen={Boolean(selectedPortfolioItem)}
          onClose={() => setSelectedPortfolioItem(null)}
          title={selectedPortfolioItem.title}
          subtitle={`Case Study — ${selectedPortfolioItem.category}`}
          maxWidth="720px"
        >
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '20px', background: '#000' }}>
            <img
              src={selectedPortfolioItem.image}
              alt={selectedPortfolioItem.title}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Generation Prompt & Workflow Seed
            </h4>
            <p style={{ fontSize: '0.88rem', fontFamily: 'monospace', background: 'var(--warm-ivory-light)', padding: '12px', borderRadius: 'var(--radius-sm)', color: 'var(--ink-black)', lineHeight: 1.5 }}>
              "{selectedPortfolioItem.promptSummary}"
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--soft-border)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {selectedPortfolioItem.tools.map((t, idx) => (
                <span key={idx} className="badge badge-teal">{t}</span>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedPortfolioItem(null);
                setIsCollabModalOpen(true);
              }}
              className="btn btn-primary btn-sm"
              style={{ fontWeight: 800 }}
            >
              <Send size={14} />
              <span>Send Proposal Based on this Work</span>
            </button>
          </div>
        </Modal>
      )}

      {/* Comprehensive Proposal Modal */}
      <Modal
        isOpen={isCollabModalOpen}
        onClose={() => setIsCollabModalOpen(false)}
        title={`Send Campaign Proposal to ${creator.name}`}
        subtitle="Funds will be securely locked in CreatorProof Escrow until you approve deliverables."
        maxWidth="650px"
      >
        <form onSubmit={handleSendProposal}>
          <div className="form-group">
            <label className="form-label">Link Active Campaign Brief</label>
            <select
              className="form-select"
              value={proposalCampaignId}
              onChange={(e) => {
                setProposalCampaignId(e.target.value);
                const camp = campaigns.find(c => c.id === e.target.value);
                if (camp) {
                  setProposalTitle(`Campaign Collaboration: ${camp.title}`);
                  setProposalBudget(camp.budget);
                }
              }}
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} (${c.budget})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Proposal Title</label>
            <input
              type="text"
              className="form-input"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Offered Escrow Budget ($ USD)</label>
              <input
                type="number"
                className="form-input"
                value={proposalBudget}
                onChange={(e) => setProposalBudget(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Target Delivery Timeline</label>
              <input
                type="text"
                className="form-input"
                value={proposalTimeline}
                onChange={(e) => setProposalTimeline(e.target.value)}
                placeholder="e.g. 2 Weeks"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Proposed Milestone Breakdown</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={proposalMilestones}
              onChange={(e) => setProposalMilestones(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Invitation Message & Project Scope</label>
            <textarea
              className="form-textarea"
              rows={4}
              value={proposalMessage}
              onChange={(e) => setProposalMessage(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => setIsCollabModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ fontWeight: 800 }}>
              <Send size={16} />
              <span>Submit & Send Proposal</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BrandCreatorDetailPage;
