import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  Sparkles,
  PlusCircle,
  Save,
  Eye,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';

export const CreateCampaignPage = () => {
  const { addCampaign, navigateTo } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    objective: '',
    targetAudience: '',
    contentCategory: 'Commercial Video & 3D Visuals',
    creativeStyle: 'Hyper-realistic, Clean Studio Lighting',
    requiredTools: ['Flux.1 Pro', 'ComfyUI'],
    requiredSkills: 'Temporal Coherence, Fluid Simulation, 4K Upscaling',
    deliverables: '1x 30s Master Commercial Video (16:9), 3x 15s UGC Social Variants (9:16), 4x 8K Static Product Renders',
    budget: 4500,
    timeline: '3 Weeks',
    deadline: '2026-11-30',
    usageRights: 'Full Global Commercial Buyout, Trained Brand LoRA Weights Included',
    referenceNotes: 'Need photorealistic water droplet physics and clean corporate teal branding.'
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const categories = [
    'Commercial Video & 3D Visuals',
    'Audio & Voice Narration',
    'Virtual Influencers & Characters',
    'Social Video & UGC Ads',
    'Packaging & Brand Identity',
    'Interactive 3D Worlds & Environments'
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Campaign title is required';
    if (!formData.objective.trim()) errors.objective = 'Objective is required';
    if (!formData.deliverables.trim()) errors.deliverables = 'Deliverables are required';
    if (!formData.budget || formData.budget <= 0) errors.budget = 'Please enter a valid budget';
    if (!formData.deadline) errors.deadline = 'Deadline is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const campaignId = addCampaign({
      ...formData,
      requiredSkills: formData.requiredSkills.split(',').map((s) => s.trim()),
      deliverables: formData.deliverables.split(',').map((d) => d.trim()),
      status: 'Active'
    });

    navigateTo('my-campaigns');
  };

  const handleSaveDraft = () => {
    if (!formData.title.trim()) {
      setValidationErrors({ title: 'Please provide at least a title to save a draft.' });
      return;
    }

    addCampaign({
      ...formData,
      requiredSkills: formData.requiredSkills.split(',').map((s) => s.trim()),
      deliverables: formData.deliverables.split(',').map((d) => d.trim()),
      status: 'Draft'
    });

    navigateTo('my-campaigns');
  };

  return (
    <div className="page-content animate-fade-in" style={{ maxWidth: '980px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <button
          onClick={() => navigateTo('my-campaigns')}
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
          Back to My Campaigns
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>
              Create Campaign / Edit Brief
            </h1>
            <p style={{ color: 'var(--muted-gray)', fontSize: '0.95rem', marginTop: '4px' }}>
              Publish your creative requirements to receive verified creator proposals and explainable AI matches.
            </p>
          </div>

          <button
            onClick={() => navigateTo('ai-brief-builder')}
            className="btn btn-outline btn-sm"
          >
            <Sparkles size={14} color="var(--electric-teal)" />
            <span>Generate with AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Main Campaign Form */}
      <form onSubmit={handlePublish}>
        {/* Section 1: Core Details */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--electric-teal)" />
            <span>1. Campaign Overview & Objectives</span>
          </h2>

          <div className="form-group">
            <label className="form-label">Campaign Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. HydraPulse AI Smart Bottle 4K Video Commercial Suite"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (validationErrors.title) setValidationErrors({ ...validationErrors, title: null });
              }}
            />
            {validationErrors.title && (
              <span style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', display: 'block' }}>
                {validationErrors.title}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Primary Objective & Creative Vision *</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Describe the main goal, story, visual look, and message of this campaign..."
              value={formData.objective}
              onChange={(e) => {
                setFormData({ ...formData, objective: e.target.value });
                if (validationErrors.objective) setValidationErrors({ ...validationErrors, objective: null });
              }}
            />
            {validationErrors.objective && (
              <span style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', display: 'block' }}>
                {validationErrors.objective}
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Content Category</label>
              <select
                className="form-select"
                value={formData.contentCategory}
                onChange={(e) => setFormData({ ...formData, contentCategory: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Audience Demographic</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Gen-Z tech enthusiasts, athletes aged 20-35"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Technical Specifications & Tools */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--electric-teal)" />
            <span>2. Technical Toolchain & Creative Style</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Creative Aesthetic Style</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Hyper-realistic, Dystopian Neon, Macro Lighting"
                value={formData.creativeStyle}
                onChange={(e) => setFormData({ ...formData, creativeStyle: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Required Skills & Capabilities</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Fluid Simulation, LoRA Fine-Tuning, Lip Sync"
                value={formData.requiredSkills}
                onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Specific AI Software Preferred</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '6px' }}>
              {['Flux.1 Pro', 'ComfyUI', 'Runway Gen-3', 'Midjourney v6.1', 'ElevenLabs', 'Spline 3D', 'Kling AI'].map((tool) => {
                const isSelected = formData.requiredTools.includes(tool);
                return (
                  <button
                    type="button"
                    key={tool}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        requiredTools: isSelected
                          ? formData.requiredTools.filter((t) => t !== tool)
                          : [...formData.requiredTools, tool]
                      });
                    }}
                    style={{
                      background: isSelected ? 'var(--ink-black)' : 'var(--warm-ivory-light)',
                      color: isSelected ? 'var(--white)' : 'var(--ink-black)',
                      border: '1px solid var(--soft-border)',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {tool} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Deliverables, Budget & Usage Terms */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={18} color="var(--electric-teal)" />
            <span>3. Deliverables, Escrow Budget & Rights</span>
          </h2>

          <div className="form-group">
            <label className="form-label">Required Deliverables (Comma-separated) *</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="e.g. 1x Master 4K Video (16:9), 3x Vertical UGC variants (9:16), Raw prompt archive"
              value={formData.deliverables}
              onChange={(e) => {
                setFormData({ ...formData, deliverables: e.target.value });
                if (validationErrors.deliverables) setValidationErrors({ ...validationErrors, deliverables: null });
              }}
            />
            {validationErrors.deliverables && (
              <span style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', display: 'block' }}>
                {validationErrors.deliverables}
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Total Escrow Budget (USD) *</label>
              <input
                type="number"
                className="form-input"
                placeholder="4500"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Project Timeline</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 3 Weeks"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Final Deadline *</label>
              <input
                type="date"
                className="form-input"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Commercial Rights & Model Weights Delivery</label>
            <input
              type="text"
              className="form-input"
              value={formData.usageRights}
              onChange={(e) => setFormData({ ...formData, usageRights: e.target.value })}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <button
            type="button"
            onClick={() => navigateTo('my-campaigns')}
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
              <span>Preview Brief</span>
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="btn btn-dark"
            >
              <Save size={16} />
              <span>Save Draft</span>
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              <span>Publish Campaign Live</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={formData.title || 'Campaign Brief Preview'}
        subtitle={`Budget: $${formData.budget} • Deadline: ${formData.deadline}`}
        maxWidth="700px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4 style={{ fontSize: '0.82rem', color: 'var(--muted-gray)', textTransform: 'uppercase' }}>Objective</h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--ink-black)', marginTop: '4px' }}>{formData.objective || 'No objective set.'}</p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.82rem', color: 'var(--muted-gray)', textTransform: 'uppercase' }}>Deliverables</h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--ink-black)', marginTop: '4px' }}>{formData.deliverables}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--warm-ivory-light)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted-gray)' }}>Required Tools:</span>
              <div style={{ fontWeight: 700, marginTop: '2px' }}>{formData.requiredTools.join(', ')}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted-gray)' }}>Usage Rights:</span>
              <div style={{ fontWeight: 700, marginTop: '2px' }}>{formData.usageRights}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="btn btn-primary btn-sm"
            >
              Done Previewing
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
