import React from "react";
import { StyleSheet, Text, ScrollView, Image, Dimensions } from "react-native";
import UnsuccessBox from "../../components/UnsuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import { useBackHandler } from "@react-native-community/hooks";
import { backActionHandler } from "../BasicApi";

export default function ReturnUnsuccessfulScreen() {
  // Prevent back button action on Android
  useBackHandler(backActionHandler);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={require("../../assets/AppImages/returnHeader.png")}
        style={{ width: Dimensions.get("window").width, marginBottom: 50 }}
      />
      <UnsuccessBox />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
