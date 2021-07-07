import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
} from "react-native";
import colors from "../assets/colors";
import { globalStyles } from "../assets/globalStyles";
import moment from "moment";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function GeneralFeedback() {
  return (
    <View>
      <Input
        containerStyle={styles.inputContainer}
        defaultValue={moment().format("DD/MM/YYYY")}
        inputStyle={styles.inputInput}
        editable={false}
      />
      <Input
        containerStyle={styles.inputContainer}
        defaultValue={moment().utcOffset("+08:00").format("h:mm a")}
        inputStyle={styles.inputInput}
        editable={false}
      />
      <Input
        containerStyle={styles.inputContainer}
        placeholder="Feedback"
        inputStyle={styles.inputInput}
        multiline={true}
      />
    </View>
  );
}

function ReportFaultyMachine() {
  let timeWillUpdate = new Date();

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(timeWillUpdate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDateConfirmed, setDateConfirmed] = useState(false);
  const [isTimeConfirmed, setTimeConfirmed] = useState(false);

  // Date picker methods
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setDate(date);
    setDateConfirmed(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  // Time picker methods
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    hideTimePicker();
    setTime(time);
    setTimeConfirmed(true);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  return (
    <View>
      <Input
        containerStyle={styles.inputContainer}
        defaultValue={moment().format("DD/MM/YYYY")}
        inputStyle={styles.inputInput}
        editable={false}
      />
      <Input
        containerStyle={styles.inputContainer}
        defaultValue={moment().utcOffset("+08:00").format("h:mm a")}
        inputStyle={styles.inputInput}
        editable={false}
      />
      <TouchableOpacity style={styles.dateTimePicker} onPress={showDatePicker}>
        {isDateConfirmed ? (
          <Text style={{ fontSize: 18, color: colors.black }}>
            {moment(date).format("DD/MM/YYYY")}
          </Text>
        ) : (
          <Text
            style={{ fontSize: 18, color: colors.darkGrey, paddingRight: 10 }}
          >
            Date of issue encountered
          </Text>
        )}
        <Entypo name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dateTimePicker} onPress={showTimePicker}>
        {isTimeConfirmed ? (
          <Text style={{ fontSize: 18, color: colors.black }}>
            {moment(time).format("hh:mm a")}
          </Text>
        ) : (
          <Text
            style={{ fontSize: 18, color: colors.darkGrey, paddingRight: 10 }}
          >
            Time of issue encountered
          </Text>
        )}
        <Entypo name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        date={date}
        onChange={onDateChange}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        date={time}
        onChange={onTimeChange}
      />

      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={locations}
        placeholder={{
          label: "Location",
          value: null,
        }}
        useNativeAndroidPickerStyle={false}
        style={{
          ...pickerSelectStyles,
          iconContainer: { right: 30 },
          placeholder: { color: colors.darkGrey },
        }}
        Icon={() => {
          return <Entypo name="chevron-down" size={24} color="black" />;
        }}
      />
      <Input
        containerStyle={styles.inputContainer}
        placeholder="Details"
        inputStyle={styles.inputInput}
        multiline={true}
      />
    </View>
  );
}

export default function FeedbackScreen() {
  const [submitted, setStatus] = useState(false);
  const [submissionCount, setCount] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    setCount(0);
    setStatus(false);
  };

  const onConfirmPress = () => {
    setStatus(true);
    setCount(submissionCount + 1);
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{ flex: 1, backgroundColor: colors.white }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.box}>
            <FontAwesome5
              style={styles.icon}
              name="list-alt"
              size={60}
              color="black"
            />

            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.switchText}>Report a faulty machine</Text>
              <Switch
                trackColor={{ false: colors.darkGrey, true: colors.green }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.darkGrey}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            {isEnabled ? <ReportFaultyMachine /> : <GeneralFeedback />}

            <TouchableOpacity
              onPress={onConfirmPress}
              style={[globalStyles.button, { marginBottom: 30 }]}
            >
              <Text style={globalStyles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            {submissionCount > 1 ? (
              <Text
                style={{
                  color: colors.red,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                Your feedback has already been received!
              </Text>
            ) : null}
            {submitted ? (
              <Text style={styles.boldText}>
                Thank you for sending us your valuable feedback!
              </Text>
            ) : (
              <View></View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const locations = [
  { label: "Canteen1", value: "Canteen1" },
  { label: "Canteen2", value: "Canteen2" },
  { label: "Canteen3", value: "Canteen3" },
  { label: "Store1", value: "Store1" },
  { label: "Store2", value: "Store2" },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  box: {
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 20,
    width: "90%",
    height: "80%",
    flexGrow: 1,
    alignSelf: "center",
    margin: 40,
  },
  inputContainer: {
    paddingHorizontal: 30,
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 20,
  },
  icon: {
    margin: 32,
    alignSelf: "center",
  },
  switchText: {
    fontSize: 18,
    marginHorizontal: 30,
    marginBottom: 30,
  },
  dateTimePicker: {
    marginHorizontal: 30,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderColor: colors.darkGrey,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: colors.darkGrey,
    color: colors.black,
    paddingRight: 10,
    marginHorizontal: 30,
    marginBottom: 25,
  },
  inputAndroid: {
    fontSize: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: colors.darkGrey,
    color: colors.black,
    paddingRight: 10,
    marginHorizontal: 30,
    marginBottom: 25,
  },
});
