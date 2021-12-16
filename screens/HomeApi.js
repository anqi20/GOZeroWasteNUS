import firebase from "../database/firebaseDB";

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
