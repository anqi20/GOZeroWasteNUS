import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import { globalStyles } from "../../assets/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Formik initialValues={{ username: "" }} onSubmit={(values) => {}}>
        {(props) => (
          <View>
            <Text style={styles.text}>
              Please submit your registered NUS email.{"\n"}Verification code
              will be sent to your email shortly
            </Text>
            <Input
              containerStyle={globalStyles.inputContainerTop}
              label="Your NUS email address"
              labelStyle={globalStyles.inputLabel}
              placeholder="username@u.nus.edu"
              inputStyle={globalStyles.inputInput}
              leftIcon={<Ionicons name="mail" size={24} />}
              errorMessage="Username is invalid. Please check again."
              errorStyle={globalStyles.inputError}
              onChangeText={props.handleChange("username")}
              value={props.values.username}
            />
            <TouchableOpacity
              style={globalStyles.buttonTop}
              onPress={props.handleSubmit}
              onPress={() =>
                navigation.navigate("Forgot Password Verification Screen")
              }
            >
              <Text style={globalStyles.buttonText}>
                Send verification code
              </Text>
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
    paddingTop: 20,
  },
  text: {
    paddingHorizontal: 30,
    textAlign: "center",
    fontSize: 14,
    color: colors.darkGrey,
  },
});
