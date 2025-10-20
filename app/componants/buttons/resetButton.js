import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function ResetButton({onPress}) {
    const { theme } = useTheme();
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={{backgroundColor:'blue', borderRadius:50, flexDirection: 'row', alignItems: 'center', padding: 10, position: 'relative'}}>
            <FontAwesome style={{marginHorizontal:10}} name='undo' color={"white"} size={50} />
            <Text style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center',color : 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>Réinitialiser</Text>
        </TouchableOpacity>
    );
}
