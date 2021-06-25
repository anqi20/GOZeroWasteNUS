import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hi I am the home screen!</Text>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("Settings Stack")}
      >
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text>^Hello you can press me to go to settings</Text>
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
  settingsButton: {
    backgroundColor: "grey",
    width: 24,
  },
});
