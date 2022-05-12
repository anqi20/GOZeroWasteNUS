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

export default function EditAccountScreen({ navigation }) {
  const [submitted, setStatus] = useState(false);
  const [submissionCount, setCount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDateConfirmed, setDateConfirmed] = useState(false);

  //Date picker methods
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  }

  const validationSchema = yup.object().shape({
    firstName: yup.string()
      .label('firstName')
      .required('Please enter your first name'),
    lastName: yup.string()
      .label('lastName')
      .required('Please enter your last name'),
    gender: yup.string()
      .label('gender')
      .required('Please choose your gender'),
    dOB: yup.string()
      .label('dOB')
      .required('Please choose your date of birth'),
    faculty: yup.string()
      .label('faculty')
      .required('Please choose your faculty')
  })

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{color: colors.red}}
    > 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{backgroundColor: colors.white}}>
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          gender: "",
          dOB: "",
          faculty: "",
        }}
        validationSchema = {validationSchema}
        onSubmit={(values) => {
          setStatus(true);
          setCount(submissionCount + 1);
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, errors, isValid }) => (
          <View>
            <Input
              containerStyle={globalStyles.inputContainerTop}
              placeholder="abc@gmail.com"
              inputStyle={globalStyles.inputInput}
              leftIcon={<Ionicons name="mail" size={24} />}
              autoCapitalize="none"
              editable={false}
            />
            <Input
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="First Name (Family Name)"
              inputStyle={globalStyles.inputInput}
              leftIcon={<FontAwesome5 name="user-alt" size={24} />}
              onChangeText={handleChange("firstName")}
            />
            <Text style={globalStyles.inputError}>{errors.firstName}</Text>

            <Input
              containerStyle={globalStyles.inputContainerNormal}
              placeholder="Last Name"
              inputStyle={globalStyles.inputInput}
              leftIcon={<FontAwesome5 name="user-alt" size={24} />}
              onChangeText={handleChange("lastName")}
            />
            <Text style={globalStyles.inputError}>{errors.lastName}</Text>

            <RNPickerSelect 
              onValueChange={(value) => setFieldValue("gender", value)}
              items={gender}
              placeholder={{
                label: "Gender", 
                value: null,
              }}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles, 
                iconContainer:{ left: 30 }, 
                placeholder: styles.dropdownPlaceholder,
              }}
              Icon={() => {
                return <MaterialCommunityIcons name="gender-male-female" size={24}/>
              }}
            />
            <Text style={globalStyles.inputError}>{errors.gender}</Text>

            {/*Date of Birth*/}
            <TouchableOpacity
              style={styles.dOBContainer}
              onPress={showDatePicker}
            >
              <Icon name="calendar" type="material-community" size={24} color="black" />
              {isDateConfirmed ? (
                <Text style={styles.dOBText}>{moment(date).format("DD/MM/YYYY")}</Text>
              ): (
                <Text style={styles.dOBPlaceholderText}>Date of Birth</Text>
              )}
            </TouchableOpacity>
            <View 
              style={styles.dOBLine}
            />
            
            <DateTimePickerModal 
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                hideDatePicker();
                setDate(date);
                setFieldValue("dOB", moment(date).format("DD/MM/YYYY"));
                setDateConfirmed(true);
              }}
              onCancel={hideDatePicker}
              date={date}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date; 
                setDate(currentDate);
                setFieldValue(
                  "incidentDate",
                  moment(selectedDate).format("DD/MM/YYYY")
                )
              }}
            />
            <Text style={globalStyles.inputError}>{errors.dOB}</Text>
            
            <RNPickerSelect 
              onValueChange={(value) => setFieldValue("faculty", value)}
              items={faculty}
              placeholder={{
                label: "Faculty", 
                value: "",
              }}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles, 
                iconContainer:{ left: 30 }, 
                placeholder: styles.dropdownPlaceholder,
              }}
              Icon={() => {
                return <FontAwesome5 name="school" size={18}/>
              }}
            />
            <Text style={globalStyles.inputError}>{errors.faculty}</Text>

            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => navigation.navigate("Change password")}
            >
              <Text style={globalStyles.buttonText}>Change password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.button}
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
                Your details have already been updated!
              </Text>
            ) : (<View></View>)}

            {submitted ? (
              <Text style={styles.boldText}>
                Your details have been updated!
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

const gender = [
  { value: "male", label: "Male" }, 
  { value: "female", label: "Female" }, 
  { value: "preferNotToSay", label: "Prefer not to say"}
]

const faculty = [
  { value: "FASS", label: "Faculty of Arts & Social Sciences"}, 
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
]

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
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 20,
    marginTop: 10,
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
