import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import UnsuccessBox from "../../components/UnsuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";

export default function BYOUnsuccessfulScreen() {
  return (
    <ScrollView
      style={{ backgroundColor: colors.white }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={globalStyles.header}>I have my own</Text>
        <UnsuccessBox />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 40,
    // alignItems: "center",
    justifyContent: "center",
  },
});
