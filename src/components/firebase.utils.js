import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  updateDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBw9Y6LVcqeKJQhx56QjZFbPhFvb29_6Mg",
    authDomain: "reservation-system-43d03.firebaseapp.com",
    projectId: "reservation-system-43d03",
    storageBucket: "reservation-system-43d03.appspot.com",
    messagingSenderId: "526682468950",
    appId: "1:526682468950:web:5fa1f6c6e04fc111dc41f7",
    measurementId: "G-9RN13Z2JPE"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, "table"+object.id);
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// export const fetchTablesData = async () => {

//   const restaurantsRef = collection(db, 'restaurants');
//   const sampleRestaurantRef = doc(restaurantsRef, 'sample-restaurant');
//   // Fetch the sample restaurant document
//   const sampleRestaurantDoc = await getDoc(sampleRestaurantRef);
//   if (!sampleRestaurantDoc.exists()) {
//     console.log('Sample restaurant document does not exist');
//     return; // Exit function if document does not exist
//   }

//   // Log the data of the sample restaurant document
//   console.log('Sample Restaurant Data:', sampleRestaurantDoc.data().tables);

//   const tablesData = sampleRestaurantDoc.data().tables;


//   // console.log('Tables Data:');
//   // Object.keys(tablesData).forEach(tableId => {
//   //   console.log(tablesData[tableId]);
//   // });

//   return tablesData;
// };

export const fetchTimeByIndex = async (index) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const schedulesRef = doc(sampleRestaurantRef, "tableundefined");
  const schedulesDoc = await getDoc(schedulesRef);
  const times=schedulesDoc.data().times;
  if (schedulesDoc.exists()) {
    times.forEach(time => {
      if (index===time.id){
        return time.time
      }
    });
  } else {
    console.log(`Schedules does not exist.`);
  }
};

export const fetchTables = async (tableNumber) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const tableRef = doc(sampleRestaurantRef, "table"+tableNumber);
  const tableDoc = await getDoc(tableRef);
  if (tableDoc.exists()) {
    return tableDoc.data();
  } else {
    console.log(`Table ${tableNumber} does not exist.`);
  }
};

export const fetchSchedulesTimes = async () => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const schedulesRef = doc(sampleRestaurantRef, "tableundefined");
  const schedulesDoc = await getDoc(schedulesRef);
  if (schedulesDoc.exists()) {
    return schedulesDoc.data().times;
  } else {
    console.log(`Schedules does not exist.`);
  }
};

export const fetchReservationTimes = async (startIndex, endIndex,tableNumber) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  
  const tableRef = doc(sampleRestaurantRef, "tableundefined");
  const tableDoc = await getDoc(tableRef);

  if (tableDoc.exists()) {
    return [tableDoc.data().times[startIndex].time,tableDoc.data().times[endIndex].time];
  } else {
    console.log(`Table ${tableNumber} does not exist.`);
  }

  // console.log(availableTables);

  return;
};

export const fetchTablesAvailability = async (startIndex, endIndex) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  
  const inavailableTables=[];


  for (let i = 1; i <= 10; i++) {
    const tableRef = doc(sampleRestaurantRef, `table${i}`);
    // Fetch the table document
    const tableDoc = await getDoc(tableRef);
    if (tableDoc.exists()) {

      const reservations = tableDoc.data().reservations;
      // console.log(schedules);

      for (let j=0;j<reservations.length;j++){
        if (reservations[j].canceled===undefined && !((reservations[j].startIndex<startIndex && reservations[j].endIndex<startIndex) || (reservations[j].startIndex>endIndex && reservations[j].endIndex>endIndex))){
          inavailableTables.push(i);
          break;
        }
      }

    } else {
      console.log(`Table ${i} does not exist.`);
    }
  }

  // console.log(availableTables);

  return inavailableTables;
};

export const updateTableSchedules = async (startIndex, endIndex, name, phone, tableNumber) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const schedulesRef = doc(sampleRestaurantRef, `tableundefined`);
  const tableRef = doc(sampleRestaurantRef, `table${tableNumber}`);

  try {

    const schedulesDoc = await getDoc(schedulesRef);
    const tableDoc = await getDoc(tableRef);

    if (schedulesDoc.exists() && tableDoc.exists()) {

      const schedulesData = schedulesDoc.data();
      const currentId = schedulesData.idCounter;
      const tableData = tableDoc.data();
      const reservations = tableData.reservations;
      reservations.push({
        name,
        phone,
        startIndex,
        endIndex,
        reservation_id: currentId
      });

      await updateDoc(schedulesRef, {
        'idCounter': currentId+1
      });

      await updateDoc(tableRef, {
        [`reservations`]: reservations
      });

      console.log(`Schedule updated for table ${tableNumber} from index ${startIndex} to index ${endIndex} with reservation id ${currentId+1}`);
    } else {
      console.log(`Schedules or table${tableNumber} does not exist.`);
    }

  } catch (error) {
    console.error("Error schedules or table", error);
  }

};

export const cancelReservationByTableNumber = async (reservationId, tableNumber) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const tableRef = doc(sampleRestaurantRef, `table${tableNumber}`);

  try {

    const tableDoc = await getDoc(tableRef);

    if (tableDoc.exists()) {

      const tableData = tableDoc.data();
      const reservations = tableData.reservations;

      let reservationIndex = -1;
      for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].reservation_id === reservationId) {
          reservationIndex = i;
          break;
        }
      }

      if (reservationIndex !== -1) {
        // Update the canceled field of the reservation
        reservations[reservationIndex].canceled = true;

        // Update the document in Firestore
        await updateDoc(tableRef, { reservations });

        console.log(`Reservation with id: ${reservationId} was canceled for table ${tableNumber}`);
      } else {
        console.log(`Reservation with id: ${reservationId} wasn't found for table ${tableNumber}`);
      }

    } else {
      console.log(`Table${tableNumber} does not exist.`);
    }

  } catch (error) {
    console.error("Error encounter while fetching table doc", error);
  }

};


export const attemptLogin = async (username,password) => {
  try {
    await signInWithEmailAndPassword(auth,username, password);
    console.log('Logged in successfully!');
    return true;
  } catch (error) {
    console.error('Error logging in:', error.message);
    return false;
  }
};