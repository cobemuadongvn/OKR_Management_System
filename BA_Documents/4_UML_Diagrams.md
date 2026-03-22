# UML Diagrams (Use Case & Flowchart)

Dưới đây là Use Case Diagram và Flowcharts sử dụng cú pháp Mermaid.

## 1. Use Case Diagram

```mermaid
usecaseDiagram
    actor Admin
    actor Manager
    actor Employee

    package "OKR Management System" {
        usecase "Login / Logout" as UC1
        usecase "View Dashboard" as UC2
        usecase "Create Objective" as UC3
        usecase "Add Key Result" as UC4
        usecase "Assign OKR" as UC5
        usecase "View Own OKRs" as UC6
        usecase "Update KR Progress" as UC7
        usecase "Add Comment/Note" as UC8
        usecase "Filter OKR by Quarter" as UC9
    }

    Admin --> UC1
    Admin --> UC2
    Admin --> UC9

    Manager --> UC1
    Manager --> UC2
    Manager --> UC3
    Manager --> UC4
    Manager --> UC5
    Manager --> UC8
    Manager --> UC9

    Employee --> UC1
    Employee --> UC6
    Employee --> UC7
    Employee --> UC8
    Employee --> UC9

    %% Relationships
    UC7 ..> UC8 : <<extend>>
    UC3 ..> UC4 : <<include>>
```

## 2. Activity Diagram (Flowchart): Tạo OKR và Cập nhật

```mermaid
flowchart TD
    %% Luồng: Tạo OKR
    subgraph Manager Role
        A1(Login) --> A2[Mở trang Manager Dashboard]
        A2 --> A3[Click 'Tạo Objective']
        A3 --> A4[Nhập Tên Obj, Chọn Quý]
        A4 --> A5{Thêm Key Result?}
        A5 -- Yes --> A6[Nhập Thông tin KR, Start/Target]
        A6 --> A5
        A5 -- No (Done) --> A7[Gán cho Cá nhân/Team]
        A7 --> A8[Submit / Lưu hệ thống]
    end

    %% Luồng: Employee cập nhật Progress
    subgraph Employee Role
        B1(Login) --> B2[Mở danh sách My OKRs]
        B2 --> B3[Chọn Key Result cần cập nhật]
        B3 --> B4[Nhập Giá trị mới đạt được]
        B4 --> B5[Nhập Ghi chú / Giải trình - Tuỳ chọn]
        B5 --> B6[Submit Cập nhật]
        B6 --> B7((Hệ thống tính toán lại Progress Objective))
    end
    
    A8 --> B1
```
