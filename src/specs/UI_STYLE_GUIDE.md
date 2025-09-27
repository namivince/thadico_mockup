# UI Style Guide - Thadico Dashboard

## 1. Typography

### Font Families
- **Primary Font**: Roboto
- **Secondary Font**: Inter
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif

### Font Sizes & Weights

| Thành phần | Font | Cỡ chữ | Độ đậm | Ghi chú |
|------------|------|--------|--------|---------|
| Tiêu đề Dashboard | Inter | 20-24px | Bold (700) | Nổi bật, rõ ràng |
| Tiêu đề Section | Inter | 16-18px | Semi-bold (600) | Dẫn nhập nhóm dữ liệu |
| Label/Bảng dữ liệu | Roboto | 12-14px | Regular (400) | Dễ đọc, không rối |
| Giá trị quan trọng | Roboto | 14px | Bold (700) | Số liệu chính, % compliance |

### CSS Classes
```css
.title-dashboard {
  font-family: 'Inter', 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 700;
}

.title-section {
  font-family: 'Inter', 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 600;
}

.label-text {
  font-family: 'Roboto', 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #6C757D;
}

.value-important {
  font-family: 'Roboto', 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
}
```

## 2. Color Palette

### Base Colors

| Loại hiển thị | Màu (hex) | CSS Variable | Ghi chú |
|---------------|-----------|--------------|---------|
| Nền tổng thể | #F8F9FA | --color-bg | Giữ nhẹ nhàng, không át dữ liệu |
| Text chính | #212529 | --color-text | Tương phản cao, dễ đọc |
| Text phụ / label | #6C757D | --color-text-secondary | Phân tầng thông tin |
| Thành công (OK) | #16A34A | --color-success | Trạng thái đạt, hoàn thành |
| Cảnh báo | #FFC107 | --color-warning | Nhắc nhở, cần theo dõi |
| Lỗi / vi phạm | #DC3545 | --color-danger | Đi trễ, nghỉ sai quy định |
| Dữ liệu tích cực | #0D6EFD | --color-primary | Tiến độ tốt, xu hướng tăng |
| Hover/Active element | #E9ECEF | --color-hover | Nhấn mạnh khi người dùng tương tác |

### Status Colors (Background)

| Trạng thái | Background | Text/Border | Ghi chú |
|------------|------------|-------------|---------|
| Success | #E6F4EA | #16A34A | Đã duyệt, hoàn thành |
| Warning | #FFF8E6 | #FFC107 | Chờ duyệt, cần theo dõi |
| Danger | #FFEBEE | #DC3545 | Từ chối, lỗi |

### Category Colors

| Danh mục | Màu (hex) | Ghi chú |
|----------|-----------|---------|
| Soft Skills | #1890FF | Xanh dương |
| Management | #722ED1 | Tím |
| Technical | #13C2C2 | Xanh lam |
| Language | #52C41A | Xanh lá |
| Sales | #FA8C16 | Cam |
| Marketing | #EB2F96 | Hồng |

## 3. Components

### Cards

```css
.card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background: #FFFFFF;
  border: none;
}

.card-header {
  background: #FFFFFF;
  border-bottom: 1px solid #E9ECEF;
  padding: 16px 24px;
}

.card-title {
  color: #212529;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Inter', 'Roboto', sans-serif;
}
```

### Buttons

```css
.btn-primary {
  background: #0D6EFD;
  border-color: #0D6EFD;
  font-weight: 500;
  height: 38px;
  border-radius: 6px;
  box-shadow: 0 2px 0 rgba(5, 65, 255, 0.1);
}

.btn-success {
  background: #E6F4EA;
  color: #16A34A;
  border-color: #16A34A;
  font-weight: 500;
}

.btn-warning {
  background: #FFF8E6;
  color: #FFC107;
  border-color: #FFC107;
  font-weight: 500;
}

.btn-danger {
  background: #FFEBEE;
  color: #DC3545;
  border-color: #DC3545;
  font-weight: 500;
}
```

### Tables

```css
.table-header {
  background: #F8F9FA;
  color: #212529;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 16px;
  border-bottom: 2px solid #E9ECEF;
}

.table-cell {
  padding: 12px 16px;
  font-size: 14px;
  color: #212529;
}

.table-row-even {
  background-color: #F8F9FA;
}

.table-row-hover:hover {
  background-color: #E9ECEF;
}

.table-summary {
  background-color: #E6F4EA;
  font-weight: 700;
}
```

### Status Tags

```css
.tag-success {
  color: #16A34A;
  background: #E6F4EA;
  border: 1px solid #16A34A;
  font-weight: 600;
  border-radius: 4px;
  padding: 2px 8px;
}

.tag-warning {
  color: #FFC107;
  background: #FFF8E6;
  border: 1px solid #FFC107;
  font-weight: 600;
  border-radius: 4px;
  padding: 2px 8px;
}

.tag-danger {
  color: #DC3545;
  background: #FFEBEE;
  border: 1px solid #DC3545;
  font-weight: 600;
  border-radius: 4px;
  padding: 2px 8px;
}
```

## 4. Charts & Data Visualization

### Chart Colors
- Sử dụng màu đối lập cho từng nhóm dữ liệu
- Primary series: #0D6EFD (xanh dương)
- Secondary series: #16A34A (xanh lá)
- Tertiary series: #FFC107 (vàng cam)
- Quaternary series: #722ED1 (tím)

### Chart Guidelines
- Kết hợp line + bar chart: line dùng màu nổi (xanh dương đậm), bar nhạt hơn để không át
- Animation nhẹ khi show/hide layer dữ liệu
- Luôn có tooltip khi hover
- Đảm bảo contrast ratio cho accessibility

## 5. Spacing & Layout

### Grid System
- Sử dụng 24-column grid (Ant Design)
- Gutter: 16px (desktop), 8px (mobile)

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

### Container Padding
- Desktop: 24px
- Mobile: 12px

### Card Margins
- Between cards: 16px
- Card internal padding: 24px

## 6. Responsive Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| xs | <576px | Extra small devices (phones) |
| sm | ≥576px | Small devices (landscape phones) |
| md | ≥768px | Medium devices (tablets) |
| lg | ≥992px | Large devices (desktops) |
| xl | ≥1200px | Extra large devices (large desktops) |
| xxl | ≥1600px | Extra extra large devices |

## 7. Accessibility

- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Focus indicators for keyboard navigation
- Alt text for all images and icons
- ARIA labels for interactive elements
- Support for screen readers

## 8. Implementation Notes

### CSS Variables
```css
:root {
  --color-bg: #F8F9FA;
  --color-text: #212529;
  --color-text-secondary: #6C757D;
  --color-success: #16A34A;
  --color-warning: #FFC107;
  --color-danger: #DC3545;
  --color-primary: #0D6EFD;
  --color-hover: #E9ECEF;
}
```

### Font Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
```

---

**Last Updated**: 2025-09-27  
**Version**: 1.0  
**Status**: ✅ Implemented
