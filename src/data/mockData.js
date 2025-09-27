/**
 * File chứa dữ liệu mẫu cho ứng dụng
 */

// Dữ liệu KPI cho dashboard
export const dashboardKpiData = {
  // F1 - Surveys
  surveys: {
    draft: 5,
    running: 3,
    dueSoon: 2,
    overdue: 1,
    responseRate: 78.5
  },
  
  // F2 - Training Plans
  trainingPlans: {
    draft: 4,
    waitingApproval: 2,
    approved: 5,
    deployed: 3,
    completed: 1,
    budget: { plan: 1200000000, actual: 950000000 }
  },
  
  // F3 - Assessments
  assessments: {
    draft: 3,
    running: 2,
    grading: 4,
    resultsPublished: 6,
    finalized: 2,
    avgScore: 7.8,
    gap: 0.5
  },
  
  // Progress data
  progress: {
    f1: { completionPct: 65, pendingReminders: 12 },
    f2: { completionPct: 45, approvalsPending: 5 },
    f3: { completionPct: 80, gradingSLA: 3 }
  }
};

// Danh sách shortcuts cho dashboard
export const dashboardShortcuts = {
  // F1 - Surveys
  f1: [
    {
      id: 'create_survey',
      title: 'Tạo khảo sát',
      icon: 'form',
      path: '/surveys/new',
      disabled: false
    },
    {
      id: 'distribute_survey',
      title: 'Phân phối khảo sát',
      icon: 'share-alt',
      path: '/surveys/distribute',
      disabled: false
    },
    {
      id: 'monitor_survey',
      title: 'Mở monitor',
      icon: 'dashboard',
      path: '/surveys/monitor',
      disabled: false
    }
  ],
  
  // F2 - Training Plans
  f2: [
    {
      id: 'create_plan',
      title: 'Tạo kế hoạch',
      icon: 'file-add',
      path: '/training/plans/new',
      disabled: false
    },
    {
      id: 'submit_approval',
      title: 'Gửi phê duyệt',
      icon: 'audit',
      path: '/training/plans/approvals',
      disabled: false
    },
    {
      id: 'deploy_class',
      title: 'Triển khai lớp',
      icon: 'rocket',
      path: '/training/courses/new',
      disabled: false
    }
  ],
  
  // F3 - Assessments
  f3: [
    {
      id: 'create_campaign',
      title: 'Tạo chiến dịch',
      icon: 'trophy',
      path: '/assessment/rounds/new',
      disabled: false
    },
    {
      id: 'close_input',
      title: 'Đóng input & chấm',
      icon: 'lock',
      path: '/assessment/rounds/grading',
      disabled: false
    },
    {
      id: 'publish_results',
      title: 'Công bố kết quả',
      icon: 'notification',
      path: '/assessment/rounds/results',
      disabled: false
    }
  ]
};

// Danh sách người dùng mẫu
export const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'Nguyễn Phúc Vinh',
    role: 'ADMIN',
    email: 'admin@thadico.com',
    department: 'Ban Giám đốc',
    position: 'Giám đốc Nhân sự'
  },
  {
    id: 2,
    username: 'manager',
    password: 'manager123',
    name: 'Trần Văn Quản Lý',
    role: 'MANAGER',
    email: 'manager@thadico.com',
    department: 'Phòng Nhân sự',
    position: 'Trưởng phòng'
  },
  {
    id: 3,
    username: 'employee',
    password: 'employee123',
    name: 'Lê Thị Nhân Viên',
    role: 'EMPLOYEE',
    email: 'employee@thadico.com',
    department: 'Phòng Kỹ thuật',
    position: 'Nhân viên'
  }
];

// Danh sách phòng ban
export const departments = [
  {
    id: 1,
    name: 'Ban Giám đốc',
    code: 'BGD',
    level: 1,
    manager: 'Nguyễn Văn A',
    employeeCount: 5,
    planCount: 5,
    positionCount: 5
  },
  {
    id: 2,
    name: 'Phòng Nhân sự',
    code: 'PNS',
    level: 2,
    manager: 'Trần Văn B',
    employeeCount: 15,
    planCount: 20,
    positionCount: 20
  },
  {
    id: 3,
    name: 'Phòng Kỹ thuật',
    code: 'PKT',
    level: 2,
    manager: 'Lê Thị C',
    employeeCount: 45,
    planCount: 50,
    positionCount: 50
  },
  {
    id: 4,
    name: 'Phòng Kinh doanh',
    code: 'PKD',
    level: 2,
    manager: 'Phạm Văn D',
    employeeCount: 30,
    planCount: 35,
    positionCount: 35
  },
  {
    id: 5,
    name: 'Phòng Tài chính',
    code: 'PTC',
    level: 2,
    manager: 'Hoàng Thị E',
    employeeCount: 10,
    planCount: 10,
    positionCount: 10
  }
];

// Danh sách vòng đánh giá
export const assessmentRounds = [
  {
    id: 1,
    name: 'Đánh giá năng lực Q3/2025',
    startDate: '2025-07-01',
    endDate: '2025-07-15',
    objective: 'Đánh giá năng lực nhân viên quý 3',
    status: 'COMPLETED',
    creator: 'Nguyễn Phúc Vinh'
  },
  {
    id: 2,
    name: 'Đánh giá KPI Q3/2025',
    startDate: '2025-07-20',
    endDate: '2025-07-31',
    objective: 'Đánh giá KPI nhân viên quý 3',
    status: 'RUNNING',
    creator: 'Nguyễn Phúc Vinh'
  },
  {
    id: 3,
    name: 'Đánh giá năng lực Q4/2025',
    startDate: '2025-10-01',
    endDate: '2025-10-15',
    objective: 'Đánh giá năng lực nhân viên quý 4',
    status: 'DRAFT',
    creator: 'Nguyễn Phúc Vinh'
  }
];

// Danh sách nhu cầu đào tạo
export const trainingDemands = [
  {
    id: 1,
    name: 'Đào tạo kỹ năng lãnh đạo',
    department: 'Ban Giám đốc',
    creator: 'Nguyễn Văn A',
    createdDate: '2025-06-15',
    status: 'APPROVED',
    approver: 'Trần Văn B',
    description: 'Nâng cao kỹ năng lãnh đạo cho cấp quản lý cao',
    skills: ['Kỹ năng ra quyết định', 'Quản lý xung đột', 'Tư duy chiến lược']
  },
  {
    id: 2,
    name: 'Đào tạo kỹ năng quản lý dự án',
    department: 'Phòng Kỹ thuật',
    creator: 'Lê Thị C',
    createdDate: '2025-07-10',
    status: 'PENDING',
    approver: null,
    description: 'Nâng cao kỹ năng quản lý dự án cho team leader',
    skills: ['Agile/Scrum', 'Quản lý thời gian', 'Phân bổ nguồn lực']
  },
  {
    id: 3,
    name: 'Đào tạo kỹ năng bán hàng',
    department: 'Phòng Kinh doanh',
    creator: 'Phạm Văn D',
    createdDate: '2025-07-20',
    status: 'REJECTED',
    approver: 'Trần Văn B',
    description: 'Nâng cao kỹ năng bán hàng cho đội ngũ kinh doanh',
    skills: ['Kỹ năng thuyết trình', 'Kỹ năng đàm phán', 'Chăm sóc khách hàng']
  },
  {
    id: 4,
    name: 'Đào tạo Excel nâng cao',
    department: 'Phòng Kế toán',
    creator: 'Hoàng Thị E',
    createdDate: '2025-06-05',
    status: 'APPROVED',
    approver: 'Trần Văn B',
    description: 'Nâng cao kỹ năng sử dụng Excel cho nhân viên kế toán',
    skills: ['Hàm và công thức nâng cao', 'Pivot Table', 'VBA Macro']
  },
  {
    id: 5,
    name: 'Đào tạo tiếng Anh giao tiếp',
    department: 'Phòng Kinh doanh',
    creator: 'Nguyễn Thị F',
    createdDate: '2025-05-20',
    status: 'APPROVED',
    approver: 'Trần Văn B',
    description: 'Nâng cao kỹ năng tiếng Anh giao tiếp cho đội ngũ kinh doanh quốc tế',
    skills: ['Giao tiếp', 'Thương lượng', 'Viết email']
  },
  {
    id: 6,
    name: 'Đào tạo kỹ năng thuyết trình',
    department: 'Phòng Marketing',
    creator: 'Lê Văn G',
    createdDate: '2025-07-05',
    status: 'PENDING',
    approver: null,
    description: 'Nâng cao kỹ năng thuyết trình cho đội ngũ marketing',
    skills: ['Thuyết trình', 'Thiết kế slide', 'Kỹ năng trình bày']
  },
  {
    id: 7,
    name: 'Đào tạo Digital Marketing',
    department: 'Phòng Marketing',
    creator: 'Lê Văn G',
    createdDate: '2025-06-28',
    status: 'APPROVED',
    approver: 'Trần Văn B',
    description: 'Cập nhật kiến thức về Digital Marketing',
    skills: ['SEO', 'Google Ads', 'Social Media Marketing']
  },
  {
    id: 8,
    name: 'Đào tạo kỹ năng lập trình Python',
    department: 'Phòng Kỹ thuật',
    creator: 'Lê Thị C',
    createdDate: '2025-07-15',
    status: 'PENDING',
    approver: null,
    description: 'Đào tạo kỹ năng lập trình Python cho đội ngũ phát triển',
    skills: ['Python cơ bản', 'Data Analysis', 'Machine Learning']
  },
  {
    id: 9,
    name: 'Đào tạo quản lý thời gian',
    department: 'Phòng Nhân sự',
    creator: 'Trần Thị H',
    createdDate: '2025-05-10',
    status: 'APPROVED',
    approver: 'Nguyễn Văn A',
    description: 'Nâng cao kỹ năng quản lý thời gian cho toàn bộ nhân viên',
    skills: ['Lập kế hoạch', 'Sắp xếp ưu tiên', 'Quản lý công việc']
  },
  {
    id: 10,
    name: 'Đào tạo kỹ năng làm việc nhóm',
    department: 'Phòng Nhân sự',
    creator: 'Trần Thị H',
    createdDate: '2025-06-10',
    status: 'APPROVED',
    approver: 'Nguyễn Văn A',
    description: 'Nâng cao kỹ năng làm việc nhóm cho toàn bộ nhân viên',
    skills: ['Giao tiếp', 'Phối hợp', 'Giải quyết xung đột']
  },
  {
    id: 11,
    name: 'Đào tạo kỹ năng phỏng vấn',
    department: 'Phòng Nhân sự',
    creator: 'Trần Thị H',
    createdDate: '2025-07-01',
    status: 'PENDING',
    approver: null,
    description: 'Nâng cao kỹ năng phỏng vấn cho đội ngũ tuyển dụng',
    skills: ['Kỹ thuật phỏng vấn', 'Đánh giá ứng viên', 'Xây dựng bộ câu hỏi']
  },
  {
    id: 12,
    name: 'Đào tạo kỹ năng chăm sóc khách hàng',
    department: 'Phòng CSKH',
    creator: 'Võ Thị I',
    createdDate: '2025-06-20',
    status: 'APPROVED',
    approver: 'Trần Văn B',
    description: 'Nâng cao kỹ năng chăm sóc khách hàng cho đội ngũ CSKH',
    skills: ['Giao tiếp', 'Xử lý khiếu nại', 'Chăm sóc khách hàng VIP']
  },
  {
    id: 13,
    name: 'Đào tạo kỹ năng sử dụng Salesforce',
    department: 'Phòng Kinh doanh',
    creator: 'Phạm Văn D',
    createdDate: '2025-07-25',
    status: 'PENDING',
    approver: null,
    description: 'Đào tạo kỹ năng sử dụng Salesforce cho đội ngũ kinh doanh',
    skills: ['Quản lý lead', 'Báo cáo', 'Tự động hóa']
  },
  {
    id: 14,
    name: 'Đào tạo kỹ năng sử dụng PowerBI',
    department: 'Phòng Kế toán',
    creator: 'Hoàng Thị E',
    createdDate: '2025-06-15',
    status: 'REJECTED',
    approver: 'Trần Văn B',
    description: 'Đào tạo kỹ năng sử dụng PowerBI cho đội ngũ kế toán',
    skills: ['Tạo báo cáo', 'Phân tích dữ liệu', 'Trực quan hóa']
  },
  {
    id: 15,
    name: 'Đào tạo kỹ năng quản lý stress',
    department: 'Phòng Nhân sự',
    creator: 'Trần Thị H',
    createdDate: '2025-05-25',
    status: 'APPROVED',
    approver: 'Nguyễn Văn A',
    description: 'Nâng cao kỹ năng quản lý stress cho toàn bộ nhân viên',
    skills: ['Quản lý cảm xúc', 'Kỹ thuật thư giãn', 'Cân bằng công việc và cuộc sống']
  },
  {
    id: 16,
    name: 'Đào tạo kỹ năng sử dụng Adobe Photoshop',
    department: 'Phòng Marketing',
    creator: 'Lê Văn G',
    createdDate: '2025-07-10',
    status: 'PENDING',
    approver: null,
    description: 'Đào tạo kỹ năng sử dụng Adobe Photoshop cho đội ngũ marketing',
    skills: ['Chỉnh sửa ảnh', 'Thiết kế banner', 'Xử lý ảnh sản phẩm']
  },
  {
    id: 17,
    name: 'Đào tạo kỹ năng sử dụng Jira',
    department: 'Phòng Kỹ thuật',
    creator: 'Lê Thị C',
    createdDate: '2025-06-05',
    status: 'APPROVED',
    approver: 'Trần Văn B',
    description: 'Đào tạo kỹ năng sử dụng Jira cho đội ngũ phát triển',
    skills: ['Quản lý task', 'Agile board', 'Báo cáo']
  },
  {
    id: 18,
    name: 'Đào tạo kỹ năng viết email chuyên nghiệp',
    department: 'Phòng Hành chính',
    creator: 'Nguyễn Thị J',
    createdDate: '2025-07-15',
    status: 'PENDING',
    approver: null,
    description: 'Nâng cao kỹ năng viết email chuyên nghiệp cho toàn bộ nhân viên',
    skills: ['Cấu trúc email', 'Ngôn ngữ chuyên nghiệp', 'Email template']
  },
  {
    id: 19,
    name: 'Đào tạo kỹ năng sử dụng SAP',
    department: 'Phòng Kế toán',
    creator: 'Hoàng Thị E',
    createdDate: '2025-06-25',
    status: 'REJECTED',
    approver: 'Trần Văn B',
    description: 'Đào tạo kỹ năng sử dụng SAP cho đội ngũ kế toán',
    skills: ['SAP FI', 'SAP CO', 'Báo cáo tài chính']
  },
  {
    id: 20,
    name: 'Đào tạo kỹ năng an toàn thông tin',
    department: 'Phòng IT',
    creator: 'Trần Văn K',
    createdDate: '2025-07-01',
    status: 'APPROVED',
    approver: 'Nguyễn Văn A',
    description: 'Nâng cao ý thức về an toàn thông tin cho toàn bộ nhân viên',
    skills: ['Bảo mật mật khẩu', 'Nhận diện lửa đảo', 'Bảo vệ dữ liệu']
  }
];

// Danh sách kế hoạch đào tạo
export const trainingPlans = [
  {
    id: 1,
    name: 'Kế hoạch đào tạo 2025',
    year: 2025,
    description: 'Kế hoạch đào tạo toàn công ty năm 2025',
    budget: 500000000,
    createdAt: '2025-01-15',
    createdBy: 'Nguyễn Văn A',
    status: 'draft',
    items: 12,
    approvalLevel: 0,
    completionRate: 0,
    department: 'Phòng Nhân sự',
    objectives: ['Nâng cao kỹ năng lãnh đạo', 'Phát triển kỹ năng chuyên môn', 'Cải thiện ngoại ngữ']
  },
  {
    id: 2,
    name: 'Kế hoạch đào tạo Q2/2025',
    year: 2025,
    description: 'Kế hoạch đào tạo quý 2 năm 2025',
    budget: 250000000,
    createdAt: '2025-03-10',
    createdBy: 'Trần Thị B',
    status: 'waiting_approval',
    items: 8,
    approvalLevel: 1,
    completionRate: 0,
    department: 'Phòng Nhân sự',
    objectives: ['Nâng cao kỹ năng lãnh đạo', 'Phát triển kỹ năng chuyên môn']
  },
  {
    id: 3,
    name: 'Kế hoạch đào tạo kỹ năng lãnh đạo',
    year: 2025,
    description: 'Kế hoạch đào tạo kỹ năng lãnh đạo cho các cấp quản lý',
    budget: 350000000,
    createdAt: '2025-02-20',
    createdBy: 'Lê Văn C',
    status: 'approved',
    items: 5,
    approvalLevel: 3,
    completionRate: 0,
    department: 'Phòng Nhân sự',
    objectives: ['Nâng cao kỹ năng lãnh đạo', 'Phát triển kỹ năng quản lý']
  },
  {
    id: 4,
    name: 'Kế hoạch đào tạo nhân viên mới',
    year: 2025,
    description: 'Kế hoạch đào tạo nhân viên mới vào công ty',
    budget: 120000000,
    createdAt: '2025-01-05',
    createdBy: 'Phạm Thị D',
    status: 'deployed',
    items: 6,
    approvalLevel: 3,
    completionRate: 45,
    department: 'Phòng Nhân sự',
    objectives: ['Hội nhập nhân viên mới', 'Giới thiệu văn hóa công ty']
  },
  {
    id: 5,
    name: 'Kế hoạch đào tạo Q1/2025',
    year: 2025,
    description: 'Kế hoạch đào tạo quý 1 năm 2025',
    budget: 180000000,
    createdAt: '2025-01-02',
    createdBy: 'Nguyễn Văn A',
    status: 'completed',
    items: 10,
    approvalLevel: 3,
    completionRate: 100,
    department: 'Phòng Nhân sự',
    objectives: ['Nâng cao kỹ năng chuyên môn', 'Cập nhật kiến thức mới']
  }
];

// Danh sách khóa học đào tạo
export const trainingCourses = [
  { id: 1, name: 'Kỹ năng lãnh đạo cấp cao', category: 'Soft Skills', cost: 15000000 },
  { id: 2, name: 'Quản lý dự án', category: 'Management', cost: 12000000 },
  { id: 3, name: 'Tiếng Anh giao tiếp', category: 'Language', cost: 8000000 },
  { id: 4, name: 'Excel nâng cao', category: 'Technical', cost: 5000000 },
  { id: 5, name: 'Kỹ năng bán hàng', category: 'Sales', cost: 7000000 },
  { id: 6, name: 'Kỹ năng thuyết trình', category: 'Soft Skills', cost: 6000000 },
  { id: 7, name: 'Quản lý thời gian', category: 'Soft Skills', cost: 4000000 },
  { id: 8, name: 'Digital Marketing', category: 'Marketing', cost: 10000000 }
];

// Danh sách phê duyệt kế hoạch
export const planApprovals = [
  {
    planId: 2,
    approvals: [
      {
        level: 1,
        title: 'Trưởng phòng',
        approver: 'Nguyễn Văn A',
        status: 'approved',
        dueDate: '2025-03-20',
        completedDate: '2025-03-18',
        comment: 'Đã duyệt, cần lưu ý về ngân sách'
      },
      {
        level: 2,
        title: 'Giám đốc Nhân sự',
        approver: 'Lê Thị B',
        status: 'waiting',
        dueDate: '2025-03-25',
        completedDate: null,
        comment: null
      },
      {
        level: 3,
        title: 'Tổng Giám đốc',
        approver: 'Trần Văn C',
        status: 'pending',
        dueDate: '2025-03-30',
        completedDate: null,
        comment: null
      }
    ],
    comments: [
      {
        id: 1,
        author: 'Nguyễn Văn A',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: 'Kế hoạch này cần xem xét lại ngân sách cho khóa học tiếng Anh.',
        datetime: '2025-03-18 10:30',
        role: 'Trưởng phòng'
      },
      {
        id: 2,
        author: 'Trần Thị B',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: 'Đã điều chỉnh ngân sách theo góp ý.',
        datetime: '2025-03-18 11:15',
        role: 'HR Manager'
      }
    ],
    versions: [
      { id: 1, version: 1, createdAt: '2025-03-10', note: 'Phiên bản đầu tiên' },
      { id: 2, version: 2, createdAt: '2025-03-15', note: 'Cập nhật sau feedback' }
    ]
  }
];

// Danh sách lớp học đã triển khai
export const trainingClasses = [
  {
    id: 1,
    planId: 3,
    planItemId: 1,
    courseName: 'Kỹ năng lãnh đạo cấp cao',
    targetDepartment: 'Ban Giám đốc',
    status: 'scheduled',
    startDate: '2025-05-15',
    endDate: '2025-05-16',
    startTime: '08:30',
    endTime: '16:30',
    location: 'Phòng hỏp A',
    instructor: 'Nguyễn Văn X',
    participants: [
      { id: 1, name: 'Nguyễn Văn A', position: 'Giám đốc' },
      { id: 2, name: 'Trần Thị B', position: 'Phó Giám đốc' }
    ],
    estimatedCost: 100000000,
    actualCost: null,
    lmsLink: 'https://lms.thadico.com/course/123',
    quarter: 'Q2/2025'
  },
  {
    id: 2,
    planId: 3,
    planItemId: 2,
    courseName: 'Kỹ năng quản lý dự án',
    targetDepartment: 'Phòng Kỹ thuật',
    status: 'planned',
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    location: null,
    instructor: null,
    participants: [],
    estimatedCost: 120000000,
    actualCost: null,
    lmsLink: null,
    quarter: 'Q2/2025'
  },
  {
    id: 3,
    planId: 3,
    planItemId: 3,
    courseName: 'Kỹ năng quản lý nhóm',
    targetDepartment: 'Phòng Kinh doanh',
    status: 'planned',
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    location: null,
    instructor: null,
    participants: [],
    estimatedCost: 130000000,
    actualCost: null,
    lmsLink: null,
    quarter: 'Q3/2025'
  }
];

// Danh sách nhóm năng lực
export const competencyGroups = [
  {
    id: 1,
    code: 'KN',
    name: 'Kỹ năng',
    order: 1,
    weight: 40
  },
  {
    id: 2,
    code: 'TĐ',
    name: 'Thái độ',
    order: 2,
    weight: 30
  },
  {
    id: 3,
    code: 'KT',
    name: 'Kiến thức',
    order: 3,
    weight: 30
  }
];

// Danh sách năng lực
export const competencies = [
  {
    id: 1,
    code: 'KN01',
    name: 'Kỹ năng giao tiếp',
    description: 'Khả năng giao tiếp hiệu quả',
    order: 1,
    groupId: 1
  },
  {
    id: 2,
    code: 'KN02',
    name: 'Kỹ năng làm việc nhóm',
    description: 'Khả năng làm việc hiệu quả trong nhóm',
    order: 2,
    groupId: 1
  },
  {
    id: 3,
    code: 'TĐ01',
    name: 'Trách nhiệm',
    description: 'Tinh thần trách nhiệm trong công việc',
    order: 1,
    groupId: 2
  },
  {
    id: 4,
    code: 'TĐ02',
    name: 'Chủ động',
    description: 'Tính chủ động trong công việc',
    order: 2,
    groupId: 2
  },
  {
    id: 5,
    code: 'KT01',
    name: 'Kiến thức chuyên môn',
    description: 'Kiến thức chuyên môn về lĩnh vực',
    order: 1,
    groupId: 3
  }
];

// Dữ liệu mẫu cho menu
export const menuItems = [
 
  {
    key: 'assessment',
    label: 'ĐÁNH GIÁ',
    children: [
      { key: 'assessment:rounds', label: 'Vòng đánh giá' },
      { key: 'assessment:criteria', label: 'Bộ tiêu chí' },
      { key: 'assessment:competency', label: 'Từ điển năng lực' }
    ]
  },
  {
    key: 'training',
    label: 'ĐÀO TẠO',
    children: [
      { key: 'training:demands', label: 'Nhu cầu đào tạo' },
      { key: 'training:plans', label: 'Kế hoạch đào tạo' },
      { key: 'training:courses', label: 'Khóa học' }
    ]
  },
  {
    key: 'admin',
    label: 'QUẢN TRỊ',
    children: [
      { key: 'admin:proposals', label: 'Quản lý đề xuất' },
      { key: 'admin:surveys', label: 'Chương trình khảo sát' },
      { key: 'admin:categories', label: 'Danh mục' },
      { key: 'admin:positions', label: 'Chức danh' },
      { key: 'admin:system', label: 'Cấu hình hệ thống' }
    ]
  }
];

// Dữ liệu khảo sát mẫu
export const surveys = [
  {
    id: 1,
    name: 'Khảo sát nhu cầu đào tạo Q4/2025',
    description: 'Khảo sát để xác định nhu cầu đào tạo cho quý 4 năm 2025',
    status: 'running',
    startAt: '2025-09-20T00:00:00Z',
    dueAt: '2025-10-15T23:59:59Z',
    createdBy: 'Nguyễn Phúc Vinh',
    createdAt: '2025-09-15T10:00:00Z',
    totalInvitations: 150,
    totalResponses: 89,
    responseRate: 59.3,
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        text: 'Bạn muốn được đào tạo về lĩnh vực nào?',
        options: ['Kỹ năng lãnh đạo', 'Kỹ thuật chuyên môn', 'Ngoại ngữ', 'Tin học văn phòng'],
        required: true
      },
      {
        id: 2,
        type: 'rating',
        text: 'Đánh giá mức độ cần thiết của việc đào tạo?',
        scale: 5,
        required: true
      },
      {
        id: 3,
        type: 'text',
        text: 'Ghi chú thêm về nhu cầu đào tạo',
        required: false
      }
    ],
    audience: {
      departments: ['Phòng Kỹ thuật', 'Phòng Kinh doanh'],
      positions: ['Nhân viên', 'Trưởng nhóm'],
      totalUsers: 150
    }
  },
  {
    id: 2,
    name: 'Khảo sát hài lòng nhân viên 2025',
    description: 'Khảo sát mức độ hài lòng của nhân viên về môi trường làm việc',
    status: 'closed',
    startAt: '2025-08-01T00:00:00Z',
    dueAt: '2025-08-31T23:59:59Z',
    createdBy: 'Trần Văn B',
    createdAt: '2025-07-25T14:30:00Z',
    totalInvitations: 200,
    totalResponses: 185,
    responseRate: 92.5,
    questions: [
      {
        id: 1,
        type: 'rating',
        text: 'Mức độ hài lòng về môi trường làm việc',
        scale: 5,
        required: true
      },
      {
        id: 2,
        type: 'multiple_choice',
        text: 'Yếu tố nào bạn muốn cải thiện nhất?',
        options: ['Lương thưởng', 'Phúc lợi', 'Môi trường', 'Cơ hội thăng tiến'],
        required: true
      }
    ],
    audience: {
      departments: ['Tất cả phòng ban'],
      positions: ['Tất cả vị trí'],
      totalUsers: 200
    }
  },
  {
    id: 3,
    name: 'Khảo sát đánh giá khóa học Leadership',
    description: 'Đánh giá hiệu quả khóa học Leadership vừa kết thúc',
    status: 'draft',
    startAt: null,
    dueAt: null,
    createdBy: 'Lê Thị C',
    createdAt: '2025-09-25T09:15:00Z',
    totalInvitations: 0,
    totalResponses: 0,
    responseRate: 0,
    questions: [
      {
        id: 1,
        type: 'rating',
        text: 'Đánh giá chất lượng khóa học',
        scale: 5,
        required: true
      },
      {
        id: 2,
        type: 'text',
        text: 'Điều gì bạn thích nhất về khóa học?',
        required: false
      },
      {
        id: 3,
        type: 'text',
        text: 'Đề xuất cải thiện cho khóa học',
        required: false
      }
    ],
    audience: {
      departments: ['Ban Giám đốc', 'Phòng Nhân sự'],
      positions: ['Trưởng phòng', 'Phó phòng'],
      totalUsers: 25
    }
  }
];

// Dữ liệu phản hồi khảo sát mẫu
export const surveyResponses = [
  {
    id: 1,
    surveyId: 1,
    userId: 1,
    userName: 'Nguyễn Văn A',
    department: 'Phòng Kỹ thuật',
    submittedAt: '2025-09-22T10:30:00Z',
    answers: [
      { questionId: 1, value: 'Kỹ thuật chuyên môn' },
      { questionId: 2, value: 4 },
      { questionId: 3, value: 'Cần thêm khóa học về AI/ML' }
    ]
  },
  {
    id: 2,
    surveyId: 1,
    userId: 2,
    userName: 'Trần Thị B',
    department: 'Phòng Kinh doanh',
    submittedAt: '2025-09-23T14:15:00Z',
    answers: [
      { questionId: 1, value: 'Kỹ năng lãnh đạo' },
      { questionId: 2, value: 5 },
      { questionId: 3, value: 'Muốn học thêm về quản lý team' }
    ]
  }
];

// Dữ liệu analytics khảo sát
export const surveyAnalytics = {
  1: {
    responseRate: 59.3,
    departmentStats: [
      { department: 'Phòng Kỹ thuật', invited: 80, responded: 52, rate: 65 },
      { department: 'Phòng Kinh doanh', invited: 70, responded: 37, rate: 52.9 }
    ],
    questionStats: [
      {
        questionId: 1,
        type: 'multiple_choice',
        responses: [
          { option: 'Kỹ thuật chuyên môn', count: 45, percentage: 50.6 },
          { option: 'Kỹ năng lãnh đạo', count: 25, percentage: 28.1 },
          { option: 'Ngoại ngữ', count: 12, percentage: 13.5 },
          { option: 'Tin học văn phòng', count: 7, percentage: 7.8 }
        ]
      },
      {
        questionId: 2,
        type: 'rating',
        averageRating: 4.2,
        distribution: [
          { rating: 1, count: 2 },
          { rating: 2, count: 5 },
          { rating: 3, count: 18 },
          { rating: 4, count: 35 },
          { rating: 5, count: 29 }
        ]
      }
    ]
  }
};
