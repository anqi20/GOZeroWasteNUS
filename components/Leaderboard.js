import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../assets/colors";
import { Table, Row, Rows } from "react-native-table-component";
import ProgressCircle from "react-native-progress-circle";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HeaderTable: ["#Rank", "Name", "Number", "Faculty"],
      FirstTable: ["#1", "John Lim", "103", "FoE"],
      SecondTable: ["#2", "John Lim", "103", "FoE"],
      ThirdTable: ["#3", "John Lim", "103", "FoE"],
      MainDataTable: [
        ["#4", "John Lim", "103", "FoE"],
        ["#5", "John Lim", "103", "FoE"],
        ["#6", "John Lim", "103", "FoE"],
        ["#7", "John Lim", "103", "FoE"],
        ["#8", "John Lim", "103", "FoE"],
        ["#9", "John Lim", "103", "FoE"],
        ["#10", "John Lim", "103", "FoE"],
        ["#103", "Lim SiHui", "10", "SoC"],
      ],
    };
  }

  //Restriction: To show only the first 8 characters of usernames
  nameConstraint = (data) => {
    for(let i=0; i< data.length; i++) {
      if(data[i][1].length > 8) {
        data[i][1] = data[i][1].substring(0, 8)
      }
    }
    return data;
  }

  render() {
    const FirstTable = this.nameConstraint(this.state.FirstTable)
    const SecondTable = this.nameConstraint(this.state.SecondTable)
    const ThirdTable = this.nameConstraint(this.state.ThirdTable)
    const MainDataTable = this.nameConstraint(this.state.MainDataTable)

    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView showsVerticalScrollIndicator={false}>

        {/*Progress Circle*/}
        <View style={styles.progressCircle}>
            <ProgressCircle
              percent={80}                //container
              radius={70}
              borderWidth={8}
              color={colors.red}          //border color of container
              shadowColor={colors.black}  //border color of cup
              bgColor={colors.white}
            >
              <Text style={{fontSize:30, fontWeight:"bold"}}>132</Text>
            </ProgressCircle>

            {/*Legend*/}
            <View style={styles.legend}>
              <View style={{flexDirection:"row"}}>
                <View style={[styles.square, {backgroundColor: colors.red}]}></View>
                <Text>Containers</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <View style={[styles.square, {backgroundColor: colors.black}]}></View>
                <Text>Cups</Text>
              </View>
            </View>
        </View>

        {/*Crown icon + total count text*/}
        <View style={styles.container}>
            <Text style={[styles.boldText, {paddingLeft: 10}]}>Ranking:</Text>
            <View style={styles.headerWrapper}>
                <View style={styles.headerIcon}>
                    <FontAwesome5 name="crown" size={40} color="black" />
                    <Text style={[styles.boldText, { marginLeft: 10 }]}>#11</Text>
                </View>

                <Text style={[styles.text, { textAlign: "center", marginTop: 10 }]}>
                    We have saved a total of{"\n"}
                    <Text style={[styles.boldText, { fontSize: 24 }]}>132</Text>
                    {"\n"}
                    containers and cups!
                </Text>
            </View>
        </View>
        
        {/*Table*/}
        <View>
            <Table>
                <Row
                data={this.state.HeaderTable}
                style={styles.TableHeader}
                textStyle={styles.TableHeaderText} />
                <Row
                data={FirstTable}
                style={{backgroundColor: "#FFD700"}}
                textStyle={styles.TableText} />
                <Row
                data={SecondTable}
                style={{backgroundColor: "#C0C0C0"}}
                textStyle={styles.TableText} />
                <Row
                data={ThirdTable}
                style={{backgroundColor: "#C9AE5D"}}
                textStyle={styles.TableText} />
                <Rows data={MainDataTable} textStyle={styles.TableText} />
            </Table>
        </View>
        
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressCircle: {
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
  },
  legend: {
    marginHorizontal: 10,
    justifyContent: "center",
  },
  square: {
    height: 13, 
    width: 13,
    marginRight: 10,
    marginLeft: 60,
  },
  container: {
    flexDirection: "column",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 10,
    borderColor: colors.black,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  boldText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
  },
  TableHeader: {
    height: 40,
    alignContent: "center",
    backgroundColor: colors.black,
    marginTop: 10,
  },
  TableHeaderText: {
    margin: 10,
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.white,
  },
  TableText: {
    margin: 10,
    fontSize: 15,
    alignSelf: "center",
  },
});