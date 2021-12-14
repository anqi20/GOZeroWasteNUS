import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BorrowStack from "./borrow-screens/BorrowStack";
import ReturnStack from "./return-screens/ReturnStack";
import ModalHomeStack from "./ModalHomeStack";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../assets/UserContext";
// import RewardsScreen from "./reward-screens/RewardsScreen";
import ModalRewardStack from "./reward-screens/ModalRewardStack";
import firebase from "../database/firebaseDB";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator({ route }) {
  // {
  //   console.log(route.params);
  // }
  const [coins, setCoins] = useState(0);

  // Get number of coins in user's account
  useEffect(() => {
    console.log("Getting current number of coins");
    // console.log(route.params);
    firebase
      .firestore()
      .collection("users")
      .doc(route.params.id)
      .get()
      .then((document) => {
        if (document.exists) {
          setCoins(document.data().coin);
        } else {
          console.log("No such document");
        }
      })
      .catch((error) => {
        console.log("Error getting coin details: ", error);
      });
  }, []);

  // Currently hardcoded, may change in the future
  function renderRewardsBadge() {
    // console.log(coins);
    const coin = coins;
    if (coin >= 50) {
      return true;
    } else {
      return null;
    }
  }

  const hasBadge = renderRewardsBadge();

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
          activeTintColor: "#EE8066",
          safeAreaInsets:{
            bottom: 0,
          }
        }}
      >
        <Tab.Screen name="Home" component={ModalHomeStack} />
        <Tab.Screen name="Borrow" component={BorrowStack} />
        <Tab.Screen name="Return" component={ReturnStack} />
        <Tab.Screen
          name="Reward"
          component={ModalRewardStack}
          options={{ tabBarBadge: hasBadge }}
        />
      </Tab.Navigator>
    </UserContext.Provider>
  );
}
