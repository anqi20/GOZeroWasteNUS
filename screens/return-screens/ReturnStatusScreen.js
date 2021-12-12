import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";
import { Icon } from "react-native-elements";
//import { UserContext } from "../../assets/UserContext";

export default function ReturnStatusScreen({ navigation }) {
  const machineName = data[1].machineName;
  const numContainers = data[1].numContainers;
  const numCups = data[1].numCups;

  //Get user data from database
  //const userData = useContext(UserContext);
  //const numContainers = userData.containerDate.length;
  //const numCups = userData.cupDate.length;

  //Can change the initial state count to test if the interface works
  const [returnedContainers, setContainerCount] = useState(1);
  const [returnedCups, setCupCount] = useState(0);

  function renderText() {
    if (numContainers > 0 && numCups > 0) {
      return <Text style={styles.text}>containers/cups</Text>;
    } else if (numContainers > 0) {
      return <Text style={styles.text}>containers</Text>;
    } else if (numCups > 0) {
      return <Text style={styles.text}>cups</Text>;
    }
  }

  function ContainerCounter() {
    function Cube() {
      return (
        <Icon
          name="cube"
          type="font-awesome"
          size={60}
          color="black"
          containerStyle={{ marginLeft: 20 }}
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
          {numContainers}{" "}
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
        <Icon
          name="cup"
          type="material-community"
          size={60}
          color="black"
          containerStyle={{ marginLeft: 20 }}
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
          {numCups}{" "}
          <Text style={[styles.text, { fontWeight: "normal" }]}>remaining</Text>
        </Text>
        <Cup />
      </View>
    );
  }

  function renderContent() {
    if (numContainers > 0 && numCups > 0) {
      return (
        <View>
          <ContainerCounter />
          <CupCounter />
        </View>
      );
    } else if (numContainers > 0) {
      return <ContainerCounter />;
    } else if (numCups > 0) {
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
            <Text style={{ color: colors.red, marginTop: 20 }}>
              Please return at least 1 item to proceed.
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
      <Text style={globalStyles.header}>Return</Text>
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
  { machineName: "Vegetarian Store", numContainers: 2, numCups: 0 },
  { machineName: "Fruit Juice Store", numContainers: 0, numCups: 3 },
  { machineName: "Hong Kong Store", numContainers: 3, numCups: 4 },
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
