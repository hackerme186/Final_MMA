import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  onClose: () => void;
  onDone: (selected: string[]) => void;
  selectedLanguages: string[];
}

const LANGUAGES = [
  'English', 'Tamil', 'Telugu', 'Kannada',
  'Hindi', 'Malayalam', 'Punjabi', 'Bengali'
];

const LanguageModal: React.FC<Props> = ({ visible, onClose, onDone, selectedLanguages }) => {
  const [selected, setSelected] = useState<string[]>(selectedLanguages);

  useEffect(() => {
    setSelected(selectedLanguages);
  }, [visible]);

  const toggleLanguage = (lang: string) => {
    setSelected((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Language(s)</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang}
                onPress={() => toggleLanguage(lang)}
                style={[
                  styles.languageButton,
                  selected.includes(lang) && styles.selectedButton,
                ]}
              >
                <Text style={styles.languageText}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={() => onDone(selected)}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#121212',
    width: '90%',
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  languageButton: {
    width: '47%',
    backgroundColor: '#1f1f1f',
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#333',
    borderColor: '#888',
    borderWidth: 1,
  },
  languageText: {
    color: 'white',
  },
  doneButton: {
    marginTop: 16,
    backgroundColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  doneText: {
    color: '#000',
    fontWeight: '600',
  },
});
