import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Button } from "react-native-elements/dist/buttons/Button";

function renderIcon(category) {
  if (category === "Voucher") {
    return <FontAwesome5 name="money-bill-wave" size={30} color="black" />;
  } else if (category === "Food") {
    return <Ionicons name="fast-food" size={30} color="black" />;
  } else if (category === "Item") {
    return <FontAwesome5 name="shopping-bag" size={30} color="black" />;
  }
}

export default function RewardListView() {
  const navigation = useNavigation();
  const [modalVisible, setVisibility] = useState(false);

  function ListItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.rewardItem}
        onPress={() => setVisibility(!modalVisible)}
      >
        <Text
          numberOfLines={2}
          style={[styles.boldText, { textAlign: "center" }]}
        >
          {item.reward}
        </Text>
        <View style={{ alignItems: "center", margin: 10 }}>
          {renderIcon(item.category)}
        </View>
        <Text numberOfLines={1}>@{item.location}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setVisibility(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              Are you sure you want to redeem this reward?
            </Text>
            <Text style={styles.modalText}>1 free coffee</Text>
            <View>
              <Button
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setVisibility(!modalVisible);
                  navigation.navigate("Successful Redemption Screen");
                }}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Button>
              <Button
                style={[styles.button, styles.buttonClose]}
                onPress={() => setVisibility(!modalVisible)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal> */}

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

  //   centeredView: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   modalBox: {
  //     margin: 20,
  //     backgroundColor: colors.white,
  //     borderRadius: 20,
  //     padding: 20,
  //     borderColor: colors.black,
  //     borderWidth: 2,
  //     alignItems: "center",
  //     shadowOffset: {
  //       width: 0,
  //       height: 10,
  //     },
  //     shadowOpacity: 0.25,
  //     shadowRadius: 5,
  //     elevation: 15,
  //   },
  //   modalText: {
  //     fontSize: 18,
  //     marginBottom: 15,
  //     textAlign: "center",
  //   },
  //   button: {
  //     borderRadius: 20,
  //     padding: 10,
  //     elevation: 2,
  //   },
  //   buttonOpen: {
  //     backgroundColor: "#F194FF",
  //   },
  //   buttonClose: {
  //     backgroundColor: "#2196F3",
  //   },
  //   textStyle: {
  //     color: "white",
  //     fontWeight: "bold",
  //     textAlign: "center",
  //   },
});
