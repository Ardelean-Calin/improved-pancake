<template>
  <v-card flat>
    <v-card-media 
      :src="subject.imageURL" 
      height="200px"/>
    <v-card-title primary-title>
      <div>
        <h3 class="headline"> {{ subject.titlu }}</h3>
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
            {{ subject.descriere }}
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
import SubjectPageReviewCard from "@/components/SubjectPageReviewCard.vue";

export default {
  components: {
    "review-card": SubjectPageReviewCard
  },
  data() {
    return {
      showDescription: false
    };
  },
  computed: {
    reviews() {
      // Create some simple objects to store icon and router link
      const reviewObjects = this.toReview.reduce((accumulator, objectID) => {
        accumulator.push({
          ...this.subject.iteme[objectID],
          icon: this.subject.iteme[objectID].type == "curs" ? "book" : "build",
          linkTo: objectID
        });
        return accumulator;
      }, []);
      return reviewObjects;
    },
    subject() {
      return this.$store.state.subjects[this.$route.params.id];
    },
    toReview() {
      return Object.keys(this.$store.state.toReview).filter(key => {
        return (
          // Filter the entries which belong to this subject and need to be
          // reviewed.
          this.$store.state.toReview[key] && this.subject.iteme[key]
        );
      });
    }
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
