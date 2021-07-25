import React, { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";

export default function ForgotPasswordConfirmationScreen({ navigation }) {
  const [submitted, setStatus] = useState(false);

  const validationSchema = yup.object().shape({
    password: yup.string()
      .label('Password')
      .required('Please enter your new password')
      .min(8, 'Password must have at least 8 characters')
      .matches(/[0-9]/, 'Password must contain at least a digit')
      .matches(/[A-Z]/, 'Password must contain at least a capital letter')
      .matches(/[a-z]/, 'Password must contain at least a small letter')
      .matches(/[^(0-9,A-Z,a-z)]/, 'Password must contain a special character'),
    confirmPassword: yup.string()
      .label('confirmPassword')
      .oneOf([yup.ref('password'), null], 'Both passwords do not match. Please check again.')
  })

  return (
    <KeyboardAvoidingView 
      behavior="position"
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema = {validationSchema}
        onSubmit={(values) => {
          setStatus(true)
          navigation.navigate("Main Tab Navigator")
        }}
      >
        {({ handleChange, handleSubmit, errors, isValid }) => (
          <View>
            <Input
              containerStyle={globalStyles.inputContainerTop}
              label="Your new password"
              labelStyle={globalStyles.inputLabel}
              placeholder="New password"
              inputStyle={globalStyles.inputInput}
              leftIcon={<Ionicons name="lock-open" size={24} />}
              onChangeText={handleChange("password")}
              secureTextEntry={true}
            />
            <Text style={globalStyles.inputError}>{errors.password}</Text>
            <Input
              containerStyle={globalStyles.inputContainer}
              label="Confirm your new password"
              labelStyle={globalStyles.inputLabel}
              placeholder="Confirm new password"
              inputStyle={globalStyles.inputInput}
              leftIcon={<Ionicons name="lock-closed" size={24} />}
              onChangeText={handleChange("confirmPassword")}
              secureTextEntry={true}
            />
            <Text style={globalStyles.inputError}>{errors.confirmPassword}</Text>

            <TouchableOpacity
              style={globalStyles.buttonTop}
              onPress={handleSubmit}
            >
              <Text style={globalStyles.buttonText}>Submit</Text>
            </TouchableOpacity>

            {submitted ? (
              <Text style={styles.boldText}>
                Your password has been updated!
              </Text>
            ):(
              <View></View>
            )}

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
  boldText: {
    fontSize: 18, 
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 30,
    marginVertical: 20,
  }
});
