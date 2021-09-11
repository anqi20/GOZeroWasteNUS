import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../../assets/colors";

export default function ConfirmationModal({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={[styles.modalContainer, styles.shadow]}>
        <Text style={styles.text}>
          Are you sure you want to redeem this reward?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("Successful Redemption Screen")}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    height: "30%",
    width: "90%",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderColor: colors.black,
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGrey,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.black,
  },
  shadow: {
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },

    elevation: 50,
  },
});
