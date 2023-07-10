import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import messaging from "@react-native-firebase/messaging";

import LoginScreen from "../screens/login/login";
import HomeScreen from "../screens/home/home";
import NotificationSettingsScreen from "../screens/notification-settings";
import DetailsNavigator from "./detailsNavigation";
import { navigationRef, navigate } from "../RootNavigation";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();

function AppNavigation() {
  //const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Home");
  // messaging()
  //   .getInitialNotification()
  //   .then((remoteMessage) => {
  //     console.log("GETINITIAL NOTIFICATION iN APP;;;", remoteMessage);
  //     setInitialRoute("NotificationSettings");
  //     if (remoteMessage) {
  //       console.log(
  //         "Notification caused app to open from quit state:",
  //         remoteMessage.notification
  //       );
  //       // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //     }
  //     setLoading(false);
  //   });

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    console.log("COnfiguring backgrounds handles");
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage
      );
      // navigate("NotificationSettings");
      navigate("Details", {
        screen: "ProductScreen",
        params: {
          itemId: 86,
          otherParam: "anything you want here",
        },
      });
    });

    //Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        //remoteMessage --> is now filled
        console.log("getInitialNotification", remoteMessage);
        setLoading(false);
      })
      .catch((err) => {
        console.log("WE HAVE A FAILED NOTIFICATION;;;", err);
      });
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer ref={navigationRef} initialRoute={initialRoute}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettingsScreen}
        />
        <Stack.Screen
          name={"Details"}
          component={DetailsNavigator}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
