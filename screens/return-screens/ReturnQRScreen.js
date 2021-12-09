import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";
import { UserContext } from "../../assets/UserContext";
import QRCode from "react-native-qrcode-svg";
import moment from "moment";

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
    <View style={styles.container}>
      <Text style={globalStyles.header}>Return</Text>
      <View style={styles.box}>
        {/*<View style={styles.imagePlaceholder} />*/}
        <TouchableOpacity
          onPress={() => navigation.navigate("Return Unsuccess Screen")}
          style={styles.imagePlaceholder}
        >
          <Text>(Unsuccessful Screen)</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Flash the QR code!</Text>
        {renderUserQr()}
      </View>
      <FooterText />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  box: {
    width: "100%",
    height: "80%",
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
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
  },
  imagePlaceholder: {
    backgroundColor: colors.lightGrey,
    width: "70%",
    height: "30%",
  },
});
