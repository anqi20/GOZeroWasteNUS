import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import SelectionComponent from "../../components/SelectionComponent";
import FooterText from "../../components/FooterText";
import Constants from "expo-constants";
import { setStallDetails, setQuotas } from "../borrow-screens/BorrowApi";

export default function BYOSelectionScreen({ navigation, route }) {
  //Based on this store name, grab data from firebase
  const { stallid } = route.params;

  //Temporary data
  // const cupQuota = 3;
  // const containerQuota = 5;
  // const storeName = data[2].storeName;
  // const hasContainers = data[2].hasContainers;
  // const hasCups = data[2].hasCups;
  // const [numCups, setCupNum] = useState(0);
  // const [numContainers, setContainerNum] = useState(0);

  const [cupQuota, setCupQuota] = useState(0);
  const [containerQuota, setContainerQuota] = useState(0);
  const [hasContainers, setContainersBoolean] = useState(false);
  const [hasCups, setCupsBoolean] = useState(false);
  const [stall, setStallName] = useState(null);
  const [numCups, setCupNum] = useState(0);
  const [numContainers, setContainerNum] = useState(0);

  useEffect(() => {
    setQuotas(setCupQuota, setContainerQuota);
    setStallDetails(
      stallid,
      setContainersBoolean,
      setCupsBoolean,
      setStallName
    );
    console.log("Setting up stall and quota details");
  }, []);

  function renderText() {
    if (hasContainers && hasCups) {
      return <Text style={styles.text}>containers/cups</Text>;
    } else if (hasContainers) {
      return <Text style={styles.text}>containers</Text>;
    } else if (hasCups) {
      return <Text style={styles.text}>cups</Text>;
    }
  }

  function renderNextButton() {
    const [isPressed, setPress] = useState(false);

    function changeState() {
      setPress(true);
    }

    if (numCups == 0 && numContainers == 0) {
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
              { width: "90%", backgroundColor: colors.lightGrey },
            ]}
            onPress={changeState}
          >
            <Text style={globalStyles.buttonText}>Next</Text>
          </TouchableOpacity>
          {isPressed ? (
            <Text
              style={{ color: colors.red, marginTop: 20, textAlign: "center" }}
            >
              Please select at least 1 item to proceed!
            </Text>
          ) : null}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={[globalStyles.button, { width: "90%" }]}
          onPress={() =>
            navigation.navigate("BYO Success Screen", {
              numCups: numCups,
              numContainers: numContainers,
            })
          }
        >
          <Text style={globalStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: colors.white }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/AppImages/byoHeader.png")}
            style={{ width: Dimensions.get("window").width, marginBottom: 50 }}
          />

          <View style={styles.box}>
            <Text style={styles.storeName}>{stall}</Text>
            <Text style={styles.text}>
              Choose the number of {renderText()} you are borrowing
            </Text>
            <SelectionComponent
              hasContainers={hasContainers}
              hasCups={hasCups}
              cupQuota={cupQuota}
              containerQuota={containerQuota}
              numCups={numCups}
              numContainers={numContainers}
              setCupNum={setCupNum}
              setContainerNum={setContainerNum}
            />
            {renderNextButton()}
          </View>
          <FooterText />
        </View>
      </ScrollView>
    </View>
  );
}

// Data for testing different interfaces
const data = [
  { storeName: "Vegetarian Store", hasContainers: true, hasCups: false },
  { storeName: "Fruit Juice Store", hasContainers: false, hasCups: true },
  { storeName: "Hong Kong Store", hasContainers: true, hasCups: true },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  box: {
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});
