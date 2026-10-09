import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MatchScoreBadge } from '../../components/common/Badge';
import {
  Compass,
  Search,
  Sparkles,
  Bookmark,
  DollarSign,
  Calendar,
  Layers,
  ArrowRight,
  Eye,
  Send
} from 'lucide-react';

export const AvailableCampaignsPage = () => {
  const { campaigns, navigateTo, setSelectedCampaignId } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedCampaignIds, setSavedCampaignIds] = useState([]);

  const activeCampaigns = campaigns.filter((c) => c.status === 'Active');

  const filteredCampaigns = useMemo(() => {
    return activeCampaigns.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.requiredTools.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || c.contentCategory === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [activeCampaigns, searchTerm, selectedCategory]);

  const toggleSaveCampaign = (campId) => {
    setSavedCampaignIds((prev) =>
      prev.includes(campId) ? prev.filter((id) => id !== campId) : [...prev, campId]
    );
  };

  return (
    <div className="page-content animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            <Compass size={16} color="var(--electric-teal)" />
            <span>Open Brand Briefs</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
            Available Campaigns & Briefs
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '4px' }}>
            Browse funded brand campaigns with explainable AI suitability scores matching your portfolio and tools.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card" style={{ padding: '18px 20px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={16} color="var(--muted-gray)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '36px' }}
              placeholder="Search by keyword, tool (e.g. ComfyUI, Flux), or brand name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ minWidth: '220px' }}>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Commercial Video & 3D Visuals">Commercial Video & 3D Visuals</option>
              <option value="Virtual Influencer & Beauty Lookbook">Virtual Influencer & Beauty</option>
              <option value="3D Fashion & Video">3D Fashion & Video</option>
              <option value="Social Video & UGC">Social Video & UGC</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredCampaigns.map((camp) => {
          const isSaved = savedCampaignIds.includes(camp.id);

          return (
            <div
              key={camp.id}
              className="card card-hover"
              style={{ padding: '24px', position: 'relative' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted-gray)', fontWeight: 600 }}>{camp.brandName}</span>
                    <span style={{ color: 'var(--soft-border)' }}>•</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--electric-teal)', fontWeight: 700 }}>
                      {camp.contentCategory}
                    </span>
                  </div>
                  <h2
                    onClick={() => navigateTo('creator-campaign-detail', { campaignId: camp.id })}
                    style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, cursor: 'pointer' }}
                  >
                    {camp.title}
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MatchScoreBadge score={98} />
                  <button
                    onClick={() => toggleSaveCampaign(camp.id)}
                    className="btn btn-outline btn-sm"
                    title={isSaved ? 'Remove from Saved' : 'Save Campaign'}
                  >
                    <Bookmark size={14} fill={isSaved ? 'var(--electric-teal)' : 'none'} color={isSaved ? 'var(--electric-teal)' : 'currentColor'} />
                  </button>
                </div>
              </div>

              {/* Brief Excerpt */}
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-black)', lineHeight: 1.5, marginBottom: '16px' }}>
                {camp.objective}
              </p>

              {/* AI Suitability Match Box */}
              <div style={{ background: 'var(--warm-ivory-light)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.82rem', color: '#008f87', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} />
                <span>AI Suitability: 98% Match — Matches your Flux.1 + ComfyUI verified fluid simulation case studies.</span>
              </div>

              {/* Tools Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                {camp.requiredTools.map((t, idx) => (
                  <span key={idx} className="badge badge-teal" style={{ fontSize: '0.72rem' }}>{t}</span>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                borderTop: '1px solid var(--soft-border)',
                paddingTop: '16px'
              }}>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.88rem' }}>
                  <div>
                    <span style={{ color: 'var(--muted-gray)' }}>Escrow Budget:</span> <strong>${camp.budget}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted-gray)' }}>Timeline:</span> {camp.timeline}
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted-gray)' }}>Deadline:</span> {camp.deadline}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => navigateTo('creator-campaign-detail', { campaignId: camp.id })}
                    className="btn btn-outline btn-sm"
                  >
                    <Eye size={14} />
                    <span>View Full Brief</span>
                  </button>
                  <button
                    onClick={() => navigateTo('submit-proposal', { campaignId: camp.id })}
                    className="btn btn-primary btn-sm"
                  >
                    <Send size={14} />
                    <span>Submit Proposal</span>
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
