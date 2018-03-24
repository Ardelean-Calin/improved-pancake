<template>
  <div>
    <v-navigation-drawer 
      v-model="drawer"
      fixed
      app 
    >
      <v-divider/>
      <v-list>
        <template v-for="navlink in navigationLinks">
          <v-list-tile 
            :to="{ path: navlink.route }" 
            :key="navlink.id">
            <v-list-tile-action>
              <v-icon>{{ navlink.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ navlink.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Deconectează-te</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar 
      app 
      fixed
      color="primary">
      <v-toolbar-side-icon 
        class="white--text" 
        @click="drawer = !drawer"/>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      navigationLinks: [
        {
          name: "Acasă",
          route: "/",
          icon: "home"
        },
        {
          name: "Listă Discipline",
          route: "/subjects",
          icon: "book"
        },
        {
          name: "Orar",
          route: "/schedule",
          icon: "date_range"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
