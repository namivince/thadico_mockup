
---

### `src/specs/flows/FLOW_ASSESSMENT_LIFECYCLE.md`
```md
# F3 — Assessment Lifecycle

## 0) Metadata
- Module: Đánh giá năng lực/KPI
- Routes: `/assessment/rounds`, `/assessment/rounds/:id`, `/self-eval/:token`
- Entities: Round, Rubric, Assignment, Submission, Appeal

## 1) Purpose
Tạo chiến dịch đánh giá, chạy, chấm điểm, công bố, khiếu nại & tổng hợp.

## 2) States
- `draft` → cấu hình round.
- `published` → phát hành & mở link.
- `running` → NV/manager đang làm.
- `grading` → chấm (auto/manual).
- `grading_overdue` → quá hạn SLA chấm.
- `results_published` → công bố tạm.
- `appeal_open` → mở cửa khiếu nại (≤N trong X ngày).
- `appeal_closed` → hết cửa sổ phúc khảo.
- `finalized` → khóa kết quả.
- `archived` → lưu trữ.

**Transitions**
- draft → published
- published → running (auto at start)
- running → grading (close input)
- grading → grading_overdue (auto when now > gradeDueAt)
- grading/grading_overdue → results_published
- results_published ↔ appeal_open
- appeal_open → appeal_closed (auto when window expires)
- results_published/appeal_closed → finalized
- finalized → archived

## 3) Flow chi tiết
1. **Create campaign**: Info → Content (rubric/import Excel) → Phân công & SLA → Phúc khảo → **Publish**.
2. **Run**: sync/async; Focus Mode; Live monitor; Incident log.
3. **Grading**: Auto-grade MCQ; Manual-grade essay; **SLA đếm ngược & cảnh báo**.
4. **Publish results**: thông báo; mở **Appeals** (giới hạn N lần/X ngày).
5. **Phúc khảo**: tiếp nhận, xử lý, **cập nhật điểm & ghi lịch sử**.
6. **Finalize**: khóa; update hồ sơ năng lực; đề xuất đào tạo.
7. **Reports**: skill gaps, heatmap, export.

## 4) APIs
- `POST /api/asm/rounds`
- `POST /api/asm/rounds/:id/publish`
- `POST /api/asm/rounds/:id/close-input`
- `POST /api/asm/rounds/:id/grade`
- `POST /api/asm/rounds/:id/publish-results`
- `POST /api/asm/rounds/:id/appeals/open` (limit, days)
- `POST /api/asm/rounds/:id/finalize`
- `GET  /api/asm/rounds/:id/reports`

## 5) Roles
- **Super Admin**: toàn quyền quản lý hệ thống, override mọi hành động.
- **Admin/HR**: tạo & điều phối.
- **Manager/Reviewer**: chấm & duyệt.
- **Employee**: tự đánh giá.
- **Appeals board**: xử lý khiếu nại.

## 6) Notifications & SLA
- Invite, Reminder (T-3/T-1/Overdue), **Grading due warning**, Results published, Appeal open/close.
- **SLA chấm bài**: đếm ngược từ thời điểm bắt đầu chấm, gửi **email warning** trước hạn & khi quá hạn
- Hiển thị **overdue** trong Grading Console

## 7) Rules
- **Không dùng trọng số theo nhóm năng lực** (điểm số theo nhóm nhưng không quy đổi trọng số)
- **Import đề Excel** (tạo/cập nhật câu hỏi)
- **Phúc khảo**: mở cửa sổ trong X ngày, tối đa N lần; cập nhật điểm → ghi **lịch sử phúc khảo**
- Không mở Appeal khi chưa publish results.
- Mỗi user ≤ N appeals trong X ngày.
- Incident ghi IP/device/time.

## 8) Data model
```json
Round { id, name, startAt, closeAt, gradeDueAt, status, rubricId, scope }
Rubric { id, items[{code, name, group, type(mcq|essay|scale)}] }
Assignment { id, roundId, subjectId, reviewers[], gradeDueAt, status }
Submission { id, assignmentId, userId, answers, score, status }
Appeal { id, roundId, userId, count, limit, status, reason, oldScore, newScore, history[] }
