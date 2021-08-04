import React, { useState } from "react";
import * as yup from "yup";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import { globalStyles } from "../../assets/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";

export default function SignUpScreen({ navigation }) {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label("Email")
      .matches(
        /e[0-9][0-9][0-9][0-9][0-9][0-9][0-9](@u.nus.edu)/,
        "Please enter a valid NUS email"
      )
      .required("Please enter your email")
      .length(18, "Please enter a valid NUS email"),
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // console.log(values);
              navigation.navigate("Sign Up Verification Screen", {
                email: values.email,
              });
            }}
          >
            {({ handleChange, handleSubmit, errors, isValid }) => (
              <View>
                <Input
                  containerStyle={globalStyles.inputContainerTop}
                  label="NUS email"
                  labelStyle={globalStyles.inputLabel}
                  placeholder="e1234567@u.nus.edu"
                  inputStyle={globalStyles.inputInput}
                  leftIcon={<Ionicons name="mail" size={24} />}
                  onChangeText={handleChange("email")}
                  autoCapitalize="none"
                />

                <Text style={globalStyles.inputError}>{errors.email}</Text>

                <TouchableOpacity
                  style={globalStyles.buttonTop}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text style={globalStyles.buttonText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.logInWrapper}
                  onPress={() => navigation.navigate("Log In Screen")}
                >
                  <Text style={styles.logIn}>
                    Have an account?{"\n"}Log in here
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  text: {
    paddingHorizontal: 30,
    textAlign: "center",
    fontSize: 14,
    color: colors.darkGrey,
  },
  logInWrapper: {
    marginHorizontal: 100,
    marginTop: 15,
  },
  logIn: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
