<template>
  <v-card 
    :to="to"
    class="action-card" 
    height="10rem">
    <v-layout 
      row
      wrap>
      <v-flex 
        xs12
        d-flex
        align-center>
        <v-icon 
          size="6rem" 
          color="secondary">{{ icon }}</v-icon>
      </v-flex>
      <v-flex xs12>
        <div class="text-xs-center">
          <v-badge>
            <span 
              v-if="badge"
              slot="badge">{{ badge }}</span>
            <h3 class="title title-text">{{ text }}</h3>
          </v-badge>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: "/"
    },
    icon: {
      type: String,
      default: "error"
    },
    text: {
      type: String,
      default: "Error"
    },
    badge: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.title-text {
  color: rgba(0, 0, 0, 0.65);
  font-weight: 500;
}
</style>
