import React from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge } from '../../components/common/Badge';
import {
  ArrowLeft,
  Eye,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Send,
  Lock
} from 'lucide-react';

export const PublicProfilePreviewPage = () => {
  const { activeCreatorProfile, evidenceRecords, navigateTo } = useApp();

  const creatorEvidence = evidenceRecords.filter(
    (e) => e.creatorId === activeCreatorProfile.id
  );

  return (
    <div className="page-content animate-fade-in" style={{ maxWidth: '1180px' }}>
      {/* Preview Notification Banner */}
      <div style={{
        background: 'var(--ink-black)',
        color: 'var(--white)',
        padding: '12px 20px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid rgba(0, 214, 201, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
          <Eye size={16} color="var(--electric-teal)" />
          <span><strong>Public Profile Live Preview:</strong> This is exactly how verified brands see your portfolio and evidence.</span>
        </div>

        <button
          onClick={() => navigateTo('creator-profile')}
          className="btn btn-primary btn-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to Profile Editor</span>
        </button>
      </div>

      {/* Hero Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '28px' }}>
        <div style={{ height: '200px', backgroundImage: `url(${activeCreatorProfile.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

        <div style={{ padding: '0 32px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginTop: '-45px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
              <img
                src={activeCreatorProfile.avatar}
                alt={activeCreatorProfile.name}
                style={{ width: '96px', height: '96px', borderRadius: '18px', objectFit: 'cover', border: '4px solid var(--white)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
                    {activeCreatorProfile.name}
                  </h1>
                  <EvidenceBadge status={activeCreatorProfile.evidenceStatus} />
                </div>
                <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '2px' }}>
                  {activeCreatorProfile.headline}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-primary btn-sm">
                <Send size={14} />
                <span>Request Collaboration</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--soft-border)', fontSize: '0.88rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EAB308', fontWeight: 700 }}>
              ★ {activeCreatorProfile.rating} ({activeCreatorProfile.reviewsCount} reviews)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--muted-gray)' }}>
              <MapPin size={15} /> {activeCreatorProfile.location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 600 }}>
              <Clock size={15} /> {activeCreatorProfile.availability}
            </span>
            <div style={{ marginLeft: 'auto', fontWeight: 800 }}>
              ${activeCreatorProfile.hourlyRate}/hr • Starts at ${activeCreatorProfile.startingPrice}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px' }}>
          Showcase Portfolio ({activeCreatorProfile.portfolio.length})
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {activeCreatorProfile.portfolio.map((item) => (
            <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '18px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted-gray)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {item.category}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '4px 0 8px' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', marginBottom: '12px' }}>{item.description}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {item.tools.map((t, i) => (
                    <span key={i} className="badge badge-teal" style={{ fontSize: '0.7rem' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audited Evidence Summary */}
      <div className="card">
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px' }}>
          Audited Cryptographic Provenance ({creatorEvidence.length})
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {creatorEvidence.map((ev) => (
            <div key={ev.id} style={{ background: 'var(--warm-ivory-light)', padding: '14px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{ev.claimTitle}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted-gray)' }}>{ev.evidenceType}</div>
              </div>
              <EvidenceBadge status={ev.status} size="small" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
