import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import SelectionComponent from "../../components/SelectionComponent";
import FooterText from "../../components/FooterText";
import firebase from "../../database/firebaseDB";
import { setStallDetails, setQuotas, getBorrowedNum } from "./BorrowApi";
import { UserContext } from "../../assets/UserContext";

export default function BorrowSelectionScreen({ navigation, route }) {
  // Stall name from scanning QR code
  const { stall } = route.params;
  const userData = useContext(UserContext);
  const uid = userData.id;

  //Temporary data
  // const cupQuota = 3;
  // const containerQuota = 5;
  // const storeName = data[2].storeName;
  // const hasContainers = data[2].hasContainers;
  // const hasCups = data[2].hasCups;

  const [cupQuota, setCupQuota] = useState(0);
  const [containerQuota, setContainerQuota] = useState(0);
  const [borrowedCup, setBorrowedCup] = useState(0);
  const [borrowedContainer, setBorrowedContainer] = useState(0);
  const [hasContainers, setContainersBoolean] = useState(false);
  const [hasCups, setCupsBoolean] = useState(false);
  const [numCups, setCupNum] = useState(0);
  const [numContainers, setContainerNum] = useState(0);

  // Set up stall details / quotas on intial render
  useEffect(() => {
    setQuotas(setCupQuota, setContainerQuota);
    getBorrowedNum(uid, setBorrowedCup, setBorrowedContainer);
    setStallDetails(stall, setContainersBoolean, setCupsBoolean);
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
              Please borrow at least 1 item to proceed!
            </Text>
          ) : null}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={[globalStyles.button, { width: "90%" }]}
          onPress={() =>
            navigation.navigate("Success Screen", {
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
    <View style={styles.container}>
      <Text style={globalStyles.header}>Borrow</Text>
      <View style={styles.box}>
        <Text style={styles.storeName}>{stall}</Text>
        <Text style={styles.text}>
          Choose the number of {renderText()} you are borrowing
        </Text>
        <SelectionComponent
          hasContainers={hasContainers}
          hasCups={hasCups}
          cupQuota={cupQuota - borrowedCup}
          containerQuota={containerQuota - borrowedContainer}
          numCups={numCups}
          numContainers={numContainers}
          setCupNum={setCupNum}
          setContainerNum={setContainerNum}
        />
        {renderNextButton()}
        {/* <TouchableOpacity
          style={[globalStyles.button, { width: "90%" }]}
          onPress={() =>
            navigation.navigate("Success Screen", {
              numCups: numCups,
              numContainers: numContainers,
            })
          }
        > 
          <Text style={globalStyles.buttonText}>Submit</Text>
        </TouchableOpacity>*/}
      </View>
      <FooterText />
    </View>
  );
}

// Data for testing different interfaces
// const data = [
//   { storeName: "Vegetarian Store", hasContainers: true, hasCups: false },
//   { storeName: "Fruit Juice Store", hasContainers: false, hasCups: true },
//   { storeName: "Hong Kong Store", hasContainers: true, hasCups: true },
// ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
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
