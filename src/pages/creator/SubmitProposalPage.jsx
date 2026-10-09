import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  FileSpreadsheet,
  Send,
  Save,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Calendar,
  Layers
} from 'lucide-react';

export const SubmitProposalPage = () => {
  const {
    campaigns,
    selectedCampaignId,
    activeCreatorProfile,
    submitProposal,
    navigateTo
  } = useApp();

  const [targetCampaignId, setTargetCampaignId] = useState(
    selectedCampaignId || campaigns[0]?.id || ''
  );

  const selectedCamp = campaigns.find((c) => c.id === targetCampaignId) || campaigns[0];

  const [proposedBudget, setProposedBudget] = useState(selectedCamp.budget || 4500);
  const [timeline, setTimeline] = useState('2.5 Weeks');
  const [pitch, setPitch] = useState(
    `We can direct the master 4K video suite using our custom ComfyUI temporal coherence node setup and Flux.1 Pro LoRAs. We will deliver 2 preliminary moodboard styleframes within 48 hours and package raw generation seeds upon milestone approval.`
  );
  const [selectedPortfolioIds, setSelectedPortfolioIds] = useState(
    activeCreatorProfile.portfolio.map((p) => p.id)
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitProposal({
      campaignId: targetCampaignId,
      pitch,
      proposedBudget,
      timeline,
      portfolioItems: selectedPortfolioIds
    });
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="page-content animate-fade-in" style={{ maxWidth: '980px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
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
          Back to Campaigns
        </button>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>
          Submit Campaign Proposal & Pitch
        </h1>
        <p style={{ color: 'var(--muted-gray)', fontSize: '0.95rem', marginTop: '4px' }}>
          Pitch your creative vision, custom LoRA training approach, proposed milestones, and delivery timeline.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Campaign Selection Box */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <label className="form-label" style={{ fontWeight: 700 }}>Select Open Campaign Brief</label>
          <select
            className="form-select"
            value={targetCampaignId}
            onChange={(e) => {
              setTargetCampaignId(e.target.value);
              const camp = campaigns.find((c) => c.id === e.target.value);
              if (camp) setProposedBudget(camp.budget);
            }}
          >
            {campaigns.filter((c) => c.status === 'Active').map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} • {c.brandName} (${c.budget})
              </option>
            ))}
          </select>
        </div>

        {/* Pitch Approach */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>
            Creative & Technical Approach
          </h3>

          <div className="form-group">
            <label className="form-label">Cover Pitch & Toolchain Strategy</label>
            <textarea
              className="form-textarea"
              rows={5}
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              placeholder="Explain how you will achieve photorealism, temporal consistency, and brand guidelines..."
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Proposed Total Project Price ($ USD)</label>
              <input
                type="number"
                className="form-input"
                value={proposedBudget}
                onChange={(e) => setProposedBudget(Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Turnaround Timeline</label>
              <input
                type="text"
                className="form-input"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Relevant Portfolio Attachments */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>
            Attach Audited Portfolio Evidence Pieces
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {activeCreatorProfile.portfolio.map((item) => {
              const isSelected = selectedPortfolioIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedPortfolioIds((prev) =>
                      isSelected ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                    );
                  }}
                  style={{
                    border: `2px solid ${isSelected ? 'var(--electric-teal)' : 'var(--soft-border)'}`,
                    background: isSelected ? 'var(--electric-teal-subtle)' : 'var(--white)',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <img src={item.image} alt={item.title} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-gray)' }}>{item.evidenceType}</div>
                  </div>
                  {isSelected && <CheckCircle2 size={18} color="var(--electric-teal)" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => navigateTo('available-campaigns')}
            className="btn btn-outline"
          >
            Cancel
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="btn btn-outline"
            >
              <Eye size={16} />
              <span>Preview Proposal</span>
            </button>

            <button type="submit" className="btn btn-primary">
              <Send size={16} />
              <span>Submit Proposal to Brand</span>
            </button>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Proposal Preview"
        subtitle={`To: ${selectedCamp.brandName} • Campaign: ${selectedCamp.title}`}
        maxWidth="650px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4 style={{ fontSize: '0.8rem', color: 'var(--muted-gray)', textTransform: 'uppercase' }}>Proposed Scope & Pitch</h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--ink-black)', marginTop: '4px' }}>{pitch}</p>
          </div>
          <div style={{ background: 'var(--warm-ivory-light)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <div>Proposed Budget: <strong>${proposedBudget}</strong></div>
            <div>Turnaround: <strong>{timeline}</strong></div>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigateTo('creator-requests');
        }}
        title="Proposal Submitted Successfully! 🎉"
        subtitle="The brand has been notified and can accept, counteroffer, or message you."
        maxWidth="500px"
      >
        <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
          <CheckCircle2 size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: '0.92rem', color: 'var(--muted-gray)', lineHeight: 1.5, marginBottom: '24px' }}>
            Your proposal is now under brand review. You can track status and response updates in your Collaboration Requests tab.
          </p>
          <button
            onClick={() => {
              setIsSuccessModalOpen(false);
              navigateTo('creator-requests');
            }}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Go to Collaboration Requests
          </button>
        </div>
      </Modal>
    </div>
  );
};
