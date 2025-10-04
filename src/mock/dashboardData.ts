export const heroKpis = {
  f1: {
    draft: 5, 
    running: 3, 
    dueSoon: 2, 
    overdue: 1, 
    responseRate: 0.785,
  },
  f2: {
    draft: 4, 
    waitingApproval: 2, 
    approved: 5, 
    inAdjustment: 3,
    onHold: 1, 
    canceled: 0, 
    deployed: 3, 
    completed: 1,
    budget: { plan: 1_200_000_000, actual: 950_000_000 },
  },
  f3: {
    draft: 3, 
    running: 2, 
    grading: 4, 
    resultsPublished: 6, 
    finalized: 2,
    avgScore: 7.8, 
    gap: -0.2,
  }
};

export const alerts = [
  { id:'a1', flow:'F1', type:'overdue', title:'Khảo sát Q3 quá hạn 2 ngày', dueAt:'2025-10-02', severity:'high', action:{label:'Gửi nhắc', href:'#'} },
  { id:'a2', flow:'F2', type:'approvalSLA', title:'Plan 2025 chờ duyệt L2 >48h', dueAt:'2025-10-03', severity:'medium', action:{label:'Mở phê duyệt', href:'#'} },
  { id:'a3', flow:'F2', type:'holdExpiring', title:'Lớp "Kỹ năng A" on hold còn 1 ngày', dueAt:'2025-10-05', severity:'medium', action:{label:'Gia hạn', href:'#'} },
  { id:'a4', flow:'F3', type:'gradingSLA', title:'Round Q4 còn 12h đến hạn chấm', dueAt:'2025-10-01', severity:'high', action:{label:'Mở chấm', href:'#'} },
];

export const f1Trends = [
  { month:'05', responseRate:0.61, completion:0.55 },
  { month:'06', responseRate:0.67, completion:0.60 },
  { month:'07', responseRate:0.72, completion:0.66 },
  { month:'08', responseRate:0.75, completion:0.70 },
  { month:'09', responseRate:0.78, completion:0.72 },
  { month:'10', responseRate:0.81, completion:0.76 },
];

export const f2BudgetTrend = [
  { month:'Q1', plan:320, actual:280 },
  { month:'Q2', plan:300, actual:260 },
  { month:'Q3', plan:320, actual:290 },
  { month:'Q4', plan:260, actual:220 },
];

export const f3ScoreTrend = [
  { month:'05', avg:7.2, stdev:0.9 },
  { month:'06', avg:7.4, stdev:0.8 },
  { month:'07', avg:7.5, stdev:0.7 },
  { month:'08', avg:7.7, stdev:0.7 },
  { month:'09', avg:7.8, stdev:0.6 },
  { month:'10', avg:8.0, stdev:0.6 },
];

export const radarByDept = {
  dimensions: ['Giao tiếp','Sáng tạo','Ra quyết định','Pháp lý','Triển khai','Phát triển nhân sự'],
  standard:   [3,3,3,3,3,3],
  hr:         [3.2,2.8,3.1,2.9,3.0,3.2],
  finance:    [2.8,2.5,2.7,3.4,2.6,2.4],
  technical:  [3.5,3.1,3.3,2.7,3.6,3.0],
};

export const radarByRole = {
  dimensions: ['Giao tiếp','Sáng tạo','Ra quyết định','Pháp lý','Triển khai','Phát triển nhân sự'],
  standard:   [3,3,3,3,3,3],
  manager:    [3.5,3.2,3.6,3.4,3.2,3.7],
  specialist: [3.1,3.4,2.9,3.0,3.5,2.8],
  assistant:  [2.9,2.7,2.5,2.8,2.7,2.6],
};

export const courseStats = {
  deployed: 24,
  onHold: 3,
  canceled: 1,
  totalBudget: 1_200_000_000,
  actualBudget: 950_000_000,
  extraBudget: 50_000_000
};

export const staffStats = {
  participated: 120,
  notParticipated: 15,
  declined: 5
};

export const teacherStats = {
  participated: 18,
  notParticipated: 2,
  replaced: 3
};

export const subjectStats = {
  completed: 32,
  pending: 8
};

export const progressBoard = {
  f1: {
    total: 10,
    completed: 7,
    inProgress: 3,
    overdue: 1
  },
  f2: {
    total: 15,
    completed: 9,
    inProgress: 5,
    onHold: 1
  },
  f3: {
    total: 12,
    completed: 8,
    inProgress: 4,
    pending: 2
  }
};

export const surveyList = [
  { id: 's1', title: 'Khảo sát nhu cầu đào tạo Q4/2025', status: 'running', responseRate: 0.75, dueDate: '2025-10-15', department: 'Toàn công ty' },
  { id: 's2', title: 'Khảo sát đánh giá khóa học "Kỹ năng lãnh đạo"', status: 'running', responseRate: 0.82, dueDate: '2025-10-10', department: 'Phòng Nhân sự' },
  { id: 's3', title: 'Khảo sát đánh giá giảng viên Q3/2025', status: 'closed', responseRate: 0.91, dueDate: '2025-09-30', department: 'Toàn công ty' },
  { id: 's4', title: 'Khảo sát nhu cầu đào tạo kỹ năng mềm', status: 'draft', responseRate: 0, dueDate: '2025-10-20', department: 'Phòng Kỹ thuật' },
];

export const surveyResponses = [
  { id: 'r1', surveyId: 's1', employeeId: 'e1', employeeName: 'Nguyễn Văn A', department: 'Nhân sự', status: 'responded', respondedAt: '2025-10-01', lastRemindedAt: null },
  { id: 'r2', surveyId: 's1', employeeId: 'e2', employeeName: 'Trần Thị B', department: 'Kỹ thuật', status: 'pending', respondedAt: null, lastRemindedAt: '2025-10-02' },
  { id: 'r3', surveyId: 's1', employeeId: 'e3', employeeName: 'Lê Văn C', department: 'Tài chính', status: 'declined', respondedAt: null, lastRemindedAt: '2025-10-01', declineReason: 'Đang trong thời gian nghỉ phép dài hạn' },
  { id: 'r4', surveyId: 's1', employeeId: 'e4', employeeName: 'Phạm Thị D', department: 'Kỹ thuật', status: 'responded', respondedAt: '2025-10-02', lastRemindedAt: null },
  { id: 'r5', surveyId: 's1', employeeId: 'e5', employeeName: 'Hoàng Văn E', department: 'Kinh doanh', status: 'pending', respondedAt: null, lastRemindedAt: '2025-10-03' },
];

export const planApprovalQueue = [
  { id: 'pa1', planId: 'p1', planTitle: 'Kế hoạch đào tạo Q4/2025', type: 'add', reason: 'Bổ sung khóa học mới theo yêu cầu từ ban lãnh đạo', impact: { budget: 50000000, time: 14 }, requester: 'Nguyễn Thị F', requestedAt: '2025-10-01', dueDate: '2025-10-05', status: 'pending' },
  { id: 'pa2', planId: 'p2', planTitle: 'Kế hoạch đào tạo kỹ năng mềm 2025', type: 'reschedule', reason: 'Lùi lịch do trùng với sự kiện công ty', impact: { budget: 0, time: 7 }, requester: 'Trần Văn G', requestedAt: '2025-10-02', dueDate: '2025-10-06', status: 'pending' },
  { id: 'pa3', planId: 'p3', planTitle: 'Kế hoạch đào tạo nhân viên mới', type: 'replace', reason: 'Thay đổi giảng viên do giảng viên cũ bận lịch', impact: { budget: 5000000, time: 0 }, requester: 'Lê Thị H', requestedAt: '2025-09-30', dueDate: '2025-10-04', status: 'approved' },
  { id: 'pa4', planId: 'p4', planTitle: 'Kế hoạch đào tạo kỹ năng lãnh đạo', type: 'remove', reason: 'Hủy khóa học do không đủ số lượng học viên đăng ký', impact: { budget: -30000000, time: 0 }, requester: 'Phạm Văn I', requestedAt: '2025-10-03', dueDate: '2025-10-07', status: 'on_hold' },
];

export const classesList = [
  { id: 'c1', planId: 'p1', title: 'Kỹ năng giao tiếp hiệu quả', status: 'scheduled', startDate: '2025-10-15', endDate: '2025-10-16', teacher: 'Nguyễn Văn K', participants: 25, lmsStatus: 'synced', calendarStatus: 'synced' },
  { id: 'c2', planId: 'p1', title: 'Kỹ năng quản lý thời gian', status: 'pending_schedule', startDate: null, endDate: null, teacher: 'Trần Thị L', participants: 20, lmsStatus: 'pending', calendarStatus: 'pending' },
  { id: 'c3', planId: 'p2', title: 'Kỹ năng lãnh đạo nhóm', status: 'scheduled', startDate: '2025-10-20', endDate: '2025-10-22', teacher: 'Lê Văn M', participants: 15, lmsStatus: 'synced', calendarStatus: 'failed' },
  { id: 'c4', planId: 'p3', title: 'Kỹ năng thuyết trình', status: 'scheduled', startDate: '2025-10-25', endDate: '2025-10-26', teacher: 'Phạm Thị N', participants: 30, lmsStatus: 'failed', calendarStatus: 'pending' },
];

export const roles = ['manager', 'specialist', 'assistant'];
export const organizations = ['hr', 'finance', 'technical'];

export const shortcuts = [
  { id: 'sc1', title: 'Tạo khảo sát mới', icon: 'form', color: '#fa541c', href: '/surveys/new', flow: 'F1' },
  { id: 'sc2', title: 'Xem kết quả khảo sát', icon: 'bar-chart', color: '#fa541c', href: '/surveys', flow: 'F1' },
  { id: 'sc3', title: 'Tạo kế hoạch đào tạo', icon: 'book', color: '#13c2c2', href: '/training/plans/new', flow: 'F2' },
  { id: 'sc4', title: 'Phê duyệt kế hoạch', icon: 'check-circle', color: '#13c2c2', href: '/training/plans/approvals', flow: 'F2' },
  { id: 'sc5', title: 'Thực hiện kế hoạch', icon: 'rocket', color: '#13c2c2', href: '/training/plans/deploy', flow: 'F2' },
  { id: 'sc6', title: 'Tạo đợt đánh giá', icon: 'trophy', color: '#722ed1', href: '/assessment/rounds/new', flow: 'F3' },
  { id: 'sc7', title: 'Xem kết quả đánh giá', icon: 'line-chart', color: '#722ed1', href: '/assessment/rounds', flow: 'F3' },
  { id: 'sc8', title: 'Xuất báo cáo', icon: 'file-excel', color: '#52c41a', href: '/reports', flow: 'all' },
];

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
