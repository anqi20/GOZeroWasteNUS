import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import { globalStyles } from "../assets/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

export default function ForgotPasswordConfirmationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values) => {}}
      >
        {(props) => (
          <View>
            <Input
              containerStyle={globalStyles.inputContainerTop}
              label="Your new password"
              labelStyle={globalStyles.inputLabel}
              placeholder="New password"
              inputStyle={globalStyles.inputInput}
              leftIcon={<Ionicons name="lock-open" size={24} />}
              errorMessage="Password is invalid. Please check again."
              errorStyle={globalStyles.inputError}
              onChangeText={props.handleChange("password")}
              value={props.values.username}
            />
            <Input
              containerStyle={globalStyles.inputContainer}
              label="Confirm your new password"
              labelStyle={globalStyles.inputLabel}
              placeholder="Confirm new password"
              inputStyle={globalStyles.inputInput}
              leftIcon={<Ionicons name="lock-closed" size={24} />}
              secureTextEntry={true}
              errorMessage="Both passwords do not match . Please check again."
              errorStyle={globalStyles.inputError}
              onChangeText={props.handleChange("confirmPassword")}
              value={props.values.password}
            />

            <TouchableOpacity
              style={globalStyles.buttonTop}
              onPress={props.handleSubmit}
              onPress={() => navigation.navigate("Main Tab Navigator")}
            >
              <Text style={globalStyles.buttonText}>Submit</Text>
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
    backgroundColor: colors.white,
  },
});
