import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import SelectionComponent from "../../components/SelectionComponent";
import FooterText from "../../components/FooterText";
import firebase from "../../database/firebaseDB";
import { setStallDetails, setQuotas } from "./BorrowApi";
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
  const [hasContainers, setContainersBoolean] = useState(false);
  const [hasCups, setCupsBoolean] = useState(false);
  const [numCups, setCupNum] = useState(0);
  const [numContainers, setContainerNum] = useState(0);

  // Set up stall details on intial render
  useEffect(() => {
    setQuotas(uid, cupQuota, containerQuota, setCupQuota, setContainerQuota);
    setStallDetails(stall, setContainersBoolean, setCupsBoolean);
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
          cupQuota={cupQuota}
          containerQuota={containerQuota}
          numCups={numCups}
          numContainers={numContainers}
          setCupNum={setCupNum}
          setContainerNum={setContainerNum}
        />
        <TouchableOpacity
          style={[globalStyles.button, { width: "90%" }]}
          onPress={() =>
            navigation.navigate("Success Screen", {
              numCups: numCups,
              numContainers: numContainers,
            })
          }
        >
          <Text style={globalStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
