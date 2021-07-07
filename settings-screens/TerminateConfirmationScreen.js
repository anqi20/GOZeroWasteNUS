import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import colors from "../assets/colors";
import { globalStyles } from "../assets/globalStyles";

export default function TerminateConfirmationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Account successfully terminated.</Text>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate("Log In Screen")}
      >
        <Text style={globalStyles.buttonText}>Go to log in page</Text>
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
