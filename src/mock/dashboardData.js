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
  F1_trend_6m: [
    { month: "Apr", responseRate: 72, completion: 68 },
    { month: "May", responseRate: 74, completion: 70 },
    { month: "Jun", responseRate: 76, completion: 73 },
    { month: "Jul", responseRate: 77, completion: 74 },
    { month: "Aug", responseRate: 79, completion: 76 },
    { month: "Sep", responseRate: 81, completion: 78 }
  ],
  F2_budget_6m: [
    { month: "Apr", plan: 180, actual: 150 },
    { month: "May", plan: 200, actual: 195 },
    { month: "Jun", plan: 220, actual: 210 },
    { month: "Jul", plan: 240, actual: 260 },
    { month: "Aug", plan: 260, actual: 255 },
    { month: "Sep", plan: 280, actual: 275 }
  ],
  F3_score_6m: [
    { month: "Apr", avg: 7.2, stdev: 0.8 },
    { month: "May", avg: 7.4, stdev: 0.7 },
    { month: "Jun", avg: 7.5, stdev: 0.7 },
    { month: "Jul", avg: 7.6, stdev: 0.6 },
    { month: "Aug", avg: 7.7, stdev: 0.6 },
    { month: "Sep", avg: 7.8, stdev: 0.5 }
  ]
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
