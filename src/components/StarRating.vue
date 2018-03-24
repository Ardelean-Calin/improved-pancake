<template>
  <div>
    <v-icon 
      v-for="i in 5"
      :key="i" 
      x-large
      @click="submitRating(i)"
      class="star">{{ getIcon(i) }}</v-icon>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      rating: 0
    };
  },
  methods: {
    submitRating(i) {
      this.rating = i;
      this.$emit("input", i);
    },
    getIcon(i) {
      return i <= this.rating ? "star" : "star_outline";
    }
  }
};
</script>

<style scoped>
.star {
  color: #f1c40f;
}
</style>
