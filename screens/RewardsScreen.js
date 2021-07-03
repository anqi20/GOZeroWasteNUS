import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../assets/colors";
import { RenderIcon } from "../components/RewardListView";
import { useNavigation } from "@react-navigation/native";

export function ListItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.rewardItem}
      onPress={() => navigation.navigate("Confirmation Modal")}
    >
      <View style={{ alignItems: "center", margin: 10, flex: 1 }}>
        <RenderIcon category={item.category} size={60} />
      </View>
      <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={[styles.boldText, { textAlign: "center", marginBottom: 10 }]}
        >
          {item.reward}
        </Text>
        <Text>@{item.location}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function RewardsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  rewardItem: {
    height: 150,
    width: Dimensions.get("window").width - 40,
    backgroundColor: colors.lightGrey,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    borderColor: colors.black,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    // fontFamily: "Roboto",
  },
  boldText: {
    fontSize: 18,
    // fontFamily: "Roboto",
    fontWeight: "bold",
  },
});

const dummyData = [
  {
    id: "0",
    location: "TechnoEdge",
    category: "Food",
    reward: "Welcome gift! 1 free coffee!",
  },
  {
    id: "1",
    location: "TechnoEdge",
    category: "Item",
    reward: "Free soft toy!",
  },
  {
    id: "2",
    location: "TechnoEdge",
    category: "Voucher",
    reward: "Voucher for vegetarian store",
  },
  {
    id: "3",
    location: "TechnoEdge",
    category: "Food",
    reward: "Free bread",
  },
  {
    id: "4",
    location: "TechnoEdge",
    category: "Food",
    reward: "Free soft drink",
  },
];
