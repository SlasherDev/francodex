import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function ResetCrossText({ onReset }) {
    const { theme } = useTheme();
    return (
        <TouchableOpacity style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 1,
        }}
            onPress={onReset}>
            <Entypo style={{ color: theme === 'dark' ? 'white' : 'black', }} name="cross" size={25} />
        </TouchableOpacity>
    );
}
