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
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Calendar,
  Layers,
  FileText,
  Send,
  Building2,
  Video
} from 'lucide-react';

export const CreateCampaignPage = () => {
  const { addCampaign, navigateTo, brandProfile, addToast } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    brandName: brandProfile?.name || 'Aura Luxe Jewels',
    description: '',
    objective: '',
    contentType: 'Commercial Video',
    creativeStyle: 'High-End Luxury, Macro Product Refraction, Hyper-realistic 8K',
    format: '4K ProRes / MP4 Master',
    aspectRatio: '9:16 (Instagram Reels/Stories) + 16:9 (Master 4K)',
    duration: '30 Seconds',
    requiredTools: ['Flux.1 Pro', 'ComfyUI', 'Runway Gen-3'],
    budget: 4800,
    deadline: '2026-11-28',
    deliverables: '1x 30s Master 4K Video Ad, 2x 10s Social Cuts, 5x 8K Static Hero Stills, Trained Brand LoRA archive',
    revisionRequirements: '2 rounds of minor color grading and pacing iterations included',
    licensingRights: 'Full Global Commercial Buyout, Perpetual Digital & Broadcast Rights'
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const contentTypes = [
    'Commercial Video',
    '3D Animation',
    'Product Visuals',
    'AI Film & VFX',
    'AI Fashion Lookbook',
    'Character Design & Avatar',
    'Audio & Voice Narration'
  ];

  const aspectRatios = [
    '9:16 (Instagram Reels, TikTok, YouTube Shorts)',
    '16:9 (Widescreen Master 4K, YouTube, TV)',
    '1:1 (Square Feed & Product Listing)',
    '4:5 (Instagram Portrait Feed)',
    'Multi-format Bundle (16:9 + 9:16 + 1:1)'
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Campaign title is required';
    if (!formData.brandName.trim()) errors.brandName = 'Brand / Business name is required';
    if (!formData.description.trim()) errors.description = 'Campaign description is required';
    if (!formData.objective.trim()) errors.objective = 'Objective is required';
    if (!formData.deliverables.trim()) errors.deliverables = 'Deliverables are required';
    if (!formData.budget || Number(formData.budget) <= 0) errors.budget = 'Please enter a valid budget';
    if (!formData.deadline) errors.deadline = 'Deadline is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    addCampaign({
      title: formData.title,
      brandName: formData.brandName,
      objective: formData.objective,
      description: formData.description,
      contentCategory: formData.contentType,
      creativeStyle: formData.creativeStyle,
      format: formData.format,
      aspectRatio: formData.aspectRatio,
      duration: formData.duration,
      requiredTools: formData.requiredTools,
      requiredSkills: ['Macro Lighting', 'Temporal Coherence', 'Color Grading'],
      deliverables: formData.deliverables.split(',').map((d) => d.trim()),
      budget: Number(formData.budget),
      deadline: formData.deadline,
      timeline: '3 Weeks',
      usageRights: formData.licensingRights,
      revisionRequirements: formData.revisionRequirements,
      status: 'Active'
    });

    addToast({
      title: 'Brief Published!',
      message: 'Your brief is now open for creator proposals.',
      type: 'success'
    });

    navigateTo('my-campaigns');
  };

  const handleSaveDraft = () => {
    if (!formData.title.trim()) {
      setValidationErrors({ title: 'Please provide at least a title to save draft.' });
      return;
    }

    addCampaign({
      title: formData.title,
      brandName: formData.brandName,
      objective: formData.objective,
      description: formData.description,
      contentCategory: formData.contentType,
      creativeStyle: formData.creativeStyle,
      format: formData.format,
      aspectRatio: formData.aspectRatio,
      duration: formData.duration,
      requiredTools: formData.requiredTools,
      requiredSkills: ['Macro Lighting', 'Temporal Coherence'],
      deliverables: formData.deliverables.split(',').map((d) => d.trim()),
      budget: Number(formData.budget) || 2500,
      deadline: formData.deadline || '2026-12-01',
      timeline: '3 Weeks',
      usageRights: formData.licensingRights,
      revisionRequirements: formData.revisionRequirements,
      status: 'Draft'
    });

    addToast({
      title: 'Draft Saved',
      message: 'Brief saved to Drafts.',
      type: 'info'
    });

    navigateTo('my-campaigns');
  };

  return (
    <div className="page-content animate-fade-in" style={{ maxWidth: '980px' }}>
      {/* Back Navigation Bar */}
      <div style={{ marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => navigateTo('my-campaigns')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to My Briefs</span>
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Create Creative Brief
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
              Define technical deliverables, aspect ratios, creative direction, and escrow budget.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('ai-brief-builder')}
            className="btn btn-outline btn-sm"
            style={{ borderColor: '#C7D2FE', color: 'var(--primary)' }}
          >
            <Sparkles size={14} color="var(--primary)" />
            <span>Use AI Brief Builder</span>
          </button>
        </div>
      </div>

      {/* Main Campaign Form */}
      <form onSubmit={handlePublish}>
        {/* Section 1: Overview & Brand */}
        <div className="card" style={{ marginBottom: '24px', backgroundColor: '#FFFFFF' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '18px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} color="var(--primary)" />
            <span>1. Campaign Overview & Objectives</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Campaign Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Aura Luxe 30s Instagram Jewellery Commercial"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {validationErrors.title && (
                <div style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>{validationErrors.title}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Business / Brand Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Aura Luxe Fine Jewellery"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              />
              {validationErrors.brandName && (
                <div style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>{validationErrors.brandName}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Campaign Description & Requirements *</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Describe the campaign background, key visual elements, and expected outcome..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {validationErrors.description && (
              <div style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>{validationErrors.description}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Campaign Objective *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Launch new luxury collection, drive high CTR on Instagram Reels"
              value={formData.objective}
              onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
            />
            {validationErrors.objective && (
              <div style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>{validationErrors.objective}</div>
            )}
          </div>
        </div>

        {/* Section 2: Creative & Technical Format */}
        <div className="card" style={{ marginBottom: '24px', backgroundColor: '#FFFFFF' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '18px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Video size={18} color="#7C3AED" />
            <span>2. Format, Aspect Ratio & Technical Specs</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Content Type</label>
              <select
                className="form-select"
                value={formData.contentType}
                onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
              >
                {contentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Aspect Ratio</label>
              <select
                className="form-select"
                value={formData.aspectRatio}
                onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value })}
              >
                {aspectRatios.map((ratio) => (
                  <option key={ratio} value={ratio}>{ratio}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Duration</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 30 Seconds (+ 2x 10s cutdowns)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Preferred Creative Style</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Photorealistic, Moody Golden Hour, Octane Render"
                value={formData.creativeStyle}
                onChange={(e) => setFormData({ ...formData, creativeStyle: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Required / Preferred AI Tools (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Flux.1 Pro, ComfyUI, Runway Gen-3, Midjourney"
                value={formData.requiredTools.join(', ')}
                onChange={(e) => setFormData({ ...formData, requiredTools: e.target.value.split(',').map(t => t.trim()) })}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Deliverables, Budget, Rights */}
        <div className="card" style={{ marginBottom: '32px', backgroundColor: '#FFFFFF' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '18px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={18} color="#059669" />
            <span>3. Deliverables, Escrow Budget & Commercial Rights</span>
          </h2>

          <div className="form-group">
            <label className="form-label">Deliverables Checklist *</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="e.g. 1x 30s Master 4K Video Ad, 2x 10s Social Cuts, 5x 8K Static Hero Stills, Trained Brand LoRA"
              value={formData.deliverables}
              onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
            />
            {validationErrors.deliverables && (
              <div style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>{validationErrors.deliverables}</div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Escrow Budget ($ USD) *</label>
              <input
                type="number"
                className="form-input"
                placeholder="4800"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
              {validationErrors.budget && (
                <div style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>{validationErrors.budget}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Target Deadline *</label>
              <input
                type="date"
                className="form-input"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
              {validationErrors.deadline && (
                <div style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>{validationErrors.deadline}</div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Revision Requirements</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 2 rounds of minor adjustments included"
                value={formData.revisionRequirements}
                onChange={(e) => setFormData({ ...formData, revisionRequirements: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Licensing & Commercial-Use Rights</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Full Commercial Global Buyout, Perpetual Digital & Meta Broadcast"
                value={formData.licensingRights}
                onChange={(e) => setFormData({ ...formData, licensingRights: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="btn btn-outline"
          >
            <Save size={16} />
            <span>Save as Draft</span>
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '1rem', fontWeight: 700 }}
          >
            <Send size={16} />
            <span>Publish Creative Brief</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaignPage;
