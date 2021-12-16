import firebase from "../../database/firebaseDB";
import moment from "moment"; 

// Set stall names
export function setStallNames(setLocation, setStalls, locations) {
  // Find all location names 
  firebase
    .firestore()
    .collection("stalls")
    .doc("allLocation")
    .get()
    .then((document) => {
      console.log("Getting information of all stalls")
      setLocation(document.data().allLocation)
    })

  // Find all stall names 
  for(let i=0; i<locations.length; i++) {
    firebase
    .firestore()
    .collection("stalls")
    .where("location", "==", locations[i])
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setStalls(doc.id, "=>", doc.data().stallName())
      })
    })
    .catch((error) => {
      console.log("Error getting stalls document: ", error)
    })
  }
}


  //Get stall names from database
  /*useEffect(() => {
    //Find all the location names 
    firebase.firestore().collection("stalls").doc("allLocation")
      .get()
      .then((document) => {
        setLocation(document.data().allLocation)
      })

    firebase.firestore().collection("stalls").where("location", "==", "TechnoEdge")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data())
        })
      })
    .catch((error) => {
      console.log("Error getting documents: ", error)
    });
  })*/