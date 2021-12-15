import firebase from "../../database/firebaseDB";

// Get number of reusables that are already borrowed
export function getBorrowedNum(uid, setBorrowedCup, setBorrowedContainer) {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((document) => {
      if (document.exists) {
        setBorrowedCup(document.data().numCup);
        setBorrowedContainer(document.data().numContainer);
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error getting borrowed num details: ", error);
    });
}

// Update the user's number of coins earned
export function updateCoins(uid, coinsEarned) {
  //   return null;
  const userRef = firebase.firestore().collection("users").doc(uid);
  userRef.update({
    coin: firebase.firestore.FieldValue.increment(coinsEarned),
  });
  console.log("Updated coins earned!");
}

// Check if user is eligible for welcome gift
function isEligible() {
  firebase
    .firestore()
    .collection("overall")
    .doc("overallStats")
    .get()
    .then((document) => {
      if (document.exists) {
        if (document.data().welcomeThreshold >= 1) {
          return true;
        } else {
          return false;
        }
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error getting borrowed welcomeThreshold details: ", error);
    });
}

// Decreases welcomeThreshold by 1 and awards gift if eligible
export function awardWelcomeGift() {
  if (isEligible()) {
    // User is eligible for welcome gift
    // Add object to rewardData copy in user
    // Reduce the welcomeThreshold by 1
    const overallRef = firebase
      .firestore()
      .collection("overall")
      .doc("overallStats");
    overallRef.update({
      welcomeThreshold: firebase.firestore.FieldValue.increment(-1),
    });
  } else {
    // User is not eligible for welcome gift
    return null;
  }
}

// Get and manipulate return date data
function handleCupReturn(uid, numCups, setError) {
  return null;
  // const userRef = firebase.firestore().collection("users").doc(uid);
  // userRef
  //   .get()
  //   .then((document) => {
  //     if (document.exists) {
  //       const borrowData = document.data().cupDate;
  //       console.log(`Overall borrow data in cup return loop ${borrowData}`);
  //       // If there are still returned cups to subtract from borrow data

  //       while (numCups > 0) {
  //         const currData = borrowData[0];
  //         console.log(`Current data in cup return loop ${currData}`);
  //         if (currData.numCups <= numCups) {
  //           // If there are equal/more cups returned than in currData, remove entire entry

  //         } else {
  //           // If there are less cups returned than in currData, just update numCups field
  //           userRef.set({
  //             cupDate: [{
  //               time: currData.time,
  //               numCups: currData.numCups - numCups,
  //               date: currData.date,
  //             }, ...]
  //           });
  //         }
  //       }
  //     } else {
  //       console.log("No such document");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Error handling cup return data: ", error);
  //     // setError(true);
  //   });
}

export function updateReturnData(uid, numCups, numContainers, setError) {
  // Reduce numContainer
  // Reduce numCup
  // Get rid of dates that have already been returned
  return null;
}
