import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import colors from "../../assets/colors";
import { Icon } from "react-native-elements";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

function RenderIcon({ category, container, cup }) {
  if (category === "Voucher") {
    return <FontAwesome5 name="money-bill-wave" size={24} color="blue" />;
  } else if (category === "Food") {
    return <Ionicons name="fast-food" size={24} color="blue" />;
  } else if (category === "Item") {
    return <FontAwesome5 name="shopping-bag" size={24} color="blue" />;
  } else if (category === "Borrow") {
    if (container > 0 && cup === 0) {
      return (
        <View style={styles.icon}>
          <Text style={[styles.iconText, { color: "red" }]}>+{container}</Text>
          <Icon name="cube" type="font-awesome" size={24} color="red" />
        </View>
      );
    } else if (container === 0 && cup > 0) {
      return (
        <View style={styles.icon}>
          <Text style={[styles.iconText, { color: "red" }]}>+{cup}</Text>
          <Icon name="cup" type="material-community" size={24} color="red" />
        </View>
      );
    } else {
      return (
        <View style={styles.iconList}>
          <View style={styles.icon}>
            <Text style={[styles.iconText, { color: "red" }]}>
              +{container}
            </Text>
            <Icon name="cube" type="font-awesome" size={24} color="red" />
          </View>
          <View style={[styles.icon, { marginRight: 0 }]}>
            <Text style={[styles.iconText, { color: "red" }]}>+{cup}</Text>
            <Icon name="cup" type="material-community" size={24} color="red" />
          </View>
        </View>
      );
    }
  } else if (category === "Return") {
    if (container > 0 && cup === 0) {
      return (
        <View style={styles.icon}>
          <Text style={[styles.iconText, { color: "green" }]}>
            -{container}
          </Text>
          <Icon name="cube" type="font-awesome" size={24} color="green" />
        </View>
      );
    } else if (container === 0 && cup > 0) {
      return (
        <View style={styles.icon}>
          <Text style={[styles.iconText, { color: "green" }]}>-{cup}</Text>
          <Icon name="cup" type="material-community" size={24} color="green" />
        </View>
      );
    } else {
      return (
        <View style={styles.iconList}>
          <View style={styles.icon}>
            <Text style={[styles.iconText, { color: "green" }]}>
              -{container}
            </Text>
            <Icon name="cube" type="font-awesome" size={24} color="green" />
          </View>
          <View style={[styles.icon, { marginRight: 0 }]}>
            <Text style={[styles.iconText, { color: "green" }]}>-{cup}</Text>
            <Icon
              name="cup"
              type="material-community"
              size={24}
              color="green"
            />
          </View>
        </View>
      );
    }
  }
}

function ListItem({ item }) {
  if (item.category === "Borrow") {
    return (
      <View style={styles.listContainer}>
        <View style={styles.listText}>
          <Text>{item.date}</Text>
          <Text>
            {item.location}: {item.storeName}
          </Text>
        </View>
        <View style={styles.listIconWrapper}>
          <RenderIcon
            category={item.category}
            container={item.container}
            cup={item.cup}
          />
        </View>
      </View>
    );
  } else if (item.category === "Return") {
    return (
      <View style={styles.listContainer}>
        <View style={styles.listText}>
          <Text>{item.date}</Text>
          <Text>{item.location}</Text>
        </View>
        <View style={styles.listIconWrapper}>
          <RenderIcon
            category={item.category}
            container={item.container}
            cup={item.cup}
          />
        </View>
      </View>
    );
  } else if (
    item.category === "Item" ||
    item.category === "Voucher" ||
    item.category === "Food"
  ) {
    return (
      <View style={styles.listContainer}>
        <View style={styles.listText}>
          <Text>{item.date}</Text>
          <Text>
            {item.category}: {item.reward}
          </Text>
        </View>
        <View style={styles.listIconWrapper}>
          <Text style={[styles.listIconText, { color: "blue" }]}>+1</Text>
          <RenderIcon category={item.category} />
        </View>
      </View>
    );
  }
}

export default function LogsScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>

        {/*List*/}
        <View>
          <FlatList
            vertical
            data={dummyData}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    backgroundColor: colors.white,
    height: 150,
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 20,
    marginBottom: 32,
    marginHorizontal: 20,
    padding: 20,
    flexDirection: "column",
  },
  shadow: {
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 10,
  },
  containerCups: {
    flexDirection: "row",
    justifyContent: "center",
  },
  blackNumber: {
    fontSize: 48,
    color: colors.black,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  listContainer: {
    marginBottom: 15,
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  listText: {
    marginLeft: 10,
  },
  listIconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  listIconText: {
    marginRight: 5,
  },
  iconList: {
    flexDirection: "row",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    marginHorizontal: 5,
  },
});

const dummyData = [
  {
    id: "0",
    location: "TechnoEdge",
    storeName: "Vegetarian Store",
    category: "Borrow",
    container: 1,
    cup: 0,
    reward: "",
    date: "14/8/2021",
  },
  {
    id: "1",
    location: "TechnoEdge",
    storeName: "Fruits Store",
    category: "Borrow",
    container: 0,
    cup: 1,
    reward: "",
    date: "12/8/2021",
  },
  {
    id: "2",
    location: "EA",
    storeName: "",
    category: "Return",
    container: 1,
    cup: 1,
    reward: "",
    date: "10/8/2021",
  },
  {
    id: "3",
    location: "TechnoEdge",
    storeName: "",
    category: "Voucher",
    container: 0,
    cup: 0,
    reward: "Voucher for vegetarian store",
    date: "8/8/2021",
  },
  {
    id: "4",
    location: "TechnoEdge",
    storeName: "",
    category: "Item",
    container: 0,
    cup: 0,
    reward: "Free soft toy!",
    date: "4/8/2021",
  },
  {
    id: "5",
    location: "TechnoEdge",
    storeName: "",
    category: "Food",
    container: 0,
    cup: 0,
    reward: "Free bread",
    date: "1/8/2021",
  },
  {
    id: "6",
    location: "Hong Kong Store",
    storeName: "",
    category: "Borrow",
    container: 1,
    cup: 1,
    reward: "",
    date: "10/8/2021",
  },
  {
    id: "7",
    location: "EA",
    storeName: "",
    category: "Return",
    container: 1,
    cup: 0,
    reward: "",
    date: "10/8/2021",
  },
  {
    id: "8",
    location: "EA",
    storeName: "",
    category: "Return",
    container: 0,
    cup: 1,
    reward: "",
    date: "10/8/2021",
  },
];
