import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function CustomPickerModal({
  visible,
  options = [],
  onClose,
  onSelect,
  selectedValue,
  title,
}) {
  const { theme, currentColors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={[styles.modalContent, { backgroundColor: currentColors.background }]}>
          {title && <Text style={[styles.title, { color: currentColors.text }]}>{title}</Text>}
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                style={[
                  styles.optionButton,
                  item === selectedValue && styles.selectedOption,
                ]}
              >
               <Text style={[ styles.optionText, { color: currentColors.text }, ...(item === selectedValue ? [ styles.selectedOptionText, { borderColor: theme === 'dark' ? 'white' : 'black' }, ] : []), ]} > {item} </Text>
              </TouchableOpacity>
            )}
          />
           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeText}>Fermer</Text>
                  </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#000000aa",
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  optionButton: {
    marginVertical: 8
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedOption: {
    // backgroundColor: '#f0f0f0',
  },
  selectedOptionText: {
    fontWeight: 'bold',
    borderWidth: 2,
    border: '#ddd',
    paddingVertical: 12,
    borderRadius: 11
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
   closeButton: {
    marginTop: 16,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8
  },
  closeText: {
    fontSize: 16
  }
});
