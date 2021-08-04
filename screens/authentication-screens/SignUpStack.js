import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// import SignUpScreen from "./SignUpScreen";
import SignUpVerificationScreen from "./SignUpVerificationScreen";
import SignUpDetailScreen from "./SignUpDetailScreen";
import SignUpSuccess from "./SignUpSuccess";

const Stack = createStackNavigator();

export default function SignUpStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign Up Detail Screen"
        component={SignUpDetailScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Sign Up Verification Screen"
        component={SignUpVerificationScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Sign Up Success"
        component={SignUpSuccess}
        options={{ headerShown: false }}
      ></Stack.Screen>
      {/* <Stack.Screen
        name="Sign Up Screen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      ></Stack.Screen> */}
    </Stack.Navigator>
  );
}
