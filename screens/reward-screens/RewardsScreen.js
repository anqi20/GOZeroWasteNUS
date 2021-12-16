import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, Dimensions, Image, SafeAreaView } from "react-native";
import colors from "../../assets/colors";
import RewardListView from "../../components/RewardListView";
import Announcements from "../../components/Announcements";
import { UserContext } from "../../assets/UserContext";
import { setAnnouncementDetail, setUserDetails } from "../BasicApi";

export default function RewardsScreen({ navigation }) {
  const [hasAnnouncement, setBoolean] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [coins, setCoins] = useState(0);
  const userData = useContext(UserContext);
  const uid = userData.id;

  /*useEffect(() => {
    setAnnouncementDetail(setAnnouncement);
    if(announcement != "") {
      setBoolean(true);
    } else {
      setBoolean(false);
    }
    setUserDetails(uid, setCoins);
  })*/

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "coral",
          height: 40,
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <Text>Feature coming soon! Stay tuned {";)"}</Text>
      </View>
    </View>
    // <View style={styles.container}>
    //   {/*Top container: Announcements + Coins*/}
    //   <View style={styles.topContainer}>
    //     {/*Annoucements*/}
    //     <View>
    //       <Announcements
    //         header={true}
    //         text={announcement}
    //       />
    //     </View>

    //     {/*Coins*/}
    //     <View style={styles.box}>
    //       <Text style={styles.text}>Return reusables to collect coins!</Text>
    //       <View style={styles.icon}>
    //         <Text style={[styles.blackNumber, { marginRight: 25 }]}>{coins}</Text>
    //         <Image
    //           source={require("../../assets/AppImages/coin.png")}
    //           style={{ height: 30, width: 30 }}
    //         />

    //         {/* <Icon name="coins" type="font-awesome-5" size={25} color="black" /> */}
    //       </View>
    //     </View>
    //   </View>

    //   <View style={styles.line} />

    //   {/*List of rewards*/}
    //   <SafeAreaView style={{flex: 1}}>
    //     <RewardListView />
    //   </SafeAreaView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  topContainer: {
    backgroundColor: colors.black,
    width: Dimensions.get("window").width,
    alignItems: "center",
    paddingTop: 10,
  },
  box: {
    width: Dimensions.get("window").width - 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    borderColor: colors.black,
    borderWidth: 2,
    marginVertical: 10,
    backgroundColor: colors.white,
  },
  text: {
    textAlign: "center",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  blackNumber: {
    fontSize: 24,
    color: colors.black,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  line: {
    borderWidth: 1,
    width: Dimensions.get("window").width,
  },
});
