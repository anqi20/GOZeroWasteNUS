import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
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
  const wallet = 100;

  return (
    <View>
      {wallet >= item.price? 
      <TouchableOpacity onPress={() =>navigation.navigate("Confirmation Modal", { text: item.reward })}>
        <View style={styles.container}>

          <View style={{alignItems: "center", marginLeft: 10}}>
            <RenderIcon category={item.category} size={60} />
            <Text style={{marginTop: 5}}>@{item.location}</Text>
          </View>

          <View style={{ flex: 3, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
            <Text style={[styles.boldText, { textAlign: "center", marginBottom: 10 }]}>{item.reward}</Text>
            <View style={{flexDirection: "row"}}>
              <Text style={{ marginRight: 10, color: colors.black}}>{item.price}</Text>
              <Icon name="coins" type="font-awesome-5" size={20} color="black" />
            </View>
          </View>

        </View>
      </TouchableOpacity>
    :

      <View>
        <View style={[styles.container, {backgroundColor: colors.lightGrey}]}>

          <View style={{alignItems: "center", marginLeft: 10}}>
            <RenderIcon category={item.category} size={60} />
            <Text style={{marginTop: 5}}>@{item.location}</Text>
          </View>

          <View style={{ flex: 3, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
            <Text style={[styles.boldText, { textAlign: "center", marginBottom: 10 }]}>{item.reward}</Text>
            <View style={{flexDirection: "row"}}>
              <Text style={{ marginRight: 10, color: colors.red, fontWeight: "bold"}}>{item.price}</Text>
              <Icon name="coins" type="font-awesome-5" size={20} color="black" />
            </View>
          </View>

        </View>
      </View>
    }

      
    </View>
  );
}

export default function RewardListView() {
  const navigation = useNavigation();

  return (
    <View>
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
  text: {
    fontSize: 18,
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    width: Dimensions.get("window").width - 40,
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: colors.white,
    borderRadius: 20,
    borderColor: colors.black,
    borderWidth: 2,
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row", 

    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 10,
  },
});

// Icon will be allocated according to category of item
const dummyData = [
  {
    id: "0",
    location: "TechnoEdge",
    category: "Food",
    reward: "Welcome gift! 1 free coffee!",
    price: 100,
  },
  {
    id: "1",
    location: "TechnoEdge",
    category: "Item",
    reward: "Free soft toy!",
    price: 120,
  },
  {
    id: "2",
    location: "TechnoEdge",
    category: "Voucher",
    reward: "Voucher for vegetarian store",
    price: 150,
  },
  {
    id: "3",
    location: "TechnoEdge",
    category: "Food",
    reward: "Free bread",
    price: 80,
  },
  {
    id: "4",
    location: "TechnoEdge",
    category: "Food",
    reward: "Free soft drink",
    price: 95,
  },
];
