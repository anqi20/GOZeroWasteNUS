import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BorrowQRScreen from "./BorrowQRScreen";
import BorrowSelectionScreen from "./BorrowSelectionScreen";
import BorrowSuccessfulScreen from "./BorrowSuccessfulScreen";
import BorrowExceededScreen from "./BorrowExceededScreen";
import BorrowUnsuccessfulScreen from "./BorrowUnsuccessfulScreen";
import QRGenerator from "./QRGenerator";

const Stack = createStackNavigator();

export default function BorrowStack() {
  return (
    <Stack.Navigator options={{ gestureEnabled: false }}>
      <Stack.Screen
        name="Borrow QR Screen"
        component={BorrowQRScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Selection Screen"
        component={BorrowSelectionScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Success Screen"
        component={BorrowSuccessfulScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      ></Stack.Screen>
      {/* <Stack.Screen
        name="Quota Exceeded"
        component={BorrowExceededScreen}
        options={{ headerShown: false }}
      ></Stack.Screen> */}
      <Stack.Screen
        name="Unsuccess Screen"
        component={BorrowUnsuccessfulScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="QR Generator"
        component={QRGenerator}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
