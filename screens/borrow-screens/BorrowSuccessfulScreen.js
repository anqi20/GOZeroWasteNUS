import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";
import SuccessBox from "../../components/SuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import FooterText from "../../components/FooterText";
import { UserContext } from "../../assets/UserContext";
import { uploadBorrowData, addBorrowToLogs } from "./BorrowApi";
import { useBackHandler } from "@react-native-community/hooks";
import { backActionHandler } from "../BasicApi";
import * as Animatable from "react-native-animatable";

export default function BorrowSuccessfulScreen({ route, navigation }) {
  const userData = useContext(UserContext);
  const { numCups, numContainers, stall } = route.params;
  const [hasError, setError] = useState(false);

  // Prevent back button action on Android
  useBackHandler(backActionHandler);

  // console.log(userData.id);
  useEffect(() => {
    uploadBorrowData(userData.id, numCups, numContainers, setError);
    addBorrowToLogs(userData.id, numCups, numContainers, stall);
  }, []);

  if (hasError) {
    navigation.navigate("Unsuccess Screen");
    return null;
  } else {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/AppImages/borrowHeader.png")}
          style={{ width: Dimensions.get("window").width, marginBottom: 10 }}
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
          location={stall}
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
