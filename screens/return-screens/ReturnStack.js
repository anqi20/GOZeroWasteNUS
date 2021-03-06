import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ReturnQRScreen from "./ReturnQRScreen";
import ReturnStatusScreen from "./ReturnStatusScreen";
import ReturnSuccessfulScreen from "./ReturnSuccessfulScreen";
import ReturnUnsuccessfulScreen from "./ReturnUnsuccessfulScreen";
import ReturnErrorScreen from "./ReturnErrorScreen";
import ReturnClaimSuccess from "./ReturnClaimSuccess";
import TempReturnSelection from "./TempReturnSelection";

const Stack = createStackNavigator();

export default function ReturnStack() {
  return (
    <Stack.Navigator options={{ gestureEnabled: false }}>
      <Stack.Screen
        name="Temp Return Selection Screen"
        component={TempReturnSelection}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      {/* <Stack.Screen
        name="Return QR Screen"
        component={ReturnQRScreen}
        options={{ headerShown: false }}
      ></Stack.Screen> */}
      <Stack.Screen
        name="Return Status Screen"
        component={ReturnStatusScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Return Success Screen"
        component={ReturnSuccessfulScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Return Unsuccess Screen"
        component={ReturnUnsuccessfulScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Return Error Screen"
        component={ReturnErrorScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Return Claim Success Screen"
        component={ReturnClaimSuccess}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
