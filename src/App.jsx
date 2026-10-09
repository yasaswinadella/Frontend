import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { BrandSidebar } from './components/common/BrandSidebar';
import { CreatorSidebar } from './components/common/CreatorSidebar';
import { WorkspaceTopbar } from './components/common/WorkspaceTopbar';
import { ToastContainer } from './components/common/ToastContainer';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { CreatorDirectoryPage } from './pages/public/CreatorDirectoryPage';
import { PublicCreatorDetailPage } from './pages/public/PublicCreatorDetailPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { AuthPage } from './pages/public/AuthPage';

// Brand Workspace Pages
import { BrandDashboardPage } from './pages/brand/BrandDashboardPage';
import { BrandProfilePage } from './pages/brand/BrandProfilePage';
import { MyCampaignsPage } from './pages/brand/MyCampaignsPage';
import { CreateCampaignPage } from './pages/brand/CreateCampaignPage';
import { AIBriefBuilderPage } from './pages/brand/AIBriefBuilderPage';
import { ExploreCreatorsPage } from './pages/brand/ExploreCreatorsPage';
import { BrandCreatorDetailPage } from './pages/brand/BrandCreatorDetailPage';
import { ShortlistComparePage } from './pages/brand/ShortlistComparePage';
import { BrandRequestsPage } from './pages/brand/BrandRequestsPage';
import { BrandProjectsPage } from './pages/brand/BrandProjectsPage';
import { BrandNotificationsPage } from './pages/brand/BrandNotificationsPage';
import { BrandSettingsPage } from './pages/brand/BrandSettingsPage';

// Creator Workspace Pages
import { CreatorDashboardPage } from './pages/creator/CreatorDashboardPage';
import { MyCreatorProfilePage } from './pages/creator/MyCreatorProfilePage';
import { PortfolioManagerPage } from './pages/creator/PortfolioManagerPage';
import { EvidenceVerificationPage } from './pages/creator/EvidenceVerificationPage';
import { AvailableCampaignsPage } from './pages/creator/AvailableCampaignsPage';
import { CreatorCampaignDetailPage } from './pages/creator/CreatorCampaignDetailPage';
import { SubmitProposalPage } from './pages/creator/SubmitProposalPage';
import { CreatorRequestsPage } from './pages/creator/CreatorRequestsPage';
import { CreatorProjectsPage } from './pages/creator/CreatorProjectsPage';
import { CreatorNotificationsPage } from './pages/creator/CreatorNotificationsPage';
import { CreatorSettingsPage } from './pages/creator/CreatorSettingsPage';
import { PublicProfilePreviewPage } from './pages/creator/PublicProfilePreviewPage';

const MainContent = () => {
  const { currentRole, currentPage } = useApp();

  // 1. PUBLIC MARKETPLACE VIEW
  if (currentRole === 'public') {
    return (
      <div className="app-container">
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 74px - 300px)' }}>
          {currentPage === 'landing' && <LandingPage />}
          {currentPage === 'directory' && <CreatorDirectoryPage />}
          {currentPage === 'creator-detail' && <PublicCreatorDetailPage />}
          {currentPage === 'how-it-works' && <HowItWorksPage />}
          {currentPage === 'auth' && <AuthPage />}
        </main>
        <Footer />
      </div>
    );
  }

  // 2. BRAND / AGENCY WORKSPACE VIEW
  if (currentRole === 'brand') {
    const getBrandHeader = () => {
      switch (currentPage) {
        case 'brand-dashboard':
          return { title: 'Brand Dashboard', subtitle: 'Overview of active campaigns, proposals, and escrow projects' };
        case 'brand-profile':
          return { title: 'Brand Profile', subtitle: 'Company identity, target audience, and AI aesthetic preferences' };
        case 'my-campaigns':
          return { title: 'My Campaigns', subtitle: 'Manage active procurement briefs, applicants, and statuses' };
        case 'create-campaign':
          return { title: 'Create Campaign / Edit Brief', subtitle: 'Define deliverables, technical tools, timeline, and escrow budget' };
        case 'ai-brief-builder':
          return { title: 'AI Brief Builder', subtitle: 'Autonomous prompt structuring and requirement optimization' };
        case 'explore-creators':
          return { title: 'Explore Creators', subtitle: 'Semantic talent search with explainable AI match scores' };
        case 'brand-creator-detail':
          return { title: 'Creator Profile Inspection', subtitle: 'Detailed verification evidence, strengths, and risk audit' };
        case 'shortlist-compare':
          return { title: 'Shortlist & Compare', subtitle: 'Side-by-side evaluation matrix across saved creators' };
        case 'brand-requests':
          return { title: 'Collaboration Requests', subtitle: 'Review creator proposals, invitations, and counteroffers' };
        case 'brand-projects':
          return { title: 'Projects & Deliverables', subtitle: 'Milestone tracking, version reviews, and escrow disbursement' };
        case 'brand-notifications':
          return { title: 'Notifications', subtitle: 'Important updates on campaign submissions and approvals' };
        case 'brand-settings':
          return { title: 'Brand Settings', subtitle: 'Manage billing, escrow rules, and security credentials' };
        default:
          return { title: 'Brand Workspace', subtitle: 'CreatorProof AI Enterprise Procurement' };
      }
    };

    const header = getBrandHeader();

    return (
      <div className="workspace-layout">
        <BrandSidebar />
        <div className="workspace-main">
          <WorkspaceTopbar title={header.title} subtitle={header.subtitle} />
          {currentPage === 'brand-dashboard' && <BrandDashboardPage />}
          {currentPage === 'brand-profile' && <BrandProfilePage />}
          {currentPage === 'my-campaigns' && <MyCampaignsPage />}
          {currentPage === 'create-campaign' && <CreateCampaignPage />}
          {currentPage === 'ai-brief-builder' && <AIBriefBuilderPage />}
          {currentPage === 'explore-creators' && <ExploreCreatorsPage />}
          {currentPage === 'brand-creator-detail' && <BrandCreatorDetailPage />}
          {currentPage === 'shortlist-compare' && <ShortlistComparePage />}
          {currentPage === 'brand-requests' && <BrandRequestsPage />}
          {currentPage === 'brand-projects' && <BrandProjectsPage />}
          {currentPage === 'brand-notifications' && <BrandNotificationsPage />}
          {currentPage === 'brand-settings' && <BrandSettingsPage />}
        </div>
      </div>
    );
  }

  // 3. AI CREATOR WORKSPACE VIEW
  if (currentRole === 'creator') {
    const getCreatorHeader = () => {
      switch (currentPage) {
        case 'creator-dashboard':
          return { title: 'Creator Dashboard', subtitle: 'Performance metrics, incoming invitations, and active engagements' };
        case 'creator-profile':
          return { title: 'My Creator Profile', subtitle: 'Public profile settings, declared tools, and commercial rights' };
        case 'portfolio-manager':
          return { title: 'Portfolio Manager', subtitle: 'Showcase generation renders and case study workflows' };
        case 'evidence-verification':
          return { title: 'Evidence & Verification', subtitle: 'Cryptographic node graphs, raw seeds, and proof audit status' };
        case 'available-campaigns':
          return { title: 'Available Campaigns', subtitle: 'Explore funded brand briefs with explainable suitability matching' };
        case 'creator-campaign-detail':
          return { title: 'Campaign Brief Details', subtitle: 'Review client requirements, technical specifications, and budget' };
        case 'submit-proposal':
          return { title: 'Submit Proposal', subtitle: 'Pitch your creative approach, delivery timeline, and milestones' };
        case 'creator-requests':
          return { title: 'Collaboration Requests', subtitle: 'Manage brand invitations, counteroffers, and proposal statuses' };
        case 'creator-projects':
          return { title: 'Active Engagements & Projects', subtitle: 'Deliverable version uploads and escrow payout tracking' };
        case 'creator-notifications':
          return { title: 'Creator Notifications', subtitle: 'Payout credits, invitation alerts, and evidence audit updates' };
        case 'creator-settings':
          return { title: 'Creator Settings', subtitle: 'Payout account routing, 2FA credentials, and discovery settings' };
        case 'public-profile-preview':
          return { title: 'Public Profile Preview', subtitle: 'Live true-to-brand preview of your profile and proof badge' };
        default:
          return { title: 'Creator Workspace', subtitle: 'CreatorProof AI Verified Creator Hub' };
      }
    };

    const header = getCreatorHeader();

    return (
      <div className="workspace-layout">
        <CreatorSidebar />
        <div className="workspace-main">
          <WorkspaceTopbar title={header.title} subtitle={header.subtitle} />
          {currentPage === 'creator-dashboard' && <CreatorDashboardPage />}
          {currentPage === 'creator-profile' && <MyCreatorProfilePage />}
          {currentPage === 'portfolio-manager' && <PortfolioManagerPage />}
          {currentPage === 'evidence-verification' && <EvidenceVerificationPage />}
          {currentPage === 'available-campaigns' && <AvailableCampaignsPage />}
          {currentPage === 'creator-campaign-detail' && <CreatorCampaignDetailPage />}
          {currentPage === 'submit-proposal' && <SubmitProposalPage />}
          {currentPage === 'creator-requests' && <CreatorRequestsPage />}
          {currentPage === 'creator-projects' && <CreatorProjectsPage />}
          {currentPage === 'creator-notifications' && <CreatorNotificationsPage />}
          {currentPage === 'creator-settings' && <CreatorSettingsPage />}
          {currentPage === 'public-profile-preview' && <PublicProfilePreviewPage />}
        </div>
      </div>
    );
  }

  return null;
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
