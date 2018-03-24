<template>
  <v-content>
    <navigation-bar/>
    <router-view/>
  </v-content>
</template>

<script>
import NavigationBar from "./NavigationBar";

export default {
  components: {
    "navigation-bar": NavigationBar
  }
};
</script>

<style scoped>
</style>
