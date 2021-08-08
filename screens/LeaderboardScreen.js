import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../assets/colors";
import { Table, Row, Rows } from "react-native-table-component";
import { globalStyles } from "../assets/globalStyles";

export default class LeaderboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HeaderTable: ["#Rank", "Name", "Number", "Faculty"],
      DataTable: [
        ["#1", "John Lim", "103", "FoE"],
        ["#2", "John Lim", "103", "FoE"],
        ["#3", "John Lim", "103", "FoE"],
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

    const ConstraintDataTable = this.nameConstraint(this.state.DataTable)

    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={globalStyles.header}>Leaderboard</Text>
        <View style={styles.container}>
          {/*Crown icon + total count text*/}
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

          {/*Table*/}
          <View>
            <Table>
              <Row
                data={this.state.HeaderTable}
                style={styles.TableHeader}
                textStyle={styles.TableHeaderText}
              />
              <Rows data={ConstraintDataTable} textStyle={styles.TableText} />
            </Table>
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.black,
    marginVertical: 20,
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
    backgroundColor: colors.lightGrey,
    marginVertical: 10,
  },
  TableHeaderText: {
    margin: 10,
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
  TableText: {
    margin: 10,
    fontSize: 15,
    alignSelf: "center",
  },
});
