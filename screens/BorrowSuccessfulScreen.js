import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import SuccessBox from "../components/SuccessBox";
import colors from "../assets/colors";
import { globalStyles } from "../assets/globalStyles";
import FooterText from "../components/FooterText";

export default function BorrowSuccessfulScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.header}>Borrow</Text>
      <SuccessBox numCups={2} numContainers={3} />
      <FooterText />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 40,
  },
});
