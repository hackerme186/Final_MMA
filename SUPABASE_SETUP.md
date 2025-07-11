# Hướng dẫn Setup Supabase cho MeloStream

## 1. Tạo dự án Supabase

1. Truy cập [supabase.com](https://supabase.com) và đăng ký tài khoản
2. Tạo một dự án mới
3. Chọn region gần nhất với bạn
4. Đặt mật khẩu database (lưu lại để sử dụng sau)

## 2. Cấu hình Environment Variables

Tạo file `.env` trong thư mục gốc của dự án:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Để lấy các giá trị này:
1. Vào Settings > API trong Supabase Dashboard
2. Copy `Project URL` và `anon public` key

## 3. Setup Database Schema

1. Vào SQL Editor trong Supabase Dashboard
2. Copy toàn bộ nội dung từ file `database/schema.sql`
3. Paste và chạy script để tạo các bảng và policies

## 4. Cấu hình Authentication

1. Vào Authentication > Settings trong Supabase Dashboard
2. Bật Email auth provider
3. Cấu hình redirect URLs (nếu cần):
   - `exp://localhost:8081`
   - `exp://192.168.x.x:8081` (cho device thật)

## 5. Cấu hình Storage (tùy chọn)

Nếu bạn muốn upload ảnh cover và audio files:

1. Vào Storage trong Supabase Dashboard
2. Tạo bucket `music-covers` cho ảnh album
3. Tạo bucket `music-files` cho audio files
4. Cấu hình RLS policies cho các bucket

## 6. Cấu hình Row Level Security (RLS)

RLS đã được cấu hình trong schema.sql, nhưng bạn có thể kiểm tra:

1. Vào Table Editor trong Supabase Dashboard
2. Kiểm tra RLS đã được enable cho tất cả bảng
3. Kiểm tra các policies đã được tạo

## 7. Test Connection

Chạy ứng dụng và kiểm tra:

```bash
npm start
```

## 8. Cấu trúc Database

### Bảng chính:

- **profiles**: Thông tin người dùng
- **artists**: Nghệ sĩ
- **albums**: Album
- **songs**: Bài hát
- **playlists**: Playlist
- **playlist_songs**: Quan hệ nhiều-nhiều giữa playlist và song
- **recently_played**: Lịch sử phát gần đây
- **liked_songs**: Bài hát yêu thích

### Relationships:

- `profiles` ← `playlists` (1:N)
- `artists` ← `albums` (1:N)
- `artists` ← `songs` (1:N)
- `albums` ← `songs` (1:N)
- `playlists` ← `playlist_songs` ← `songs` (N:N)

## 9. API Endpoints

Các service đã được tạo trong `src/services/`:

- `authService.ts`: Authentication
- `songService.ts`: Quản lý bài hát
- `playlistService.ts`: Quản lý playlist
- `userService.ts`: Quản lý user data

## 10. Custom Hook

Sử dụng `useSupabase()` hook để quản lý state và tương tác với Supabase:

```typescript
import { useSupabase } from '../hooks/useSupabase';

const { user, songs, playlists, signIn, fetchSongs } = useSupabase();
```

## 11. Troubleshooting

### Lỗi thường gặp:

1. **"Invalid API key"**: Kiểm tra lại EXPO_PUBLIC_SUPABASE_ANON_KEY
2. **"RLS policy violation"**: Kiểm tra policies trong Supabase Dashboard
3. **"Table not found"**: Chạy lại schema.sql
4. **"Auth error"**: Kiểm tra cấu hình authentication

### Debug:

1. Kiểm tra console logs
2. Sử dụng Supabase Dashboard để xem logs
3. Kiểm tra Network tab trong DevTools

## 12. Production Deployment

Khi deploy production:

1. Tạo production project trên Supabase
2. Cập nhật environment variables
3. Chạy schema.sql trên production database
4. Cấu hình custom domain (nếu cần)
5. Setup monitoring và alerts

## 13. Security Best Practices

1. Luôn sử dụng RLS policies
2. Không expose sensitive data trong client
3. Validate input data
4. Sử dụng prepared statements
5. Regular security audits

## 14. Performance Optimization

1. Sử dụng indexes (đã được tạo trong schema)
2. Implement caching cho data tĩnh
3. Pagination cho large datasets
4. Optimize queries với joins
5. Monitor query performance

## 15. Backup và Recovery

1. Setup automatic backups trong Supabase
2. Test restore procedures
3. Document backup schedules
4. Monitor backup health

---

Với setup này, ứng dụng MeloStream sẽ có thể:
- Đăng ký/đăng nhập người dùng
- Quản lý bài hát, album, nghệ sĩ
- Tạo và quản lý playlist
- Theo dõi lịch sử phát và bài hát yêu thích
- Tìm kiếm và khám phá âm nhạc 