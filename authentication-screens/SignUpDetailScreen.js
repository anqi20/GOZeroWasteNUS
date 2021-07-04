import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements"; 
import { globalStyles } from "../assets/globalStyles";
import { Ionicons, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors";

export default function SignUpDetailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username:"", 
          firstName:"", 
          lastName:"", 
          gender: "", 
          dOB:"", 
          faculty:"", 
          password:"", 
          confirmPassword:"",
        }}
        onSubmit={(values) => {

        }}
      >

        {(props) => (
          <View>
            <Input 
              containerStyle={globalStyles.inputContainerTop}
              placeholder="NUS email"
              inputStyle={globalStyles.inputInput}
              leftIcon={
                <Ionicons name="mail" size={24}/>
              }
              onChangeText={props.handleChange("username")}
              value={props.values.username}
            />
            <Input 
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="First Name (Family Name)"
              inputStyle={globalStyles.inputInput}
              leftIcon={
                <FontAwesome5 name="user-alt" size={24}/>
              }
              onChangeText={props.handleChange("firstName")}
              value={props.values.firstName}
            />
            <Input 
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="Last Name"
              inputStyle={globalStyles.inputInput}
              leftIcon={
                <FontAwesome5 name="user-alt" size={24}/>
              }
              onChangeText={props.handleChange("lastName")}
              value={props.values.lastName}
            />
            <Input 
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="Gender"
              inputStyle={globalStyles.inputInput}
              leftIcon={
                <MaterialCommunityIcons name="gender-male-female" size={24}/>
              }
              onChangeText={props.handleChange("gender")}
              value={props.values.gender}
            />
            <Input 
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="Date of Birth"
              inputStyle={globalStyles.inputInput}
              leftIcon={
                <MaterialIcons name="date-range" size={24}/>
              }
              onChangeText={props.handleChange("dOB")}
              value={props.values.dOB}
            />
            <Input 
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="Faculty"
              inputStyle={globalStyles.inputInput}
              leftIcon={
                <FontAwesome5 name="school" size={18}/>
              }
              onChangeText={props.handleChange("faculty")}
              value={props.values.faculty}
            />
            <Input 
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="Set your password"
              inputStyle={globalStyles.inputInput}
              leftIcon={
                <Ionicons name="lock-open" size={24}/>
              }
              onChangeText={props.handleChange("password")}
              value={props.values.password}
            />
            <Input 
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="Confirm your password"
              inputStyle={globalStyles.inputInput}
              leftIcon={
                <Ionicons name="lock-closed" size={24}/>
              }
              errorMessage="Both passwords do not match. Please check again."
              errorStyle={globalStyles.inputError}
              onChangeText={props.handleChange("confirmPassword")}
              value={props.values.confirmPassword}
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
  )
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
  genderButton: {
    color: "#ff0000",
  },
});