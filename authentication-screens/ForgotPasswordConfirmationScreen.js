import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function ForgotPasswordConfirmationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hi I am the forgot password confirmation screen!</Text>
      <Button
        title="home page"
        onPress={() => navigation.navigate("Main Tab Navigator")}
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
