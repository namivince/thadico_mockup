# SCR_ADMIN_DASHBOARD — Super Admin Overview

## Mô tả
Trang Dashboard chính cho Admin, hiển thị tổng quan về 3 luồng chính: Khảo sát (F1), Kế hoạch đào tạo (F2) và Đánh giá năng lực (F3). Trang này cung cấp các thông số KPI chính, tiến độ công việc, cảnh báo hợp nhất, biểu đồ xu hướng và các phân tích năng lực.

## Đối tượng người dùng
- Admin
- Quản lý cấp cao

## Chức năng chính
1. **Hiển thị Hero KPIs**
   - Hiển thị các chỉ số KPI chính cho 3 luồng:
     - F1 (Khảo sát): Số khảo sát nháp, đang chạy, sắp hết hạn, quá hạn, tỷ lệ phản hồi
     - F2 (Đào tạo): Số kế hoạch nháp, chờ duyệt, đã duyệt, đã triển khai, hoàn thành
     - F3 (Đánh giá): Số đợt đánh giá nháp, đang chạy, đang chấm, đã công bố, hoàn tất
   - Click vào KPI để điều hướng đến trang danh sách tương ứng với bộ lọc đã được thiết lập sẵn

2. **Theo dõi tiến độ công việc**
   - Hiển thị bảng tiến độ cho 3 luồng với % hoàn thành
   - Hiển thị danh sách việc cần làm dưới dạng pills
   - Click vào tiến độ để điều hướng đến module tương ứng

3. **Quản lý cảnh báo hợp nhất**
   - Hiển thị danh sách cảnh báo từ cả 3 luồng
   - Phân loại cảnh báo theo mức độ nghiêm trọng: cao, trung bình, thấp
   - Click vào cảnh báo để xem chi tiết và thực hiện hành động nhanh

4. **Xem biểu đồ xu hướng**
   - F1: Biểu đồ đường thể hiện tỷ lệ phản hồi khảo sát theo thòi gian
   - F2: Biểu đồ cột so sánh ngân sách kế hoạch và thực chi
   - F3: Biểu đồ điểm đánh giá trung bình theo thòi gian
   - Chọn khoảng thòi gian hiển thị: 3 tháng, 6 tháng, 12 tháng

5. **Phân tích năng lực bằng biểu đồ radar**
   - Competency Radar: So sánh năng lực tối đa, tiêu chuẩn và trung bình
   - Role Radar: So sánh năng lực theo vai trò và đơn vị
   - Chọn vai trò và đơn vị để xem dữ liệu tương ứng
6. **Truy cập nhanh các chức năng thường dùng**
   - F1: Tạo khảo sát, Phân phối, Mở monitor
   - F2: Tạo kế hoạch, Gửi phê duyệt, Triển khai lớp
   - F3: Tạo chiến dịch, Đóng input & chấm, Công bố kết quả

## Luồng màn hình
1. Người dùng truy cập vào trang Dashboard
2. Hệ thống hiển thị các thông số KPI, tiến độ, cảnh báo và biểu đồ
3. Người dùng có thể:
   - Click vào KPI để điều hướng đến trang danh sách tương ứng
   - Click vào tiến độ để điều hướng đến module tương ứng
   - Click vào cảnh báo để xem chi tiết và thực hiện hành động
   - Thay đổi khoảng thòi gian hiển thị của biểu đồ
   - Thay đổi vai trò và đơn vị để xem biểu đồ radar tương ứng
   - Click vào các shortcut để truy cập nhanh các chức năng

## Các thành phần UI
- Hero KPIs: 3 card hiển thị các chỉ số KPI chính cho 3 luồng
- Progress Board: Bảng tiến độ với thanh tiến độ và danh sách việc cần làm
- Alert Center: Danh sách cảnh báo hợp nhất với mức độ nghiêm trọng
- Trends Charts: Các biểu đồ xu hướng cho 3 luồng
- Radar Charts: Biểu đồ radar cho phân tích năng lực
- Shortcuts: Các nút truy cập nhanh các chức năng thường dùng

## Màu sắc
- F1 (Khảo sát): #7C4DFF (primary), #B39DDB (secondary)
- F2 (Đào tạo): #10BDBD (primary), #64D6D6 (secondary)
- F3 (Đánh giá): #FF9800 (primary), #FFCC80 (secondary)
- Radar:
  - Max: #6CCF89
  - Standard: #3B82F6
  - Average: #F59E0B
- Severity:
  - High: #f5222d
  - Medium: #faad14
  - Low: #52c41a

## Dữ liệu
```json
{
  "heroKpis": {
    "f1": {
      "draft": 5, 
      "running": 3, 
      "dueSoon": 2, 
      "overdue": 1, 
      "responseRate": 0.785
    },
    "f2": {
      "draft": 4, 
      "waitingApproval": 2, 
      "approved": 5, 
      "inAdjustment": 3,
      "onHold": 1, 
      "canceled": 0, 
      "deployed": 3, 
      "completed": 1,
      "budget": { "plan": 1200000000, "actual": 950000000 }
    },
    "f3": {
      "draft": 3, 
      "running": 2, 
      "grading": 4, 
      "resultsPublished": 6, 
      "finalized": 2,
      "avgScore": 7.8, 
      "gap": -0.2
    }
  },
  "progressBoard": {
    "f1": {
      "total": 10,
      "completed": 7,
      "inProgress": 3,
      "overdue": 1
    },
    "f2": {
      "total": 15,
      "completed": 9,
      "inProgress": 5,
      "onHold": 1
    },
    "f3": {
      "total": 12,
      "completed": 8,
      "inProgress": 4,
      "pending": 2
    }
  }
}
```

```json
{
  "alerts": [
    { "id": "a1", "flow": "F1", "type": "overdue", "title": "Khảo sát Q3 quá hạn 2 ngày", "dueAt": "2025-10-02", "severity": "high", "action": {"label": "Gửi nhắc", "href": "#"} },
    { "id": "a2", "flow": "F2", "type": "approvalSLA", "title": "Plan 2025 chờ duyệt L2 >48h", "dueAt": "2025-10-03", "severity": "medium", "action": {"label": "Mở phê duyệt", "href": "#"} },
    { "id": "a3", "flow": "F2", "type": "holdExpiring", "title": "Lớp \"Kỹ năng A\" on hold còn 1 ngày", "dueAt": "2025-10-05", "severity": "medium", "action": {"label": "Gia hạn", "href": "#"} },
    { "id": "a4", "flow": "F3", "type": "gradingSLA", "title": "Round Q4 còn 12h đến hạn chấm", "dueAt": "2025-10-01", "severity": "high", "action": {"label": "Mở chấm", "href": "#"} }
  ]
}

```json
{
  "trends": {
    "f1Trends": [
      { "month": "Apr", "responseRate": 0.72, "completion": 0.68 },
      { "month": "May", "responseRate": 0.74, "completion": 0.70 },
      { "month": "Jun", "responseRate": 0.76, "completion": 0.73 },
      { "month": "Jul", "responseRate": 0.77, "completion": 0.74 },
      { "month": "Aug", "responseRate": 0.79, "completion": 0.76 },
      { "month": "Sep", "responseRate": 0.81, "completion": 0.78 }
    ],
    "f2BudgetTrend": [
      { "month": "Q1", "plan": 180, "actual": 150 },
      { "month": "Q2", "plan": 200, "actual": 195 },
      { "month": "Q3", "plan": 220, "actual": 210 },
      { "month": "Q4", "plan": 240, "actual": 260 }
    ],
    "f3ScoreTrend": [
      { "month": "Apr", "avg": 7.2, "stdev": 0.8 },
      { "month": "May", "avg": 7.4, "stdev": 0.7 },
      { "month": "Jun", "avg": 7.5, "stdev": 0.7 },
      { "month": "Jul", "avg": 7.6, "stdev": 0.6 },
      { "month": "Sep", "avg": 7.8, "stdev": 0.5 }
    ]
  }
}

{
  "competencyRadar": {
    "F3_radar_competency": {
      "roundId": "2025Q3",
      "labels": ["Giao tiếp", "Sáng tạo", "Ra quyết định", "Pháp luật", "Triển khai"],
      "series": {
        "max": [4, 4, 4, 4, 4],
        "standard": [3, 3, 3, 3, 3],
        "avg": [2.8, 3.2, 2.9, 2.7, 2.8]
      }
    }
  },
  "roleRadar": {
    "F3_radar_role": {
      "role": "HR-EXEC",
      "org": "HCM",
      "roundId": "2025Q3",
      "labels": ["Pháp luật", "Giao tiếp", "Triển khai", "Đào tạo & PTNS"],
      "series": {
        "max": [4, 4, 4, 4],
        "roleStandard": [3, 2.5, 3, 3],
        "orgAvg": [2.6, 2.2, 2.8, 2.7],
      "meta": { "gapSum": 1.2, "population": 63 }
    }
  }
}

## Responsive Design
- Hero KPIs: 3 card → stack 1 cột trên mobile
- Progress Board & Alerts: 2/3 + 1/3 → stack trên mobile
- trends & Radar Charts: 2×2 grid → 1 cột trên mobile
- Shortcuts: Grid → danh sách trên mobile

## Ghi chú
- Các biểu đồ có trạng thái loading khi đang tải dữ liệu (300-800ms)
- Các KPI có tooltip hiển thị thông tin chi tiết khi hover
- Các biểu đồ radar có thể thay đổi dataset dựa trên vai trò và đơn vị được chọn
- Empty state hiển thị "No data" và gợi ý filter khi không có dữ liệu
- Shortcuts hiển thị theo quyền (demo: enable tất cả); click deep-link OK

## Cấu trúc component
- Dashboard/index.jsx
- Dashboard/HeroKPIs.jsx
- Dashboard/ProgressBoard.jsx
- Dashboard/UnifiedAlerts.jsx
- Dashboard/TrendsCharts.jsx
- Dashboard/RadarCharts.jsx
- Dashboard/QuickShortcuts.jsx