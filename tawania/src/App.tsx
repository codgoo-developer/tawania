import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { GovernanceDataProvider } from './context/GovernanceDataContext';
import { ToastProvider } from './context/ToastContext';

// Pages
import { HomePage } from './pages/HomePage';
import { GovernancePage } from './pages/GovernancePage';
import { BoardPage } from './pages/BoardPage';
import { ExecutiveDirectorPage } from './pages/ExecutiveDirectorPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { MeetingsPage } from './pages/MeetingsPage';
import { MemberRegistrationPage } from './pages/MemberRegistrationPage';
import { MembersDirectoryPage } from './pages/MembersDirectoryPage';
import { GalleryPage } from './pages/GalleryPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { WhistleblowingPage } from './pages/WhistleblowingPage';
import { SurveysPage } from './pages/SurveysPage';
import { WorkshopDetailPage } from './pages/WorkshopDetailPage';
import { EthicsCharterPage } from './pages/EthicsCharterPage';
import { PolicyDetailPage } from './pages/PolicyDetailPage';
import { RegulationDetailPage } from './pages/RegulationDetailPage';
import { FinancialStatementsPage } from './pages/FinancialStatementsPage';
import { ContactPage } from './pages/ContactPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Common Layout Component
const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F6] text-[#17211E]">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

// Legacy Redirector for any /ar/* or /en/* URLs to strip language prefix
const LegacyPrefixRedirect: React.FC = () => {
  const location = useLocation();
  const cleanPath = location.pathname.replace(/^\/(ar|en)/, '') || '/';
  return <Navigate to={`${cleanPath}${location.search}${location.hash}`} replace />;
};

export default function App() {
  return (
    <ToastProvider>
    <AuthProvider>
      <GovernanceDataProvider>
        <Routes>
          {/* Standalone Dashboard and Login shortcuts without public layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Legacy language-prefixed routes redirect to clean routes */}
          <Route path="/ar/*" element={<LegacyPrefixRedirect />} />
          <Route path="/en/*" element={<LegacyPrefixRedirect />} />
          <Route path="/ar" element={<Navigate to="/" replace />} />
          <Route path="/en" element={<Navigate to="/" replace />} />

          {/* Direct clean routes matching Navbar */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="board" element={<BoardPage />} />
            <Route path="executive-director" element={<ExecutiveDirectorPage />} />
            <Route path="governance" element={<GovernancePage />} />
            <Route path="policies" element={<GovernancePage />} />
            <Route path="regulations" element={<GovernancePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="financial-statements" element={<FinancialStatementsPage />} />
            <Route path="ethics" element={<EthicsCharterPage />} />
            <Route path="policies/:policyId" element={<PolicyDetailPage />} />
            <Route path="regulations/:docId" element={<RegulationDetailPage />} />
            <Route path="workshops/:slug" element={<WorkshopDetailPage />} />
            <Route path="meetings" element={<MeetingsPage />} />
            <Route path="meetings/:type" element={<MeetingsPage />} />
            <Route path="members/register" element={<MemberRegistrationPage />} />
            <Route path="members/directory" element={<MembersDirectoryPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="whistleblowing" element={<WhistleblowingPage />} />
            <Route path="surveys" element={<SurveysPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="search" element={<SearchResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </GovernanceDataProvider>
    </AuthProvider>
    </ToastProvider>
  );
}
