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
  Camera
} from 'lucide-react';

export const MyCreatorProfilePage = () => {
  const { activeCreatorProfile, updateCreatorProfile, navigateTo } = useApp();
  const [formData, setFormData] = useState({ ...activeCreatorProfile });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCreatorProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="page-content animate-fade-in" style={{ maxWidth: '980px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
            My Creator Profile & Portfolio Settings
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '4px' }}>
            Set your public artist headline, declared usage terms, tool proficiencies, and project pricing.
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

          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...activeCreatorProfile });
                  setIsEditing(false);
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={formData.avatar}
              alt={formData.name}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '18px',
                objectFit: 'cover',
                border: '3px solid var(--electric-teal)'
              }}
            />
            {isEditing && (
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
                background: 'var(--ink-black)',
                color: 'var(--white)',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <Camera size={14} />
              </div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            {isEditing ? (
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Display Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
                  {formData.name}
                </h2>
                <EvidenceBadge status={formData.evidenceStatus} />
              </div>
            )}

            {isEditing ? (
              <div className="form-group" style={{ marginTop: '8px' }}>
                <label className="form-label">Professional Headline</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                />
              </div>
            ) : (
              <p style={{ color: 'var(--muted-gray)', fontSize: '0.92rem', marginTop: '4px' }}>
                {formData.headline}
              </p>
            )}

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--muted-gray)' }}>
                <MapPin size={15} /> {formData.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 600 }}>
                <Clock size={15} /> {formData.availability}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ borderTop: '1px solid var(--soft-border)', paddingTop: '18px' }}>
          <label className="form-label">Artist Bio & Creative Philosophy</label>
          {isEditing ? (
            <textarea
              className="form-textarea"
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          ) : (
            <p style={{ fontSize: '0.92rem', color: 'var(--ink-black)', lineHeight: 1.6 }}>
              {formData.bio}
            </p>
          )}
        </div>
      </div>

      {/* Pricing & Commercial Terms */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px' }}>
          Pricing Packages & Commercial Usage Terms
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div className="form-group">
            <label className="form-label">Hourly Consulting Rate ($/hr)</label>
            {isEditing ? (
              <input
                type="number"
                className="form-input"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
              />
            ) : (
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>${formData.hourlyRate} / hour</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Standard Commercial Pack Starting Price ($)</label>
            {isEditing ? (
              <input
                type="number"
                className="form-input"
                value={formData.startingPrice}
                onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
              />
            ) : (
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>${formData.startingPrice} / pack</div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Declared Commercial Rights</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                value={formData.usageTerms.commercialRights}
                onChange={(e) => setFormData({
                  ...formData,
                  usageTerms: { ...formData.usageTerms, commercialRights: e.target.value }
                })}
              />
            ) : (
              <p style={{ fontSize: '0.9rem' }}>{formData.usageTerms.commercialRights}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Trained Model Weights Delivery</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                value={formData.usageTerms.modelWeights}
                onChange={(e) => setFormData({
                  ...formData,
                  usageTerms: { ...formData.usageTerms, modelWeights: e.target.value }
                })}
              />
            ) : (
              <p style={{ fontSize: '0.9rem' }}>{formData.usageTerms.modelWeights}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
