import React, { useState, useEffect, useContext } from "react";
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
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "../../assets/colors";
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Icon } from "react-native-elements";
import { useHeaderHeight } from "@react-navigation/stack";
import firebase from "../../database/firebaseDB";
import { AuthContext } from "../../assets/AuthContext";

export default function SignUpDetailScreen({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDateConfirmed, setDateConfirmed] = useState(false);

  const headerHeight = useHeaderHeight();

  //Date picker methods
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .label("firstName")
      .required("Please enter your first name"),
    lastName: yup
      .string()
      .label("lastName")
      .required("Please enter your last name"),
    gender: yup.string().label("gender").required("Please choose your gender"),
    dOB: yup.string().label("dOB").required("Please choose your date of birth"),
    faculty: yup
      .string()
      .label("faculty")
      .required("Please choose your faculty"),
    password: yup
      .string()
      .label("Password")
      .required("Please enter your new password")
      .min(8, "Password must have at least 8 characters")
      .matches(
        /[0-9]|[^0-9,A-Z,a-z]/,
        "Password must contain at least a number."
      ),
    confirmPassword: yup
      .string()
      .label("confirmPassword")
      .required("Please confirm your new password")
      .oneOf(
        [yup.ref("password"), null],
        "Both passwords do not match. Please check again."
      ),
  });

  // ---------------- AUTHENTICATION & DATA STORE ---------------------------
  const { signUp } = useContext(AuthContext);

  const [enteredEmail, setEmail] = useState(" ");
  const [enteredPassword, setPassword] = useState(" ");
  const [enteredFN, setFN] = useState(" ");
  const [enteredLN, setLN] = useState(" ");
  const [enteredGender, setGender] = useState(" ");
  const [enteredDOB, setDOB] = useState(" ");
  const [enteredFaculty, setFaculty] = useState(" ");
  const [errorMsg, setErrorMsg] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit == true && errorMsg == "") {
      navigation.navigate("Sign Up Verification Screen");
    }
    setSubmit(false);
  }, [submit]);

  function createUser() {
    const email = enteredEmail;
    const password = enteredPassword;
    const firstName = enteredFN;
    const lastName = enteredLN;
    const gender = enteredGender;
    const dateOfBirth = enteredDOB;
    const faculty = enteredFaculty;
    signUp({
      email,
      password,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      faculty,
      setErrorMsg,
      setSubmit,
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
      keyboardVerticalOffset={headerHeight + 70}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "white" }}
        >
          <Formik
            initialValues={{
              email: " ",
              firstName: " ",
              lastName: " ",
              gender: " ",
              dOB: " ",
              faculty: " ",
              password: " ",
              confirmPassword: " ",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // console.log(values);
              // setEnteredData(values);
              createUser();
            }}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              errors,
              isValid,
            }) => (
              <View>
                <Input
                  containerStyle={globalStyles.inputContainerTop}
                  placeholder="Email (Non-NUS)"
                  // defaultValue={email}
                  inputStyle={globalStyles.inputInput}
                  leftIcon={<Ionicons name="mail" size={24} />}
                  autoCapitalize="none"
                  onChangeText={(value) => {
                    setErrorMsg("");
                    setEmail(value);
                    setFieldValue("email", value);
                  }}
                  // editable={false}
                />
                <Text style={globalStyles.inputError}>{errors.email}</Text>

                <Input
                  containerStyle={globalStyles.inputContainerNormal}
                  placeholder="First Name"
                  inputStyle={globalStyles.inputInput}
                  leftIcon={<FontAwesome5 name="user-alt" size={24} />}
                  onChangeText={(value) => {
                    setFN(value);
                    setFieldValue("firstName", value);
                  }}
                  // onChangeText={handleChange("firstName")}
                />
                <Text style={globalStyles.inputError}>{errors.firstName}</Text>

                <Input
                  containerStyle={globalStyles.inputContainerNormal}
                  placeholder="Last Name (Family Name)"
                  inputStyle={globalStyles.inputInput}
                  leftIcon={<FontAwesome5 name="user-alt" size={24} />}
                  onChangeText={(value) => {
                    setLN(value);
                    setFieldValue("lastName", value);
                  }}
                  // onChangeText={handleChange("lastName")}
                />
                <Text style={globalStyles.inputError}>{errors.lastName}</Text>

                <RNPickerSelect
                  onValueChange={(value) => {
                    setGender(value);
                    setFieldValue("gender", value);
                  }}
                  items={gender}
                  placeholder={{
                    label: "Gender",
                    value: null,
                  }}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: { left: 30 },
                    placeholder: styles.dropdownPlaceholder,
                  }}
                  Icon={() => {
                    return (
                      <MaterialCommunityIcons
                        name="gender-male-female"
                        size={24}
                      />
                    );
                  }}
                />
                <Text style={globalStyles.inputError}>{errors.gender}</Text>

                {/*Date of Birth*/}
                {/*<TouchableOpacity
                  style={styles.dOBContainer}
                  onPress={showDatePicker}
                >
                  <Icon
                    name="calendar"
                    type="material-community"
                    size={24}
                    color="black"
                  />
                  {isDateConfirmed ? (
                    <Text style={styles.dOBText}>
                      {moment(date).format("DD/MM/YYYY")}
                    </Text>
                  ) : (
                    <Text style={styles.dOBPlaceholderText}>Date of Birth</Text>
                  )}
                </TouchableOpacity>
                <View style={styles.dOBLine} />

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={(date) => {
                    hideDatePicker();
                    setDate(date);
                    setFieldValue("dOB", moment(date).format("DD/MM/YYYY"));
                    setDateConfirmed(true);
                    setDOB(moment(date).format("DD/MM/YYYY"));
                  }}
                  onCancel={hideDatePicker}
                  date={date}
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setDate(currentDate);
                    setFieldValue(
                      "incidentDate",
                      moment(selectedDate).format("DD/MM/YYYY")
                    );
                  }}
                />
                <Text style={globalStyles.inputError}>{errors.dOB}</Text> */}

                <RNPickerSelect
                  onValueChange={(value) => {
                    setFaculty(value);
                    setFieldValue("faculty", value);
                  }}
                  items={faculty}
                  placeholder={{
                    label: "Faculty",
                    value: "",
                  }}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: { left: 30 },
                    placeholder: styles.dropdownPlaceholder,
                  }}
                  Icon={() => {
                    return <FontAwesome5 name="school" size={18} />;
                  }}
                />
                <Text style={globalStyles.inputError}>{errors.faculty}</Text>

                <Input
                  containerStyle={globalStyles.inputContainerNormal}
                  placeholder="Set your password"
                  inputStyle={globalStyles.inputInput}
                  leftIcon={<Ionicons name="lock-open" size={24} />}
                  onChangeText={handleChange("password")}
                  secureTextEntry={true}
                />
                <Text style={globalStyles.inputError}>{errors.password}</Text>

                <Input
                  containerStyle={globalStyles.inputContainerNormal}
                  placeholder="Confirm your password"
                  inputStyle={globalStyles.inputInput}
                  leftIcon={<Ionicons name="lock-closed" size={24} />}
                  onChangeText={(value) => {
                    setErrorMsg("");
                    setPassword(value);
                    setFieldValue("confirmPassword", value);
                  }}
                  secureTextEntry={true}
                />
                <Text style={globalStyles.inputError}>
                  {errors.confirmPassword}
                </Text>

                {errorMsg === "" ? null : (
                  <Text style={styles.signupError}>{errorMsg}</Text>
                )}

                <TouchableOpacity
                  style={[
                    globalStyles.buttonTop,
                    { marginTop: 20, marginBottom: 50 },
                  ]}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text style={globalStyles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const gender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "preferNotToSay", label: "Prefer not to say" },
];

const faculty = [
  { value: "FASS", label: "Faculty of Arts & Social Sciences" },
  { value: "FoD", label: "Faculty of Dentistry" },
  { value: "FoE", label: "Faculty of Engineering" },
  { value: "FoL", label: "Faculty of Law" },
  { value: "FoM", label: "Faculty of Medicine" },
  { value: "FoS", label: "Faculty of Science" },
  { value: "NBS", label: "NUS Business School" },
  { value: "SoC", label: "School of Computing" },
  { value: "SDE", label: "School of Design & Environment" },
  { value: "SoPH", label: "SSH School of Public Health" },
  { value: "SoPP", label: "LKY School of Public Policy" },
  { value: "Yale", label: "Yale-NUS" },
  { value: "YST", label: "Yong Siew Toh Conservatory of Music" },
  { value: "Staff", label: "Staff" },
  { value: "Others", label: "Others" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    paddingHorizontal: 30,
    textAlign: "center",
    fontSize: 14,
    color: colors.darkGrey,
  },
  dropdownPlaceholder: {
    color: colors.darkGrey,
    paddingLeft: 30,
    fontSize: 15,
  },
  dOBContainer: {
    marginTop: -5,
    marginHorizontal: 30,
    flexDirection: "row",
  },
  dOBPlaceholderText: {
    marginLeft: 5,
    color: colors.darkGrey,
  },
  dOBText: {
    marginLeft: 5,
    color: colors.black,
  },
  dOBLine: {
    height: 1.5,
    marginHorizontal: 30,
    backgroundColor: "#aeb3b8",
    marginTop: 8,
    marginBottom: 23,
  },
  signupError: {
    color: colors.red,
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 30,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingBottom: 12,
    borderBottomWidth: 1.5,
    borderColor: "#aeb3b8",
    color: colors.black,
    paddingLeft: 30,
    marginHorizontal: 30,
    marginBottom: 25,
  },
  inputAndroid: {
    fontSize: 15,
    paddingBottom: 12,
    borderBottomWidth: 1.5,
    borderColor: "#aeb3b8",
    color: colors.black,
    paddingLeft: 30,
    marginHorizontal: 30,
    marginBottom: 25,
  },
});
