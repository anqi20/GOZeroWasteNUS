import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ForgotPasswordStack from "./ForgotPasswordStack";
import LoginScreen from "./LoginScreen";
import SignUpStack from "./SignUpStack";
import OnboardingScreen from "../OnboardingScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding Screen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Log In Screen"
        component={LoginScreen}
        options={{ title: "Log In" }}
        // options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Sign Up Stack"
        component={SignUpStack}
        options={{ title: "Sign Up" }}
        // options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Forgot Password Stack"
        component={ForgotPasswordStack}
        // options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
