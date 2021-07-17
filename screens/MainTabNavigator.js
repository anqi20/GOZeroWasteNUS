import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BorrowStack from "./borrow-screens/BorrowStack";
import ReturnStack from "./return-screens/ReturnStack";
import ModalHomeStack from "./ModalHomeStack";
import LeaderboardStack from "./LeaderboardStack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Borrow") {
            iconName = focused ? "camera" : "camera-outline";
          } else if (route.name === "Return") {
            iconName = focused ? "qr-code-sharp" : "qr-code-outline";
          } else if (route.name === "Leaderboard") {
            iconName = focused ? "trophy" : "trophy-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        inactiveBackgroundColor: "black",
        activeBackgroundColor: "black",
      }}
    >
      <Tab.Screen name="Home" component={ModalHomeStack} />
      <Tab.Screen name="Borrow" component={BorrowStack} />
      <Tab.Screen name="Return" component={ReturnStack} />
      <Tab.Screen name="Leaderboard" component={LeaderboardStack} />
    </Tab.Navigator>
  );
}
