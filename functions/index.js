import "babel-polyfill";

import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
firebase.initializeApp(functions.config().firebase);

exports.userCreated = functions.auth.user().onCreate(async event => {
  const user = event.data;

  const discipline = (await firebase
    .database()
    .ref("discipline/")
    .once("value")).val();

  const items = Object.keys(discipline).reduce((prev, key) => {
    Object.assign(prev, getItems(discipline[key]));
    return prev;
  }, {});

  const toReview = Object.keys(items).reduce((prev, item) => {
    prev[item] = items[item].dateStart < new Date().getTime();
    return prev;
  }, {});

  // Configure everything for the user.
  await firebase
    .database()
    .ref("users/" + user.uid + "/toReview")
    .set(toReview);
  // Also save the email
  await firebase
    .database()
    .ref("users/" + user.uid + "/email")
    .set(user.email);
});

// Get the keys of every course and laboratory
function getItems(disciplina) {
  return disciplina.iteme;
}
