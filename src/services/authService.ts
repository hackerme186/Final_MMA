import * as AuthSession from 'expo-auth-session';
import { supabase } from '../../supabase';
import { User } from '../types';

const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';
const REDIRECT_URI = AuthSession.makeRedirectUri();
const SCOPES = ['user-read-private', 'user-read-email', 'user-top-read', 'playlist-read-private'];
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join('%20')}`;

export async function authenticateWithSpotify() {
  const result = await AuthSession.startAsync({ authUrl: AUTH_URL });
  if (result.type === 'success' && result.params.access_token) {
    return result.params.access_token;
  }
  throw new Error('Spotify authentication failed');
}

export interface AuthResponse {
  user: User | null;
  error: string | null;
}

export interface SignUpData {
  email: string;
  password: string;
  full_name?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const authService = {
  // Đăng ký người dùng mới
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
          },
        },
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (authData.user) {
        // Tạo profile cho user trong bảng profiles
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              email: data.email,
              full_name: data.full_name,
            },
          ]);

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }

        return {
          user: {
            id: authData.user.id,
            email: data.email,
            full_name: data.full_name,
            avatar_url: null,
            created_at: authData.user.created_at,
            updated_at: authData.user.updated_at || authData.user.created_at,
          },
          error: null,
        };
      }

      return { user: null, error: 'Sign up failed' };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  },

  // Đăng nhập
  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (authData.user) {
        // Lấy thông tin profile từ bảng profiles
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
        }

        return {
          user: {
            id: authData.user.id,
            email: authData.user.email || '',
            full_name: profile?.full_name,
            avatar_url: profile?.avatar_url,
            created_at: authData.user.created_at,
            updated_at: authData.user.updated_at || authData.user.created_at,
          },
          error: null,
        };
      }

      return { user: null, error: 'Sign in failed' };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  },

  // Đăng xuất
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // Lấy thông tin user hiện tại
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        return { user: null, error: error?.message || 'No user found' };
      }

      // Lấy thông tin profile từ bảng profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      }

      return {
        user: {
          id: user.id,
          email: user.email || '',
          full_name: profile?.full_name,
          avatar_url: profile?.avatar_url,
          created_at: user.created_at,
          updated_at: user.updated_at || user.created_at,
        },
        error: null,
      };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  },

  // Lắng nghe thay đổi authentication state
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Lấy thông tin profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        const user: User = {
          id: session.user.id,
          email: session.user.email || '',
          full_name: profile?.full_name,
          avatar_url: profile?.avatar_url,
          created_at: session.user.created_at,
          updated_at: session.user.updated_at || session.user.created_at,
        };

        callback(user);
      } else if (event === 'SIGNED_OUT') {
        callback(null);
      }
    });
  },
};
