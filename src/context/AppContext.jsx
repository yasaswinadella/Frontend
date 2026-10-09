import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CREATORS,
  INITIAL_CAMPAIGNS,
  INITIAL_COLLABORATION_REQUESTS,
  INITIAL_PROJECTS,
  INITIAL_CONVERSATIONS,
  INITIAL_EVIDENCE_RECORDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_BRAND_PROFILE
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('cp_role') || 'public'; // 'public' | 'brand' | 'creator'
  });

  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('cp_page') || 'landing';
  });

  // Selected Entities for Detail Views
  const [selectedCreatorId, setSelectedCreatorId] = useState('creator-1');
  const [selectedCampaignId, setSelectedCampaignId] = useState('camp-1');
  const [selectedProjectId, setSelectedProjectId] = useState('proj-101');
  const [selectedConversationId, setSelectedConversationId] = useState('conv-1');

  // Shortlist State
  const [shortlistedCreatorIds, setShortlistedCreatorIds] = useState(['creator-1', 'creator-4']);

  // Dynamic Data Stores with local storage fallback
  const [creators, setCreators] = useState(() => {
    const saved = localStorage.getItem('cp_creators');
    return saved ? JSON.parse(saved) : INITIAL_CREATORS;
  });

  const [campaigns, setCampaigns] = useState(() => {
    const saved = localStorage.getItem('cp_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [collaborationRequests, setCollaborationRequests] = useState(() => {
    const saved = localStorage.getItem('cp_requests');
    return saved ? JSON.parse(saved) : INITIAL_COLLABORATION_REQUESTS;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('cp_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('cp_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [evidenceRecords, setEvidenceRecords] = useState(() => {
    const saved = localStorage.getItem('cp_evidence');
    return saved ? JSON.parse(saved) : INITIAL_EVIDENCE_RECORDS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('cp_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [brandProfile, setBrandProfile] = useState(() => {
    const saved = localStorage.getItem('cp_brand_profile');
    return saved ? JSON.parse(saved) : INITIAL_BRAND_PROFILE;
  });

  // Creator profile for the active creator view
  const [activeCreatorProfile, setActiveCreatorProfile] = useState(INITIAL_CREATORS[0]);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('cp_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('cp_page', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('cp_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('cp_requests', JSON.stringify(collaborationRequests));
  }, [collaborationRequests]);

  useEffect(() => {
    localStorage.setItem('cp_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('cp_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('cp_evidence', JSON.stringify(evidenceRecords));
  }, [evidenceRecords]);

  // Toast Dispatcher
  const addToast = ({ title, message, type = 'success' }) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper
  const navigateTo = (page, options = {}) => {
    if (options.creatorId) setSelectedCreatorId(options.creatorId);
    if (options.campaignId) setSelectedCampaignId(options.campaignId);
    if (options.projectId) setSelectedProjectId(options.projectId);
    if (options.conversationId) setSelectedConversationId(options.conversationId);
    
    // Explicit list of role-specific pages
    const publicPages = ['landing', 'directory', 'creator-detail', 'how-it-works', 'auth'];
    const brandPages = [
      'brand-dashboard', 'brand-profile', 'my-campaigns', 'create-campaign',
      'ai-brief-builder', 'explore-creators', 'brand-creator-detail',
      'shortlist-compare', 'brand-requests', 'brand-messages', 'brand-projects',
      'brand-notifications', 'brand-settings'
    ];
    const creatorPages = [
      'creator-dashboard', 'creator-profile', 'portfolio-manager',
      'evidence-verification', 'available-campaigns', 'creator-campaign-detail',
      'submit-proposal', 'creator-requests', 'creator-messages', 'creator-projects',
      'creator-notifications', 'creator-settings', 'public-profile-preview'
    ];

    if (publicPages.includes(page)) {
      setCurrentRole('public');
    } else if (brandPages.includes(page)) {
      setCurrentRole('brand');
    } else if (creatorPages.includes(page)) {
      setCurrentRole('creator');
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch Role
  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'public') {
      setCurrentPage('landing');
    } else if (newRole === 'brand') {
      setCurrentPage('brand-dashboard');
    } else if (newRole === 'creator') {
      setCurrentPage('creator-dashboard');
    }
  };

  // Shortlist Toggles
  const toggleShortlist = (creatorId) => {
    setShortlistedCreatorIds((prev) => {
      const exists = prev.includes(creatorId);
      const updated = exists ? prev.filter((id) => id !== creatorId) : [...prev, creatorId];
      const creator = creators.find((c) => c.id === creatorId);
      addToast({
        title: exists ? 'Removed from Shortlist' : 'Added to Shortlist',
        message: `${creator?.name || 'Creator'} has been ${exists ? 'removed from' : 'saved to'} your shortlist.`,
        type: exists ? 'info' : 'success'
      });
      return updated;
    });
  };

  // Campaign Actions
  const addCampaign = (newCampaign) => {
    const camp = {
      ...newCampaign,
      id: `camp-${Date.now()}`,
      brandId: 'brand-1',
      brandName: brandProfile.name,
      brandLogo: brandProfile.logo,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      matchesCount: 8,
      topMatches: [
        { creatorId: 'creator-1', score: 98, reason: 'High match on required tools and creative category.' },
        { creatorId: 'creator-4', score: 93, reason: 'Strong social format delivery metrics.' }
      ]
    };
    setCampaigns((prev) => [camp, ...prev]);
    addToast({
      title: 'Campaign Published Successfully!',
      message: `"${camp.title}" is now live and accepting creator applications.`,
      type: 'success'
    });
    return camp.id;
  };

  const updateCampaign = (campaignId, updatedFields) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, ...updatedFields } : c))
    );
    addToast({
      title: 'Campaign Updated',
      message: 'Your campaign changes have been saved.',
      type: 'success'
    });
  };

  const duplicateCampaign = (campaignId) => {
    const original = campaigns.find((c) => c.id === campaignId);
    if (!original) return;
    const duplicated = {
      ...original,
      id: `camp-${Date.now()}`,
      title: `${original.title} (Copy)`,
      status: 'Draft',
      createdAt: new Date().toISOString().split('T')[0],
      applicantsCount: 0
    };
    setCampaigns((prev) => [duplicated, ...prev]);
    addToast({
      title: 'Campaign Duplicated',
      message: `Created draft copy: "${duplicated.title}".`,
      type: 'info'
    });
  };

  const toggleCampaignStatus = (campaignId, newStatus) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, status: newStatus } : c))
    );
    addToast({
      title: `Campaign ${newStatus}`,
      message: `Campaign status changed to ${newStatus}.`,
      type: 'info'
    });
  };

  // Collaboration Request Actions
  const sendCollaborationRequest = ({ campaignId, creatorId, budget, deliverables, deadline, message }) => {
    const creator = creators.find((c) => c.id === creatorId);
    const campaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];

    const newReq = {
      id: `req-${Date.now()}`,
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      brandName: brandProfile.name,
      brandLogo: brandProfile.logo,
      creatorId: creator.id,
      creatorName: creator.name,
      creatorAvatar: creator.avatar,
      type: 'Brand Invitation',
      status: 'Sent',
      budget: Number(budget) || campaign.budget,
      counterBudget: null,
      deliverables: deliverables || campaign.deliverables.join(', '),
      deadline: deadline || campaign.deadline,
      sentDate: new Date().toISOString().split('T')[0],
      message: message || "We'd love to collaborate on this campaign!",
      projectId: null
    };

    setCollaborationRequests((prev) => [newReq, ...prev]);
    addToast({
      title: 'Collaboration Invitation Sent!',
      message: `Invitation sent to ${creator.name} for $${newReq.budget}.`,
      type: 'success'
    });
  };

  const submitProposal = ({ campaignId, pitch, proposedBudget, timeline, portfolioItems, message }) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    const newReq = {
      id: `req-${Date.now()}`,
      campaignId: campaign ? campaign.id : 'camp-1',
      campaignTitle: campaign ? campaign.title : 'Custom Campaign',
      brandName: campaign ? campaign.brandName : 'Brand Client',
      brandLogo: campaign ? campaign.brandLogo : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
      creatorId: activeCreatorProfile.id,
      creatorName: activeCreatorProfile.name,
      creatorAvatar: activeCreatorProfile.avatar,
      type: 'Creator Proposal',
      status: 'Sent',
      budget: Number(proposedBudget) || 3500,
      counterBudget: null,
      deliverables: pitch || 'Custom AI visual deliverables with source files',
      deadline: timeline || '2 Weeks',
      sentDate: new Date().toISOString().split('T')[0],
      message: message || pitch,
      projectId: null
    };

    setCollaborationRequests((prev) => [newReq, ...prev]);
    addToast({
      title: 'Proposal Submitted Successfully!',
      message: `Your proposal for "${newReq.campaignTitle}" has been delivered to the brand.`,
      type: 'success'
    });
  };

  const respondToRequest = (requestId, responseAction, customData = {}) => {
    setCollaborationRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;

        if (responseAction === 'Accept') {
          // Create linked active project if not exists
          const newProjectId = `proj-${Date.now()}`;
          const newProject = {
            id: newProjectId,
            title: req.campaignTitle,
            campaignId: req.campaignId,
            brandName: req.brandName,
            brandLogo: req.brandLogo,
            creatorId: req.creatorId,
            creatorName: req.creatorName,
            creatorAvatar: req.creatorAvatar,
            status: 'In Progress',
            budgetTotal: req.counterBudget || req.budget,
            escrowLocked: req.counterBudget || req.budget,
            escrowReleased: 0,
            startDate: new Date().toISOString().split('T')[0],
            targetDeadline: req.deadline,
            progressPercent: 15,
            milestones: [
              {
                id: `m-${Date.now()}-1`,
                title: 'Milestone 1: Preliminary Generation & Styleframes',
                payout: Math.round((req.counterBudget || req.budget) * 0.4),
                status: 'In Progress',
                dueDate: 'In 7 Days',
                deliverableFiles: [],
                feedback: null
              },
              {
                id: `m-${Date.now()}-2`,
                title: 'Milestone 2: Final High-Res Deliverables & Source Files',
                payout: Math.round((req.counterBudget || req.budget) * 0.6),
                status: 'Not Started',
                dueDate: req.deadline,
                deliverableFiles: [],
                feedback: null
              }
            ],
            taskChecklist: [
              { id: 't-init-1', text: 'Confirm brand tone and reference prompt parameters', done: true },
              { id: 't-init-2', text: 'Generate draft styleframes for review', done: false },
              { id: 't-init-3', text: 'Render final deliverables at 4K resolution', done: false }
            ],
            deliverableVersions: []
          };

          setProjects((pList) => [newProject, ...pList]);

          return { ...req, status: 'Accepted', projectId: newProjectId };
        } else if (responseAction === 'Decline') {
          return { ...req, status: 'Declined' };
        } else if (responseAction === 'Counteroffer') {
          return {
            ...req,
            status: 'Counteroffer',
            counterBudget: customData.counterBudget || req.budget * 1.15,
            counterNotes: customData.counterNotes || 'Proposed scope adjustment with expedited timeline.'
          };
        } else if (responseAction === 'Withdraw') {
          return { ...req, status: 'Declined' };
        }
        return req;
      })
    );

    addToast({
      title: `Collaboration Request ${responseAction}ed`,
      message: `Request update has been recorded and participants notified.`,
      type: responseAction === 'Accept' ? 'success' : 'info'
    });
  };

  // Chat Actions
  const sendMessage = (conversationId, messageText, attachment = null) => {
    if (!messageText && !attachment) return;

    const senderRole = currentRole === 'brand' ? 'brand' : 'creator';
    const senderName = senderRole === 'brand' ? brandProfile.name : activeCreatorProfile.name;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderRole,
      senderName,
      timestamp: 'Just now',
      text: messageText,
      attachment
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: messageText || 'Sent an attachment',
            lastTimestamp: 'Just now',
            messages: [...conv.messages, newMsg]
          };
        }
        return conv;
      })
    );

    // Realistic auto-reply simulation after 3 seconds for active engagement
    if (senderRole === 'brand') {
      setTimeout(() => {
        const autoReply = {
          id: `msg-auto-${Date.now()}`,
          senderRole: 'creator',
          senderName: 'Elena Rostova',
          timestamp: 'Just now',
          text: "Thanks for the feedback! I'm updating the ComfyUI workflow parameters right now and will push the new render shortly.",
          attachment: null
        };
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                lastMessage: autoReply.text,
                lastTimestamp: 'Just now',
                messages: [...conv.messages, autoReply]
              };
            }
            return conv;
          })
        );
      }, 3500);
    }
  };

  // Project Actions
  const uploadDeliverableVersion = (projectId, milestoneId, { title, notes, fileName, previewImage }) => {
    const newVersionObj = {
      version: `v${(Math.random() * 0.9 + 1.1).toFixed(1)}`,
      uploadedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: title || 'Updated Deliverable Package',
      notes: notes || 'High-res renders and audited generation seeds.',
      downloadUrl: '#',
      previewImage: previewImage || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      status: 'Submitted'
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updatedMilestones = p.milestones.map((m) => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status: 'Submitted',
              deliverableFiles: [
                ...m.deliverableFiles,
                { name: fileName || 'Deliverable_Package.zip', size: '210 MB', uploadedAt: 'Today' }
              ]
            };
          }
          return m;
        });

        return {
          ...p,
          status: 'Submitted',
          milestones: updatedMilestones,
          deliverableVersions: [newVersionObj, ...p.deliverableVersions]
        };
      })
    );

    addToast({
      title: 'Deliverable Version Uploaded!',
      message: 'Brand has been notified to review the new milestone submission.',
      type: 'success'
    });
  };

  const approveMilestone = (projectId, milestoneId) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        let releasedAmount = 0;
        const updatedMilestones = p.milestones.map((m) => {
          if (m.id === milestoneId) {
            releasedAmount = m.payout;
            return {
              ...m,
              status: 'Approved',
              feedback: 'Approved by Brand: Milestone released successfully.'
            };
          }
          return m;
        });

        const allApproved = updatedMilestones.every((m) => m.status === 'Approved');

        return {
          ...p,
          status: allApproved ? 'Completed' : 'In Progress',
          escrowReleased: p.escrowReleased + releasedAmount,
          progressPercent: allApproved ? 100 : Math.min(95, p.progressPercent + 30),
          milestones: updatedMilestones
        };
      })
    );

    addToast({
      title: 'Milestone Approved & Escrow Released!',
      message: 'Payment has been successfully transferred to the creator.',
      type: 'success'
    });
  };

  const requestProjectRevision = (projectId, milestoneId, feedbackText) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updatedMilestones = p.milestones.map((m) => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status: 'Revision Requested',
              feedback: feedbackText || 'Please adjust color grading and lighting reflections.'
            };
          }
          return m;
        });

        return {
          ...p,
          status: 'Revision Requested',
          milestones: updatedMilestones
        };
      })
    );

    addToast({
      title: 'Revision Request Sent',
      message: 'Creator has received your notes and is preparing a revised version.',
      type: 'info'
    });
  };

  // Evidence Actions
  const submitEvidence = ({ claimTitle, category, claimDescription, evidenceUrl, evidenceType }) => {
    const newEv = {
      id: `ev-${Date.now()}`,
      creatorId: activeCreatorProfile.id,
      claimTitle,
      category: category || 'Tool Mastery',
      claimDescription,
      evidenceUrl,
      evidenceType: evidenceType || 'Audited External Link',
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'under-review',
      verifierNotes: 'Verification submission queued for automated artifact inspection and human review.',
      hash: null
    };

    setEvidenceRecords((prev) => [newEv, ...prev]);
    addToast({
      title: 'Evidence Submitted for Review',
      message: 'Your claim has been submitted to the verification audit queue.',
      type: 'success'
    });
  };

  // Portfolio Actions
  const addPortfolioItem = (newItem) => {
    const item = {
      ...newItem,
      id: `port-${Date.now()}`
    };

    setActiveCreatorProfile((prev) => ({
      ...prev,
      portfolio: [item, ...prev.portfolio]
    }));

    setCreators((prev) =>
      prev.map((c) =>
        c.id === activeCreatorProfile.id
          ? { ...c, portfolio: [item, ...c.portfolio] }
          : c
      )
    );

    addToast({
      title: 'Portfolio Project Added',
      message: `"${item.title}" is now showcased on your public creator profile.`,
      type: 'success'
    });
  };

  const deletePortfolioItem = (portfolioId) => {
    setActiveCreatorProfile((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((p) => p.id !== portfolioId)
    }));

    setCreators((prev) =>
      prev.map((c) =>
        c.id === activeCreatorProfile.id
          ? { ...c, portfolio: c.portfolio.filter((p) => p.id !== portfolioId) }
          : c
      )
    );

    addToast({
      title: 'Portfolio Project Removed',
      message: 'Item has been deleted from your portfolio.',
      type: 'info'
    });
  };

  // Profile Updates
  const updateBrandProfile = (fields) => {
    setBrandProfile((prev) => ({ ...prev, ...fields }));
    addToast({
      title: 'Brand Profile Updated',
      message: 'Company profile and preferences successfully saved.',
      type: 'success'
    });
  };

  const updateCreatorProfile = (fields) => {
    setActiveCreatorProfile((prev) => ({ ...prev, ...fields }));
    setCreators((prev) =>
      prev.map((c) => (c.id === activeCreatorProfile.id ? { ...c, ...fields } : c))
    );
    addToast({
      title: 'Creator Profile Updated',
      message: 'Your profile changes are now active.',
      type: 'success'
    });
  };

  // Notification read toggle
  const markNotificationRead = (role, notifId) => {
    setNotifications((prev) => ({
      ...prev,
      [role]: prev[role].map((n) => (n.id === notifId ? { ...n, read: true } : n))
    }));
  };

  const markAllNotificationsRead = (role) => {
    setNotifications((prev) => ({
      ...prev,
      [role]: prev[role].map((n) => ({ ...n, read: true }))
    }));
    addToast({
      title: 'All Notifications Marked as Read',
      message: 'Your inbox is up to date.',
      type: 'info'
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentPage,
        switchRole,
        navigateTo,
        selectedCreatorId,
        setSelectedCreatorId,
        selectedCampaignId,
        setSelectedCampaignId,
        selectedProjectId,
        setSelectedProjectId,
        selectedConversationId,
        setSelectedConversationId,
        shortlistedCreatorIds,
        toggleShortlist,
        creators,
        campaigns,
        collaborationRequests,
        projects,
        conversations,
        evidenceRecords,
        notifications,
        brandProfile,
        activeCreatorProfile,
        toasts,
        addToast,
        removeToast,
        addCampaign,
        updateCampaign,
        duplicateCampaign,
        toggleCampaignStatus,
        sendCollaborationRequest,
        submitProposal,
        respondToRequest,
        sendMessage,
        uploadDeliverableVersion,
        approveMilestone,
        requestProjectRevision,
        submitEvidence,
        addPortfolioItem,
        deletePortfolioItem,
        updateBrandProfile,
        updateCreatorProfile,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
