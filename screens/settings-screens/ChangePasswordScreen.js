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
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";

export default function ChangePasswordScreen({ navigation }) {
  const [submitted, setStatus] = useState(false);
  const [submissionCount, setCount] = useState(0);

  const validationSchema = yup.object().shape({
    oldPassword: yup.string()
      .label('oldPassword')
      .required('Please enter your old password'),
    newPassword: yup.string()
      .label('newPassword')
      .required('Please enter your new password')
      .min(8, 'Password must have at least 8 characters')
      .matches(/[0-9]/, 'Password must contain at least a digit')
      .matches(/[A-Z]/, 'Password must contain at least a capital letter')
      .matches(/[a-z]/, 'Password must contain at least a small letter')
      .matches(/[^(0-9,A-Z,a-z)]/, 'Password must contain a special character'),
    confirmPassword: yup.string()
      .label('confirmPassword')
      .required('Please confirm your new password')
      .oneOf([yup.ref('newPassword'), null], 'Both passwords do not match. Please check again.')
  })

  return (
    <KeyboardAvoidingView
      behavior="position"
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{backgroundColor: colors.white}}>
    <View style={styles.container}>
      <Formik
        initialValues={{ 
          oldPassword: "",
          newPassword: "", 
          confirmPassword: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setStatus(true);
          setCount(submissionCount + 1);
        }}
      >
        {({ handleChange, handleSubmit, errors, isValid }) => (
          <View>
            <Input
              containerStyle={globalStyles.inputContainerTop}
              label="Your old password"
              labelStyle={globalStyles.inputLabel}
              placeholder="Old password"
              inputStyle={globalStyles.inputInput}
              leftIcon={<Ionicons name="lock-open" size={24} />}
              onChangeText={handleChange("oldPassword")}
              secureTextEntry={true}
            />
            <Text style={globalStyles.inputError}>{errors.oldPassword}</Text>

            <Input
              containerStyle={globalStyles.inputContainer}
              label="Your new password"
              labelStyle={globalStyles.inputLabel}
              placeholder="New password"
              inputStyle={globalStyles.inputInput}
              leftIcon={<Ionicons name="lock-open" size={24} />}
              onChangeText={handleChange("newPassword")}
              secureTextEntry={true}
            />
            <Text style={globalStyles.inputError}>{errors.newPassword}</Text>

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
              disabled={!isValid}
            >
              <Text style={globalStyles.buttonText}>Update</Text>
            </TouchableOpacity>

            {submissionCount > 1 ? (
              <Text
                style={{
                  color: colors.red,
                  textAlign: "center",
                  marginVertical: 10,
                }}
              >
                Your password has already been updated!
              </Text>
            ) : (<View></View>)}

            {submitted ? (
              <Text style={styles.boldText}>
                Your password has been updated!
              </Text>
            ) : (<View></View>)}

          </View>
        )}
      </Formik>
    </View>
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 600,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.black,
    marginTop: 32,
    marginBottom: 32,
    marginHorizontal: 20,
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 20,
    marginTop: 10,
  },
});
