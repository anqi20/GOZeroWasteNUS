import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";
import SuccessBox from "../../components/SuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";
import { uploadByoData, updateCoins, addByoToLogs } from "./BYOApi";
import { UserContext } from "../../assets/UserContext";
import { useBackHandler } from "@react-native-community/hooks";
import { backActionHandler } from "../BasicApi";
import * as Animatable from "react-native-animatable";

export default function BYOSuccessScreen({ route }) {
  const { numCups, numContainers, stall } = route.params;
  const userData = useContext(UserContext);
  const uid = userData.id;
  const [hasError, setError] = useState(false);

  // Can change the value of coins earned accordingly
  const coinsEarned = numCups + numContainers;

  // Prevent back button action on Android
  useBackHandler(backActionHandler);

  useEffect(() => {
    uploadByoData(uid, numCups, numContainers, setError);
    updateCoins(uid, coinsEarned);
    addByoToLogs(uid, numCups, numContainers, stall);
  }, []);

  if (hasError) {
    navigation.navigate("BYO Unsuccessful Screen");
    return null;
  } else {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/AppImages/byoHeader.png")}
          style={{ width: Dimensions.get("window").width+4, marginBottom: 50 }}
        />
        <View style={{ alignSelf: "center" }}>
          <Animatable.Image
            animation="bounce"
            iterationCount="infinite"
            style={{ height: 70, width: 70, marginBottom: 10 }}
            source={require("../../assets/AppImages/celebration.png")}
          />
        </View>
        <SuccessBox
          numCups={numCups}
          numContainers={numContainers}
          numCoins={coinsEarned}
          header={"Successful!"}
        />
        <FooterText />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
