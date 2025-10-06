# 📘 Tài liệu Kỹ thuật - Thadico HRM System

**Phiên bản:** 2.0  
**Ngày cập nhật:** 2025-10-06  
**Tác giả:** Nguyễn Phúc Vinh

---

## 📋 Mục lục

1. [Tổng quan Hệ thống](#1-tổng-quan-hệ-thống)
2. [Kiến trúc Hệ thống](#2-kiến-trúc-hệ-thống)
3. [Công nghệ Sử dụng](#3-công-nghệ-sử-dụng)
4. [Module Chi tiết](#4-module-chi-tiết)
5. [API Documentation](#5-api-documentation)
6. [Database Schema](#6-database-schema)
7. [Bảo mật](#7-bảo-mật)
8. [Deployment](#8-deployment)
9. [Monitoring & Logging](#9-monitoring--logging)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Tổng quan Hệ thống

### 1.1. Giới thiệu

Thadico HRM là hệ thống quản lý đào tạo và đánh giá nhân sự toàn diện, bao gồm 3 module chính:

- **F1 - Đánh giá Năng lực:** Đánh giá năng lực nhân viên theo bộ tiêu chí chuẩn
- **F2 - Khảo sát & Phân tích:** Thu thập và phân tích nhu cầu đào tạo
- **F3 - Lập kế hoạch Đào tạo:** Lập kế hoạch và triển khai đào tạo

### 1.2. Yêu cầu Hệ thống

#### Client:
- **Browser:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Screen:** Tối thiểu 1280x720px
- **Internet:** Tối thiểu 2 Mbps

#### Server:
- **OS:** Ubuntu 20.04 LTS hoặc CentOS 8+
- **RAM:** Tối thiểu 8GB (khuyến nghị 16GB)
- **CPU:** 4 cores (khuyến nghị 8 cores)
- **Storage:** 100GB SSD (khuyến nghị 500GB)
- **Database:** PostgreSQL 13+ hoặc MySQL 8+

---

## 2. Kiến trúc Hệ thống

### 2.1. Kiến trúc Tổng thể

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Web App  │  │Mobile App│  │  Admin   │              │
│  │ (React)  │  │(React N.)│  │ Portal   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
                        ↓ HTTPS/WSS
┌─────────────────────────────────────────────────────────┐
│                   API GATEWAY                            │
│  ┌──────────────────────────────────────────┐           │
│  │  Nginx / Kong API Gateway                │           │
│  │  - Load Balancing                        │           │
│  │  - Rate Limiting                         │           │
│  │  - Authentication                        │           │
│  └──────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                 APPLICATION LAYER                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │Assessment│  │  Survey  │  │ Training │              │
│  │ Service  │  │ Service  │  │ Service  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │   Auth   │  │Notification│ │Analytics │              │
│  │ Service  │  │  Service │  │ Service  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                   DATA LAYER                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │PostgreSQL│  │  Redis   │  │  MinIO   │              │
│  │(Primary) │  │  (Cache) │  │ (Storage)│              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

### 2.2. Microservices Architecture

Hệ thống được thiết kế theo kiến trúc Microservices với các service độc lập:

#### Assessment Service:
- Quản lý bộ tiêu chí đánh giá
- Tạo và quản lý chiến dịch
- Thu thập và xử lý kết quả đánh giá
- Phân tích gap năng lực

#### Survey Service:
- Tạo và quản lý khảo sát
- Phân phối khảo sát
- Thu thập phản hồi
- Phân tích kết quả

#### Training Service:
- Quản lý khóa học
- Lập kế hoạch đào tạo
- Quản lý lớp học
- Theo dõi tiến độ

#### Auth Service:
- Xác thực người dùng
- Quản lý phân quyền
- SSO integration
- 2FA

#### Notification Service:
- Email notifications
- SMS notifications
- Push notifications
- In-app notifications

#### Analytics Service:
- Data aggregation
- Report generation
- AI/ML predictions
- Dashboard metrics

---

## 3. Công nghệ Sử dụng

### 3.1. Frontend Stack

#### Core:
- **React 18.2** - UI library
- **React Router 6** - Client-side routing
- **Redux Toolkit** - State management
- **Ant Design 5** - UI component library

#### Build Tools:
- **Vite** - Build tool & dev server
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting

#### Utilities:
- **Axios** - HTTP client
- **Day.js** - Date manipulation
- **Chart.js** - Data visualization
- **React Query** - Data fetching & caching

### 3.2. Backend Stack

#### Core:
- **Node.js 18 LTS** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety

#### Database:
- **PostgreSQL 14** - Primary database
- **Prisma** - ORM
- **Redis 7** - Caching & session

#### Authentication:
- **Passport.js** - Authentication middleware
- **JWT** - Token-based auth
- **bcrypt** - Password hashing

#### File Storage:
- **MinIO** - Object storage (S3-compatible)
- **Sharp** - Image processing

#### Message Queue:
- **Bull** - Job queue
- **Redis** - Queue backend

### 3.3. DevOps Stack

#### Containerization:
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

#### CI/CD:
- **GitHub Actions** - CI/CD pipeline
- **Jest** - Unit testing
- **Cypress** - E2E testing

#### Monitoring:
- **Prometheus** - Metrics collection
- **Grafana** - Metrics visualization
- **Sentry** - Error tracking
- **Winston** - Logging

---

## 4. Module Chi tiết

### 4.1. F1 - Đánh giá Năng lực

#### 4.1.1. Thiết lập Danh mục

**Endpoint:** `GET /api/assessment/rubrics`

**Chức năng:**
- Tạo/sửa/xóa bộ tiêu chí
- Import/Export Excel
- Quản lý tiêu chí con
- Thiết lập thang điểm

**Database Tables:**
```sql
-- Bảng bộ tiêu chí
CREATE TABLE rubrics (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    status VARCHAR(50),
    created_by UUID,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Bảng tiêu chí
CREATE TABLE criteria (
    id UUID PRIMARY KEY,
    rubric_id UUID REFERENCES rubrics(id),
    code VARCHAR(50),
    name VARCHAR(255),
    description TEXT,
    type VARCHAR(50), -- scale, mcq, essay
    weight INTEGER,
    order_index INTEGER,
    config JSONB
);
```

#### 4.1.2. Tạo Chiến dịch

**Endpoint:** `POST /api/assessment/campaigns`

**Request Body:**
```json
{
  "name": "Đánh giá Q4/2025",
  "rubric_id": "uuid",
  "start_date": "2025-10-01",
  "end_date": "2025-10-31",
  "scope": {
    "type": "department", // all, department, individual
    "departments": ["uuid1", "uuid2"]
  },
  "evaluation_type": "360", // self, manager, 360
  "settings": {
    "allow_self_eval": true,
    "require_manager_approval": true,
    "anonymous": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Đánh giá Q4/2025",
    "status": "draft",
    "total_participants": 150,
    "created_at": "2025-10-01T00:00:00Z"
  }
}
```

#### 4.1.3. Thực hiện Đánh giá

**Workflow:**
```
1. Admin tạo chiến dịch → Status: DRAFT
2. Admin phát hành → Status: PUBLISHED
   ↓
3. System gửi email thông báo
   ↓
4. Nhân viên tự đánh giá → Status: SELF_COMPLETED
   ↓
5. Quản lý đánh giá → Status: MANAGER_COMPLETED
   ↓
6. System tính toán kết quả → Status: CALCULATED
   ↓
7. Admin công bố → Status: PUBLISHED_RESULTS
```

**API Endpoints:**
- `POST /api/assessment/campaigns/:id/publish` - Phát hành
- `GET /api/assessment/campaigns/:id/participants` - Danh sách người tham gia
- `POST /api/assessment/evaluations` - Submit đánh giá
- `GET /api/assessment/campaigns/:id/progress` - Tiến độ

#### 4.1.4. Kết quả Đánh giá

**Endpoint:** `GET /api/assessment/campaigns/:id/results`

**Response:**
```json
{
  "campaign": {
    "id": "uuid",
    "name": "Đánh giá Q4/2025",
    "completion_rate": 95.5
  },
  "summary": {
    "total_participants": 150,
    "completed": 143,
    "average_score": 3.8,
    "score_distribution": {
      "excellent": 25,
      "good": 80,
      "average": 30,
      "poor": 8
    }
  },
  "top_performers": [...],
  "improvement_needed": [...],
  "gap_analysis": {
    "communication": -0.5,
    "teamwork": 0.2,
    "technical": -0.8
  }
}
```

---

### 4.2. F2 - Khảo sát & Phân tích

#### 4.2.1. Tạo Khảo sát

**Endpoint:** `POST /api/surveys`

**Request Body:**
```json
{
  "title": "Khảo sát nhu cầu Q4/2025",
  "description": "Khảo sát để xác định nhu cầu đào tạo",
  "start_date": "2025-10-01",
  "end_date": "2025-10-15",
  "target_audience": {
    "type": "filter", // all, department, filter
    "filter": {
      "assessment_score": { "lt": 3.5 },
      "departments": ["uuid1"]
    }
  },
  "questions": [
    {
      "type": "multiple_choice",
      "question": "Bạn muốn học khóa nào?",
      "options": ["Kỹ năng lãnh đạo", "Excel", "Marketing"],
      "allow_multiple": true
    },
    {
      "type": "rating",
      "question": "Mức độ quan tâm?",
      "scale": 5
    }
  ]
}
```

#### 4.2.2. Phân phối Khảo sát

**Workflow:**
```
1. Tạo khảo sát → Status: DRAFT
2. Phát hành → Status: ACTIVE
   ↓
3. System gửi email + link khảo sát
   ↓
4. Nhân viên trả lời
   ↓
5. System thu thập real-time
   ↓
6. Tự động nhắc nhở người chưa làm (sau 3 ngày)
   ↓
7. Kết thúc khảo sát → Status: CLOSED
   ↓
8. Phân tích kết quả
```

**API Endpoints:**
- `POST /api/surveys/:id/publish` - Phát hành
- `POST /api/surveys/:id/responses` - Submit phản hồi
- `GET /api/surveys/:id/progress` - Tiến độ
- `POST /api/surveys/:id/remind` - Gửi nhắc nhở

#### 4.2.3. Báo cáo Khảo sát

**Endpoint:** `GET /api/surveys/:id/report`

**Response:**
```json
{
  "survey": {
    "id": "uuid",
    "title": "Khảo sát nhu cầu Q4/2025",
    "response_rate": 75.5
  },
  "responses": {
    "total": 113,
    "completed": 113,
    "partial": 0
  },
  "insights": {
    "top_courses": [
      { "name": "Kỹ năng lãnh đạo", "count": 85, "percentage": 75.2 },
      { "name": "Excel nâng cao", "count": 60, "percentage": 53.1 }
    ],
    "preferred_time": {
      "evening": 68,
      "weekend": 30,
      "working_hours": 15
    },
    "preferred_format": {
      "online": 68,
      "offline": 32,
      "hybrid": 13
    }
  },
  "recommendations": [
    "Ưu tiên khóa Kỹ năng lãnh đạo (85 người quan tâm)",
    "Tổ chức buổi tối (60% ưa thích)",
    "Hình thức online (60%)"
  ]
}
```

---

### 4.3. F3 - Lập kế hoạch Đào tạo

#### 4.3.1. Nhu cầu Đào tạo

**Endpoint:** `GET /api/training/demands`

**Response:**
```json
{
  "demands": [
    {
      "course_id": "uuid",
      "course_name": "Kỹ năng lãnh đạo",
      "interested_count": 85,
      "priority": "high",
      "estimated_budget": 375000000,
      "sources": {
        "assessment_gap": 45,
        "survey_response": 85,
        "manager_request": 10
      }
    }
  ],
  "total_budget_needed": 1200000000,
  "total_participants": 250
}
```

#### 4.3.2. Lập Kế hoạch với AI

**Endpoint:** `POST /api/training/plans/ai-suggest`

**Request Body:**
```json
{
  "budget": 1000000000,
  "quarter": "Q4/2025",
  "priorities": ["high", "medium"],
  "constraints": {
    "max_participants_per_class": 20,
    "preferred_months": [10, 11]
  }
}
```

**Response:**
```json
{
  "suggested_plan": {
    "total_budget": 846000000,
    "total_participants": 188,
    "courses": [
      {
        "course_id": "uuid",
        "course_name": "Kỹ năng lãnh đạo",
        "participants": 85,
        "classes": 5,
        "budget": 375000000,
        "schedule": [
          {
            "class_id": 1,
            "start_date": "2025-10-15",
            "participants": 17
          }
        ]
      }
    ],
    "roi_prediction": {
      "expected_improvement": 0.8,
      "payback_period_months": 6
    }
  },
  "alternatives": [...]
}
```

#### 4.3.3. Phân rã Kế hoạch

**Workflow:**
```
1. Chọn kế hoạch tổng thể
   ↓
2. Chọn khóa học cần phân rã
   ↓
3. System gợi ý số lớp (dựa trên số người / max per class)
   ↓
4. Admin điều chỉnh:
   - Số lớp
   - Thời gian mỗi lớp
   - Giảng viên
   - Phòng học
   ↓
5. Gửi phê duyệt (nếu cần)
   ↓
6. Phê duyệt → Tạo lớp học
```

**API Endpoints:**
- `POST /api/training/plans/:id/split` - Phân rã kế hoạch
- `GET /api/training/plans/:id/classes` - Danh sách lớp
- `POST /api/training/classes` - Tạo lớp học
- `PUT /api/training/classes/:id` - Cập nhật lớp

---

## 5. API Documentation

### 5.1. Authentication

Tất cả API đều yêu cầu authentication qua JWT token.

**Header:**
```
Authorization: Bearer <jwt_token>
```

**Get Token:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "...",
    "expires_in": 3600,
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "admin"
    }
  }
}
```

### 5.2. Error Handling

**Error Response Format:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

**Error Codes:**
- `VALIDATION_ERROR` - 400
- `UNAUTHORIZED` - 401
- `FORBIDDEN` - 403
- `NOT_FOUND` - 404
- `CONFLICT` - 409
- `INTERNAL_ERROR` - 500

### 5.3. Pagination

**Request:**
```http
GET /api/surveys?page=1&limit=20&sort=created_at&order=desc
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

---

## 6. Database Schema

### 6.1. Core Tables

#### Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar_url VARCHAR(500),
    role VARCHAR(50) NOT NULL,
    department_id UUID,
    manager_id UUID,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_department ON users(department_id);
```

#### Departments
```sql
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    manager_id UUID,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 6.2. Assessment Tables

```sql
-- Bộ tiêu chí
CREATE TABLE rubrics (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    status VARCHAR(50),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tiêu chí
CREATE TABLE criteria (
    id UUID PRIMARY KEY,
    rubric_id UUID REFERENCES rubrics(id) ON DELETE CASCADE,
    code VARCHAR(50),
    name VARCHAR(255),
    description TEXT,
    type VARCHAR(50),
    weight INTEGER,
    order_index INTEGER,
    config JSONB
);

-- Chiến dịch đánh giá
CREATE TABLE assessment_campaigns (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rubric_id UUID REFERENCES rubrics(id),
    start_date DATE,
    end_date DATE,
    status VARCHAR(50),
    settings JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Kết quả đánh giá
CREATE TABLE assessment_results (
    id UUID PRIMARY KEY,
    campaign_id UUID REFERENCES assessment_campaigns(id),
    user_id UUID REFERENCES users(id),
    evaluator_id UUID REFERENCES users(id),
    evaluation_type VARCHAR(50),
    scores JSONB,
    total_score DECIMAL(5,2),
    status VARCHAR(50),
    submitted_at TIMESTAMP
);
```

### 6.3. Survey Tables

```sql
-- Khảo sát
CREATE TABLE surveys (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50),
    questions JSONB,
    target_audience JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Phản hồi khảo sát
CREATE TABLE survey_responses (
    id UUID PRIMARY KEY,
    survey_id UUID REFERENCES surveys(id),
    user_id UUID REFERENCES users(id),
    answers JSONB,
    completed BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP
);
```

### 6.4. Training Tables

```sql
-- Khóa học
CREATE TABLE courses (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    cost DECIMAL(15,2),
    duration VARCHAR(100),
    instructor VARCHAR(255),
    image_url VARCHAR(500),
    rating DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Kế hoạch đào tạo
CREATE TABLE training_plans (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quarter VARCHAR(50),
    budget DECIMAL(15,2),
    status VARCHAR(50),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Lớp học
CREATE TABLE training_classes (
    id UUID PRIMARY KEY,
    plan_id UUID REFERENCES training_plans(id),
    course_id UUID REFERENCES courses(id),
    name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    instructor VARCHAR(255),
    max_participants INTEGER,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Học viên
CREATE TABLE class_participants (
    id UUID PRIMARY KEY,
    class_id UUID REFERENCES training_classes(id),
    user_id UUID REFERENCES users(id),
    status VARCHAR(50),
    attendance_rate DECIMAL(5,2),
    final_score DECIMAL(5,2),
    enrolled_at TIMESTAMP DEFAULT NOW()
);
```

---

## 7. Bảo mật

### 7.1. Authentication & Authorization

#### JWT Token:
- **Algorithm:** HS256
- **Expiry:** 1 hour (access token), 7 days (refresh token)
- **Secret:** Stored in environment variable

#### Password:
- **Hashing:** bcrypt with 10 rounds
- **Policy:** Minimum 8 characters, 1 uppercase, 1 number

#### 2FA:
- **Method:** TOTP (Time-based One-Time Password)
- **Library:** speakeasy

### 7.2. Data Encryption

#### At Rest:
- **Database:** PostgreSQL with encryption at rest
- **Files:** AES-256 encryption

#### In Transit:
- **HTTPS:** TLS 1.3
- **Certificate:** Let's Encrypt

### 7.3. Security Headers

```javascript
// Helmet.js configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### 7.4. Rate Limiting

```javascript
// Express rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP"
});

app.use('/api/', limiter);
```

---

## 8. Deployment

### 8.1. Docker Deployment

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:4000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/thadico
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db
      - redis

  db:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=thadico

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 8.2. Production Deployment

**Steps:**
```bash
# 1. Build frontend
cd frontend
npm run build

# 2. Build backend
cd backend
npm run build

# 3. Run migrations
npm run migrate

# 4. Start services
docker-compose up -d

# 5. Check health
curl http://localhost:4000/health
```

### 8.3. Environment Variables

**.env.production:**
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/thadico
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# Redis
REDIS_URL=redis://host:6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRY=3600

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@thadico.com
SMTP_PASS=

# Storage
MINIO_ENDPOINT=minio.thadico.com
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=

# Monitoring
SENTRY_DSN=
```

---

## 9. Monitoring & Logging

### 9.1. Logging

**Winston Configuration:**
```javascript
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```

### 9.2. Metrics

**Prometheus Metrics:**
```javascript
const promClient = require('prom-client');

// HTTP request duration
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

// Database query duration
const dbQueryDuration = new promClient.Histogram({
  name: 'db_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['query_type']
});
```

### 9.3. Health Checks

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-06T10:00:00Z",
  "services": {
    "database": "healthy",
    "redis": "healthy",
    "storage": "healthy"
  },
  "metrics": {
    "uptime": 86400,
    "memory_usage": "512MB",
    "cpu_usage": "15%"
  }
}
```

---

## 10. Troubleshooting

### 10.1. Common Issues

#### Issue: Database connection timeout
**Solution:**
```bash
# Check database status
docker-compose ps db

# Check logs
docker-compose logs db

# Restart database
docker-compose restart db
```

#### Issue: Redis connection failed
**Solution:**
```bash
# Check Redis status
docker-compose ps redis

# Clear Redis cache
docker-compose exec redis redis-cli FLUSHALL
```

#### Issue: High memory usage
**Solution:**
```bash
# Check memory usage
docker stats

# Restart services
docker-compose restart

# Scale services
docker-compose up -d --scale backend=3
```

### 10.2. Performance Optimization

#### Database:
```sql
-- Add indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_assessment_results_user ON assessment_results(user_id);

-- Analyze queries
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
```

#### Caching:
```javascript
// Cache frequently accessed data
const getCachedUser = async (userId) => {
  const cached = await redis.get(`user:${userId}`);
  if (cached) return JSON.parse(cached);
  
  const user = await db.users.findById(userId);
  await redis.setex(`user:${userId}`, 3600, JSON.stringify(user));
  return user;
};
```

---

## 📞 Support

**Technical Support:**
- Email: tech@thadico.com
- Slack: #thadico-support
- Documentation: https://docs.thadico.com

**Emergency Contact:**
- On-call: +84 xxx xxx xxx
- Escalation: cto@thadico.com

---

**© 2025 Thadico HRM. All rights reserved.**
