import React from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from "../database/firebaseDB";
import moment from "moment"; 

export function renderAllDates(dates) {
  if(dates.length == 1) {
    return (
      <View>
        <Text>({moment(dates[0].date, "DD-MM-YY").format("ddd")}) {dates[0].date}</Text>
      </View>
    )
  } else if(dates.length == 2) {
    return (
      <View>
        <Text>({moment(dates[0].date, "DD-MM-YY").format("ddd")}) {dates[0].date}</Text>
        <Text>({moment(dates[1].date, "DD-MM-YY").format("ddd")}) {dates[1].date}</Text>
      </View>
    )
  } else if(dates.length >= 3) {
    return (
      <View> 
        <Text>({moment(dates[0].date, "DD-MM-YY").format("ddd")}) {dates[0].date}</Text>
        <Text>({moment(dates[1].date, "DD-MM-YY").format("ddd")}) {dates[1].date}</Text>
        <Text>({moment(dates[2].date, "DD-MM-YY").format("ddd")}) {dates[2].date}</Text>
      </View>
    )
  } else {
    <Text></Text>
  }
}