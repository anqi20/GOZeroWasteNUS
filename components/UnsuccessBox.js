import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../assets/colors";
import { globalStyles } from "../assets/globalStyles";
import { useNavigation, StackActions } from "@react-navigation/native";
import FooterText from "./FooterText";

export default function UnsuccessBox() {
  const navigation = useNavigation();

  return (
    <View style={styles.box}>
      <Icon
        containerStyle={{ marginBottom: 20 }}
        name="closecircle"
        type="antdesign"
        color="#FE2C2C"
        size={80}
      />
      <Text style={[styles.header, { marginBottom: 20 }]}>Oops!</Text>
      <Text style={styles.warningText}>
        Oops, there seems to be an error!
      </Text>

      <View style={styles.icons}>
        <Icon
          containerStyle={{ marginVertical: 15, marginRight: 80 }}
          name="phone"
          type="Feather"
          color="#0CF574"
          size={40}
        />
        <Icon
          containerStyle={{ marginVertical: 15 }}
          name="email"
          type="MaterialIcons"
          color="#0CF574"
          size={40}
        />
      </View>

      <FooterText />

      <Text style={styles.warningText}>
        We apologise for the inconvenience!
      </Text>

      <TouchableOpacity
        style={[globalStyles.button, { width: "100%", alignSelf: "center" }]}
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
          navigation.navigate("Home");
        }}
      >
        <Text style={globalStyles.buttonText}>Back</Text>
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
  warningText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
