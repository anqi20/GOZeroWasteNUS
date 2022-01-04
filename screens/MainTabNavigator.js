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
import { getCoins } from "./BasicApi";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator({ route }) {
  // {
  //   console.log(route.params);
  // }
  // const [coins, setCoins] = useState(0);

  // Get number of coins in user's account
  // useEffect(() => {
  //   console.log("Getting current number of coins");
  //   // console.log(route.params);
  //   getCoins(route.params.id, setCoins);
  // }, []);

  // Currently hardcoded, may change in the future
  function renderRewardsBadge() {
    // console.log(coins);
    // const coin = coins;
    // if (coin >= 50) {
    //   return true;
    // } else {
    //   return null;
    // }
    return null;
  }

  const hasBadge = renderRewardsBadge();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <UserContext.Provider value={route.params}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused
                  ? require("../assets/AppImages/focusedHome.png")
                  : require("../assets/AppImages/unfocusedHome.png");
              } else if (route.name === "Borrow") {
                iconName = focused
                  ? require("../assets/AppImages/focusedBorrow.png")
                  : require("../assets/AppImages/unfocusedBorrow.png");
              } else if (route.name === "Return") {
                iconName = focused
                  ? require("../assets/AppImages/focusedReturn.png")
                  : require("../assets/AppImages/unfocusedReturn.png");
              } else if (route.name === "Reward") {
                iconName = focused
                  ? require("../assets/AppImages/focusedReward.png")
                  : require("../assets/AppImages/unfocusedReward.png");
              }

              return <Image source={iconName} />;
            },
          })}
          tabBarOptions={{
            inactiveBackgroundColor: "black",
            activeBackgroundColor: "black",
            activeTintColor: "#EE8066",
            safeAreaInsets: {
              bottom: 0,
            },
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
    </SafeAreaView>
  );
}
