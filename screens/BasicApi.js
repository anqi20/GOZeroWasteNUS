import React from "react";
import { View, Text } from "react-native";
import firebase from "../database/firebaseDB";
import moment from "moment"; 

// Set announcement details 
export function setAnnouncementDetail(setAnnouncement) {
  firebase
    .firestore()
    .collection("overall")
    .doc("overallStats")
    .get()
    .then((document) => {
      if(document.exists) {
        setAnnouncement(document.data().announcement);
      } else {
        console.log("No such document (overallStats)")
      }
    })
    .catch((error) => {
      console.log("Error getting announcement details: ", error);
    })
}

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