import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import CarouselView from "../components/CarouselView";
import { UserContext } from "../assets/UserContext";
import Announcements from "../components/Announcements";
import {
  setAnnouncementDetail,
  getCoins,
  getUpdatedUserData,
} from "./BasicApi";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const userData = useContext(UserContext);
  const uid = userData.id;
  const [announcement, setAnnouncement] = useState("");
  const [coins, setCoins] = useState(0);
  const [updatedUserData, updateUserData] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getUpdatedUserData(uid, updateUserData);
      getCoins(uid, setCoins);
      setAnnouncementDetail(setAnnouncement);
      console.log("Updating home screen data");
    }, [])
  );

  //Feedback form website
  const website = "https://forms.gle/T1JyVMQLbU5geX1V9";

  function goToSite() {
    Linking.openURL(`${website}`);
  }

  function renderCarouselView(updatedUserData, userData) {
    if (updatedUserData == null) {
      return (
        <CarouselView
          containerDate={userData.containerDate}
          cupDate={userData.cupDate}
        />
      );
    } else {
      return (
        <CarouselView
          containerDate={updatedUserData.containerDate}
          cupDate={updatedUserData.cupDate}
        />
      );
    }
  }

  function renderStatsIcon(updatedUserData, userData) {
    if (updatedUserData == null) {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Stats Screen", {
              containerDate: userData.containerDate,
              cupDate: userData.cupDate,
              coin: userData.coin,
            })
          }
          style={styles.quickNavButton}
        >
          <Image
            source={require("../assets/AppImages/statsIcon.png")}
            style={styles.quickNavButton}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Stats Screen", {
              containerDate: updatedUserData.containerDate,
              cupDate: updatedUserData.cupDate,
              coin: updatedUserData.coin,
            })
          }
          style={styles.quickNavButton}
        >
          <Image
            source={require("../assets/AppImages/statsIcon.png")}
            style={styles.quickNavButton}
          />
        </TouchableOpacity>
      );
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.white }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require("../assets/AppImages/homeHeader.png")}
          style={styles.header}
        >
          <View style={styles.welcomeContainer}>
            <Text style={styles.text}>Hi,</Text>
            <Text style={[styles.boldText, { fontSize: 36 }]}>
              {userData !== undefined ? userData.firstName : "Anonymous"}
            </Text>
          </View>
          <View style={styles.coinsContainer}>
            <Image
              source={require("../assets/AppImages/coin.png")}
              style={{ height: 30, width: 30, marginRight: 10 }}
            />
            <Text style={styles.boldText}>{coins}</Text>
          </View>
          <View style={styles.settingsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings Stack")}
            >
              <Ionicons name="settings-outline" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Announcements */}
      {announcement != "" ? (
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <Announcements header={true} text={announcement} />
        </View>
      ) : null}

      {/* Icons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 32,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.topIconBox2, styles.shadow]}
            onPress={() => navigation.navigate("Borrow")}
          >
            <Image
              source={require("../assets/AppImages/borrowIcon.png")}
              style={styles.topIconBox}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.topIconBox2,
              styles.shadow,
              { marginHorizontal: 15 },
            ]}
            onPress={() => navigation.navigate("BYO Stack")}
          >
            <Image
              source={require("../assets/AppImages/byoIcon.png")}
              style={styles.topIconBox}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.topIconBox2, styles.shadow]}
            onPress={() => navigation.navigate("Return")}
          >
            <Image
              source={require("../assets/AppImages/returnIcon.png")}
              style={styles.topIconBox}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Due reusables scroll view */}
      {renderCarouselView(updatedUserData, userData)}

      {/* Quick navigation icons */}
      <View style={styles.navigationIcons}>
        <View>
          {renderStatsIcon(updatedUserData, userData)}
          <Text>My Stats</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Locations Screen")}
            style={styles.quickNavButton}
          >
            <Image
              source={require("../assets/AppImages/locationIcon.png")}
              style={styles.quickNavButton}
            />
          </TouchableOpacity>
          <Text>Return Locations</Text>
        </View>

        <View>
          <TouchableOpacity onPress={goToSite} style={styles.quickNavButton}>
            <Image
              source={require("../assets/AppImages/feedbackIcon.png")}
              style={styles.quickNavButton}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Feedback</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Tutorial Stack")}
            style={styles.quickNavButton}
          >
            <Image
              source={require("../assets/AppImages/tutorialIcon.png")}
              style={styles.quickNavButton}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Tutorial</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("screen").width + 2,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    // marginTop: Platform.OS === "android" ? Constants.statusBarHeight + 20 : 0,
    // marginTop: Constants.statusBarHeight,
    marginBottom: 32,
    padding: 20,
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
  icons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  topIconBox: {
    borderRadius: 10,
    height: undefined,
    aspectRatio: 10 / 8,
    width: (Dimensions.get("window").width - 80) / 3,
  },
  topIconBox2: {
    flex: 1,
    height: 80,
    height: undefined,
    aspectRatio: 10 / 8,
    width: (Dimensions.get("window").width - 80) / 3,
  },
  navigationIcons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginBottom: 32,
  },
  quickNavButton: {
    height: 60,
    width: 60,
    marginBottom: 8,
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    fontSize: 15,
  },
  boldText: {
    fontSize: 18,
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
    backgroundColor: "transparent",
    elevation: 8,
  },
});
