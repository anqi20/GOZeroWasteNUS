import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";

export default function FooterText() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        If there is any error, please{" "}
        <TouchableOpacity
          onPress={() => navigation.navigate("Feedback to us!")}
        >
          <Text style={styles.clickable}>feedback to us</Text>
        </TouchableOpacity>{" "}
        or call the helpdesk{"\n"}
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
  clickable: {
    fontSize: 18,
    color: colors.darkGrey,
    textDecorationLine: "underline",
  },
});
