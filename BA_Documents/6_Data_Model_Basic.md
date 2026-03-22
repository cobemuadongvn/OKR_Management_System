# Data Structure Basic

Đây là lược đồ dữ liệu cơ sở quan hệ cho phiên bản MVP. Lược đồ này giúp Developer thiết kế Database schema.

| Table Name | Description | Key Fields |
|------------|-------------|------------|
| **Users** | Lưu thông tin định danh và tài khoản đăng nhập. | ID, Username, Email, PasswordHash, FullName, DeptID, CreatedAt |
| **Roles** | Lưu thông tin về quyền truy cập trong hệ thống. | ID, RoleName (Admin, Manager, Employee), Description |
| **Objectives** | Lưu trữ các Mục tiêu (Mức Cha). | ID, Title, Description, Quarter (VD: Q1/2026), Status, OverallProgress (%), CreatedBy_ID, CreatedAt |
| **KeyResults**| Kết quả then chốt đo lường Objective. | ID, Objective_ID (FK), Title, StartValue, TargetValue, CurrentValue, Unit (VD: %, số lượng), CreatedAt |
| **OKRAssignments**| Bảng trung gian gán trách nhiệm của một OKR cho User hoặc Team. | ID, Objective_ID (FK), Assignee_ID (FK - UserID), AssignedDate |
| **ProgressUpdates**| Lưu trữ lịch sử cập nhật số liệu của một KR cụ thể. | ID, KeyResult_ID (FK), OldValue, NewValue, UpdatedBy_ID (FK - UserID), UpdateTime |
| **Comments**| Lưu trữ ghi chú/bình luận của người dùng trên OKR hoặc mỗi lần Update. | ID, TargetType (KR/Objective), TargetID, User_ID (FK), CommentText, CreatedAt |

## Relationship Diagram (ERD simplified)

- `Users` (1) - (n) `OKRAssignments`
- `Roles` (1) - (n) `Users` (Hoặc n-n thông qua User-Roles)
- `Objectives` (1) - (n) `KeyResults`
- `KeyResults` (1) - (n) `ProgressUpdates`
- `Objectives` (1) - (n) `OKRAssignments`

## Mức độ thực thi MVP:
Với các bảng trên, có thể truy vấn mọi tính năng cần thiết:
1. Từ **ProgressUpdates** tính ra tiến độ mới nhất của **KeyResults**.
2. Trung bình cộng các **KeyResults.CurrentValue** so với **TargetValue** sẽ cho ra % hoàn thành của **Objectives.OverallProgress**.
3. Group by **Quarter** trong bảng **Objectives** sẽ thực hiện filter Dashboard.
