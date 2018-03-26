<template>
  <div class="statusContainer primary">
    <v-card class="statusCard" height="100%">
      <v-icon class="warningIcon" color="orange">warning</v-icon>
      <div class="title">Nu sunteți autentificat(ă)...</div>
      <div>Informațiile pe care le puteți vedea sunt limitate</div>
      <router-link to="/login" class="routerLink">Click pentru a vă autentifica</router-link>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.statusContainer {
  height: 21rem;
  padding: 1rem;
  padding-bottom: 2.5rem;
}

.statusCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.warningIcon {
  font-size: 6rem;
}

.routerLink {
  margin-top: 1rem;
}
</style>
