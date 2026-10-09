import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  PlusCircle,
  Search,
  Copy,
  Pause,
  Play,
  CheckCircle,
  XCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  DollarSign,
  Users,
  Edit,
  Eye,
  Trash2
} from 'lucide-react';

export const MyCampaignsPage = () => {
  const {
    campaigns,
    navigateTo,
    duplicateCampaign,
    toggleCampaignStatus,
    setSelectedCampaignId
  } = useApp();

  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Active' | 'Draft' | 'Paused' | 'Completed'
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      const matchesTab = activeTab === 'All' || c.status === activeTab;
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contentCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.creativeStyle.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [campaigns, activeTab, searchTerm]);

  const counts = {
    All: campaigns.length,
    Active: campaigns.filter((c) => c.status === 'Active').length,
    Draft: campaigns.filter((c) => c.status === 'Draft').length,
    Paused: campaigns.filter((c) => c.status === 'Paused').length,
    Completed: campaigns.filter((c) => c.status === 'Completed').length
  };

  return (
    <div className="page-content animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
            My Campaigns & Briefs
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '4px' }}>
            Manage active procurement briefs, review creator applications, and inspect AI suitability matches.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigateTo('ai-brief-builder')}
            className="btn btn-outline"
          >
            <Sparkles size={16} color="var(--electric-teal)" />
            <span>AI Brief Builder</span>
          </button>
          <button
            onClick={() => navigateTo('create-campaign')}
            className="btn btn-primary"
          >
            <PlusCircle size={16} />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search Filter */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['All', 'Active', 'Draft', 'Paused', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? 'var(--ink-black)' : 'var(--warm-ivory-light)',
                  color: activeTab === tab ? 'var(--white)' : 'var(--ink-black)',
                  border: '1px solid var(--soft-border)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab} ({counts[tab]})
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} color="var(--muted-gray)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '36px', padding: '8px 12px 8px 36px', fontSize: '0.85rem' }}
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Campaigns Listing Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Briefcase size={40} color="var(--muted-gray)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
            No campaigns found in this view
          </h3>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Get started by creating a new campaign brief or using the AI Brief Builder.
          </p>
          <button
            onClick={() => navigateTo('create-campaign')}
            className="btn btn-primary"
          >
            Create Your First Campaign
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="card card-hover"
              style={{ padding: '24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                      {camp.title}
                    </h3>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      background:
                        camp.status === 'Active' ? '#ECFDF5' :
                        camp.status === 'Draft' ? '#F3F4F6' :
                        camp.status === 'Paused' ? '#FFFBEB' : '#EFF6FF',
                      color:
                        camp.status === 'Active' ? '#059669' :
                        camp.status === 'Draft' ? '#6B7280' :
                        camp.status === 'Paused' ? '#D97706' : '#2563EB',
                      border: '1px solid currentColor'
                    }}>
                      {camp.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span>Category: <strong>{camp.contentCategory}</strong></span>
                    <span>Created: {camp.createdAt}</span>
                    <span>Deadline: <strong>{camp.deadline}</strong></span>
                  </div>
                </div>

                {/* Right side actions */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => duplicateCampaign(camp.id)}
                    className="btn btn-outline btn-sm"
                    title="Duplicate Campaign"
                  >
                    <Copy size={14} />
                    <span>Duplicate</span>
                  </button>

                  {camp.status === 'Active' && (
                    <button
                      onClick={() => toggleCampaignStatus(camp.id, 'Paused')}
                      className="btn btn-outline btn-sm"
                      title="Pause Campaign"
                    >
                      <Pause size={14} />
                      <span>Pause</span>
                    </button>
                  )}

                  {camp.status === 'Paused' && (
                    <button
                      onClick={() => toggleCampaignStatus(camp.id, 'Active')}
                      className="btn btn-outline btn-sm"
                      title="Resume Campaign"
                    >
                      <Play size={14} />
                      <span>Resume</span>
                    </button>
                  )}

                  <button
                    onClick={() => navigateTo('explore-creators', { campaignId: camp.id })}
                    className="btn btn-primary btn-sm"
                  >
                    <Sparkles size={14} />
                    <span>View AI Matches ({camp.matchesCount})</span>
                  </button>
                </div>
              </div>

              {/* Brief Objective Description */}
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-black)', lineHeight: 1.5, marginBottom: '18px' }}>
                {camp.objective}
              </p>

              {/* Required Tools & Deliverables Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {camp.requiredTools.map((t, idx) => (
                  <span key={idx} className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer Metrics & Deep Links */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                borderTop: '1px solid var(--soft-border)',
                paddingTop: '16px',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ color: 'var(--muted-gray)' }}>Budget:</span> <strong>${camp.budget}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted-gray)' }}>Applicant Proposals:</span> <strong>{camp.applicantsCount}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted-gray)' }}>Timeline:</span> {camp.timeline}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => navigateTo('brand-requests')}
                    className="btn btn-ghost btn-sm"
                  >
                    <span>View Proposals ({camp.applicantsCount})</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
