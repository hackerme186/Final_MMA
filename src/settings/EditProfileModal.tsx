import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileModal({ visible, onClose, onSave, initial }) {
  const [name, setName] = useState(initial.name || '');
  const [email, setEmail] = useState(initial.email || '');
  const [phone, setPhone] = useState(initial.phone || '');

  useEffect(() => {
    setName(initial.name || '');
    setEmail(initial.email || '');
    setPhone(initial.phone || '');
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.background}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Edit Profile</Text>
            <TouchableOpacity onPress={onClose}><Ionicons name="close" size={22} color="#fff" /></TouchableOpacity>
          </View>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" placeholderTextColor="#888" />
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address" />
          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" placeholderTextColor="#888" keyboardType="phone-pad" />
          <TouchableOpacity style={styles.saveBtn} onPress={() => onSave({ name, email, phone })}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000a' },
  modal: { width: '90%', backgroundColor: '#181819', borderRadius: 14, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  label: { color: '#aaa', fontSize: 14, marginTop: 14, marginBottom: 4 },
  input: { backgroundColor: '#232323', padding: 10, color: '#fff', borderRadius: 8 },
  saveBtn: { backgroundColor: '#1DB954', marginTop: 24, borderRadius: 10, alignItems: 'center', padding: 12 },
  saveText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
