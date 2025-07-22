import React from 'react';
import { LyricsScreen } from '../../src/screens/Home/components/Lyrics/LyricsScreen';

const mockLyrics = `You just want attention, you don't want my heart\nMaybe you just hate the thought of me with someone new...`;

export default function LyricsRoute() {
  // const { trackId } = useLocalSearchParams(); // Có thể dùng trackId để fetch lyrics thật
  return <LyricsScreen lyrics={mockLyrics} />;
} 