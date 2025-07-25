import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { audioService, AudioStatus } from '../services/audioService';
import { useQueueStore } from '../store/queueStore';
import { Track } from '../types/library';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  isLoading: boolean;
  position: number;
  duration: number;
  volume: number;
  
  // Actions
  playTrack: (track: Track) => Promise<void>;
  playPause: () => Promise<void>;
  stop: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface PlayerProviderProps {
  children: ReactNode;
}

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1.0);
  const [hasEnded, setHasEnded] = useState(false);

  const currentQueue = useQueueStore((state) => state.currentQueue);
  const currentIndex = useQueueStore((state) => state.currentIndex);
  const queueNextTrack = useQueueStore((state) => state.nextTrack);
  const queuePreviousTrack = useQueueStore((state) => state.previousTrack);

  useEffect(() => {
    // Setup audio status callback
    audioService.setStatusUpdateCallback((status: AudioStatus) => {
      setIsPlaying(status.isPlaying);
      setPosition(status.position);
      setDuration(status.duration);
      setVolumeState(status.volume);
    });

    return () => {
      audioService.cleanup();
    };
  }, []);

  // Auto-play next track when current track ends
  useEffect(() => {
    if (duration > 0 && position >= duration - 1000 && isPlaying && !hasEnded) {
      setHasEnded(true);
      // Use setTimeout to prevent infinite loop
      setTimeout(() => {
        nextTrack();
      }, 100);
    }
  }, [position, duration, isPlaying, hasEnded]);

  const playTrack = async (track: Track) => {
    try {
      setIsLoading(true);
      setHasEnded(false); // Reset end flag for new track
      await audioService.loadTrack(track);
      await audioService.play();
      setCurrentTrack(track);
    } catch (error) {
      console.error('Failed to play track:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playPause = async () => {
    try {
      if (isPlaying) {
        await audioService.pause();
      } else {
        await audioService.play();
      }
    } catch (error) {
      console.error('Failed to play/pause:', error);
    }
  };

  const stop = async () => {
    try {
      await audioService.stop();
      setCurrentTrack(null);
      setPosition(0);
    } catch (error) {
      console.error('Failed to stop:', error);
    }
  };

  const seekTo = async (newPosition: number) => {
    try {
      await audioService.seekTo(newPosition);
    } catch (error) {
      console.error('Failed to seek:', error);
    }
  };

  const setVolume = async (newVolume: number) => {
    try {
      await audioService.setVolume(newVolume);
      setVolumeState(newVolume);
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  };

  const nextTrack = React.useCallback(async () => {
    if (currentQueue.length > 0) {
      queueNextTrack();
      const nextIndex = (currentIndex + 1) % currentQueue.length;
      const nextTrackItem = currentQueue[nextIndex];
      if (nextTrackItem) {
        await playTrack(nextTrackItem);
      }
    }
  }, [currentQueue, currentIndex, queueNextTrack]);

  const previousTrack = React.useCallback(async () => {
    if (currentQueue.length > 0) {
      queuePreviousTrack();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentQueue.length - 1;
      const prevTrackItem = currentQueue[prevIndex];
      if (prevTrackItem) {
        await playTrack(prevTrackItem);
      }
    }
  }, [currentQueue, currentIndex, queuePreviousTrack]);

  const value: PlayerContextType = {
    currentTrack,
    isPlaying,
    isLoading,
    position,
    duration,
    volume,
    playTrack,
    playPause,
    stop,
    seekTo,
    setVolume,
    nextTrack,
    previousTrack,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
