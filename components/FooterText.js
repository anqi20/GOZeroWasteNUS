import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../assets/colors";

export default function FooterText() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        If there is any error, please feedback to us or call the helpdesk{"\n"}
        @1234 5678!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    color: colors.darkGrey,
    textAlign: "center",
  },
});
