import { Image, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList,} from "@react-navigation/drawer";
import app from "../../app.json"

export default function CustomDrawer(props) {

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
       <Image
        source={require('../images/banniere.png')}
        style={{ width: '100%', height: 150, }}
       />


      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 10 }}
      >
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>

      <View style={{ padding: 20, alignItems: 'center', paddingBottom: 50 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{app.expo.name}</Text>
        <Text style={{ fontSize: 16 }}>{app.expo.owner}</Text>
        <Text style={{ fontSize: 14 }}>Version {app.expo.version}</Text>
      </View>

    </View>
  );
}