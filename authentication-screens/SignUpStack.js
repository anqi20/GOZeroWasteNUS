import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUpScreen from "./SignUpScreen";

const Stack = createStackNavigator();

export default function SignUpStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign Up Screen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
