# F1 — Survey Lifecycle

## 0) Metadata
- Module: Khảo sát/Nhu cầu đào tạo
- Routes: `/surveys`, `/surveys/:id`, `/surveys/:id/monitor`
- Entities: Survey, Question, Audience, Invitation, Response, Reminder

## 1) Purpose
Tạo & phát hành khảo sát; nhắc hạn; theo dõi tiến độ; đóng; phân tích & export → feed sang đề xuất/kế hoạch đào tạo.

## 2) States
- `draft` → cấu hình Info/Questions/Audience.
- `published` → mở link & gửi mời.
- `running` → đang thu phản hồi.
- `closed` → ngừng nhận phản hồi.
- `archived` → lưu trữ.

**Transitions**
- draft → published (Publish)
- published → running (auto at start)
- running → closed (Close at due / manual)
- closed → archived (Archive)

## 3) Flow chi tiết
1. **Create draft**: Info → Questions → Audience → Save Draft.
2. **Publish**: tạo invitations; gửi **Notifications** (email/app); đặt **Reminders** (T-3, T-1, Overdue).
3. **Monitor progress**: bảng real-time (tỷ lệ trả lời, theo đơn vị); cho phép **manual remind**.
4. **Close**: tự động lúc due hoặc đóng thủ công.
5. **Analytics & Export**: biểu đồ, phân bố câu trả lời; **Export** CSV/XLSX/PDF; sinh “training suggestions” cho Plan.

## 4) APIs
- `POST /api/surveys`
- `PUT /api/surveys/:id`
- `POST /api/surveys/:id/publish`
- `POST /api/surveys/:id/reminders` (schedule/manual)
- `POST /api/surveys/:id/close`
- `GET  /api/surveys/:id/analytics`
- `GET  /api/surveys/:id/export?format=csv|xlsx|pdf`
- `POST /api/training/plans/suggest-from-survey/:id`

## 5) Roles
- **Admin/HR**: tạo, publish, monitor, close.
- **Employee**: trả lời survey.

## 6) Notifications & SLA
- Invite, Reminder (T-3/T-1/Overdue), Close notice, Thanks/on-completion.

## 7) Rules
- Câu hỏi phải validate (bắt buộc/định dạng).
- Audience gắn theo phòng ban/vị trí/nhân sự; rollback nếu rỗng.
- Không sửa câu hỏi sau khi published (chỉ cho phép thêm bản **version** mới).

## 8) Data model (simplified)
```json
Survey { id, name, startAt, dueAt, status, questions[], audience, reminders[] }
Question { id, type, text, options[], required }
Invitation { id, surveyId, userId, sentAt, status }
Response { id, invitationId, answers, submittedAt }
