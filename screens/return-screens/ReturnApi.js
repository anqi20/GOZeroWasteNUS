import firebase from "../../database/firebaseDB";
import moment from "moment";

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

// Get and manipulate return date data for cups
// Update dates, cupReturned, numCup fields
function handleCupReturn(uid, numCups, setError) {
  const userRef = firebase.firestore().collection("users").doc(uid);
  userRef
    .get()
    .then((document) => {
      if (document.exists) {
        const borrowData = document.data().cupDate;

        // Update total numCup field
        userRef.update({
          numCup: firebase.firestore.FieldValue.increment(-numCups),
        });

        // Update cupReturned field
        // userRef.update({
        //   cupReturned: firebase.firestore.FieldValue.increment(numCups),
        // });

        // console.log("Overall borrow data in cup return loop:");
        // console.log(borrowData);
        // If there are still returned cups to subtract from borrow data
        while (numCups > 0) {
          const currData = borrowData.shift();
          // console.log("Current data in cup return loop:");
          // console.log(currData);
          if (currData.numCups <= numCups) {
            // If there are equal/more cups returned than in currData, remove entire entry
            console.log("Removing entire current entry");
            userRef.update({
              cupDate: firebase.firestore.FieldValue.arrayRemove({
                date: currData.date,
                time: currData.time,
                dueDate: currData.dueDate,
                numCups: currData.numCups,
              }),
            });
            numCups -= currData.numCups;
          } else {
            // If there are less cups returned than in currData, just update numCups field
            borrowData.shift(); // Removing the first entry in the overall borrow data
            // console.log("Remaining data:");
            // console.log(borrowData);
            console.log("Updating numCups field in current entry");
            userRef.set(
              {
                cupDate: [
                  {
                    date: currData.date,
                    time: currData.time,
                    dueDate: currData.dueDate,
                    numCups: currData.numCups - numCups,
                  },
                  ...borrowData,
                ],
              },
              { merge: true }
            );
            numCups = 0;
          }
        }
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error handling cup return data: ", error);
      // setError(true);
    });
}

// Get and manipulate return date data for containers
// Update dates, containerReturned, numContainer fields
function handleContainerReturn(uid, numContainers, setError) {
  const userRef = firebase.firestore().collection("users").doc(uid);
  userRef
    .get()
    .then((document) => {
      if (document.exists) {
        const borrowData = document.data().containerDate;

        // Update total numContainer field
        userRef.update({
          numContainer: firebase.firestore.FieldValue.increment(-numContainers),
        });

        // Update containerReturned field
        // userRef.update({
        //   containerReturned:
        //     firebase.firestore.FieldValue.increment(numContainers),
        // });

        // console.log("Overall borrow data in container return loop:");
        // console.log(borrowData);
        // If there are still returned cups to subtract from borrow data
        while (numContainers > 0) {
          // console.log("Overall borrow data in container return loop:");
          // console.log(borrowData);
          const currData = borrowData.shift();
          // console.log("Current data in container return loop:");
          // console.log(currData);
          if (currData.numContainers <= numContainers) {
            // If there are equal/more containers returned than in currData, remove entire entry
            console.log("Removing entire current entry");
            userRef.update({
              containerDate: firebase.firestore.FieldValue.arrayRemove({
                date: currData.date,
                time: currData.time,
                dueDate: currData.dueDate,
                numContainers: currData.numContainers,
              }),
            });
            numContainers -= currData.numContainers;
          } else {
            // If there are less containers returned than in currData, just update numContainers field
            borrowData.shift(); // Removing the first entry in the overall borrow data
            // console.log("Remaining data:");
            // console.log(borrowData);
            // console.log("Updating numCups field in current entry");
            userRef.set(
              {
                containerDate: [
                  {
                    date: currData.date,
                    time: currData.time,
                    dueDate: currData.dueDate,
                    numContainers: currData.numContainers - numContainers,
                  },
                  ...borrowData,
                ],
              },
              { merge: true }
            );
            numContainers = 0;
          }
        }
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error handling container return data: ", error);
      // setError(true);
    });
}

export function updateReturnData(uid, numCups, numContainers, setError) {
  const overallRef = firebase
    .firestore()
    .collection("overall")
    .doc("overallStats");
  overallRef.update({
    totalReturns: firebase.firestore.FieldValue.increment(
      numContainers + numCups
    ),
  });

  handleCupReturn(uid, numCups, setError);
  handleContainerReturn(uid, numContainers, setError);
}

export function addReturnToLogs(uid, numCups, numContainers, location) {
  const currTime = moment().format("hh:mm:ss a");
  const currDate = moment().format("DD/MM/YYYY");
  const userRef = firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("logs")
    .doc("logsDoc");
  userRef
    .get()
    .then((document) => {
      const retrievedData = document.data().logsArray;
      if (retrievedData == undefined) {
        userRef.set(
          {
            logsArray: [
              {
                container: numContainers,
                cup: numCups,
                description: "",
                location: location,
                time: currTime,
                date: currDate,
                type: "return",
              },
            ],
          },
          { merge: true }
        );
      } else {
        userRef.set(
          {
            logsArray: [
              ...retrievedData,
              {
                container: numContainers,
                cup: numCups,
                description: "",
                location: location,
                time: currTime,
                date: currDate,
                type: "return",
              },
            ],
          },
          { merge: true }
        );
      }
      console.log("Return data successfully added to logs!");
    })
    .catch((error) => {
      console.log(error);
    });
}

export function addClaimToLogs(uid, numCups, numContainers, location) {
  const currTime = moment().format("hh:mm:ss a");
  const currDate = moment().format("DD/MM/YYYY");
  const userRef = firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("logs")
    .doc("logsDoc");
  userRef
    .get()
    .then((document) => {
      const retrievedData = document.data().logsArray;
      if (retrievedData == undefined) {
        userRef.set(
          {
            logsArray: [
              {
                container: numContainers,
                cup: numCups,
                description: "",
                location: location,
                time: currTime,
                date: currDate,
                type: "claim",
              },
            ],
          },
          { merge: true }
        );
      } else {
        userRef.set(
          {
            logsArray: [
              ...retrievedData,
              {
                container: numContainers,
                cup: numCups,
                description: "",
                location: location,
                time: currTime,
                date: currDate,
                type: "claim",
              },
            ],
          },
          { merge: true }
        );
      }
      console.log("Return claim data successfully added to logs!");
    })
    .catch((error) => {
      console.log(error);
    });
}
