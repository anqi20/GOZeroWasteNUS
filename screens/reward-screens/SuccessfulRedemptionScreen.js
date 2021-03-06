import React from "react";
import Constants from "expo-constants";
import { StyleSheet, Text, ScrollView } from "react-native";
import colors from "../../assets/colors";
import SuccessBox from "../../components/SuccessBox";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";

const statusBar = Constants.statusBarHeight;

export default function SuccessfulRedemptionScreen({ route }) {
  const { text } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={globalStyles.header}>Redemption</Text>
      <SuccessBox text={text} />
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
