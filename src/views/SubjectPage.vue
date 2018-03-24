<template>
  <v-card flat>
    <v-card-media 
      :src="imgSrc" 
      height="200px"/>
    <v-card-title primary-title>
      <div>
        <h3 class="headline"> {{ title }}</h3>
        <div 
          class="description" 
          @click="showDescription = !showDescription">
          <div>
            <span class="description-expander-text">Descriere</span> 
            <v-icon 
              :class="{'icon-rotated': showDescription}"
              class="description-expander-icon primary" 
              dark
              small>keyboard_arrow_right
            </v-icon>
          </div>
          <div 
            :class="{'description-text-expanded': showDescription}" 
            class="description-text">
            {{ description }}
          </div>
        </div>
      </div>
    </v-card-title>
    <v-card-text class="card-text">
      <h3 class="title">Recenzii</h3>
      <div 
        v-if="reviews.length == 0"
        class="no-reviews" >
        Nici-o recenzie disponibilă momentan.
      </div>
      <div 
        v-for="review in reviews" 
        :key="review.id">
        <review-card 
          :title="review.shortTitle"
          :icon="review.icon"
          :start-date="review.dateStart"
          :end-date="review.dateEnd"
          :to="$route.path + '/' + review.linkTo"
          class="review-card" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import SubjectPageReviewCard from "@/components/SubjectPageReviewCard.vue";

export default {
  components: {
    "review-card": SubjectPageReviewCard
  },
  data() {
    return {
      title: "",
      description: "",
      imgSrc: "",
      subject: {},
      courses: {},
      laboratories: {},
      toReview: [],
      userID: null,
      showDescription: false
    };
  },
  computed: {
    reviews() {
      const reviewObjects = this.toReview.reduce((accumulator, objectID) => {
        if (Object.keys(this.courses || {}).includes(objectID)) {
          accumulator.push({
            ...this.courses[objectID],
            icon: "book",
            linkTo: "cursuri/" + objectID
          });
        } else if (Object.keys(this.laboratories || {}).includes(objectID)) {
          accumulator.push({
            ...this.laboratories[objectID],
            icon: "build",
            linkTo: "laboratoare/" + objectID
          });
        }
        return accumulator;
      }, []);
      return reviewObjects;
    }
  },
  watch: {
    subject: {
      handler(val) {
        this.title = val.titlu;
        this.description = val.descriere;
        this.imgSrc = val.imageURL;

        this.courses = val.cursuri;
        this.laboratories = val.laboratoare;
      },
      deep: true
    }
  },
  created() {
    firebase
      .database()
      .ref("/discipline/" + this.$route.params.id)
      .on("value", snapshot => {
        this.subject = snapshot.val();
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
  }
};
</script>

<style scoped>
.card-text {
  padding-top: 0rem;
}

.description {
  cursor: pointer;
  padding-top: 0.5rem;
}

.description-expander-text {
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.2em;
  font-weight: 500;
  padding-right: 2px;
}

.description-expander-icon {
  border-radius: 50%;
  margin-bottom: 2px;
  padding: 2px;
  transition: transform 0.4s ease;
}

.description-text {
  color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  max-height: 0px;
  transition: max-height 0.4s ease;
  text-align: justify;
}

.description-text-expanded {
  /* This max-height property is fixed, unfortunately */
  max-height: 300px;
}

.icon-rotated {
  -moz-transform: rotate(90deg);
  transform: rotate(90deg);
}

.no-reviews {
  padding-top: 0.5rem;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
}

.review-card {
  margin-top: 1rem;
}
</style>
