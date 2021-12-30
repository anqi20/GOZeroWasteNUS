import React, { useContext } from "react";
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
import FooterText from "../../components/FooterText";
import { UserContext } from "../../assets/UserContext";
import QRCode from "react-native-qrcode-svg";
import moment from "moment";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";

export default function ReturnQRScreen({ navigation }) {
  const userData = useContext(UserContext);
  const uid = userData.id;
  const windowWidth = Dimensions.get("window").width - 50;
  const currTime = moment();
  // const currTime = moment("00:00", "HH:mm"); // Testing
  // Time that people are allowed to return in moment format for comparison
  const legalStartTime = moment("07:00", "HH:mm");
  const legalEndTime = moment("21:00", "HH:mm");
  // console.log(currTime.isBetween(legalStartTime, legalEndTime));

  function renderUserQr() {
    if (currTime.isBetween(legalStartTime, legalEndTime)) {
      // Returning within legal time limits
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("Return Status Screen")}
          style={styles.qrPlaceholder}
        >
          <QRCode value={uid} size={windowWidth - 150} />
        </TouchableOpacity>
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
    // <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: colors.white,
    //     // marginTop: Constants.statusBarHeight,
    //   }}
    // >
    //   <Image
    //     source={require("../../assets/AppImages/returnHeader.png")}
    //     style={{ width: "100%" }}
    //   />

    //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //     <View
    //       style={{
    //         backgroundColor: "coral",
    //         height: 40,
    //         width: "80%",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         borderRadius: 20,
    //       }}
    //     >
    //       <Text>Feature coming soon! Stay tuned {";)"}</Text>
    //     </View>
    //     {/* TEST VALUES */}
    //     {/* <TouchableOpacity
    //       onPress={() =>
    //         navigation.navigate("Return Success Screen", {
    //           numCups: 2,
    //           numContainers: 2,
    //           location: "E4",
    //         })
    //       }
    //     >
    //       <Text>Success Screen</Text>
    //     </TouchableOpacity> */}
    //   </View>
    // </View>
    <View>
      <ScrollView
        style={{ backgroundColor: colors.white }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/AppImages/returnHeader.png")}
            style={{ width: Dimensions.get("window").width }}
          />
          <View style={styles.box}>
            {/*<View style={styles.imagePlaceholder} />*/}
            <Image
              source={require("../../assets/AppImages/returnPicture.png")}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Return Unsuccess Screen")}
              style={{ margin: 10, backgroundColor: "lightgrey" }}
            >
              <Text>(Unsuccessful Screen)</Text>
            </TouchableOpacity>
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
    backgroundColor: colors.lightGrey,
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
