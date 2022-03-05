import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import { Input } from "react-native-elements";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import firebase from "../../database/firebaseDB";

export default function TerminateAccountScreen({ navigation }) {
  const [isMatching, setMatching] = useState(false);
  const [showError, setShow] = useState(false);
  const [password, setPassword] = useState("");

  const user = firebase.auth().currentUser;

  // Reauthenticate user, returns a promise
  function reauthenticate(email, password) {
    var cred = firebase.auth.EmailAuthProvider.credential(email, password);
    return user.reauthenticateWithCredential(cred);
  }

  function onPress() {
    if (password != "") {
      // If password is entered, attempt reauthentication
      reauthenticate(user.email, password)
        .then(() => {
          console.log("Reauthentication success");
          if (isMatching) {
            setShow(false);
            navigation.navigate("Account terminated", {
              user: user,
            });
          } else {
            setShow(true);
          }
        })
        .catch((error) => {
          console.log("Unable to reauthenticate");
          Alert.alert("Wrong password, try again?");
        });
    } else {
      Alert.alert("Please enter your password to continue.");
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
        <Image
          source={require("../../assets/AppImages/sadSmile.png")}
          style={styles.sadSmile}
        />

        <Text style={styles.boldText}>
          Are you sure you want to terminate your account?
        </Text>
        <Input
          secureTextEntry={true}
          containerStyle={styles.terminateContainer}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        ></Input>
        <Input
          containerStyle={[styles.terminateContainer, { marginBottom: 20 }]}
          placeholder="Type 'TERMINATE'"
          autoCapitalize="characters"
          onChangeText={(text) => validate(text)}
        ></Input>
        {showError ? (
          <Text style={styles.errorText}>
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
    marginTop: 20,
  },
  sadSmile: {
    alignSelf: "center",
    marginBottom: 20,
    height: 60,
    width: 60,
  },
  errorText: {
    color: colors.red,
    textAlign: "center",
    marginBottom: 10,
  },
});
