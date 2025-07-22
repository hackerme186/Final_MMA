import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const mockSuggestions = [
  'Taylor Swift',
  'Ed Sheeran',
  'Adele',
  'Justin Bieber',
  'Dua Lipa',
];

export const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const filtered = mockSuggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for songs, artists, albums..."
        placeholderTextColor="#b3b3b3"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Text style={styles.suggestion}>{item}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    padding: 20,
  },
  input: {
    backgroundColor: '#232323',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  suggestion: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
    borderBottomColor: '#282828',
    borderBottomWidth: 1,
  },
}); 