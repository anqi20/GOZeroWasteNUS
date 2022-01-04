import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import colors from "../assets/colors";

export default function Announcements({ header, text }) {
  return (
    <View style={styles.container}>
      {header ? (
        <Text style={styles.headerText}>Thank you for using the app!</Text>
      ) : (
        <View />
      )}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: colors.backgroundGrey,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 10,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
});
