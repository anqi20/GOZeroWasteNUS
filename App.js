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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isValidated, setValidated] = useState(false);

  /* Monitors authentication state for persistent log in.
   On initial loading of the app, if user is previously logged in, this
   function will get the user data */
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

        console.log(`Email isValidated?: ${user.emailVerified}`);
        setValidated(user.emailVerified);

        // Add uid to logs on log in (TEMPORARY)
        usersRef
          .doc(user.uid)
          .collection("logs")
          .doc("logsDoc")
          .set({ id: user.uid }, { merge: true });
      } else {
        setLoading(false);
        setUser(null);
      }
    });
  }, []);

  const authContext = {
    terminateAccount: (data) => {
      const usersRef = firebase.firestore().collection("users");
      // Remove user data
      usersRef
        .doc(data.uid)
        .delete()
        .then(() => {
          console.log(`Document ${data.uid} successfully deleted!`);

          // Remove auth for user
          data.user
            .delete()
            .then(() => {
              setUser(null);
              setValidated(false);
              console.log(`User ${data.uid} account terminated!`);
            })
            .catch((error) => {
              console.log("Error terminating account: ", error);
            });
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
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
          data.setSubmit(true);
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
              } else if (response.user.emailVerified == false) {
                // Checks if the user has been verified
                setValidated(false);

                response.user
                  .sendEmailVerification()
                  .then(() => {
                    console.log(
                      `Email verification re-sent to ${response.user.email}`
                    );
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                data.setErrorMsg(
                  "Please check your inbox and verify your email before trying again or sign up again with your personal email!"
                );
              } else {
                const userData = firestoreDocument.data();
                setUser(userData);
                setValidated(true);
                console.log("User is logged in!");
              }
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
            location: "",
            numCup: 0,
            numContainer: 0,
          });
          // Add logs collection to each user
          firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("logs")
            .doc("logsDoc")
            .set({ logsArray: [], id: uid });
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
          data.setSubmit(true);
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
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {console.log(
            `Authentication screen check isValidated? : ${isValidated}`
          )}
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
    </SafeAreaProvider>
  );
}
