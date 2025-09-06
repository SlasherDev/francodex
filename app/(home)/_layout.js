import { Tabs } from "expo-router";
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from "react-native-web";
import { Drawer } from 'expo-router/drawer';
import { Text } from "react-native";
import CustomDrawer from "../componants/CustomDrawer";

export default function Layout() {
    const iconSize = 30;
    return (
        <Drawer drawerContent={props => <CustomDrawer {...props} />} screenOptions={{headerStyle: { backgroundColor: '#CC0000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', textTransform: 'capitalize' },
        tabBarShowLabel: false, tabBarActiveBackgroundColor: '#05068955' }}>
           
            <Drawer.Screen
                name="index"
                options={{ title: 'Pokédex',headerShown: true, drawerIcon: () => <Ionicons name="list" size={iconSize} color={'#050689'} /> }}
            />
                <Drawer.Screen
                    name="Trainer"
                    options={{ title: 'Fiche Dresseur', drawerIcon: () => <Ionicons name="person-circle" size={iconSize} color={'#050689'} /> }}
                />
            <Drawer.Screen
                name="team"
                options={{ title: 'Équipe', drawerIcon: () => <MaterialCommunityIcons name="pokeball" size={iconSize} color={'#050689'} /> }}
            />
            <Drawer.Screen
                name="talents"
                options={{ title: 'Talents', drawerIcon: () => <MaterialCommunityIcons name="lightbulb-on-outline" size={iconSize} color={'#050689'} /> }}
            />
            <Drawer.Screen
                name="eggs"
                options={{ title: 'Eggs', drawerIcon: () => <FontAwesome6 name="egg" size={iconSize} color={'#050689'} /> }}
            />
            <Drawer.Screen
                name="types"
                options={{ title: 'Tableau des types', drawerIcon: () => <FontAwesome name="tags" size={iconSize} color={'#050689'} /> }}
            />
            <Drawer.Screen
                name="filter"
                options={{ title: 'Filtre avancé', drawerIcon: () => <Ionicons name="filter" size={iconSize} color={'#050689'} /> }}
            />
            <Drawer.Screen
                name="settings"
                options={{ title: 'Paramètres', drawerIcon: () => <Ionicons name="settings" size={iconSize} color={'#050689'} /> }}
            />
           
        </Drawer>
    )
}