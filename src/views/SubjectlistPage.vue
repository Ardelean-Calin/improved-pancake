<template>
  <v-flex fill-height>
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
  </v-flex>
</template>

<script>
import SubjectCard from "@/components/SubjectCard";

export default {
  components: {
    "subject-card": SubjectCard
  },
  computed: {
    subjects() {
      return this.$store.state.subjects;
    },
    // Ia doar strictul necesar din tot obiectul 'discipline'
    subjectData() {
      return Object.keys(this.subjects).reduce((prev, curr) => {
        prev.push({
          titlu: this.subjects[curr].titlu,
          imgSrc: this.subjects[curr].imageURL,
          linkTo: "/subjects/" + curr,
          notifications: this.$store.getters.notifications[curr],
          curr
        });
        return prev;
      }, []);
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
