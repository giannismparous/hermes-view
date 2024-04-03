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

export const updateDateAvailability = async (collectionKey) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Function to get all dates of the year
  const getAllDatesOfYear = (year) => {
    const dates = [];
    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
        dates.push(`${day}-${month + 1}-${year}`);
      }
    }
    return dates;
  };

  const allDatesOfYear = getAllDatesOfYear(currentYear);

  const docRef = doc(collectionRef, "data");

  // Fetch the current "data" document to maintain "id_counter"
  const docSnapshot = await getDoc(docRef);
  let idCounter = 0;
  if (docSnapshot.exists()) {
    idCounter = docSnapshot.data().id_counter || 0;
  }

  const tempDates = allDatesOfYear.map((date, index) => {
    const unavailable = Math.random() < 0.5 ? true : undefined; // Randomly set unavailable to true or keep it undefined
    if (unavailable){
      return {
        id: index + 1, // Increment id_counter for each date
        date: date,
        unavailable: unavailable
      };
    }
    else {
      return {
        id: index + 1, // Increment id_counter for each date
        date: date,
      };
    }
  });

  // Update "data" document with new "dates" array and updated "id_counter"
  batch.set(docRef, {
    dates: tempDates,
    id_counter: idCounter + allDatesOfYear.length // Increment id_counter
  });

  await batch.commit();
  console.log('Added dates availability to the database');
};


export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  num
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

export const addDocumentToDatabase = async (
  docToAdd,
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);


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

// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd,
//   num
// ) => {
//   const batch = writeBatch(db);
//   const collectionRef = collection(db, collectionKey);

//   console.log("objectsToAdd length:", objectsToAdd.length);

//   const currentDate = new Date();
//   for (let i = 0; i < num; i++) {
//     const date = new Date(currentDate); // Create a new date object for each iteration
//     date.setDate(date.getDate() + i); // Add 'i' days to the current date

//     console.log("Processing date:", date);

//     const dateString = formatDate(date); // Format the date string

//     const docRef = doc(collectionRef, dateString);
//     for (let j = 0; j < objectsToAdd.length; j++) {
//       console.log("i:", j);
//       let docRef; // Declare docRef outside the if-else blocks

//       if (j === 0) {
//           docRef = doc(collectionRef, "data");
//       } else if (j === objectsToAdd.length - 1) {
          
//           docRef = doc(collectionRef, getCurrentDate());
//       } else {
//           docRef = doc(collectionRef,"table" + objectsToAdd[j].id);
//       }

//       batch.set(docRef, objectsToAdd[j]);
//   }
//   }

//   await batch.commit();  
//   console.log('added to db');
// };

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based
  const day = date.getDate();
  return `${day}-${month}-${year}`;
}

export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based
  const day = currentDate.getDate();
  return `${day}-${month}-${year}`;
}

export const getDateRange = (num) => {
  const currentDate = new Date();
  const dates = [];

  for (let i = 0; i <= num; i++) {
    const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based
    const day = date.getDate();
    dates.push(`${day}-${month}-${year}`);
  }

  return dates;
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

export const fetchDatesAvailability = async (date, num) => {
  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const dataRef = doc(sampleRestaurantRef, "data");
  const dataDoc = await getDoc(dataRef);
  // if (dataDoc.exists()) {
  //   const data = dataDoc.data();
  //   console.log(data);
  //   let currentIndex=0;
  //   if (data && data.dates && Array.isArray(data.dates)) {
  //     const availability = [];
  //     for (let i = 0; i < data.dates.length; i++) {
  //       if (date===data.dates[i].date){
  //         currentIndex=i;
  //         break;
  //       }
  //     }
  //     for (let i = currentIndex; i < currentIndex+num; i++) {
  //       if (data.dates[i].unavailable===undefined){
  //         availability.push(true);
  //       }
  //       else {
  //         availability.push(false);
  //       }
  //     }
  //     console.log(dataDoc);
  //     return availability;
  //   } else {
  //     console.log('Dates array is missing or not an array.');
  //   }
    const availability=[];
    availability.push(true);
    return availability;
  // } else {
  //   console.log(`Current date does not exist.`);
  // }
};

export const fetchTimeByIndex = async (index, date) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const currentDateRef = doc(sampleRestaurantRef, date);
  const currentDateDoc = await getDoc(currentDateRef);
  if (currentDateDoc.exists()) {
    const times=currentDateDoc.data().times;
    times.forEach(time => {
      if (index===time.id){
        return time.time
      }
    });
  } else {
    console.log(`Current date does not exist.`);
  }
};

export const dateExists = async (date) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const dateRef = doc(sampleRestaurantRef, date);
  const dateDoc = await getDoc(dateRef);
  if (dateDoc.exists()) {
    console.log(`${date} exists.`);
    return true;
  } else {
    console.log(`${date} does not exist.`);
    return false;
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

export const fetchSchedulesTimes = async (date) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const currentDateRef = doc(sampleRestaurantRef, date);
  const currentDateDoc = await getDoc(currentDateRef);
  if (currentDateDoc.exists()) {
    return currentDateDoc.data().times;
  } else {
    console.log(`Current date does not exist.`);
  }
};

export const fetchReservations = async (date) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const currentDateRef = doc(sampleRestaurantRef, date);
  const currentDateDoc = await getDoc(currentDateRef);
  if (currentDateDoc.exists()) {
    console.log(currentDateDoc.data());
    return currentDateDoc.data().reservations;
  } else {
    console.log(`Current date does not exist.`);
  }
};

export const fetchReservationTimes = async (startIndex, endIndex,date) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  
  // const currentDateRef = doc(sampleRestaurantRef, date);
  const currentDateRef = doc(sampleRestaurantRef, "data");
  const currentDateDoc = await getDoc(currentDateRef);

  if (currentDateDoc.exists()) {
    return [currentDateDoc.data().times[startIndex].time,currentDateDoc.data().times[endIndex].time];
  } else {
    console.log(`CurrentDate does not exist.`);
  }

  // console.log(availableTables);

  return;
};

export const fetchTablesAvailability = async (startIndex, endIndex, date) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  
  const unavailableTables=[];

  const currentDateRef = doc(sampleRestaurantRef, date);

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

export const updateTableSchedules = async (startIndex, endIndex, name, phone, tableNumber, date) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const currentDateRef = doc(sampleRestaurantRef, date);
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
        table_id: tableNumber,
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

export const cancelReservationByTableNumber = async (reservationId, date) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const currentDateRef = doc(sampleRestaurantRef, date);

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

export const acceptReservationByTableNumber = async (reservationId, date) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  const currentDateRef = doc(sampleRestaurantRef, date);
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