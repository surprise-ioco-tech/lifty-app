import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import { MMKV } from "react-native-mmkv";
import { storage } from "./storage";

import { subscribeToBackgroundNotification } from "./services/push";
import App from "./App";
//import messaging from "@react-native-firebase/messaging";

// messaging().setOpenSettingsForNotificationsHandler(async () => {
//   console.log("MESSAGING RUNN");
//   // Set persistent value, using the MMKV package just as an example of how you might do it

//   console.log("MMKV", MMKV);
// });
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
subscribeToBackgroundNotification();
registerRootComponent(App);
