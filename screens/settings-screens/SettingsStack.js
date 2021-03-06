import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EditAccountScreen from "./EditAccountScreen";
import LogsScreen from "./LogsScreen";
import TutorialScreen from "./TutorialScreen";
import FeedbackScreen from "./FeedbackScreen";
import LocationsScreen from "./LocationsScreen";
import StallsScreen from "./StallsScreen";
import TermsScreen from "./TermsScreen";
import TerminateAccountScreen from "./TerminateAccountScreen";
import MainSettingsScreen from "./MainSettingsScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";
import TerminateConfirmationScreen from "./TerminateConfirmationScreen";
import TutorialStack from "./TutorialStack";

const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Main settings screen"
        component={MainSettingsScreen}
        options={{ title: "Settings", headerBackTitleVisible: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Edit account details"
        component={EditAccountScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Change password"
        component={ChangePasswordScreen}
      ></Stack.Screen>
      {/* <Stack.Screen
        name="How to use?"
        component={TutorialScreen}
      ></Stack.Screen> */}
      <Stack.Screen name="How to use?" component={TutorialStack} />
      <Stack.Screen name="Logs" component={LogsScreen}></Stack.Screen>
      <Stack.Screen
        name="Feedback to us!"
        component={FeedbackScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Location of our collection machines"
        component={LocationsScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Participating stalls"
        component={StallsScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Terms and Conditions"
        component={TermsScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Terminate my account"
        component={TerminateAccountScreen}
        options={{ headerShown: false, headerBackTitleVisible: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Account terminated"
        component={TerminateConfirmationScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          gestureEnabled: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
