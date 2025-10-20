import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function AlertReleasePokemonModal({
  visible,
  onClose,
  onPress,
  option
}) {
  const { currentColors } = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: currentColors.background }]}>
          <Text style={[styles.title, { color: currentColors.text }]}>
            Relâcher {option?.name?.fr} ?
          </Text>
          <Text style={[styles.message, { color: currentColors.text }]}>
            Voulez-vous vraiment relâcher {option?.name?.fr} ?
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onPress} style={[styles.button, styles.yesButton]}>
              <Text style={styles.buttonText}>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.noButton]}>
              <Text style={styles.buttonText}>Non</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginVertical: 15,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  yesButton: {
    backgroundColor: '#e53935',
  },
  noButton: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
