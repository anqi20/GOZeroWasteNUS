import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements"; 
import { globalStyles } from "../assets/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

export default function SignUpVerificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hi I am the sign up verification screen!</Text>
      <Button
        title="Sign up Detail screen"
        onPress={() => navigation.navigate("Sign Up Detail Screen")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});