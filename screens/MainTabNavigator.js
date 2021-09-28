import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BorrowStack from "./borrow-screens/BorrowStack";
import ReturnStack from "./return-screens/ReturnStack";
import ModalHomeStack from "./ModalHomeStack";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../assets/UserContext";
// import RewardsScreen from "./reward-screens/RewardsScreen";
import ModalRewardStack from "./reward-screens/ModalRewardStack";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator({ route }) {
  // {
  //   console.log(route.params);
  // }

  return (
    <UserContext.Provider value={route.params}>
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
            } else if (route.name === "Reward") {
              iconName = focused ? "gift" : "gift-outline";
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
        <Tab.Screen name="Reward" component={ModalRewardStack} />
      </Tab.Navigator>
    </UserContext.Provider>
  );
}
