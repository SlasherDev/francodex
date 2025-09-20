import { Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList,} from "@react-navigation/drawer";
import app from "../../app.json"

export default function CustomDrawer(props) {

  return (
    <View style={{ flex: 1, backgroundColor: '#CC0000' }}>
      <View style={{ padding: 60 }}>
    
      </View>

      <DrawerContentScrollView
        {...props}
        style={{ backgroundColor: '#fff' }}
        contentContainerStyle={{ paddingTop: 10 }}
      >
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>

      <View style={{ backgroundColor: '#fff', padding: 20, alignItems: 'center', paddingBottom: 50 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{app.expo.name.charAt(0).toUpperCase() + app.expo.name.slice(1)}</Text>
        <Text style={{ fontSize: 16 }}>Version {app.expo.version}</Text>
      </View>

    </View>
  );
}