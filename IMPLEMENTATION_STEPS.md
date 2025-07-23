# 🎵 Hướng Dẫn Thực Hiện Database Extensions - Từng Bước

## 📋 Tổng Quan
Hướng dẫn này sẽ giúp bạn hoàn thiện database MeloStream với các chức năng nâng cao như categories, follows, downloads, ratings, và listening history.

## 🚀 Bước 1: Chuẩn Bị Database

### 1.1 Kiểm tra Database hiện tại
```bash
# Đảm bảo bạn đã chạy schema.sql cơ bản
# Kiểm tra trong Supabase Dashboard > SQL Editor
```

### 1.2 Backup Database (khuyến nghị)
```sql
-- Trong Supabase Dashboard > Settings > Database
-- Tạo backup trước khi thực hiện thay đổi
```

## 🔧 Bước 2: Chạy Extensions Script

### 2.1 Chạy database/extensions.sql
```bash
# Vào Supabase Dashboard > SQL Editor
# Copy toàn bộ nội dung từ database/extensions.sql
# Paste và chạy script
```

**Script này sẽ tạo:**
- ✅ Bảng `categories` (thể loại nhạc)
- ✅ Bảng `follows` (theo dõi nghệ sĩ)
- ✅ Bảng `downloads` (tải xuống)
- ✅ Bảng `playlist_followers` (theo dõi playlist)
- ✅ Bảng `song_ratings` (đánh giá bài hát)
- ✅ Bảng `listening_history` (lịch sử nghe)
- ✅ RLS policies cho tất cả bảng mới
- ✅ Sample data cho categories

### 2.2 Chạy database/functions.sql
```bash
# Tiếp tục trong SQL Editor
# Copy và chạy database/functions.sql
```

**Script này sẽ tạo:**
- ✅ Functions: `get_top_songs()`, `get_recommended_songs()`, `get_trending_songs()`, `search_songs()`
- ✅ Views: `song_details`, `user_statistics`, `playlist_details`, `artist_statistics`

## 📱 Bước 3: Cập Nhật TypeScript Services

### 3.1 Copy Services mới
```bash
# Copy các file service đã tạo:
# - src/services/categoryService.ts
# - src/services/followService.ts  
# - src/services/downloadService.ts
```

### 3.2 Cập nhật Types
```typescript
// Thêm vào src/types/index.ts
export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  created_at: string;
}

export interface Follow {
  id: string;
  user_id: string;
  artist_id: string;
  followed_at: string;
}

export interface Download {
  id: string;
  user_id: string;
  song_id: string;
  file_path?: string;
  file_size?: number;
  download_quality: string;
  downloaded_at: string;
}

export interface SongRating {
  id: string;
  user_id: string;
  song_id: string;
  rating: number;
  review?: string;
  created_at: string;
  updated_at: string;
}

export interface ListeningHistory {
  id: string;
  user_id: string;
  song_id: string;
  duration_listened: number;
  completed: boolean;
  device_type?: string;
  played_at: string;
}
```

## 🎯 Bước 4: Cập Nhật Library Screens

### 4.1 Cập nhật ArtistsScreen với Follow functionality
```typescript
// Trong src/library/ArtistsScreen.tsx
import { followService } from '../services/followService';

// Thêm functions:
const handleFollowArtist = async (artistId: string) => {
  const result = await followService.followArtist(artistId);
  if (!result.error) {
    // Cập nhật UI
  }
};

const handleUnfollowArtist = async (artistId: string) => {
  const result = await followService.unfollowArtist(artistId);
  if (!result.error) {
    // Cập nhật UI
  }
};
```

### 4.2 Cập nhật DownloadsScreen với Download functionality
```typescript
// Trong src/library/DownloadsScreen.tsx
import { downloadService } from '../services/downloadService';

// Thêm functions:
const handleAddDownload = async (songId: string) => {
  const result = await downloadService.addDownload(songId);
  if (!result.error) {
    // Cập nhật UI
  }
};

const handleRemoveDownload = async (songId: string) => {
  const result = await downloadService.removeDownload(songId);
  if (!result.error) {
    // Cập nhật UI
  }
};
```

### 4.3 Thêm Categories Screen
```typescript
// Tạo src/library/CategoriesScreen.tsx
import { categoryService } from '../services/categoryService';

// Implement categories grid với colors
```

## 🔍 Bước 5: Test Functionality

### 5.1 Test Database Functions
```sql
-- Test trong SQL Editor
SELECT * FROM get_top_songs(5);
SELECT * FROM get_trending_songs(7, 10);
SELECT * FROM search_songs('love', 10);
```

### 5.2 Test Services
```typescript
// Test trong app
const testServices = async () => {
  // Test categories
  const categories = await categoryService.getCategories();
  console.log('Categories:', categories);
  
  // Test follows
  const follows = await followService.getFollowedArtists();
  console.log('Follows:', follows);
  
  // Test downloads
  const downloads = await downloadService.getDownloadedSongs();
  console.log('Downloads:', downloads);
};
```

## 📊 Bước 6: Thêm Analytics & Monitoring

### 6.1 User Statistics Dashboard
```typescript
// Tạo component để hiển thị user stats
const UserStats = () => {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const loadStats = async () => {
      const { data } = await supabase
        .from('user_statistics')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setStats(data);
    };
    loadStats();
  }, []);
  
  return (
    <View>
      <Text>Liked Songs: {stats?.liked_songs_count}</Text>
      <Text>Playlists: {stats?.playlists_count}</Text>
      <Text>Following: {stats?.following_artists_count}</Text>
      <Text>Downloads: {stats?.downloaded_songs_count}</Text>
      <Text>Listening Time: {stats?.total_listening_time}s</Text>
    </View>
  );
};
```

## 🎵 Bước 7: Implement Advanced Features

### 7.1 Recommendations
```typescript
// Sử dụng recommendation function
const getRecommendations = async () => {
  const { data } = await supabase.rpc('get_recommended_songs', {
    user_uuid: user.id,
    limit_count: 20
  });
  return data;
};
```

### 7.2 Search với Ranking
```typescript
// Implement advanced search
const searchWithRanking = async (query: string) => {
  const { data } = await supabase.rpc('search_songs', {
    search_term: query,
    limit_count: 50
  });
  return data;
};
```

## ✅ Bước 8: Verification Checklist

### 8.1 Database Verification
- [ ] Tất cả bảng mới đã được tạo
- [ ] RLS policies hoạt động đúng
- [ ] Functions và views hoạt động
- [ ] Sample data đã được insert

### 8.2 App Verification  
- [ ] Services import và hoạt động
- [ ] UI components render đúng
- [ ] Navigation hoạt động
- [ ] Error handling đầy đủ

### 8.3 Performance Check
- [ ] Queries chạy nhanh (<100ms)
- [ ] Indexes hoạt động hiệu quả
- [ ] Memory usage ổn định
- [ ] No memory leaks

## 🚨 Troubleshooting

### Common Issues:
1. **RLS Policy Error**: Kiểm tra user authentication
2. **Function Not Found**: Chạy lại functions.sql
3. **Type Errors**: Cập nhật TypeScript types
4. **Performance Issues**: Kiểm tra indexes

### Debug Commands:
```sql
-- Kiểm tra tables
\dt

-- Kiểm tra functions  
\df

-- Kiểm tra views
\dv

-- Test RLS
SET ROLE authenticated;
SELECT * FROM categories;
```

## 🎉 Kết Quả Mong Đợi

Sau khi hoàn thành, bạn sẽ có:
- ✅ **Database hoàn chỉnh** với 13 bảng và relationships
- ✅ **Advanced features**: Categories, Follows, Downloads, Ratings
- ✅ **Smart recommendations** dựa trên listening history  
- ✅ **Powerful search** với relevance ranking
- ✅ **Analytics & statistics** cho users và content
- ✅ **Scalable architecture** sẵn sàng cho production

**Chúc bạn thành công! 🚀**
