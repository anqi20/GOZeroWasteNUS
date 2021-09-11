import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../assets/colors";

export default function BYOScreen() {
  return (
    <View style={styles.container}>
      <Text>BYO SCREEN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
