import React from "react";
import * as yup from "yup";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback,
  Keyboard, 
  ScrollView
} from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import { globalStyles } from "../../assets/globalStyles";
import colors from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {

  const validationSchema = yup.object().shape({
    email: yup.string()
      .label('Email')
      .matches(/e[0-9][0-9][0-9][0-9][0-9][0-9][0-9](@u.nus.edu)/, 'Please enter a valid NUS email')
      .required('Please enter your email')
      .length(18, 'Please enter a valid NUS email'),
    password: yup.string()
      .label('Password')
      .required('Please enter your password')
      .min(8, 'Password must have at least 8 characters')
  })

  return (
    <KeyboardAvoidingView 
      behavior="position"
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema = {validationSchema}
        onSubmit={(values) => {
          //console.log(values)
          navigation.navigate("Main Tab Navigator")
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

            <Input
              containerStyle={globalStyles.inputContainer}
              label="Password"
              labelStyle={globalStyles.inputLabel}
              placeholder="Password"
              inputStyle={globalStyles.inputInput}
              leftIcon={<Ionicons name="lock-closed" size={24} />}
              secureTextEntry={true}
              onChangeText={handleChange("password")}
            />

            <Text style={globalStyles.inputError}>{errors.password}</Text>

            <TouchableOpacity
              style={styles.forgotPwdWrapper}
              onPress={() => navigation.navigate("Forgot Password Stack")}
            >
              <Text style={styles.forgotPwd}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.buttonTop}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={globalStyles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpWrapper}
              onPress={() => navigation.navigate("Sign Up Stack")}
            >
              <Text style={styles.signUp}>
                Don't have an account?{"\n"}Sign up here
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
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
