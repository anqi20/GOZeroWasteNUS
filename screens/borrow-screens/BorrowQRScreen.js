import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions,
} from "react-native";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";
import { BarCodeScanner } from "expo-barcode-scanner";
import Constants from "expo-constants";
import * as IntentLauncher from "expo-intent-launcher";

/*
If we are using expo application, our package name will be host.exp.exponent. 
If we are using the published version of our application (standalone build)
 then we get the package name we defined in the app.json file.
*/
// const pkg = Constants.manifest.releaseChannel
//   ? Constants.manifest.android.package
//   : "host.exp.exponent";

export default function BorrowQRScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // console.log(typeof data);
    setScanned(true);
    navigation.navigate("Selection Screen", { stallid: data });
    setScanned(false);
  };

  function renderSettingsButton() {
    if (Platform.OS == "ios") {
      return (
        <TouchableOpacity
          style={[globalStyles.button, , { width: "80%" }]}
          onPress={() => {
            Linking.openURL("app-settings:");
          }}
        >
          <Text style={globalStyles.buttonText}>Go to settings</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 32, textAlign: "center" }}>
          Requesting for camera permission.
        </Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 32, textAlign: "center", marginBottom: 30 }}>
          Please allow camera access to use the borrow function.
        </Text>
        {renderSettingsButton()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/AppImages/borrowHeader.png")}
        style={{ width: Dimensions.get("window").width }}
      />
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.box}>
          {/* <TouchableOpacity
          onPress={() => navigation.navigate("QR Generator")}
          style={styles.imagePlaceholder}
        >
          <Text>(QR generator)</Text>
        </TouchableOpacity> */}
          {/* <TouchableOpacity
          onPress={() => navigation.navigate("Unsuccess Screen")}
          style={styles.imagePlaceholder}
        >
          <Text>(Unsuccessful Screen)</Text>
        </TouchableOpacity> */}
          {/* <TouchableOpacity
          onPress={() => navigation.navigate("Quota Exceeded")}
          style={styles.imagePlaceholder}
        >
          <Text>(Quota exceeded screen)</Text>
        </TouchableOpacity> */}
          {/* <TouchableOpacity
          onPress={() => navigation.navigate("Selection Screen")}
          style={styles.imagePlaceholder}
        >
          <Text>(Selection screen)</Text>
        </TouchableOpacity> */}

          <Text style={styles.text}>Scan the QR code!</Text>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.qr}
          />
        </View>
        <FooterText />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 40,
    marginTop: Constants.statusBarHeight,
  },
  box: {
    width: "100%",
    // height: "80%",
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
  qr: {
    backgroundColor: colors.lightGrey,
    width: "70%",
    aspectRatio: 1,
  },
  imagePlaceholder: {
    backgroundColor: colors.lightGrey,
    width: "70%",
    height: 20,
    marginBottom: 10,
  },
});
