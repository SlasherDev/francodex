import { Drawer } from 'expo-router/drawer';
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomDrawer from "../componants/CustomDrawer";

export default function Layout() {
    const iconSize = 30;
    return (
        <Drawer
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerStyle: { backgroundColor: '#CC0000' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold', textTransform: 'capitalize' },

                // 👇 Styles pour l'élément de menu sélectionné
                drawerActiveBackgroundColor: '#fce8e6', // Un fond rouge très clair
                drawerActiveTintColor: '#CC0000',      // La couleur du texte ET de l'icône en rouge
                drawerInactiveTintColor: '#050689',        // La couleur du texte et de l'icône en gris foncé pour les autres
                
                drawerLabelStyle: {
                    fontSize: 16,
                }
            }}
        >
            {/* 👇 Notez la modification de "drawerIcon" sur chaque ligne pour recevoir la couleur */}
            <Drawer.Screen
                name="index"
                options={{ title: 'Pokédex', headerShown: true, drawerIcon: ({ color }) => <Ionicons name="list" size={iconSize} color={color} /> }}
            />
            <Drawer.Screen
                name="Trainer"
                options={{ title: 'Fiche Dresseur', drawerIcon: ({ color }) => <Ionicons name="person-circle" size={iconSize} color={color} /> }}
            />
            <Drawer.Screen
                name="team"
                options={{ title: 'Équipe', drawerIcon: ({ color }) => <MaterialCommunityIcons name="pokeball" size={iconSize} color={color} /> }}
            />
            <Drawer.Screen
                name="talents"
                options={{ title: 'Talents', drawerIcon: ({ color }) => <MaterialCommunityIcons name="lightbulb-on-outline" size={iconSize} color={color} /> }}
            />
            <Drawer.Screen
                name="eggs"
                options={{ title: 'Eggs', drawerIcon: ({ color }) => <FontAwesome6 name="egg" size={iconSize} color={color} /> }}
            />
            <Drawer.Screen
                name="types"
                options={{ title: 'Tableau des types', drawerIcon: ({ color }) => <FontAwesome name="tags" size={iconSize} color={color} /> }}
            />
            <Drawer.Screen
                name="filter"
                options={{ title: 'Filtre avancé', drawerIcon: ({ color }) => <Ionicons name="filter" size={iconSize} color={color} /> }}
            />
            <Drawer.Screen
                name="settings"
                options={{ title: 'Paramètres', drawerIcon: ({ color }) => <Ionicons name="settings" size={iconSize} color={color} /> }}
            />
        </Drawer>
    );
}