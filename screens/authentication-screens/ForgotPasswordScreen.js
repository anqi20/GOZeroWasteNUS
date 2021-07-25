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
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";

export default function ForgotPasswordScreen({ navigation }) {

  const validationSchema = yup.object().shape({
    email: yup.string()
      .label('Email')
      .matches(/e[0-9][0-9][0-9][0-9][0-9][0-9][0-9](@u.nus.edu)/, 'Please enter a valid NUS email')
      .required('Please enter your email')
      .length(18, 'Please enter a valid NUS email')
  })

  return (
    <KeyboardAvoidingView 
      behavior="position"
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Formik 
        initialValues={{ email: "" }} 
        validationSchema = {validationSchema}
        onSubmit={(values) => {
          navigation.navigate("Forgot Password Verification Screen")
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
              <Text style={globalStyles.buttonText}>
                Send verification code
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
    paddingTop: 20,
  },
  text: {
    paddingHorizontal: 30,
    textAlign: "center",
    fontSize: 14,
    color: colors.darkGrey,
  },
});
