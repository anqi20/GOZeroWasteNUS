import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import { globalStyles } from "../../assets/globalStyles";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../../assets/colors";

export default function EditAccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username: "",
          firstName: "",
          lastName: "",
          gender: "",
          dOB: "",
          faculty: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {}}
      >
        {(props) => (
          <View>
            <Input
              containerStyle={globalStyles.inputContainerTop}
              placeholder="NUS email"
              inputStyle={globalStyles.inputInput}
              leftIcon={<Ionicons name="mail" size={24} />}
              onChangeText={props.handleChange("username")}
              value={props.values.username}
            />
            <Input
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="First Name (Family Name)"
              inputStyle={globalStyles.inputInput}
              leftIcon={<FontAwesome5 name="user-alt" size={24} />}
              onChangeText={props.handleChange("firstName")}
              value={props.values.firstName}
            />
            <Input
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="Last Name"
              inputStyle={globalStyles.inputInput}
              leftIcon={<FontAwesome5 name="user-alt" size={24} />}
              onChangeText={props.handleChange("lastName")}
              value={props.values.lastName}
            />
            <Input
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="Gender"
              inputStyle={globalStyles.inputInput}
              leftIcon={
                <MaterialCommunityIcons name="gender-male-female" size={24} />
              }
              onChangeText={props.handleChange("gender")}
              value={props.values.gender}
            />
            <Input
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="Date of Birth"
              inputStyle={globalStyles.inputInput}
              leftIcon={<MaterialIcons name="date-range" size={24} />}
              onChangeText={props.handleChange("dOB")}
              value={props.values.dOB}
            />
            <Input
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="Faculty"
              inputStyle={globalStyles.inputInput}
              leftIcon={<FontAwesome5 name="school" size={18} />}
              onChangeText={props.handleChange("faculty")}
              value={props.values.faculty}
            />
            <TouchableOpacity
              style={globalStyles.buttonTop}
              onPress={props.handleSubmit}
              onPress={() => navigation.navigate("Change password")}
            >
              <Text style={globalStyles.buttonText}>Change password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={props.handleSubmit}
            >
              <Text style={globalStyles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 600,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.black,
    marginVertical: 32,
    marginHorizontal: 20,
  },
});
