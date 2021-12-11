import React from "react";

import { StyleSheet, View, Text, Dimensions, Image, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../assets/colors";
import RewardListView from "../../components/RewardListView";
import Announcements from "../../components/Announcements";

export default function RewardsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/*Top container: Announcements + Coins*/}
      <View style={styles.topContainer}>
        {/*Annoucements*/}
        <View>
          <Announcements
            header={true}
            text="Return 1 reusables to get x2 coins today!"
          />
        </View>

        {/*Coins*/}
        <View style={styles.box}>
          <Text style={styles.text}>Return reusables to collect coins!</Text>
          <View style={styles.icon}>
            <Text style={[styles.blackNumber, { marginRight: 25 }]}>3</Text>
            <Image
              source={require("../../assets/AppImages/coin.png")}
              style={{ height: 30, width: 30 }}
            />

            {/* <Icon name="coins" type="font-awesome-5" size={25} color="black" /> */}
          </View>
        </View>
      </View>

      <View style={styles.line} />

      {/*List of rewards*/}
      <SafeAreaView style={{flex: 1}}>
        <RewardListView />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  topContainer: {
    backgroundColor: colors.black,
    width: Dimensions.get("window").width,
    alignItems: "center",
    paddingTop: 10,
  },
  box: {
    width: Dimensions.get("window").width - 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    borderColor: colors.black,
    borderWidth: 2,
    marginVertical: 10,
    backgroundColor: colors.white,
  },
  text: {
    textAlign: "center",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  blackNumber: {
    fontSize: 24,
    color: colors.black,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  line: {
    borderWidth: 1,
    width: Dimensions.get("window").width,
  },
});
