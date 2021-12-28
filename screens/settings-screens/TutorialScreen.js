import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import colors from "../../assets/colors";

export default function TutorialScreen() {
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
        <Text style={styles.headerText}>How to start borrowing!</Text>
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
    image: require("../../assets/TutorialImages/borrow1.png"),
    text: "1. Click on the borrow icon, either the one shown or the bottom tab labelled borrow.",
  },
  {
    id: "2",
    image: require("../../assets/TutorialImages/borrow2.png"),
    text: "2. Here, you can select the number of reusables you would like to borrow. Take note that you can only borrow 2 reusables at a time!",
  },
  {
    id: "3",
    image: require("../../assets/TutorialImages/borrow3.png"),
    text: "3. Once you are done, click next to complete the process.",
  },
  {
    id: "4",
    image: require("../../assets/TutorialImages/borrow4.png"),
    text: "4. You have successfully borrowed a reusable! You can now go back to the Home screen!",
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
    height: 500,
    width: "80%",
    margin: 10,
    alignSelf: "center",
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
