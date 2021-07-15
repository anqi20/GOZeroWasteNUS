import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import SuccessBox from "../components/SuccessBox";
import colors from "../assets/colors";
import { globalStyles } from "../assets/globalStyles";
import FooterText from "../components/FooterText";

export default function ReturnSuccessfulScreen({ route }) {
  const { numCups, numContainers, location } = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.header}>Return</Text>
      <SuccessBox
        numCups={numCups}
        numContainers={numContainers}
        location={location}
      />
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
