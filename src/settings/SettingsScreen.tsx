import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LanguageModal from './LanguageModal';

const SettingsScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [languages, setLanguages] = useState<string[]>(['English']);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => router.push('/settings/profile')}
      >
        <View>
          <Text style={styles.label}>Profile</Text>
          <Text style={styles.value}>Logan Jimmy</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => setModalVisible(true)}
      >
        <View>
          <Text style={styles.label}>Music Language(s)</Text>
          <Text style={styles.value}>{languages.join(', ')}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <View>
          <Text style={styles.label}>Streaming Quality</Text>
          <Text style={styles.value}>HD</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      <View>
        <Text style={styles.label}>Download Quality</Text>
        <Text style={styles.value}>High</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="gray" />

      <TouchableOpacity
        style={[styles.settingItem, styles.logoutItem]}
        onPress={() => router.push('/settings/logout')}
      >
        <Text style={[styles.label, { color: 'red' }]}>Logout</Text>
        <Ionicons name="exit-outline" size={20} color="red" />
      </TouchableOpacity>

      <LanguageModal
        visible={modalVisible}
        selectedLanguages={languages}
        onClose={() => setModalVisible(false)}
        onDone={(selected) => {
          setLanguages(selected);
          setModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  heading: { fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 20 },
  settingItem: {
    backgroundColor: '#1c1c1e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutItem: { backgroundColor: '#2a2a2c' },
  label: { color: 'gray', fontSize: 14 },
  value: { color: 'white', fontSize: 16, fontWeight: '500' },
});
