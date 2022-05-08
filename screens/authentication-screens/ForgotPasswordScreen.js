import React, { useContext, useState } from "react";
import * as yup from "yup";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import { globalStyles } from "../../assets/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import { AuthContext } from "../../assets/AuthContext";

export default function ForgotPasswordScreen({ navigation }) {
  const { forgotPassword } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showEmailError, setEmailError] = useState(false);
  const [submit, setSubmit] = useState(false);

  // useEffect(() => {
  //   if (submit == true && errorMsg == "") {

  //   }
  //   setSubmit(false);
  // }, [submit]);

  // Ensure button can only be pressed every 10 seconds
  function handleButtonClicked() {
    forgotPassword({ email, setStatusMsg, setErrorMsg, setSubmit });
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 10000);
  }

  function validateEmail(email) {
    const blockEmails = ["@u.nus.edu", "@nus.edu.sg", "@u.yale-nus.edu.sg", "@u.duke.nus.edu", "@partner.nus.edu.sg"]

    if(blockEmails.some(v => email.includes(v))) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label("Email")
      .email()
      .required("Please enter your email"),
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleButtonClicked}
            isSubmitting={!showEmailError}
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
                    setFieldValue("email", value);
                    setEmail(value);
                    validateEmail(value);
                  }}
                  autoCapitalize="none"
                />

                <Text style={globalStyles.inputError}>{errors.email}</Text>
                {showEmailError ? (
                  <Text style={globalStyles.inputError}>
                    Please use your personal email.
                  </Text>
                ) : null}

                <TouchableOpacity
                  style={globalStyles.buttonTop}
                  onPress={handleSubmit}
                  disabled={disabled}
                >
                  <Text style={globalStyles.buttonText}>
                    Send password reset email
                  </Text>
                </TouchableOpacity>
                {statusMsg == "" ? null : (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Log In Screen")}
                      style={[globalStyles.buttonTop, { marginTop: 30 }]}
                    >
                      <Text style={globalStyles.buttonText}>
                        Return to login screen
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.statusMsg}>{statusMsg}</Text>
                  </View>
                )}
                {errorMsg == "" ? null : (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Log In Screen")}
                      style={[globalStyles.buttonTop, { marginTop: 30 }]}
                    >
                      <Text style={globalStyles.buttonText}>
                        Return to login screen
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.errorMsg}>{errorMsg}</Text>
                  </View>
                )}
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
  statusMsg: {
    color: colors.black,
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 60,
    fontSize: 18,
  },
  errorMsg: {
    color: colors.black,
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 90,
  },
});
