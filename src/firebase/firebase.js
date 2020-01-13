import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const  config = {
  apiKey: "AIzaSyDzS0MikOvFnmVmKUTxsMtRYhbAok3bzE8",
  authDomain: "producthunts-cf964.firebaseapp.com",
  databaseURL: "https://producthunts-cf964.firebaseio.com",
  projectId: "producthunts-cf964",
  storageBucket: "producthunts-cf964.appspot.com",
  messagingSenderId: "622358695413",
  appId: "1:622358695413:web:f621101911d69db573a4bc",
  measurementId: "G-7BX7WDR9FT"
      };


firebase.initializeApp(config);
export const db = firebase.firestore();
export const auth = firebase.auth();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;