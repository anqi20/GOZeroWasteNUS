import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import colors from "../assets/colors";
import { Button, Icon } from "react-native-elements";
import CarouselView from "../components/CarouselView";
import RewardListView from "../components/RewardListView";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={{ backgroundColor: colors.white }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.text}>Hi,</Text>
          <Text style={[styles.boldText, { fontSize: 36 }]}>ReNuse</Text>
        </View>
        <View style={styles.settingsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings Stack")}
          >
            <Ionicons name="settings-outline" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Overall scroll view */}
      <CarouselView />

      {/* How to use quick navigation*/}
      <TouchableOpacity
        style={[styles.contentContainer, styles.shadow]}
        onPress={() => navigation.navigate("How to use?")}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="help-circle" type="ionicon" size={60} color="black" />
        </View>
        <View
          style={{
            flex: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[styles.boldText, { textAlign: "center" }]}>
            Looking for a quick guide?
          </Text>
          <Text style={[styles.text, { textAlign: "center" }]}>
            Click here to learn how to use!
          </Text>
        </View>
      </TouchableOpacity>

      {/* Saved reuseables */}
      <View style={styles.contentContainer}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[styles.text, { textAlign: "center" }]}>
            You have saved{" "}
            <Text style={[styles.boldText, { fontSize: 24 }]}>132</Text>{" "}
            reuseables!
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome5 name="save" size={60} color="black" />
        </View>
      </View>

      {/* Personal ranking */}
      <View style={styles.contentContainer}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
          }}
        >
          <Text style={[styles.boldText, { marginBottom: 10 }]}>
            Personal ranking:
          </Text>
          <FontAwesome5 name="crown" size={60} color="black" />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={[styles.text, { textAlign: "center" }]}>
            3 reusables till #11!{"\n"}Keep going!
          </Text>
        </View>
      </View>

      {/* Reward redemption */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          marginHorizontal: 20,
        }}
      >
        <Text style={styles.boldText}>Rewards redemption:</Text>
        <Button
          buttonStyle={styles.button}
          title="See all!"
          icon={<Icon name="arrow-right" size={30} color="white" />}
          iconRight
          onPress={() => navigation.navigate("Rewards Screen")}
        ></Button>
      </View>
      <SafeAreaView style={{ marginHorizontal: 20, marginBottom: 10 }}>
        <RewardListView />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: Platform.OS === "android" ? Constants.statusBarHeight + 20 : 0,
    marginTop: Constants.statusBarHeight + 20,
    marginBottom: 32,
  },
  welcomeContainer: {
    marginLeft: 20,
    flex: 1,
    flexGrow: 1,
  },
  settingsContainer: {
    marginRight: 20,
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
