import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./HomeScreen";
import SettingsStack from "../screens/settings-screens/SettingsStack";
import StatsScreen from "./StatsScreen";
import TutorialScreen from "./settings-screens/TutorialScreen";
import FeedbackScreen from "./settings-screens/FeedbackScreen";
import LocationsScreen from "./settings-screens/LocationsScreen";
import BYOStack from "./byo-screens/BYOStack";
import LeaderboardStack from "./LeaderboardStack";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="Settings Stack"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BYO Stack"
        component={BYOStack}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Rewards Screen"
        component={RewardsScreen}
        options={{ title: "Your Rewards" }}
      /> */}
      {/* <Stack.Screen
        name="Rewards Screen"
        component={ModalRewardStack}
        options={{ title: "Your Rewards" }}
      /> */}
      <Stack.Screen
        name="Stats Screen"
        component={StatsScreen}
        options={{ title: "Personal Stats" }}
      />
      <Stack.Screen
        name="Locations Screen"
        component={LocationsScreen}
        options={{ title: "Locations" }}
      />
      <Stack.Screen name="Tutorial Screen" component={TutorialScreen} />

      {/*To be removed*/}
      <Stack.Screen name="Feedback Screen" component={FeedbackScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardStack} />
    </Stack.Navigator>
  );
}
