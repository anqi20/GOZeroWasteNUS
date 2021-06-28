import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import ForgotPasswordVerificationScreen from "./ForgotPasswordVerificationScreen";
import ForgotPasswordConfirmationScreen from "./ForgotPasswordConfirmationScreen";

const Stack = createStackNavigator();

export default function ForgotPasswordStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Forgot your password"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Forgot Password Verification Screen"
        component={ForgotPasswordVerificationScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Forgot Password Confirmation Screen"
        component={ForgotPasswordConfirmationScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
