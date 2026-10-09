import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Sparkles,
  PlusCircle,
  HelpCircle,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const WorkspaceTopbar = ({ title, subtitle, actionButton }) => {
  const {
    currentRole,
    navigateTo,
    notifications,
    brandProfile,
    activeCreatorProfile
  } = useApp();

  const roleNotifs = currentRole === 'brand' ? notifications.brand : notifications.creator;
  const unreadCount = roleNotifs.filter((n) => !n.read).length;

  return (
    <header className="workspace-topbar">
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink-black)', margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '0.825rem', color: 'var(--muted-gray)', margin: 0 }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Contextual Action Button */}
        {actionButton}

        {/* AI Assistant Quick Trigger */}
        {currentRole === 'brand' && (
          <button
            onClick={() => navigateTo('ai-brief-builder')}
            className="btn btn-outline btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Sparkles size={14} color="var(--electric-teal)" />
            <span>AI Brief Builder</span>
          </button>
        )}

        {/* Notifications Bell */}
        <button
          onClick={() =>
            navigateTo(currentRole === 'brand' ? 'brand-notifications' : 'creator-notifications')
          }
          style={{
            position: 'relative',
            background: 'var(--warm-ivory-light)',
            border: '1px solid var(--soft-border)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--ink-black)'
          }}
          title="View Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              background: 'var(--electric-teal)',
              color: 'var(--ink-black)',
              fontSize: '0.65rem',
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--white)'
            }}>
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Pill */}
        <div
          onClick={() =>
            navigateTo(currentRole === 'brand' ? 'brand-profile' : 'creator-profile')
          }
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 12px 4px 6px',
            background: 'var(--warm-ivory-light)',
            border: '1px solid var(--soft-border)',
            borderRadius: '999px',
            cursor: 'pointer'
          }}
        >
          <img
            src={currentRole === 'brand' ? brandProfile.logo : activeCreatorProfile.avatar}
            alt="User"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-black)' }}>
            {currentRole === 'brand' ? brandProfile.name.split(' ')[0] : activeCreatorProfile.name.split(' ')[0]}
          </span>
        </div>
      </div>
    </header>
  );
};
