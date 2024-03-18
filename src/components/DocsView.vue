<template>
  <v-overlay :model-value="isLoading" class="align-center justify-center">
    <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
  </v-overlay>
  <div v-if="!isLoading">
    <CreateButtons @goDocs="toggleFlow" class="b-bar" />
    <v-container class="bg-deep-purple-lighten-5 doc-container">
      <v-row>
        <v-col v-for="(card, index) in cards" :key="index" cols="15" sm="2" md="4" lg="2">
          <v-card @click="goToDocument(card._id)" class="rounded-lg doc-card">
            <header class="card-header">
              <p class="card-header-title">
                {{ card.title }}
              </p>
            </header>
            <div class="content">
              <v-img :src="getImagePath(card.type)" class="test"></v-img>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">{{ card.count + ' words' || '5000 words' }}</p>
            </footer>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CreateButtons from './CreateButtons.vue';
import { useDocsStore } from '@/store.js'
import axios from 'axios'
import { toRaw } from 'vue';

export default {
  async mounted() {
    const store = useDocsStore()
    console.log(store.userDocs)
    if (!store.userDocs) {
      try {
        const response = await fetch('http://localhost:4000/api/docs-by-type');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        this.cards = responseData.data;
        store.$state = { userDocs: responseData.data }
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      this.cards =store.userDocs
      this.isLoading=false;
    }
  },
  data: () => ({
    cards: [],
    isLoading: true
  }),
  emits: ['goDocs'],
  methods: {
    goToDocument(id) {
      console.log(id)
      this.$router.push('/document/' + id)
    },
    getImagePath(type) {
      return new URL(`../assets/${type}-icon.png`, import.meta.url).href
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

.doc-container {
  width: 1800px;
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
