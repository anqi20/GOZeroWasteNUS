import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../../assets/globalStyles";
import firebase from "../../database/firebaseDB";
import { AuthContext } from "../../assets/AuthContext";
import { useBackHandler } from "@react-native-community/hooks";
import { backActionHandler } from "../BasicApi";

export default function TerminateConfirmationScreen({ navigation, route }) {
  // Prevent back button action on Android
  useBackHandler(backActionHandler);

  const { user } = route.params;
  const { terminateAccount } = useContext(AuthContext);

  const uid = user.uid;

  function terminate() {
    return terminateAccount({ user, uid });
    // return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Account successfully terminated.</Text>
      <TouchableOpacity style={globalStyles.button} onPress={terminate}>
        <Text style={globalStyles.buttonText}>Go to welcome screen</Text>
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
