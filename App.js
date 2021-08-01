import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MainTabNavigator from "./screens/MainTabNavigator";
import AuthStack from "./screens/authentication-screens/AuthStack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth Stack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main Tab Navigator"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
