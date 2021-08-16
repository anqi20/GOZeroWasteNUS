import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import MainTabNavigator from "./screens/MainTabNavigator";
import AuthStack from "./screens/authentication-screens/AuthStack";
import firebase from "./database/firebaseDB";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "./assets/AuthContext";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  /* 
  isValidated initial state set as true
  When app first starts up, if user is previously logged in, user is not null
  and condition for main screens will be satisfied.
  However if user is not previously logged in, user will be null and
  only auth stack will be shown despite isValidated being set to true.
  This state variable is to ensure navigation to sign up validation screens.
  */
  const [isValidated, setValidated] = useState(true);

  // Monitors authentication state for persistent log in.
  // On initial loading of the app, if user is previously logged in, this
  // function will get the user data
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

  const authContext = {
    signUpSuccess: () => {
      if (!isValidated) {
        setValidated(true);
      }
    },
    changePassword: (data) => {},
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
              setValidated(true);
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
    logOut: async () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setUser(null);
          setValidated(false);
          console.log("User is logged out!");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signUp: async (data) => {
      // Create user profile on firebase authentication
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
          // Update user profile
          response.user
            .updateProfile({
              displayName: userData.firstName + " " + userData.lastName,
            })
            .then(() => {
              console.log("User's display name updated successfully!");
              console.log(response.user.displayName);
            })
            .catch((error) => {
              console.log(error);
            });
          // Send verification email
          response.user
            .sendEmailVerification()
            .then(() => {
              console.log("Email verification sent!");
              console.log(response.user.email);
            })
            .catch((error) => {
              data.setErrorMsg(
                "Error sending out verification email, are you sure this email is valid?"
              );
            });

          // Add user's profile information in firestore
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .set(userData)
            .then(() => {
              setUser(userData);
              setValidated(false);
              console.log("User account created!");
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
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {user && isValidated ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Main Tab Navigator"
              component={MainTabNavigator}
              options={{
                headerShown: false,
              }}
              initialParams={user}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Auth Stack"
              component={AuthStack}
              options={{
                animationTypeForReplace: "pop",
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
