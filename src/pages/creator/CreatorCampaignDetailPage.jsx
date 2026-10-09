import React from 'react';
import { useApp } from '../../context/AppContext';
import { MatchScoreBadge } from '../../components/common/Badge';
import {
  Briefcase,
  Sparkles,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Send,
  MessageSquare,
  Building2,
  FileText
} from 'lucide-react';

export const CreatorCampaignDetailPage = () => {
  const {
    selectedCampaignId,
    campaigns,
    navigateTo,
    setSelectedCampaignId
  } = useApp();

  const campaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];

  return (
    <div className="page-content animate-fade-in" style={{ maxWidth: '980px' }}>
      {/* Back Button */}
      <button
        onClick={() => navigateTo('available-campaigns')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          color: 'var(--muted-gray)',
          fontSize: '0.88rem',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '16px'
        }}
      >
        <ArrowLeft size={16} />
        Back to Available Campaigns
      </button>

      {/* Campaign Main Header Card */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Building2 size={16} color="var(--muted-gray)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', fontWeight: 600 }}>{campaign.brandName}</span>
              <span style={{ color: 'var(--soft-border)' }}>•</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--electric-teal)', fontWeight: 700 }}>{campaign.contentCategory}</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
              {campaign.title}
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigateTo('creator-messages')}
              className="btn btn-outline"
            >
              <MessageSquare size={16} />
              <span>Ask Question</span>
            </button>
            <button
              onClick={() => navigateTo('submit-proposal', { campaignId: campaign.id })}
              className="btn btn-primary"
            >
              <Send size={16} />
              <span>Submit Proposal</span>
            </button>
          </div>
        </div>

        {/* AI Suitability Banner */}
        <div style={{
          background: 'radial-gradient(circle at 10% 20%, #1f2a29 0%, #121212 100%)',
          color: 'var(--white)',
          padding: '20px 24px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '24px',
          border: '1px solid rgba(0, 214, 201, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--electric-teal)', fontWeight: 700, fontSize: '0.88rem' }}>
              <Sparkles size={16} />
              <span>AI Suitability Rationale (98% Match)</span>
            </div>
            <MatchScoreBadge score={98} />
          </div>
          <p style={{ color: '#CCC', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
            Your verified ComfyUI node setups and past commercial fluid simulations for beauty and tech hardware directly align with this brief's technical specs.
          </p>
        </div>

        {/* Objectives */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
            Campaign Objectives & Creative Brief
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--ink-black)', lineHeight: 1.6 }}>
            {campaign.objective}
          </p>
        </div>

        {/* Target Audience & Creative Style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', background: 'var(--warm-ivory-light)', padding: '18px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted-gray)', textTransform: 'uppercase', fontWeight: 700 }}>Target Audience</div>
            <div style={{ fontSize: '0.9rem', marginTop: '2px' }}>{campaign.targetAudience}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted-gray)', textTransform: 'uppercase', fontWeight: 700 }}>Creative Style & Lighting</div>
            <div style={{ fontSize: '0.9rem', marginTop: '2px' }}>{campaign.creativeStyle}</div>
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>
            Agreed Deliverables Package:
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            {campaign.deliverables.map((del, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="var(--electric-teal)" />
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Commercial Rights */}
        <div style={{ borderTop: '1px solid var(--soft-border)', paddingTop: '18px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>
            Commercial Rights & Licensing Scope
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted-gray)' }}>
            {campaign.usageRights}
          </p>
        </div>
      </div>
    </div>
  );
};
