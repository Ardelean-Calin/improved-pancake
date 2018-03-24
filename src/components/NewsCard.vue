<template>
  <div 
    class="news-container primary">
    <v-card 
      height="100%"
      class="news-card">
      <v-card-title v-if="!editMode" />
      <div
        v-if="editMode"
        class="editDiv">
        <v-text-field
          :counter="140"
          :rules="[(v) => {
            if(v)
              return v.length <= 140 || 'Max 140 de caractere'
            else
              return true
          }]"
          v-model="editText"
          label="Introduceți un anunț nou"
          clearable
          multi-line
          no-resize
        />
      </div>
      <v-card-text 
        v-if="!editMode" 
        class="news-card-text">
        {{ newsText }}
      </v-card-text>
      <v-card-actions class="card-action-buttons"> 
        <div class="footer-div">
          <div 
            v-if="!editMode" 
            class="author">{{ newsAuthor }}</div>
          <div 
            v-if="!editMode" 
            class="postdate">{{ newsDate }} </div>
        </div>      
        <v-spacer/>
        <v-btn 
          v-if="editMode"
          :disabled="newsEditedText.length > 140 || newsEditedText.length == 0"
          icon
          @click="showDialog = true">
          <v-icon>check</v-icon>
        </v-btn>
        <v-btn 
          v-if="editMode" 
          icon
          @click="editMode = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn 
          v-if="!editMode"
          icon 
          @click="editMode = true">
          <v-icon>edit</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog 
      v-model="showDialog" 
      max-width="290">
      <v-card>
        <v-card-title class="headline">Sunteți sigur(ă)?</v-card-title>
        <v-card-text>Odată trimis, anunțul va apărea pe dispozitivele tuturor colegilor care au aplicația.</v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn 
            color="red darken-1" 
            flat
            outline
            @click="showDialog = false">Renunță</v-btn>
          <v-btn 
            color="primary" 
            depressed
            @click="submitNews">Trimite</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  data() {
    return {
      editMode: false,
      showDialog: false,
      newsText: "",
      newsAuthor: "",
      date: "",
      editText: ""
    };
  },
  computed: {
    newsEditedText() {
      return this.editText || "";
    },
    newsDate() {
      return new Date(this.date).toLocaleString("ro-RO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  },
  created() {
    firebase
      .database()
      .ref("/news")
      .on("value", snapshot => {
        const newsItem = snapshot.val();
        this.newsAuthor = newsItem.author;
        this.newsText = newsItem.text;
        this.date = newsItem.date;
      });
  },
  methods: {
    submitNews() {
      const user = firebase.auth().currentUser;
      firebase
        .database()
        .ref("/news")
        .set({
          author: user.displayName,
          date: new Date().toString(),
          text: this.newsEditedText
        });
      this.showDialog = false;
      this.editMode = false;
    }
  }
};
</script>

<style scoped>
.author {
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-size: larger;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.editDiv {
  padding: 0.5rem 1rem;
  padding-bottom: 0;
}

.postdate {
  color: rgba(0, 0, 0, 0.6);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.news-card {
  position: relative;
}

.news-container {
  height: 21rem;
  padding: 1rem;
  padding-bottom: 2.5rem;
}

.news-card-text {
  /* text-align: justify; */
  font-size: larger;
  max-height: 8.5rem;
  overflow: auto;
  padding-top: 0;
}

.card-action-buttons {
  /* display: inline-block; */
  position: absolute;
  left: 0px;
  bottom: 0px;
  padding: 0.8rem;
  width: 100%;
  background: hsl(0, 0%, 97%);
}
</style>
