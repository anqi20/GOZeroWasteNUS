import firebase from "../../database/firebaseDB";
import moment from "moment";

export function uploadByoData(uid, numCups, numContainers, setError) {
  const userRef = firebase.firestore().collection("users").doc(uid);
  const totalCount = numCups + numContainers;
  userRef
    .update({
      byo: firebase.firestore.FieldValue.increment(totalCount),
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });

  const overallRef = firebase
    .firestore()
    .collection("overall")
    .doc("overallStats");
  overallRef.update({
    totalBYOs: firebase.firestore.FieldValue.increment(numContainers + numCups),
  });
  console.log("Updated byo count!");
}

// Update the user's number of coins earned
export function updateCoins(uid, coinsEarned) {
  const userRef = firebase.firestore().collection("users").doc(uid);
  userRef
    .update({
      coin: firebase.firestore.FieldValue.increment(coinsEarned),
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
  console.log("Updated coins earned!");
}

export function addByoToLogs(uid, numCups, numContainers, stall) {
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
                location: stall,
                time: currTime,
                date: currDate,
                type: "byo",
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
                location: stall,
                time: currTime,
                date: currDate,
                type: "byo",
              },
            ],
          },
          { merge: true }
        );
      }
      console.log("BYO data successfully added to logs!");
    })
    .catch((error) => {
      console.log(error);
    });
}
