import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LeaderboardScreen from "./LeaderboardScreen";

const Stack = createStackNavigator();

export default function LeaderboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Leaderboard Screen"
        component={LeaderboardScreen}
        options={{ title: "Leaderboard", headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
