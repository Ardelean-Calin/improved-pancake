<template>
  <v-layout 
    v-touch="{
      right: navigateBack,
      left: navigateForward
    }">
    <v-content>
      <navigation-bar/>
        <transition name="fade">
          <router-view/>
        </transition>
      <v-snackbar :timeout="this.$store.state.snackTimeout" v-model="snackbar">
        {{ snackText }}
        <v-btn flat color="primary" @click.native="closeSnack">Închide</v-btn>
      </v-snackbar>
    </v-content>
  </v-layout>
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
    },
    navigateBack() {
      this.$router.go(-1);
    },
    navigateForward() {
      this.$router.go(1);
    }
  }
};
</script>

<style scoped>
.fade-enter,
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
