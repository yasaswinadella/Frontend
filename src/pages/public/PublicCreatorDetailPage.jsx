import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Briefcase,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Send,
  Bookmark,
  Share2,
  CheckCircle2,
  Lock,
  Layers,
  FileCode2,
  ArrowLeft,
  DollarSign,
  Award,
  TrendingUp,
  Check
} from 'lucide-react';

export const PublicCreatorDetailPage = () => {
  const {
    selectedCreatorId,
    creators,
    evidenceRecords,
    navigateTo,
    shortlistedCreatorIds,
    toggleShortlist,
    currentRole,
    sendCollaborationRequest,
    campaigns
  } = useApp();

  const creator = creators.find((c) => c.id === selectedCreatorId) || creators[0];
  const isShortlisted = shortlistedCreatorIds.includes(creator.id);
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'experience' | 'portfolio' | 'evidence' | 'pricing'
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);

  // Proposal / Request form state
  const [proposalCampaignId, setProposalCampaignId] = useState(campaigns[0]?.id || '');
  const [proposalTitle, setProposalTitle] = useState(`Campaign Collaboration: ${campaigns[0]?.title || 'AI Visual Campaign'}`);
  const [proposalBudget, setProposalBudget] = useState(creator.startingPrice);
  const [proposalTimeline, setProposalTimeline] = useState('2 Weeks');
  const [proposalMilestones, setProposalMilestones] = useState('Milestone 1 (30%): Concept & Styleframes\nMilestone 2 (40%): 4K Master Renders\nMilestone 3 (30%): Source LoRA & Final C2PA Delivery');
  const [proposalMessage, setProposalMessage] = useState(
    `Hi ${creator.name},\n\nWe love your audited work and verified ${creator.tools[0]} toolchain. We would love to collaborate with you on our upcoming brand campaign.`
  );

  const creatorEvidence = evidenceRecords.filter((e) => e.creatorId === creator.id);

  const handleSendProposal = (e) => {
    e.preventDefault();
    if (currentRole === 'public') {
      navigateTo('auth', { defaultRole: 'brand', defaultTab: 'signin' });
      return;
    }
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
    <div style={{ padding: '32px 24px 80px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Back Button */}
      <button
        onClick={() => navigateTo('directory')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          color: 'var(--muted-gray)',
          fontSize: '0.88rem',
          fontWeight: 700,
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        <ArrowLeft size={16} />
        Back to Creator Directory
      </button>

      {/* Hero Profile Banner */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '32px' }}>
        {/* Cover Photo */}
        <div style={{
          height: '220px',
          backgroundImage: `url(${creator.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '10px'
          }}>
            <button
              onClick={() => toggleShortlist(creator.id)}
              className="btn btn-outline btn-sm"
              style={{ background: 'rgba(18, 18, 18, 0.75)', color: 'var(--white)', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              <Bookmark size={15} fill={isShortlisted ? 'var(--electric-teal)' : 'none'} color={isShortlisted ? 'var(--electric-teal)' : '#FFF'} />
              <span>{isShortlisted ? 'Shortlisted' : 'Save Creator'}</span>
            </button>
          </div>
        </div>

        {/* Profile Info Bar */}
        <div style={{ padding: '0 32px 32px', position: 'relative' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '20px',
            marginTop: '-50px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
              <img
                src={creator.avatar}
                alt={creator.name}
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '20px',
                  objectFit: 'cover',
                  border: '4px solid var(--white)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0 }}>
                    {creator.name}
                  </h1>
                  <span style={{ color: 'var(--muted-gray)', fontSize: '0.95rem' }}>{creator.handle}</span>
                  <EvidenceBadge status={creator.evidenceStatus} />
                </div>
                <div style={{ color: 'var(--muted-gray)', fontSize: '0.94rem', marginTop: '4px', maxWidth: '720px' }}>
                  {creator.headline}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  if (currentRole === 'public') {
                    navigateTo('auth', { defaultRole: 'brand', defaultTab: 'signin' });
                  } else {
                    navigateTo('brand-messages');
                  }
                }}
                className="btn btn-outline"
              >
                <MessageSquare size={16} />
                <span>Message</span>
              </button>
              <button
                onClick={() => setIsCollabModalOpen(true)}
                className="btn btn-primary"
                style={{ fontWeight: 800, padding: '12px 24px' }}
              >
                <Send size={16} />
                <span>Send Proposal / Brief</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '28px',
            paddingTop: '20px',
            borderTop: '1px solid var(--soft-border)',
            fontSize: '0.9rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={18} color="#EAB308" fill="#EAB308" />
              <span><strong>{creator.rating}</strong> ({creator.reviewsCount} verified reviews)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="var(--muted-gray)" />
              <span>{creator.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="var(--muted-gray)" />
              <span style={{ color: '#059669', fontWeight: 700 }}>{creator.availability}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--electric-teal)" />
              <span><strong>{creator.verifiedCount}</strong> Audited C2PA Proofs</span>
            </div>
            <div style={{ marginLeft: 'auto', fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink-black)' }}>
              ${creator.hourlyRate}/hr <span style={{ color: 'var(--muted-gray)', fontWeight: 500, fontSize: '0.85rem' }}>(Starts at ${creator.startingPrice})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Detail Navigation Tabs */}
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
              About the Creator
            </h3>
            <p style={{ fontSize: '0.96rem', color: 'var(--ink-black)', lineHeight: 1.7, margin: 0 }}>
              {creator.bio}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--electric-teal)" />
                Mastered Generative AI Tools
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

            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="var(--electric-teal)" />
                Specialized Disciplines
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

      {/* TAB 2: EXPERIENCE & TRACK RECORD */}
      {activeTab === 'experience' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            <div className="card" style={{ borderLeft: '4px solid #059669' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#059669' }}>
                <TrendingUp size={20} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'inherit' }}>
                  Audited Technical Strengths
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
                <Clock size={20} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'inherit' }}>
                  Production Turnaround & SLAs
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
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} color="var(--electric-teal)" />
              Commercial Experience Highlights
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ padding: '16px', background: 'var(--warm-ivory-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--soft-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>Commercial Campaign Delivery</h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--muted-gray)', fontWeight: 600 }}>{creator.completedJobs} Verified Deliverables</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted-gray)', margin: 0, lineHeight: 1.5 }}>
                  Proven track record producing generative assets, virtual lookbooks, and cinematic spec ads for commercial brands.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                onClick={() => setIsCollabModalOpen(true)}
                className="btn btn-primary"
                style={{ fontWeight: 800 }}
              >
                <Send size={16} />
                <span>Send Proposal / Brief to {creator.name}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PORTFOLIO & WORK */}
      {activeTab === 'portfolio' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px', marginBottom: '32px' }}>
            {creator.portfolio.map((item) => (
              <div
                key={item.id}
                className="card card-hover"
                style={{ cursor: 'pointer', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                onClick={() => setSelectedPortfolioItem(item)}
              >
                <div style={{ height: '230px', position: 'relative', background: '#000' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
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
                    background: 'rgba(0, 214, 201, 0.9)',
                    color: 'var(--ink-black)',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}>
                    {item.evidenceType}
                  </div>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted-gray)', lineHeight: 1.5, marginBottom: '14px', flex: 1 }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {item.tools.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'var(--warm-ivory-light)',
                          border: '1px solid var(--soft-border)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.72rem',
                          fontWeight: 600
                        }}
                      >
                        {t}
                      </span>
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
                    <span>View Case Study & Prompt</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

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
                Collaborate with {creator.name}
              </h3>
              <p style={{ color: '#AAA', fontSize: '0.9rem', margin: '4px 0 0' }}>
                Send a project proposal brief with custom milestones and escrow protection.
              </p>
            </div>
            <button
              onClick={() => setIsCollabModalOpen(true)}
              className="btn btn-primary"
              style={{ fontWeight: 800, padding: '12px 24px' }}
            >
              <Send size={16} />
              <span>Send Proposal / Brief</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: EVIDENCE AUDIT TRAIL */}
      {activeTab === 'evidence' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ background: 'var(--warm-ivory-light)', borderLeft: '4px solid var(--electric-teal)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>
              Audited Provenance Standard v2.4
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted-gray)', lineHeight: 1.5 }}>
              All claims below have undergone verification against cryptographic workflow exports, raw seed metadata, and verified client sign-offs.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {creatorEvidence.map((ev) => (
              <div key={ev.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ maxWidth: '750px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                      {ev.claimTitle}
                    </h4>
                    <EvidenceBadge status={ev.status} size="small" />
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ink-black)', marginBottom: '10px' }}>
                    {ev.claimDescription}
                  </p>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted-gray)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span>Type: <strong>{ev.evidenceType}</strong></span>
                    <span>Audit Date: {ev.submittedDate}</span>
                    {ev.hash && <span style={{ fontFamily: 'monospace' }}>Hash: {ev.hash.slice(0, 18)}...</span>}
                  </div>
                </div>

                {ev.evidenceUrl && (
                  <a
                    href={ev.evidenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ alignSelf: 'flex-start' }}
                  >
                    <span>Inspect Raw Evidence</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PRICING & USAGE TERMS */}
      {activeTab === 'pricing' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
          <div className="card" style={{ border: '2px solid var(--electric-teal)', position: 'relative' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>
              Standard Commercial Campaign
            </h3>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, margin: '14px 0', color: 'var(--ink-black)' }}>
              ${creator.startingPrice} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--muted-gray)' }}>/ deliverable pack</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', marginBottom: '24px', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--electric-teal)" />
                <span>{creator.usageTerms.commercialRights}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--electric-teal)" />
                <span>{creator.usageTerms.modelWeights}</span>
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
              Declared Usage & Licensing Terms
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--muted-gray)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Commercial Rights</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{creator.usageTerms.commercialRights}</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--muted-gray)', fontSize: '0.78rem', textTransform: 'uppercase' }}>Model Weights</div>
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

      {/* Portfolio Lightbox Modal */}
      {selectedPortfolioItem && (
        <Modal
          isOpen={Boolean(selectedPortfolioItem)}
          onClose={() => setSelectedPortfolioItem(null)}
          title={selectedPortfolioItem.title}
          subtitle={`Case Study — ${selectedPortfolioItem.category}`}
          maxWidth="750px"
        >
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '20px', background: '#000' }}>
            <img
              src={selectedPortfolioItem.image}
              alt={selectedPortfolioItem.title}
              style={{ width: '100%', maxHeight: '420px', objectFit: 'contain' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Prompt Strategy & Generation Notes
            </h4>
            <p style={{ fontSize: '0.9rem', fontFamily: 'monospace', background: 'var(--warm-ivory-light)', padding: '12px', borderRadius: 'var(--radius-sm)', color: '#222' }}>
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

      {/* Proposal / Collaboration Request Modal */}
      <Modal
        isOpen={isCollabModalOpen}
        onClose={() => setIsCollabModalOpen(false)}
        title={`Send Campaign Proposal to ${creator.name}`}
        subtitle="Funds will be deposited into CreatorProof Escrow upon creator acceptance."
        maxWidth="640px"
      >
        <form onSubmit={handleSendProposal}>
          <div className="form-group">
            <label className="form-label">Link Campaign Brief</label>
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
              {campaigns.map((camp) => (
                <option key={camp.id} value={camp.id}>
                  {camp.title} (${camp.budget} Budget)
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
              <label className="form-label">Offered Budget ($ USD)</label>
              <input
                type="number"
                className="form-input"
                value={proposalBudget}
                onChange={(e) => setProposalBudget(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Target Timeline</label>
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

export default PublicCreatorDetailPage;
