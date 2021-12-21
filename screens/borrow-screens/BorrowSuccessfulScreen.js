import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, Image, Dimensions } from "react-native";
import SuccessBox from "../../components/SuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";
import { UserContext } from "../../assets/UserContext";
import { uploadBorrowData } from "./BorrowApi";

export default function BorrowSuccessfulScreen({ route, navigation }) {
  const userData = useContext(UserContext);
  const { numCups, numContainers } = route.params;
  const [hasError, setError] = useState(false);
  // console.log(userData.id);
  useEffect(() => {
    uploadBorrowData(userData.id, numCups, numContainers, setError);
  }, []);

  if (hasError) {
    navigation.navigate("Unsuccess Screen");
    return null;
  } else {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/AppImages/borrowHeader.png")}
          style={{ width: Dimensions.get("window").width, marginBottom: 50 }}
        />
        <SuccessBox numCups={numCups} numContainers={numContainers} />
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
