import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export function RenderIcon({ category, size }) {
  if (category === "Voucher") {
    return <FontAwesome5 name="money-bill-wave" size={size} color="black" />;
  } else if (category === "Food") {
    return <Ionicons name="fast-food" size={size} color="black" />;
  } else if (category === "Item") {
    return <FontAwesome5 name="shopping-bag" size={size} color="black" />;
  }
}

function ListItem({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.rewardItem}
      onPress={() => navigation.navigate("Confirmation Modal")}
    >
      <Text
        numberOfLines={2}
        style={[styles.boldText, { textAlign: "center" }]}
      >
        {item.reward}
      </Text>
      <View style={{ alignItems: "center", margin: 10 }}>
        <RenderIcon category={item.category} size={30} />
      </View>
      <Text numberOfLines={1}>@{item.location}</Text>
    </TouchableOpacity>
  );
}

export default function RewardListView() {
  const navigation = useNavigation();
  const [modalVisible, setVisibility] = useState(false);

  return (
    <View>
      <FlatList
        horizontal
        data={dummyData}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

// Icon will be allocated according to category of item
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

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    // fontFamily: "Roboto",
  },
  boldText: {
    fontSize: 18,
    // fontFamily: "Roboto",
    fontWeight: "bold",
  },
  rewardItem: {
    height: 150,
    width: 120,
    backgroundColor: colors.lightGrey,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    borderColor: colors.black,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",

    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },

    elevation: 10,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    width: 130,
  },
});
