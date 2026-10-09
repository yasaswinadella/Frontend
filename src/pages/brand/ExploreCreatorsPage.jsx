import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge, MatchScoreBadge } from '../../components/common/Badge';
import {
  Search,
  Sparkles,
  Filter,
  Bookmark,
  Scale,
  Send,
  Eye,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal
} from 'lucide-react';

export const ExploreCreatorsPage = () => {
  const {
    creators,
    campaigns,
    navigateTo,
    shortlistedCreatorIds,
    toggleShortlist,
    sendCollaborationRequest
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTool, setSelectedTool] = useState('All');
  const [selectedEvidence, setSelectedEvidence] = useState('All');
  const [activeCampaignFilter, setActiveCampaignFilter] = useState(campaigns[0]?.id || 'camp-1');

  const toolsList = ['All', 'Flux.1 Pro', 'ComfyUI', 'Midjourney v6.1', 'Runway Gen-3', 'ElevenLabs', 'Spline 3D', 'Kling AI'];

  const filteredCreators = useMemo(() => {
    return creators.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.tools.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTool = selectedTool === 'All' || c.tools.includes(selectedTool);
      const matchesEvidence = selectedEvidence === 'All' || c.evidenceStatus === selectedEvidence;

      return matchesSearch && matchesTool && matchesEvidence;
    });
  }, [creators, searchTerm, selectedTool, selectedEvidence]);

  return (
    <div className="page-content animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            <Sparkles size={16} color="var(--electric-teal)" />
            <span>Semantic Talent Discovery</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
            Explore & Match Creators
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '4px' }}>
            Inspect AI match affinity, audited evidence credentials, strengths, and risk gaps for your active campaigns.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigateTo('shortlist-compare')}
            className="btn btn-outline"
          >
            <Scale size={16} />
            <span>Compare Shortlist ({shortlistedCreatorIds.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Matching Context Filter */}
      <div className="card" style={{ padding: '20px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
          {/* Active campaign context selector */}
          <div style={{ flex: '1 1 280px' }}>
            <label className="form-label" style={{ fontSize: '0.78rem', textTransform: 'uppercase' }}>
              Match Against Campaign:
            </label>
            <select
              className="form-select"
              value={activeCampaignFilter}
              onChange={(e) => setActiveCampaignFilter(e.target.value)}
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} (${c.budget})
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div style={{ flex: '2 1 320px', position: 'relative' }}>
            <label className="form-label" style={{ fontSize: '0.78rem', textTransform: 'uppercase' }}>
              Search Skills or Requirements:
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--muted-gray)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '36px' }}
                placeholder="Search tools, ComfyUI nodes, styles, or creator names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Evidence Filter */}
          <div style={{ minWidth: '180px' }}>
            <label className="form-label" style={{ fontSize: '0.78rem', textTransform: 'uppercase' }}>
              Evidence Level:
            </label>
            <select
              className="form-select"
              value={selectedEvidence}
              onChange={(e) => setSelectedEvidence(e.target.value)}
            >
              <option value="All">All Provenance Levels</option>
              <option value="verified">Verified (Audited)</option>
              <option value="evidence-linked">Evidence-Linked</option>
              <option value="self-reported">Self-Reported</option>
            </select>
          </div>
        </div>

        {/* Quick tool selector pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--muted-gray)', fontWeight: 600 }}>Filter by Tool:</span>
          {toolsList.map((tool) => (
            <button
              key={tool}
              onClick={() => setSelectedTool(tool)}
              style={{
                background: selectedTool === tool ? 'var(--ink-black)' : 'var(--warm-ivory-light)',
                color: selectedTool === tool ? 'var(--white)' : 'var(--ink-black)',
                border: '1px solid var(--soft-border)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>

      {/* Creator Grid with Explainable AI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {filteredCreators.map((creator) => {
          const isShortlisted = shortlistedCreatorIds.includes(creator.id);

          return (
            <div
              key={creator.id}
              className="card card-hover"
              style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '14px',
                    objectFit: 'cover',
                    border: '2px solid var(--electric-teal)'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3
                      onClick={() => navigateTo('brand-creator-detail', { creatorId: creator.id })}
                      style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, cursor: 'pointer' }}
                    >
                      {creator.name}
                    </h3>
                    <MatchScoreBadge score={creator.matchScore} />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted-gray)', marginTop: '2px' }}>
                    {creator.specialization}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <EvidenceBadge status={creator.evidenceStatus} size="small" />
                  </div>
                </div>
              </div>

              {/* Explainable Strengths & Gaps Breakdown */}
              <div style={{
                background: 'var(--warm-ivory-light)',
                border: '1px solid var(--soft-border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                marginBottom: '16px',
                fontSize: '0.82rem'
              }}>
                <div style={{ fontWeight: 700, color: '#008f87', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} />
                  <span>Why They Match:</span>
                </div>
                <div style={{ color: '#333', marginBottom: '8px', lineHeight: 1.4 }}>
                  {creator.matchStrengths[0]}
                </div>

                {creator.matchGaps && creator.matchGaps.length > 0 && (
                  <>
                    <div style={{ fontWeight: 700, color: '#D97706', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={13} />
                      <span>Identified Gaps:</span>
                    </div>
                    <div style={{ color: '#666', lineHeight: 1.4 }}>
                      {creator.matchGaps[0]}
                    </div>
                  </>
                )}
              </div>

              {/* Portfolio Thumbnail Preview */}
              <div
                onClick={() => navigateTo('brand-creator-detail', { creatorId: creator.id })}
                style={{
                  height: '140px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  position: 'relative',
                  cursor: 'pointer',
                  background: '#000'
                }}
              >
                <img
                  src={creator.portfolio[0]?.image}
                  alt={creator.portfolio[0]?.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '8px',
                  right: '8px',
                  background: 'rgba(18, 18, 18, 0.85)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  color: 'var(--white)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {creator.portfolio[0]?.title}
                </div>
              </div>

              {/* Tools tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {creator.tools.slice(0, 4).map((t, idx) => (
                  <span key={idx} className="badge badge-teal" style={{ fontSize: '0.7rem' }}>{t}</span>
                ))}
              </div>

              {/* Card Footer Actions */}
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid var(--soft-border)',
                paddingTop: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted-gray)', textTransform: 'uppercase' }}>Starting at</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>${creator.startingPrice}</div>
                </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => toggleShortlist(creator.id)}
                      className="btn btn-outline btn-sm"
                      title={isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
                    >
                      <Bookmark size={14} fill={isShortlisted ? 'var(--electric-teal)' : 'none'} />
                      <span>{isShortlisted ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      onClick={() => navigateTo('brand-creator-detail', { creatorId: creator.id })}
                      className="btn btn-primary btn-sm"
                      style={{ fontWeight: 800 }}
                    >
                      <span>View & Send Proposal</span>
                    </button>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
