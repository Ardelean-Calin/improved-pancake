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
      // TODO: Maybe use forin forof?
      const notifications = Object.entries(getters.items).reduce(
        // We verify how many of each key have a true value assigned to them
        (prev, [subjectID, items]) => {
          prev[subjectID] = Object.keys(items).reduce((previous, curr) => {
            if (state.toReview[curr]) return previous + 1;
            else return previous;
          }, 0);
          return prev;
        },
        {}
      );
      return notifications;
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
    getToReview({ commit, state }) {
      firebase
        .database()
        .ref("users/" + state.user.uid + "/toReview")
        .once("value")
        .then(snapshot => {
          commit("setToReview", snapshot.val());
        });
    },
    // Updates the toReview state
    async updateToReview({ state, dispatch }, { itemID, value }) {
      await firebase
        .database()
        .ref("users/" + state.user.uid + "/toReview/" + itemID)
        .set(value);
      dispatch("getToReview");
    },
    // Uploads the new review to the answers/ reference
    async uploadReview({ state, dispatch }, { itemID, answer }) {
      await firebase
        .database()
        .ref("answers/" + itemID + "/" + state.user.uid)
        .set(answer);
      dispatch("updateToReview", { itemID: itemID, value: false });
    },
    updateNews(context, news) {
      firebase
        .database()
        .ref("news/")
        .set(news);
    }
  }
});
