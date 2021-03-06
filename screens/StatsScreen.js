import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../assets/colors";
import moment from "moment";
import { TabView, TabBar } from "react-native-tab-view";
import Leaderboard from "../components/Leaderboard";
import { renderAllDates } from "./BasicApi";

function ReturnDatesTab({ containerDate, cupDate, coin }) {
  var containerNum = 0;
  var cupNum = 0;

  // Get collective number of containers and cups borrowed
  for (let i = 0; i < containerDate.length; i++) {
    containerNum += containerDate[i].numContainers;
  }
  for (let i = 0; i < cupDate.length; i++) {
    cupNum += cupDate[i].numCups;
  }

  return (
  <View style={{ flex: 1, backgroundColor: colors.white }}>
    <View style={styles.contentContainer}>
      <Text style={[styles.redNumber, { marginRight: 25 }]}>{containerNum}</Text>
      <Image source={require("../assets/AppImages/container.png")} />
      <View style={{ marginLeft: 30 }}>
        <Text>Return by:{"\n"}</Text>
        {renderAllDates(containerDate)}
      </View>
    </View>

    <View style={styles.contentContainer}>
      <Text style={styles.redNumber}>{cupNum}</Text>
      <Image source={require("../assets/AppImages/cup.png")} />
      <View style={{ marginLeft: 30 }}>
        <Text>Return by:{"\n"}</Text>
        {renderAllDates(cupDate)}
      </View>
    </View>

    <View style={styles.contentContainer}>
      <Image source={require("../assets/AppImages/coin.png")} />
      <Text style={styles.number}>{coin}</Text>
    </View>
  </View>
  )
}

export default function StatsScreen({ route }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Return Dates" },
    { key: "second", title: "Leaderboard" },
  ]);

  const containerDate = route.params.containerDate;
  const cupDate = route.params.cupDate;
  const coin = route.params.coin;

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <ReturnDatesTab
            containerDate={containerDate}
            cupDate={cupDate}
            coin={coin}
          />
        );
      case "second":
        return <Leaderboard />;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: colors.black }}
          inactiveColor={colors.darkGrey}
          activeColor={colors.white}
          indicatorStyle={{ backgroundColor: "white", height: 3 }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  cardContentView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    backgroundColor: colors.white,
    height: 150,
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 20,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  redNumber: {
    fontSize: 48,
    color: colors.red,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  number: {
    fontSize: 48,
    color: colors.black,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
});
