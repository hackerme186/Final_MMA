import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Clear tokens or session here
    router.replace('/(auth)/login'); // hoặc route phù hợp
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="exit-outline" size={60} color="red" />
      </View>

      <Text style={styles.title}>Are you sure you want to logout?</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconWrapper: {
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 60,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
  },
  logoutButton: {
    flex: 1,
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
