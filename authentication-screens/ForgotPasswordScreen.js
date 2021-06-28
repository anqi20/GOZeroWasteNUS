import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hi I am the forgot password screen!</Text>
      <Button
        title="verification screen"
        onPress={() => navigation.navigate("Forgot Password Verification Screen")}
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
