import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import { firebaseLooper } from "./Components/ui/misc";
import { IMatch } from "./models/IMatch";
import "firebase/auth";
import "firebase/storage";
import { ITeam } from "./models/ITeam";
import IPlayer from "./models/IPlayer";

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
const firebaseTeams = firebaseDB.ref("teams");
const firebasePlayers = firebaseDB.ref("players");
const firebaseStorage = firebaseDB.ref("storage");

const getFireBaseStorage = (storagePath: string) => {
  return firebaseDB.ref(storagePath);
};

/**************************Players********************************** */
const getPlayers = async (): Promise<IPlayer[]> => {
  const snapshot = await firebasePlayers.once("value");
  return firebaseLooper(snapshot);
};

/*****************************End players***************************** */

const getMatches = async (limitTo: number): Promise<IMatch[]> => {
  //const eventref= firebaseDB.ref('matches');
  const snapshot = await firebaseMatches.limitToLast(limitTo).once("value");
  return firebaseLooper(snapshot);
};
const getMatchById = async (matchId: string): Promise<IMatch | undefined> => {
  try {
    const snapshot = await firebaseDB.ref(`matches/${matchId}`).once("value");
    const match = snapshot.val();

    return match;
  } catch (error) {
    console.log(error);
  }
};

const updateMatchById = async (matchId: string, dataToSubmit: any) => {
  try {
    const response = await firebaseDB
      .ref(`matches/${matchId}`)
      .update(dataToSubmit);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
const addMatch = async (dataToSubmit: any) => {
  try {
    await firebaseDB.ref("matches").push(dataToSubmit);

    //return respons
  } catch (error) {
    throw new Error(error);
  }
};
const getTeamOptions = async (
  matchId: string
): Promise<{ key: string; value: string }[]> => {
  let teamOptions: { key: string; value: string }[] = [];
  try {
    const snapshot = await firebaseDB.ref(`matches/${matchId}`).once("value");
    if (snapshot) {
      //console.log(snapshot);
      const match: IMatch = snapshot.val() as IMatch;
      //console.log(match);
      const teams = await getTeams(match, "Edit Team");
      teams.forEach((team: ITeam) => {
        // console.log(team.shortName);
        //console.log(team);
        teamOptions.push({
          key: team.shortName,
          value: team.shortName
        });
      });
    }
  } catch (error) {
    console.log("error on getTeamOptions" + error);
  }
  return teamOptions;
};
const getTeams = async (match: IMatch, type: string): Promise<ITeam[]> => {
  let teams: ITeam[] = {} as any;
  try {
    const snapshot = await firebaseTeams.once("value");
    teams = firebaseLooper(snapshot);
    //console.log(teams);
  } catch (error) {
    console.log(error);
  }
  return teams;
};

const getMatchById1 = (matchId: string): IMatch => {
  let match: IMatch = {} as any;
  firebaseDB
    .ref(`matches/${matchId}`)
    .once("value")
    .then(snapshot => {
      match = snapshot.val();
      console.log(match);
    });
  return match;
};

export {
  firebaseDB,
  firebaseMatches,
  getMatches,
  firebasePromotions,
  firebaseAuth,
  firebaseTeams,
  getMatchById,
  getTeamOptions,
  getTeams,
  updateMatchById,
  addMatch,
  firebasePlayers,
  getPlayers,
  getFireBaseStorage
};
//getMatches();

/*const snapShot= await firebaseDB.ref('matches').once('value');
  firebaseDB.ref('matches').once('value').then((snapshot)=>{
    console.log(snapshot);
  });
*/
