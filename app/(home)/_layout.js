import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from "react-native-web";
import { Drawer } from 'expo-router/drawer';
import { Text } from "react-native";
import CustomDrawer from "../componants/CustomDrawer";

export default function Layout() {
    return (
        <Drawer drawerContent={props => <CustomDrawer {...props} />} screenOptions={{headerStyle: { backgroundColor: '#CC0000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', textTransform: 'capitalize' },
        tabBarShowLabel: false, tabBarActiveBackgroundColor: '#05068955' }}>
           
            <Drawer.Screen
                name="index"
                options={{ title: 'Pokédex',headerShown: true, drawerIcon: () => <Ionicons name="list" size={32} color={'#050689'} /> }}
            />
            <Drawer.Screen
                name="team"
                options={{ title: 'Équipe', drawerIcon: () => <MaterialCommunityIcons name="pokeball" size={32} color={'#050689'} /> }}
            />
            <Drawer.Screen
                name="talents"
                options={{ title: 'Talents', drawerIcon: () => <MaterialCommunityIcons name="lightbulb-on-outline" size={32} color={'#050689'} /> }}
            />
            <Drawer.Screen
                name="filter"
                options={{ title: 'Filtre avancé', drawerIcon: () => <Ionicons name="filter" size={32} color={'#050689'} /> }}
            />
            <Drawer.Screen
                name="Trainer"
                options={{ title: 'Fiche Dresseur', drawerIcon: () => <Ionicons name="person-circle" size={32} color={'#050689'} /> }}
            />
           
        </Drawer>
    )
}