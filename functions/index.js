import "babel-polyfill";

import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
firebase.initializeApp(functions.config().firebase);

exports.createData = functions.auth.user().onCreate(async event => {
  const user = event.data;

  const discipline = (await firebase
    .database()
    .ref("discipline/")
    .once("value")).val();

  const items = Object.keys(discipline).reduce((prev, key) => {
    prev.push(...getItems(discipline[key]));
    return prev;
  }, []);

  const toReview = items.reduce((prev, item) => {
    prev[item] = true;
    return prev;
  }, {});

  // Configure everything for the user.
  await firebase
    .database()
    .ref("users/" + user.uid + "/toReview")
    .set(toReview);
});

// Get the keys of every course and laboratory
function getItems(disciplina) {
  const cursuri = Object.keys(disciplina.cursuri || {});
  const laboratoare = Object.keys(disciplina.laboratoare || {});
  return [...cursuri, ...laboratoare];
}
