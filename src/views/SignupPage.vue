<template>
  <div class="main-container">
    <div class="header primary">
      <v-icon 
        size="6rem" 
        dark>person</v-icon>
      <h1 class="title">Înregistrare</h1>
    </div>
    <div class="form-container">
      <v-form class="login-form">
        <v-text-field  
          v-model="email"
          :error-messages="errorMessageEmail"
          label="E-mail"
          @input="errorMessageEmail = []"
        />
        <v-text-field 
          v-model="password"
          :append-icon="passVisible ? 'visibility_off' : 'visibility'" 
          :append-icon-cb="() => (passVisible = !passVisible)" 
          :type="passVisible ? 'text' : 'password'" 
          :error-messages="errorMessagePassword"
          label="Parolă" 
          @input="errorMessagePassword = []"/>
        <v-text-field 
          v-model="password2"
          :append-icon="passVisible2 ? 'visibility_off' : 'visibility'" 
          :append-icon-cb="() => (passVisible2 = !passVisible2)" 
          :type="passVisible2 ? 'text' : 'password'" 
          :error-messages="errorMessagePassword"
          label="Repetați parola" 
          @input="errorMessagePassword = []"/>
      </v-form>
      <v-btn 
        :disabled="!validInput"
        class="primary btn" 
        @click="signUp" 
      >Înregistrează-te</v-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";

const minPassLength = 8;

export default {
  data() {
    return {
      email: "",
      password: "",
      passVisible: false,
      password2: "",
      passVisible2: false,
      errorMessageEmail: [],
      errorMessagePassword: []
    };
  },
  computed: {
    validInput() {
      return this.email.length > 0 && this.password.length >= minPassLength;
    }
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(err => {
          switch (err.code) {
            case "auth/email-already-in-use":
              this.errorMessageEmail = "Acest e-mail este deja folosit.";
              break;
            case "auth/wrong-password":
              this.errorMessagePassword = "Parolă greșită.";
              break;
            case "auth/weak-password":
              this.errorMessagePassword = "Parolă prea slabă.";
              break;
            case "auth/invalid-email":
              this.errorMessageEmail = "Adresă de e-mail formatată greșit.";
              break;
            default:
              break;
          }
        })
        .then(user => {
          // User is undefined if signup failed.
          if (user) {
            this.$router.push("/");
          }
        });
    }
  }
};
</script>

<style scoped>
.btn {
  width: 100%;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  max-width: 20rem;
}

.header {
  height: 10rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-form {
  width: 100%;
  padding: 1.5rem 0;
}

.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: white;
}

.router-link {
  padding: 0.5rem 0;
  text-decoration: none;
}

.title {
  width: 100%;
  font-size: 2.3rem;
  text-align: center;
  color: white;
  letter-spacing: 0.1px;
  font-weight: 400;
}
</style>
