import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge } from '../../components/common/Badge';
import {
  User,
  Sparkles,
  Save,
  Eye,
  CheckCircle2,
  DollarSign,
  Layers,
  MapPin,
  Clock,
  ShieldCheck,
  Camera,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  Lock,
  Edit3
} from 'lucide-react';

export const MyCreatorProfilePage = () => {
  const { activeCreatorProfile, updateCreatorProfile, navigateTo, addToast } = useApp();
  const [formData, setFormData] = useState({
    name: activeCreatorProfile.name || 'Sophia Chan',
    headline: activeCreatorProfile.headline || 'AI Filmmaker & Visual Artist | Photorealistic Product & Motion Specialist',
    bio: activeCreatorProfile.bio || 'Pioneering generative art director with 6+ years in high-end commercial VFX and luxury branding.',
    location: activeCreatorProfile.location || 'San Francisco, CA, USA',
    email: activeCreatorProfile.email || 'sophia.chan@creatorproof.ai',
    specialization: activeCreatorProfile.specialization || 'Luxury Product Renders & Hyper-real Commercials',
    experienceYears: '6+ Years',
    avatar: activeCreatorProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    startingPrice: activeCreatorProfile.startingPrice || 1800,
    hourlyRate: activeCreatorProfile.hourlyRate || 145,
    availability: activeCreatorProfile.availability || 'Available (2 spots for Q4)',
    tools: activeCreatorProfile.tools ? activeCreatorProfile.tools.join(', ') : 'Flux.1 Pro, ComfyUI, Midjourney v6.1, Runway Gen-3',
    skills: activeCreatorProfile.skills ? activeCreatorProfile.skills.join(', ') : 'Prompt Engineering, Custom LoRA Training, Temporal Coherence, Color Grading',
    previousWork: 'Velora Paris Eau De Parfum, Sephora Autumn Campaign, L’Oreal Digital Lab',
    awards: 'Best Visual Direction - AI Short Film Fest 2025, RunPod Certified Node Engineer',
    education: 'BFA in Digital Arts & VFX - ArtCenter College of Design',
    completedJobs: activeCreatorProfile.completedJobs || 52,
    earnings: '$84,500',
    showEarningsPublic: false
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCreatorProfile({
      ...formData,
      tools: typeof formData.tools === 'string' ? formData.tools.split(',').map((t) => t.trim()) : formData.tools,
      skills: typeof formData.skills === 'string' ? formData.skills.split(',').map((s) => s.trim()) : formData.skills,
      startingPrice: Number(formData.startingPrice),
      hourlyRate: Number(formData.hourlyRate)
    });

    addToast({
      title: 'Profile Updated!',
      message: 'Your creator profile changes have been saved successfully.',
      type: 'success'
    });

    setIsEditing(false);
  };

  return (
    <div className="page-content animate-fade-in" style={{ maxWidth: '1020px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#7C3AED', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            <User size={15} />
            <span>Creator Profile Builder</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            My Professional Profile & Rates
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
            Edit your professional headline, bio, declared tools, pricing, and verification credentials.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => navigateTo('public-profile-preview')}
            className="btn btn-outline"
          >
            <Eye size={16} />
            <span>Preview Public View</span>
          </button>

          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
                style={{ backgroundColor: '#7C3AED', borderColor: '#7C3AED' }}
              >
                <Save size={16} />
                <span>Save Profile</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
              style={{ backgroundColor: '#7C3AED', borderColor: '#7C3AED' }}
            >
              <Edit3 size={16} />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile Card Header */}
        <div className="card" style={{ marginBottom: '24px', padding: '28px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={formData.avatar}
                alt={formData.name}
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #7C3AED',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: '280px' }}>
              {isEditing ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Contact Email</label>
                    <input
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      {formData.name}
                    </h2>
                    <EvidenceBadge status="verified" />
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {formData.email}
                  </div>
                </div>
              )}

              {isEditing ? (
                <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
                  <label className="form-label">Professional Title / Headline</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  />
                </div>
              ) : (
                <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '8px' }}>
                  {formData.headline}
                </div>
              )}
            </div>
          </div>

          {/* About / Bio */}
          <div className="form-group">
            <label className="form-label">About / Professional Bio</label>
            {isEditing ? (
              <textarea
                className="form-textarea"
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            ) : (
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {formData.bio}
              </p>
            )}
          </div>
        </div>

        {/* Technical Specialization & Tools */}
        <div className="card" style={{ marginBottom: '24px', padding: '28px', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '18px', color: 'var(--text-primary)' }}>
            Specialization, AI Tools & Skills
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Primary Specialization</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-input"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                />
              ) : (
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {formData.specialization}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Years of Experience</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-input"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                />
              ) : (
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {formData.experienceYears}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">AI Tools & Models (Comma-separated)</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                value={formData.tools}
                onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
              />
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(typeof formData.tools === 'string' ? formData.tools.split(',') : formData.tools).map((t, idx) => (
                  <span key={idx} className="badge badge-indigo">
                    {t.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Creative & Technical Skills (Comma-separated)</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(typeof formData.skills === 'string' ? formData.skills.split(',') : formData.skills).map((s, idx) => (
                  <span key={idx} className="badge badge-gray">
                    {s.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pricing, Availability, & Track Record */}
        <div className="card" style={{ marginBottom: '32px', padding: '28px', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '18px', color: 'var(--text-primary)' }}>
            Pricing, Rates & Previous Work
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '18px' }}>
            <div className="form-group">
              <label className="form-label">Starting Project Rate ($ USD)</label>
              {isEditing ? (
                <input
                  type="number"
                  className="form-input"
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                />
              ) : (
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>
                  ${formData.startingPrice}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Hourly Rate ($ USD)</label>
              {isEditing ? (
                <input
                  type="number"
                  className="form-input"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                />
              ) : (
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  ${formData.hourlyRate}/hr
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Current Availability</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-input"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                />
              ) : (
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {formData.availability}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Previous Work & Clients</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-input"
                  value={formData.previousWork}
                  onChange={(e) => setFormData({ ...formData, previousWork: e.target.value })}
                />
              ) : (
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {formData.previousWork}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Awards & Achievements</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-input"
                  value={formData.awards}
                  onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                />
              ) : (
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {formData.awards}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyCreatorProfilePage;
