import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../assets/globalStyles";
import colors from "../assets/colors";
import FooterText from "../components/FooterText";
import { Icon } from "react-native-elements";

export default function ReturnStatusScreen({ navigation }) {
  const storeName = data[2].storeName;
  const numContainers = data[2].numContainers;
  const numCups = data[2].numCups;

  //Can change the initial state count to test if the interface works
  const [returnedContainers, setContainerCount] = useState(0);
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
          {returnedContainers}{" "}
          <Text style={styles.greyedText}>out of {numContainers}</Text>
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
          {returnedCups} <Text style={styles.greyedText}>out of {numCups}</Text>
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

  return (
    <View style={styles.container}>
      <Text style={globalStyles.header}>Return</Text>
      <View style={styles.box}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.text}>
          Drop the {renderText()} in the holes that are flashing green now!
        </Text>

        {renderContent()}

        <TouchableOpacity
          style={[globalStyles.button, { width: "90%" }]}
          onPress={() =>
            navigation.navigate("Return Success Screen", {
              numCups: returnedCups,
              numContainers: returnedContainers,
              location: storeName,
            })
          }
        >
          <Text style={globalStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <FooterText />
    </View>
  );
}

// Data for testing different interfaces
const data = [
  { storeName: "Vegetarian Store", numContainers: 2, numCups: 0 },
  { storeName: "Fruit Juice Store", numContainers: 0, numCups: 3 },
  { storeName: "Hong Kong Store", numContainers: 3, numCups: 4 },
];

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
  boldText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  greyedText: {
    fontSize: 18,
    color: colors.lightGrey,
  },
});