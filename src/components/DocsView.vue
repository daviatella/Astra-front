<template>
  <v-overlay :model-value="isLoading" class="align-center justify-center">
    <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
  </v-overlay>
  <div v-if="!isLoading">
    <CreateButtons @create-doc="dialog = true, type = 'doc'" @create-board="dialog = true, type = 'board'"
      class="b-bar" />
      <v-text-field v-model="searchQuery" label="Search" variant="outlined" dense class="container w-50 mt-5"></v-text-field>
    <v-container class="bg-deep-purple-lighten-5 mb-5 doc-container">
      <v-row>
        <v-col v-for="(card, index) in filteredDocs" :key="index" cols="20" sm="2" md="2" lg="2">
          <v-card @click="goToDocument(card._id, card.type)" class="rounded-lg doc-card">
            <header class="card-header">
              <p class="card-header-title">
                {{ card.title }}
              </p>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" variant="plain" v-bind="props" />
                </template>
                <v-list>
                  <v-list-item @click="renameDoc(card)">
                    <v-list-item-title>Rename Document</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="copyDoc(card)">
                    <v-list-item-title>Create a Copy</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteDoc(card)">
                    <v-list-item-title>Delete Document</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </header>
            <div class="content">
              <v-img :src="getImagePath(card.type)" class="test"></v-img>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">{{ card.content.text.split(" ").length + ' words' || '5000 words' }}</p>
            </footer>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" width="auto">
      <CreateModal :type="type" :doc="doc" @close-modal="dialog = false" />
    </v-dialog>
  </div>
</template>

<script>
import CreateButtons from './CreateButtons.vue';
import CreateModal from './CreateModal.vue'
import { useDocsStore } from '@/store.js'

export default {
  async mounted() {
    this.store = useDocsStore()
    this.store.selectedDoc = '';
    let b = {
      owner: this.store.user
    }
    if (!this.store.userDocs) {
      try {
        const response = await fetch('http://localhost:4000/api/docs-by-owner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(b)
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        this.store.$state = { userDocs: responseData.data }
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      this.isLoading = false;
    }
  },
  data: () => ({
    doc: '',
    isLoading: true,
    dialog: false,
    type: '',
    searchQuery: ''
  }),
  computed: {
    userDocs() {
      return this.store.userDocs;
    },
    filteredDocs() {
      const query = this.searchQuery.toLowerCase();
      return this.userDocs.filter(doc =>
        doc.title.toLowerCase().includes(query)||
        doc.content.text.toLowerCase().includes(query)
      );
    }
  },
  emits: ['goDocs'],
  methods: {
    goToDocument(id, type) {
      if (type == 'doc') {
        this.$router.push('/document/' + id)
      } else {
        this.$router.push('/board/' + id)
      }
    },
    getImagePath(type) {
      return new URL(`../assets/${type}-icon.png`, import.meta.url).href
    },
    renameDoc(doc) {
      this.dialog = true
      this.type = 'update'
      this.doc = doc;
    },
    copyDoc(doc) {
      console.log(doc)
    },
    deleteDoc(doc) {
      this.dialog = true
      this.type = 'delete'
      this.doc = doc;
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
  max-width: 11rem;
  margin: auto;
}

.doc-container {
  width: 1400px;
  margin: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  margin-top: 2rem;
}

.content {
  height: 5rem; /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}
</style>
