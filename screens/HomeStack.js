import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./HomeScreen";
import SettingsStack from "../settings-screens/SettingsStack";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Screen" component={HomeScreen}></Stack.Screen>
      <Stack.Screen
        name="Settings Stack"
        component={SettingsStack}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
