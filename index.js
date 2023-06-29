import { registerRootComponent } from "expo";
import { MMKV } from "react-native-mmkv";

import App from "./App";
import messaging from "@react-native-firebase/messaging";

messaging().setOpenSettingsForNotificationsHandler(async () => {
  // Set persistent value, using the MMKV package just as an example of how you might do it
  MMKV.setBool(openSettingsForNotifications, true);
});
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
