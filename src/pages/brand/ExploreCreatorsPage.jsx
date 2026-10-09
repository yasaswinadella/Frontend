import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceBadge, MatchScoreBadge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
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
  SlidersHorizontal,
  RotateCcw,
  Star,
  DollarSign,
  Clock,
  Briefcase,
  X
} from 'lucide-react';

export const ExploreCreatorsPage = () => {
  const {
    creators,
    campaigns,
    navigateTo,
    shortlistedCreatorIds,
    toggleShortlist,
    sendCollaborationRequest,
    setSelectedCreatorId,
    addToast
  } = useApp();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedTool, setSelectedTool] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedContentType, setSelectedContentType] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [maxBudget, setMaxBudget] = useState(5000);
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [selectedEvidence, setSelectedEvidence] = useState('All');
  const [activeCampaignId, setActiveCampaignId] = useState(campaigns[0]?.id || 'camp-1');

  // Modal State for Quick Invite / Proposal
  const [inviteModalCreator, setInviteModalCreator] = useState(null);
  const [inviteCampaignId, setInviteCampaignId] = useState(campaigns[0]?.id || '');
  const [inviteMessage, setInviteMessage] = useState('');
  const [inviteBudget, setInviteBudget] = useState(2500);

  // Match score explanation modal state
  const [matchModalCreator, setMatchModalCreator] = useState(null);

  // Available Filter Options
  const specializations = ['All', 'Luxury Product Renders', 'Cinematic Sci-Fi', 'Haute Couture', 'Storytelling', 'UGC & Viral', 'Character Design'];
  const toolsList = ['All', 'Flux.1 Pro', 'ComfyUI', 'Midjourney v6.1', 'Runway Gen-3', 'OpenAI Sora', 'ElevenLabs', 'Kling AI', 'Blender 4.2'];
  const skillsList = ['All', 'Prompt Engineering', 'Custom LoRA Training', 'Temporal Coherence', 'Color Grading', 'Photorealism', 'Voice Narration', 'Fluid Simulation'];
  const contentTypes = ['All', 'Product Visuals', 'AI Film', 'AI Fashion', '3D Animation', 'Character Design', 'Social Video'];
  const experienceLevels = ['All', '3+ Years', '5+ Years', '6+ Years'];
  const availabilityOptions = ['All', 'Available (Immediate)', 'Available', 'Limited'];

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialization('All');
    setSelectedTool('All');
    setSelectedSkill('All');
    setSelectedContentType('All');
    setSelectedExperience('All');
    setMaxBudget(5000);
    setSelectedAvailability('All');
    setSelectedEvidence('All');
  };

  // Real Dynamic Filtering
  const filteredCreators = useMemo(() => {
    return creators.filter((c) => {
      // Keyword search
      const matchesSearch =
        !searchTerm.trim() ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.tools.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
        c.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

      // Tool filter
      const matchesTool = selectedTool === 'All' || c.tools.includes(selectedTool);

      // Skill filter
      const matchesSkill = selectedSkill === 'All' || c.skills.includes(selectedSkill);

      // Specialization filter
      const matchesSpec = selectedSpecialization === 'All' || c.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase()) || c.category.toLowerCase().includes(selectedSpecialization.toLowerCase());

      // Content type filter
      const matchesContentType = selectedContentType === 'All' || c.category.toLowerCase().includes(selectedContentType.toLowerCase());

      // Budget filter
      const matchesBudget = c.startingPrice <= maxBudget;

      // Evidence filter
      const matchesEvidence = selectedEvidence === 'All' || c.evidenceStatus === selectedEvidence;

      // Availability filter
      const matchesAvailability = selectedAvailability === 'All' || c.availability.toLowerCase().includes(selectedAvailability.toLowerCase());

      return (
        matchesSearch &&
        matchesTool &&
        matchesSkill &&
        matchesSpec &&
        matchesContentType &&
        matchesBudget &&
        matchesEvidence &&
        matchesAvailability
      );
    });
  }, [
    creators,
    searchTerm,
    selectedTool,
    selectedSkill,
    selectedSpecialization,
    selectedContentType,
    maxBudget,
    selectedEvidence,
    selectedAvailability
  ]);

  const handleOpenInvite = (creator) => {
    setInviteModalCreator(creator);
    setInviteBudget(creator.startingPrice || 2000);
    setInviteMessage(`Hi ${creator.name},\n\nWe reviewed your verified AI portfolio and would like to invite you to collaborate on our upcoming campaign with escrow milestone protection.`);
  };

  const handleSendInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteModalCreator) return;

    sendCollaborationRequest({
      campaignId: inviteCampaignId,
      creatorId: inviteModalCreator.id,
      budget: Number(inviteBudget),
      deadline: '3 Weeks',
      message: inviteMessage
    });

    addToast({
      title: 'Invitation Sent!',
      message: `Invitation successfully dispatched to ${inviteModalCreator.name}.`,
      type: 'success'
    });

    setInviteModalCreator(null);
  };

  return (
    <div className="page-content animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            <Sparkles size={15} />
            <span>AI Talent Discovery Engine</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Discover & Hire AI Creators
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
            Search AI filmmakers, product rendering specialists, and animators with audited proofs and algorithmic match scoring.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => navigateTo('shortlist-compare')}
            className="btn btn-outline"
          >
            <Scale size={16} />
            <span>Compare Shortlist ({shortlistedCreatorIds.length})</span>
          </button>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      <div className="card" style={{ padding: '24px', marginBottom: '32px', backgroundColor: '#FFFFFF' }}>
        {/* Top Row: Search & Campaign Match Context */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          {/* Search Input */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Search Keywords, Tools, or Skills:
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '38px' }}
                placeholder="Search Sophia, Midjourney, ComfyUI, Luxury, 3D..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Specialization Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Specialization:
            </label>
            <select
              className="form-select"
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* AI Tools & Models Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              AI Tools & Models:
            </label>
            <select
              className="form-select"
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
            >
              {toolsList.map((tool) => (
                <option key={tool} value={tool}>{tool}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Second Row: Skills, Content Type, Experience, Budget */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
          {/* Skills Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Skills:
            </label>
            <select
              className="form-select"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              {skillsList.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Content Type */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Content Type:
            </label>
            <select
              className="form-select"
              value={selectedContentType}
              onChange={(e) => setSelectedContentType(e.target.value)}
            >
              {contentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Availability:
            </label>
            <select
              className="form-select"
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
            >
              {availabilityOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Max Budget Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="form-label" style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Max Project Budget:
              </label>
              <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.85rem' }}>${maxBudget}</span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="250"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>

          {/* Clear Filters Button */}
          <div>
            <button
              type="button"
              onClick={handleClearFilters}
              className="btn btn-outline"
              style={{ width: '100%', fontSize: '0.825rem' }}
            >
              <RotateCcw size={14} />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          Showing <strong>{filteredCreators.length}</strong> AI Creator{filteredCreators.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Empty Results Screen with Clear Filters button */}
      {filteredCreators.length === 0 ? (
        <div className="card" style={{ padding: '64px 24px', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px'
          }}>
            <Search size={28} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            No creators match your current filter criteria
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', maxWidth: '480px', margin: '0 auto 24px' }}>
            Try expanding your budget range, removing tool filters, or resetting your search keywords to view all creators.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="btn btn-primary"
          >
            <RotateCcw size={16} />
            <span>Clear Filters & Show All Creators</span>
          </button>
        </div>
      ) : (
        /* Creator Cards Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredCreators.map((creator) => {
            const isShortlisted = shortlistedCreatorIds.includes(creator.id);
            const previewPortfolio = creator.portfolio && creator.portfolio[0];

            return (
              <div
                key={creator.id}
                className="card card-hover"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                {/* Portfolio Preview Thumbnail */}
                <div
                  onClick={() => {
                    setSelectedCreatorId(creator.id);
                    navigateTo('brand-creator-detail');
                  }}
                  style={{
                    position: 'relative',
                    height: '170px',
                    backgroundColor: '#0F172A',
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={previewPortfolio?.image || creator.coverImage}
                    alt={creator.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {creator.category}
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px'
                  }}>
                    <MatchScoreBadge
                      score={creator.matchScore || 95}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMatchModalCreator(creator);
                      }}
                    />
                  </div>
                </div>

                {/* Creator Header Section */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #FFFFFF',
                          boxShadow: 'var(--shadow-xs)'
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                          {creator.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {creator.specialization}
                        </div>
                      </div>
                    </div>

                    <EvidenceBadge status={creator.evidenceStatus} size="small" />
                  </div>

                  {/* Bio snippet */}
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {creator.bio}
                  </p>

                  {/* Tools & Skills Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {creator.tools.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="badge badge-gray" style={{ fontSize: '0.7rem' }}>
                        {t}
                      </span>
                    ))}
                    {creator.skills.slice(0, 2).map((s, idx) => (
                      <span key={idx} className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Price, Rating, & Availability */}
                  <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '18px',
                    fontSize: '0.825rem'
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Starting Rate: </span>
                      <strong style={{ color: 'var(--primary)' }}>${creator.startingPrice}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                      <Star size={13} fill="#F59E0B" color="#F59E0B" />
                      <span>{creator.rating}</span>
                      <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>({creator.completedJobs} jobs)</span>
                    </div>
                  </div>

                  {/* 3 Action Buttons (Prompt Requirement: View Portfolio, Shortlist, Invite/Hire) */}
                  <div style={{
                    marginTop: 'auto',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr 1fr',
                    gap: '8px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-light)'
                  }}>
                    {/* Shortlist Button */}
                    <button
                      type="button"
                      onClick={() => toggleShortlist(creator.id)}
                      className="btn btn-outline btn-sm"
                      title={isShortlisted ? 'Remove from Shortlist' : 'Save / Shortlist Creator'}
                      style={{ padding: '8px 10px', color: isShortlisted ? 'var(--primary)' : 'var(--text-muted)' }}
                    >
                      <Bookmark size={15} fill={isShortlisted ? 'var(--primary)' : 'none'} />
                    </button>

                    {/* View Portfolio Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCreatorId(creator.id);
                        navigateTo('brand-creator-detail');
                      }}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.825rem' }}
                    >
                      <Eye size={14} />
                      <span>View Portfolio</span>
                    </button>

                    {/* Invite / Hire Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenInvite(creator)}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: '0.825rem' }}
                    >
                      <Send size={14} />
                      <span>Invite / Hire</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Invite / Send Proposal Modal */}
      {inviteModalCreator && (
        <Modal
          isOpen={true}
          onClose={() => setInviteModalCreator(null)}
          title={`Invite ${inviteModalCreator.name} to Campaign`}
        >
          <form onSubmit={handleSendInviteSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <img
                src={inviteModalCreator.avatar}
                alt={inviteModalCreator.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{inviteModalCreator.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{inviteModalCreator.specialization} • Starting ${inviteModalCreator.startingPrice}</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Select Campaign / Brief:</label>
              <select
                className="form-select"
                value={inviteCampaignId}
                onChange={(e) => setInviteCampaignId(e.target.value)}
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>{c.title} (${c.budget})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Offered Escrow Budget ($ USD):</label>
              <input
                type="number"
                className="form-input"
                value={inviteBudget}
                onChange={(e) => setInviteBudget(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Invitation Message & Project Scope:</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setInviteModalCreator(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                <Send size={15} />
                <span>Send Collaboration Request</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Algorithmic Match Score Explanation Modal */}
      {matchModalCreator && (
        <Modal
          isOpen={true}
          onClose={() => setMatchModalCreator(null)}
          title={`AI Compatibility Breakdown: ${matchModalCreator.name}`}
        >
          <div style={{ padding: '6px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', padding: '16px', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary)' }}>
                {matchModalCreator.matchScore || 96}%
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  High Aesthetic & Workflow Compatibility
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Calculated from toolchain proficiency, verified LoRA seeds, and category track record.
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Algorithmic Strengths:
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(matchModalCreator.matchStrengths || [
                  'Audited ComfyUI node workflows match campaign technical specs',
                  'Published commercial portfolio in luxury product rendering',
                  'Certified C2PA cryptographic lineage on final deliverables'
                ]).map((str, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => setMatchModalCreator(null)}
                className="btn btn-primary"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ExploreCreatorsPage;
