
---

### `src/specs/flows/FLOW_SYSTEM_SETUP_POLICIES.md`
```md
# F4 — System Setup & Policies

## 0) Metadata
- Module: Quản trị hệ thống
- Routes: `/admin/system/setup`, `/admin/security/policies`, `/admin/integrations`
- Entities: OrgUnit, Role, SSO, Integration, Policy, AuditLog

## 1) Purpose
Thiết lập ban đầu (org, SSO, role); tích hợp; chính sách bảo mật; audit & cảnh báo; xuất/nhập cấu hình.

## 2) Scope & Steps
1. **Setup Org tree** → import/cấu trúc; mapping SSO/AD; gán **Roles**.
2. **Integrations**: Zoom/LMS/Mail; health checks & retry.
3. **Security policies**: password/SSO, session, IP allowlist, 2FA, DLP/export control.
4. **Audit & Alerts**: log truy cập/ cấu hình; webhook alert.
5. **Help & Onboarding**: tài liệu, guided tours.

## 3) APIs
- `POST /api/admin/org/import` , `GET /api/admin/org/tree`
- `POST /api/admin/auth/sso/config`
- `POST /api/admin/roles/assign`
- `POST /api/admin/integrations/:code/config`
- `GET  /api/admin/integrations/:code/health`
- `POST /api/admin/security/policies`
- `GET  /api/admin/audit/logs`
- `POST /api/admin/export` , `POST /api/admin/import`

## 4) Roles
- **System Admin**: full.
- **Org Admin**: quản lý cây & roles trong phạm vi.

## 5) Policies (mẫu)
- Password/SSO, 2FA, Session timeout, IP allowlist, Export watermark, Data retention.

## 6) Rules
- Mọi thay đổi cấu hình phải có audit log + who/when/what.
- Export nhạy cảm phải đóng watermark, lưu dấu vết.
- Health check định kỳ; alert khi failed 3 lần liên tiếp.

## 7) Data model
```json
Integration { id, code, config, status, lastHealthAt }
Policy { id, name, value, scope }
AuditLog { id, actorId, action, target, meta, ip, at }
