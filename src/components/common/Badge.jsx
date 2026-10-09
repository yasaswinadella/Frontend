import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export const EvidenceBadge = ({ status = 'self-reported', showIcon = true, size = 'normal' }) => {
  const config = {
    verified: {
      label: 'Verified Claim',
      className: 'badge-verified',
      icon: <ShieldCheck size={size === 'small' ? 12 : 14} />
    },
    'evidence-linked': {
      label: 'Evidence-Linked',
      className: 'badge-evidence',
      icon: <CheckCircle2 size={size === 'small' ? 12 : 14} />
    },
    'self-reported': {
      label: 'Self-Reported',
      className: 'badge-self',
      icon: <AlertCircle size={size === 'small' ? 12 : 14} />
    },
    'under-review': {
      label: 'Under Review',
      className: 'badge-review',
      icon: <Clock size={size === 'small' ? 12 : 14} />
    }
  };

  const item = config[status] || config['self-reported'];

  return (
    <span
      className={`badge ${item.className}`}
      style={{
        fontSize: size === 'small' ? '0.7rem' : '0.75rem',
        padding: size === 'small' ? '2px 8px' : '4px 10px'
      }}
      title={`Evidence Status: ${item.label}`}
    >
      {showIcon && item.icon}
      {item.label}
    </span>
  );
};

export const MatchScoreBadge = ({ score = 95, onClick, size = 'normal' }) => {
  return (
    <button
      onClick={onClick}
      className="match-score-pill"
      style={{
        cursor: onClick ? 'pointer' : 'default',
        fontSize: size === 'small' ? '0.72rem' : '0.8rem',
        padding: size === 'small' ? '2px 8px' : '4px 12px'
      }}
      title="Click to inspect AI Match Suitability Breakdown"
    >
      <span style={{ color: '#008f87' }}>✦</span>
      <span>{score}% AI Match</span>
    </button>
  );
};
