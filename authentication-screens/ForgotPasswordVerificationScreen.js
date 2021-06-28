import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function ForgotPasswordVerificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hi I am the forgot password verification screen!</Text>
      <Button
        title="confirmation screen"
        onPress={() => navigation.navigate("Forgot Password Confirmation Screen")}
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
