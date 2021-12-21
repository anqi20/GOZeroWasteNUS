import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, ScrollView, Image, Dimensions } from "react-native";
import SuccessBox from "../../components/SuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";
import { uploadByoData, updateCoins } from "./BYOApi";
import { UserContext } from "../../assets/UserContext";

export default function BYOSuccessScreen({ route }) {
  const { numCups, numContainers } = route.params;
  const userData = useContext(UserContext);
  const uid = userData.id;
  const [hasError, setError] = useState(false);

  // Can change the value of coins earned accordingly
  const coinsEarned = numCups + numContainers;

  useEffect(() => {
    uploadByoData(uid, numCups, numContainers, setError);
    updateCoins(uid, coinsEarned);
  }, []);

  if (hasError) {
    navigation.navigate("BYO Unsuccessful Screen");
    return null;
  } else {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/AppImages/byoHeader.png")}
          style={{ width: Dimensions.get("window").width, marginBottom: 50 }}
        />
        <SuccessBox
          numCups={numCups}
          numContainers={numContainers}
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
