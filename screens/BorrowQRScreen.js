import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../assets/colors";
import { globalStyles } from "../assets/globalStyles";

export default function BorrowQRScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.header}>Borrow</Text>
      <View style={styles.box}>
        <View style={styles.imagePlaceholder} />
        <Text style={styles.text}>Scan the QR code!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Selection Screen")}
          style={styles.qrPlaceholder}
        />
      </View>
      <Text style={styles.subtitle}>
        If there is any error, please feedback to us or call the helpdesk{"\n"}
        @1234 5678!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  box: {
    width: "100%",
    height: "80%",
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: colors.darkGrey,
    textAlign: "center",
    marginVertical: 20,
  },
  qrPlaceholder: {
    backgroundColor: colors.lightGrey,
    width: "70%",
    aspectRatio: 1,
  },
  imagePlaceholder: {
    backgroundColor: colors.lightGrey,
    width: "70%",
    height: "30%",
  },
});
