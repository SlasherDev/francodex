import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function SaveButton({onPress}) {
    const { theme } = useTheme();
    return (
        <TouchableOpacity 
         onPress={onPress}
        style={{backgroundColor:'green', borderRadius:40, flexDirection: 'row', alignItems: 'center', padding: 10}}>
            <FontAwesome style={{marginHorizontal:10}} name='save' color={"white"} size={50} />
            <Text style={{flex:1, textAlign: 'center', color : 'white', textTransform: 'uppercase', fontWeight: 'bold'}}>Enregistrer</Text>
        </TouchableOpacity>
    );
}
