import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../assets/colors";
import moment from "moment";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Leaderboard from "../components/Leaderboard";

const ReturnDatesTab = () => (
  <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.contentContainer}>
        <Text style={[styles.redNumber, { marginRight: 25 }]}>3</Text>
        <Icon name="cube" type="font-awesome" size={60} color="black" />
        <View style={{ marginLeft: 30 }}>
          <Text>Return by:{"\n"}</Text>
          <Text>({moment("23/08/21", "DD-MM-YY").format("ddd")}) 23/08/21</Text>
          <Text>({moment("24/8/21", "DD-MM-YY").format("ddd")}) 24/08/21</Text>
          <Text>({moment("26/8/21", "DD-MM-YY").format("ddd")}) 26/08/21</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.redNumber}>3</Text>
        <Icon name="cup" type="material-community" size={60} color="black" />
        <View style={{ marginLeft: 30 }}>
          <Text>Return by:{"\n"}</Text>
          <Text>({moment("23/08/21", "DD-MM-YY").format("ddd")}) 23/08/21</Text>
          <Text>({moment("24/8/21", "DD-MM-YY").format("ddd")}) 24/08/21</Text>
          <Text>({moment("26/8/21", "DD-MM-YY").format("ddd")}) 26/08/21</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.redNumber}>128</Text>
        <Icon
          name="money-bill-alt"
          type="font-awesome-5"
          size={50}
          color="black"
        />
        <Text style={styles.redNumber}>3</Text>
        <Icon name="coins" type="font-awesome-5" size={50} color="black" />
      </View>
    </View>
)

const LeaderboardTab = () => (
  <Leaderboard />
)

const renderScene = SceneMap({
  first: ReturnDatesTab, 
  second: LeaderboardTab,
})

export default function StatsScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Return Dates'},
    {key: 'second', title: 'Leaderboard'},
  ])

  return (
      <TabView 
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => <TabBar 
          {...props} 
          style={{backgroundColor: colors.black}}
          inactiveColor={colors.darkGrey}
          activeColor={colors.white}
          indicatorStyle={{ backgroundColor: 'white', height: 3 }}
        />}
      />
  )
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
});
