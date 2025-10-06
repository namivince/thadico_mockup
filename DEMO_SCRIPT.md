# 🎯 Kịch bản Demo Hệ thống Thadico HRM

**Người demo:** Nguyễn Phúc Vinh  
**Thời gian:** 15-20 phút  
**Mục tiêu:** Trình bày luồng hoàn chỉnh từ Đánh giá → Khảo sát → Đào tạo

---

## 📋 Chuẩn bị trước Demo

### ✅ Checklist:
- [ ] Mở trình duyệt ở chế độ ẩn danh (để tránh cache)
- [ ] Truy cập: https://namivince.github.io/thadico_mockup
- [ ] Login với tài khoản **Super Admin**
- [ ] Kiểm tra 3 nhóm menu: F1 (Đánh giá) → F2 (Khảo sát) → F3 (Đào tạo)
- [ ] Chuẩn bị slide hoặc tài liệu giới thiệu (nếu có)

---

# 🎬 PHẦN 1: GIỚI THIỆU TỔNG QUAN (2 phút)

## Lời mở đầu:

> "Xin chào quý vị! Hôm nay tôi sẽ trình bày hệ thống quản lý đào tạo và đánh giá nhân sự của Thadico. Hệ thống này giúp doanh nghiệp **đánh giá năng lực nhân viên**, **xác định nhu cầu đào tạo**, và **lập kế hoạch đào tạo hiệu quả**."

## Giới thiệu 3 module chính:

### 🏆 **F1 - Đánh giá Năng lực**
> "Module đầu tiên giúp doanh nghiệp đánh giá năng lực nhân viên theo bộ tiêu chí chuẩn, từ đó xác định **gap năng lực** cần cải thiện."

### 📊 **F2 - Khảo sát & Phân tích**
> "Sau khi biết gap năng lực, chúng ta khảo sát nhân viên để hiểu **nhu cầu đào tạo thực tế** của họ."

### 📚 **F3 - Lập kế hoạch Đào tạo**
> "Cuối cùng, dựa trên kết quả đánh giá và khảo sát, hệ thống giúp lập **kế hoạch đào tạo cụ thể** và triển khai."

---

# 🏆 PHẦN 2: F1 - ĐÁNH GIÁ NĂNG LỰC (5 phút)

## Bước 1: Thiết lập Danh mục (1 phút)

**Click:** Sidebar → **Đánh giá Năng lực** → **Thiết lập danh mục**

### Script:
> "Đầu tiên, chúng ta cần có **bộ tiêu chí đánh giá**. Hệ thống đã chuẩn bị sẵn 8 bộ tiêu chí cho các vị trí khác nhau."

**Hành động:**
- Scroll qua các card bộ tiêu chí
- Hover vào card để show hiệu ứng
- Giới thiệu các bộ tiêu chí:
  - 💼 Nhân viên văn phòng (12 tiêu chí)
  - 👔 Quản lý cấp trung (15 tiêu chí)
  - 📊 Kỹ năng bán hàng (10 tiêu chí)
  - 💻 Kỹ năng kỹ thuật IT (18 tiêu chí)
  - 🎨 Năng lực Marketing (14 tiêu chí)
  - 🤝 Chăm sóc khách hàng (11 tiêu chí)
  - 💰 Tài chính - Kế toán (13 tiêu chí)
  - 👥 Năng lực nhân sự (12 tiêu chí)

### Nói:
> "Ví dụ bộ tiêu chí **Nhân viên văn phòng** có 12 tiêu chí bao gồm kỹ năng giao tiếp, làm việc nhóm, sử dụng công nghệ... Mỗi bộ tiêu chí đã được sử dụng nhiều lần và có thể tái sử dụng."

**Click vào:** Card "Đánh giá năng lực nhân viên văn phòng" → **Xem chi tiết**

---

## Bước 2: Tạo Chiến dịch (1.5 phút)

**Click:** Sidebar → **Tạo chiến dịch**

### Script:
> "Sau khi có bộ tiêu chí, chúng ta tạo **chiến dịch đánh giá**. Ví dụ: Đánh giá năng lực nhân viên Q4/2025."

**Hành động:**
- Điền tên chiến dịch: "Đánh giá năng lực Q4/2025"
- Chọn bộ tiêu chí: "Nhân viên văn phòng"
- Chọn phạm vi: "Toàn công ty" hoặc "Theo phòng ban"
- Chọn thời gian: Từ 01/10/2025 đến 31/10/2025

### Nói:
> "Chúng ta có thể chọn **phạm vi đánh giá** (toàn công ty hoặc từng phòng ban), **thời gian thực hiện**, và **người tham gia** (tự đánh giá, đánh giá 360 độ, hoặc chỉ quản lý đánh giá)."

**Click:** Nút **"Lưu nháp"** hoặc **"Phát hành"**

---

## Bước 3: Thực hiện Đánh giá (1 phút)

**Click:** Sidebar → **Thực hiện đánh giá**

### Script:
> "Sau khi phát hành, chiến dịch sẽ xuất hiện trong danh sách. Chúng ta có thể **theo dõi tiến độ** real-time."

**Hành động:**
- Chỉ vào bảng danh sách vòng đánh giá
- Highlight cột "Tiến độ" với progress bar
- Giải thích các trạng thái:
  - 🟢 **Đang chạy:** Nhân viên đang thực hiện
  - 🟡 **Chờ phê duyệt:** Đang chờ quản lý duyệt
  - 🔵 **Hoàn thành:** Đã có kết quả

### Nói:
> "Hệ thống tự động gửi email thông báo cho nhân viên. Nhân viên sẽ tự đánh giá qua link hoặc trên app. Quản lý có thể theo dõi **ai đã làm, ai chưa làm** và **tiến độ hoàn thành**."

**Click:** Vào 1 chiến dịch → **Xem chi tiết** hoặc **Monitor**

---

## Bước 4: Kết quả Đánh giá (1 phút)

**Click:** Sidebar → **Kết quả đánh giá**

### Script:
> "Sau khi đánh giá xong, chúng ta có **báo cáo tổng hợp** với biểu đồ, bảng xếp hạng, và **phân tích gap năng lực**."

**Hành động:**
- Chỉ vào biểu đồ radar/bar chart
- Highlight các nhân viên có điểm thấp (màu đỏ)
- Chỉ vào phần "Đề xuất đào tạo"

### Nói:
> "Hệ thống tự động phân tích và **đề xuất khóa học** cho từng nhân viên dựa trên gap năng lực. Ví dụ: Nhân viên A yếu về kỹ năng giao tiếp → Đề xuất khóa 'Kỹ năng giao tiếp hiệu quả'."

---

## Bước 5: Phúc khảo (0.5 phút)

**Click:** Sidebar → **Phúc khảo**

### Script:
> "Nếu nhân viên không đồng ý với kết quả, họ có thể **gửi phúc khảo**. Quản lý sẽ xem xét và phản hồi."

**Hành động:**
- Chỉ vào danh sách phúc khảo
- Highlight trạng thái: Chờ xử lý / Đã xử lý

---

# 📊 PHẦN 3: F2 - KHẢO SÁT & PHÂN TÍCH (4 phút)

## Bước 1: Thiết lập Dữ liệu (0.5 phút)

**Click:** Sidebar → **Khảo sát & Phân tích** → **Thiết lập dữ liệu**

### Script:
> "Trước khi khảo sát, chúng ta cần có **danh mục khóa học** để nhân viên lựa chọn."

**Hành động:**
- Scroll qua danh sách 8 khóa học với ảnh đẹp
- Hover vào card khóa học
- Chỉ vào các thông tin: Giá, Rating, Thời lượng

### Nói:
> "Hệ thống có sẵn 8 khóa học mẫu từ **Kỹ năng lãnh đạo** đến **Digital Marketing**. Mỗi khóa học có đầy đủ thông tin: giá, thời lượng, giảng viên, và đánh giá từ học viên."

---

## Bước 2: Tạo Khảo sát (1 phút)

**Click:** Sidebar → **Tạo khảo sát**

### Script:
> "Bây giờ chúng ta tạo **khảo sát nhu cầu đào tạo** dựa trên kết quả đánh giá năng lực."

**Hành động:**
- Điền tên: "Khảo sát nhu cầu đào tạo Q4/2025"
- Chọn đối tượng: "Nhân viên có điểm đánh giá < 3.5"
- Thêm câu hỏi:
  - "Bạn muốn học khóa nào?"
  - "Thời gian phù hợp?"
  - "Hình thức học (online/offline)?"

### Nói:
> "Chúng ta có thể **tự động gợi ý khóa học** dựa trên gap năng lực. Ví dụ: Nhân viên yếu kỹ năng giao tiếp → Gợi ý khóa 'Kỹ năng giao tiếp' và 'Kỹ năng thuyết trình'."

---

## Bước 3: Phân phối Khảo sát (1 phút)

**Click:** Sidebar → **Phân phối khảo sát**

### Script:
> "Sau khi tạo xong, chúng ta **phát hành khảo sát** và theo dõi tiến độ."

**Hành động:**
- Chỉ vào danh sách khảo sát
- Highlight progress bar (ví dụ: 75% đã phản hồi)
- Click vào 1 khảo sát → **Xem chi tiết**

### Nói:
> "Hệ thống hiển thị **tiến độ phản hồi real-time**. Ví dụ: 45/60 nhân viên đã trả lời (75%). Chúng ta có thể gửi nhắc nhở cho những người chưa làm."

---

## Bước 4: Báo cáo Khảo sát (1.5 phút)

**Click:** Sidebar → **Báo cáo khảo sát**

### Script:
> "Sau khi khảo sát xong, chúng ta có **báo cáo phân tích chi tiết**."

**Hành động:**
- Chỉ vào biểu đồ:
  - Top 5 khóa học được quan tâm nhất
  - Thời gian học phù hợp (buổi tối, cuối tuần...)
  - Hình thức học ưa thích (online 60%, offline 40%)
- Highlight phần "Insights"

### Nói:
> "Từ báo cáo, chúng ta thấy **85% nhân viên muốn học kỹ năng mềm**, **60% thích học online**, và **thời gian phù hợp nhất là buổi tối**. Đây là input quan trọng để lập kế hoạch đào tạo."

---

# 📚 PHẦN 4: F3 - LẬP KẾ HOẠCH ĐÀO TẠO (6 phút)

## Bước 1: Nhu cầu Đào tạo (1 phút)

**Click:** Sidebar → **Lập kế hoạch Đào tạo** → **Nhu cầu đào tạo**

### Script:
> "Dựa trên kết quả đánh giá và khảo sát, hệ thống **tự động tổng hợp nhu cầu đào tạo**."

**Hành động:**
- Chỉ vào bảng nhu cầu đào tạo
- Highlight các cột:
  - Khóa học
  - Số người quan tâm
  - Độ ưu tiên (High/Medium/Low)
  - Ngân sách ước tính

### Nói:
> "Ví dụ: **Kỹ năng lãnh đạo** có 25 người quan tâm, độ ưu tiên **High**, ngân sách ước tính **375 triệu đồng**. Hệ thống tự động tính toán dựa trên giá khóa học và số lượng người."

---

## Bước 2: Lập Kế hoạch Đào tạo (2 phút)

**Click:** Sidebar → **Lập kế hoạch đào tạo**

### Script:
> "Bây giờ chúng ta lập **kế hoạch đào tạo cụ thể** cho Q4/2025."

**Hành động:**
- Click nút **"Tạo kế hoạch mới"**
- Điền thông tin:
  - Tên: "Kế hoạch đào tạo Q4/2025"
  - Ngân sách: 1 tỷ đồng
  - Thời gian: Q4/2025
- Click **"Gợi ý tự động"** (AI suggest)

### Nói:
> "Hệ thống có tính năng **AI gợi ý tự động**. Dựa trên nhu cầu, ngân sách, và độ ưu tiên, AI sẽ đề xuất danh sách khóa học tối ưu."

**Kết quả AI suggest:**
- Kỹ năng lãnh đạo: 25 người → 375 triệu
- Quản lý dự án: 18 người → 216 triệu
- Excel nâng cao: 30 người → 150 triệu
- Kỹ năng bán hàng: 15 người → 105 triệu
- **Tổng:** 846 triệu (trong ngân sách 1 tỷ)

### Nói:
> "AI đã gợi ý 4 khóa học ưu tiên cao, tổng chi phí **846 triệu**, còn dư **154 triệu** trong ngân sách. Chúng ta có thể điều chỉnh hoặc thêm khóa học khác."

**Click:** Nút **"Lưu kế hoạch"**

---

## Bước 3: Phân rã Kế hoạch (1.5 phút)

**Click:** Sidebar → **Phân rã kế hoạch**

### Script:
> "Sau khi có kế hoạch tổng thể, chúng ta **phân rã thành các lớp học cụ thể**."

**Hành động:**
- Chọn kế hoạch: "Kế hoạch đào tạo Q4/2025"
- Chọn khóa học: "Kỹ năng lãnh đạo"
- Phân rã:
  - Lớp 1: 15 người, Tháng 10, Giảng viên A
  - Lớp 2: 10 người, Tháng 11, Giảng viên B

### Nói:
> "Với 25 người đăng ký, chúng ta chia thành **2 lớp** để đảm bảo chất lượng. Hệ thống tự động tính toán **lịch học**, **phòng học**, và **giảng viên** phù hợp."

**Click:** Nút **"Phê duyệt"** hoặc **"Gửi phê duyệt"**

---

## Bước 4: Thực hiện Kế hoạch (1 phút)

**Click:** Sidebar → **Thực hiện kế hoạch**

### Script:
> "Sau khi phê duyệt, chúng ta **triển khai lớp học** và theo dõi."

**Hành động:**
- Chỉ vào danh sách lớp học
- Highlight các trạng thái:
  - 🟢 **Đang học:** Lớp đang diễn ra
  - 🔵 **Sắp diễn ra:** Lớp sắp bắt đầu
  - ⚪ **Hoàn thành:** Lớp đã kết thúc
- Click vào 1 lớp → **Xem chi tiết**

### Nói:
> "Chúng ta có thể xem **danh sách học viên**, **lịch học**, **điểm danh**, và **kết quả học tập**. Hệ thống tự động gửi thông báo nhắc nhở cho học viên."

---

# 🔄 PHẦN 5: VÒNG LẶP & CẢI TIẾN LIÊN TỤC (2 phút)

## Kết nối giữa các module:

### Script:
> "Đây là **vòng lặp cải tiến liên tục**:"

### Giải thích flow:

```
1. ĐÁNH GIÁ NĂNG LỰC (F1)
   ↓ Phát hiện gap
   
2. KHẢO SÁT NHU CẦU (F2)
   ↓ Xác định nhu cầu thực tế
   
3. LẬP KẾ HOẠCH ĐÀO TẠO (F3)
   ↓ Thực hiện đào tạo
   
4. ĐÁNH GIÁ LẠI (F1)
   ↓ Kiểm tra hiệu quả
   
→ Lặp lại chu kỳ
```

### Nói:
> "Sau khi đào tạo xong, chúng ta **đánh giá lại năng lực** để xem hiệu quả. Nếu còn gap, tiếp tục khảo sát và đào tạo. Đây là **vòng lặp cải tiến liên tục** giúp nâng cao năng lực đội ngũ."

---

# 📊 PHẦN 6: DASHBOARD & BÁO CÁO (2 phút)

**Click:** Sidebar → **Dashboard**

### Script:
> "Cuối cùng, **Dashboard tổng quan** giúp lãnh đạo nắm bắt toàn cảnh."

**Hành động:**
- Chỉ vào các KPI cards:
  - 📋 **Khảo sát:** 5 đang chạy, 3 sắp đến hạn
  - 🏆 **Đánh giá:** 2 chiến dịch, 150 người tham gia
  - 📚 **Đào tạo:** 8 lớp đang học, 200 học viên
- Chỉ vào biểu đồ xu hướng
- Highlight phần "Cảnh báo" (alerts)

### Nói:
> "Dashboard hiển thị **KPI real-time** của cả 3 module. Lãnh đạo có thể thấy **xu hướng cải thiện năng lực**, **ROI đào tạo**, và **các vấn đề cần xử lý**."

**Click:** Tab **"Báo cáo"**

### Nói:
> "Hệ thống cung cấp **báo cáo tổng hợp** theo tháng/quý/năm, có thể **export Excel** để trình lãnh đạo."

---

# 🎯 PHẦN 7: KẾT LUẬN & Q&A (2 phút)

## Tóm tắt lợi ích:

### Script:
> "Tóm lại, hệ thống Thadico HRM mang lại 5 lợi ích chính:"

### 5 Lợi ích:

1. **🎯 Đánh giá chính xác:** Bộ tiêu chí chuẩn, quy trình minh bạch
2. **📊 Dữ liệu thực tế:** Khảo sát nhu cầu từ chính nhân viên
3. **🤖 AI gợi ý:** Tự động đề xuất kế hoạch đào tạo tối ưu
4. **⏱️ Tiết kiệm thời gian:** Tự động hóa 80% công việc thủ công
5. **📈 Cải tiến liên tục:** Vòng lặp đánh giá → đào tạo → đánh giá lại

### Kết thúc:
> "Cảm ơn quý vị đã theo dõi! Chúng tôi sẵn sàng trả lời câu hỏi và hỗ trợ triển khai hệ thống cho doanh nghiệp của quý vị."

---

# 📝 CHECKLIST TRƯỚC KHI DEMO

## Kỹ thuật:
- [ ] Website đã deploy phiên bản mới nhất
- [ ] Test tất cả links không bị 404
- [ ] Data mẫu đầy đủ và đẹp
- [ ] Ảnh khóa học load nhanh
- [ ] UI responsive trên màn hình demo

## Nội dung:
- [ ] Đọc kỹ script 2-3 lần
- [ ] Luyện tập flow 1-2 lần
- [ ] Chuẩn bị trả lời câu hỏi thường gặp
- [ ] In tài liệu backup (nếu có)

## Thiết bị:
- [ ] Laptop/máy chiếu hoạt động tốt
- [ ] Internet ổn định
- [ ] Trình duyệt đã test (Chrome recommended)
- [ ] Backup plan nếu mất mạng (video demo)

---

# ❓ CÂU HỎI THƯỜNG GẶP

### Q1: "Hệ thống có tích hợp với phần mềm nhân sự hiện tại không?"
**A:** "Có, hệ thống hỗ trợ API tích hợp với các phần mềm HRM phổ biến như SAP, Oracle HCM, hoặc hệ thống nội bộ qua REST API."

### Q2: "Nhân viên có cần cài app không?"
**A:** "Không cần. Nhân viên truy cập qua **web browser** hoặc nhận link qua email. Chúng tôi cũng có app mobile cho iOS/Android (optional)."

### Q3: "Thời gian triển khai bao lâu?"
**A:** "Thông thường **2-4 tuần** tùy quy mô:
- Tuần 1: Setup hệ thống, import dữ liệu
- Tuần 2: Đào tạo admin và HR
- Tuần 3: Pilot với 1 phòng ban
- Tuần 4: Rollout toàn công ty"

### Q4: "Chi phí bao nhiêu?"
**A:** "Chi phí phụ thuộc vào số lượng nhân viên và module sử dụng. Chúng tôi có gói **SaaS** từ 50 triệu/năm cho 100 users, hoặc **license vĩnh viễn** cho doanh nghiệp lớn."

### Q5: "Bảo mật dữ liệu như thế nào?"
**A:** "Hệ thống tuân thủ chuẩn **ISO 27001**, mã hóa dữ liệu **AES-256**, và có **backup tự động** hàng ngày. Dữ liệu được lưu trữ tại Việt Nam theo quy định PDPA."

---

# 🎨 TIPS DEMO HIỆU QUẢ

### 1. **Kể chuyện thực tế**
Thay vì nói "Đây là tính năng X", hãy nói "Ví dụ công ty A có vấn đề Y, họ dùng tính năng X và giải quyết được..."

### 2. **Tương tác với khách hàng**
Hỏi: "Hiện tại công ty quý vị đánh giá nhân viên như thế nào?" → Liên kết với giải pháp của hệ thống

### 3. **Highlight ROI**
Nhấn mạnh: "Tiết kiệm 80% thời gian", "Tăng hiệu quả đào tạo 50%", "Giảm turnover rate 30%"

### 4. **Demo mượt mà**
- Không click lung tung
- Mỗi click phải có mục đích
- Giải thích trước khi click

### 5. **Xử lý lỗi**
Nếu có lỗi kỹ thuật:
- Giữ bình tĩnh
- Nói: "Đây là môi trường demo, trong production sẽ ổn định hơn"
- Chuyển sang phần khác hoặc dùng backup plan

---

# 🚀 SAU DEMO

### Follow-up:
1. Gửi email cảm ơn + tài liệu chi tiết
2. Đề xuất lịch họp tiếp theo
3. Gửi báo giá (nếu có yêu cầu)
4. Lên lịch POC (Proof of Concept) nếu khách quan tâm

### Materials cần gửi:
- [ ] Slide demo (PDF)
- [ ] Tài liệu kỹ thuật
- [ ] Case study (nếu có)
- [ ] Báo giá
- [ ] Link demo: https://namivince.github.io/thadico_mockup

---

**Chúc bạn demo thành công! 🎉**

*Nếu cần hỗ trợ kỹ thuật trong lúc demo, liên hệ: Nguyễn Phúc Vinh - 0xxx xxx xxx*
