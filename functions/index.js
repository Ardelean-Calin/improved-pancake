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
  const endDate = new Date();
  const startDate = new Date().setDate(now.getDate() - 14); // two weeks ago

  const items = await getItems();
  const users = await firebase
    .database()
    .ref("users")
    .once("value");

  await users.forEach(async snapshot => {
    const userID = snapshot.key;
    const toReview = snapshot.child("toReview");
    let toReviewClone = { ...toReview.val() };

    toReview.forEach(snap => {
      const id = snap.key;
      const val = snap.val();
      const itemStartDate = val && val[id] && val["dateStart"];
      if (
        toReview[id] == "not_assigned" &&
        itemStartDate &&
        itemStartDate > startDate &&
        itemStartDate <= endDate
      ) {
        toReviewClone[id] = "assigned";
      } else {
        console.log(`Error with ${id} for user ${userID}`);
      }
    });

    await firebase
      .database()
      .ref(`users/${userID}/toReview`)
      .set(toReviewClone);
  });

  resp.send("Done refreshing toReview list!");
});
