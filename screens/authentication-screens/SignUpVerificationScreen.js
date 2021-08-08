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
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import { globalStyles } from "../../assets/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";

export default function SignUpVerificationScreen({ navigation }) {
  const validationSchema = yup.object().shape({
    code: yup
      .string()
      .label("code")
      .length(6, "Please enter a valid verification code")
      .required("Please enter your verification code"),
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{ code: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              navigation.navigate("Sign Up Success");
            }}
          >
            {({ handleChange, handleSubmit, errors, isValid }) => (
              <View>
                <Text style={styles.text}>
                  Enter the verification code sent to your email.
                </Text>
                <Input
                  containerStyle={globalStyles.inputContainerTop}
                  label="Your verification code"
                  labelStyle={globalStyles.inputLabel}
                  placeholder="Verification code"
                  inputStyle={globalStyles.inputInput}
                  leftIcon={<Ionicons name="shield-checkmark" size={24} />}
                  onChangeText={handleChange("code")}
                  secureTextEntry={true}
                />

                <Text style={globalStyles.inputError}>{errors.code}</Text>

                <TouchableOpacity
                  style={globalStyles.buttonTop}
                  onPress={handleSubmit}
                  disabled={!isValid}
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
        </ScrollView>
      </TouchableWithoutFeedback>
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
