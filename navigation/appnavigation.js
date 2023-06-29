import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/login/login";
import HomeScreen from "../screens/home/home";
import NotificationSettingsScreen from "../screens/notification-settings";
import { navigationRef } from "../RootNavigation";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
