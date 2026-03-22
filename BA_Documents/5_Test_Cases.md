# Test Cases

Dưới đây là 15-20 Test Cases phủ sóng các luồng chính của hệ thống, dựa trên Acceptance Criteria đã định nghĩa.

| ID | Test Scenario | Steps to Execute | Expected Result | Pass/Fail |
|----|---------------|------------------|-----------------|-----------|
| **1. Login Module** |||||
| TC-01 | Đăng nhập thành công với tài khoản Admin | 1. Mở trang Login<br>2. Nhập Email & Password hợp lệ<br>3. Click "Đăng nhập" | Redirect sang Admin Dashboard UI | P |
| TC-02 | Đăng nhập với tài khoản Employee sai pass | 1. Mở trang Login<br>2. Nhập Email Employee hợp lệ & sai Password<br>3. Click "Đăng nhập" | Hiển thị thông báo "Sai mật khẩu" | P |
| TC-03 | Đăng nhập thiếu thông tin email/pass | 1. Để trống Email/Password<br>2. Click "Đăng nhập" | Hiển thị lỗi validate required field | P |
| **2. Objective Module** |||||
| TC-04 | Tạo Objective thành công | 1. Login Manager<br>2. Click "Create Objective"<br>3. Điền Tên Obj & Quý<br>4. Click Save | Thông báo thành công, Obj hiển thị trong List (0%) | P |
| TC-05 | Tạo Objective thiếu Tên | 1. Login Manager<br>2. Bỏ trống Tên Obj<br>3. Click Save | Báo lỗi field required (Required) | P |
| TC-06 | Chỉ Manager/Admin thấy nút Create Objective | 1. Login bằng tài khoản Employee<br>2. Truy cập màn Dashboard / OKR List | Nút "Create Objective" không hiển thị | P |
| **3. Key Result (KR) Module** |||||
| TC-07 | Thêm Key Result hợp lệ | 1. Mở form chi tiết một Obj đang tạo<br>2. Thêm Tên KR, Start (0), Target (100)<br>3. Save KR | KR lưu thành công và liên kết với Obj | P |
| TC-08 | Thêm KR bị lỗi: Start > Target | 1. Nhập Start value (100) > Target (50)<br>2. Save KR | Thông báo lỗi logic Start Value phải nhỏ hơn Target (trong Data-driven KR) | P |
| TC-09 | Thêm KR bị lỗi: Thiếu Tên KR | 1. Bỏ trống Tên KR<br>2. Lưu KR | Thông báo tên KR bắt buộc nhập | P |
| TC-10 | Assign OKR cho Employee thành công | 1. Tạo OKR<br>2. Gắn Assignee = `employee1@company.com`<br>3. Login employee1 | employee1 thấy OKR đó trong bảng "My OKRs" | P |
| **4. Progress Update Module** |||||
| TC-11 | Cập nhật tiến độ KR thành công | 1. Login Employee được assign<br>2. Mở KR<br>3. Nhập giá trị mới = 50<br>4. Submit | Tiến độ KR lên 50%. Tiến độ Obj thay đổi tương ứng | P |
| TC-12 | Cập nhật tiến độ > 100% | 1. Mở KR (Target = 100)<br>2. Nhập đạt được 120<br>3. Submit | Hệ thống lưu giá trị 120, % hiện 100% (hoặc 120% tùy quy định, thường lock max hiển thị UI ở 100% nhưng số thực tế là 120) | P |
| TC-13 | Cập nhật progress khi CHƯA đăng nhập | 1. Lấy link API/URL update progress cụ thể<br>2. Không có token/chưa Login | Bị redirect/báo lỗi 401 Unauthorized | P |
| TC-14 | Thêm ghi chú thành công khi cập nhật tiến độ | 1. Nhập update Value<br>2. Điền text vào ô "Comment"<br>3. Submit | Giá trị cập nhật, kèm theo dòng Comment trong History | P |
| TC-15 | Cập nhật tiến độ Objective không được gán | 1. Login Employee A<br>2. Mở OKR của Employee B | KHÔNG CÓ nút Cập nhật (Chỉ Read-only) | P |
| **5. Dashboard Module** |||||
| TC-16 | Xem Dashboard theo Quý (Filter) | 1. Login Manager/Admin<br>2. Chọn Quý: Q1/2026 trên filter dropdown | Hiển thị liệu OKRs thuộc Q1/2026 (Chart + List) | P |
| TC-17 | Xem Dashboard tổng quan: At risk | 1. Theo dõi tiến độ mục tiêu < 30% giữa quý | Các mục tiêu này bị highlight nhãn "At Risk" (màu Đỏ cam) trong Dashboard | P |
