<template>
  <div>
    <v-navigation-drawer 
      v-model="drawer"
      fixed
      app 
    >
      <div class="mainContent primary white--text">
        <template v-if="loggedIn">
          <v-icon class="personIcon" dark>person</v-icon>
          <div class="contactDetails">
            <div class="displayName">{{ displayName }}</div>
            <div class="email">{{ email }}</div>
          </div>
        </template>
        <template v-else>
          <div class="loggedOut">
            <v-icon class="personIcon" dark>warning</v-icon>
            <div>Nu ești autentificat(ă)...</div>
          </div>
        </template>
      </div>
      <v-divider/>
      <v-list>
        <v-list-tile class="headerTile">Navigare</v-list-tile>
        <template v-for="navlink in navigationLinks">
          <v-list-tile
            v-if="(loggedIn && navlink.showLoggedIn) || (!loggedIn && navlink.showLoggedOut)"
            :to="navlink.route ? { path: navlink.route } : null" 
            :key="navlink.icon">
            <v-list-tile-action>
              <v-icon>{{ navlink.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ navlink.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile class="headerTile">Alte opțiuni</v-list-tile>
        <template v-for="navlink in actionLinks">
          <v-list-tile ripple
            v-if="(loggedIn && navlink.showLoggedIn) || (!loggedIn && navlink.showLoggedOut)"
            @click="navlink.onClick"
            :to="navlink.route ? { path: navlink.route } : null" 
            :key="navlink.icon">
            <v-list-tile-action>
              <v-icon>{{ navlink.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ navlink.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile v-if="loggedIn" to="/feedback">
          <v-list-tile-action>
            <v-icon>feedback</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Feedback aplicație</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="loggedIn" ripple @click="notifications = !notifications">
            <v-list-tile-action>
              <v-icon>notifications_active</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Notificări</v-list-tile-title>
            <v-list-tile-action>
              <v-switch color="primary" v-model="notifications"></v-switch> 
            </v-list-tile-action>
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
      notifications: false,
      navigationLinks: [
        {
          name: "Acasă",
          route: "/",
          icon: "home",
          showLoggedIn: true,
          showLoggedOut: true
        },
        {
          name: "Listă Discipline",
          route: "/subjects",
          icon: "book",
          showLoggedIn: true,
          showLoggedOut: false
        },
        {
          name: "Orar",
          route: "/schedule",
          icon: "date_range",
          showLoggedIn: true,
          showLoggedOut: true
        }
      ],
      actionLinks: [
        {
          name: "Deconectează-te",
          route: null,
          icon: "exit_to_app",
          showLoggedIn: true,
          showLoggedOut: false,
          onClick: this.signOut
        },
        {
          name: "Autentifică-te",
          route: "/login",
          icon: "person",
          showLoggedIn: false,
          showLoggedOut: true,
          onClick: () => {}
        }
      ]
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.user ? true : false;
    },
    displayName() {
      return this.$store.state.user.displayName;
    },
    email() {
      return this.$store.state.user.email;
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
    }
  }
};
</script>

<style scoped>
.mainContent {
  height: 10rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 1rem;
}

.contactDetails {
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
}

.headerTile {
  color: hsl(0, 0%, 49%);
}

.personIcon {
  font-size: 3.2rem;
}

.displayName {
  font-size: 1.2rem;
  font-weight: 500;
}

.email {
  color: hsl(0, 0%, 95%);
}

.loggedOut {
  display: flex;
  align-items: center;
}
</style>
