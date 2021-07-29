import React from "react";
import Constants from "expo-constants";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../assets/colors";
import moment from "moment";
import { globalStyles } from "../assets/globalStyles";
import { useNavigation } from "@react-navigation/native";

export default function SuccessBox({ numCups, numContainers, text, location }) {
  const navigation = useNavigation();

  function renderContent() {
    if (numCups > 0 && numContainers > 0) {
      return (
        <View>
          <View style={styles.variableContent}>
            <Text style={styles.number}>{numContainers}</Text>
            <Icon name="cube" type="font-awesome" size={48} color="black" />
          </View>
          <View style={styles.variableContent}>
            <Text style={styles.number}>{numCups}</Text>
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
          <Text style={styles.number}>{numCups}</Text>
          <Icon name="cup" type="material-community" size={48} color="black" />
        </View>
      );
    } else if (numContainers > 0) {
      return (
        <View style={styles.variableContent}>
          <Text style={styles.number}>{numContainers}</Text>
          <Icon name="cube" type="font-awesome" size={48} color="black" />
        </View>
      );
    } else {
      return null;
    }
  }

  function renderLocation() {
    if (location === undefined) {
      return null;
    } else {
      return (
        <View style={styles.underlined}>
          <Text style={{ color: colors.darkGrey, fontSize: 18 }}>
            Location:{"  "}
            <Text style={{ color: colors.black, fontSize: 18 }}>
              {location}
            </Text>
          </Text>
        </View>
      );
    }
  }

  function renderText() {
    if (text === undefined) {
      return null;
    } else {
      return <Text style={styles.text}>{text}</Text>;
    }
  }

  return (
    <View style={styles.box}>
      <Icon
        containerStyle={{ marginBottom: 20 }}
        name="checkcircle"
        type="antdesign"
        color="#0CF574"
        size={80}
      />
      <Text style={[styles.header, { marginBottom: 20 }]}>Successful!</Text>

      <View style={styles.underlined}>
        <Text style={{ color: colors.darkGrey, fontSize: 18 }}>
          Date:{"  "}
          <Text style={{ color: colors.black, fontSize: 18 }}>
            ({moment().format("ddd")}) {moment().format("DD/MM/YYYY")}
          </Text>
        </Text>
      </View>
      <View style={styles.underlined}>
        <Text style={{ color: colors.darkGrey, fontSize: 18 }}>
          Time:{"  "}
          <Text style={{ color: colors.black, fontSize: 18 }}>
            {moment().format("hh:mm a")}
          </Text>
        </Text>
      </View>

      {renderLocation()}
      {renderContent()}
      {renderText()}

      <TouchableOpacity
        style={[globalStyles.button, { width: "100%", alignSelf: "center" }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={globalStyles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
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
  underlined: {
    borderBottomColor: colors.darkGrey,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 10,
  },
  number: {
    fontSize: 48,
    fontWeight: "bold",
    marginRight: 40,
  },
  variableContent: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
