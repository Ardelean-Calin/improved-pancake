<template>
  <div class="mainContainer">
    <v-card class="loginCard">
      <v-card-text class="loginForm">
        <div class="loginText headline text-xs-center">Autentificare</div>
        <v-text-field placeholder="E-mail..." prepend-icon="email"/>
        <v-text-field placeholder="Parolă..." prepend-icon="lock"
          :append-icon="passIcon" :append-icon-cb="() => passVisible = !passVisible"
          :type="passVisible ? 'text' : 'password'"/>
        <v-btn class="loginBtn" color="primary" block>Autentificare</v-btn>
        <div class="createAccount">Nu ai cont? 
          <router-link to="/signup">Înregistrează-te</router-link>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passVisible: false
    };
  },
  computed: {
    passIcon() {
      return this.passVisible ? "visibility_off" : "visibility";
    }
  }
};
</script>

<style scoped>
.mainContainer {
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loginCard {
  width: 100%;
}

.loginText {
  margin-bottom: 0.5rem;
}

.loginBtn {
  margin-top: 1rem;
}

.createAccount {
  margin-top: 1rem;
  text-align: center;
}
</style>
