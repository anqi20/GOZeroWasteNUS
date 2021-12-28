import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import SuccessBox from "../../components/SuccessBox";
import colors from "../../assets/colors";
import { globalStyles } from "../../assets/globalStyles";
import { UserContext } from "../../assets/UserContext";
import { updateCoins, updateReturnData } from "./ReturnApi";
import { useBackHandler } from "@react-native-community/hooks";
import { backActionHandler } from "../BasicApi";
import * as Animatable from "react-native-animatable";

export default function ReturnSuccessfulScreen({ navigation, route }) {
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
          location={location}
          numCoins={coinsEarned}
          header={"Successful!"}
        />
        {/* Footer text */}
        <View
          style={{
            flex: 1,
            marginVertical: 20,
          }}
        >
          <Text style={globalStyles.footerText}>
            Numbers shown are wrong?{" "}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Return Error Screen", {
                  errorType: "Sorry that there seems to be an issue!",
                  location: location,
                })
              }
            >
              <Text style={globalStyles.clickable}>Please click here!</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
