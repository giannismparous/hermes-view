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

  console.log("objectsToAdd length:", objectsToAdd.length);

  for (let i = 0; i < objectsToAdd.length; i++) {
      console.log("i:", i);
      let docRef; // Declare docRef outside the if-else blocks

      if (i === 0) {
          docRef = doc(collectionRef, "data");
      } else if (i === objectsToAdd.length - 1) {
          
          docRef = doc(collectionRef, getCurrentDate());
      } else {
          docRef = doc(collectionRef,"table" + objectsToAdd[i].id);
      }

      batch.set(docRef, objectsToAdd[i]);
  }

  await batch.commit();  
  console.log('added to db');
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based
  const day = currentDate.getDate();
  return `${day}-${month}-${year}`;
}

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
  const currentDateRef = doc(sampleRestaurantRef, getCurrentDate());
  const currentDateDoc = await getDoc(currentDateRef);
  const times=currentDateDoc.data().times;
  if (currentDateDoc.exists()) {
    times.forEach(time => {
      if (index===time.id){
        return time.time
      }
    });
  } else {
    console.log(`Current date does not exist.`);
  }
};

// Fetches table data given the table number

export const fetchTable = async (tableNumber) => {

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
  const currentDateRef = doc(sampleRestaurantRef, getCurrentDate());
  const currentDateDoc = await getDoc(currentDateRef);
  if (currentDateDoc.exists()) {
    return currentDateDoc.data().times;
  } else {
    console.log(`Current date does not exist.`);
  }
};

export const fetchReservations = async () => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const currentDateRef = doc(sampleRestaurantRef, getCurrentDate());
  const currentDateDoc = await getDoc(currentDateRef);
  if (currentDateDoc.exists()) {
    console.log(currentDateDoc.data());
    return currentDateDoc.data().reservations;
  } else {
    console.log(`Current date does not exist.`);
  }
};

export const fetchReservationTimes = async (startIndex, endIndex,tableNumber) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  
  const currentDateRef = doc(sampleRestaurantRef, getCurrentDate());
  const currentDateDoc = await getDoc(currentDateRef);

  if (currentDateDoc.exists()) {
    return [currentDateDoc.data().times[startIndex].time,currentDateDoc.data().times[endIndex].time];
  } else {
    console.log(`CurrentDate does not exist.`);
  }

  // console.log(availableTables);

  return;
};

export const fetchTablesAvailability = async (startIndex, endIndex) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  
  const unavailableTables=[];

  const currentDateRef = doc(sampleRestaurantRef, getCurrentDate());

  const currentDateDoc = await getDoc(currentDateRef);
  if (currentDateDoc.exists()) {
    const reservations = currentDateDoc.data().reservations;
    for (let i=0;i<reservations.length;i++){
      if (unavailableTables.includes(reservations[i].table_id)){
        continue;
      }
      if (reservations[i].canceled===undefined && !((reservations[i].startIndex<startIndex && reservations[i].endIndex<startIndex) || (reservations[i].startIndex>endIndex && reservations[i].endIndex>endIndex))){
        unavailableTables.push(reservations[i].table_id);
      }
    }
  } else {
    console.log(`Current date does not exist.`);
  }
  // console.log(availableTables);

  return unavailableTables;
};

export const updateTableSchedules = async (startIndex, endIndex, name, phone, tableNumber) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const currentDateRef = doc(sampleRestaurantRef, getCurrentDate());
  const dataRef = doc(sampleRestaurantRef, "data");

  try {

    const currentDateDoc = await getDoc(currentDateRef);
    const dataDoc = await getDoc(dataRef);

    if (currentDateDoc.exists() && dataDoc.exists()) {

      const reservations = currentDateDoc.data().reservations;
      const currentId = dataDoc.data().id_counter;

      reservations.push({
        name,
        phone,
        startIndex,
        endIndex,
        reservation_id: currentId,
      });

      console.log(reservations);
      console.log(currentId);

      await updateDoc(dataRef, {
        'idCounter': currentId+1
      });

      console.log(currentId);

      await updateDoc(currentDateRef, {
        [`reservations`]: reservations
      });

      console.log("TELOS");

      console.log(`Current date updated new reservation for table ${tableNumber} from index ${startIndex} to index ${endIndex} with reservation id ${currentId+1}`);
    } else {
      console.log(`Current date or data does not exist.`);
    }

  } catch (error) {
    console.error("Error current date or data", error);
  }

};

export const cancelReservationByTableNumber = async (reservationId) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const currentDateRef = doc(sampleRestaurantRef, getCurrentDate());

  try {

    const currentDateDoc = await getDoc(currentDateRef);

    if (currentDateDoc.exists()) {

      const reservations = currentDateDoc.data().reservations;

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
        await updateDoc(currentDateRef, { reservations });

        console.log(`Reservation with id: ${reservationId} was canceled.`);
      } else {
        console.log(`Reservation with id: ${reservationId} wasn't found.`);
      }

    } else {
      console.log(`Current date does not exist.`);
    }

  } catch (error) {
    console.error("Error encounter while fetching current date doc", error);
  }

};

export const acceptReservationByTableNumber = async (reservationId) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const currentDateRef = doc(sampleRestaurantRef, getCurrentDate());
  try {

    const currentDateDoc = await getDoc(currentDateRef);

    if (currentDateDoc.exists()) {

      const reservations = currentDateDoc.data().reservations;

      let reservationIndex = -1;
      for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].reservation_id === reservationId) {
          reservationIndex = i;
          break;
        }
      }

      if (reservationIndex !== -1) {
        // Update the canceled field of the reservation
        reservations[reservationIndex].accepted = true;

        await updateDoc(currentDateRef, { reservations });

        console.log(`Reservation with id: ${reservationId} was accepted.`);
      } else {
        console.log(`Reservation with id: ${reservationId} wasn't found.`);
      }

    } else {
      console.log(`Current date does not exist.`);
    }

  } catch (error) {
    console.error("Error encounter while fetching current date doc", error);
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