import { Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";



export default function CustomDrawer(props) {
    
    return (
        <View style={{ flex: 1, backgroundColor: '#CC0000' }}>
        <DrawerContentScrollView { ...props } contentContainerStyle={{ flex: 1, backgroundColor: '#CC0000' }}>
            <View style={{ padding: 60, }}>
            </View>
            <View style={{ flex:1, backgroundColor: '#fff' }}>

            <DrawerItemList {...props}/>
            <View style={{ flex: 1, alignItems: 'center', TextAlign: 'center', justifyContent:'flex-end', paddingBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Pokédex</Text>
                <Text style={{ fontSize: 16}}>Version 1.0</Text>
               </View> 
            </View>
        </DrawerContentScrollView>
        </View>
    
    );
}
