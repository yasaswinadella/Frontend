import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  Inbox,
  Send,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Briefcase,
  AlertCircle,
  Eye,
  ArrowRight
} from 'lucide-react';

export const CreatorRequestsPage = () => {
  const {
    collaborationRequests,
    activeCreatorProfile,
    respondToRequest,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Incoming' | 'Sent' | 'Counteroffer' | 'Accepted' | 'Declined'
  const [selectedRequestForCounter, setSelectedRequestForCounter] = useState(null);
  const [counterBudget, setCounterBudget] = useState('');
  const [counterNotes, setCounterNotes] = useState('');

  const myRequests = collaborationRequests.filter(
    (r) => r.creatorId === activeCreatorProfile.id
  );

  const filteredRequests = useMemo(() => {
    return myRequests.filter((req) => {
      if (activeTab === 'All') return true;
      if (activeTab === 'Incoming') return req.type === 'Brand Invitation' && req.status === 'Incoming';
      if (activeTab === 'Sent') return req.type === 'Creator Proposal' && req.status === 'Sent';
      if (activeTab === 'Counteroffer') return req.status === 'Counteroffer';
      if (activeTab === 'Accepted') return req.status === 'Accepted';
      if (activeTab === 'Declined') return req.status === 'Declined';
      return true;
    });
  }, [myRequests, activeTab]);

  const handleCounterSubmit = (e) => {
    e.preventDefault();
    if (!selectedRequestForCounter) return;
    respondToRequest(selectedRequestForCounter.id, 'Counteroffer', {
      counterBudget: Number(counterBudget),
      counterNotes
    });
    setSelectedRequestForCounter(null);
  };

  return (
    <div className="page-content animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
            <Inbox size={16} color="var(--electric-teal)" />
            <span>Collaboration Inbound & Outbound</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
            Collaboration Requests & Invitations
          </h1>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem', marginTop: '4px' }}>
            Review brand invitations, manage submitted campaign proposals, and respond with custom counteroffers.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-list" style={{ marginBottom: '28px' }}>
        {['All', 'Incoming', 'Sent', 'Counteroffer', 'Accepted', 'Declined'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Request Cards */}
      {filteredRequests.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Inbox size={40} color="var(--muted-gray)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
            No requests found in this view
          </h3>
          <p style={{ color: 'var(--muted-gray)', fontSize: '0.9rem' }}>
            Check other tabs or browse open campaigns to submit proposals.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="card card-hover"
              style={{
                padding: '24px',
                borderLeft:
                  req.status === 'Accepted' ? '4px solid #059669' :
                  req.status === 'Counteroffer' ? '4px solid #D97706' :
                  req.status === 'Incoming' ? '4px solid var(--electric-teal)' : '1px solid var(--soft-border)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted-gray)', fontWeight: 600 }}>{req.brandName}</span>
                    <span style={{ color: 'var(--soft-border)' }}>•</span>
                    <span style={{ fontSize: '0.75rem', background: 'var(--warm-ivory-light)', border: '1px solid var(--soft-border)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      {req.type}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                    {req.campaignTitle}
                  </h3>
                </div>

                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  background:
                    req.status === 'Accepted' ? '#ECFDF5' :
                    req.status === 'Counteroffer' ? '#FFFBEB' :
                    req.status === 'Incoming' ? '#EFF6FF' : 'var(--warm-ivory-light)',
                  color:
                    req.status === 'Accepted' ? '#059669' :
                    req.status === 'Counteroffer' ? '#D97706' :
                    req.status === 'Incoming' ? '#2563EB' : 'var(--ink-black)',
                  border: '1px solid currentColor'
                }}>
                  {req.status}
                </span>
              </div>

              {/* Message */}
              <div style={{ background: 'var(--warm-ivory-light)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.88rem' }}>
                <strong>Message:</strong> "{req.message}"
              </div>

              {/* Counteroffer Box */}
              {req.status === 'Counteroffer' && (
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', color: '#92400E', fontSize: '0.85rem' }}>
                  <strong>Counteroffer in Review:</strong> ${req.counterBudget} — {req.counterNotes}
                </div>
              )}

              {/* Deliverables & Budget */}
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
                  <span style={{ color: 'var(--muted-gray)' }}>Escrow Budget:</span>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink-black)' }}>
                    ${req.counterBudget || req.budget}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--soft-border)', paddingTop: '16px', flexWrap: 'wrap' }}>
                {req.status === 'Accepted' && (
                  <button
                    onClick={() => navigateTo('creator-projects', { projectId: req.projectId || 'proj-101' })}
                    className="btn btn-primary btn-sm"
                  >
                    <Briefcase size={14} />
                    <span>Open Project Workspace</span>
                  </button>
                )}

                {req.status === 'Incoming' && (
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
                        setCounterBudget(req.budget * 1.15);
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
                      <span>Accept Invitation (${req.budget})</span>
                    </button>
                  </>
                )}

                {req.status === 'Sent' && (
                  <button
                    onClick={() => respondToRequest(req.id, 'Withdraw')}
                    className="btn btn-outline btn-sm"
                    style={{ color: '#DC2626' }}
                  >
                    Withdraw Proposal
                  </button>
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
        title="Submit Counteroffer to Brand"
        subtitle={`Adjust price and timeline terms for ${selectedRequestForCounter?.campaignTitle}.`}
        maxWidth="500px"
      >
        <form onSubmit={handleCounterSubmit}>
          <div className="form-group">
            <label className="form-label">Proposed Budget (USD)</label>
            <input
              type="number"
              className="form-input"
              value={counterBudget}
              onChange={(e) => setCounterBudget(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Scope & Delivery Clarification Notes</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="e.g. Can include trained brand LoRA weights and 4K upscaling for $5,500..."
              value={counterNotes}
              onChange={(e) => setCounterNotes(e.target.value)}
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
              Send Counteroffer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
