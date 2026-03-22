# User Stories & Acceptance Criteria

Dưới đây là tập hợp User Stories (US) và Acceptance Criteria (AC) cho phiên bản MVP (Minimum Viable Product).

---

## Epic 1: Authentication & User Access
**US-01: Đăng nhập hệ thống**
- **User Story:** As a User (Admin/Manager/Employee), I want to login to the system using my credentials so that I can access my personalized OKR workspace.
- **Acceptance Criteria:**
  1. Yêu cầu nhập Email/Username và Mật khẩu.
  2. Báo lỗi rõ ràng nếu sai tài khoản/mật khẩu, định dạng sai (ví dụ: "Email không tồn tại").
  3. Đăng nhập thành công, hệ thống điều hướng đến trang Dashboard tương ứng với Role của User.

**US-02: Đăng xuất**
- **User Story:** As a User, I want to log out easily so that my account information is safe when I leave the device.
- **Acceptance Criteria:**
  1. Có sẵn nút Logout ở Menu / Header (Profile dropdown).
  2. Click Logout hệ thống xóa session và điều hướng về trang Login.

---

## Epic 2: Objective & Key Result Management (Tạo & Gán OKR)

**US-03: Tạo Objective mới**
- **User Story:** As a Manager, I want to create a new Objective for my team so that we can align our work with company goals for the quarter.
- **Acceptance Criteria:**
  1. Chỉ Role Manager/Admin mới có nút "Create Objective".
  2. Form bắt buộc nhập các trường: Tên Objective, Quý (Cycle - VD: Q1/2026).
  3. Lưu thành công, thông báo "Tạo Objective thành công" và Objective hiển thị trên danh sách của bộ phận đó, mức hoàn thành mặc định là 0%.

**US-04: Thêm Key Result vào Objective**
- **User Story:** As a Manager, I want to add Key Results to an Objective so that we can measure the success of that Objective quantitatively.
- **Acceptance Criteria:**
  1. Có thể thêm 1 đến tối đa 5 KR cho mỗi Objective.
  2. Mỗi KR bắt buộc có: Tên KR, Giá trị bắt đầu (Start Value), Giá trị mục tiêu (Target Value), Đơn vị (%, $, task, etc.).
  3. Khi KR mới được tạo, % tiến độ của Objective mẹ sẽ linh hoạt cập nhật (trung bình cộng của các KRs) mặc dù ban đầu thường là 0%.

**US-05: Ghi nhận người chịu trách nhiệm (Assign OKR)**
- **User Story:** As a Manager, I want to assign an OKR to a specific employee or a sub-team so that accountability is clear.
- **Acceptance Criteria:**
  1. Chức năng có dropdown chọn Assignee (chọn từ danh sách Users trong Team).
  2. Assignee được chọn sẽ thấy OKR này hiển thị trong danh sách "My OKRs" của họ.

---

## Epic 3: Progress Tracking (Cập nhật tiến độ)

**US-06: Cập nhật tiến độ Key Result**
- **User Story:** As an Employee, I want to update the progress of my assigned Key Results so that my manager can track performance precisely.
- **Acceptance Criteria:**
  1. Employee chỉ cập nhật được tiến độ của KR mà mình được assign.
  2. Nhập số liệu mới đạt được (Ví dụ: Target là 100, đang ở mức 50, lên mức 60). Hệ thống tính toán và hiển thị ngay tiến độ bằng %.
  3. Không vượt quá 100% (Hoặc cho phép lưu ý "Achieved > 100%").
  4. Hệ thống lưu mốc thời gian cập nhật.

**US-07: Viết ghi chú (Comment) khi cập nhật tiến độ**
- **User Story:** As an Employee, I want to add a note/comment when updating a KR so that I can explain context or highlight risks.
- **Acceptance Criteria:**
  1. Form nhập tiến độ cung cấp thêm trường input "Ghi chú/Comment" không bắt buộc.
  2. Khi lưu, ghi chú hiển thị trong tab Lịch sử (History) của KR đó.

---

## Epic 4: Dashboard & Reporting

**US-08: Xem danh sách OKR cá nhân**
- **User Story:** As an Employee, I want to view a list of all my assigned OKRs filtered by quarter so that I know what to focus on.
- **Acceptance Criteria:**
  1. Có giao diện danh sách OKR cá nhân, chia rõ các Objective và KRs con.
  2. Có thanh dropdown Lọc (Filter) theo Quý và Trạng thái (On Track, At Risk, Completed).

**US-09: Xem Dashboard tổng quan**
- **User Story:** As an Admin/Manager, I want to view the OKR dashboard so that I can monitor overall progress of the organization/teams.
- **Acceptance Criteria:**
  1. Hiển thị % tiến độ trung bình của toàn công ty hoặc team tương ứng với quyền.
  2. Hiển thị tỷ lệ các mục tiêu đang "At Risk" (VD: Dưới 30% khi đã qua nửa quý).
  3. Biểu đồ tròn/thanh ngang trực quan các số liệu.
