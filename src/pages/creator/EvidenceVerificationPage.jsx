import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  ShieldCheck,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  ExternalLink,
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

export const EvidenceVerificationPage = () => {
  const {
    evidenceRecords,
    activeCreatorProfile,
    submitEvidence
  } = useApp();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [claimTitle, setClaimTitle] = useState('');
  const [claimCategory, setClaimCategory] = useState('Tool Mastery');
  const [claimDescription, setClaimDescription] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [evidenceType, setEvidenceType] = useState('GitHub Node Graph & Workflow JSON');

  const myEvidence = evidenceRecords.filter(
    (e) => e.creatorId === activeCreatorProfile.id
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claimTitle) return;

    submitEvidence({
      claimTitle,
      category: claimCategory,
      claimDescription,
      evidenceUrl,
      evidenceType
    });

    setIsSubmitModalOpen(false);
    setClaimTitle('');
    setClaimDescription('');
    setEvidenceUrl('');
  };

  return (
    <div className="page-content animate-fade-in" style={{ maxWidth: '1080px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            <ShieldCheck size={16} color="var(--electric-teal)" />
            <span>Audit & Verification Portal</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
            Evidence & Verification Claims
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '4px' }}>
            Submit cryptographic proof of workflow authorship, node graphs, raw generation seeds, and client sign-offs.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="btn btn-primary"
        >
          <PlusCircle size={16} />
          <span>Submit New Evidence</span>
        </button>
      </div>

      {/* Verification Level Explainer Banner */}
      <div className="card" style={{
        background: 'radial-gradient(circle at 10% 20%, #1f2a29 0%, #121212 100%)',
        color: 'var(--white)',
        padding: '24px 28px',
        marginBottom: '28px',
        border: '1px solid rgba(0, 214, 201, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--electric-teal)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '8px' }}>
          <ShieldCheck size={18} />
          <span>Audit Provenance Hierarchy</span>
        </div>
        <p style={{ color: '#CCC', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '16px' }}>
          CreatorProof AI maintains strict integrity standards. Uploading files enters an <strong>Under Review</strong> state; claims are only marked <strong>Verified</strong> after cryptographic hash validation and peer auditor confirmation.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.82rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ color: '#059669', fontWeight: 800 }}>● Verified Claim</span>: Confirmed via commit hash or client NDA sign-off.
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ color: '#0284C7', fontWeight: 800 }}>● Evidence-Linked</span>: Direct platform export provided (Runway/Spline).
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ color: '#7C3AED', fontWeight: 800 }}>● Under Review</span>: Automated QA inspection in progress.
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ color: '#D97706', fontWeight: 800 }}>● Self-Reported</span>: Artist claim without independent proof.
          </div>
        </div>
      </div>

      {/* Claims List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {myEvidence.map((ev) => (
          <div
            key={ev.id}
            className="card"
            style={{
              padding: '24px',
              borderLeft:
                ev.status === 'verified' ? '4px solid #059669' :
                ev.status === 'evidence-linked' ? '4px solid #0284C7' :
                ev.status === 'under-review' ? '4px solid #7C3AED' : '4px solid #D97706'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                    {ev.claimTitle}
                  </h3>
                  <EvidenceBadge status={ev.status} size="small" />
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted-gray)' }}>
                  Category: <strong>{ev.category}</strong> • Submitted: {ev.submittedDate}
                </div>
              </div>

              {ev.evidenceUrl && (
                <a
                  href={ev.evidenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  <ExternalLink size={14} />
                  <span>Inspect Proof</span>
                </a>
              )}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--ink-black)', lineHeight: 1.5, marginBottom: '14px' }}>
              {ev.claimDescription}
            </p>

            <div style={{ background: 'var(--warm-ivory-light)', padding: '12px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: '#333' }}>
              <div>
                <strong>Evidence Type:</strong> {ev.evidenceType}
              </div>
              {ev.hash && (
                <div style={{ marginTop: '2px', fontFamily: 'monospace', color: '#555' }}>
                  Cryptographic Hash: {ev.hash}
                </div>
              )}
              <div style={{ marginTop: '4px', color: '#008f87', fontWeight: 600 }}>
                Verifier Notes: {ev.verifierNotes}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Evidence Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit New Evidence Claim"
        subtitle="Provide auditable proof for your generative workflows, node setups, or client deliveries."
        maxWidth="600px"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Claim / Capability Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. ComfyUI Fluid Simulation Node Workflow (8K)"
              value={claimTitle}
              onChange={(e) => setClaimTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={claimCategory}
                onChange={(e) => setClaimCategory(e.target.value)}
              >
                <option value="Tool Mastery">Tool Mastery</option>
                <option value="Client Work">Client Work</option>
                <option value="Output Quality">Output Quality</option>
                <option value="Service Level SLA">Service Level SLA</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Evidence Type</label>
              <select
                className="form-select"
                value={evidenceType}
                onChange={(e) => setEvidenceType(e.target.value)}
              >
                <option value="GitHub Node Graph & Workflow JSON">GitHub Node Graph & Workflow JSON</option>
                <option value="Platform Direct Export (Runway/Spline)">Platform Direct Export (Runway/Spline)</option>
                <option value="Signed Commercial Release / Figma">Signed Commercial Release / Figma</option>
                <option value="Model LoRA Checkpoint Hash">Model LoRA Checkpoint Hash</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Claim Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Explain the workflow architecture and how temporal coherence or photorealism is maintained..."
              value={claimDescription}
              onChange={(e) => setClaimDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Evidence Verification URL / Repository Link</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://github.com/..."
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <ShieldCheck size={16} />
              <span>Submit for Audit</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
