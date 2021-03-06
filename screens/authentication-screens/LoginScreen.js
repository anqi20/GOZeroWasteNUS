import React, { useState, useEffect, useContext } from "react";
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
import colors from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../assets/AuthContext";
import FooterText from "../../components/FooterText";

export default function LoginScreen({ navigation, route }) {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label("Email")
      .email()
      .required("Please enter your email"),
    password: yup
      .string()
      .label("Password")
      .required("Please enter your password"),
  });

  // ---------------- AUTHENTICATION ---------------------------
  const { logIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loginUser = () => {
    logIn({ email, password, setErrorMsg });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              loginUser();
              // console.log(values);
            }}
          >
            {({ setFieldValue, handleSubmit, errors, isValid }) => (
              <View>
                <Input
                  containerStyle={globalStyles.inputContainerTop}
                  label="Email"
                  labelStyle={globalStyles.inputLabel}
                  placeholder="abc@gmail.com"
                  inputStyle={globalStyles.inputInput}
                  leftIcon={<Ionicons name="mail" size={24} />}
                  onChangeText={(value) => {
                    setErrorMsg("");
                    setFieldValue("email", value);
                    setEmail(value);
                  }}
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
                  onChangeText={(value) => {
                    setErrorMsg("");
                    setFieldValue("password", value);
                    setPassword(value);
                  }}
                />

                <Text style={globalStyles.inputError}>{errors.password}</Text>

                <TouchableOpacity
                  style={styles.forgotPwdWrapper}
                  onPress={() => navigation.navigate("Forgot Password Stack")}
                >
                  <Text style={styles.forgotPwd}>Forgot your password?</Text>
                </TouchableOpacity>

                {errorMsg === "" ? null : (
                  <Text style={styles.loginError}>{errorMsg}</Text>
                )}

                <TouchableOpacity
                  style={[globalStyles.buttonTop, { marginTop: 50 }]}
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
          <FooterText />
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
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
  loginError: {
    color: colors.red,
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 90,
  },
});
