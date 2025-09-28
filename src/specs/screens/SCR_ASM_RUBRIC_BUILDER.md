# SCR_ASM_RUBRIC_BUILDER — Trình soạn tiêu chí

## 0) Metadata
Route: /assessment/rubrics/:id/builder
Roles: Super Admin, HR Admin

## 1) Purpose
Tạo/sửa rubric: tiêu chí (code, name), type(mcq|essay|scale), weight, mô tả, tiêu chuẩn.

## 2) Layout
Left: danh sách tiêu chí (sortable)
Right: form chi tiết; tab MCQ options / Essay guide / Scale range
Toolbar: +Tiêu chí · Import XLSX · Lưu

## 3) APIs
GET/POST/PUT /api/asm/rubrics
POST /api/asm/rubrics/:id/import

## 4) Rules
- Code unique, weight tổng = 100%
