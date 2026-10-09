import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Sparkles,
  Search,
  Scale,
  Send,
  FolderKanban,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

export const BrandSidebar = () => {
  const {
    currentPage,
    navigateTo,
    switchRole,
    brandProfile,
    collaborationRequests,
    notifications,
    shortlistedCreatorIds
  } = useApp();

  const pendingRequests = collaborationRequests.filter(
    (r) => r.status === 'Sent' || r.status === 'Counteroffer'
  ).length;
  const unreadNotifs = notifications.brand.filter((n) => !n.read).length;

  const navItems = [
    { id: 'brand-dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'brand-profile', label: 'Brand Profile', icon: <Building2 size={18} /> },
    { id: 'my-campaigns', label: 'My Campaigns', icon: <Briefcase size={18} /> },
    { id: 'ai-brief-builder', label: 'AI Brief Builder', icon: <Sparkles size={18} />, highlight: true },
    { id: 'explore-creators', label: 'Explore Creators', icon: <Search size={18} /> },
    {
      id: 'shortlist-compare',
      label: 'Shortlist & Compare',
      icon: <Scale size={18} />,
      badge: shortlistedCreatorIds.length > 0 ? shortlistedCreatorIds.length : null
    },
    {
      id: 'brand-requests',
      label: 'Collaboration Requests',
      icon: <Send size={18} />,
      badge: pendingRequests > 0 ? pendingRequests : null
    },
    { id: 'brand-projects', label: 'Projects & Deliverables', icon: <FolderKanban size={18} /> },
    {
      id: 'brand-notifications',
      label: 'Notifications',
      icon: <Bell size={18} />,
      badge: unreadNotifs > 0 ? unreadNotifs : null
    },
    { id: 'brand-settings', label: 'Settings', icon: <Settings size={18} /> }
  ];

  return (
    <aside className="workspace-sidebar">
      {/* Brand Header */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <img
          src={brandProfile.logo}
          alt={brandProfile.name}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            objectFit: 'cover',
            border: '2px solid var(--electric-teal)'
          }}
        />
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            color: 'var(--white)',
            fontWeight: 700,
            fontSize: '0.95rem',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}>
            {brandProfile.name}
          </div>
          <div style={{
            fontSize: '0.72rem',
            color: 'var(--electric-teal)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Brand / Agency Workspace
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
          Brand Navigation
        </div>

        {navItems.map((item) => {
          const isActive = currentPage === item.id || 
            (item.id === 'my-campaigns' && currentPage === 'create-campaign') ||
            (item.id === 'explore-creators' && currentPage === 'brand-creator-detail');

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
              {item.highlight && !item.badge && !isActive && (
                <span style={{
                  fontSize: '0.65rem',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  background: 'rgba(0,214,201,0.2)',
                  color: 'var(--electric-teal)',
                  fontWeight: 700
                }}>
                  AI
                </span>
              )}
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
      </div>
    </aside>
  );
};
