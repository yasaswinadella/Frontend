import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  User,
  Image,
  ShieldCheck,
  Compass,
  FileSpreadsheet,
  Inbox,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  Eye
} from 'lucide-react';

export const CreatorSidebar = () => {
  const {
    currentPage,
    navigateTo,
    switchRole,
    activeCreatorProfile,
    collaborationRequests,
    notifications,
    evidenceRecords
  } = useApp();

  const pendingInvites = collaborationRequests.filter(
    (r) => r.status === 'Incoming' || r.status === 'Counteroffer'
  ).length;
  const unreadNotifs = notifications.creator.filter((n) => !n.read).length;
  const reviewEvidence = evidenceRecords.filter((e) => e.status === 'under-review').length;

  const navItems = [
    { id: 'creator-dashboard', label: 'Creator Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'creator-profile', label: 'My Creator Profile', icon: <User size={18} /> },
    { id: 'portfolio-manager', label: 'Portfolio Manager', icon: <Image size={18} /> },
    {
      id: 'evidence-verification',
      label: 'Evidence & Verification',
      icon: <ShieldCheck size={18} />,
      badge: reviewEvidence > 0 ? `${reviewEvidence} under review` : null
    },
    { id: 'available-campaigns', label: 'Available Campaigns', icon: <Compass size={18} /> },
    { id: 'submit-proposal', label: 'Submit Proposal', icon: <FileSpreadsheet size={18} /> },
    {
      id: 'creator-requests',
      label: 'Collaboration Requests',
      icon: <Inbox size={18} />,
      badge: pendingInvites > 0 ? pendingInvites : null
    },
    { id: 'creator-projects', label: 'Active Engagements & Projects', icon: <Briefcase size={18} /> },
    {
      id: 'creator-notifications',
      label: 'Notifications',
      icon: <Bell size={18} />,
      badge: unreadNotifs > 0 ? unreadNotifs : null
    },
    { id: 'creator-settings', label: 'Settings', icon: <Settings size={18} /> }
  ];

  return (
    <aside className="workspace-sidebar">
      {/* Creator Info */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ position: 'relative' }}>
          <img
            src={activeCreatorProfile.avatar}
            alt={activeCreatorProfile.name}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--electric-teal)'
            }}
          />
          <span style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'var(--status-verified)',
            border: '2px solid var(--ink-black)'
          }} />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            color: 'var(--white)',
            fontWeight: 700,
            fontSize: '0.95rem',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}>
            {activeCreatorProfile.name}
          </div>
          <div style={{
            fontSize: '0.72rem',
            color: 'var(--electric-teal)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            AI Creator Workspace
          </div>
        </div>
      </div>

      {/* Nav List */}
      <div style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
        <div style={{
          padding: '0 20px 8px',
          fontSize: '0.72rem',
          color: '#666',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Creator Navigation
        </div>

        {navItems.map((item) => {
          const isActive = currentPage === item.id ||
            (item.id === 'available-campaigns' && currentPage === 'creator-campaign-detail');

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
              style={{
                width: 'calc(100% - 24px)',
                textAlign: 'left',
                border: 'none',
                background: isActive ? 'var(--electric-teal)' : 'transparent',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="nav-item-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          );
        })}

        {/* Sign Out Button below Settings */}
        <button
          onClick={() => switchRole('public')}
          className="nav-item"
          style={{
            width: 'calc(100% - 24px)',
            textAlign: 'left',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: '#f87171',
            marginTop: '4px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="nav-item-icon" style={{ color: '#f87171' }}>
              <LogOut size={18} />
            </span>
            <span>Sign Out</span>
          </div>
        </button>

        {/* Public Profile Preview Quick Link */}
        <div style={{ padding: '12px 12px 4px' }}>
          <button
            onClick={() => navigateTo('public-profile-preview')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '9px 12px',
              background: 'rgba(0, 214, 201, 0.12)',
              border: '1px solid rgba(0, 214, 201, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--electric-teal)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Eye size={15} />
            <span>Public Profile Preview</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
