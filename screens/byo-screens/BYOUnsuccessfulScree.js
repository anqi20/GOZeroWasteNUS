import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from "react-native";
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
      <Image
        source={require("../../assets/AppImages/byoHeader.png")}
        style={{ width: Dimensions.get("window").width, marginBottom: 50 }}
      />
        <UnsuccessBox />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
