import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRGenerator() {
  const windowWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <QRCode value="Hong Kong Store" size={windowWidth - 50} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
