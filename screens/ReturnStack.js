import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ReturnScreen from "./ReturnScreen";

const Stack = createStackNavigator();

export default function ReturnStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Return Screen"
        component={ReturnScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
