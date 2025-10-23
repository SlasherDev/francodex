import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function CancelButton({ onPress }) {
    const { theme } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ backgroundColor: '#CC0000', borderRadius: 50, flexDirection: 'row', alignItems: 'center', padding: 10, position: 'relative' }}>
            <MaterialIcons style={{ marginHorizontal: 10 }} name='cancel' color={"white"} size={50} />
            <Text style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>Annuler</Text>
        </TouchableOpacity>
    );
}
