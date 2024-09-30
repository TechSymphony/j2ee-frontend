## Công nghệ sử dụng

- Next.js 14 App Router, TypeScript, TailwindCSS, ShadCn UI, Tanstack Query, React Context

## Chuẩn bị môi trường code cho dự án

- Cài Node.js version > 18.17
- Cài NPM để quản lý các package.

## Cài đặt

1. Clone repository về máy
2. Cài đặt các packages

```bash
npm i
```

3. Cấu hình file môi trường

- Tạo file .env tại thư mục gốc của dự án.
- Copy nội dung từ file .env.example và dán vào file .env vừa tạo.
- Mở postman login rồi copy accessToken paste vào `NEXT_PUBLIC_ACCESS_TOKEN` (lí do chưa xử lý Authenticate PKCE)

4. Chạy dự án

```bash
npm run dev
```

## Cấu trúc thư mục chính

- `/apis`: Chứa các function cấu hình việc gọi api tới server backend
- `/app`: Chứa các trang của ứng dụng.
- `/api`: Chứa các Route Handler của NextJS server
- `/components`: Chứa các component dùng chung.
- `/constants`: Định nghĩa các types, các biến hằng số.
- `/contexts`: Chứa các file liên quan đến React Context dùng để quản lý global state.
- `/hooks`: Chứa các functions logic dùng chung.
- `/lib`: Chứa các file cấu hình http request, và file xử lý lỗi trả về từ API.
- `/queries`: Chứa các function query/mutation sử dụng Tanstack Query.
- `/schemas`: Định nghĩa các schema validation sử dụng zod

Nhớ chạy song song resource_server bên server backend mới call api được nhé !!
