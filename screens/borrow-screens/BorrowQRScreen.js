import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";

export default function BorrowQRScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.header}>Borrow</Text>
      <View style={styles.box}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Unsuccess Screen")}
          style={styles.imagePlaceholder}
        >
          <Text>(Unsuccessful Screen)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Quota Exceeded")}
          style={styles.imagePlaceholder}
        >
          <Text>(Quota exceeded screen)</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Scan the QR code!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Selection Screen")}
          style={styles.qrPlaceholder}
        >
          <Text>(Click here)</Text>
        </TouchableOpacity>
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
  },
  imagePlaceholder: {
    backgroundColor: colors.lightGrey,
    width: "70%",
    height: 50,
    marginBottom: 10,
  },
});
