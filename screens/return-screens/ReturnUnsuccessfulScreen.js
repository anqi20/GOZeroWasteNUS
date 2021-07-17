import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import UnsuccessBox from "../../components/UnsuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";

export default function ReturnUnsuccessfulScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.header}>Return</Text>
      <UnsuccessBox />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 40,
  },
});
