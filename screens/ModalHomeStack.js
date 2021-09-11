import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SuccessfulRedemptionScreen from "./reward-screens/SuccessfulRedemptionScreen";
import HomeStack from "./HomeStack";
import { CardStyleInterpolators } from "@react-navigation/stack";

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
    </Stack.Navigator>
  );
}
