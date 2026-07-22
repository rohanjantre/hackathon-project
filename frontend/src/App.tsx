import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './components/ui/toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { DocumentDashboard } from './pages/documents/DocumentDashboard';
import { UploadDocument } from './pages/documents/UploadDocument';
import { AssetDashboard } from './pages/assets/AssetDashboard';
import { AssetList } from './pages/assets/AssetList';
import { AssetDetails } from './pages/assets/AssetDetails';
import { CopilotChat } from './pages/copilot/CopilotChat';
import { GraphDashboard } from './pages/graph/GraphDashboard';
import { GraphExplorer } from './pages/graph/GraphExplorer';
import { ComplianceDashboard } from './pages/compliance/ComplianceDashboard';
import { ComplianceCases } from './pages/compliance/ComplianceCases';
import { PredictiveDashboard } from './pages/predictive/PredictiveDashboard';
import { PredictionsList } from './pages/predictive/PredictionsList';
import { WorkflowDashboard } from './pages/workflow/WorkflowDashboard';
import { WorkflowBuilder } from './pages/workflow/WorkflowBuilder';
import { TaskCenter } from './pages/workflow/TaskCenter';
import { ApprovalCenter } from './pages/workflow/ApprovalCenter';
import { NotificationCenter } from './pages/workflow/NotificationCenter';
import { ActivityTimeline } from './pages/workflow/ActivityTimeline';
import { PlatformDashboard } from './pages/platform/PlatformDashboard';
import { Organization } from './pages/platform/Organization';
import { SystemSettings } from './pages/platform/SystemSettings';
import { AuditLogs } from './pages/platform/AuditLogs';
import { ExecutiveDashboard } from './pages/analytics/ExecutiveDashboard';
import { BusinessIntelligence } from './pages/analytics/BusinessIntelligence';
import { PlantComparison } from './pages/analytics/PlantComparison';
import { CostAnalytics } from './pages/analytics/CostAnalytics';
import { ControlRoom } from './pages/decision/ControlRoom';
import { DecisionQueue } from './pages/decision/DecisionQueue';
import { AISituationRoom } from './pages/decision/AISituationRoom';

import { DashboardLayout } from './components/layout/DashboardLayout';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-600/30 selection:text-sky-400">
    <Navbar />
    <main className="flex-1 flex flex-col">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const ProtectedLayout = () => {
  // const { isAuthenticated } = useAuth();
  // Temporarily commenting out auth redirect for easy testing during development
  // if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      
      {/* Protected Routes */}
      <Route element={<ProtectedLayout />}>
        {/* Document Routes */}
        <Route path="/documents" element={<DocumentDashboard />} />
        <Route path="/documents/upload" element={<UploadDocument />} />
        {/* Asset Digital Twin Routes */}
        <Route path="/assets" element={<AssetDashboard />} />
        <Route path="/assets/list" element={<AssetList />} />
        <Route path="/assets/:id" element={<AssetDetails />} />

        {/* AI Copilot Route */}
        <Route path="/copilot" element={<CopilotChat />} />

        {/* Knowledge Graph Routes */}
        <Route path="/graph" element={<GraphDashboard />} />
        <Route path="/graph/explorer" element={<GraphExplorer />} />

        {/* Compliance & RCA Routes */}
        <Route path="/compliance" element={<ComplianceDashboard />} />
        <Route path="/compliance/cases" element={<ComplianceCases />} />

        {/* Predictive AI Routes */}
        <Route path="/predictive" element={<PredictiveDashboard />} />
        <Route path="/predictive/predictions" element={<PredictionsList />} />

        {/* Workflow & Notifications */}
        <Route path="/workflow" element={<WorkflowDashboard />} />
        <Route path="/workflow/builder" element={<WorkflowBuilder />} />
        <Route path="/workflow/tasks" element={<TaskCenter />} />
        <Route path="/workflow/approvals" element={<ApprovalCenter />} />
        <Route path="/workflow/notifications" element={<NotificationCenter />} />
        <Route path="/workflow/activity" element={<ActivityTimeline />} />
        
        {/* Platform Administration */}
        <Route path="/platform" element={<PlatformDashboard />} />
        <Route path="/platform/organization" element={<Organization />} />
        <Route path="/platform/settings" element={<SystemSettings />} />
        <Route path="/platform/audit" element={<AuditLogs />} />
        
        {/* Executive Command Center & Analytics */}
        <Route path="/analytics" element={<ExecutiveDashboard />} />
        <Route path="/analytics/bi" element={<BusinessIntelligence />} />
        <Route path="/analytics/plants" element={<PlantComparison />} />
        <Route path="/analytics/costs" element={<CostAnalytics />} />
        
        {/* AI Decision Intelligence & Digital Control Room */}
        <Route path="/decision" element={<ControlRoom />} />
        <Route path="/decision/queue" element={<DecisionQueue />} />
        <Route path="/decision/situation-room" element={<AISituationRoom />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}
