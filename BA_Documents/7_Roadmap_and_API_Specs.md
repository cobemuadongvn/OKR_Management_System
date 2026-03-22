# Roadmap & Technical Specifications

## 1. Product Roadmap (Lộ trình phát triển)
Hệ thống quản lý OKR sẽ được chia thành nhiều Phase để đảm bảo tính khả thi và Launch nhanh chóng (Agile).

### Phase 1: MVP (Minimum Viable Product) - Đã hoàn thành (Demo hiện tại)
- Quản lý danh sách Objective và Key Results.
- Báo cáo tiến độ (Progress Tracking) qua tính toán %.
- Giao diện Dashboard cơ bản.
- Flow Login & Logout.

### Phase 2: Collaboration & Feedback (Quý tiếp theo)
- **Tích hợp Email/Slack/Teams Notification**: Gửi thông báo khi OKR bị "At Risk" hoặc khi có người Comment.
- **Tính năng Check-in 1-on-1**: Form ghi nhận feedback hàng tuần giữa Manager và Employee trực tiếp trên hệ thống.
- **Lịch sử thay đổi (Audit Logging)**: Lưu vết toàn bộ các thay đổi giá trị của KR để chống gian lận dữ liệu.

### Phase 3: Advanced Analytics & AI (Tương lai)
- **Biểu đồ đa chiều (Advanced Charts)**: Heatmap, Trendline dự báo khả năng hoàn thành mục tiêu.
- **AI Suggestion**: Gợi ý tạo Key Result dựa trên lịch sử dữ liệu của phòng ban.

---

## 2. Yêu cầu phi chức năng (Non-Functional Requirements - NFR)

1. **Hiệu năng (Performance)**
   - Thời gian load trang Dashboard (có chứa chart) tối đa không quá **2 giây** với dữ liệu của 10.000 OKRs.
   - Thao tác cập nhật `ProgressUpdates` phản hồi dưới **500ms**.

2. **Bảo mật (Security)**
   - Mật khẩu phải được mã hóa hash (Bcrypt).
   - Xác thực qua JWT (JSON Web Token), token hết hạn sau 24h.
   - Ngăn chặn triệt để lỗ hổng XSS trên các trường "Comment" và "Tên Objective".

3. **Khả năng mở rộng (Scalability)**
   - Hệ thống Cloud (AWS/Azure) cần sẵn sàng Auto-Scale khi các kỳ "Check-in" cuối quý diễn ra đông đảo cùng lúc.

---

## 3. Sample API Specification (Dành cho Developer)

### API 1: Tạo mới Objective
- **Endpoint**: `POST /api/v1/objectives`
- **Mô tả**: Tạo một Objective mới cho một Quý.
- **Header**: `Authorization: Bearer <token>`
- **Request Body (JSON)**:
  ```json
  {
    "title": "Mở rộng thị trường Đông Nam Á",
    "quarter": "Q1/2026",
    "description": "Tập trung vào Thái Lan và Indonesia"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "id": 105,
    "title": "Mở rộng thị trường Đông Nam Á",
    "status": "On Track",
    "overallProgress": 0
  }
  ```

### API 2: Cập nhật tiến độ Key Result
- **Endpoint**: `PUT /api/v1/key-results/{id}/progress`
- **Mô tả**: User nhập giá trị mới đạt được để cập nhật % tiến độ.
- **Request Body**:
  ```json
  {
    "current_value": 50,
    "comment": "Đã ký xong hợp đồng với đối tác Thái Lan"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "message": "Cập nhật thành công",
    "new_percentage": 50.0,
    "objective_status_updated": "On Track"
  }
  ```
