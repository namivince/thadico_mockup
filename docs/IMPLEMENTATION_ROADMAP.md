# 🗺️ Implementation Roadmap - Hoàn thiện 100%

**Ngày:** 2025-10-06  
**Mục tiêu:** Đạt 100% khớp với BA requirements  
**Thời gian ước tính:** 6-8 giờ

---

## 📊 CURRENT STATUS

### ✅ Đã hoàn thành (95%):
- **Documents:** 100% (5/5 files)
- **Components:** 100% (6/6 components)
- **Menu & Routes:** 100%
- **Mock Data:** 80%
- **UI/UX:** 85%

### ❌ Còn thiếu (5%):
- **Integration:** 0% (chưa tích hợp components vào pages)
- **Dashboard KPI:** 0% (chưa có 6 KPI)
- **UI Elements:** 20% (thiếu một số buttons, configs)

---

## 🎯 PHASE 1: F3 - ĐÁNH GIÁ NĂNG LỰC (2-3 giờ)

### Task 1.1: Tích hợp CountdownTimer vào GradingConsole
**File:** `src/components/assessment/GradingConsole.jsx`

**Changes:**
```javascript
// Import
import CountdownTimer from '../common/CountdownTimer';

// Trong Table columns, thêm cột SLA:
{
  title: 'SLA',
  key: 'sla',
  render: (_, record) => (
    <CountdownTimer 
      deadline={record.sla_deadline}
      onExtend={() => handleExtendSLA(record.id)}
      canExtend={record.can_extend}
    />
  )
}

// Mock data thêm:
sla_deadline: "2025-10-07T14:30:00Z",
can_extend: true
```

**Acceptance:**
- [ ] Countdown hiển thị đúng format `02:13:54`
- [ ] Màu đổi theo thời gian (xanh→cam→đỏ)
- [ ] Nút "Gia hạn" xuất hiện khi quá hạn

---

### Task 1.2: Tích hợp SubmitSuccessModal vào SelfEvalForm
**File:** `src/pages/assessment/SelfEvalForm.jsx`

**Changes:**
```javascript
// Import
import SubmitSuccessModal from '../../components/assessment/SubmitSuccessModal';

// State
const [showSuccessModal, setShowSuccessModal] = useState(false);

// Sau khi submit thành công:
const handleSubmit = async () => {
  // ... submit logic
  setShowSuccessModal(true);
};

// JSX
<SubmitSuccessModal 
  visible={showSuccessModal}
  onClose={() => {
    setShowSuccessModal(false);
    navigate('/my-assessments');
  }}
  resultDate={campaign.result_date}
  campaignName={campaign.name}
/>
```

**Acceptance:**
- [ ] Modal hiển thị sau khi submit
- [ ] Text đúng: "Bài thi đã được ghi nhận..."
- [ ] Ngày công bố hiển thị đúng

---

### Task 1.3: Thêm Appeal Config vào CampaignForm
**File:** `src/components/assessment/CampaignForm.jsx`

**Changes:**
```javascript
// Thêm vào Form
<Form.Item
  label="Cấu hình Phúc khảo"
  style={{ marginTop: '24px' }}
>
  <Space direction="vertical" style={{ width: '100%' }}>
    <Form.Item
      name="appealWindowDays"
      label="Thời gian mở phúc khảo (ngày)"
      rules={[{ required: true }]}
    >
      <InputNumber min={1} max={30} defaultValue={7} />
    </Form.Item>
    
    <Form.Item
      name="appealMaxAttempts"
      label="Số lần phúc khảo tối đa"
      rules={[{ required: true }]}
    >
      <InputNumber min={1} max={5} defaultValue={3} />
    </Form.Item>
  </Space>
</Form.Item>
```

**Acceptance:**
- [ ] Form có 2 fields mới
- [ ] Validation đúng
- [ ] Lưu vào campaign settings

---

### Task 1.4: Thêm cột Appeal Limits vào AppealsList
**File:** `src/pages/assessment/AppealsList.jsx`

**Changes:**
```javascript
// Thêm cột vào Table
{
  title: 'Số lần / Giới hạn',
  key: 'attempts',
  render: (_, record) => (
    <Tag color={record.attempts_used >= record.attempts_limit ? 'error' : 'success'}>
      {record.attempts_used}/{record.attempts_limit}
    </Tag>
  )
},
{
  title: 'Deadline',
  key: 'deadline',
  render: (_, record) => (
    <Space>
      <ClockCircleOutlined />
      {dayjs(record.deadline).format('DD/MM/YYYY')}
    </Space>
  )
}

// Mock data:
{
  attempts_used: 1,
  attempts_limit: 3,
  deadline: "2025-10-15T23:59:59Z"
}
```

**Acceptance:**
- [ ] Cột hiển thị đúng format `1/3`
- [ ] Màu đỏ khi hết lượt
- [ ] Deadline hiển thị rõ ràng

---

### Task 1.5: Import Excel Button trong RubricBuilder
**File:** `src/pages/assessment/RubricBuilder.jsx`

**Changes:**
```javascript
// Thêm button vào header
<Button 
  icon={<ImportOutlined />}
  onClick={() => setImportModalVisible(true)}
>
  Import câu hỏi (.xlsx)
</Button>

// Modal
<Modal
  title="Import câu hỏi từ Excel"
  open={importModalVisible}
  onCancel={() => setImportModalVisible(false)}
  footer={null}
>
  <Upload.Dragger
    accept=".xlsx,.xls"
    beforeUpload={handleImportExcel}
  >
    <p className="ant-upload-drag-icon">
      <FileExcelOutlined />
    </p>
    <p>Kéo thả file Excel hoặc click để chọn</p>
  </Upload.Dragger>
</Modal>
```

**Acceptance:**
- [ ] Button hiển thị rõ ràng
- [ ] Modal upload hoạt động
- [ ] Accept .xlsx, .xls

---

## 🎯 PHASE 2: F1 - KHẢO SÁT (1-2 giờ)

### Task 2.1: Tích hợp DeclineSurveyModal vào SurveyList
**File:** `src/pages/surveys/SurveyList.jsx`

**Changes:**
```javascript
// Import
import DeclineSurveyModal from '../../components/surveys/DeclineSurveyModal';

// State
const [declineModalVisible, setDeclineModalVisible] = useState(false);
const [selectedSurvey, setSelectedSurvey] = useState(null);

// Thêm button "Từ chối" vào action column
<Button 
  danger
  size="small"
  onClick={() => {
    setSelectedSurvey(record);
    setDeclineModalVisible(true);
  }}
>
  Từ chối
</Button>

// Modal
<DeclineSurveyModal 
  visible={declineModalVisible}
  onClose={() => setDeclineModalVisible(false)}
  onSubmit={handleDecline}
  surveyName={selectedSurvey?.name}
/>

// Handle decline
const handleDecline = async (data) => {
  // Save to declined_users
  // Push to report
  message.success('Đã ghi nhận lý do từ chối');
};
```

**Acceptance:**
- [ ] Button "Từ chối" hiển thị
- [ ] Modal bắt buộc nhập lý do
- [ ] Lý do lưu vào report

---

### Task 2.2: Tích hợp RealtimeBadge vào SurveyMonitor
**File:** `src/pages/surveys/SurveyMonitor.jsx`

**Changes:**
```javascript
// Import
import RealtimeBadge from '../../components/common/RealtimeBadge';

// Thêm vào header
<Card 
  title="Monitor Khảo sát"
  extra={
    <RealtimeBadge 
      lastSyncTime={lastSyncTime}
      isRealtime={true}
    />
  }
>
  {/* Content */}
</Card>

// Update lastSyncTime mỗi 10s
useEffect(() => {
  const interval = setInterval(() => {
    setLastSyncTime(new Date().toISOString());
  }, 10000);
  return () => clearInterval(interval);
}, []);
```

**Acceptance:**
- [ ] Badge "🟢 Realtime" hiển thị
- [ ] Timestamp update đúng
- [ ] Format "Synced 1m ago"

---

## 🎯 PHASE 3: F2 - KẾ HOẠCH ĐÀO TẠO (2-3 giờ)

### Task 3.1: Tích hợp ChangeRequestModal vào PlanApprovalQueue
**File:** `src/pages/training/PlanApprovalQueue.jsx`

**Changes:**
```javascript
// Import
import ChangeRequestModal from '../../components/training/ChangeRequestModal';

// State
const [changeRequestModalVisible, setChangeRequestModalVisible] = useState(false);
const [selectedPlan, setSelectedPlan] = useState(null);

// Button
<Button 
  onClick={() => {
    setSelectedPlan(record);
    setChangeRequestModalVisible(true);
  }}
>
  Tạo Change Request
</Button>

// Modal
<ChangeRequestModal 
  visible={changeRequestModalVisible}
  onClose={() => setChangeRequestModalVisible(false)}
  onSubmit={handleChangeRequest}
  planName={selectedPlan?.name}
  currentVersion={selectedPlan?.version || 1}
  versionHistory={selectedPlan?.change_history || []}
/>
```

**Acceptance:**
- [ ] Modal hiển thị đầy đủ
- [ ] Chọn được Hoãn/Hủy/Thay thế
- [ ] Version timeline hiển thị

---

### Task 3.2: Tích hợp SyncStatusBadge vào PlanDeploy
**File:** `src/pages/training/PlanDeploy.jsx`

**Changes:**
```javascript
// Import
import SyncStatusBadge from '../../components/common/SyncStatusBadge';

// Thêm cột vào Table
{
  title: 'Sync Status',
  key: 'sync',
  render: (_, record) => (
    <SyncStatusBadge 
      status={record.sync_status}
      lastSyncTime={record.last_sync_at}
      errorMessage={record.sync_error}
      onRetry={() => handleRetrySync(record.id)}
    />
  )
}

// Mock data:
{
  sync_status: 'synced', // synced, failed, syncing, pending
  last_sync_at: "2025-10-06T14:30:00Z",
  sync_error: null
}
```

**Acceptance:**
- [ ] Badge hiển thị đúng status
- [ ] Timestamp hiển thị
- [ ] Nút Retry khi failed

---

## 🎯 PHASE 4: DASHBOARD KPI (2-3 giờ)

### Task 4.1: Tạo 6 KPI Cards
**File:** `src/pages/dashboard/SuperAdminDashboard.jsx`

**Mock Data:**
```javascript
const dashboardKPI = {
  courses: {
    deployed: 15,
    postponed: 3,
    cancelled: 2
  },
  learners: {
    joined: 180,
    pending: 50,
    declined: 20
  },
  trainers: {
    joined: 12,
    pending: 3,
    replaced: 2
  },
  subjects: {
    completed: 8,
    in_progress: 4,
    not_started: 3
  },
  cost: {
    planned: 1000000000,
    actual: 950000000,
    variance: 50000000
  },
  progress: {
    f1_completion: 85,
    f2_completion: 75,
    f3_completion: 90
  }
};
```

**Components:**
```javascript
// KPI 1: Khóa học
<Card>
  <Statistic 
    title="Khóa học Triển khai"
    value={dashboardKPI.courses.deployed}
    suffix={`/ ${totalCourses}`}
  />
  <Space>
    <Tag color="warning">Hoãn: {dashboardKPI.courses.postponed}</Tag>
    <Tag color="error">Hủy: {dashboardKPI.courses.cancelled}</Tag>
  </Space>
</Card>

// KPI 2: Nhân sự
<Card>
  <Statistic 
    title="Nhân sự Tham gia"
    value={dashboardKPI.learners.joined}
  />
  <Progress 
    percent={(dashboardKPI.learners.joined / totalLearners) * 100}
    strokeColor="#52c41a"
  />
</Card>

// ... tương tự cho 4 KPI còn lại
```

**Acceptance:**
- [ ] 6 KPI cards hiển thị đầy đủ
- [ ] Số liệu chính xác
- [ ] Click KPI → filter list

---

### Task 4.2: Tạo 5 Charts
**File:** `src/pages/dashboard/SuperAdminDashboard.jsx`

**Charts:**
```javascript
// 1. Stacked Bar - Khóa học theo tháng
<Card title="Triển khai Khóa học">
  <Column 
    data={coursesByMonth}
    isStack
    xField="month"
    yField="value"
    seriesField="type"
  />
</Card>

// 2. Pie - Nhân sự
<Card title="Phân bố Nhân sự">
  <Pie 
    data={learnersDistribution}
    angleField="value"
    colorField="type"
  />
</Card>

// 3. Bar - Giảng viên
<Card title="Giảng viên">
  <Bar 
    data={trainersData}
    xField="value"
    yField="type"
  />
</Card>

// 4. Table - Bộ môn
<Card title="Bộ môn">
  <Table 
    dataSource={subjectsData}
    columns={[
      { title: 'Bộ môn', dataIndex: 'name' },
      { title: 'Trạng thái', dataIndex: 'status' }
    ]}
  />
</Card>

// 5. Bar - Chi phí
<Card title="Chi phí theo Quý">
  <Column 
    data={costByQuarter}
    isGroup
    xField="quarter"
    yField="value"
    seriesField="type"
  />
</Card>
```

**Acceptance:**
- [ ] 5 charts hiển thị đúng
- [ ] Dữ liệu chính xác
- [ ] Interactive (hover, click)

---

## 🎯 PHASE 5: POLISH & TESTING (1 giờ)

### Task 5.1: Rà soát Menu Labels
**Files:**
- `src/data/mockData.js`
- `src/components/dashboard/SideMenu.jsx`

**Changes:**
```javascript
// F2 - Khảo sát
{ key: 'f2:distribute', label: 'Phân phối khảo sát', path: '/surveys' }
// (thay vì "Danh sách khảo sát")

// F1 - Đánh giá
{ key: 'f1:rubrics', label: 'Thiết lập danh mục', path: '/assessment/rubrics' }
// (thay vì "Bộ tiêu chí")
```

**Acceptance:**
- [ ] Tất cả labels nhất quán
- [ ] Breadcrumbs đúng
- [ ] Sidebar đúng

---

### Task 5.2: Rule Visibility cho Bài thi
**File:** `src/pages/assessment/RoundList.jsx`

**Changes:**
```javascript
// Filter campaigns theo assigned users
const visibleCampaigns = campaigns.filter(campaign => {
  const currentUserId = getCurrentUser().id;
  return campaign.assigned_users.includes(currentUserId);
});
```

**Acceptance:**
- [ ] Chỉ người được assign mới thấy
- [ ] Filter hoạt động đúng

---

### Task 5.3: Testing Checklist
**All Features:**
- [ ] F1: Countdown, Submit popup, Appeal limits
- [ ] F2: Decline modal, Realtime badge
- [ ] F3: Change request, Sync badges
- [ ] Dashboard: 6 KPI, 5 charts
- [ ] Menu: Labels đúng
- [ ] Rules: Visibility đúng

---

## 📦 DELIVERABLES

### Code:
- [ ] 6 components tích hợp vào pages
- [ ] 6 KPI cards + 5 charts
- [ ] UI elements bổ sung
- [ ] Mock data đầy đủ

### Documents:
- [x] SLIDE_DEMO.md
- [x] TECHNICAL_DOCS.md
- [x] CASE_STUDY.md
- [x] DEMO_SCRIPT.md
- [x] BA_REQUIREMENTS_CHECKLIST.md
- [x] FINAL_SUMMARY.md
- [x] IMPLEMENTATION_ROADMAP.md

### Testing:
- [ ] Manual testing all flows
- [ ] Cross-browser testing
- [ ] Responsive testing
- [ ] Performance testing

---

## 🚀 DEPLOYMENT

### Steps:
1. **Build:** `npm run build`
2. **Test:** Verify all features
3. **Deploy:** `npx gh-pages -d build`
4. **Verify:** Check live site
5. **QA:** Run full checklist

---

## ✅ ACCEPTANCE CRITERIA

### 100% Completion:
- [ ] All components integrated
- [ ] All UI elements added
- [ ] All mock data complete
- [ ] All charts working
- [ ] All labels correct
- [ ] All rules implemented
- [ ] All tests passed
- [ ] All documents complete

---

## 📞 NEXT ACTIONS

### Immediate:
1. Start Phase 1 (F3)
2. Complete integration
3. Test each feature
4. Move to Phase 2

### After Completion:
1. Full QA testing
2. Demo rehearsal
3. Stakeholder review
4. Production deployment

---

**Status:** 🟡 Ready to Start  
**Estimated Time:** 6-8 hours  
**Target Completion:** 2025-10-07

---

**© 2025 Thadico HRM. All rights reserved.**
