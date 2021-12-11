import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { UserContext } from "../../assets/UserContext";
import firebase from "../../database/firebaseDB";

export default function QRGenerator() {
  const windowWidth = Dimensions.get("window").width;

  // const stallName = "Fresh Fruits & Juices";
  // const stallName = "Mixed Vegetable";
  const stallName = "Vegetarian";

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{stallName}</Text>
      <QRCode value={stallName} size={windowWidth - 50} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 20,
    fontSize: 30,
  },
});
