import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
// import SignUpScreen from "./SignUpScreen";
import SignUpVerificationScreen from "./SignUpVerificationScreen";
import SignUpDetailScreen from "./SignUpDetailScreen";
import SignUpSuccess from "./SignUpSuccess";
import { AuthContext } from "../../assets/AuthContext";

const Stack = createStackNavigator();

export default function SignUpStack() {
  const { signUp } = useContext(AuthContext);
  // console.log(context);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign Up Detail Screen"
        component={SignUpDetailScreen}
        options={{ title: "Sign Up" }}
        initialParams={signUp}
      ></Stack.Screen>
      <Stack.Screen
        name="Sign Up Verification Screen"
        component={SignUpVerificationScreen}
        // options={{ title: "Sign Up" }}
        options={{ headerShown: false, gestureEnabled: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Sign Up Success"
        component={SignUpSuccess}
        options={{ headerShown: false, gestureEnabled: false }}
      ></Stack.Screen>
      {/* <Stack.Screen
        name="Sign Up Screen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      ></Stack.Screen> */}
    </Stack.Navigator>
  );
}
