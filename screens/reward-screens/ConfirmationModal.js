import React from "react";
import * as yup from "yup";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../../assets/colors";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import { globalStyles } from "../../assets/globalStyles";

export default function ConfirmationModal({ navigation, route }) {
  const { text } = route.params;

  const validationSchema = yup.object().shape({
    vCode: yup
    .string()
    .label("vCode")
    .matches("code", "Please enter the correct code!")
  })

  const checkVCode = () => {
    navigation.navigate("Successful Redemption Screen", {
      text: text,
    })
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ vCode: ""}}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          checkVCode();
        }}
      >
        {({ handleChange, handleSubmit, errors, isValid }) => (

        <View style={[styles.modalContainer, styles.shadow]}>
          <Text style={styles.text}>Are you sure you want to redeem this reward?</Text>

          <Input 
            containerStyle={globalStyles.inputContainerNormal}
            placeholder="VERIFICATION CODE"
            inputStyle={[globalStyles.inputInput, {marginTop: 15}]}
            onChangeText={handleChange("vCode")}
            autoCapitalize="none"
          />

          <Text style={globalStyles.inputError}>{errors.vCode}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.buttonContainer}
              /*onPress={() =>
                navigation.navigate("Successful Redemption Screen", {
                  text: text,
                })
              }*/
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    height: "30%",
    width: "90%",
    backgroundColor: colors.white,
    justifyContent: "center",
    borderColor: colors.black,
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.black,
  },
  shadow: {
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },

    elevation: 50,
  },
});
