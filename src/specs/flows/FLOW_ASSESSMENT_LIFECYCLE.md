
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
- `results_published` → công bố tạm.
- `appeal_open` → mở cửa khiếu nại (≤N trong X ngày).
- `finalized` → khóa kết quả.
- `archived` → lưu trữ.

**Transitions**
- draft → published
- published → running (auto at start)
- running → grading (close input)
- grading → results_published
- results_published ↔ appeal_open
- results_published/appeal_open → finalized
- finalized → archived

## 3) Flow chi tiết
1. **Create campaign**: Info → Content (rubric) → Scoring → Review → **Publish**.
2. **Run**: sync/async; Focus Mode; Live monitor; Incident log.
3. **Grading**: Auto-grade MCQ; Manual-grade essay; SLA nhắc hạn.
4. **Publish results**: thông báo; mở **Appeals** (giới hạn N lần/X ngày).
5. **Finalize**: khóa; update hồ sơ năng lực; đề xuất đào tạo.
6. **Reports**: skill gaps, heatmap, export.

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
- **Admin/HR**: tạo & điều phối.
- **Manager/Reviewer**: chấm & duyệt.
- **Employee**: tự đánh giá.
- **Appeals board**: xử lý khiếu nại.

## 6) Notifications & SLA
- Invite, Reminder (T-3/T-1/Overdue), Grading due, Results published, Appeal open/close.

## 7) Rules
- Rubric tổng trọng số = 100%.
- Không mở Appeal khi chưa publish results.
- Mỗi user ≤ N appeals trong X ngày.
- Incident ghi IP/device/time.

## 8) Data model
```json
Round { id, name, startAt, dueAt, status, rubricId, scope }
Rubric { id, items[{code, name, weight, type(mcq|essay|scale)}] }
Assignment { id, roundId, subjectId, reviewers[], mode(sync|async) }
Submission { id, assignmentId, userId, answers, score, status }
Appeal { id, roundId, userId, count, status, reason, result }
