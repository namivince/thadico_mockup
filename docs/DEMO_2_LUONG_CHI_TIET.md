# 🎬 KỊCH BẢN DEMO 2 LUỒNG CHÍNH - CHI TIẾT

**Thời gian:** 10-12 phút  
**Mục tiêu:** Demo 2 luồng nghiệp vụ quan trọng nhất

---

## 📋 LUỒNG 1: ĐÁNH GIÁ TÂY NGHỀ (6-7 phút)

### 🎯 Mục tiêu luồng:
Từ thiết lập đề thi → Tạo chiến dịch → Học viên làm bài → Chấm bài → Công bố kết quả → Phúc khảo

---

## BƯỚC 1: THIẾT LẬP DANH MỤC ĐỀ THI (1 phút)

### 🎤 Script nói:
> "Đầu tiên, chúng ta cần có **bộ đề thi** để đánh giá tay nghề. Hệ thống đã chuẩn bị sẵn 8 bộ đề cho các vị trí khác nhau."

### 👆 Thao tác:
1. **Click:** Sidebar → **Đánh giá Năng lực** → **Thiết lập danh mục**
2. **Scroll** qua các card bộ đề:
   - 💼 Nhân viên văn phòng (12 tiêu chí)
   - 👔 Quản lý cấp trung (15 tiêu chí)
   - 📊 Kỹ năng bán hàng (10 tiêu chí)
   - 💻 Kỹ năng kỹ thuật IT (18 tiêu chí)
3. **Hover** vào 1 card để show hiệu ứng
4. **Click** "Xem chi tiết" vào bộ đề "Nhân viên văn phòng"

### 🎤 Nói trong lúc thao tác:
> "Mỗi bộ đề có từ 10-18 tiêu chí đánh giá, đã được sử dụng nhiều lần và có thể tái sử dụng. Ví dụ bộ đề **Nhân viên văn phòng** có 12 tiêu chí bao gồm: kỹ năng giao tiếp, làm việc nhóm, sử dụng công nghệ..."

### 💡 Highlight:
- **Chỉ vào:** Số lượng tiêu chí (12 tiêu chí)
- **Chỉ vào:** Số lần sử dụng (Đã dùng 5 lần)
- **Chỉ vào:** Button "Import Excel" (nếu có)

---

## BƯỚC 2: TẠO CHIẾN DỊCH ĐÁNH GIÁ (1.5 phút)

### 🎤 Script nói:
> "Sau khi có bộ đề, chúng ta tạo **chiến dịch đánh giá** - tức là một kỳ thi cụ thể."

### 👆 Thao tác:
1. **Click:** Sidebar → **Tạo chiến dịch**
2. **Điền form:**
   - Tên: "Đánh giá tay nghề Q4/2025"
   - Chọn bộ đề: "Nhân viên văn phòng"
   - Phạm vi: "Toàn công ty" hoặc "Theo phòng ban"
   - Thời gian: 01/10/2025 - 31/10/2025
3. **Scroll xuống** phần "Cấu hình Phúc khảo"
4. **Chỉ vào:**
   - Số lần phúc khảo: 3 lần
   - Thời gian mở phúc khảo: 7 ngày
5. **Click:** Nút "Lưu nháp" hoặc "Phát hành"

### 🎤 Nói trong lúc thao tác:
> "Chúng ta có thể chọn **phạm vi đánh giá** - toàn công ty hoặc từng phòng ban cụ thể. Đặc biệt, hệ thống cho phép cấu hình **phúc khảo**: học viên có thể phúc khảo tối đa **3 lần** trong vòng **7 ngày** kể từ khi công bố kết quả."

### 💡 Highlight:
- **Alert box** cấu hình phúc khảo
- **Tooltip** giải thích số lần và thời gian

---

## BƯỚC 3: HỌC VIÊN LÀM BÀI (0.5 phút)

### 🎤 Script nói:
> "Sau khi phát hành, học viên sẽ nhận email thông báo và link làm bài. Họ truy cập vào hệ thống để làm bài thi."

### 👆 Thao tác:
1. **Click:** Sidebar → **Thực hiện đánh giá**
2. **Chỉ vào** danh sách chiến dịch
3. **Chỉ vào** progress bar: "85% đã hoàn thành"
4. **Chỉ vào** trạng thái: "Đang chạy"

### 🎤 Nói:
> "Hệ thống tự động gửi email + link làm bài. Học viên làm bài online, hệ thống tự động lưu. Chúng ta có thể theo dõi **tiến độ real-time**: 85% đã hoàn thành."

### 💡 Highlight:
- Progress bar màu xanh
- Số liệu: 42/50 người đã làm

---

## BƯỚC 4: CHẤM BÀI VỚI SLA (2 phút)

### 🎤 Script nói:
> "Sau khi học viên nộp bài, giảng viên vào chấm. Đây là điểm đặc biệt: hệ thống có **SLA countdown** để đảm bảo chấm đúng hạn."

### 👆 Thao tác:
1. **Click:** Tab "Chấm bài" hoặc vào màn hình Grading Console
2. **Chỉ vào bảng** danh sách bài cần chấm
3. **HIGHLIGHT cột SLA:**
   - Bài 1: `02:13:54` (màu xanh - còn nhiều thời gian)
   - Bài 2: `00:45:30` (màu cam - sắp hết hạn)
   - Bài 3: `00:02:15` (màu đỏ - rất gấp!)
   - Bài 4: **"QUÁ HẠN SLA"** (màu đỏ + nút "Gia hạn")

### 🎤 Nói trong lúc chỉ:
> "Mỗi bài có **SLA countdown** với màu sắc:
> - **Xanh**: Còn nhiều thời gian (>24h)
> - **Cam**: Sắp hết hạn (6-24h) - cần ưu tiên
> - **Đỏ**: Rất gấp (<6h)
> - **Quá hạn**: Hiển thị warning và nút **Gia hạn**"

### 👆 Thao tác tiếp:
4. **Click** vào bài "Quá hạn"
5. **Click** nút "Gia hạn" (mock)
6. **Chỉ vào** modal: "Gia hạn thêm 24 giờ"
7. **Click** vào 1 bài khác để chấm
8. **Điền điểm:** 8.5
9. **Điền nhận xét:** "Thực hiện tốt"
10. **Click** "Lưu" hoặc "Hoàn tất"

### 💡 Highlight:
- **Countdown timer** với animation
- **Nút "Gia hạn"** màu đỏ
- **Số bài quá hạn** ở header: "4 bài quá hạn"

---

## BƯỚC 5: HỌC VIÊN NHẬN KẾT QUẢ (0.5 phút)

### 🎤 Script nói:
> "Sau khi giảng viên chấm xong và admin công bố, học viên nhận được **popup thông báo**."

### 👆 Thao tác:
1. **Click** nút "Công bố kết quả" (nếu có màn hình)
2. **Show modal** (hoặc mô tả):
   - Icon success ✅
   - Text: "Bài thi đã được ghi nhận"
   - "Kết quả sẽ được công bố trước ngày **15/10/2025**"
   - "Bạn sẽ nhận email thông báo"

### 🎤 Nói:
> "Học viên thấy popup này ngay sau khi nộp bài. Họ biết rõ **ngày nào có kết quả** và sẽ nhận **email tự động**."

---

## BƯỚC 6: CÔNG BỐ KẾT QUẢ (0.5 phút)

### 🎤 Script nói:
> "Admin công bố kết quả, học viên xem điểm và có thể phúc khảo nếu không đồng ý."

### 👆 Thao tác:
1. **Click:** Sidebar → **Kết quả đánh giá**
2. **Chỉ vào:**
   - Biểu đồ radar năng lực
   - Danh sách học viên với điểm
   - Phần "Đề xuất đào tạo"

### 🎤 Nói:
> "Hệ thống tự động phân tích và **đề xuất khóa học** cho từng học viên dựa trên điểm yếu. Ví dụ: Học viên A yếu về giao tiếp → Đề xuất khóa 'Kỹ năng giao tiếp'."

---

## BƯỚC 7: PHÚC KHẢO (1 phút)

### 🎤 Script nói:
> "Nếu học viên không đồng ý với kết quả, họ có thể gửi **phúc khảo** với giới hạn rõ ràng."

### 👆 Thao tác:
1. **Click:** Sidebar → **Phúc khảo**
2. **Chỉ vào bảng** danh sách phúc khảo
3. **HIGHLIGHT các cột:**
   - **Số lần / Giới hạn:** `1/3` (màu xanh)
   - **Số lần / Giới hạn:** `3/3` (màu đỏ - hết lượt)
   - **Deadline:** `15/10/2025` (còn 5 ngày)
   - **Deadline:** `10/10/2025` (quá hạn - màu đỏ)

### 🎤 Nói trong lúc chỉ:
> "Hệ thống tự động theo dõi:
> - Học viên A đã phúc khảo **1/3 lần** - còn 2 lần
> - Học viên B đã **hết lượt** (3/3) - không thể phúc khảo nữa
> - **Deadline** rõ ràng - quá 7 ngày sẽ không nhận phúc khảo"

### 👆 Thao tác tiếp:
4. **Click** vào 1 phúc khảo
5. **Xem chi tiết:**
   - Lý do phúc khảo
   - File đính kèm
   - Lịch sử phúc khảo
6. **Click** "Chấp nhận" hoặc "Từ chối"

### 💡 Highlight:
- **Tag màu đỏ** khi hết lượt
- **Icon clock** khi còn thời gian
- **Warning** khi quá deadline

---

## 🎯 KẾT LUẬN LUỒNG 1:

### 🎤 Script kết:
> "Vậy là chúng ta đã đi qua toàn bộ luồng **Đánh giá tay nghề**:
> 1. ✅ Thiết lập bộ đề
> 2. ✅ Tạo chiến dịch với cấu hình phúc khảo
> 3. ✅ Học viên làm bài
> 4. ✅ Chấm bài với **SLA countdown** màu sắc
> 5. ✅ Công bố kết quả
> 6. ✅ Phúc khảo với **giới hạn rõ ràng** (3 lần, 7 ngày)
> 
> Tất cả đều **tự động**, **minh bạch**, và có **SLA đảm bảo tiến độ**."

---

---

## 📋 LUỒNG 2: KHẢO SÁT → LẬP KẾ HOẠCH ĐÀO TẠO (5-6 phút)

### 🎯 Mục tiêu luồng:
Từ thiết lập khóa học → Tạo khảo sát → Phân phối → Phân tích → Lập kế hoạch → Phê duyệt → Triển khai

---

## BƯỚC 1: THIẾT LẬP DỮ LIỆU KHÓA HỌC (0.5 phút)

### 🎤 Script nói:
> "Trước khi khảo sát, chúng ta cần có **danh mục khóa học** để nhân viên lựa chọn."

### 👆 Thao tác:
1. **Click:** Sidebar → **Khảo sát & Phân tích** → **Thiết lập dữ liệu**
2. **Scroll** qua 8 khóa học với ảnh đẹp:
   - Kỹ năng lãnh đạo - 15 triệu
   - Quản lý dự án - 12 triệu
   - Excel nâng cao - 5 triệu
   - Digital Marketing - 10 triệu
3. **Hover** vào 1 card
4. **Chỉ vào:** Giá, Rating, Thời lượng

### 🎤 Nói:
> "Hệ thống có sẵn 8 khóa học với đầy đủ thông tin: **giá**, **thời lượng**, **giảng viên**, và **đánh giá** từ học viên trước."

---

## BƯỚC 2: TẠO KHẢO SÁT NHU CẦU (1 phút)

### 🎤 Script nói:
> "Bây giờ chúng ta tạo **khảo sát** để hỏi nhân viên muốn học gì."

### 👆 Thao tác:
1. **Click:** Sidebar → **Tạo khảo sát**
2. **Điền form:**
   - Tên: "Khảo sát nhu cầu đào tạo Q4/2025"
   - Chọn đối tượng: "Nhân viên có điểm đánh giá < 3.5"
   - Thêm câu hỏi:
     - "Bạn muốn học khóa nào?"
     - "Thời gian phù hợp?"
     - "Hình thức học (online/offline)?"
3. **Click:** "Lưu nháp"

### 🎤 Nói trong lúc thao tác:
> "Chúng ta có thể **tự động gợi ý khóa học** dựa trên kết quả đánh giá. Ví dụ: Nhân viên yếu về giao tiếp → Hệ thống tự động gợi ý khóa 'Kỹ năng giao tiếp' trong khảo sát."

### 💡 Highlight:
- **Smart targeting:** "Nhân viên điểm < 3.5"
- **Auto suggest:** Khóa học dựa trên gap

---

## BƯỚC 3: PHÂN PHỐI KHẢO SÁT (1 phút)

### 🎤 Script nói:
> "Sau khi tạo xong, chúng ta **phát hành khảo sát** và theo dõi tiến độ real-time."

### 👆 Thao tác:
1. **Click:** Sidebar → **Phân phối khảo sát**
2. **Chỉ vào** danh sách khảo sát
3. **HIGHLIGHT:**
   - Progress bar: **75% đã phản hồi** (113/150)
   - **Badge "🟢 Realtime"** + "Synced 1m ago"
4. **Click** vào 1 khảo sát → **Xem chi tiết**
5. **Chỉ vào** tab "Chưa trả lời"
6. **HIGHLIGHT nút "Từ chối"** (màu đỏ)

### 🎤 Nói trong lúc chỉ:
> "Hệ thống hiển thị **tiến độ real-time**: 113/150 người đã trả lời (75%). 
> 
> Đặc biệt, nhân viên có thể **từ chối tham gia** với lý do bắt buộc. Ví dụ: 'Đang bận dự án khẩn cấp'. Lý do này sẽ được gửi đến HR để xem xét."

### 👆 Thao tác tiếp:
7. **Click** nút "Từ chối" của 1 nhân viên
8. **Show modal:**
   - Textarea: "Vui lòng nhập lý do từ chối"
   - Validation: "Tối thiểu 10 ký tự"
   - Alert: "Lý do sẽ được gửi đến HR"
9. **Click** "Xác nhận từ chối"

### 💡 Highlight:
- **Realtime badge** nhấp nháy
- **Nút "Từ chối"** màu đỏ
- **Modal bắt buộc lý do**

---

## BƯỚC 4: PHÂN TÍCH KẾT QUẢ KHẢO SÁT (1 phút)

### 🎤 Script nói:
> "Sau khi khảo sát xong, chúng ta có **báo cáo phân tích chi tiết** với insights."

### 👆 Thao tác:
1. **Click:** Sidebar → **Báo cáo khảo sát**
2. **Chỉ vào các biểu đồ:**
   - **Top 5 khóa học** được quan tâm:
     - Kỹ năng lãnh đạo: 85 người (75%)
     - Excel nâng cao: 60 người (53%)
   - **Thời gian ưa thích:**
     - Buổi tối: 68 người (60%)
     - Cuối tuần: 30 người (27%)
   - **Hình thức học:**
     - Online: 68 người (60%)
     - Offline: 32 người (28%)
3. **Scroll xuống** phần "Insights"

### 🎤 Nói trong lúc chỉ:
> "Từ báo cáo, chúng ta thấy:
> - **85% muốn học kỹ năng mềm**
> - **60% thích học online**
> - **Buổi tối** là thời gian phù hợp nhất
> 
> Đây là input quan trọng để lập kế hoạch đào tạo."

### 💡 Highlight:
- **Biểu đồ màu sắc** đẹp
- **Insights box** màu xanh
- **Recommendations**

---

## BƯỚC 5: LẬP KẾ HOẠCH ĐÀO TẠO VỚI AI (1.5 phút)

### 🎤 Script nói:
> "Dựa trên kết quả khảo sát, chúng ta lập **kế hoạch đào tạo** với sự hỗ trợ của **AI**."

### 👆 Thao tác:
1. **Click:** Sidebar → **Lập kế hoạch Đào tạo** → **Lập kế hoạch đào tạo**
2. **Click** "Tạo kế hoạch mới"
3. **Điền form:**
   - Tên: "Kế hoạch đào tạo Q4/2025"
   - Ngân sách: **1 tỷ đồng**
   - Thời gian: Q4/2025
4. **HIGHLIGHT:** Link "Dựa trên khảo sát #123"
5. **Click** nút "Gợi ý tự động" (AI)
6. **Chờ loading** (2-3 giây)

### 🎤 Nói trong lúc chờ:
> "Hệ thống có tính năng **AI gợi ý tự động**. AI sẽ phân tích:
> - Kết quả khảo sát
> - Ngân sách
> - Độ ưu tiên
> - Số lượng người quan tâm
> 
> Và đề xuất danh sách khóa học **tối ưu nhất**."

### 👆 Thao tác tiếp:
7. **Show kết quả AI:**
   ```
   ✅ Kỹ năng lãnh đạo: 85 người → 375 triệu
   ✅ Quản lý dự án: 18 người → 216 triệu
   ✅ Excel nâng cao: 30 người → 150 triệu
   ✅ Kỹ năng bán hàng: 15 người → 105 triệu
   ────────────────────────────────────────
   Tổng: 846 triệu (Còn dư: 154 triệu)
   ROI dự kiến: 250%
   ```
8. **Chỉ vào từng dòng** và giải thích

### 🎤 Nói:
> "AI đã gợi ý 4 khóa học ưu tiên cao, tổng chi phí **846 triệu**, còn dư **154 triệu** trong ngân sách. Chúng ta có thể điều chỉnh hoặc thêm khóa học khác."

### 💡 Highlight:
- **AI icon** nhấp nháy
- **Tổng ngân sách** màu xanh
- **ROI prediction**

---

## BƯỚC 6: PHÊ DUYỆT KẾ HOẠCH (0.5 phút)

### 🎤 Script nói:
> "Sau khi lập xong, kế hoạch cần **phê duyệt** từ cấp trên."

### 👆 Thao tác:
1. **Click** "Gửi phê duyệt"
2. **Chỉ vào** workflow phê duyệt:
   - Level 1: Trưởng phòng ✅ (Đã duyệt)
   - Level 2: Giám đốc Nhân sự ⏳ (Chờ duyệt)
   - Level 3: Tổng Giám đốc ⏸️ (Chưa đến lượt)
3. **Chỉ vào** timeline

### 🎤 Nói:
> "Kế hoạch đi qua **3 cấp phê duyệt**. Hiện tại đang chờ Giám đốc Nhân sự. Hệ thống tự động gửi email nhắc nhở và theo dõi SLA phê duyệt."

---

## BƯỚC 7: TRIỂN KHAI LỚP HỌC (1 phút)

### 🎤 Script nói:
> "Sau khi được duyệt, chúng ta **triển khai lớp học** cụ thể."

### 👆 Thao tác:
1. **Click:** Sidebar → **Thực hiện kế hoạch**
2. **Chỉ vào** danh sách lớp học
3. **HIGHLIGHT cột "Sync Status":**
   - Lớp 1: **🟢 Synced** + "Last sync at 14:30"
   - Lớp 2: **🔴 Failed** + "Last sync at 10:00" + nút "Retry"
   - Lớp 3: **🟡 Syncing...** (đang đồng bộ)
4. **Click** vào lớp "Failed"
5. **Xem lỗi:** "LMS connection timeout"
6. **Click** nút "Retry"

### 🎤 Nói trong lúc chỉ:
> "Hệ thống tự động **đồng bộ với LMS và Calendar**:
> - **Synced**: Đã đồng bộ thành công
> - **Failed**: Lỗi kết nối → Có nút **Retry**
> - **Syncing**: Đang đồng bộ
> 
> Tất cả thông tin lớp học, học viên, giảng viên đều tự động cập nhật sang LMS."

### 💡 Highlight:
- **Badge màu sắc** rõ ràng
- **Timestamp** "Last sync at..."
- **Nút Retry** khi failed

---

## 🎯 KẾT LUẬN LUỒNG 2:

### 🎤 Script kết:
> "Vậy là chúng ta đã đi qua toàn bộ luồng **Khảo sát → Lập kế hoạch**:
> 1. ✅ Thiết lập danh mục khóa học
> 2. ✅ Tạo khảo sát với **smart targeting**
> 3. ✅ Phân phối với **realtime tracking** + cho phép **từ chối có lý do**
> 4. ✅ Phân tích kết quả với **insights**
> 5. ✅ **AI gợi ý** kế hoạch tối ưu
> 6. ✅ Workflow phê duyệt rõ ràng
> 7. ✅ Triển khai với **auto sync LMS/Calendar**
> 
> Tất cả đều **tự động hóa**, **data-driven**, và có **AI hỗ trợ quyết định**."

---

## 🎬 KẾT LUẬN CHUNG 2 LUỒNG:

### 🎤 Script kết tổng:
> "Hai luồng này cho thấy sức mạnh của hệ thống Thadico HRM:
> 
> **Luồng 1 - Đánh giá:**
> - ✅ SLA countdown đảm bảo tiến độ
> - ✅ Phúc khảo minh bạch với giới hạn rõ ràng
> - ✅ Tự động đề xuất đào tạo
> 
> **Luồng 2 - Khảo sát & Kế hoạch:**
> - ✅ Realtime tracking
> - ✅ AI gợi ý tối ưu ngân sách
> - ✅ Auto sync LMS/Calendar
> 
> **Kết quả:**
> - ⏱️ Tiết kiệm **80% thời gian**
> - 📊 Dữ liệu **100% chính xác**
> - 🎯 Quyết định **dựa trên data**
> - 💰 ROI tăng **250%**"

---

## 📝 TIPS DEMO HIỆU QUẢ:

### 1. **Chuẩn bị:**
- [ ] Luyện tập 2-3 lần trước
- [ ] Mở sẵn các tab cần thiết
- [ ] Check data đã đầy đủ

### 2. **Trong lúc demo:**
- ✅ Nói chậm, rõ ràng
- ✅ Chỉ tay vào màn hình
- ✅ Highlight các điểm quan trọng
- ✅ Dừng lại cho khách hỏi

### 3. **Xử lý tình huống:**
- **Nếu lỗi:** "Đây là môi trường demo, production sẽ ổn định hơn"
- **Nếu khách hỏi:** Trả lời ngắn gọn, quay lại demo
- **Nếu mất mạng:** Có video backup

---

**Chúc bạn demo thành công! 🎉**
