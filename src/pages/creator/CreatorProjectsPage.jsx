import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  FolderKanban,
  CheckCircle2,
  AlertCircle,
  Upload,
  Sparkles,
  Layers,
  FileText,
  DollarSign,
  Calendar,
  RotateCcw
} from 'lucide-react';

export const CreatorProjectsPage = () => {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    uploadDeliverableVersion,
    activeCreatorProfile,
    navigateTo
  } = useApp();

  const myProjects = projects.filter((p) => p.creatorId === activeCreatorProfile.id);
  const activeProject = myProjects.find((p) => p.id === selectedProjectId) || myProjects[0] || projects[0];

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(activeProject.milestones[1]?.id || activeProject.milestones[0]?.id);
  const [versionTitle, setVersionTitle] = useState('Master 4K Video Cut (Milestone 2)');
  const [versionNotes, setVersionNotes] = useState('Color timing calibrated to Pantone teal, improved fluid reflections.');
  const [previewImageUrl, setPreviewImageUrl] = useState('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80');

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    uploadDeliverableVersion(activeProject.id, selectedMilestoneId, {
      title: versionTitle,
      notes: versionNotes,
      fileName: 'HydraPulse_MasterCut_4K_v1.mp4',
      previewImage: previewImageUrl
    });
    setIsUploadModalOpen(false);
  };

  return (
    <div className="page-content animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            <FolderKanban size={16} color="var(--electric-teal)" />
            <span>Production Engagements</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
            Active Engagements & Project Delivery
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '4px' }}>
            Upload deliverable versions, track client feedback revisions, and unlock milestone escrow payouts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="btn btn-primary"
          >
            <Upload size={16} />
            <span>Submit New Version / Assets</span>
          </button>
        </div>
      </div>

      {/* Project Status Summary Card */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
                {activeProject.title}
              </h2>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)', background: '#ECFDF5', color: '#059669', border: '1px solid currentColor' }}>
                {activeProject.status}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', marginTop: '4px' }}>
              Client: <strong>{activeProject.brandName}</strong> • Target Deadline: <strong>{activeProject.targetDeadline}</strong>
            </div>
          </div>
        </div>

        {/* Milestone Financial Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', background: 'var(--warm-ivory-light)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-gray)', textTransform: 'uppercase' }}>Total Project Value</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>${activeProject.budgetTotal}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-gray)', textTransform: 'uppercase' }}>Available Payout Released</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#059669' }}>${activeProject.escrowReleased}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-gray)', textTransform: 'uppercase' }}>Remaining Escrow Balance</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2563EB' }}>${activeProject.budgetTotal - activeProject.escrowReleased}</div>
          </div>
        </div>
      </div>

      {/* Two Columns: Milestones Tracker & Version Archives */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
        {/* Left: Milestones & Task Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
            Milestone Checklist & Tasks
          </h3>

          {activeProject.milestones.map((m) => (
            <div
              key={m.id}
              className="card"
              style={{
                borderLeft: m.status === 'Approved' ? '4px solid #059669' : m.status === 'Submitted' ? '4px solid #2563EB' : '1px solid var(--soft-border)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{m.title}</h4>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: m.status === 'Approved' ? '#ECFDF5' : '#EFF6FF', color: m.status === 'Approved' ? '#059669' : '#2563EB' }}>
                  {m.status}
                </span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', marginBottom: '10px' }}>
                Payout: <strong>${m.payout}</strong> • Due: {m.dueDate}
              </div>

              {m.feedback && (
                <div style={{ background: 'var(--warm-ivory-light)', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: '#333', marginBottom: '10px' }}>
                  <strong>Client Note:</strong> {m.feedback}
                </div>
              )}

              {m.status !== 'Approved' && (
                <button
                  onClick={() => {
                    setSelectedMilestoneId(m.id);
                    setIsUploadModalOpen(true);
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%', marginTop: '6px' }}
                >
                  <Upload size={14} />
                  <span>Submit Work for Milestone</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Right: Submitted Version History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
            Delivered Versions & Uploads
          </h3>

          {activeProject.deliverableVersions.map((ver, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 800, background: 'var(--ink-black)', color: 'var(--white)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem' }}>
                  {ver.version}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted-gray)' }}>{ver.uploadedAt}</span>
              </div>

              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '6px' }}>{ver.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', marginBottom: '12px' }}>{ver.notes}</p>

              {ver.previewImage && (
                <div style={{ height: '160px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: '#000' }}>
                  <img src={ver.previewImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Deliverable Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Submit Deliverable Package"
        subtitle="Upload your high-res render package and prompt seed archive."
        maxWidth="560px"
      >
        <form onSubmit={handleUploadSubmit}>
          <div className="form-group">
            <label className="form-label">Deliverable Package Title</label>
            <input
              type="text"
              className="form-input"
              value={versionTitle}
              onChange={(e) => setVersionTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Version Notes & Parameter Audit Summary</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={versionNotes}
              onChange={(e) => setVersionNotes(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Preview Image URL / Render Snapshot</label>
            <input
              type="url"
              className="form-input"
              value={previewImageUrl}
              onChange={(e) => setPreviewImageUrl(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Upload size={16} />
              <span>Submit for Brand Review</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
