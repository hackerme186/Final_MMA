import { createAudioPlayer } from 'expo-audio';
import { Track } from '../types/library';

export interface AudioStatus {
  isLoaded: boolean;
  isPlaying: boolean;
  position: number;
  duration: number;
  volume: number;
  isBuffering: boolean;
}

class AudioService {
  private player: any = null;
  private currentTrack: Track | null = null;
  private statusUpdateCallback: ((status: AudioStatus) => void) | null = null;
  private isPlaying: boolean = false;
  private position: number = 0;
  private duration: number = 0;
  private volume: number = 1.0;

  constructor() {
    this.setupAudio();
  }

  private async setupAudio() {
    try {
      // expo-audio doesn't require explicit setup like expo-av
      console.log('Audio service initialized with expo-audio');
    } catch (error) {
      console.error('Failed to setup audio:', error);
    }
  }

  async loadTrack(track: Track): Promise<void> {
    try {
      // Create new player for each track
      if (this.player) {
        await this.stop();
        this.player.remove();
      }

      // Use createAudioPlayer from expo-audio
      this.player = createAudioPlayer(track.url);
      this.currentTrack = track;
      this.isPlaying = false;
      this.position = 0;
      this.duration = (track.duration || 0) * 1000; // Convert to milliseconds

      this.notifyStatusUpdate();
    } catch (error) {
      console.error('Failed to load track:', error);
      throw error;
    }
  }

  async play(): Promise<void> {
    if (this.player) {
      try {
        await this.player.play();
        this.isPlaying = true;
        this.notifyStatusUpdate();
      } catch (error) {
        console.error('Failed to play:', error);
      }
    }
  }

  async pause(): Promise<void> {
    if (this.player) {
      try {
        await this.player.pause();
        this.isPlaying = false;
        this.notifyStatusUpdate();
      } catch (error) {
        console.error('Failed to pause:', error);
      }
    }
  }

  async stop(): Promise<void> {
    if (this.player) {
      try {
        await this.player.pause();
        this.isPlaying = false;
        this.position = 0;
        this.notifyStatusUpdate();
      } catch (error) {
        console.error('Failed to stop:', error);
      }
    }
  }

  async seekTo(position: number): Promise<void> {
    if (this.player) {
      try {
        // expo-audio might not have seek functionality yet
        // This is a placeholder for when it's available
        this.position = position;
        this.notifyStatusUpdate();
      } catch (error) {
        console.error('Failed to seek:', error);
      }
    }
  }

  async setVolume(volume: number): Promise<void> {
    try {
      this.volume = Math.max(0, Math.min(1, volume));
      // expo-audio might not have volume control yet
      // This is a placeholder for when it's available
      this.notifyStatusUpdate();
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  }

  setStatusUpdateCallback(callback: (status: AudioStatus) => void) {
    this.statusUpdateCallback = callback;
  }

  private notifyStatusUpdate() {
    if (this.statusUpdateCallback) {
      const status: AudioStatus = {
        isLoaded: !!this.currentTrack,
        isPlaying: this.isPlaying,
        position: this.position,
        duration: this.duration,
        volume: this.volume,
        isBuffering: false,
      };
      this.statusUpdateCallback(status);
    }
  }

  getCurrentTrack(): Track | null {
    return this.currentTrack;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  async unload(): Promise<void> {
    if (this.player) {
      try {
        await this.stop();
        this.player = null;
        this.currentTrack = null;
        this.isPlaying = false;
        this.position = 0;
        this.duration = 0;
        this.notifyStatusUpdate();
      } catch (error) {
        console.error('Failed to unload:', error);
      }
    }
  }

  async cleanup(): Promise<void> {
    try {
      await this.unload();
      this.statusUpdateCallback = null;
      console.log('Audio service cleaned up');
    } catch (error) {
      console.error('Failed to cleanup audio service:', error);
    }
  }
}

export const audioService = new AudioService();
