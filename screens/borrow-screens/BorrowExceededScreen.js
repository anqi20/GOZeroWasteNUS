import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "../../assets/colors";
import { Icon } from "react-native-elements";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";
import { StackActions } from "@react-navigation/native";

export default function BorrowExceededScreen({ navigation }) {
  //dummy data
  const numContainers = 3;
  const numCups = 1;

  function renderContent() {
    let colorContainers = "#000000";
    let colorCups = "#000000";
    if (numContainers >= 3) {
      colorContainers = "#FE2C2C";
    }
    if (numCups >= 3) {
      colorCups = "#FE2C2C";
    }

    if (numCups > 0 && numContainers > 0) {
      return (
        <View>
          <View style={styles.variableContent}>
            <Text style={[styles.number, { color: colorContainers }]}>
              {numContainers}
            </Text>
            <Icon name="cube" type="font-awesome" size={48} color="black" />
          </View>
          <View style={styles.variableContent}>
            <Text style={[styles.number, { color: colorCups }]}>{numCups}</Text>
            <Icon
              name="cup"
              type="material-community"
              size={48}
              color="black"
            />
          </View>
        </View>
      );
    } else if (numCups > 0) {
      return (
        <View style={styles.variableContent}>
          <Text style={[styles.number, { color: colorCups }]}>{numCups}</Text>
          <Icon name="cup" type="material-community" size={48} color="black" />
        </View>
      );
    } else if (numContainers > 0) {
      return (
        <View style={styles.variableContent}>
          <Text style={[styles.number, { color: colorContainers }]}>
            {numContainers}
          </Text>
          <Icon name="cube" type="font-awesome" size={48} color="black" />
        </View>
      );
    } else {
      return null;
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.header}>Borrow</Text>
      <View style={styles.box}>
        <Icon
          containerStyle={{ marginBottom: 20 }}
          name="closecircle"
          type="antdesign"
          color="#FE2C2C"
          size={80}
        />
        <Text style={[styles.header, { marginBottom: 20 }]}>
          Quota Exceeded
        </Text>
        <Text style={styles.warningText}>
          You have exceeded the quota of 3 containers / cups.
        </Text>

        {renderContent()}

        <Text style={styles.warningText}>
          Please return before borrowing again!
        </Text>

        <TouchableOpacity
          style={[globalStyles.button, { width: "100%", alignSelf: "center" }]}
          onPress={() => {
            navigation.dispatch(StackActions.popToTop());
            navigation.navigate("Stats Screen");
          }}
        >
          <Text style={globalStyles.buttonText}>Check personal records</Text>
        </TouchableOpacity>
      </View>
      <FooterText />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 40,
  },
  box: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.black,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 32,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  warningText: {
    fontSize: 20,
    textAlign: "center",
  },
  variableContent: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 48,
    fontWeight: "bold",
    marginRight: 40,
  },
});
