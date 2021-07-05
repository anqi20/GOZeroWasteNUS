import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainTabNavigator from "./screens/MainTabNavigator";
import SignUpStack from "./authentication-screens/SignUpStack";
import LoginScreen from "./authentication-screens/LoginScreen";
import ForgotPasswordStack from "./authentication-screens/ForgotPasswordStack";
import OnboardingScreen from "./screens/OnboardingScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding Screen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Log In Screen"
          component={LoginScreen}
          options={{ title: "Log In" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Sign Up Stack"
          component={SignUpStack}
          options={{ title: "Sign Up" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Forgot Password Stack"
          component={ForgotPasswordStack}
          options={{ title: "Forgot your password?" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Main Tab Navigator"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
