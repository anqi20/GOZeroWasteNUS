import firebase from "../../database/firebaseDB";

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
