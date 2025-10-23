import { Image, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList, } from "@react-navigation/drawer";
import app from "../../../app.json"
import { useTheme } from "../../../ThemeContext";

export default function CustomDrawer(props) {
  const { theme, currentColors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: currentColors.background, }}>
      <Image
        source={require('../../images/banniere.png')}
        style={{ width: '100%', height: 150, }}
      />


      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 10 }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{ padding: 20, alignItems: 'center', paddingBottom: 50 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: currentColors.text }}>{app.expo.name}</Text>
        <Text style={{ fontSize: 16, color: currentColors.text }}>{app.expo.owner}</Text>
        <Text style={{ fontSize: 14, color: currentColors.text }}>Version {app.expo.version}</Text>
      </View>

    </View>
  );
}