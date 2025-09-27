# SCR_PLAN_APPROVAL_QUEUE — Phê duyệt đa cấp (L1 → L2 → L3)

## 0) Metadata
- Route: `/training/plans/:id/approvals`
- Module: Đào tạo
- Roles: Approver L1/L2/L3, Admin (view all)
- Design ref: Timeline approvals + diff viewer + comment thread
- Features: [FC-141 (phân rã), FC-140 (version history)]
- Depends: SCR_PLAN_FORM (đã Submit)

## 1) Purpose
Cho reviewer xem bản kế hoạch, so sánh các phiên bản, bình luận, approve/reject theo cấp, SLA nhắc hạn.

## 2) Layout
- **Header**
  - Title + Status badge (`waiting_approval`)
  - Plan meta: Năm, Đơn vị, Owner, Tổng ngân sách, Tổng item
- **Main**
  - Tabs:
    - **Overview**: bảng tóm tắt items + totals (group by quý/nhóm kỹ năng)
    - **Diff**: so sánh Version N vs N-1 (highlight thêm/xóa/sửa)
    - **Comments**: thread bình luận theo cấp (tag @owner)
  - **Approval Timeline** (right panel): L1, L2, L3 (state + người duyệt + thời hạn)
- **Footer Actions**
  - Approver buttons: **Approve**, **Reject** (required comment), **Request Changes**

## 3) Actions & Flows
- **Approve**: đánh dấu cấp hiện tại → nếu còn cấp sau thì chuyển tiếp; hết cấp → plan `approved`
- **Reject/Request changes**: quay về `draft`, gửi lý do cho owner; lưu **version note**
- **Reminders/SLA**: hiển thị countdown; cho phép resend reminder
- **View Diff**: chọn 2 version để so sánh (field-level)

## 4) APIs
- `GET  /api/training/plans/:id`
- `GET  /api/training/plans/:id/versions`
- `GET  /api/training/plans/:id/diff?from=&to=`
- `GET  /api/training/plans/:id/approvals`
- `POST /api/training/plans/:id/approve` { level, comment }
- `POST /api/training/plans/:id/reject` { level, comment }
- `POST /api/training/plans/:id/remind`  { level }

## 5) Rules
- Mỗi cấp chỉ bấm được một lần; bắt buộc **comment** khi Reject/Request changes
- Audit log đầy đủ: who/when/what, version
- SLA: badge màu (đúng hạn/ sắp trễ/ trễ)

## 6) States
- waiting_approval → (L1 approve) → (L2 approve) → (L3 approve) → **approved**
- waiting_approval → reject → **draft**
