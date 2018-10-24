<template>
    <div>
    <v-card flat>
      <v-img 
        src="https://i.imgur.com/2GcbKHgl.jpg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.66)">
        <v-container fill-height fluid>
          <v-layout align-center>
            <v-layout column align-center>
              <div class="display-1 font-weight-bold white--text">{{timeNow}}</div>
              <div class="text-uppercase font-weight-light white--text">{{dateNow}}</div>
              <v-layout column align-center v-if="currentItem != null">
                <div class="white--text" style="border: 0.5px solid; width: 15rem; max-height: 1px; margin: 0.5rem"></div>
                <div class="white--text">În desfășurare</div>
                <div class="headline font-weight-bold white--text">{{currentItem}}</div>
              </v-layout>
            </v-layout>
          </v-layout>
        </v-container></v-img>
    </v-card>
    <v-container class="timelineContainer">
    <v-timeline>
      <v-timeline-item
        v-for="item in nextFive"
        :key="item.longTitle"
        color="primary lighten-2"
      >
      <span slot="opposite">
        <div class="title">
          {{prettyTime(item.dateStart)}}
        </div>
        <div class="body-1">
          {{prettyDate(item.dateStart)}}
        </div>
      </span>
        <v-card class="elevation-2">
          <v-card-title class="itemTitle secondary--text"> {{item.longTitle}} </v-card-title>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: {
        ...Object.keys(this.$store.getters.items).reduce((prev, k) => {
          return prev.concat(Object.values(this.$store.getters.items[k]));
        }, [])
      },
      weekdays: [
        "duminică",
        "luni",
        "marți",
        "miercuri",
        "joi",
        "vineri",
        "sâmbătă"
      ]
    };
  },
  computed: {
    // Computes the next five items which we have on our schedule
    nextFive() {
      return Object.values(this.items)
        .sort((a, b) => a.dateStart - b.dateStart)
        .filter(val => val.dateStart >= Date.now())
        .slice(0, 5);
    },
    timeNow() {
      return new Date().toLocaleTimeString("ro-RO", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit"
      });
    },
    dateNow() {
      return new Date().toLocaleDateString("ro-RO", {
        day: "2-digit",
        weekday: "short",
        month: "long"
      });
    },
    currentItem() {
      const currentTime = Date.now();
      const item = Object.values(this.items).filter(
        i => currentTime < i.dateEnd && currentTime > i.dateStart
      );
      return item.length ? item[0].longTitle : null;
    }
  },
  methods: {
    prettyTime(date) {
      const currentDate = new Date(date);
      return `${currentDate.getHours()}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    },

    prettyDate(date) {
      const currentDate = new Date(date);
      return currentDate.toLocaleDateString("ro-Ro", {
        weekday: "long",
        day: "numeric",
        month: "short"
      });
    }
  }
};
</script>

<style scoped>
.itemTitle {
  font-weight: 600;
}

.timelineContainer {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
