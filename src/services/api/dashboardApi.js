// import axios from 'axios'; // Sẽ sử dụng khi triển khai API thật
import { dashboardKpiData, dashboardShortcuts } from '../../data/mockData';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'; // Sẽ sử dụng khi triển khai API thật

export const dashboardApi = {
  /**
   * Lấy dữ liệu KPI cho dashboard
   * @returns {Promise} Promise chứa dữ liệu KPI
   */
  getKpis: async () => {
    try {
      // Giả lập API call với dữ liệu mẫu
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(dashboardKpiData);
        }, 500);
      });
      
      // Code gọi API thật
      // const response = await axios.get(`${API_URL}/dashboard/kpis`);
      // return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu KPI:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách shortcuts cho dashboard
   * @returns {Promise} Promise chứa danh sách shortcuts
   */
  getShortcuts: async () => {
    try {
      // Giả lập API call với dữ liệu mẫu
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(dashboardShortcuts);
        }, 500);
      });
      
      // Code gọi API thật
      // const response = await axios.get(`${API_URL}/dashboard/shortcuts`);
      // return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách shortcuts:', error);
      throw error;
    }
  }
};

export default dashboardApi;
