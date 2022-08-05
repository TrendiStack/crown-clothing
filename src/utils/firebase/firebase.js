import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPP9SpqP4oF7YdoDi5r_IDKCO4pSFFDHU",
  authDomain: "crown-clothing-db-b1060.firebaseapp.com",
  projectId: "crown-clothing-db-b1060",
  storageBucket: "crown-clothing-db-b1060.appspot.com",
  messagingSenderId: "61477353167",
  appId: "1:61477353167:web:4ebcf92c30f451471969ba",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//This function allows you to selected a google account to log in with
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
//This function determines signing in with google will be a popup window
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

//Function to create a new Collection and Document
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Done");
};

//This function allow to call a specific Collection and Document from firebase
//and work with it
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

//This Function creates a Collection called user and created a Document for that user
//if the user in question does not exist
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot.exists());

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
      console.log(("error creating the user", error.message));
    }

    return userDocRef;
  }

  // if user data exist
  //return back userDocREf

  //if user data does not exit
  //create / set the document with the data userAuth in my collection
};

//This function creates a user with a given Email and Password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

//This function signs in a user with a given Email and Password
export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//This function signs out the user
export const signOutUser = async () => {
  return await signOut(auth);
};

//This function listens to see if a user in currently signed
//The function is used to keep the state of logged if the page is refreshed
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
