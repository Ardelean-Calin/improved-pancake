<template>
  <v-content>
    <navigation-bar/>
    <transition name="fade" mode="out-in" appear>
      <router-view v-touch="{
        right: navigateBack,
        left: navigateForward
      }"/>
    </transition>
    <v-snackbar :timeout="this.$store.state.snackTimeout" v-model="snackbar" multi-line>
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
    },
    navigateBack() {
      this.$router.back();
    },
    navigateForward() {
      this.$router.forward();
    }
  }
};
</script>

<style scoped>
/* .fade-enter, */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
