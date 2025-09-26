/**
 * File chứa dữ liệu mẫu cho ứng dụng
 */

// Dữ liệu KPI cho dashboard
export const dashboardKpiData = {
  // Tổng hợp nhân sự
  totalEmployees: 150,
  officialEmployees: 135,
  probationEmployees: 15,
  
  // Biến động tháng
  newEmployees: 8,
  resignedEmployees: 3,
  netChange: 5
};

// Danh sách shortcuts cho dashboard
export const dashboardShortcuts = [
  {
    id: 'import_attendance',
    title: 'Import tổng hợp công',
    icon: 'import',
    path: '/attendance/import',
    disabled: false
  },
  {
    id: 'assessment_criteria',
    title: 'Quản lý bộ tiêu chí đánh giá',
    icon: 'audit',
    path: '/assessment/criteria',
    disabled: false
  },
  {
    id: 'add_employee',
    title: 'Thêm mới nhân sự',
    icon: 'user-add',
    path: '/employees/new',
    disabled: false
  }
];

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
    approver: 'Trần Văn B'
  },
  {
    id: 2,
    name: 'Đào tạo kỹ năng quản lý dự án',
    department: 'Phòng Kỹ thuật',
    creator: 'Lê Thị C',
    createdDate: '2025-07-10',
    status: 'PENDING',
    approver: null
  },
  {
    id: 3,
    name: 'Đào tạo kỹ năng bán hàng',
    department: 'Phòng Kinh doanh',
    creator: 'Phạm Văn D',
    createdDate: '2025-07-20',
    status: 'REJECTED',
    approver: 'Trần Văn B'
  }
];

// Danh sách kế hoạch đào tạo
export const trainingPlans = [
  {
    id: 1,
    name: 'Kế hoạch đào tạo Q3/2025',
    budget: 150000000,
    createdDate: '2025-06-20',
    creator: 'Trần Văn B',
    status: 'APPROVED'
  },
  {
    id: 2,
    name: 'Kế hoạch đào tạo Q4/2025',
    budget: 200000000,
    createdDate: '2025-09-15',
    creator: 'Trần Văn B',
    status: 'WAITING_APPROVAL'
  },
  {
    id: 3,
    name: 'Kế hoạch đào tạo 2026',
    budget: 500000000,
    createdDate: '2025-11-10',
    creator: 'Trần Văn B',
    status: 'DRAFT'
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
    key: 'organization',
    label: 'TỔ CHỨC',
    children: [
      { key: 'org:tree', label: 'Cây tổ chức' },
      { key: 'org:positions', label: 'Vị trí công việc' },
      { key: 'org:chart', label: 'Sơ đồ tổ chức' }
    ]
  },
  {
    key: 'personnel',
    label: 'NHÂN SỰ',
    children: [
      { key: 'personnel:list', label: 'Danh sách nhân sự' },
      { key: 'personnel:onboarding', label: 'Nhân sự mới' },
      { key: 'personnel:offboarding', label: 'Nghỉ việc' }
    ]
  },
  {
    key: 'salary',
    label: 'CÔNG-LƯƠNG',
    children: [
      { key: 'salary:attendance', label: 'Chấm công' },
      { key: 'salary:payroll', label: 'Tính lương' },
      { key: 'salary:reports', label: 'Báo cáo' }
    ]
  },
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
    key: 'recruitment',
    label: 'TUYỂN DỤNG',
    children: [
      { key: 'recruitment:requests', label: 'Yêu cầu tuyển dụng' },
      { key: 'recruitment:candidates', label: 'Ứng viên' },
      { key: 'recruitment:interviews', label: 'Phỏng vấn' }
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
