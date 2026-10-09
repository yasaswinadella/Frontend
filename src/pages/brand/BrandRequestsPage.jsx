import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  Send,
  Inbox,
  CheckCircle2,
  XCircle,
  RefreshCw,
  FolderKanban,
  DollarSign,
  Calendar,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const BrandRequestsPage = () => {
  const {
    collaborationRequests,
    respondToRequest,
    navigateTo,
    setSelectedProjectId
  } = useApp();

  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Sent' | 'Incoming' | 'Counteroffer' | 'Accepted' | 'Declined'
  const [selectedRequestForCounter, setSelectedRequestForCounter] = useState(null);
  const [counterAmount, setCounterAmount] = useState('');
  const [counterMessage, setCounterMessage] = useState('');

  const filteredRequests = useMemo(() => {
    return collaborationRequests.filter((req) => {
      if (activeTab === 'All') return true;
      if (activeTab === 'Sent') return req.type === 'Brand Invitation' && req.status === 'Sent';
      if (activeTab === 'Incoming') return req.type === 'Creator Proposal' && req.status === 'Sent';
      if (activeTab === 'Counteroffer') return req.status === 'Counteroffer';
      if (activeTab === 'Accepted') return req.status === 'Accepted';
      if (activeTab === 'Declined') return req.status === 'Declined';
      return true;
    });
  }, [collaborationRequests, activeTab]);

  const handleSendCounteroffer = (e) => {
    e.preventDefault();
    if (!selectedRequestForCounter) return;
    respondToRequest(selectedRequestForCounter.id, 'Counteroffer', {
      counterBudget: Number(counterAmount),
      counterNotes: counterMessage
    });
    setSelectedRequestForCounter(null);
  };

  return (
    <div className="page-content animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            <Send size={16} color="var(--electric-teal)" />
            <span>Collaboration Pipeline</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
            Collaboration Requests & Proposals
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '4px' }}>
            Review incoming creator pitches, respond to counteroffers, and manage outbound campaign invitations.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="tab-list" style={{ marginBottom: '28px' }}>
        {['All', 'Incoming', 'Counteroffer', 'Sent', 'Accepted', 'Declined'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Requests Listing */}
      {filteredRequests.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Inbox size={40} color="var(--muted-gray)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
            No collaboration requests in this view
          </h3>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem' }}>
            Browse the creator directory to invite talent or wait for creator applications to open briefs.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="card card-hover"
              style={{ padding: '24px', borderLeft: req.status === 'Accepted' ? '4px solid #059669' : req.status === 'Counteroffer' ? '4px solid #D97706' : '1px solid var(--soft-border)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={req.creatorAvatar}
                    alt={req.creatorName}
                    style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--electric-teal)' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                        {req.creatorName}
                      </h3>
                      <span style={{ fontSize: '0.72rem', background: 'var(--warm-ivory-light)', border: '1px solid var(--soft-border)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        {req.type}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', marginTop: '2px' }}>
                      Campaign: <strong>{req.campaignTitle}</strong>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  background:
                    req.status === 'Accepted' ? '#ECFDF5' :
                    req.status === 'Counteroffer' ? '#FFFBEB' :
                    req.status === 'Declined' ? '#FEF2F2' : '#F0F9FF',
                  color:
                    req.status === 'Accepted' ? '#059669' :
                    req.status === 'Counteroffer' ? '#D97706' :
                    req.status === 'Declined' ? '#DC2626' : '#0284C7',
                  border: '1px solid currentColor'
                }}>
                  {req.status}
                </span>
              </div>

              {/* Message Note */}
              <div style={{ background: 'var(--warm-ivory-light)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.88rem', color: '#222' }}>
                <strong>Message:</strong> "{req.message}"
              </div>

              {/* Counteroffer Highlight Box */}
              {req.status === 'Counteroffer' && (
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '14px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', color: '#92400E', fontSize: '0.88rem' }}>
                  <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <AlertCircle size={15} />
                    <span>Creator Proposed Counteroffer: ${req.counterBudget}</span>
                  </div>
                  <div>{req.counterNotes}</div>
                </div>
              )}

              {/* Deliverables & Budget Metadata */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', fontSize: '0.85rem', marginBottom: '18px' }}>
                <div>
                  <span style={{ color: 'var(--muted-gray)' }}>Deliverables:</span>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>{req.deliverables}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--muted-gray)' }}>Target Deadline:</span>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>{req.deadline}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--muted-gray)' }}>Escrow Amount:</span>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink-black)' }}>
                    ${req.counterBudget || req.budget}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--soft-border)', paddingTop: '16px', flexWrap: 'wrap' }}>
                {req.status === 'Accepted' && (
                  <button
                    onClick={() => navigateTo('brand-projects', { projectId: req.projectId || 'proj-101' })}
                    className="btn btn-primary btn-sm"
                  >
                    <FolderKanban size={14} />
                    <span>View Active Deliverables</span>
                  </button>
                )}

                {(req.status === 'Sent' || req.status === 'Counteroffer') && (
                  <>
                    <button
                      onClick={() => respondToRequest(req.id, 'Decline')}
                      className="btn btn-outline btn-sm"
                      style={{ color: '#DC2626' }}
                    >
                      <XCircle size={14} />
                      <span>Decline</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedRequestForCounter(req);
                        setCounterAmount(req.counterBudget || req.budget);
                      }}
                      className="btn btn-outline btn-sm"
                    >
                      <RefreshCw size={14} />
                      <span>Counteroffer</span>
                    </button>

                    <button
                      onClick={() => respondToRequest(req.id, 'Accept')}
                      className="btn btn-primary btn-sm"
                    >
                      <CheckCircle2 size={14} />
                      <span>Accept & Deposit Escrow (${req.counterBudget || req.budget})</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Counteroffer Modal */}
      <Modal
        isOpen={Boolean(selectedRequestForCounter)}
        onClose={() => setSelectedRequestForCounter(null)}
        title="Submit Counteroffer"
        subtitle={`Propose adjusted budget and delivery terms to ${selectedRequestForCounter?.creatorName}.`}
        maxWidth="500px"
      >
        <form onSubmit={handleSendCounteroffer}>
          <div className="form-group">
            <label className="form-label">Adjusted Budget (USD)</label>
            <input
              type="number"
              className="form-input"
              value={counterAmount}
              onChange={(e) => setCounterAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Scope & Timeline Adjustment Notes</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="e.g. We can do $5,000 if you can deliver by Friday..."
              value={counterMessage}
              onChange={(e) => setCounterMessage(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button
              type="button"
              onClick={() => setSelectedRequestForCounter(null)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Counteroffer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
