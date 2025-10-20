import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function ResetButton({onPress}) {
    const { theme } = useTheme();
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={{backgroundColor:'blue', borderRadius:50, flexDirection: 'row', alignItems: 'center', padding: 10}}>
            <FontAwesome style={{marginHorizontal:10}} name='undo' color={"white"} size={50} />
            <Text style={{flex:1, textAlign: 'center', color : 'white', textTransform: 'uppercase', fontWeight: 'bold'}}>Réinitialiser la fiche Dresseur</Text>
        </TouchableOpacity>
    );
}
