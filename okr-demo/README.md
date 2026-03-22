# OKR Management System - React Web Demo

Đây là bản Web Prototype (Demo) cho dự án OKR Management System, được phát triển nhằm mục đích đưa vào Portfolio của Business Analyst. Ứng dụng mô phỏng trực quan các luồng nghiệp vụ cốt lõi mà một hệ thống quản lý mục tiêu (OKR) thực tế cần phải có.

## 🚀 Công nghệ sử dụng
- **Core Platform**: React.js (Vite)
- **Styling**: Vanilla CSS (Tự thiết kế UI/UX theo tiêu chuẩn Premium, Glassmorphism, Gradient Track)
- **State Management**: React `useState` (Quản lý toàn bộ Mock Data và các thay đổi Logic thời gian thực mà không cần Backend)

## ✨ Các tính năng nổi bật (Core Business Flows)

Bản Demo này chứng minh được khả năng phân tích luồng dữ liệu (Data Flow) và tính toán nghiệp vụ (Business Rules) của một BA:

1. **Quản trị Objective (Mục tiêu)**:
   - Liệt kê danh sách Mục tiêu dưới dạng Visual Card trực quan.
   - Thêm mới Objective và chỉ định Chu kỳ áp dụng (Q1-Q4, Năm).
   - Xóa Objective khỏi hệ thống.
   
2. **Quản trị Key Result (Kết quả then chốt)**:
   - Thêm mới Key Result trực tiếp vào từng Objective.
   - Xóa Key Result.
   - Cập nhật tiến độ (Check-in) định kỳ kèm theo việc điền ghi chú (Note / Khó khăn).
   - Lưu trữ và xem nhanh Lịch sử Check-in gần nhất (Audit trail).
   
3. **Logic tính toán nghiệp vụ tự động**:
   - Tự động tính toán và thay đổi phần trăm (%) hoàn thành của Objective mẹ khi tiến độ của bất kỳ KR con nào thay đổi.
   - Hỗ trợ Logic KR dạng nghịch đảo (Ví dụ: Mục tiêu giảm thiểu downtime hệ thống).
   - Tự động thay đổi trạng thái và cảnh báo rủi ro (đổi sang "At Risk" nếu như tiến độ tổng quan < 30%).
   
4. **Hệ thống Lọc (Filter) & Thống kê**: 
   - Dashboard tự động thống kê tiến độ trung bình toàn doanh nghiệp, tổng số OKR hiện có, số OKR rủi ro.
   - Lọc OKR theo Quý và Trạng thái.

## 📦 Hướng dẫn cài đặt & chạy dự án (Dành cho nhà tuyển dụng / Reviewer)

1. Đảm bảo máy có cài đặt [Node.js](https://nodejs.org/).
2. Mở Terminal / PowerShell.
3. Chuyển thư mục vào dự án:
   ```bash
   cd okr-demo
   ```
4. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```
5. Khởi chạy máy chủ nội bộ (Development Server):
   ```bash
   npm run dev
   ```
6. Truy cập vào đường dẫn Local (Thường là `http://localhost:5173`) trên trình duyệt Web. Tại màn hình "Đăng Nhập", tiếp tục ấn Đăng Nhập để trải nghiệm hệ thống dạng nội bộ doanh nghiệp.
