<template>
  <div class="mainContainer">
    <v-card class="signupCard">
      <v-card-text class="signupForm">
        <div class="signupText headline text-xs-center">Înregistrare</div>
        <v-text-field @input="() => fullNameErr = []" v-model="fullName" placeholder="Nume și prenume..."
                      prepend-icon="face" :error-messages="fullNameErr"/>
        <v-text-field @input="() => emailErr = []" v-model="email" placeholder="E-mail..."
                      prepend-icon="email" :error-messages="emailErr"/>
        <v-text-field @input="()=> passwordErr = []" v-model="password" placeholder="Parolă..."
                      prepend-icon="lock" :error-messages="passwordErr"
                      :append-icon="passIcon" :append-icon-cb="() => passVisible = !passVisible"
                      :type="passVisible ? 'text' : 'password'"/>
        <v-btn @click="signUp" class="signupBtn" color="primary" block>Înregistrare</v-btn>
        <div class="toLogin">Ai deja cont? 
          <router-link to="/login">Autentifică-te</router-link>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passVisible: false,
      fullName: null,
      fullNameErr: [],
      email: "",
      emailErr: [],
      password: "",
      passwordErr: []
    };
  },
  computed: {
    passIcon() {
      return this.passVisible ? "visibility_off" : "visibility";
    }
  },
  methods: {
    signUp() {
      if (!this.fullName) {
        this.fullNameErr = ["Numele nu poate fi lăsat gol."];
        return;
      }

      this.$store.dispatch("signUp", {
        email: this.email,
        password: this.password,
        errCallback: this.errorHandler,
        sucCallback: this.successHandler
      });
    },
    errorHandler(err) {
      const errCode = err.code;

      switch (errCode) {
        case "auth/invalid-email":
          this.emailErr = ["Adresă de email formatată greșit."];
          break;
        case "auth/email-already-in-use":
          this.emailErr = ["Adresă de email deja folosită."];
          break;
        case "auth/weak-password":
          this.passwordErr = ["Parolă slabă. Introduceți minim 6 caractere."];
          break;
        default:
          break;
      }
    },
    successHandler() {
      this.$store.dispatch("updateProfile", { displayName: this.fullName });
      this.$router.push("/");
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

.signupCard {
  width: 100%;
}

.signupText {
  margin-bottom: 0.5rem;
}

.signupBtn {
  margin-top: 1rem;
}

.toLogin {
  margin-top: 1rem;
  text-align: center;
}
</style>
