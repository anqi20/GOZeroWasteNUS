import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import MainTabNavigator from "./screens/MainTabNavigator";
import AuthStack from "./screens/authentication-screens/AuthStack";
import firebase from "./database/firebaseDB";
import { ActivityIndicator } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const db = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Main Tab Navigator"
            component={MainTabNavigator}
            options={{ headerShown: false }}
            initialParams={user}
          ></Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Auth Stack"
              component={AuthStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main Tab Navigator"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
