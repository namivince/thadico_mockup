
---

### `src/specs/flows/FLOW_TRAINING_PLAN_LIFECYCLE.md`
```md
# F2 — Training Plan Lifecycle

## 0) Metadata
- Module: Đào tạo
- Routes: `/training/plans`, `/training/plans/:id`
- Entities: Plan, PlanItem, Approval, Class, ChangeRequest

## 1) Purpose
Lập kế hoạch đào tạo năm/đợt; phê duyệt đa cấp; triển khai lớp; xử lý thay đổi; theo dõi hoàn thành & xuất báo cáo.

## 2) States
- `draft` → soạn thảo (header + items, auto-suggest từ survey).
- `waiting_approval` → gửi phê duyệt.
- `approved` → đã duyệt, cho phép deploy.
- `deployed` → đang triển khai (lịch lớp, giảng viên, học viên).
- `completed` → chốt kết quả & ranking.
- `archived` → lưu trữ.

**Transitions**
- draft → waiting_approval (Submit)
- waiting_approval ↔ draft (Reject/Revise)
- waiting_approval → approved (Approve L1→L2→L3)
- approved → deployed (Deploy classes)
- deployed → completed (Close classes & results)
- completed → archived (Archive year-end)

## 3) Flow chi tiết
1. **Compose**: tạo header, items; **Auto-suggest** từ survey/assessment gaps.
2. **Validate**: ngân sách, trùng lặp; cảnh báo.
3. **Submit**: sang **Multi-level Approval** (L1→L2→L3) có nhận xét; SLA nhắc hạn.
4. **Deployment**: tạo lớp, lịch, gán instructor/learners, liên kết LMS.
5. **Change Requests**: cancel/replace/postpone → phê duyệt → versioning.
6. **Completion**: chấm điểm/điểm danh; **Ranking** đơn vị; **Export** tổng kết năm.

## 4) APIs
- `POST /api/training/plans`
- `PUT  /api/training/plans/:id`
- `POST /api/training/plans/:id/submit`
- `POST /api/training/plans/:id/approve` (level, comment)
- `POST /api/training/plans/:id/deploy`
- `POST /api/training/plans/:id/change-requests`
- `POST /api/training/plans/:id/complete`
- `GET  /api/training/plans/:id/report`

## 5) Roles
- **Owner (HR)**: soạn, submit, deploy.
- **Approvers (L1/2/3)**: duyệt/ghi chú.
- **Instructor**: cập nhật kết quả lớp.
- **Employee**: học viên.

## 6) Notifications & SLA
- Submit/Approve/Reject; Reminder theo từng cấp; Over-budget alert; Class schedule/reminder.

## 7) Rules
- Tổng trọng số/Ngân sách không vượt hạn mức.
- Không deploy khi chưa approved.
- Change Request tạo **version** mới, trace được audit.

## 8) Data model
```json
Plan { id, year, status, budget, items[], approvals[], versions[] }
PlanItem { id, courseId, targetGroup, cost, schedule }
Approval { id, planId, level, status, comment, actedAt }
Class { id, planItemId, startAt, endAt, instructorId, learners[] }
ChangeRequest { id, planId, type, reason, status, appliedVersion }
