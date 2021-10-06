import React from "react";
import { StyleSheet, Text, View, Image, FlatList, Dimensions } from "react-native";
import colors from "../../assets/colors";

function ListItem({ item }) {

  return(
    <View style={styles.listItem}>
      <Image source={item.picture} style={styles.listMap} />
      <View style={styles.listLine}></View>
      <View style={{justifyContent: "center"}}>
        <Text style={styles.listText}>{item.location}</Text>
      </View>
      
    </View>
  )
}

export default function LocationsScreen() {
  return (
    <View style={styles.container}>

      <Image 
        source={require('../../assets/icons/location.png')}
        style={styles.mainMap}
      />

      <View style={{borderWidth: 1}}></View>

      <FlatList 
        data={data}
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
    backgroundColor: "#fff",
  },
  listItem: {
    borderRadius: 20,
    borderColor: colors.black,
    borderWidth: 2,
    margin: 10,
    flexDirection: "row-reverse", 
  },
  listText: {
    fontSize: 20,
    textAlign: "center",
    width: (Dimensions.get("window").width / 2) - 10,
    fontWeight: "bold",
  },
  listLine: {
    borderRightWidth: 2,
  },
  listMap: {
    width: 180, 
    height: 180,
    alignSelf: "flex-end", 
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainMap: {
    width: (Dimensions.get("window").width)-10,
    height: 280, 
    alignSelf: "center", 
  }
});

const data = [
  {
    id: "1",
    location: "TechnoEdge Canteen", 
    picture: require("../../assets/icons/location.png"),
  }, 
  {
    id: "2",
    location: "E4", 
    picture: require("../../assets/icons/location.png"),
  }, 
  {
    id: "3",
    location: "SDE4", 
    picture: require("../../assets/icons/location.png"),
  }, 
];
