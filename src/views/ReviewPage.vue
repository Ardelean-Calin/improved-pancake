<template>
  <v-card 
    flat 
    style="height: 100%;">
    <div class="cardTitle">
      <div>{{ item.longTitle }}</div>
    </div>
    <div class="mainContainer">
      <div 
        v-for="(question, key) in questions" 
        :key="key"
        class="question">
        <div class="questionTitle">{{ question.title }}</div>
        <div class="questionContent">
          <div 
            v-if="question.type == 'binary'"
            class="questionBinary">
            <v-btn-toggle  
              v-model="answers[key]"
              mandatory>
              <v-btn
                flat 
                value="true"
                color="green">
                <span>Da</span>
                <v-icon>check</v-icon>
              </v-btn>
              <v-btn 
                flat 
                value="false"
                color="red">
                <span>Nu</span>
                <v-icon>close</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
          <div v-else-if="question.type == 'star'">
            <star-rating v-model="answers[key]"/>
          </div>
        </div>
      </div>
      <div>
        <v-text-field v-model="additionalComment" label="Comentarii adiționale" multi-line textarea no-resize></v-text-field>
      </div>
      <div class="btnContainer">
        <v-btn @click="dialog = !dialog" color="primary" :disabled="!canSubmit" block>Trimite recenzia</v-btn>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title style="padding-bottom: 0" class="headline">Trimiteți recenzia?</v-card-title>
        <v-card-text>Odată trimisă, recenzia nu mai poate fi repetată.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat @click.native="dialog = false">Anulează</v-btn>
          <v-btn color="primary" flat outline @click.native="submitReview">Trimite</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import StarRating from "@/components/StarRating.vue";

export default {
  components: {
    StarRating
  },
  computed: {
    canSubmit() {
      return Object.keys(this.questions).reduce((prev, curr) => {
        return prev && this.answers.hasOwnProperty(curr);
      }, true);
    },
    item() {
      return this.$store.getters.items[this.$route.params.id][
        this.$route.params.itemID
      ];
    },
    questions() {
      return Object.keys(this.item.questions).reduce((prev, key) => {
        prev[key] = this.$store.state.questions[key];
        return prev;
      }, {});
    }
  },
  data() {
    return {
      answers: {},
      additionalComment: "",
      dialog: false
    };
  },
  methods: {
    submitReview() {
      this.dialog = false;

      const fullAnswer = {
        ...this.answers,
        additionalComment: this.additionalComment
      };

      this.$store.dispatch("uploadReview", {
        itemID: this.$route.params.itemID,
        answer: fullAnswer
      });
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.btnContainer {
  padding: 0 1rem 1rem 1rem;
}
.mainContainer {
  padding: 0 0.5rem 0 0.5rem;
}

.question {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.question:nth-of-type(1) {
  margin-top: 0;
}

.question:nth-of-type(4) {
  margin-bottom: 0;
}

.questionTitle {
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  font-weight: 700;
  font-size: 1.3rem;
}

.questionContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cardTitle {
  display: flex;
  align-items: center;
  color: hsl(0, 0%, 49%);
  font-weight: 700;
  font-size: 1.7rem;
  margin-bottom: 1rem;
  min-height: 3.5rem;
  padding-left: 0.5rem;
}
</style>
