/**
 * Mock data cho Admin Dashboard
 * Theo spec: SCR_ADMIN_DASHBOARD
 */

// 5.1 Hero KPIs
export const heroKpis = {
  F1: { draft: 5, running: 3, dueSoon: 2, overdue: 1, responseRate: 78.5 },
  F2: { draft: 4, waitingApproval: 2, approved: 5, deployed: 3, completed: 1 },
  F3: { draft: 3, running: 2, grading: 1, resultsPublished: 4, finalized: 2 }
};

// 5.2 Progress Board
export const progressBoard = {
  progress: {
    F1: { completionPct: 65, todo: ["Gửi nhắc T-1 cho phòng KD", "Đóng survey Q3 – 2 ngày nữa"] },
    F2: { completionPct: 45, todo: ["Chờ duyệt L2 – KH Đào tạo Q4", "Xếp lịch lớp cho 2 khoá"] },
    F3: { completionPct: 80, todo: ["Nhắc chấm điểm vòng Q3", "Chuẩn bị công bố kết quả"] }
  }
};

// 5.3 Alerts (unified)
export const alerts = {
  alerts: [
    { id: "a1", flow: "F1", severity: "high", title: "Survey 'NCĐT Q4' quá hạn 1 ngày", action: { label: "Gửi nhắc", href: "/surveys/123/monitor" } },
    { id: "a2", flow: "F2", severity: "medium", title: "Kế hoạch đào tạo Q4 chờ duyệt L2 > 48h", action: { label: "Mở duyệt", href: "/training/plans/456/approvals" } },
    { id: "a3", flow: "F3", severity: "low", title: "Vòng đánh giá Q3 còn 12 bài chưa chấm", action: { label: "Đi tới chấm", href: "/assessment/rounds/789/grading" } }
  ]
};

// 5.4 Trends
export const trends = {
  f1Trends: [
    { month: "Apr", responseRate: 0.72, completion: 0.68 },
    { month: "May", responseRate: 0.74, completion: 0.70 },
    { month: "Jun", responseRate: 0.76, completion: 0.73 },
    { month: "Jul", responseRate: 0.77, completion: 0.74 },
    { month: "Aug", responseRate: 0.79, completion: 0.76 },
    { month: "Sep", responseRate: 0.81, completion: 0.78 }
  ],
  f2BudgetTrend: [
    { month: "Q1", plan: 180, actual: 150 },
    { month: "Q2", plan: 200, actual: 195 },
    { month: "Q3", plan: 220, actual: 210 },
    { month: "Q4", plan: 240, actual: 260 }
  ],
  f3ScoreTrend: [
    { month: "Apr", avg: 7.2, stdev: 0.8 },
    { month: "May", avg: 7.4, stdev: 0.7 },
    { month: "Jun", avg: 7.5, stdev: 0.7 },
    { month: "Jul", avg: 7.6, stdev: 0.6 },
    { month: "Aug", avg: 7.7, stdev: 0.6 },
    { month: "Sep", avg: 7.8, stdev: 0.5 }
  ],
  staffStats: {
    participated: 120,
    notParticipated: 15,
    declined: 5
  },
  teacherStats: {
    participated: 18,
    notParticipated: 2,
    replaced: 3
  },
  courseStats: {
    totalBudget: 1200000000,
    actualBudget: 950000000,
    extraBudget: 50000000
  }
};

// 5.5 Radar — Competency (Org Overview)
export const competencyRadar = {
  F3_radar_competency: {
    roundId: "2025Q3",
    labels: ["Giao tiếp", "Sáng tạo", "Ra quyết định", "Pháp luật", "Triển khai"],
    series: {
      max: [4, 4, 4, 4, 4],
      standard: [3, 3, 3, 3, 3],
      avg: [2.8, 3.2, 2.9, 2.7, 2.8]
    }
  }
};

// 5.6 Radar — Role Focus (dropdown Role/Org → đổi dataset)
export const roleRadar = {
  F3_radar_role: {
    role: "HR-EXEC",
    org: "HCM",
    roundId: "2025Q3",
    labels: ["Pháp luật", "Giao tiếp", "Triển khai", "Đào tạo & PTNS"],
    series: {
      max: [4, 4, 4, 4],
      roleStandard: [3, 2.5, 3, 3],
      orgAvg: [2.6, 2.2, 2.8, 2.7]
    },
    meta: { gapSum: 1.2, population: 63 }
  }
};

// Shortcuts
export const shortcuts = {
  F1: [
    { id: "s1", label: "Tạo khảo sát", icon: "form", href: "/surveys/new", enabled: true },
    { id: "s2", label: "Phân phối", icon: "share", href: "/surveys/123/distribute", enabled: true },
    { id: "s3", label: "Mở monitor", icon: "dashboard", href: "/surveys/123/monitor", enabled: true }
  ],
  F2: [
    { id: "s4", label: "Tạo kế hoạch", icon: "file-add", href: "/training/plans/new", enabled: true },
    { id: "s5", label: "Gửi phê duyệt", icon: "audit", href: "/training/plans/456/submit", enabled: true },
    { id: "s6", label: "Triển khai lớp", icon: "deployment-unit", href: "/training/plans/456/deploy", enabled: true }
  ],
  F3: [
    { id: "s7", label: "Tạo chiến dịch", icon: "trophy", href: "/assessment/campaigns/new", enabled: true },
    { id: "s8", label: "Đóng input & chấm", icon: "check-square", href: "/assessment/rounds/789/close-input", enabled: true },
    { id: "s9", label: "Công bố kết quả", icon: "file-done", href: "/assessment/rounds/789/publish", enabled: true }
  ]
};

// Roles và Organizations cho Role Radar
export const roles = [
  { value: "HR-EXEC", label: "HR Executive" },
  { value: "IT-DEV", label: "IT Developer" },
  { value: "SALES-REP", label: "Sales Representative" },
  { value: "MKT-SPEC", label: "Marketing Specialist" }
];

export const organizations = [
  { value: "HCM", label: "TP. Hồ Chí Minh" },
  { value: "HN", label: "Hà Nội" },
  { value: "DN", label: "Đà Nẵng" },
  { value: "ALL", label: "Toàn công ty" }
];

// Màu sắc theo spec
export const colors = {
  F1: {
    primary: "#7C4DFF",
    secondary: "#B39DDB"
  },
  F2: {
    primary: "#10BDBD",
    secondary: "#64D6D6"
  },
  F3: {
    primary: "#FF9800",
    secondary: "#FFCC80"
  },
  radar: {
    max: "#6CCF89",
    standard: "#3B82F6",
    avg: "#F59E0B"
  },
  severity: {
    high: "#f5222d",
    medium: "#faad14",
    low: "#52c41a"
  }
};

// Phân quyền theo vai trò
export const userRoles = {
  EMPLOYEE: {
    name: 'Nhân viên',
    permissions: ['survey.respond', 'survey.decline_with_reason', 'class.view', 'assessment.self_evaluate']
  },
  HR: {
    name: 'HR',
    permissions: ['survey.create', 'survey.distribute', 'plan.create', 'plan.adjust_request', 'alerts.send_reminder']
  },
  MANAGER: {
    name: 'Quản lý',
    permissions: ['plan.approve', 'plan.reject', 'plan.hold', 'plan.cancel', 'alerts.send_reminder']
  },
  ADMIN: {
    name: 'Admin',
    permissions: ['all']
  }
};

// Dữ liệu phản hồi khảo sát
export const surveyResponses = [
  { id: 'r1', surveyId: 's1', employeeId: 'e1', employeeName: 'Nguyễn Văn A', department: 'Nhân sự', status: 'responded', respondedAt: '2025-10-01', lastRemindedAt: null },
  { id: 'r2', surveyId: 's1', employeeId: 'e2', employeeName: 'Trần Thị B', department: 'Kỹ thuật', status: 'pending', respondedAt: null, lastRemindedAt: '2025-10-02' },
  { id: 'r3', surveyId: 's1', employeeId: 'e3', employeeName: 'Lê Văn C', department: 'Tài chính', status: 'declined', respondedAt: null, lastRemindedAt: '2025-10-01', declineReason: 'Đang trong thời gian nghỉ phép dài hạn' },
  { id: 'r4', surveyId: 's1', employeeId: 'e4', employeeName: 'Phạm Thị D', department: 'Kỹ thuật', status: 'responded', respondedAt: '2025-10-02', lastRemindedAt: null },
  { id: 'r5', surveyId: 's1', employeeId: 'e5', employeeName: 'Hoàng Văn E', department: 'Kinh doanh', status: 'pending', respondedAt: null, lastRemindedAt: '2025-10-03' },
];
