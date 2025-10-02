import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Component để tự động đăng nhập người dùng với quyền admin
 */
const AutoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Nếu chưa đăng nhập, tạo user admin mới
    if (!user || !user.role) {
      const adminUser = {
        id: 'admin-123',
        name: 'Admin User',
        email: 'admin@thadico.com',
        role: 'ADMIN',
        permissions: ['all']
      };
      
      // Lưu vào localStorage
      localStorage.setItem('user', JSON.stringify(adminUser));
      
      // Chuyển hướng đến trang dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

  return null; // Component này không render gì cả
};

export default AutoLogin;
