import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LeaderboardScreen from "./LeaderboardScreen";

const Stack = createStackNavigator();

export default function LeaderboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Leaderboard Screen"
        component={LeaderboardScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
