import "babel-polyfill";

import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
firebase.initializeApp(functions.config().firebase);

// Get the keys of every course and laboratory
const getItems = async () => {
  let items = {};

  const discipline = await firebase
    .database()
    .ref("discipline/")
    .once("value");
  discipline.forEach(snapshot => {
    items = { ...items, ...snapshot.child("iteme").val() };
  });
  return items;
};

exports.userCreated = functions.auth.user().onCreate(async event => {
  const user = event.data;

  const items = await getItems();

  const toReview = Object.keys(items).reduce((prev, item) => {
    prev[item] =
      items[item].dateStart < new Date().getTime()
        ? "assigned"
        : "not_assigned";
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

exports.assignReviews = functions.https.onRequest(async (req, resp) => {
  const users = await firebase
    .database()
    .ref("users")
    .once("value");
  users.forEach(snapshot => {
    const userID = snapshot.key;
    const toReview = snapshot.child("toReview");

    toReview.forEach(snap => {
      const id = snap.key;
      const val = snap.val();

      // TODO
    });
  });
});
