import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import colors from "../assets/colors";

  const data = [
    {
      title: "Borrow", 
      text: "Borrow your reusable cups and containers from participating store",
    }, {
      title: "Use",
      text: "Enjoy your delicious meal",
    }, {
      title: "Return", 
      text: "Find any of our return machines and drop it in",
    }
  ]

export default function OnboardingScreen({ navigation }) {

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}> 
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    )
  }

  const keyExtractor = (item) => item.title;

  const renderDoneButton = () => {
    return (
      <View style={styles.rightTextWrapper}> 
        <Text style={styles.rightText}>Done</Text>
      </View>
    )
  }

  const renderNextButton = () => {
    return (
      <View style={styles.rightTextWrapper}> 
        <Text style={styles.rightText}>Next</Text>
      </View>
    )
  }

  const renderSkipButton = () => {
    return (
      <View style={styles.leftTextWrapper}> 
        <Text style={styles.rightText}>Skip</Text>
      </View>
    )
  }

  const handleDone = () => {
    return (
      navigation.navigate("Login Screen")
    )
  }

  return (
    <View style={{flex: 1}}>
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
  )
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24, 
    fontWeight: "700", 
    marginBottom: 30,
  },
  text: {
    textAlign: "center", 
    marginHorizontal: 70,
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
