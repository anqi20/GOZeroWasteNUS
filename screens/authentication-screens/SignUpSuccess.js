import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../../assets/globalStyles";
import colors from "../../assets/colors";

export default function SignUpSuccess({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account successfully created!</Text>
      <TouchableOpacity
        style={[globalStyles.button, { width: "80%" }]}
        onPress={() => navigation.navigate("Main Tab Navigator")}
      >
        <Text style={globalStyles.buttonText}>Get started!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    margin: 30,
    textAlign: "center",
    fontSize: 32,
  },
});
