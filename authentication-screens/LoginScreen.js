import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hi I am the login screen!</Text>
      <Button
        title="go to main screen"
        onPress={() => navigation.navigate("Main Tab Navigator")}
      ></Button>
      <Button
        title="go to forgot password screen"
        onPress={() => navigation.navigate("Forgot Password Stack")}
      ></Button>
      <Button
        title="go to sign up screen"
        onPress={() => navigation.navigate("Sign Up Stack")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
