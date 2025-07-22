import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  let auth;
  try {
    auth = useAuth();
  } catch (e: any) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lỗi xác thực: {e.message}</Text>
      </View>
    );
  }
  const { user, signOut, loading, error } = auth;

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lỗi xác thực: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MeloStream</Text>
      <Text style={styles.subtitle}>
        Hello, {user?.email || 'User'}!
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={signOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D0D0D',
  },
  loadingText: {
    color: '#1DB954',
    fontSize: 18,
    marginTop: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  title: {
    color: '#1DB954',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#1DB954',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 