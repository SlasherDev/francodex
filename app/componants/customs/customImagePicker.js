import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function CustomImagePickerModale({
  visible,
  options = [],
  onClose,
  onSelect,
  selectedValue, // ce sera le name ou l’id
  title,
}) {
  const { theme, currentColors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={[styles.modalContent, { backgroundColor: currentColors.background }]}>
          {title && <Text style={[styles.title, { color: currentColors.text }]}>{title}</Text>}

          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => {
              const isSelected = selectedValue === item.key;
              return (
                <TouchableOpacity
                  onPress={() => { onSelect(item.key); onClose(); }}
                  style={[
                    styles.optionButton,
                    isSelected && styles.selectedOption,
                  ]}
                >
                  {item.key === "none" ? (
                    <View
                      style={[{ backgroundColor: '#cacaca' }, styles.image]}
                    ></View>) : (
                    <Image
                      source={item.img}
                      style={[
                        styles.image,
                        isSelected && styles.selectedImage,
                      ]}
                    />
                  )}
                  <Text
                    style={[
                      styles.optionText,
                      { color: currentColors.text },
                      isSelected && {
                        fontWeight: 'bold',

                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
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
    maxHeight: '90%',
  },
  optionButton: {
    alignItems: 'center',
    margin: 8,
  },
  grid: {
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    margin: 8,
    borderRadius: 100,
  },
  selectedImage: {
    borderWidth: 3,
    borderRadius: 100,
    borderColor: '#cc0000',

  },
  optionText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
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
    borderRadius: 8,
  },
  closeText: {
    fontSize: 16,
  },
  selectedOption: {

  },
});
