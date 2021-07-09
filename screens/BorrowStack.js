import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BorrowQRScreen from "./BorrowQRScreen";
import BorrowSelectionScreen from "./BorrowSelectionScreen";
import BorrowSuccessfulScreen from "./BorrowSuccessfulScreen";

const Stack = createStackNavigator();

export default function BorrowStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Borrow QR Screen"
        component={BorrowQRScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Selection Screen"
        component={BorrowSelectionScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Success Screen"
        component={BorrowSuccessfulScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
