import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  FolderKanban,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Eye,
  Sparkles,
  Layers,
  Clock,
  DollarSign,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const BrandProjectsPage = () => {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    approveMilestone,
    requestProjectRevision,
    navigateTo
  } = useApp();

  const activeProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  const [revisionMilestoneId, setRevisionMilestoneId] = useState(null);
  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [previewVersion, setPreviewVersion] = useState(null);

  const handleApprove = (milestoneId) => {
    approveMilestone(activeProject.id, milestoneId);
  };

  const handleSendRevision = (e) => {
    e.preventDefault();
    if (!revisionMilestoneId) return;
    requestProjectRevision(activeProject.id, revisionMilestoneId, revisionFeedback);
    setRevisionMilestoneId(null);
    setRevisionFeedback('');
  };

  return (
    <div className="page-content animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            <FolderKanban size={16} color="var(--electric-teal)" />
            <span>Escrow Project Workspace</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
            Projects & Deliverables Management
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '4px' }}>
            Inspect submitted generation assets, track milestone completion, request revisions, and release escrow payouts.
          </p>
        </div>

        {/* Project Selector */}
        <div style={{ minWidth: '240px' }}>
          <select
            className="form-select"
            value={activeProject.id}
            onChange={(e) => setSelectedProjectId(e.target.value)}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Overview Card */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                {activeProject.title}
              </h2>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                background:
                  activeProject.status === 'Completed' ? '#ECFDF5' :
                  activeProject.status === 'Submitted' ? '#EFF6FF' :
                  activeProject.status === 'Revision Requested' ? '#FFFBEB' : 'var(--warm-ivory-light)',
                color:
                  activeProject.status === 'Completed' ? '#059669' :
                  activeProject.status === 'Submitted' ? '#2563EB' :
                  activeProject.status === 'Revision Requested' ? '#D97706' : 'var(--ink-black)',
                border: '1px solid currentColor'
              }}>
                {activeProject.status}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', marginTop: '4px' }}>
              Creator: <strong>{activeProject.creatorName}</strong> • Target Deadline: <strong>{activeProject.targetDeadline}</strong>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
            <span>Milestone Progress</span>
            <span>{activeProject.progressPercent}% Completed</span>
          </div>
          <div style={{ height: '8px', background: 'var(--warm-ivory-light)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${activeProject.progressPercent}%`, background: 'var(--electric-teal)', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Escrow Financial Tracker */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', background: 'var(--warm-ivory-light)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-gray)', textTransform: 'uppercase' }}>Total Escrow Locked</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>${activeProject.budgetTotal}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-gray)', textTransform: 'uppercase' }}>Released Payouts</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#059669' }}>${activeProject.escrowReleased}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-gray)', textTransform: 'uppercase' }}>Pending Escrow Balance</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2563EB' }}>${activeProject.budgetTotal - activeProject.escrowReleased}</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Milestones Checklist & Submitted Version Files */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
        {/* Left: Milestones & Approval Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
            Milestones & Deliverable Approvals
          </h3>

          {activeProject.milestones.map((m, idx) => (
            <div
              key={m.id}
              className="card"
              style={{
                borderLeft: m.status === 'Approved' ? '4px solid #059669' : m.status === 'Submitted' ? '4px solid #2563EB' : '1px solid var(--soft-border)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
                  {m.title}
                </h4>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: m.status === 'Approved' ? '#ECFDF5' : '#EFF6FF', color: m.status === 'Approved' ? '#059669' : '#2563EB' }}>
                  {m.status}
                </span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', marginBottom: '12px' }}>
                Payout: <strong>${m.payout}</strong> • Due: {m.dueDate}
              </div>

              {/* Feedback notes */}
              {m.feedback && (
                <div style={{ background: 'var(--warm-ivory-light)', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', marginBottom: '14px', color: '#333' }}>
                  <strong>Status Notes:</strong> {m.feedback}
                </div>
              )}

              {/* Deliverable File list */}
              {m.deliverableFiles.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted-gray)', fontWeight: 600 }}>Attached Package:</span>
                  {m.deliverableFiles.map((f, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--warm-ivory)', padding: '6px 10px', borderRadius: '4px', marginTop: '4px', fontSize: '0.82rem' }}>
                      <span>📄 {f.name} ({f.size})</span>
                      <a href="#" style={{ color: 'var(--electric-teal)', fontWeight: 600 }}>Download</a>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              {m.status === 'Submitted' && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                  <button
                    onClick={() => {
                      setRevisionMilestoneId(m.id);
                    }}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                  >
                    <RotateCcw size={14} />
                    <span>Request Changes</span>
                  </button>
                  <button
                    onClick={() => handleApprove(m.id)}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <CheckCircle2 size={14} />
                    <span>Approve & Release ${m.payout}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Deliverable Version History & Preview Inspector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
            Deliverable Version History
          </h3>

          {activeProject.deliverableVersions.map((ver, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 800, background: 'var(--ink-black)', color: 'var(--white)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                    {ver.version}
                  </span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{ver.title}</h4>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted-gray)' }}>{ver.uploadedAt}</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', marginBottom: '14px' }}>
                {ver.notes}
              </p>

              {ver.previewImage && (
                <div
                  style={{ height: '180px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '12px', cursor: 'pointer', background: '#000' }}
                  onClick={() => setPreviewVersion(ver)}
                >
                  <img src={ver.previewImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  onClick={() => setPreviewVersion(ver)}
                  className="btn btn-outline btn-sm"
                >
                  <Eye size={14} />
                  <span>Inspect Render</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revision Request Modal */}
      <Modal
        isOpen={Boolean(revisionMilestoneId)}
        onClose={() => setRevisionMilestoneId(null)}
        title="Request Deliverable Revision"
        subtitle="Specify required color timing, prompt adjustments, or rendering fixes."
        maxWidth="500px"
      >
        <form onSubmit={handleSendRevision}>
          <div className="form-group">
            <label className="form-label">Detailed Revision Feedback</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="e.g. Please adjust the lighting intensity in shot #3 and ensure the logo is centered..."
              value={revisionFeedback}
              onChange={(e) => setRevisionFeedback(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setRevisionMilestoneId(null)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Send Revision Request
            </button>
          </div>
        </form>
      </Modal>

      {/* Version Preview Modal */}
      {previewVersion && (
        <Modal
          isOpen={Boolean(previewVersion)}
          onClose={() => setPreviewVersion(null)}
          title={`${previewVersion.title} (${previewVersion.version})`}
          subtitle={`Uploaded on ${previewVersion.uploadedAt}`}
          maxWidth="700px"
        >
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '16px', background: '#000' }}>
            <img src={previewVersion.previewImage} alt="Preview" style={{ width: '100%', maxHeight: '420px', objectFit: 'contain' }} />
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-black)' }}>{previewVersion.notes}</p>
        </Modal>
      )}
    </div>
  );
};
