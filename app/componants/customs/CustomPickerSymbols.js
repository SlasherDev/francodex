import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function CustomPickerSymbols({
  options = [],
  onSelect,
  selectedValue,
  title,
  onClose,
  style,
  textStyle,
  children,
  visible, // pour compatibilité si contrôlé manuellement
}) {
  const { theme, currentColors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const isVisible = visible !== undefined ? visible : modalVisible;

  const handleOpen = () => setModalVisible(true);
  const handleClose = () => {
    setModalVisible(false);
    if (onClose) onClose();
  };

  const handleSelect = (val) => {
    if (onSelect) onSelect(val);
    handleClose();
  };

  const currentOption = options.find((o) => o.value === selectedValue);
  const displayLabel = currentOption ? currentOption.label : (selectedValue ?? '>');

  return (
    <>
      <TouchableOpacity style={style} onPress={handleOpen}>
        {children ? (
          children
        ) : (
          <Text style={[{ fontSize: 20, color: theme === 'dark' ? 'white' : 'black' }, textStyle]}>
            {displayLabel}
          </Text>
        )}
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={handleClose}
        >
          <View style={[styles.modalContent, { backgroundColor: currentColors.background }]}>
            {title && <Text style={[styles.title, { color: currentColors.text }]}>{title}</Text>}

            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              renderItem={({ item }) => {
                const isSelected = selectedValue === item.value;
                return (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.value)}
                    style={[
                      styles.optionButton,
                      isSelected && [styles.selectedOption, { borderColor: theme === 'dark' ? 'white' : 'black' }],
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionLabel,
                        { color: currentColors.text },
                        isSelected && styles.selectedOptionText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
    padding: 20,
  },
  modalContent: {
    alignItems: 'center',

    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },

  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 100,
    height: 100,
    margin: 12,
    borderWidth: 2,
    borderColor: '#cacaca',
    borderRadius: 20,
    gap: 12,
  },
  selectedOption: {
    borderWidth: 2,
  },
  optionLabel: {
    fontSize: 25,
    textAlign: 'center',
  },
  optionLegend: {
    fontSize: 16,
    flex: 1,
  },
  selectedOptionText: {
    fontWeight: 'bold',

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
});
