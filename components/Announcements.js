import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../assets/colors";

export default function Announcements({header, text}) {
  return (
    <View style={styles.container}>
      {header? <Text style={styles.headerText}>Announcements:</Text>: <View/>}
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    borderColor: colors.black,
    borderWidth: 2,
    backgroundColor: colors.white,
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
  }
})