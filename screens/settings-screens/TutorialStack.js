import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BorrowTutorial from "./BorrowTutorial";
import ReturnTutorial from "./ReturnTutorial";
import TutorialScreen from "./TutorialScreen";

const Stack = createStackNavigator();

export default function TutorialStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Tutorial Screen"
        component={TutorialScreen}
        options={{ headerBackTitleVisible: false, title: "Tutorial" }}
      />
      <Stack.Screen
        name="How to borrow?"
        component={BorrowTutorial}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="How to return?"
        component={ReturnTutorial}
        options={{ headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
}
