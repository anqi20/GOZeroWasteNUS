import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ReturnQRScreen from "./ReturnQRScreen";
import ReturnStatusScreen from "./ReturnStatusScreen";
import ReturnSuccessfulScreen from "./ReturnSuccessfulScreen";

const Stack = createStackNavigator();

export default function ReturnStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Return QR Screen"
        component={ReturnQRScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Return Status Screen"
        component={ReturnStatusScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Return Success Screen"
        component={ReturnSuccessfulScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
