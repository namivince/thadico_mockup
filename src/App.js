import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import AppRoutes from './routes';
import AutoLogin from './components/auth/AutoLogin';
import './utils/resizeObserverFix';
import './App.css';

function App() {
  // Thêm basename cho GitHub Pages và Netlify
  const basename = process.env.REACT_APP_BASENAME || '';
  
  return (
    <ConfigProvider locale={viVN}>
      <BrowserRouter basename={basename}>
        <div className="app">
          <AutoLogin />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
