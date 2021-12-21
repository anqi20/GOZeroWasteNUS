import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import colors from "../assets/colors";

const data = [
  {
    image: require("../assets/AppImages/onboardImage1.png"),
    title: "Why Borrow ",
    title2: "reusables from us?",
    text: "We understand bringing and washing your own reusables from home may be a hassle.",
  },
  {
    image: require("../assets/AppImages/onboardImage2.png"), 
    title: "Why Use ",
    title2: "reusables?",
    text: "We are building a NUS wide-movement to achieve Singapore's first disposable free mass canteen. It is in your hands.",
  },
  {
    image: require("../assets/AppImages/onboardImage3.png"), 
    title: "Why Return ",
    title2: "our reusables?",
    text: "Returning our reusables will help keep costs low for our stallholders. The return points are convenient too!",
  },
];

const endMsg = "That's why GO Zero Waste."

export default function OnboardingScreen({ navigation }) {

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={item.image} />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title2}>{item.title2}</Text>
        </View>

        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.title}>{endMsg}</Text>
      </View>
    );
  };

  const keyExtractor = (item) => item.title;

  const renderDoneButton = () => {
    return (
      <View style={styles.rightTextWrapper}>
        <Text style={styles.rightText}>Done</Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.rightTextWrapper}>
        <Text style={styles.rightText}>Next</Text>
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.leftTextWrapper}>
        <Text style={styles.rightText}>Skip</Text>
      </View>
    );
  };

  const handleDone = () => {
    return navigation.navigate("Log In Screen");
  };

  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderSkipButton={renderSkipButton}
        showSkipButton
        onDone={handleDone}
        onSkip={handleDone}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        data={data}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    backgroundColor: colors.darkGrey,
    width: 260, 
    height: 260,
  },
  titleWrapper: {
    flexDirection: "row",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  title2: {
    fontSize: 24,
    fontWeight: "500",
  },
  text: {
    textAlign: "justify",
    marginHorizontal: 60,
    marginVertical: 20,
  },
  rightTextWrapper: {
    width: 40,
    height: 40,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  leftTextWrapper: {
    width: 40,
    height: 40,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  rightText: {
    fontSize: 14,
  },
  dotStyle: {
    backgroundColor: colors.lightGrey,
  },
  activeDotStyle: {
    backgroundColor: colors.darkGrey,
  },
});
