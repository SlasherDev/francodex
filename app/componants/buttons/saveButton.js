import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export default function SaveButton({onPress}) {
    const { theme } = useTheme();
    return (
        <TouchableOpacity 
     onPress={onPress}
    style={{backgroundColor:'green', borderRadius:40, flexDirection: 'row', alignItems: 'center', padding: 10, position: 'relative'}}> 
    
    {/* Icône à gauche - sa position dans le flux normal est conservée */}
    <FontAwesome style={{marginHorizontal:10}} name='save' color={"white"} size={50} />
    
    {/* Conteneur de texte centré - utilisez 'position: "absolute"' */}
    <Text style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', color : 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>Enregistrer</Text>
</TouchableOpacity>
    );
}
