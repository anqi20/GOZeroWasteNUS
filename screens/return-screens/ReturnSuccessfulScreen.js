import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, Image, Dimensions } from "react-native";
import SuccessBox from "../../components/SuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";
import { UserContext } from "../../assets/UserContext";
import { updateCoins, updateReturnData } from "./ReturnApi";
import { useBackHandler } from "@react-native-community/hooks";
import { backActionHandler } from "../BasicApi";

export default function ReturnSuccessfulScreen({ route }) {
  const userData = useContext(UserContext);
  const uid = userData.id;

  const { numCups, numContainers, location } = route.params;
  const [hasError, setError] = useState(false);
  // Can change the value of coins earned accordingly
  const coinsEarned = numCups + numContainers;

  // Prevent back button action on Android
  useBackHandler(backActionHandler);

  useEffect(() => {
    updateCoins(uid, coinsEarned);
    // awardWelcomeGift(); // Only decreases welcomeThreshold when eligible
    updateReturnData(uid, numCups, numContainers, setError);
  }, []);

  if (hasError) {
    navigation.navigate("Return Unsuccess Screen");
    return null;
  } else {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/AppImages/returnHeader.png")}
          style={{ width: Dimensions.get("window").width+4, alignSelf: "center", marginBottom: 50 }}
        />
        <SuccessBox
          numCups={numCups}
          numContainers={numContainers}
          location={location}
          numCoins={coinsEarned}
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
