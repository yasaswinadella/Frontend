import React from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge, MatchScoreBadge } from '../../components/common/Badge';
import {
  Scale,
  Trash2,
  Send,
  Eye,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Star,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ShortlistComparePage = () => {
  const {
    shortlistedCreatorIds,
    creators,
    toggleShortlist,
    navigateTo,
    setSelectedCreatorId
  } = useApp();

  const shortlistedCreators = creators.filter((c) =>
    shortlistedCreatorIds.includes(c.id)
  );

  return (
    <div className="page-content animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            <Scale size={16} color="var(--electric-teal)" />
            <span>Procurement Evaluation Matrix</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
            Shortlist & Side-by-Side Comparison
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '4px' }}>
            Compare verified technical capabilities, pricing tiers, and licensing rights across your saved creators.
          </p>
        </div>

        <button
          onClick={() => navigateTo('explore-creators')}
          className="btn btn-outline"
        >
          <PlusCircle size={16} />
          <span>Add More Creators</span>
        </button>
      </div>

      {shortlistedCreators.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '70px 20px' }}>
          <Scale size={48} color="var(--muted-gray)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>
            Your shortlist is currently empty
          </h3>
          <p style={{ color: 'var(--muted-gray)', maxWidth: '440px', margin: '0 auto 24px', fontSize: '0.92rem' }}>
            Bookmark creators from the Explore Creators directory to compare their verified proofs and pricing side by side.
          </p>
          <button
            onClick={() => navigateTo('explore-creators')}
            className="btn btn-primary"
          >
            <span>Explore Creators Directory</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', paddingBottom: '20px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `220px repeat(${shortlistedCreators.length}, minmax(280px, 1fr))`,
            gap: '16px',
            minWidth: `${220 + shortlistedCreators.length * 300}px`
          }}>
            {/* Column 0: Metric Row Headers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'transparent', border: 'none', boxShadow: 'none' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted-gray)', textTransform: 'uppercase' }}>
                  Creator Candidate
                </span>
              </div>
              <div className="card" style={{ padding: '16px', fontWeight: 700, fontSize: '0.9rem' }}>
                AI Match Score
              </div>
              <div className="card" style={{ padding: '16px', fontWeight: 700, fontSize: '0.9rem' }}>
                Provenance / Evidence
              </div>
              <div className="card" style={{ padding: '16px', fontWeight: 700, fontSize: '0.9rem' }}>
                Starting Project Price
              </div>
              <div className="card" style={{ padding: '16px', fontWeight: 700, fontSize: '0.9rem' }}>
                Hourly Rate
              </div>
              <div className="card" style={{ padding: '16px', fontWeight: 700, fontSize: '0.9rem' }}>
                Mastered AI Tools
              </div>
              <div className="card" style={{ padding: '16px', fontWeight: 700, fontSize: '0.9rem' }}>
                Commercial Rights
              </div>
              <div className="card" style={{ padding: '16px', fontWeight: 700, fontSize: '0.9rem' }}>
                Model Checkpoint LoRAs
              </div>
              <div className="card" style={{ padding: '16px', fontWeight: 700, fontSize: '0.9rem' }}>
                Availability Status
              </div>
              <div className="card" style={{ padding: '16px', fontWeight: 700, fontSize: '0.9rem' }}>
                Key Match Strength
              </div>
              <div className="card" style={{ padding: '16px', fontWeight: 700, fontSize: '0.9rem' }}>
                Identified Gap / Risk
              </div>
            </div>

            {/* Columns 1..N: Shortlisted Creators */}
            {shortlistedCreators.map((creator) => (
              <div key={creator.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Header Card */}
                <div className="card" style={{ height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', border: '2px solid var(--electric-teal)' }}
                      />
                      <button
                        onClick={() => toggleShortlist(creator.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: '#DC2626', padding: '4px' }}
                        title="Remove from Shortlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                      {creator.name}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted-gray)', marginTop: '2px' }}>
                      {creator.specialization}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => navigateTo('brand-creator-detail', { creatorId: creator.id })}
                      className="btn btn-outline btn-sm"
                      style={{ flex: 1 }}
                    >
                      <Eye size={14} />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => navigateTo('brand-creator-detail', { creatorId: creator.id })}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <Send size={14} />
                      <span>Invite</span>
                    </button>
                  </div>
                </div>

                {/* Match Score */}
                <div className="card" style={{ padding: '16px' }}>
                  <MatchScoreBadge score={creator.matchScore} />
                </div>

                {/* Evidence Status */}
                <div className="card" style={{ padding: '16px' }}>
                  <EvidenceBadge status={creator.evidenceStatus} />
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-gray)', marginTop: '4px' }}>
                    {creator.verifiedCount} verified cryptographic proofs
                  </div>
                </div>

                {/* Starting Price */}
                <div className="card" style={{ padding: '16px', fontSize: '1.15rem', fontWeight: 800 }}>
                  ${creator.startingPrice} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--muted-gray)' }}>/ pack</span>
                </div>

                {/* Hourly Rate */}
                <div className="card" style={{ padding: '16px', fontWeight: 700 }}>
                  ${creator.hourlyRate} / hr
                </div>

                {/* Tools */}
                <div className="card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {creator.tools.slice(0, 3).map((t, i) => (
                      <span key={i} className="badge badge-teal" style={{ fontSize: '0.68rem' }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Commercial Rights */}
                <div className="card" style={{ padding: '16px', fontSize: '0.85rem' }}>
                  {creator.usageTerms.commercialRights}
                </div>

                {/* LoRA Checkpoints */}
                <div className="card" style={{ padding: '16px', fontSize: '0.85rem' }}>
                  {creator.usageTerms.modelWeights}
                </div>

                {/* Availability */}
                <div className="card" style={{ padding: '16px', fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
                  {creator.availability}
                </div>

                {/* Match Strength */}
                <div className="card" style={{ padding: '16px', fontSize: '0.82rem', color: '#059669', lineHeight: 1.4 }}>
                  ✓ {creator.matchStrengths[0]}
                </div>

                {/* Identified Gap */}
                <div className="card" style={{ padding: '16px', fontSize: '0.82rem', color: '#D97706', lineHeight: 1.4 }}>
                  ! {creator.matchGaps ? creator.matchGaps[0] : 'None noted'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
