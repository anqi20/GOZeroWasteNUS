import firebase from "../../database/firebaseDB";
import moment from "moment";

// Set stall details
export function setStallDetails(
  stallid,
  setContainersBoolean,
  setCupsBoolean,
  setStallName
) {
  firebase
    .firestore()
    .collection("stalls")
    .doc(stallid)
    .get()
    .then((document) => {
      if (document.exists) {
        setStallName(document.data().stallName);
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
  // Update quota
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
        console.log("No such document (overallStats)");
      }
    })
    .catch((error) => {
      console.log("Error getting quota details: ", error);
    });
}

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

// Helper function for uploadBorrowData
function addCupDates(uid, cups, setError) {
  const currDate = moment().format("DD/MM/YYYY");
  const dueDate = moment().add(7, "d").format("DD/MM/YYYY"); // Due date is 7 days away from borrow date
  const currTime = moment().format("hh:mm:ss a");
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
                dueDate: dueDate,
              },
            ],
          },
          { merge: true }
        );
      } else {
        userRef.set(
          {
            cupDate: [
              ...retrievedData,
              {
                time: currTime,
                numCups: cups,
                date: currDate,
                dueDate: dueDate,
              },
            ],
          },
          { merge: true }
        );
      }
      updateTotalCups(uid, cups);
      console.log("Borrow data successfully added for cup!");
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
}

// Helper function for uploadBorrowData
function addContainerDates(uid, containers, setError) {
  const currDate = moment().format("DD/MM/YYYY");
  const dueDate = moment().add(7, "d").format("DD/MM/YYYY"); // Due date is 7 days away from borrow date
  const currTime = moment().format("hh:mm:ss a");
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
                dueDate: dueDate,
              },
            ],
          },
          { merge: true }
        );
      } else {
        userRef.set(
          {
            containerDate: [
              ...retrievedData,
              {
                time: currTime,
                numContainers: containers,
                date: currDate,
                dueDate: dueDate,
              },
            ],
          },
          { merge: true }
        );
      }
      updateTotalContainers(uid, containers);
      console.log("Borrow data successfully added for container!");
    })
    .catch((error) => {
      console.log(error);
      setError(true);
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
export function uploadBorrowData(uid, numCups, numContainers, setError) {
  const overallRef = firebase
    .firestore()
    .collection("overall")
    .doc("overallStats");
  overallRef.update({
    totalBorrows: firebase.firestore.FieldValue.increment(
      numContainers + numCups
    ),
  });
  if (numCups > 0 && numContainers > 0) {
    // Both cups and containers are selected
    addCupDates(uid, numCups, setError);
    addContainerDates(uid, numContainers, setError);
  } else if (numCups > 0) {
    // Only cups are selected
    addCupDates(uid, numCups, setError);
  } else if (numContainers > 0) {
    // Only containers are selected
    addContainerDates(uid, numContainers, setError);
  } else {
    return null;
  }
}

export function addBorrowToLogs(uid, numCups, numContainers, stall) {
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
                type: "borrow",
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
                type: "borrow",
              },
            ],
          },
          { merge: true }
        );
      }
      console.log("Borrow data successfully added to logs!");
    })
    .catch((error) => {
      console.log(error);
    });
}
