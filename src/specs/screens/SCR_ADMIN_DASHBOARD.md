# SCR_ADMIN_DASHBOARD — Dashboard quản trị

## 0) Metadata
- Route: `/dashboard`
- Design: UI mẫu ảnh Dashboard (ảnh 14) - **ĐÃ CẬP NHẬT THÀNH GIAO DIỆN MỚI**
- Role access: Admin only
- **Phiên bản**: 2.0 - Hoàn toàn mới với 4 tabs và nhiều widgets chuyên nghiệp

## 1) Purpose
Trang tổng quan hiển thị các chỉ số nhân sự, biến động hàng tháng và cung cấp lối tắt đến các chức năng quản trị chính. **Đã được nâng cấp với giao diện hiện đại, nhiều tính năng và trải nghiệm người dùng tốt hơn.**

## 2) Layout - **ĐÃ CẬP NHẬT HOÀN TOÀN**

### 2.1) Header
- **Top mega-menu**: TỔ CHỨC / NHÂN SỰ / CÔNG-LƯƠNG / ĐÁNH GIÁ / TUYỂN DỤNG / ĐÀO TẠO / QUẢN TRỊ  
  - Submenu Master Data: Quản lý đề xuất, Chương trình khảo sát, Danh mục, Chức danh, Cấu hình hệ thống.
- **User menu**: Thông tin cá nhân, Đăng xuất
- **Gradient background** với hiệu ứng glass morphism

### 2.2) Main Content - **4 TABS MỚI**

#### Tab 1: "Tổng quan" 📊
- **KPI Widgets**:
  - Tổng hợp nhân sự: Tổng số, Chính thức, Thử việc (với hover effects)
  - Biến động tháng: Nhân sự mới, Nghỉ việc, Thay đổi ròng (với màu sắc động)

- **Main Dashboard Area**:
  - **Left Column (16/24)**:
    - **Biểu đồ phân bố nhân sự**: Progress bars theo phòng ban với tổng số ở trung tâm
    - **Widget hiệu suất**: Progress bars xu hướng 6 tháng với target indicators
  
  - **Right Column (8/24)**:
    - **Weather Widget**: Thời tiết hiện tại với icon động
    - **Tasks Widget**: Danh sách công việc cần làm với priority và progress
    - **System Status Widget**: Trạng thái hệ thống (Database, Server, Network, Security)

- **Shortcuts Section**:
  - Import tổng hợp công
  - Quản lý bộ tiêu chí đánh giá  
  - Thêm mới nhân sự
  - **Gradient buttons** với hover animations

#### Tab 2: "Lịch & Sự kiện" 📅
- **Calendar Widget**: 
  - Lịch tương tác với sự kiện được đánh dấu
  - Badge indicators cho các mức độ ưu tiên
- **Events Panel**:
  - Danh sách sự kiện sắp tới (7 ngày)
  - Chi tiết sự kiện khi chọn ngày
  - Color coding theo priority (high/medium/low)

#### Tab 3: "Hoạt động" 🔔
- **Recent Activities**:
  - Timeline hoạt động với icons và màu sắc
  - Thông tin user, timestamp với relative time
  - Animated timeline với hover effects
- **Notifications Panel**:
  - Thông báo với trạng thái đọc/chưa đọc
  - Badge counter cho thông báo mới
  - Priority icons và colors
- **Quick Stats**: Thống kê nhanh các chỉ số hoạt động

#### Tab 4: "Báo cáo" 📋
- **Report Generator**:
  - Dropdown chọn loại báo cáo (Chấm công, Hiệu suất, Phòng ban, Lương)
  - Date range picker
  - Preview table với pagination
- **Export Options**: Excel, PDF với progress indicators
- **Summary Statistics**: KPI tóm tắt cho từng loại báo cáo
- **Quick Actions**: Lưu template, Lên lịch gửi, Chia sẻ, In báo cáo

## 3) Actions - **ĐÃ MỞ RỘNG**

### 3.1) Tab Navigation
- Click tab → chuyển đổi giữa các màn hình
- Smooth transition animations
- Active tab highlighting với gradient

### 3.2) Widget Interactions
- **KPI Cards**: Click → điều hướng sang danh sách chi tiết (VD: `/people/list`)
- **Department Chart**: Hover → hiển thị tooltip chi tiết
- **Performance Bars**: Click → drill-down vào chi tiết tháng
- **Weather Widget**: Auto-refresh mỗi 30 phút
- **Tasks**: Click task → mở modal chi tiết, check/uncheck completion
- **System Status**: Click service → mở monitoring dashboard
- **Calendar**: 
  - Click ngày → hiển thị events của ngày đó
  - Click event → mở modal chi tiết event
- **Activities Timeline**: Click activity → mở chi tiết hoạt động
- **Notifications**: Click → đánh dấu đã đọc, click action button
- **Reports**: 
  - Change report type → update preview table
  - Click export → download file
  - Click quick actions → execute action

### 3.3) Menu Actions
- **Mega Menu**: Click menu item → điều hướng đến module
- **User Menu**: Click profile/logout → thực hiện action
- **Shortcuts**: Click → mở module tương ứng với gradient animation

## 4) APIs - **ĐÃ MỞ RỘNG**

### 4.1) Existing APIs
- `GET /api/dashboard/kpis` - Lấy dữ liệu KPI
- `GET /api/dashboard/shortcuts` - Lấy danh sách shortcuts

### 4.2) New APIs Added
- `GET /api/dashboard/department-stats` - Thống kê phòng ban
- `GET /api/dashboard/performance-trends` - Xu hướng hiệu suất
- `GET /api/dashboard/weather` - Thông tin thời tiết
- `GET /api/dashboard/tasks` - Danh sách công việc
- `PUT /api/dashboard/tasks/:id` - Cập nhật trạng thái task
- `GET /api/dashboard/system-status` - Trạng thái hệ thống
- `GET /api/dashboard/events` - Sự kiện lịch
- `GET /api/dashboard/activities` - Hoạt động gần đây
- `GET /api/dashboard/notifications` - Thông báo
- `PUT /api/dashboard/notifications/:id/read` - Đánh dấu đã đọc
- `POST /api/dashboard/reports/generate` - Tạo báo cáo
- `POST /api/dashboard/reports/export` - Export báo cáo

## 5) Rules / Validation - **ĐÃ CẬP NHẬT**

### 5.1) Access Control
- Widgets hiển thị theo role (Admin full quyền)
- Shortcut disabled nếu không có quyền
- Tab visibility theo permission
- Export functions chỉ cho Admin/Manager

### 5.2) Data Refresh
- **KPI data**: Cập nhật theo tháng hiện tại
- **Weather**: Auto-refresh 30 phút
- **System Status**: Real-time updates
- **Activities**: Real-time với WebSocket
- **Notifications**: Real-time push

### 5.3) Performance
- **Lazy loading**: Chỉ load data khi switch tab
- **Caching**: Cache data 5 phút cho widgets
- **Pagination**: Tables có pagination
- **Responsive**: Tối ưu cho mobile/tablet

## 6) Technical Implementation - **MỚI**

### 6.1) Components Created
- `AdminDashboard.jsx` - Main dashboard container
- `KpiWidget.jsx` - KPI cards
- `DepartmentChart.jsx` - Department distribution
- `PerformanceWidget.jsx` - Performance trends
- `CalendarWidget.jsx` - Calendar and events
- `RecentActivities.jsx` - Activities timeline
- `QuickReports.jsx` - Report generator
- `WeatherWidget.jsx` - Weather info
- `TasksWidget.jsx` - Task management
- `SystemStatusWidget.jsx` - System monitoring
- `MegaMenu.jsx` - Top navigation
- `ShortcutWidget.jsx` - Quick actions

### 6.2) Styling
- **CSS File**: `AdminDashboard.css`
- **Theme**: Gradient backgrounds, glass morphism
- **Animations**: Hover effects, smooth transitions
- **Responsive**: Mobile-first design
- **Colors**: Professional color palette

### 6.3) Dependencies
- `antd` - UI components
- `@ant-design/icons` - Icons
- `dayjs` - Date handling
- `react-router-dom` - Navigation

## 7) Changelog - **MỚI**

### Version 2.0 (2025-09-26)
- ✅ **MAJOR UPDATE**: Hoàn toàn thiết kế lại giao diện
- ✅ **NEW**: 4 tabs navigation system
- ✅ **NEW**: 10+ widgets mới với tính năng phong phú
- ✅ **NEW**: Gradient theme và glass morphism effects
- ✅ **NEW**: Real-time data và interactive elements
- ✅ **NEW**: Mobile responsive design
- ✅ **IMPROVED**: Performance với lazy loading
- ✅ **IMPROVED**: User experience với animations
- ✅ **FIXED**: Removed chart library errors
- ✅ **ADDED**: Comprehensive documentation
