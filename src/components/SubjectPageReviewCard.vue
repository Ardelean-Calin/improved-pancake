<template>
  <v-card 
    :to="to"
    ripple 
    raised>
    <v-container 
      fluid 
      grid-list-lg>
      <v-layout row>
        <v-flex xs8>
          <div>
            <v-icon class="review-icon">{{ icon }}</v-icon>
            <div class="headline">{{ title }}</div>
            <div class="date-time">{{ formattedStartDate }}</div>
            <div class="duration">Durată: {{ duration }} ore</div>
          </div>
        </v-flex>
        <v-flex 
          d-flex
          xs4 
          align-center>
          <v-icon 
            class="open-icon"
            size="3rem"
          >keyboard_arrow_right</v-icon>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    startDate: {
      type: Number,
      default: 0
    },
    endDate: {
      type: Number,
      default: 0
    },
    to: {
      type: String,
      default: ""
    }
  },
  computed: {
    duration() {
      return Math.round((this.endDate - this.startDate) / 1000 / 3600);
    },
    formattedStartDate() {
      return new Date(this.startDate).toLocaleString("ro-RO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  }
};
</script>

<style scoped>
.date-time {
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
}

.duration {
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
}

.headline {
  display: inline-block;
}

.open-icon {
  position: absolute;
  right: 1rem;
}

.review-icon {
  font-size: 1.7rem;
  margin-right: 0.8rem;
  /* margin-bottom: 0.6rem; */
}
</style>
