import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import SuccessBox from "../../components/SuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";

export default function BorrowSuccessfulScreen({ route }) {
  const { numCups, numContainers } = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.header}>Borrow</Text>
      <SuccessBox numCups={numCups} numContainers={numContainers} />
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
