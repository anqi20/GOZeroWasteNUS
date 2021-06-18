import "react-native-gesture-handler";
import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./components/Home";
import Borrow from "./components/Borrow";
import Return from "./components/Return";
import Leaderboard from "./components/Leaderboard";
import colors from "./assets/colors/colors";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.red,
        inactiveTintColor: colors.black,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Image source={require("./assets/images/icons/home.png")} />
          ),
        }}
      />
      <Tab.Screen
        name="Borrow"
        component={Borrow}
        options={{
          tabBarIcon: () => (
            <Image source={require("./assets/images/icons/camera.png")} />
          ),
        }}
      />
      <Tab.Screen
        name="Return"
        component={Return}
        options={{
          tabBarIcon: () => (
            <Image source={require("./assets/images/icons/qrCode.png")} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarIcon: () => (
            <Image source={require("./assets/images/icons/leaderboard.png")} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
