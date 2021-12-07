import React, { useState, useEffect } from "react";
import firebase from "../../database/firebaseDB";
import moment from "moment";

// Set stall details
export function setStallDetails(
  stallName,
  setContainersBoolean,
  setCupsBoolean
) {
  firebase
    .firestore()
    .collection("stalls")
    .doc(stallName)
    .get()
    .then((document) => {
      if (document.exists) {
        setContainersBoolean(document.data().hasContainer);
        setCupsBoolean(document.data().hasCup);
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error getting stall details: ", error);
    });
}

// Set quotas of cup and containers
export function setQuotas(setCupQuota, setContainerQuota) {
  firebase
    .firestore()
    .collection("overall")
    .doc("overallStats")
    .get()
    .then((document) => {
      if (document.exists) {
        setCupQuota(document.data().cupQuota);
        setContainerQuota(document.data().containerQuota);
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error getting stall details: ", error);
    });
}

// Helper function for uploadBorrowData
function addCupDates(uid, cups) {
  const currDate = moment().format("DD/MM/YYYY");
  const currTime = moment().format("hh:mm a");
  const userRef = firebase.firestore().collection("users").doc(uid);
  userRef
    .get()
    .then((document) => {
      const retrievedData = document.data().cupDate;
      if (retrievedData == undefined) {
        userRef.set(
          {
            cupDate: [
              {
                time: currTime,
                numCups: cups,
                date: currDate,
              },
            ],
          },
          { merge: true }
        );
      } else {
        userRef.set(
          {
            cupDate: [
              { time: currTime, numCups: cups, date: currDate },
              ...retrievedData,
            ],
          },
          { merge: true }
        );
      }
      console.log("Borrow data successfully added for cup!");
    })
    .catch((error) => {
      console.log(error);
    });
}

// Helper function for uploadBorrowData
function addContainerDates(uid, containers) {
  const currDate = moment().format("DD/MM/YYYY");
  const currTime = moment().format("hh:mm a");
  const userRef = firebase.firestore().collection("users").doc(uid);
  userRef
    .get()
    .then((document) => {
      const retrievedData = document.data().containerDate;
      if (retrievedData == undefined) {
        userRef.set(
          {
            containerDate: [
              {
                time: currTime,
                numContainers: containers,
                date: currDate,
              },
            ],
          },
          { merge: true }
        );
      } else {
        userRef.set(
          {
            containerDate: [
              { time: currTime, numContainers: containers, date: currDate },
              ...retrievedData,
            ],
          },
          { merge: true }
        );
      }
      console.log("Borrow data successfully added for container!");
    })
    .catch((error) => {
      console.log(error);
    });
}

// Helper function for uploadBorrowData
function updateTotalCups(uid, numCups) {
  const userRef = firebase.firestore().collection("users").doc(uid);
  userRef.update({
    numCup: firebase.firestore.FieldValue.increment(numCups),
  });
}

// Helper function for uploadBorrowData
function updateTotalContainers(uid, numContainers) {
  const userRef = firebase.firestore().collection("users").doc(uid);
  userRef.update({
    numContainer: firebase.firestore.FieldValue.increment(numContainers),
  });
}

// Upload date that each item is borrowed
export function uploadBorrowData(uid, numCups, numContainers) {
  if (numCups > 0 && numContainers > 0) {
    // Both cups and containers are selected
    for (let i = 0; i < numCups; i++) {
      addCupDates(uid, numCups);
    }
    for (let i = 0; i < numContainers; i++) {
      addContainerDates(uid, numContainers);
    }
    updateTotalCups(uid, numCups);
    updateTotalContainers(uid, numContainers);
  } else if (numCups > 0) {
    // Only cups are selected
    for (let i = 0; i < numCups; i++) {
      addCupDates(uid, numCups);
    }
    updateTotalCups(uid, numCups);
  } else if (numContainers > 0) {
    // Only containers are selected
    for (let i = 0; i < numContainers; i++) {
      addContainerDates(uid, numContainers);
    }
    updateTotalContainers(uid, numContainers);
  } else {
    return null;
  }
}
