<template>
  <div>
    <news-card/>
    <v-container 
      fluid
      grid-list-lg >
      <v-layout 
        row
        wrap
        style="margin-top: -2.5rem">
        <v-flex 
          xs6>
          <mini-card 
            :badge="reviewBadge" 
            to="/subjects" 
            text="Discipline"
            icon="book"/>
        </v-flex>
        <v-flex 
          xs6>
          <mini-card 
            to="/shedule" 
            text="Orar"
            icon="date_range"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase/app";
import NewsCard from "@/components/NewsCard.vue";
import MiniCard from "@/components/MiniCard.vue";

export default {
  components: {
    NewsCard,
    MiniCard
  },
  data() {
    return {
      toReview: []
    };
  },
  computed: {
    reviewBadge() {
      return this.toReview.length;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.userID = user.uid;
      firebase
        .database()
        .ref("/users/" + this.userID)
        .on("value", snapshot => {
          const toReview = [];
          snapshot.child("toReview").forEach(snap => {
            if (snap.val()) {
              toReview.push(snap.key);
            }
          });
          this.toReview = toReview;
          this.$forceUpdate();
        });
    });
  }
};
</script>

<style scoped>
</style>
