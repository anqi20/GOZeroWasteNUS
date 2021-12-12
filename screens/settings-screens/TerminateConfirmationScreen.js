import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../../assets/globalStyles";
import firebase from "../../database/firebaseDB";
import { AuthContext } from "../../assets/AuthContext";

export default function TerminateConfirmationScreen({ navigation }) {
  function terminateAccount() {
    return null;
    // useEffect(() => {
    //   const usersRef = firebase.firestore().collection("users");
    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       // Remove user data
    //       usersRef
    //         .doc(user.uid)
    //         .delete()
    //         .then(() => {
    //           console.log("Document successfully deleted!");
    //         })
    //         .catch((error) => {
    //           console.error("Error removing document: ", error);
    //         });

    //       // Remove auth for user
    //       user
    //         .delete()
    //         .then(() => {
    //           console.log("Account terminated");
    //         })
    //         .catch((error) => console.log("Error terminating account"));
    //     } else {
    //       console.log("No user");
    //     }
    //   });
    // }, []);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Account successfully terminated.</Text>
      <TouchableOpacity style={globalStyles.button} onPress={terminateAccount}>
        <Text style={globalStyles.buttonText}>Go to sign in page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  boldText: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 30,
  },
});
