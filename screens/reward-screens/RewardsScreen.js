import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../assets/colors";
import RewardListView from "../../components/RewardListView";

export default function RewardsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <RewardListView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
