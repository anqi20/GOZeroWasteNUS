import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";
import { Icon } from "react-native-elements";
import { UserContext } from "../../assets/UserContext";
import { getBorrowedNum } from "./ReturnApi";

export default function ReturnStatusScreen({ navigation }) {
  const userData = useContext(UserContext);
  const uid = userData.id;

  // Location currently hardcoded, to be changed when linked up with machine
  const machineName = data[2].machineName;
  const [borrowedCup, setBorrowedCup] = useState(0);
  const [borrowedContainer, setBorrowedContainer] = useState(0);

  useEffect(() => {
    getBorrowedNum(uid, setBorrowedCup, setBorrowedContainer);
    console.log("Setting up current user's borrowed items number");
  }, []);

  // const numContainers = data[2].numContainers;
  // const numCups = data[2].numCups;

  //Can change the initial state count to test if the interface works
  const [returnedContainers, setContainerCount] = useState(1);
  const [returnedCups, setCupCount] = useState(1);

  function renderText() {
    if (borrowedContainer > 0 && borrowedCup > 0) {
      return <Text style={styles.text}>containers/cups</Text>;
    } else if (borrowedContainer > 0) {
      return <Text style={styles.text}>containers</Text>;
    } else if (borrowedCup > 0) {
      return <Text style={styles.text}>cups</Text>;
    }
  }

  function ContainerCounter() {
    function Cube() {
      return (
        <Image
          source={require("../../assets/AppImages/container.png")}
          style={{ marginLeft: 10 }}
        />
      );
    }
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <Text style={styles.boldText}>
          {/* {returnedContainers}{" "} */}
          {borrowedContainer - returnedContainers}{" "}
          <Text style={[styles.text, { fontWeight: "normal" }]}>
            {" "}
            remaining
          </Text>
        </Text>
        <Cube />
      </View>
    );
  }

  function CupCounter() {
    function Cup() {
      return (
        <Image
          source={require("../../assets/AppImages/cup.png")}
          style={{ marginLeft: 10 }}
        />
      );
    }

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <Text style={styles.boldText}>
          {/* {returnedCups}{" "} */}
          {borrowedCup - returnedCups}{" "}
          <Text style={[styles.text, { fontWeight: "normal" }]}>remaining</Text>
        </Text>
        <Cup />
      </View>
    );
  }

  function renderContent() {
    if (borrowedContainer > 0 && borrowedCup > 0) {
      return (
        <View>
          <ContainerCounter />
          <CupCounter />
        </View>
      );
    } else if (borrowedContainer > 0) {
      return <ContainerCounter />;
    } else if (borrowedCup > 0) {
      return <CupCounter />;
    }
  }

  function renderNextButton() {
    const [isPressed, setPress] = useState(false);

    function changeState() {
      setPress(true);
    }

    if (returnedContainers == 0 && returnedCups == 0) {
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
              Please return at least 1 item to proceed. {"\n"} If your returns
              are not updated, please appeal through the feedback link!
            </Text>
          ) : null}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={[globalStyles.button, { width: "90%" }]}
          onPress={() =>
            navigation.navigate("Return Success Screen", {
              numCups: returnedCups,
              numContainers: returnedContainers,
              location: machineName,
            })
          }
        >
          <Text style={globalStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={require("../../assets/AppImages/returnHeader.png")} />

      {/* <Text style={globalStyles.header}>Return</Text> */}
      <View style={styles.box}>
        <Text style={styles.machineName}>{machineName}</Text>
        <Text style={styles.text}>
          Drop the {renderText()} in the holes that are flashing green now!
        </Text>

        {renderContent()}
        <View
          style={{
            margin: 15,
            backgroundColor: "rgba(237, 51, 26, 0.4)",
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text style={styles.text}>- Please do not stack the reusables. </Text>
          <Text style={styles.text}>
            - Please return the lid and reusable together.
          </Text>
        </View>
        {renderNextButton()}
      </View>
      <View style={{ marginHorizontal: 40 }}>
        <FooterText />
      </View>
    </ScrollView>
  );
}

// Data for testing different interfaces
const data = [
  { machineName: "TechnoEdge Canteen", numContainers: 2, numCups: 0 },
  { machineName: "E4", numContainers: 0, numCups: 3 },
  { machineName: "SDE4", numContainers: 3, numCups: 4 },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  box: {
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginHorizontal: 40,
  },
  machineName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  boldText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  greyedText: {
    fontSize: 18,
    color: colors.lightGrey,
  },
});
