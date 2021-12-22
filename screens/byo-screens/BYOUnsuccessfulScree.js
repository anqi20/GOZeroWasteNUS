import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import UnsuccessBox from "../../components/UnsuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import { useBackHandler } from "@react-native-community/hooks";
import { backActionHandler } from "../BasicApi";

export default function BYOUnsuccessfulScreen() {
  // Prevent back button action on Android
  useBackHandler(backActionHandler);

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
