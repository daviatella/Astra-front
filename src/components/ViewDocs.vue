<template>
  <CreateButtons @goDocs="toggleFlow" class="b-bar" />
  <v-container class="bg-deep-purple-lighten-5 margin">
    <v-row>
      <v-col v-for="(card, index) in cards" :key="index" cols="15" sm="2" md="4" lg="2">
        <v-card @click="toggleFlow" class="rounded-lg doc-card">
          <header class="card-header">
            <p class="card-header-title">
              {{ card.title }}
            </p>
          </header>
          <div class="content">
            <v-img :src="`src/assets/${card.type}-icon.png`" class="test"></v-img>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">{{ card.wordCount || '5000 words' }}</p>
          </footer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateButtons from './CreateButtons.vue';

export default {
  data: () => ({
    cards: [
      {
        title: "Pre-fab homes",
        type: "doc",
      },
      {
        title: "Favorite road trips",
        type: "doc",
      },
      {
        title: "Best airlines",
        type: "doc",
      },
      {
        title: "Pre-fab homes",
        type: "doc",
      },
      {
        title: "Favorite road trips",
        type: "mindmap",
      },
      {
        title: "Best airlines",
        type: "doc",
      },
      {
        title: "Pre-fab homes",
        type: "mindmap",
      },
      {
        title: "Favorite road trips",
        type: "doc",
      },
      {
        title: "Best airlines",
        type: "doc",
      },
    ],
  }),
  emits: ['goDocs'],
  methods: {
    toggleFlow() {
      this.$emit('goDocs');
    }
  }
};
</script>

<style scoped>
p {
  font-family: Space Grotesk, sans-serif;
}

.logo {
  height: auto;
  width: 15rem;
  margin: auto;
  margin-top: 4rem;
}

.test {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.doc-card {
  max-width: 15rem;
  margin: auto;
}

.margin {
  margin: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  margin-top: 2rem;
}

.content {
  height: 10rem;
  /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}
</style>
