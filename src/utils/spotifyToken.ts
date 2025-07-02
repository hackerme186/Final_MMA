// Spotify Token Management Utility
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'spotify_token';
const TOKEN_EXPIRY_KEY = 'spotify_token_expiry';

export interface SpotifyToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export class SpotifyTokenManager {
  private static instance: SpotifyTokenManager;
  private currentToken: string | null = null;
  private tokenExpiry: number | null = null;

  private constructor() {}

  static getInstance(): SpotifyTokenManager {
    if (!SpotifyTokenManager.instance) {
      SpotifyTokenManager.instance = new SpotifyTokenManager();
    }
    return SpotifyTokenManager.instance;
  }

  async getToken(): Promise<string> {
    // Check if we have a valid token in memory
    if (this.currentToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.currentToken;
    }

    // Check if we have a valid token in storage
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      const storedExpiry = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);
      
      if (storedToken && storedExpiry) {
        const expiry = parseInt(storedExpiry);
        if (Date.now() < expiry) {
          this.currentToken = storedToken;
          this.tokenExpiry = expiry;
          return storedToken;
        }
      }
    } catch (error) {
      console.error('Error reading token from storage:', error);
    }

    // Token is expired or doesn't exist, need to fetch new one
    return this.refreshToken();
  }

  private async refreshToken(): Promise<string> {
    try {
      console.log('Refreshing Spotify token...');
      
      // For now, we'll use the manual token refresh
      // In a production app, you'd want to implement proper OAuth flow
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64')
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.status}`);
      }

      const tokenData: SpotifyToken = await response.json();
      
      // Store the new token
      this.currentToken = tokenData.access_token;
      this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000);
      
      await AsyncStorage.setItem(TOKEN_KEY, tokenData.access_token);
      await AsyncStorage.setItem(TOKEN_EXPIRY_KEY, this.tokenExpiry.toString());
      
      console.log('Token refreshed successfully');
      return tokenData.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      
      // Fallback to manual token (you'll need to update this manually)
      const fallbackToken = 'BQDqBsO3mX9XlUF6-54kiBOxJmbv2eT-Z9-lap_M-bRkztzG3PDO-V6zJLGSWXYuNXrcLU1-Jc-QrmmeUz9bQ3vNKzC0EBa3IpMlsUaHGvccHcCLxsEXrLtkdU7tQ_3_7CfEePi-k7I';
      this.currentToken = fallbackToken;
      this.tokenExpiry = Date.now() + (3600 * 1000); // 1 hour
      
      return fallbackToken;
    }
  }

  async clearToken(): Promise<void> {
    this.currentToken = null;
    this.tokenExpiry = null;
    await AsyncStorage.multiRemove([TOKEN_KEY, TOKEN_EXPIRY_KEY]);
  }
}

// Export a singleton instance
export const spotifyTokenManager = SpotifyTokenManager.getInstance(); 