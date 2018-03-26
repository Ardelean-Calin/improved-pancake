import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    subjects: {},
    user: {},
    toReview: {},
    questions: {},
    news: {}
  },
  getters: {
    // Items are courses, laboratories & seminaries
    items: state => {
      return Object.keys(state.subjects).reduce((prev, key) => {
        prev[key] = state.subjects[key].iteme;
        return prev;
      }, {});
    },
    notifications: (state, getters) => {
      const toReview = state.toReview;
      if (toReview && getters.items) {
        const notifications = Object.entries(getters.items).reduce(
          // We verify how many of each key have a true value assigned to them
          (prev, [subjectID, items]) => {
            prev[subjectID] = Object.keys(items).reduce((previous, curr) => {
              if (toReview[curr]) return previous + 1;
              else return previous;
            }, 0);
            return prev;
          },
          {}
        );
        return notifications;
      } else {
        return 0;
      }
    }
  },
  mutations: {
    setAnswers: (state, answers) => {
      state.answers = answers;
    },
    setSubjects: (state, subjects) => {
      state.subjects = subjects;
    },
    setUser: (state, user) => {
      state.user = user;
    },
    setToReview: (state, toReview) => {
      state.toReview = toReview;
    },
    setQuestions: (state, questions) => {
      state.questions = questions;
    },
    setNews: (state, news) => {
      state.news = news;
    }
  },
  actions: {
    dispatchAllActions({ commit, state }) {
      // Add database observers
      // Load all subjects
      firebase
        .database()
        .ref("discipline/")
        .on("value", snapshot => {
          commit("setSubjects", snapshot.val());
        });
      // Load all questions
      firebase
        .database()
        .ref("questions/")
        .on("value", snapshot => {
          commit("setQuestions", snapshot.val());
        });
      // Load news feed
      firebase
        .database()
        .ref("news/")
        .on("value", snapshot => {
          commit("setNews", snapshot.val());
        });
      // Start listening for toReview
      firebase
        .database()
        .ref("users/" + state.user.uid + "/toReview")
        .on("value", snapshot => {
          commit("setToReview", snapshot.val());
        });
    },
    // Updates the toReview state
    async updateToReview({ state }, { itemID, value }) {
      await firebase
        .database()
        .ref("users/" + state.user.uid + "/toReview/" + itemID)
        .set(value);
    },
    // Uploads the new review to the answers/ reference
    async uploadReview({ state, dispatch }, { itemID, answer }) {
      await firebase
        .database()
        .ref("answers/" + itemID + "/" + state.user.uid)
        .set(answer);
      dispatch("updateToReview", { itemID: itemID, value: false });
    },
    // Updates the announcement
    updateNews(context, news) {
      firebase
        .database()
        .ref("news/")
        .set(news);
    },
    // Update the user profile
    async updateProfile({ state, commit }, { displayName }) {
      await state.user.updateProfile({
        displayName
      });
      let updatedUser = { ...state.user };
      updatedUser.displayName = displayName;
      commit("setUser", updatedUser);
    },
    // Try and Sign-up the user
    signUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setUser", user);
          payload.sucCallback();
        })
        .catch(err => {
          payload.errCallback(err);
        });
    },
    signIn({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setUser", user);
          payload.sucCallback();
        })
        .catch(err => {
          payload.errCallback(err);
        });
    },
    signOut() {
      firebase.auth().signOut();
    }
  }
});
