import React from "react";
import { View, Text } from "react-native";
import firebase from "../database/firebaseDB";
import moment from "moment";
import { Alert, BackHandler } from "react-native";

// Get user's coins
export function getCoins(uid, setCoins) {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((document) => {
      if (document.exists) {
        setCoins(document.data().coin);
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error getting coin details: ", error);
    });
}

// Get user details
export function getUpdatedUserData(uid, updateUserData) {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((document) => {
      if (document.exists) {
        updateUserData(document.data());
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error in getting user details: ", error);
    });
}

// Set announcement details
export function setAnnouncementDetail(setAnnouncement) {
  firebase
    .firestore()
    .collection("overall")
    .doc("overallStats")
    .get()
    .then((document) => {
      if (document.exists) {
        setAnnouncement(document.data().announcement);
      } else {
        console.log("No such document (overallStats)");
      }
    })
    .catch((error) => {
      console.log("Error getting announcement details: ", error);
    });
}

export function renderAllDates(dates) {
  if (dates.length == 1) {
    return (
      <View>
        <Text>
          ({moment(dates[0].dueDate, "DD/MM/YYYY").format("ddd")}){" "}
          {dates[0].dueDate}
        </Text>
      </View>
    );
  } else if (dates.length == 2) {
    return (
      <View>
        <Text>
          ({moment(dates[0].dueDate, "DD/MM/YYYY").format("ddd")}){" "}
          {dates[0].dueDate}
        </Text>
        <Text>
          ({moment(dates[1].dueDate, "DD/MM/YYYY").format("ddd")}){" "}
          {dates[1].dueDate}
        </Text>
      </View>
    );
  } else if (dates.length >= 3) {
    return (
      <View>
        <Text>
          ({moment(dates[0].dueDate, "DD/MM/YYYY").format("ddd")}){" "}
          {dates[0].dueDate}
        </Text>
        <Text>
          ({moment(dates[1].dueDate, "DD/MM/YYYY").format("ddd")}){" "}
          {dates[1].dueDate}
        </Text>
        <Text>
          ({moment(dates[2].dueDate, "DD/MM/YYYY").format("ddd")}){" "}
          {dates[2].dueDate}
        </Text>
      </View>
    );
  } else {
    <Text></Text>;
  }
}

export const backActionHandler = () => {
  Alert.alert("Alert!", "Are you sure you want to exit app?", [
    {
      text: "Cancel",
      onPress: () => null,
    },
    { text: "YES", onPress: () => BackHandler.exitApp() },
  ]);
  return true;
};
