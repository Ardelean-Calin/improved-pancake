<template>
  <v-container>
    <template v-for="subject in subjectData">
      <subject-card 
        :title="subject.titlu"
        :img-src="subject.imgSrc"
        :to="subject.linkTo"
        :key="subject.key"
        :badge="subject.notifications"
        class="subject-card"
      />
    </template>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import SubjectCard from "@/components/SubjectCard";

export default {
  components: {
    "subject-card": SubjectCard
  },
  data() {
    return {
      subjects: {},
      toReview: []
    };
  },
  computed: {
    // Ia doar strictul necesar din tot obiectul 'discipline'
    subjectData() {
      const parsedData = [];
      Object.entries(this.subjects).map(([key, val]) => {
        parsedData.push({
          titlu: val.titlu,
          imgSrc: val.imageURL,
          linkTo: "/subjects/" + key,
          notifications: this.getNoNotifications(key),
          key
        });
      });
      return parsedData;
    }
  },
  created() {
    firebase
      .database()
      .ref("/discipline")
      .on("value", snapshot => {
        this.subjects = snapshot.val();
      });

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
  },
  methods: {
    getNoNotifications(id) {
      // First flatten the course & laboratory ID's
      const keys = Object.keys({
        ...this.subjects[id].cursuri,
        ...this.subjects[id].laboratoare
      });

      // Then filter the to-be-reviewed with only keys belonging
      // to this subject
      const toReview = this.toReview.filter(val => {
        if (keys.includes(val)) {
          return true;
        } else {
          return false;
        }
      });

      return toReview.length;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.subject-card {
  margin-bottom: 1rem;
}

.subject-card:nth-last-child(1) {
  margin-bottom: 0;
}
</style>
