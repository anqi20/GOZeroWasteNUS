import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BorrowScreen from "./BorrowScreen";

const Stack = createStackNavigator();

export default function BorrowStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Borrow Screen"
        component={BorrowScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
