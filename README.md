# PROJECT 1: OKR Management System for Enterprise

Hệ thống được thiết kế hướng tới các tổ chức muốn chuẩn hóa việc quản lý mục tiêu phòng ban và cá nhân.

## 1. Hệ thống Tài liệu Business Analyst (Nằm tại thư mục BA_Documents)

1. **1_Business_Requirement_Summary.md**: Bao quát Problem, Product Goal & Benefits. Giúp PM/C-Level hiểu tại sao cần dự án này.
2. **2_User_Personas.md**: Thể hiện khả năng User empathy (Thấu cảm người dùng) cho 3 nhóm Admin, Manager, Employee.
3. **3_User_Stories_and_Acceptance_Criteria.md**: Core value của BA. Chứa các Story theo cấu trúc "As a... I want to... so that..." kèm Acceptance criteria logic.
4. **4_UML_Diagrams.md**: Chứa luồng hoạt động (nghiệp vụ) và Use Case Diagram.
5. **5_Test_Cases.md**: Bộ khung test case kiểm duyệt chất lượng dựa theo Acceptance Criteria.
6. **6_Data_Model_Basic.md**: Khái quát các Table dữ liệu và quan hệ (SQL/NoSQL).

---

## 2. Bản Demo Web Prototype (Nằm tại thư mục okr-demo)
Project demo này được xây dựng trên **React + Vite** với một thiết kế cực kỳ hiện đại (Premium UI), dùng Vanilla CSS.

### Các tính năng đã có trong Bản Web Demo:
- **Đăng nhập giao diện Doanh Nghiệp** (Mockup login không cần backend, ấn Đăng Nhập để vào).
- **Dashboard Tổng Quan**: Menu điều hướng, Thống kê các số liệu trung tâm (Tiến độ chung, Tổng OKR, Đang rủi ro).
- **Bộ Lọc & Phân loại OKR**: Tích hợp bộ lọc trên danh sách giúp xem nhanh OKR theo Quý (Q1-Q4, Năm) và Trạng thái tiến độ.
- **Danh sách OKR**: Visual Card thông tin Objective có thiết kế gradient tracking cao cấp (Premium UI).
- **Tính năng Quản trị Objective**: Thêm mới Mục tiêu (có tùy chọn chu kỳ Quý/Năm), Xóa Mục tiêu.
- **Tính năng Quản trị Key Result (KR)**: Thêm mới Kết quả then chốt linh hoạt kèm đơn vị, Xóa Kết quả then chốt.
- **Workflow Cập nhật Tiến độ (Check-in)**: Click *Cập nhật* để thay đổi giá trị thực tế của KR kèm phần nhập "Ghi chú/Khó khăn". 
- **Lịch sử Check-in**: Hiển thị báo cáo lịch sử cập nhật gần nhất ngay dưới từng KR.
- **Business Logic Tự Động**: Hệ thống sẽ tự động tổng hợp tính toán lại phần trăm (%) hoàn thành của Objective và tự chuyển đổi trạng thái (On Track / At Risk) ngay lập tức theo thời gian thực. Hỗ trợ logic cả loại KR nghịch đảo (vd: giảm downtime).

### Hướng dẫn chạy App Demo:
1. Mở PowerShell hoặc Terminal (VSCode).
2. Trỏ vào thư mục app: `cd d:\Project_1\okr-demo`
3. Chờ quá trình cài đặt React kết thúc (nếu chưa cài xong hãy chạy `npm install`).
4. Chạy App: `npm run dev`
5. Click vào link Local host (VD: `http://localhost:5173`) để mở app trên trình duyệt.

