import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Lấy theme từ localStorage hoặc mặc định là dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsDark(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Đảm bảo dark theme được set nếu chưa có trong localStorage
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="theme-toggle">
      <div className="theme-toggle-container">
        <Button 
          type={!isDark ? 'primary' : 'default'}
          size="small"
          className="theme-button light"
          onClick={() => !isDark || toggleTheme()}
        >
          <BulbOutlined />
          Light
        </Button>
        <Button 
          type={isDark ? 'primary' : 'default'}
          size="small" 
          className="theme-button dark"
          onClick={() => isDark || toggleTheme()}
        >
          <BulbFilled />
          Dark
        </Button>
      </div>
      <Button size="small" className="reset-button">
        🔄 Reset Filters
      </Button>
    </div>
  );
};

export default ThemeToggle;
