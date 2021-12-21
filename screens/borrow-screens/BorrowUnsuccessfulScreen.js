import React from "react";
import { StyleSheet, Text, ScrollView, Image, Dimensions } from "react-native";
import UnsuccessBox from "../../components/UnsuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";

export default function BorrowUnsuccessfulScreen() {

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={require("../../assets/AppImages/borrowHeader.png")}
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