import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ForgotPasswordScreen from "./ForgotPasswordScreen";

const Stack = createStackNavigator();

export default function ForgotPasswordStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Forgot Password Screen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
