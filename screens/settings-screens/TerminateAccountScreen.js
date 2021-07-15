import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Input } from "react-native-elements";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";

export default function TerminateAccountScreen({ navigation }) {
  const [isMatching, setMatching] = useState(false);
  const [showError, setShow] = useState(false);

  function onPress() {
    if (isMatching) {
      setShow(false);
      navigation.navigate("Account terminated");
    } else {
      setShow(true);
    }
  }

  function validate(text) {
    if (text === "TERMINATE") {
      setMatching(true);
    } else {
      setMatching(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.boldText}>We're sad to see you go.</Text>
        <Text style={styles.boldText}>
          Are you sure you want to terminate your account?
        </Text>
        <Text style={{ fontSize: 18, textAlign: "center" }}>
          If so, please type 'TERMINATE' and click terminate.
        </Text>
        <Input
          containerStyle={styles.terminateContainer}
          placeholder="TERMINATE"
          autoCapitalize="characters"
          onChangeText={(text) => validate(text)}
        ></Input>
        {showError ? (
          <Text
            style={{ color: colors.red, textAlign: "center", marginBottom: 10 }}
          >
            Please try again. Input is case sensitive.
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={globalStyles.keepButtonText}>Keep account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.button, { height: 50 }]}
          onPress={onPress}
        >
          <Text style={globalStyles.buttonText}>Terminate</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  outlineButton: {
    height: 50,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  keepButtonText: {
    color: colors.black,
  },
  terminateContainer: {
    marginVertical: 20,
  },
});
