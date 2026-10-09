import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge, MatchScoreBadge } from '../../components/common/Badge';
import {
  Search,
  Filter,
  Sparkles,
  SlidersHorizontal,
  Bookmark,
  Check,
  Star,
  Layers,
  ArrowUpDown,
  Compass,
  DollarSign,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';

export const CreatorDirectoryPage = () => {
  const {
    creators,
    navigateTo,
    shortlistedCreatorIds,
    toggleShortlist,
    currentRole
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTool, setSelectedTool] = useState('All');
  const [selectedEvidence, setSelectedEvidence] = useState('All');
  const [maxRate, setMaxRate] = useState(250);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'price-asc' | 'price-desc' | 'evidence'

  const categories = ['All', 'Video & Visuals', 'Audio & Voice', '3D & Environments', 'Social Video & UGC', 'Engineering & Automation', 'Character Design', 'Brand & Packaging'];
  const popularTools = ['All', 'Flux.1 Pro', 'ComfyUI', 'Midjourney v6.1', 'Runway Gen-3', 'ElevenLabs', 'Spline 3D', 'Kling AI'];

  // Filter & Search Logic
  const filteredCreators = useMemo(() => {
    return creators
      .filter((creator) => {
        const matchesSearch =
          creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.tools.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
          creator.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory =
          selectedCategory === 'All' || creator.category === selectedCategory;

        const matchesTool =
          selectedTool === 'All' || creator.tools.includes(selectedTool);

        const matchesEvidence =
          selectedEvidence === 'All' || creator.evidenceStatus === selectedEvidence;

        const matchesRate = creator.hourlyRate <= maxRate;

        return matchesSearch && matchesCategory && matchesTool && matchesEvidence && matchesRate;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
        if (sortBy === 'evidence') return b.verifiedCount - a.verifiedCount;
        return 0;
      });
  }, [creators, searchTerm, selectedCategory, selectedTool, selectedEvidence, maxRate, sortBy]);

  return (
    <div style={{ padding: '40px 24px 80px', maxWidth: '1380px', margin: '0 auto' }}>
      {/* Directory Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
          <Compass size={16} color="var(--electric-teal)" />
          <span>Marketplace Directory</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '10px' }}>
          Explore Verified AI Creators
        </h1>
        <p style={{ color: 'var(--muted-gray)', fontSize: '1.05rem', maxWidth: '700px' }}>
          Browse specialized prompt engineers, LoRA trainers, and neural motion directors with cryptographic workflow proof and transparent usage licenses.
        </p>
      </div>

      {/* Semantic Search & Quick Filters Bar */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          {/* Main Search Input */}
          <div style={{ position: 'relative', flex: '1 1 320px' }}>
            <Search size={18} color="var(--muted-gray)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '42px' }}
              placeholder="Search by name, tool (e.g. ComfyUI, Flux.1), style, or requirement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div style={{ minWidth: '180px' }}>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>Category: {cat}</option>
              ))}
            </select>
          </div>

          {/* Tool Dropdown */}
          <div style={{ minWidth: '160px' }}>
            <select
              className="form-select"
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
            >
              {popularTools.map((tool) => (
                <option key={tool} value={tool}>Tool: {tool}</option>
              ))}
            </select>
          </div>

          {/* Evidence Filter */}
          <div style={{ minWidth: '160px' }}>
            <select
              className="form-select"
              value={selectedEvidence}
              onChange={(e) => setSelectedEvidence(e.target.value)}
            >
              <option value="All">Evidence: All Levels</option>
              <option value="verified">Verified Only (Audited)</option>
              <option value="evidence-linked">Evidence-Linked</option>
              <option value="self-reported">Self-Reported</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div style={{ minWidth: '150px' }}>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Top Rated</option>
              <option value="evidence">Most Verified Claims</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Quick Tool Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--muted-gray)', fontWeight: 600 }}>Quick Tools:</span>
          {popularTools.slice(1).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTool(selectedTool === t ? 'All' : t)}
              style={{
                background: selectedTool === t ? 'var(--ink-black)' : 'var(--warm-ivory-light)',
                color: selectedTool === t ? 'var(--white)' : 'var(--ink-black)',
                border: '1px solid var(--soft-border)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.95rem', color: 'var(--muted-gray)' }}>
          Showing <strong style={{ color: 'var(--ink-black)' }}>{filteredCreators.length}</strong> verified creators
        </div>

        {/* Natural Language Prompt hint */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--ink-black)' }}>
          <Sparkles size={14} color="var(--electric-teal)" />
          <span>AI matching enabled for all directory searches</span>
        </div>
      </div>

      {/* Creator Grid */}
      {filteredCreators.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Search size={40} color="var(--muted-gray)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
            No creators found matching your filters
          </h3>
          <p style={{ color: 'var(--muted-gray)', maxWidth: '400px', margin: '0 auto 20px', fontSize: '0.9rem' }}>
            Try clearing search terms or selecting a broader tool or category.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedTool('All');
              setSelectedEvidence('All');
            }}
            className="btn btn-outline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {filteredCreators.map((creator) => {
            const isShortlisted = shortlistedCreatorIds.includes(creator.id);

            return (
              <div
                key={creator.id}
                className="card card-hover"
                style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
              >
                {/* Shortlist Quick Button */}
                <button
                  onClick={() => toggleShortlist(creator.id)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: isShortlisted ? 'var(--ink-black)' : 'var(--warm-ivory-light)',
                    color: isShortlisted ? 'var(--electric-teal)' : 'var(--muted-gray)',
                    border: '1px solid var(--soft-border)',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                    transition: 'all 0.15s ease'
                  }}
                  title={isShortlisted ? 'Remove from Shortlist' : 'Save to Shortlist'}
                >
                  <Bookmark size={16} fill={isShortlisted ? 'var(--electric-teal)' : 'none'} />
                </button>

                {/* Creator Profile Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px', paddingRight: '40px' }}>
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
                  <div>
                    <h3
                      onClick={() => navigateTo('creator-detail', { creatorId: creator.id })}
                      style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, cursor: 'pointer' }}
                    >
                      {creator.name}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted-gray)', marginTop: '2px' }}>
                      {creator.specialization}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <EvidenceBadge status={creator.evidenceStatus} size="small" />
                      <span style={{ fontSize: '0.78rem', color: '#EAB308', fontWeight: 700 }}>
                        ★ {creator.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio Snippet */}
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--ink-black)',
                  lineHeight: 1.5,
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {creator.bio}
                </p>

                {/* Portfolio Showcase Preview (1 featured image) */}
                <div
                  onClick={() => navigateTo('creator-detail', { creatorId: creator.id })}
                  style={{
                    height: '160px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    marginBottom: '16px',
                    position: 'relative',
                    cursor: 'pointer',
                    background: '#111'
                  }}
                >
                  <img
                    src={creator.portfolio[0]?.image}
                    alt={creator.portfolio[0]?.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                    padding: '12px 14px 8px',
                    color: 'var(--white)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                  }}>
                    <span style={{ fontWeight: 600 }}>{creator.portfolio[0]?.title}</span>
                    <span style={{ color: 'var(--electric-teal)', fontSize: '0.7rem' }}>
                      {creator.portfolio[0]?.tools.join(' + ')}
                    </span>
                  </div>
                </div>

                {/* Tool Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  {creator.tools.slice(0, 4).map((tool, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'var(--warm-ivory-light)',
                        border: '1px solid var(--soft-border)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.72rem',
                        fontWeight: 600
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                  {creator.tools.length > 4 && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted-gray)', alignSelf: 'center' }}>
                      +{creator.tools.length - 4} more
                    </span>
                  )}
                </div>

                {/* Footer with Rate & Profile Action */}
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--soft-border)',
                  paddingTop: '14px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted-gray)', textTransform: 'uppercase' }}>
                      Starting at
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                      ${creator.startingPrice} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--muted-gray)' }}>/ project</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => navigateTo('creator-detail', { creatorId: creator.id })}
                      className="btn btn-primary btn-sm"
                      style={{ fontWeight: 800 }}
                    >
                      View & Send Proposal
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
