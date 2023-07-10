// import { useState, useEffect, useRef } from "react";
// import { Text, View, Button, Platform } from "react-native";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   console.log("Pushing notification");
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Lify-app Push Notification",
//     body: "This push notification is triggered from the front",
//     data: {
//       someData: {
//         name: "Lifty",
//         app: "lifting app",
//         environment: "Expo Go",
//       },
//     },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   return token;
// }

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState("");
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) =>
//       setExpoPushToken(token)
//     );

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         console.log("The Notification has been received");
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return (
//     <View
//       style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
//     >
//       <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: "center", justifyContent: "center" }}>
//         <Text>
//           Title: {notification && notification.request.content.title}{" "}
//         </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <View>
//           <View>
//             <Text>
//               Name:{" "}
//               {notification && notification.request.content.data.someData.name}
//             </Text>
//           </View>
//           <View>
//             <Text>
//               App:{" "}
//               {notification && notification.request.content.data.someData.app}
//             </Text>
//           </View>
//           <Text>
//             environment:{" "}
//             {notification &&
//               notification.request.content.data.someData.environment}
//           </Text>
//           {/* {notification && JSON.stringify(notification.request.content.data)} */}
//         </View>
//       </View>
//       <Button
//         title="Press to Send Notification"
//         onPress={async () => {
//           await sendPushNotification(expoPushToken);
//         }}
//       />
//     </View>
//   );
// }

import React from "react";

import { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import AppNavigation from "./navigation/appnavigation";

import { Colors, Header } from "react-native/Libraries/NewAppScreen";
import { configurePushNotifications } from "./pushNotifications/configurePush";
import {
  requestUserPermission,
  getDeviceToken,
  registerForFCMNotifications,
} from "./services/push";
import { MMKV, useMMKVObject } from "react-native-mmkv";
import { storage } from "./storage";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  // const openSettingsForNotifications = storage.getBoolean("openSettingsFor");
  // console.log("SETTINGS MMK V VALUE", openSettingsForNotifications);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // console.log("registering for push");
    // configurePushNotifications();
    // console.log("MMKvalue;;;", openSettingsForNotifications);
    requestUserPermission();
    getDeviceToken();
    registerForFCMNotifications();
  }, []);

  // useEffect(() => {
  //   if (openSettingsForNotifications) {
  //     navigate("NotificationsSettings");
  //   }
  // }, [openSettingsForNotifications]);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <AppNavigation>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          <Header />
        </ScrollView>
      </SafeAreaView>
    </AppNavigation>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
