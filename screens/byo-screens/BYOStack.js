import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BYOScreen from "./BYOScreen";
import BYOSelectionScreen from "./BYOSelectionScreen";
import BYOUnsuccessfulScreen from "./BYOUnsuccessfulScree";
import BYOSuccessScreen from "./BYOSuccessScreen";

const Stack = createStackNavigator();

export default function BYOStack() {
  return (
    <Stack.Navigator options={{ gestureEnabled: false }}>
      <Stack.Screen
        name="BYO Screen"
        component={BYOScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="BYO Selection Screen"
        component={BYOSelectionScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="BYO Unsuccessful Screen"
        component={BYOUnsuccessfulScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="BYO Success Screen"
        component={BYOSuccessScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
