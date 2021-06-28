import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements"; 
import { globalStyles } from "../assets/globalStyles";
import colors from "../assets/colors";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{username:"", password: ""}}
      >
        {(props) => (
          <View>
            <Input 
              containerStyle={globalStyles.inputContainer}
              label="Your NUS email address"
              labelStyle={globalStyles.inputLabel}
              placeholder="username@u.nus.edu"
              inputStyle={globalStyles.inputInput}
              leftIcon={
                <Ionicons name="mail" size="24"/>
              }
              errorMessage="Username is invalid. Please check again."
              errorStyle={globalStyles.inputError}
            />
            <Input 
              containerStyle={globalStyles.inputContainer}
              label="Password"
              labelStyle={globalStyles.inputLabel}
              placeholder="Password"
              inputStyle={globalStyles.inputInput}
              leftIcon={
                <Ionicons name="lock-closed" size="24"/>
              }
              secureTextEntry={true}
              errorMessage="Password is invalid. Please check again."
              errorStyle={globalStyles.inputError}
            />
            <TouchableOpacity
              style={styles.forgotPwdWrapper}
              onPress={() => navigation.navigate("Forgot your password?")}
            >
              <Text style={styles.forgotPwd}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => navigation.navigate("Main Tab Navigator")}
            >
              <Text style={globalStyles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpWrapper}
              onPress={() => navigation.navigate("Sign Up Stack")}
            >
              <Text style={styles.signUp}>Don't have an account?{'\n'}Sign up here</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  forgotPwdWrapper: {
    marginRight: 30,
    alignItems: "flex-end",
  },
  forgotPwd: {
    color: colors.darkGrey,
    marginBottom: 90,
  }, 
  signUpWrapper: {
    marginHorizontal: 100,
    marginTop: 15,
  }, 
  signUp: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
