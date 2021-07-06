import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import EditAccountScreen from "./EditAccountScreen";
import LogsScreen from "./LogsScreen";
import TutorialScreen from "./TutorialScreen";
import FeedbackScreen from "./FeedbackScreen";
import LocationsScreen from "./LocationsScreen";
import VendorsScreen from "./VendorsScreen";
import TermsScreen from "./TermsScreen";
import TerminateAccountScreen from "./TerminateAccountScreen";
import MainSettingsScreen from "./MainSettingsScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";
import MainTabNavigator from "../screens/MainTabNavigator";
import LoginScreen from "../authentication-screens/LoginScreen";

const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Main settings screen"
        component={MainSettingsScreen}
        options={{ title: "Settings" }}
      ></Stack.Screen>
      <Stack.Screen
        name="Edit account details"
        component={EditAccountScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Change password"
        component={ChangePasswordScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="How to use?"
        component={TutorialScreen}
      ></Stack.Screen>
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
        name="Participating vendors"
        component={VendorsScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Terms and conditions"
        component={TermsScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Terminate my account"
        component={TerminateAccountScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
