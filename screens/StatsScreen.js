import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../assets/colors";
import moment from "moment";

export default function StatsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.contentContainer}>
        <Text style={[styles.redNumber, { marginRight: 25 }]}>3</Text>
        <Icon name="cube" type="font-awesome" size={60} color="black" />
        <View style={{ marginLeft: 30 }}>
          <Text>Return by:{"\n"}</Text>
          <Text>({moment("23/08/21", "DD-MM-YY").format("ddd")}) 23/08/21</Text>
          <Text>({moment("24/8/21", "DD-MM-YY").format("ddd")}) 24/08/21</Text>
          <Text>({moment("26/8/21", "DD-MM-YY").format("ddd")}) 26/08/21</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.redNumber}>3</Text>
        <Icon name="cup" type="material-community" size={60} color="black" />
        <View style={{ marginLeft: 30 }}>
          <Text>Return by:{"\n"}</Text>
          <Text>({moment("23/08/21", "DD-MM-YY").format("ddd")}) 23/08/21</Text>
          <Text>({moment("24/8/21", "DD-MM-YY").format("ddd")}) 24/08/21</Text>
          <Text>({moment("26/8/21", "DD-MM-YY").format("ddd")}) 26/08/21</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.redNumber}>128</Text>
        <Icon
          name="money-bill-alt"
          type="font-awesome-5"
          size={50}
          color="black"
        />
        <Text style={styles.redNumber}>3</Text>
        <Icon name="coins" type="font-awesome-5" size={50} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContentView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    backgroundColor: colors.white,
    height: 150,
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 20,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  redNumber: {
    fontSize: 48,
    color: colors.red,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
});
