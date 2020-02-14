import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import { firebaselooper } from "./Components/ui/misc";
import { IMatch } from "./models/IMatch";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-3NUj9I6NQbiy5KQjn3_312qXWfQkgGs",
  authDomain: "mcity-3574c.firebaseapp.com",
  databaseURL: "https://mcity-3574c.firebaseio.com",
  projectId: "mcity-3574c",
  storageBucket: "mcity-3574c.appspot.com",
  messagingSenderId: "1003585116610",
  appId: "1:1003585116610:web:acc006d7da8c5e8bb01e5b",
  measurementId: "G-MZ9344B0ZN"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firebaseDB = firebase.database();
const firebaseAuth = firebase.auth();
const firebaseMatches = firebaseDB.ref("matches");
const firebasePromotions = firebaseDB.ref("promotions");

const getMatches = async (limitTo: number): Promise<IMatch[]> => {
  //const eventref= firebaseDB.ref('matches');
  const snapshot = await firebaseMatches.limitToLast(limitTo).once("value");
  return firebaselooper(snapshot);
};

export {
  firebaseDB,
  firebaseMatches,
  getMatches,
  firebasePromotions,
  firebaseAuth
};
//getMatches();

/*const snapShot= await firebaseDB.ref('matches').once('value');
  firebaseDB.ref('matches').once('value').then((snapshot)=>{
    console.log(snapshot);
  });
*/
