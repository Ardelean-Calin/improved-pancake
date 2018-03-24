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
import NewsCard from "@/components/NewsCard.vue";
import MiniCard from "@/components/MiniCard.vue";

export default {
  components: {
    NewsCard,
    MiniCard
  },
  computed: {
    reviewBadge() {
      // Get total number of notifications by summing the number of
      // notifications for each subject.
      return Object.values(this.$store.getters.notifications).reduce(
        (acc, curr) => acc + curr,
        0
      );
    }
  }
};
</script>

<style scoped>
</style>
