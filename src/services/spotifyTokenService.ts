
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENT_ID = '2d6220b479844926aa4e81036ca85d6f';
const CLIENT_SECRET = '501e05d4083549a79ea536916d60e335';
const TOKEN_KEY = 'spotify_access_token';
const TOKEN_EXPIRY_KEY = 'spotify_token_expiry';

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

class SpotifyTokenService {
  private static instance: SpotifyTokenService;
  private currentToken: string | null = null;
  private tokenExpiry: number | null = null;

  private constructor() {}

  static getInstance(): SpotifyTokenService {
    if (!SpotifyTokenService.instance) {
      SpotifyTokenService.instance = new SpotifyTokenService();
    }
    return SpotifyTokenService.instance;
  }

  private async fetchNewToken(): Promise<string> {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        },
        body: 'grant_type=client_credentials',
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data: TokenResponse = await response.json();
      const expiryTime = Date.now() + (data.expires_in * 1000);
      await AsyncStorage.setItem(TOKEN_KEY, data.access_token);
      await AsyncStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
      this.currentToken = data.access_token;
      this.tokenExpiry = expiryTime;
      return data.access_token;
    } catch (error) {
      throw error;
    }
  }

  private async loadStoredToken(): Promise<string | null> {
    try {
      const [token, expiryStr] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(TOKEN_EXPIRY_KEY),
      ]);
      if (!token || !expiryStr) {
        return null;
      }
      const expiry = parseInt(expiryStr);
      const now = Date.now();
      if (now < expiry - 300000) {
        this.currentToken = token;
        this.tokenExpiry = expiry;
        return token;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async getValidToken(): Promise<string> {
    if (this.currentToken && this.tokenExpiry && Date.now() < this.tokenExpiry - 300000) {
      return this.currentToken;
    }
    const storedToken = await this.loadStoredToken();
    if (storedToken) {
      return storedToken;
    }
    return await this.fetchNewToken();
  }
}

export default SpotifyTokenService; 
