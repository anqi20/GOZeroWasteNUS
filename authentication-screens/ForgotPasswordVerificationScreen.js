import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import { globalStyles } from "../assets/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

export default function ForgetPasswordVerificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Formik initialValues={{ code: "" }} onSubmit={(values) => {}}>
        {(props) => (
          <View>
            <Text style={styles.text}>
              Please check your email for the verification code
            </Text>
            <Input
              containerStyle={globalStyles.inputContainerTop}
              label="Your verification code"
              labelStyle={globalStyles.inputLabel}
              placeholder="Verification code"
              inputStyle={globalStyles.inputInput}
              leftIcon={<Ionicons name="shield-checkmark" size={24} />}
              errorMessage="Verification code is incorrect. Please check again."
              errorStyle={globalStyles.inputError}
              onChangeText={props.handleChange("code")}
              value={props.values.code}
            />
            <TouchableOpacity
              style={globalStyles.buttonTop}
              onPress={props.handleSubmit}
              onPress={() =>
                navigation.navigate("Forgot Password Confirmation Screen")
              }
            >
              <Text style={globalStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button}>
              <Text style={globalStyles.buttonText}>
                Resend verification code
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  text: {
    paddingHorizontal: 30,
    textAlign: "center",
    fontSize: 14,
    color: colors.darkGrey,
  },
});
