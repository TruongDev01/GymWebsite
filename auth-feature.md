# Ứng dụng Gym Hỗ trợ Đăng ký và Đăng nhập (Next.js + Prisma)

## Goal
Tạo dựng ứng dụng quản lý phòng Gym (Next.js 15, Tailwind v4, Prisma, PostgreSQL). Tập trung làm luồng Authentication (Đăng Nhập/ Đăng Ký) dành cho Học viên mới trước.

## Tasks
- [ ] Task 1: Khởi tạo dự án Next.js 15 với Tailwind CSS và TypeScript → Verify: Chạy `npm run dev` thành công và thấy trang chủ Next.js
- [ ] Task 2: Cài đặt Prisma ORM và thiết lập kết nối PostgreSQL → Verify: Chạy `npx prisma init` và cấu hình được file `.env`
- [ ] Task 3: Thiết kế Schema Database cơ bản (User table) → Verify: Chạy `npx prisma db push` thành công và thấy DB trên DBeaver/PgAdmin hoặc Prisma Studio
- [ ] Task 4: Cài đặt NextAuth.js / Better Auth hoặc tự build JWT cơ bản (đề xuất tự build hoặc NextAuth để dễ custom) → Verify: Cài đặt lib thành công
- [ ] Task 5: Xây dựng UI Trang Đăng ký (`/register`) → Verify: Giao diện hiển thị form có Email, Password, Name
- [ ] Task 6: Viết Server Action/API Route để xử lý Đăng ký → Verify: Đăng ký thành công, data lưu vào DB
- [ ] Task 7: Xây dựng UI Trang Đăng nhập (`/login`) → Verify: Giao diện form login
- [ ] Task 8: Viết Server Action/API Route xử lý Đăng nhập → Verify: Đăng nhập thành công, tạo cookie/session

## Done When
- [ ] Khởi tạo hoàn chỉnh cấu trúc dự án
- [ ] Người dùng mới có thể mở trang `/register`, nhập thông tin và nhấn đăng ký, thông tin được lưu an toàn (mã hoá pass) vào Database PostgreSQL.
- [ ] Người dùng có thể quay ra `/login` để đăng nhập bằng thông tin vừa tạo.
