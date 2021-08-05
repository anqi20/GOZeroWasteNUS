import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect, useMemo } from "react";
import MainTabNavigator from "./screens/MainTabNavigator";
import AuthStack from "./screens/authentication-screens/AuthStack";
import firebase from "./database/firebaseDB";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "./assets/AuthContext";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
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

  const authContext = useMemo(
    () => ({
      logIn: async (data) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then((response) => {
            const uid = response.user.uid;
            const usersRef = firebase.firestore().collection("users");
            usersRef
              .doc(uid)
              .get()
              .then((firestoreDocument) => {
                if (!firestoreDocument.exists) {
                  console.log("User does not exist anymore.");
                  return;
                }
                const userData = firestoreDocument.data();
                setUser(userData);
                console.log("User is logged in!");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            if (error.code === "auth/wrong-password") {
              data.setErrorMsg("The password entered is incorrrect!");
            }

            if (error.code === "auth/too-many-requests") {
              data.setErrorMsg(
                "Too many failed login attempts. Please try again later or reset your password now."
              );
            }

            if (error.code === "auth/user-not-found") {
              data.setErrorMsg(
                "There is no existing account for this email. Sign up for a new account?"
              );
            }
          });
      },
      logOut: () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            setUser(null);
            console.log("User is logged out!");
          })
          .catch((error) => {
            console.log(error);
          });
      },
      signUp: async (data) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then((response) => {
            const uid = response.user.uid;
            const userData = {
              id: uid,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: data.gender,
              dateOfBirth: data.dateOfBirth,
              faculty: data.faculty,
            };
            const usersRef = firebase.firestore().collection("users");
            usersRef
              .doc(uid)
              .set(userData)
              .then(() => {
                setUser(userData);
                console.log("The new sign up");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              data.setErrorMsg("This email address is already in use!");
            }
          });
      },
    }),
    []
  );

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {user ? <MainTabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
