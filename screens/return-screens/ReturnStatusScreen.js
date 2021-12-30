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
import { useBackHandler } from "@react-native-community/hooks";
import { backActionHandler } from "../BasicApi";
import * as Animatable from "react-native-animatable";

export default function ReturnStatusScreen({ navigation }) {
  const userData = useContext(UserContext);
  const uid = userData.id;

  // Location currently hardcoded, to be changed when linked up with machine
  const machineName = data[2].machineName;
  const [borrowedCup, setBorrowedCup] = useState(0);
  const [borrowedContainer, setBorrowedContainer] = useState(0);

  // Prevent back button action on Android
  useBackHandler(backActionHandler);

  useEffect(() => {
    getBorrowedNum(uid, setBorrowedCup, setBorrowedContainer);
    console.log("Setting up current user's borrowed items number");
  }, []);

  // const numContainers = data[2].numContainers;
  // const numCups = data[2].numCups;

  // Can change the initial state count to test if the interface works
  const [returnedContainers, setContainerCount] = useState(0);
  const [returnedCups, setCupCount] = useState(0);
  const [animateCup, setAnimateCup] = useState(false);
  const [animateContainer, setAnimateContainer] = useState(false);

  // Monitors returnedContainers and returnedCups so icons animate on state change
  useEffect(() => {
    if (returnedCups) {
      setAnimateContainer(false);
      setAnimateCup(true);
      console.log("returned cups count changed");
    }
  }, [returnedCups]);

  useEffect(() => {
    if (returnedContainers) {
      setAnimateCup(false);
      setAnimateContainer(true);
      console.log("returned containers count changed");
    }
  }, [returnedContainers]);

  function renderText() {
    if (borrowedContainer > 0 && borrowedCup > 0) {
      return <Text style={styles.text}>containers/cups</Text>;
    } else if (borrowedContainer > 0) {
      return <Text style={styles.text}>containers</Text>;
    } else if (borrowedCup > 0) {
      return <Text style={styles.text}>cups</Text>;
    }
  }

  // To test how changes in number causes the number to bounce
  function TestButton() {
    return null;
    // return (
    //   <View>
    //     <TouchableOpacity onPress={() => setCupCount(returnedCups + 1)}>
    //       <Text>Increment Cup</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       onPress={() => setContainerCount(returnedContainers + 1)}
    //     >
    //       <Text>Increment Container</Text>
    //     </TouchableOpacity>
    //   </View>
    // );
  }

  function AnimatedIcon({ isCup }) {
    if (isCup) {
      if (animateCup) {
        return (
          <Animatable.Image
            animation="bounce"
            style={{ marginLeft: 10 }}
            source={require("../../assets/AppImages/cup.png")}
          />
        );
      } else {
        return (
          <Image
            source={require("../../assets/AppImages/cup.png")}
            style={{ marginLeft: 10 }}
          />
        );
      }
    } else {
      if (animateContainer) {
        return (
          <Animatable.Image
            animation="bounce"
            style={{ marginLeft: 10 }}
            source={require("../../assets/AppImages/container.png")}
          />
        );
      } else {
        return (
          <Image
            source={require("../../assets/AppImages/container.png")}
            style={{ marginLeft: 10 }}
          />
        );
      }
    }
  }

  function ContainerCounter() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <Text style={styles.boldText}>
          {borrowedContainer - returnedContainers}{" "}
          <Text style={[styles.text, { fontWeight: "normal" }]}>
            {" "}
            remaining
          </Text>
        </Text>
        <AnimatedIcon isCup={false} />
      </View>
    );
  }

  function CupCounter() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <Text style={styles.boldText}>
          {borrowedCup - returnedCups}{" "}
          <Text style={[styles.text, { fontWeight: "normal" }]}>remaining</Text>
        </Text>
        <AnimatedIcon isCup={true} />
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

      <View style={styles.box}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Drop the {renderText()} in the respective holes now!
        </Text>
        <Text style={styles.text}>The numbers will update accordingly</Text>
        {renderContent()}
        <TestButton />
        <View
          style={{
            margin: 15,
            backgroundColor: "rgba(237, 51, 26, 0.4)",
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text style={styles.text}>- Please drop one reusable at a time.</Text>
          <Text style={styles.text}>- Cover the reusable with its lid.</Text>
          <Text style={styles.text}>- Empty any remnants in the dustbin</Text>
        </View>
        {renderNextButton()}
        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          style={[globalStyles.button, { width: "90%" }]}
        >
          <Text style={globalStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 40 }}>
        {/* Footer text */}
        <View
          style={{
            flex: 1,
            marginVertical: 20,
          }}
        >
          <Text style={globalStyles.footerText}>
            Numbers not updating?{" "}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Return Error Screen", {
                  errorType: "Sorry that there seems to be an issue!",
                  location: machineName,
                })
              }
            >
              <Text style={globalStyles.clickable}>Please click here!</Text>
            </TouchableOpacity>
          </Text>
        </View>
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
