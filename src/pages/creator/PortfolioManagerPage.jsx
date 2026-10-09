import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  Image,
  PlusCircle,
  Trash2,
  Edit,
  Sparkles,
  ExternalLink,
  Upload,
  CheckCircle2,
  FileCode2,
  Eye
} from 'lucide-react';

export const PortfolioManagerPage = () => {
  const {
    activeCreatorProfile,
    addPortfolioItem,
    deletePortfolioItem,
    navigateTo
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemData, setNewItemData] = useState({
    title: '',
    category: 'Commercial Video & 3D Visuals',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tools: 'Flux.1 Pro, ComfyUI',
    description: '',
    evidenceLink: '',
    evidenceType: 'Audited Workflow Hash',
    promptSummary: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newItemData.title) return;

    addPortfolioItem({
      title: newItemData.title,
      category: newItemData.category,
      image: newItemData.image,
      tools: newItemData.tools.split(',').map((t) => t.trim()),
      description: newItemData.description,
      evidenceLink: newItemData.evidenceLink,
      evidenceType: newItemData.evidenceType,
      promptSummary: newItemData.promptSummary
    });

    setIsAddModalOpen(false);
    setNewItemData({
      title: '',
      category: 'Commercial Video & 3D Visuals',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      tools: 'Flux.1 Pro, ComfyUI',
      description: '',
      evidenceLink: '',
      evidenceType: 'Audited Workflow Hash',
      promptSummary: ''
    });
  };

  return (
    <div className="page-content animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            <Image size={16} color="var(--electric-teal)" />
            <span>Creative Showcase</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
            Portfolio & Case Studies Manager
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '4px' }}>
            Organize showcase renders, link audited generation seeds, and publish case studies for prospective brand clients.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigateTo('public-profile-preview')}
            className="btn btn-outline"
          >
            <Eye size={16} />
            <span>Preview Public View</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary"
          >
            <PlusCircle size={16} />
            <span>Add Portfolio Piece</span>
          </button>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '28px' }}>
        {activeCreatorProfile.portfolio.map((item) => (
          <div key={item.id} className="card card-hover" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '220px', position: 'relative', background: '#000' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
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

            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted-gray)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                {item.category}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-gray)', lineHeight: 1.5, marginBottom: '14px' }}>
                {item.description}
              </p>

              {/* Tools Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                {item.tools.map((t, idx) => (
                  <span key={idx} className="badge badge-teal" style={{ fontSize: '0.7rem' }}>{t}</span>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid var(--soft-border)',
                paddingTop: '14px'
              }}>
                {item.evidenceLink ? (
                  <a
                    href={item.evidenceLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.78rem', color: 'var(--electric-teal)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>Audited Evidence</span>
                    <ExternalLink size={12} />
                  </a>
                ) : <span />}

                <button
                  onClick={() => deletePortfolioItem(item.id)}
                  className="btn btn-ghost btn-sm"
                  style={{ color: '#DC2626' }}
                  title="Delete Item"
                >
                  <Trash2 size={15} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Portfolio Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Portfolio Project"
        subtitle="Attach generation prompts and external audit links for brand verification."
        maxWidth="640px"
      >
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label className="form-label">Project Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Zenith Autonomous Robot Commercial"
              value={newItemData.title}
              onChange={(e) => setNewItemData({ ...newItemData, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={newItemData.category}
                onChange={(e) => setNewItemData({ ...newItemData, category: e.target.value })}
              >
                <option value="Commercial Video & 3D Visuals">Commercial Video & 3D Visuals</option>
                <option value="Audio & Voice Narration">Audio & Voice Narration</option>
                <option value="Virtual Persona & Fashion">Virtual Persona & Fashion</option>
                <option value="Brand & Packaging">Brand & Packaging</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tools Used (comma-separated)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Flux.1 Pro, ComfyUI, Runway Gen-3"
                value={newItemData.tools}
                onChange={(e) => setNewItemData({ ...newItemData, tools: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL / Media Preview Link</label>
            <input
              type="url"
              className="form-input"
              value={newItemData.image}
              onChange={(e) => setNewItemData({ ...newItemData, image: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description & Creative Challenge</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Explain how you handled consistency, lighting, and client goals..."
              value={newItemData.description}
              onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Raw Prompt Summary / Seed Parameter Notes</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. hyper-realistic 8k studio lighting, octane render, cfg 7.5..."
              value={newItemData.promptSummary}
              onChange={(e) => setNewItemData({ ...newItemData, promptSummary: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <PlusCircle size={16} />
              <span>Publish to Portfolio</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
