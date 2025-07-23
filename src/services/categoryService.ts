import { supabase } from '../../supabase';

export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  created_at: string;
}

export const categoryService = {
  // Lấy tất cả categories
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return { categories: data, error: null };
    } catch (error) {
      return { categories: null, error };
    }
  },

  // Lấy songs theo category
  async getSongsByCategory(categoryId: string) {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select(`
          *,
          artists (name, avatar_url),
          albums (title, cover_url),
          categories (name, color)
        `)
        .eq('category_id', categoryId)
        .order('play_count', { ascending: false });

      if (error) throw error;
      return { songs: data, error: null };
    } catch (error) {
      return { songs: null, error };
    }
  },

  // Tạo category mới (admin only)
  async createCategory(category: Omit<Category, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select()
        .single();

      if (error) throw error;
      return { category: data, error: null };
    } catch (error) {
      return { category: null, error };
    }
  },

  // Cập nhật category
  async updateCategory(id: string, updates: Partial<Category>) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { category: data, error: null };
    } catch (error) {
      return { category: null, error };
    }
  },

  // Xóa category
  async deleteCategory(id: string) {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  }
};
