import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onDone: (selected: string) => void;
  selectedQuality: string;
  title: string;
  options: string[];
}

const QualityModal: React.FC<Props> = ({ visible, onClose, onDone, selectedQuality, title, options }) => {
  const [selected, setSelected] = useState(selectedQuality);

  useEffect(() => {
    setSelected(selectedQuality);
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt}
              onPress={() => setSelected(opt)}
              style={[styles.optionButton, selected === opt && styles.selectedButton]}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.doneButton} onPress={() => onDone(selected)}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default QualityModal;

const styles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: '#000a', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#121212', width: '90%', borderRadius: 16, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { color: 'white', fontSize: 18, fontWeight: '600' },
  optionButton: { backgroundColor: '#1f1f1f', padding: 14, borderRadius: 10, marginVertical: 8, alignItems: 'center' },
  selectedButton: { backgroundColor: '#333', borderColor: '#1DB954', borderWidth: 2 },
  optionText: { color: 'white', fontSize: 16 },
  doneButton: { marginTop: 18, backgroundColor: '#1DB954', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  doneText: { color: '#000', fontWeight: '600', fontSize: 16 }
});
