import firebase from "../../database/firebaseDB";

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
