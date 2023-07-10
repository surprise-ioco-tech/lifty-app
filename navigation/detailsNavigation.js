import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const NativeStackNavigator = createNativeStackNavigator();

const ProductScreen = () => {
  return (
    <View>
      <Text>I'm the productScreen</Text>
    </View>
  );
};

const TestScreen = () => {
  return (
    <View>
      <Text>I'm the Test Screen</Text>
    </View>
  );
};

const DetailsScreen = () => {
  return (
    <View>
      <Text>I'm the Details Screen</Text>
    </View>
  );
};

const DetailsNavigator = () => {
  return (
    <NativeStackNavigator>
      <NativeStackNavigator.Screen
        name={"DetailsScren"}
        component={DetailsScreen}
      ></NativeStackNavigator.Screen>
      <NativeStackNavigator.Screen
        name={"ProductScren"}
        component={ProductScreen}
      ></NativeStackNavigator.Screen>
      <NativeStackNavigator.Screen
        name={"TestScren"}
        component={TestScreen}
      ></NativeStackNavigator.Screen>
    </NativeStackNavigator>
  );
};

export default DetailsNavigator;
