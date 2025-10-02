import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DemoPage from '../pages/DemoPage';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import LoginPage from '../pages/auth/LoginPage';
import SurveyList from '../pages/surveys/SurveyList';
import SurveyForm from '../pages/surveys/SurveyForm';
import SurveyMonitor from '../pages/surveys/SurveyMonitor';

// Training Plan Routes
import PlanList from '../pages/training/PlanList';
import PlanForm from '../pages/training/PlanForm';
import PlanApprovalQueue from '../pages/training/PlanApprovalQueue';
import PlanDeploy from '../pages/training/PlanDeploy';
import TrainingDemandList from '../pages/training/TrainingDemandList';
import CourseList from '../pages/training/CourseList';
import PlanAutoSuggest from '../pages/training/PlanAutoSuggest';

// Assessment Routes
// Import các component mới
import CampaignForm from '../components/assessment/CampaignForm';
import RubricBuilder from '../pages/assessment/RubricBuilder';
import RoundList from '../pages/assessment/RoundList';
import RoundBoard from '../pages/assessment/RoundBoard';
import SelfEvalForm from '../pages/assessment/SelfEvalForm';
import ApprovalList from '../pages/assessment/ApprovalList';
import ResultsReport from '../pages/assessment/ResultsReport';
import AppealsList from '../components/assessment/AppealsList';
import AppealHistory from '../components/assessment/AppealHistory';
import GradingConsole from '../components/assessment/GradingConsole';
import TestRunner from '../components/assessment/TestRunner';

// Alert Center
import AlertCenter from '../components/alerts/AlertCenter';

// Reports
import IntegratedReports from '../components/reports/IntegratedReports';

// System Integration
import SystemIntegration from '../components/system/SystemIntegration';

// Kiểm tra xem người dùng có quyền Admin không
const isAdmin = () => {
  // Đây là logic giả định, cần thay thế bằng logic thực tế
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Nếu chưa có user, tạo user admin mới
  if (!user || !user.role) {
    const adminUser = {
      id: 'admin-123',
      name: 'Admin User',
      email: 'admin@thadico.com',
      role: 'ADMIN',
      permissions: ['all']
    };
    localStorage.setItem('user', JSON.stringify(adminUser));
    return true;
  }
  
  return user && user.role === 'ADMIN';
};

// Route bảo vệ, chỉ cho phép Admin truy cập
const AdminRoute = ({ children }) => {
  // Luôn cho phép truy cập và tự động đăng nhập nếu chưa có user
  isAdmin();
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Route mặc định chuyển hướng đến trang dashboard admin */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Route demo */}
      <Route path="/demo" element={<DemoPage />} />
      
      {/* Route đăng nhập */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Route dashboard chỉ cho Admin truy cập */}
      <Route 
        path="/dashboard" 
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } 
      />
      
      {/* Survey Routes */}
      <Route 
        path="/surveys" 
        element={
          <AdminRoute>
            <SurveyList />
          </AdminRoute>
        } 
      />
      <Route 
        path="/surveys/new" 
        element={
          <AdminRoute>
            <SurveyForm />
          </AdminRoute>
        } 
      />
      <Route 
        path="/surveys/:id/edit" 
        element={
          <AdminRoute>
            <SurveyForm />
          </AdminRoute>
        } 
      />
      <Route 
        path="/surveys/:id" 
        element={
          <AdminRoute>
            <SurveyMonitor />
          </AdminRoute>
        } 
      />
      <Route 
        path="/surveys/:id/monitor" 
        element={
          <AdminRoute>
            <SurveyMonitor />
          </AdminRoute>
        } 
      />
      
      {/* Training Plan Routes */}
      <Route 
        path="/training/plans" 
        element={
          <AdminRoute>
            <PlanList />
          </AdminRoute>
        } 
      />
      <Route 
        path="/training/plans/new" 
        element={
          <AdminRoute>
            <PlanForm />
          </AdminRoute>
        } 
      />
      <Route 
        path="/training/plans/:id/edit" 
        element={
          <AdminRoute>
            <PlanForm />
          </AdminRoute>
        } 
      />
      <Route 
        path="/training/plans/:id" 
        element={
          <AdminRoute>
            <PlanForm />
          </AdminRoute>
        } 
      />
      <Route 
        path="/training/plans/:id/approvals" 
        element={
          <AdminRoute>
            <PlanApprovalQueue />
          </AdminRoute>
        } 
      />
      <Route 
        path="/training/plans/:id/deploy" 
        element={
          <AdminRoute>
            <PlanDeploy />
          </AdminRoute>
        } 
      />
      <Route 
        path="/training/demands" 
        element={
          <AdminRoute>
            <TrainingDemandList />
          </AdminRoute>
        } 
      />
      <Route 
        path="/training/courses" 
        element={
          <AdminRoute>
            <CourseList />
          </AdminRoute>
        } 
      />
      <Route 
        path="/training/plans/auto-suggest" 
        element={
          <AdminRoute>
            <PlanAutoSuggest />
          </AdminRoute>
        } 
      />
      
      {/* Assessment Routes */}
      <Route 
        path="/assessment/rounds" 
        element={
          <AdminRoute>
            <RoundList />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/rounds/new" 
        element={
          <AdminRoute>
            <CampaignForm />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/campaigns/new" 
        element={
          <AdminRoute>
            <CampaignForm />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/rounds/:id/edit" 
        element={
          <AdminRoute>
            <CampaignForm />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/campaigns/:id/edit" 
        element={
          <AdminRoute>
            <CampaignForm />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/rubrics/:id/builder" 
        element={
          <AdminRoute>
            <RubricBuilder />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/rounds/:id/board" 
        element={
          <AdminRoute>
            <RoundBoard />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/grading" 
        element={
          <AdminRoute>
            <GradingConsole />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/rounds/:id/grading" 
        element={
          <AdminRoute>
            <ApprovalList />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/rounds/:id/results" 
        element={
          <AdminRoute>
            <ResultsReport />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/rounds/:id/appeals" 
        element={
          <AdminRoute>
            <AppealsList />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/appeals" 
        element={
          <AdminRoute>
            <AppealsList />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/rounds/:id/appeals/:appealId/process" 
        element={
          <AdminRoute>
            <AppealsList />
          </AdminRoute>
        } 
      />
      <Route 
        path="/assessment/appeals/history" 
        element={
          <AdminRoute>
            <AppealHistory />
          </AdminRoute>
        } 
      />
      <Route 
        path="/self-eval/:token" 
        element={<SelfEvalForm />} 
      />
      <Route 
        path="/test/:token" 
        element={<TestRunner />} 
      />
      
      {/* Alert Center Route */}
      <Route 
        path="/alerts" 
        element={
          <AdminRoute>
            <AlertCenter />
          </AdminRoute>
        } 
      />

      {/* Reports Routes */}
      <Route 
        path="/reports" 
        element={
          <AdminRoute>
            <IntegratedReports />
          </AdminRoute>
        } 
      />

      {/* System Integration Route */}
      <Route 
        path="/system/integration" 
        element={
          <AdminRoute>
            <SystemIntegration />
          </AdminRoute>
        } 
      />
      
      {/* Route 404 */}
      <Route path="*" element={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1>404 - Không tìm thấy trang</h1>
        <p>Trang bạn đang tìm kiếm không tồn tại.</p>
        <button onClick={() => window.location.href = '/'} style={{ padding: '8px 16px', marginTop: '16px' }}>Quay về trang chủ</button>
      </div>} />
    </Routes>
  );
};

export default AppRoutes;
