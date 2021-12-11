import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import colors from "../assets/colors";
import { Button, Icon } from "react-native-elements";
import CarouselView from "../components/CarouselView";
import RewardListView from "../components/RewardListView";
import { UserContext } from "../assets/UserContext";
import { globalStyles } from "../assets/globalStyles";
import Announcements from "../components/Announcements";

export default function HomeScreen({ navigation }) {
  const userData = useContext(UserContext);
  const [hasAnnouncement, setBoolean] = useState(true);
  // {
  //   console.log("Home page");
  //   console.log(userData);
  // }

  //Feedback form website
  const website = "https://forms.gle/o846pa7z4Xan2m6P8";

  function goToSite() {
    Linking.openURL(`${website}`);
  }

  return (
    <View style={{ marginTop: Constants.statusBarHeight }}>
      <ScrollView
        style={{ backgroundColor: colors.white }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.text}>Hi,</Text>
            <Text style={[styles.boldText, { fontSize: 36 }]}>
              {userData !== undefined ? userData.lastName : "Anonymous"}
            </Text>
          </View>
          <View style={styles.coinsContainer}>
            <MaterialIcons name="attach-money" size={24} color="black" />
            <Text style={styles.boldText}>100</Text>
          </View>
          <View style={styles.settingsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings Stack")}
            >
              <Ionicons name="settings-outline" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Announcements */}
        {hasAnnouncement ? (
          <View style={{ alignItems: "center", marginBottom: 32 }}>
            <Announcements
              header={true}
              text="Return 1 reusables to get x2 coins today!"
            />
          </View>
        ) : null}

        {/* Icons */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginBottom: 32,
          }}
        >
          <View style={styles.topIcon}>
            <TouchableOpacity
              style={styles.topIconBox}
              onPress={() => navigation.navigate("Borrow")}
            >
              <Text style={{ padding: 10 }}>Image here</Text>
            </TouchableOpacity>
            <Text style={styles.boldText}>Borrow</Text>
          </View>
          <View style={styles.topIcon}>
            <TouchableOpacity
              style={styles.topIconBox}
              onPress={() => navigation.navigate("BYO Stack")}
            >
              <Text style={{ padding: 10 }}>Image here</Text>
            </TouchableOpacity>
            <Text style={styles.boldText}>BYO</Text>
          </View>
          <View style={styles.topIcon}>
            <TouchableOpacity
              style={styles.topIconBox}
              onPress={() => navigation.navigate("Return")}
            >
              <Text style={{ padding: 10 }}>Image here</Text>
            </TouchableOpacity>
            <Text style={styles.boldText}>Return</Text>
          </View>
        </View>

        {/* Due reusables scroll view */}
        <CarouselView />

        {/* Quick navigation icons */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginBottom: 32,
          }}
        >
          <View style={styles.quickNav}>
            <Icon
              reverse
              name="person"
              type="ionicon"
              color={colors.darkGrey}
              size={30}
              onPress={() => navigation.navigate("Stats Screen")}
            />
            <Text style={styles.text}>Stats</Text>
          </View>
          <View style={styles.quickNav}>
            <Icon
              reverse
              name="location"
              type="ionicon"
              color={colors.darkGrey}
              size={30}
              onPress={() => navigation.navigate("Locations Screen")}
            />
            <Text style={styles.text}>Location</Text>
          </View>
          <View style={styles.quickNav}>
            <Icon
              reverse
              name="comment-text"
              type="material-community"
              color={colors.darkGrey}
              size={30}
              onPress={goToSite}
            />
            <Text style={styles.text}>Feedback</Text>
          </View>
          <View style={styles.quickNav}>
            <Icon
              reverse
              name="question"
              type="font-awesome"
              color={colors.darkGrey}
              size={30}
              onPress={() => navigation.navigate("Tutorial Screen")}
            />
            <Text style={styles.text}>Tutorial</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: Platform.OS === "android" ? Constants.statusBarHeight + 20 : 0,
    // marginTop: Constants.statusBarHeight,
    marginBottom: 32,
    padding: 20,
    backgroundColor: colors.lightGrey,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  welcomeContainer: {
    flex: 1,
    flexGrow: 1,
  },
  settingsContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  coinsContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topIconBox: {
    flex: 1,
    height: 80,
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  quickNav: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    width: 120,
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
});
