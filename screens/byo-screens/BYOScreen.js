import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
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
const pkg = Constants.manifest.releaseChannel
  ? Constants.manifest.android.package
  : "host.exp.exponent";

export default function BYOScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate("Selection Screen", { store: data });
    setScanned(false);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

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
        <TouchableOpacity
          style={[globalStyles.button, , { width: "80%" }]}
          onPress={() => {
            if (Platform.OS === "ios") {
              Linking.openURL("app-settings:");
            } else {
              IntentLauncher.startActivityAsync(
                IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
                { data: "package:" + pkg }
              );
            }
          }}
        >
          <Text style={globalStyles.buttonText}>Go to settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={globalStyles.header}>I have my own</Text>
      <View style={styles.box}>
        <TouchableOpacity
          onPress={() => navigation.navigate("BYO Unsuccessful Screen")}
          style={styles.imagePlaceholder}
        >
          <Text>(Unsuccessful Screen)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("BYO Selection Screen")}
          style={styles.imagePlaceholder}
        >
          <Text>(Selection screen)</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Scan the QR code!</Text>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.qr}
        />
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
