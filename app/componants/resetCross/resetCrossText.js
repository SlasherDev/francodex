import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function ResetCrossBox({onReset }) {
    const { theme } = useTheme();
    return (
        <TouchableOpacity style={{
            padding: 1,
        }}
            onPress={onReset}>
            <Entypo style={{ color: theme === 'dark' ? 'white' : 'black', }} name="cross" size={20} />
        </TouchableOpacity>
    );
}
