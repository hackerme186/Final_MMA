import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LanguageModal from './LanguageModal';
import QualityModal from './QualityModal';
import EditProfileModal from './EditProfileModal';
      


const SETTINGS_QUALITY = ['HD', 'Medium', 'Low'];
const DOWNLOAD_QUALITY = ['High', 'Medium', 'Low'];

const SettingsScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [streamingModal, setStreamingModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const [languages, setLanguages] = useState<string[]>(['English', 'Tamil']);
  const [streamingQuality, setStreamingQuality] = useState('HD');
  const [downloadQuality, setDownloadQuality] = useState('High');
  const [user, setUser] = useState({
    name: 'Logan Jimmy',
    email: 'jim_logan01@gmail.com',
    phone: '8844682200'
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header - Profile Section */}
      <View style={{ marginBottom: 18, marginTop: 4 }}>
        <Text style={styles.profileTitle}>My Profile</Text>
        <TouchableOpacity style={styles.editBtn} onPress={() => setEditVisible(true)}>
          <Ionicons name="pencil-outline" size={18} color="#fff" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <View style={{ marginBottom: 18 }}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={{ marginBottom: 18 }}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>
        {/* Profile-stats row */}
        <View style={styles.statsRow}>
          <StatBox icon="heart-outline" value="120" label="songs" />
          <StatBox icon="list-outline" value="12" label="playlists" />
          <StatBox icon="person-outline" value="3" label="artists" />
        </View>
      </View>

      {/* Settings Group */}
      <Text style={styles.settingsHeading}>Settings</Text>

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
      
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => setStreamingModal(true)}
      >
        <View>
          <Text style={styles.label}>Streaming Quality</Text>
          <Text style={styles.value}>{streamingQuality}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => setDownloadModal(true)}
      >
        <View>
          <Text style={styles.label}>Download Quality</Text>
          <Text style={styles.value}>{downloadQuality}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.settingItem, styles.logoutItem]}
        onPress={() => router.push('../logout')}
      >
        <Text style={[styles.label, { color: 'red' }]}>Logout</Text>
        <Ionicons name="exit-outline" size={20} color="red" />
      </TouchableOpacity>

      {/* Modals */}
      <LanguageModal
        visible={modalVisible}
        selectedLanguages={languages}
        onClose={() => setModalVisible(false)}
        onDone={(selected) => {
          setLanguages(selected);
          setModalVisible(false);
        }}
      />
      <QualityModal
        visible={streamingModal}
        selectedQuality={streamingQuality}
        options={SETTINGS_QUALITY}
        title="Select Streaming Quality"
        onClose={() => setStreamingModal(false)}
        onDone={val => {
          setStreamingQuality(val);
          setStreamingModal(false);
        }}
      />
      <QualityModal
        visible={downloadModal}
        selectedQuality={downloadQuality}
        options={DOWNLOAD_QUALITY}
        title="Select Download Quality"
        onClose={() => setDownloadModal(false)}
        onDone={val => {
          setDownloadQuality(val);
          setDownloadModal(false);
        }}
      />
      <EditProfileModal
        visible={editVisible}
        initial={user}
        onClose={() => setEditVisible(false)}
        onSave={(data) => {
          setUser(data);
          setEditVisible(false);
        }}
      />
    </ScrollView>
  );
};

const StatBox = ({ icon, value, label }) => (
  <View style={styles.statBox}>
    <Ionicons name={icon} size={20} color="#fff" style={{ marginBottom: 4 }} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  profileTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232323',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  editText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  profileInfo: {
    marginBottom: 30,
    backgroundColor: '#161616',
    borderRadius: 14,
    padding: 16,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
  label: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 2,
  },
  value: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#232323',
    padding: 14,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
  },
  settingsHeading: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  settingItem: {
    backgroundColor: '#1c1c1e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutItem: { backgroundColor: '#2a2a2c', marginTop: 10 },
});
