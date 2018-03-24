<template>
  <v-badge 
    v-model="showBadge"
    right
    overlap>
    <v-card :to="to">
      <v-card-media
        :src="imgSrc"
        height="125px"
      />
      <v-card-title primary-title>
        <div class="title mx-auto">{{ title }}</div>
      </v-card-title>
    </v-card>
    <span slot="badge">{{ badge }}</span>
  </v-badge>
</template>

<script>
export default {
  props: ["title", "imgSrc", "badge", "to"],
  computed: {
    showBadge() {
      return this.$props.badge > 0;
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>
