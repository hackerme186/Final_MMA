import { create } from 'zustand';
import { Track } from '../types/library';

interface QueueState {
  activeQueueId: string | null;
  currentQueue: Track[];
  currentIndex: number;
  shuffleMode: boolean;
  repeatMode: 'off' | 'one' | 'all';
  
  // Actions
  setActiveQueueId: (id: string) => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  setCurrentIndex: (index: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffle: () => void;
  setRepeatMode: (mode: 'off' | 'one' | 'all') => void;
}

export const useQueueStore = create<QueueState>()((set, get) => ({
      activeQueueId: null,
      currentQueue: [],
      currentIndex: 0,
      shuffleMode: false,
      repeatMode: 'off',

      setActiveQueueId: (id) => set({ activeQueueId: id }),

      setQueue: (tracks, startIndex = 0) => 
        set({ 
          currentQueue: tracks, 
          currentIndex: startIndex 
        }),

      addToQueue: (track) =>
        set((state) => ({
          currentQueue: [...state.currentQueue, track],
        })),

      removeFromQueue: (index) =>
        set((state) => ({
          currentQueue: state.currentQueue.filter((_, i) => i !== index),
          currentIndex: state.currentIndex > index 
            ? state.currentIndex - 1 
            : state.currentIndex,
        })),

      clearQueue: () => 
        set({ 
          currentQueue: [], 
          currentIndex: 0,
          activeQueueId: null 
        }),

      setCurrentIndex: (index) => 
        set({ currentIndex: index }),

      nextTrack: () =>
        set((state) => {
          const { currentQueue, currentIndex, repeatMode, shuffleMode } = state;
          
          if (currentQueue.length === 0) return state;
          
          if (repeatMode === 'one') {
            return state; // Stay on same track
          }
          
          let nextIndex = currentIndex + 1;
          
          if (nextIndex >= currentQueue.length) {
            if (repeatMode === 'all') {
              nextIndex = 0;
            } else {
              return state; // End of queue
            }
          }
          
          return { currentIndex: nextIndex };
        }),

      previousTrack: () =>
        set((state) => {
          const { currentQueue, currentIndex, repeatMode } = state;
          
          if (currentQueue.length === 0) return state;
          
          let prevIndex = currentIndex - 1;
          
          if (prevIndex < 0) {
            if (repeatMode === 'all') {
              prevIndex = currentQueue.length - 1;
            } else {
              return state; // Beginning of queue
            }
          }
          
          return { currentIndex: prevIndex };
        }),

      toggleShuffle: () =>
        set((state) => ({
          shuffleMode: !state.shuffleMode,
        })),

      setRepeatMode: (mode) =>
        set({ repeatMode: mode }),
    }));

// Selector hooks
// Individual selectors to prevent unnecessary re-renders
export const useQueue = () => useQueueStore((state) => state);
export const useActiveQueueId = () => useQueueStore((state) => state.activeQueueId);
export const useCurrentQueue = () => useQueueStore((state) => state.currentQueue);
export const useCurrentIndex = () => useQueueStore((state) => state.currentIndex);
export const useShuffleMode = () => useQueueStore((state) => state.shuffleMode);
export const useRepeatMode = () => useQueueStore((state) => state.repeatMode);

export const useCurrentTrack = () => {
  const currentQueue = useQueueStore((state) => state.currentQueue);
  const currentIndex = useQueueStore((state) => state.currentIndex);
  return currentQueue[currentIndex] || null;
};

export const useQueueActions = () => useQueueStore((state) => ({
  setQueue: state.setQueue,
  addToQueue: state.addToQueue,
  removeFromQueue: state.removeFromQueue,
  clearQueue: state.clearQueue,
  nextTrack: state.nextTrack,
  previousTrack: state.previousTrack,
  toggleShuffle: state.toggleShuffle,
  setRepeatMode: state.setRepeatMode,
}));
