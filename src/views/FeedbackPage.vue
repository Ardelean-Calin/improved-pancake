<template>
  <div class="mainContainer">
    <div class="_title secondary white--text text-xs-center">
      <h1 class="display-1">Ce părere ai despre această aplicație?</h1>
    </div>
    <div class="secondaryContainer">
      <v-card style="padding: 1rem">
        <div class="sentimentContainer">
          <v-icon v-for="(icon, index) in sentimentIcons"
            :key="index"
            :class="{
              activeIcon: isActive(index),
              inactiveIcon: !isActive(index)
            }"
            class="sentimentIcon"
            @click="selectIcon(index)">
            {{ icon }}
          </v-icon>
        </div>
        <div class="sentimentDescription">{{ sentimentDescription }}</div>
      </v-card>
      <v-card style="padding: 0rem 1rem 0rem 1rem; margin-top: 1rem">
        <v-textarea v-model="comment" box label="Alte observații" clearable></v-textarea>
      </v-card>

      <div style="flex-grow: 1"></div>
      
      <div class="sendBtn">
        <v-btn :disabled="!readyToSend" color="primary" block @click="sendFeedback">Trimite feedback</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    sentimentDescription() {
      return this.sentimentDescriptions[this.selectedIcon] || "";
    },
    readyToSend() {
      return this.selectedIcon != null && this.comment;
    }
  },
  data() {
    return {
      sentimentIcons: [
        "sentiment_very_dissatisfied",
        "sentiment_dissatisfied",
        "sentiment_neutral",
        "sentiment_satisfied",
        "sentiment_very_satisfied"
      ],
      sentimentDescriptions: {
        0: "O urăsc.",
        1: "Nu îmi place.",
        2: "E ok, se poate și mai bine.",
        3: "E faină.",
        4: "E super faină!"
      },
      selectedIcon: null,
      comment: null
    };
  },
  methods: {
    selectIcon(index) {
      this.selectedIcon == index
        ? (this.selectedIcon = null)
        : (this.selectedIcon = index);
    },
    isActive(index) {
      return index == this.selectedIcon || this.selectedIcon == null;
    },
    sendFeedback() {
      this.$store.dispatch("uploadFeedback", {
        rating: this.selectedIcon + 1,
        comment: this.comment
      });
      this.$store.dispatch(
        "showSnackbar",
        "Mulțumim pentru timpul acordat! 😃"
      );
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.activeIcon {
  font-size: 4rem;
}

.inactiveIcon {
  color: hsl(0, 0%, 79%);
  font-size: 3.5rem;
}

.mainContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.secondaryContainer {
  background: hsl(0, 0%, 89%);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem;
}

._title {
  padding: 1rem;
}

.sentimentContainer {
  width: 100%;
  height: 5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.sentimentIcon {
  transition: color 0.3s ease-in-out;
  transition: font-size 0.1s ease-in-out;
}

.sentimentDescription {
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
  min-height: 2rem;
}
</style>
