<template>
  <v-content>
    <navigation-bar/>
    <router-view/>
    <v-snackbar :timeout="this.$store.state.snackTimeout" v-model="snackbar">
      {{ snackText }}
      <v-btn flat color="primary" @click.native="closeSnack">Închide</v-btn>
    </v-snackbar>
  </v-content>
</template>

<script>
import NavigationBar from "./NavigationBar";

export default {
  components: {
    "navigation-bar": NavigationBar
  },
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    },
    snackText() {
      return this.$store.state.snackText;
    }
  },
  methods: {
    closeSnack() {
      this.$store.commit("setSnack", { text: "", value: false });
    }
  }
};
</script>
