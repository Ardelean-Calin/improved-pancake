import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    subjects: {},
    user: {}
  },
  getters: {
    items: state => {
      return Object.keys(state.subjects).reduce((prev, key) => {
        prev[key] = {
          ...(state.subjects[key].cursuri || {}),
          ...(state.subjects[key].laboratoare || {})
        };
        return prev;
      }, {});
    }
    // notifications: (state) => {
    //   return Object.
    // }
    // items: state => {
    //   if (Object.keys(state.subjects)){
    //     const cursuri
    //   }
    // }
    // toReview: (state, getters) => {
    //   if (state.user){

    //   }
    // }
  },
  mutations: {
    setSubjects: (state, subjects) => {
      state.subjects = subjects;
    },
    setUser: (state, user) => {
      state.user = user;
    }
  },
  actions: {}
});
