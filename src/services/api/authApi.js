import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const authApi = {
  /**
   * Đăng nhập vào hệ thống
   * @param {string} username - Tên đăng nhập
   * @param {string} password - Mật khẩu
   * @returns {Promise} Promise chứa thông tin người dùng và token
   */
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      return response.data;
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      throw error;
    }
  },

  /**
   * Đăng xuất khỏi hệ thống
   * @returns {Promise} Promise xác nhận đăng xuất thành công
   */
  logout: async () => {
    try {
      // Trong môi trường thực tế, có thể gọi API để vô hiệu hóa token
      // const response = await axios.post(`${API_URL}/auth/logout`);
      // return response.data;
      
      // Trong demo, chỉ cần xóa thông tin người dùng khỏi localStorage
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
      throw error;
    }
  },

  /**
   * Kiểm tra trạng thái đăng nhập
   * @returns {boolean} Trạng thái đăng nhập
   */
  isLoggedIn: () => {
    const user = localStorage.getItem('user');
    return !!user;
  },

  /**
   * Lấy thông tin người dùng hiện tại
   * @returns {Object|null} Thông tin người dùng hoặc null nếu chưa đăng nhập
   */
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
      return null;
    }
  }
};

export default authApi;
