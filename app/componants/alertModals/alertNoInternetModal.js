import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function AlertNoInternetModal({
    visible,
    onClose,
    title = "Pas de connexion Internet",
    message = "Merci de vérifier votre connexion internet\n(le Franc'O dex en a besoin pour fonctionner)",
}) {
    const { currentColors } = useTheme();

    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={[styles.modalOverlay]}>
                <View
                    style={[styles.modalContent, { backgroundColor: currentColors.background }]}>
                    <Text style={{ color: currentColors.text, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                        {title}
                    </Text>
                    <Text style={{ color: currentColors.text, marginTop: 10, textAlign: 'center' }}>
                        {message}
                    </Text>

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
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    }

});
