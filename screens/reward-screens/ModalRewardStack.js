import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SuccessfulRedemptionScreen from "../SuccessfulRedemptionScreen";
import ConfirmationModal from "./ConfirmationModal";
import RewardsScreen from "./RewardsScreen";
import { CardStyleInterpolators } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function ModalRewardStack() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name="Reward Screen"
        component={RewardsScreen}
        options={{ title: "My Rewards", headerShown: true }}
      />
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
