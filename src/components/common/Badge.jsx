import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Clock, Sparkles } from 'lucide-react';

export const EvidenceBadge = ({ status = 'self-reported', showIcon = true, size = 'normal' }) => {
  const config = {
    verified: {
      label: 'Verified Claim',
      className: 'badge-verified',
      icon: <ShieldCheck size={size === 'small' ? 12 : 14} />
    },
    'evidence-linked': {
      label: 'Verification Pending',
      className: 'badge-pending',
      icon: <Clock size={size === 'small' ? 12 : 14} />
    },
    'self-reported': {
      label: 'Self-Reported',
      className: 'badge-self',
      icon: <AlertCircle size={size === 'small' ? 12 : 14} />
    },
    'under-review': {
      label: 'Verification Pending',
      className: 'badge-pending',
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
      title={`Trust Status: ${item.label}`}
    >
      {showIcon && item.icon}
      <span>{item.label}</span>
    </span>
  );
};

export const MatchScoreBadge = ({ score = 95, onClick, size = 'normal' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: '#EEF2FF',
        color: '#4F46E5',
        border: '1px solid #C7D2FE',
        borderRadius: '9999px',
        fontWeight: 700,
        cursor: onClick ? 'pointer' : 'default',
        fontSize: size === 'small' ? '0.72rem' : '0.8rem',
        padding: size === 'small' ? '2px 8px' : '4px 10px',
        transition: 'all 0.15s ease'
      }}
      title="Algorithmic Match Score breakdown"
    >
      <Sparkles size={size === 'small' ? 11 : 13} color="#6366F1" />
      <span>{score}% Match</span>
    </button>
  );
};

export default EvidenceBadge;
