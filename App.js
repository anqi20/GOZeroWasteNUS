import { View, StyleSheet, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import MainTabNavigator from "./screens/MainTabNavigator";
import AuthStack from "./screens/authentication-screens/AuthStack";
import firebase from "./database/firebaseDB";
import { ActivityIndicator } from "react-native";
import { AuthContext, authContext } from "./assets/AuthContext";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

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
    console.log("Getting user data on startup");
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
        setUser(null);
      }
    });
  }, []);

  const authContext = {
    signUpSuccess: () => {
      if (!isValidated) {
        console.log("sign up success");
        setValidated(true);
      }
    },
    forgotPassword: async (data) => {
      firebase
        .auth()
        .sendPasswordResetEmail(data.email)
        .then(() => {
          data.setStatusMsg("Password reset email sent!");
          console.log("Password reset email sent!");
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/user-not-found") {
            data.setErrorMsg(
              "This email does not have an account yet! Create one?"
            );
          }
        });
    },
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
                console.log("User's document does not exist anymore.");
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
      // console.log(data);
      // Create user profile on firebase authentication
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((cred) => {
          setValidated(false); // Set validated to false on sign up
          const uid = cred.user.uid;
          // Add user's profile information in firestore
          firebase.firestore().collection("users").doc(uid).set({
            id: uid,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            faculty: data.faculty,
            byo: 0,
            coin: 0,
            containerDate: [],
            containerReturned: 0,
            cupDate: [],
            cupReturned: 0,
            userNum: 0,
            numCup: 0,
            numContainer: 0,
            // numReturn: 0,
          });
          // Add logs collection to each user
          firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("logs")
            .doc("initialDoc")
            .set({ new: 0 });
          // Set total users count to increment by 1 for each sign in
          firebase
            .firestore()
            .collection("overall")
            .doc("overallStats")
            .update({
              totalUsers: firebase.firestore.FieldValue.increment(1),
            });

          // Send email verification to user
          cred.user
            .sendEmailVerification()
            .then(() => {
              console.log(`Email verification sent to ${cred.user.email}`);
              console.log(
                `Initial email verification state: ${cred.user.emailVerified}`
              );
            })
            .catch((error) => {
              console.log(error);
              data.setErrorMsg(
                "Error sending out verification email, are you sure this email is valid?"
              );
            });
        })
        .then(() => {
          console.log("User Account created!");
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/email-already-in-use") {
            data.setErrorMsg("This email address is already in use!");
          }
        });
    },
  };

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItem: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {console.log(isValidated)}
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
