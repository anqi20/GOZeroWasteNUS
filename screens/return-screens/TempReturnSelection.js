import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import moment from "moment";
import { Input } from "react-native-elements";
import SelectionComponent from "../../components/SelectionComponent";
import { getBorrowedNum } from "../borrow-screens/BorrowApi";
import { UserContext } from "../../assets/UserContext";
import { useNavigation } from "@react-navigation/native";
import { useBackHandler } from "@react-native-community/hooks";
import { backActionHandler } from "../BasicApi";
import RNPickerSelect from "react-native-picker-select";
import { useFocusEffect } from "@react-navigation/native";

export default function TempReturnSelection() {
  // Prevent back button action on Android
  useBackHandler(backActionHandler);

  const [numCups, setCupNum] = useState(0);
  const [numContainers, setContainerNum] = useState(0);
  const [borrowedCup, setBorrowedCup] = useState(0);
  const [borrowedContainer, setBorrowedContainer] = useState(0);
  const [location, setLocation] = useState("");
  const [isPressed, setPress] = useState(false);

  const currTime = moment();
  // const currTime = moment("00:00", "HH:mm");

  // Time that people are allowed to return in moment format for comparison
  const legalStartTime = moment("08:00", "HH:mm");
  const legalEndTime = moment("18:30", "HH:mm");
  const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const currDay = moment().format("ddd");

  const userData = useContext(UserContext);
  const uid = userData.id;
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getBorrowedNum(uid, setBorrowedCup, setBorrowedContainer);
      console.log("Updating return screen state");
    }, [])
  );

  function renderNextButton() {
    function changeState() {
      setPress(true);
    }

    if (numContainers == 0 && numCups == 0) {
      return (
        <View style={styles.errorView}>
          <TouchableOpacity
            style={[globalStyles.button, styles.errorButton]}
            onPress={changeState}
          >
            <Text style={[globalStyles.buttonText, styles.errorButtonText]}>
              I declare that I’m returning the above number of reusables
            </Text>
          </TouchableOpacity>
          {isPressed ? (
            <Text style={styles.errorText}>
              Please select at least 1 item to proceed.
            </Text>
          ) : null}
        </View>
      );
    } else if (location == "") {
      return (
        <View style={styles.errorView}>
          <TouchableOpacity
            style={[globalStyles.button, styles.errorButton]}
            onPress={changeState}
          >
            <Text style={[globalStyles.buttonText, styles.errorButtonText]}>
              I declare that I’m returning the above number of reusables
            </Text>
          </TouchableOpacity>
          {isPressed ? (
            <Text style={styles.errorText}>Please select your location.</Text>
          ) : null}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={[
            globalStyles.button,
            {
              width: "90%",
              marginBottom: 10,
              alignSelf: "center",
              backgroundColor: "coral",
              height: 60,
            },
          ]}
          onPress={() =>
            navigation.navigate("Return Claim Success Screen", {
              numCups: numCups,
              numContainers: numContainers,
              location: location,
            })
          }
        >
          <Text
            style={[
              globalStyles.buttonText,
              { textAlign: "center", marginHorizontal: 10, color: "black" },
            ]}
          >
            {" "}
            I declare that I’m returning the above number of reusables
          </Text>
        </TouchableOpacity>
      );
    }
  }

  // Returning within legal time limits and only on weekdays
  if (
    currTime.isBetween(legalStartTime, legalEndTime) &&
    weekday.includes(currDay)
  ) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/AppImages/returnHeader.png")}
          style={{ width: Dimensions.get("window").width + 4 }}
        />
        <View style={styles.box}>
          <View>
            <Text style={[styles.text, { marginBottom: 10 }]}>
              Step 1: Select number of reusables to return.
            </Text>
            <Text style={[styles.text, { marginBottom: 10, marginTop: 0 }]}>
              Step 2: Drop all of them into the bin.
            </Text>
            <Text style={[styles.text, { marginBottom: 0, marginTop: 0 }]}>
              Step 3: Click on the orange button below to confirm.
            </Text>
            <SelectionComponent
              hasContainers={true}
              hasCups={true}
              cupQuota={borrowedCup}
              containerQuota={borrowedContainer}
              numCups={numCups}
              numContainers={numContainers}
              setCupNum={setCupNum}
              setContainerNum={setContainerNum}
            />

            <View style={styles.locationSelection}>
              <Text style={{ fontSize: 18 }}>Location:</Text>
              <View style={{ paddingHorizontal: 20 }}>
                <RNPickerSelect
                  onValueChange={(location) => {
                    setLocation(location);
                    // console.log("Location: ", location);
                  }}
                  value={location}
                  items={locations}
                  placeholder={{
                    label: "Select location",
                    value: "",
                  }}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    ...pickerSelectStyles,
                    placeholder: styles.dropdownPlaceholder,
                  }}
                />
              </View>
            </View>

            {renderNextButton(location)}
          </View>
        </View>
      </ScrollView>
    );
  } else {
    // Returning out of legal time limits
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Image
          source={require("../../assets/AppImages/returnHeader.png")}
          style={{ width: Dimensions.get("window").width + 4 }}
        />
        <View style={styles.box}>
          <Text style={styles.text}>
            To help our cleaners, please return only on weekdays between 8am to
            6.30pm. Thank you!
          </Text>
        </View>
      </View>
    );
  }
}

const locations = [
  { value: "ClaimE4", label: "E4" },
  { value: "ClaimSDE4", label: "SDE4" },
  { value: "ClaimTechnoEdge", label: "TechnoEdge" },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  box: {
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 20,
    width: "90%",
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
    marginBottom: 30,
  },
  icon: {
    marginTop: 20,
    alignSelf: "center",
    height: 60,
    width: 60,
  },
  text: {
    margin: 30,
    fontSize: 18,
    textAlign: "center",
  },
  errorText: {
    color: colors.red,
    marginBottom: 20,
    textAlign: "center",
  },
  errorButton: {
    width: "90%",
    backgroundColor: colors.lightGrey,
    marginBottom: 10,
    height: 60,
  },
  errorView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  errorButtonText: {
    textAlign: "center",
    marginHorizontal: 10,
  },
  locationSelection: {
    flexDirection: "row",
    marginHorizontal: 50,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1.5,
    borderColor: "#aeb3b8",
  },
  dropdownPlaceholder: {
    color: colors.darkGrey,
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: colors.black,
    fontSize: 18,
  },
  inputAndroid: {
    color: colors.black,
    fontSize: 18,
  },
});
