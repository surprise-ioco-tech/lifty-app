import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
//import { handleNotificationDisplay } from "../pushNotifications/configurePush";

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission({
    providesAppNotificationSettings: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}

const subscribeToBackgroundNotification = () => {
  console.log("Messaging is configured for backgroundTest");
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });
};
const getDeviceToken = async () => {
  // Register the device with FCM
  //await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();

  // Save the token
  console.log("--- device token ---", token);
  // registerDeviceInfo({ token: token, os: Device.osName });
};
const onMessageReceived = (remoteMsg) => {
  console.log("We have received a message;;;", remoteMsg);
  // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMsg));
  //handleNotificationDisplay(remoteMsg);
};
const registerForFCMNotifications = () => {
  messaging().onMessage(onMessageReceived);
  //messaging().setBackgroundMessageHandler(onMessageReceived);
  // messaging().setBackgroundMessageHandler(onMessageReceived);
};
export {
  requestUserPermission,
  subscribeToBackgroundNotification,
  getDeviceToken,
  registerForFCMNotifications,
};
