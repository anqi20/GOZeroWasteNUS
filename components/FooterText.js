import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";

export default function FooterText() {
  const navigation = useNavigation();
  const website =
    "https://docs.google.com/document/d/1MLsVsaaVgOEG4SrGs11geIoWn3UDyh1pALTaRbsKMlU/edit?usp=sharing";

  function goToSite() {
    Linking.openURL(`${website}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        If there is any error, please{" "}
        <TouchableOpacity onPress={goToSite}>
          <Text style={styles.clickable}>check our FAQ</Text>
        </TouchableOpacity>{" "}
        or email us at gozerowastenus@gmail.com!
        {/*or call the helpdesk{"\n"}*/}
        {/*@1234 5678!*/}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    color: colors.darkGrey,
    textAlign: "center",
  },
  clickable: {
    fontSize: 18,
    color: colors.darkGrey,
    textDecorationLine: "underline",
  },
});
