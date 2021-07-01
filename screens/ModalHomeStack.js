import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SuccessfulRedemptionScreen from "./SuccessfulRedemptionScreen";
import HomeStack from "./HomeStack";
import ConfirmationModal from "./ConfirmationModal";
import {
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function ModalHomeStack() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="Home Stack" component={HomeStack} />
      <Stack.Screen
        name="Confirmation Modal"
        component={ConfirmationModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="Successful Redemption Screen"
        component={SuccessfulRedemptionScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
}
