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
import { clearReturnLocation } from "./ReturnApi";

function ReturnClaim({ location }) {
  const [numCups, setCupNum] = useState(0);
  const [numContainers, setContainerNum] = useState(0);
  const [borrowedCup, setBorrowedCup] = useState(0);
  const [borrowedContainer, setBorrowedContainer] = useState(0);

  // console.log(location);

  const userData = useContext(UserContext);
  const uid = userData.id;
  const navigation = useNavigation();

  useEffect(() => {
    getBorrowedNum(uid, setBorrowedCup, setBorrowedContainer);
    console.log("Setting up current user's borrowed items number");
  }, []);

  function renderNextButton() {
    const [isPressed, setPress] = useState(false);

    function changeState() {
      setPress(true);
    }

    if (numContainers == 0 && numCups == 0) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={[
              globalStyles.button,
              {
                width: "90%",
                backgroundColor: colors.lightGrey,
                marginBottom: 10,
                height: 60,
              },
            ]}
            onPress={changeState}
          >
            <Text style={[globalStyles.buttonText, { textAlign: "center" }]}>
              I declare that I’m returning the above number of reusables
            </Text>
          </TouchableOpacity>
          {isPressed ? (
            <Text
              style={{
                color: colors.red,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Please select at least 1 item to proceed.
            </Text>
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
              height: 60,
              backgroundColor: "coral",
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
              { textAlign: "center", color: "black" },
            ]}
          >
            I declare that I’m returning the above number of reusables
          </Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <View>
      <Text style={[styles.text, { marginBottom: 10 }]}>
        Step 1: Select number of reusables to return!
      </Text>
      <Text style={[styles.text, { marginBottom: 10, marginTop: 0 }]}>
        Step 2: Drop all of them into the bin.
      </Text>
      <Text style={[styles.text, { marginBottom: 0, marginTop: 0 }]}>
        Step 3: Click on the orange button below to confirm!
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
      {renderNextButton()}
      <TouchableOpacity
        onPress={() => {
          clearReturnLocation(uid);
          navigation.popToTop();
        }}
        style={[
          globalStyles.button,
          { width: "90%", alignSelf: "center", marginBottom: 30 },
        ]}
      >
        <Text style={globalStyles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function TempReturnSelection({ navigation, route }) {
  const { location } = route.params;
  // console.log(location);

  // Prevent back button action on Android
  useBackHandler(backActionHandler);

  return (
    <ScrollView
      style={{ backgroundColor: colors.white }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/AppImages/returnHeader.png")}
          style={{ width: Dimensions.get("window").width + 4 }}
        />
        <View style={styles.box}>
          <ReturnClaim location={location} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
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
});
