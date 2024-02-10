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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
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
     const docRef = doc(collectionRef, object.title.toLowerCase());
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

export const fetchTablesData = async () => {

  const restaurantsRef = collection(db, 'restaurants');
  const sampleRestaurantRef = doc(restaurantsRef, 'sample-restaurant');
  // Fetch the sample restaurant document
  const sampleRestaurantDoc = await getDoc(sampleRestaurantRef);
  if (!sampleRestaurantDoc.exists()) {
    console.log('Sample restaurant document does not exist');
    return; // Exit function if document does not exist
  }

  // Log the data of the sample restaurant document
  console.log('Sample Restaurant Data:', sampleRestaurantDoc.data().tables);

  const tablesData = sampleRestaurantDoc.data().tables;


  // console.log('Tables Data:');
  // Object.keys(tablesData).forEach(tableId => {
  //   console.log(tablesData[tableId]);
  // });

  return tablesData;
};

export const fetchTablesAvailability = async (startIndex, endIndex) => {

  const sampleRestaurantRef = collection(db, 'sample-restaurant');
  
  const availableTables=[];


  for (let i = 1; i <= 10; i++) {
    const tableRef = doc(sampleRestaurantRef, `table${i}`);
    // Fetch the table document
    const tableDoc = await getDoc(tableRef);
    let available=true;
    if (tableDoc.exists()) {

      const schedules = tableDoc.data().schedules.slice(startIndex,endIndex);
      console.log(schedules);

      for (let j=0;j<schedules.length;j++){
        if (schedules[j].name!==null){
          available=false;
          break;
        }
      }

      if (available){
        availableTables.push(i);
      } 

    } else {
      console.log(`Table ${i} does not exist.`);
    }
  }
  console.log(availableTables);
};