<template>
  <div class="mainContainer">
    <v-card class="loginCard">
      <v-card-text class="loginForm">
        <div class="loginText headline text-xs-center">Autentificare</div>
        <v-text-field @input="emailErr = []"
          v-model="email" placeholder="E-mail..." prepend-icon="email" 
          :error-messages="emailErr"/>
        <v-text-field @input="passwordErr = []"
          v-model="password" placeholder="Parolă..." prepend-icon="lock" 
          :error-messages="passwordErr"
          :append-icon="passIcon" :append-icon-cb="() => passVisible = !passVisible"
          :type="passVisible ? 'text' : 'password'"/>
        <v-btn @click="signIn" class="loginBtn" color="primary" block>Autentificare</v-btn>
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
      email: "",
      emailErr: [],
      password: "",
      passwordErr: [],
      passVisible: false
    };
  },
  computed: {
    passIcon() {
      return this.passVisible ? "visibility_off" : "visibility";
    }
  },
  methods: {
    signIn() {
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password,
        sucCallback: this.onSuccess,
        errCallback: this.onError
      });
    },
    onSuccess() {
      this.$router.push("/");
      // Maybe ask for notification permissions?
    },
    onError(err) {
      const code = err.code;
      switch (code) {
        case "auth/invalid-email":
          this.emailErr = ["Adresă de mail formatată greșit"];
          break;
        case "auth/user-not-found":
          this.emailErr = ["Adresă de mail greșită"];
          break;
        case "auth/wrong-password":
          this.passwordErr = ["Parolă greșită"];
          break;
        default:
          break;
      }
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
