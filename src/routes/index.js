import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

// Kiểm tra xem người dùng có quyền Admin không
const isAdmin = () => {
  // Đây là logic giả định, cần thay thế bằng logic thực tế
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.role === 'ADMIN';
};

// Route bảo vệ, chỉ cho phép Admin truy cập
const AdminRoute = ({ children }) => {
  if (!isAdmin()) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Route mặc định chuyển hướng đến dashboard nếu đã đăng nhập, ngược lại đến trang đăng nhập */}
      <Route path="/" element={
        isAdmin() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
      } />
      
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
      
      {/* Các route khác có thể được thêm vào đây */}
      
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
