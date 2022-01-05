import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import { UserContext } from "../../assets/UserContext";
import QRCode from "react-native-qrcode-svg";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../../database/firebaseDB";
// import { getLocationChangeFromMachine } from "./ReturnApi";

export default function ReturnQRScreen({ navigation }) {
  const userData = useContext(UserContext);
  const [location, setLocation] = useState("");
  const [locationStatus, setLocationStatus] = useState(false);
  const uid = userData.id;
  const windowWidth = Dimensions.get("window").width - 50;
  const currTime = moment();
  // const currTime = moment("00:00", "HH:mm"); // Testing
  // Time that people are allowed to return in moment format for comparison
  const legalStartTime = moment("07:00", "HH:mm");
  const legalEndTime = moment("21:00", "HH:mm");
  // console.log(currTime.isBetween(legalStartTime, legalEndTime));

  // getLocationChangeFromMachine(uid, setLocationStatus, setLocation);

  // Runs when document field location changes
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((doc) => {
        let userLocation = doc.data().location;
        console.log("Current location of user: ", userLocation);
        if (
          userLocation == "SDE4" ||
          userLocation == "TechnoEdge" ||
          userLocation == "E4"
        ) {
          setLocationStatus(true);
          setLocation(userLocation);
        } else {
          // console.log("I'm here");
        }
      });
    return () => {
      unsubscribe();
    };
  }, []);

  // Runs only when locationStatus changes
  useEffect(() => {
    if (locationStatus) {
      const userRef = firebase.firestore().collection("users").doc(uid);
      userRef.update({
        location: "returning",
      });
      setLocationStatus(false);
      navigation.navigate("Temp Return Selection Screen", {
        location: location,
      });
    }
  }, [locationStatus]);

  function renderUserQr() {
    if (currTime.isBetween(legalStartTime, legalEndTime)) {
      // Returning within legal time limits
      return (
        // <TouchableOpacity
        //   onPress={() => navigation.navigate("Return Status Screen")}
        //   onPress={() =>
        //     navigation.navigate("Temp Return Selection Screen", {
        //       location: "",
        //     })
        //   }
        //   style={styles.qrPlaceholder}
        // >
        <QRCode value={uid} size={windowWidth - 150} />
        // </TouchableOpacity>
      );
    } else {
      // Returning out of legal time limits
      return (
        <View style={styles.qrPlaceholder}>
          <Text style={styles.text}>
            Please try again tomorrow from {"\n"} 07:00 to 21:00!
          </Text>
        </View>
      );
    }
  }

  return (
    <View>
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
            <Image
              source={require("../../assets/AppImages/returnPicture.png")}
            />

            {/* <TouchableOpacity
              onPress={() => navigation.navigate("Return Unsuccess Screen")}
              style={{ margin: 10, backgroundColor: "lightgrey" }}
            >
              <Text>(Unsuccessful Screen)</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("Return Status Screen")}
              style={{ margin: 10, backgroundColor: "lightgrey" }}
            >
              <Text>(Status Screen)</Text>
            </TouchableOpacity> */}
            <Text style={styles.text}>Flash the QR code!</Text>
            {renderUserQr()}
          </View>

          {/* Footer text */}
          <View
            style={{
              flex: 1,
              marginVertical: 20,
            }}
          >
            <Text style={globalStyles.footerText}>
              QR code not scanning?{" "}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Return Error Screen", {
                    errorType: "Sorry that the QR code isn't working!",
                    location: "",
                  })
                }
              >
                <Text style={globalStyles.clickable}>Please click here!</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "grey",
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 40,
  },
  box: {
    width: "100%",
    // backgroundColor: "yellow",
    // height: "80%",
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    alignSelf: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  qrPlaceholder: {
    backgroundColor: colors.white,
    width: "70%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholder: {
    backgroundColor: colors.lightGrey,
    width: "70%",
    height: "30%",
  },
});
