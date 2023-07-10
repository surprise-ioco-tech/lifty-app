import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const NativeStack = createNativeStackNavigator();

import ProductScreen from "../screens/details/product";
import DetailsScreen from "../screens/details/details";
import TestScreen from "../screens/details/test";

const DetailsNavigator = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name={"DetailsScreen"}
        component={DetailsScreen}
      ></NativeStack.Screen>
      <NativeStack.Screen
        name={"ProductScreen"}
        component={ProductScreen}
      ></NativeStack.Screen>
      <NativeStack.Screen
        name={"TestScreen"}
        component={TestScreen}
      ></NativeStack.Screen>
    </NativeStack.Navigator>
  );
};

export default DetailsNavigator;
