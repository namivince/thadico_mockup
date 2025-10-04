import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Component kiểm tra đăng nhập và chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
 */
const AutoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!user || !user.role) {
      // Xóa dữ liệu cũ nếu có
      localStorage.removeItem('user');
      
      // Chuyển hướng đến trang đăng nhập
      navigate('/login');
    }
  }, [navigate]);

  return null; // Component này không render gì cả
};

export default AutoLogin;
