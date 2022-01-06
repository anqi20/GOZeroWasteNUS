import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import colors from "../../assets/colors";

export default function ReturnTutorial() {
  function ListItem({ item }) {
    return (
      <View style={styles.frame}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.line}></View>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.guideText}>{item.text}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>How to start returning!</Text>
      </View>
      <FlatList
        data={guide}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const guide = [
  {
    id: "1",
    image: require("../../assets/TutorialImages/return1.png"),
    text: "1. Start by flashing the QR code on the screen to the bin's scanner.",
  },
  {
    id: "2",
    image: require("../../assets/TutorialImages/return2.png"),
    text: "2. Select the number of reusables you want to return before dropping them into the bins then clicking the orange button to continue. Note that you can only return up to the number of borrowed reusables.",
  },
  {
    id: "3",
    image: require("../../assets/TutorialImages/return3.png"),
    text: "3. You have successfully returned your reusables! You can now go back to the Home Screen!",
  },
  {
    id: "4",
    image: require("../../assets/TutorialImages/return4.png"),
    text: "If you encounter any issues with the QR code, click the text at the bottom of the screen to continue the return process!",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  frame: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    // height: 580,
    width: "80%",
    margin: 10,
    alignSelf: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  image: {
    aspectRatio: 9 / 16,
    width: "70%",
    height: undefined,
    margin: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  header: {
    backgroundColor: "coral",
    width: "100%",
    padding: 5,
    marginBottom: 10,
  },
  headerText: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  line: {
    borderBottomWidth: 2,
  },
  guideText: {
    fontSize: 16,
    margin: 10,
  },
});
