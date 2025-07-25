// Simple test to check if our fixes work
console.log('Testing fixes...');

// Test 1: Check if createAudioPlayer import works
try {
  const { createAudioPlayer } = require('expo-audio');
  console.log('✅ expo-audio import works');
} catch (error) {
  console.log('❌ expo-audio import failed:', error.message);
}

// Test 2: Check if our audioService can be imported
try {
  const { audioService } = require('./src/services/audioService.ts');
  console.log('✅ audioService import works');
} catch (error) {
  console.log('❌ audioService import failed:', error.message);
}

// Test 3: Check if libraryStore works
try {
  const { useLibraryStats, useToggleTrackFavorite } = require('./src/store/libraryStore.ts');
  console.log('✅ libraryStore import works');
} catch (error) {
  console.log('❌ libraryStore import failed:', error.message);
}

// Test 4: Check if queueStore works
try {
  const { useQueueStore } = require('./src/store/queueStore.ts');
  console.log('✅ queueStore import works');
} catch (error) {
  console.log('❌ queueStore import failed:', error.message);
}

console.log('Test completed!');
