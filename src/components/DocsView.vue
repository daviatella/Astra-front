<template>
  <v-overlay :model-value="isLoading" class="align-center justify-center">
    <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
  </v-overlay>
  <TopBar @update-search="updateSearchQuery" :search="true" />
  <div v-if="!isLoading">
    <HomeSidebar></HomeSidebar>
    <CreateButtons @create-doc="openModal('doc')" @create-board="openModal('board')" class="b-bar" />
    <v-container class="bg-deep-purple-lighten-5 mb-5 doc-container">
      <v-row>
        <v-col v-for="(card, index) in filteredDocs" :key="index" cols="20" sm="2" md="2" lg="2">
          <v-card @click="goToDocument(card._id, card.type)" class="rounded-lg doc-card">
            <header class="card-header">
              <div style="width:85%">
                <p class="card-header-title text-truncate">
                  {{ card.title }}
                </p>
              </div>
              <v-menu>

                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" size="small" class="ml-3" variant="plain" v-bind="props" />
                </template>
                <v-list>
                  <v-list-item @click="openModal('update', card)">
                    <v-list-item-title>Update Nexus</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="openModal('', card)">
                    <v-list-item-title>Create a Copy</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="openModal('delete', card)">
                    <v-list-item-title>Delete Nexus</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </header>
            <div class="content">
              <v-img :src="getImagePath(card.type)" class="content-image"></v-img>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">{{ getWordCount(card.content, card.type) }}</p>
            </footer>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" width="auto">
      <CreateModal :type="type" :doc="doc" @close-modal="closeModal" />
    </v-dialog>
    <v-snackbar v-model="msgShow" :timeout="4000" :color="msgColor" class="mb-16" rounded="pill">
      {{ msgContent }}
    </v-snackbar>
  </div>
</template>

<script>
import CreateButtons from './CreateButtons.vue';
import CreateModal from './CreateModal.vue'
import HomeSidebar from './HomeSidebar.vue';
import { useDocsStore } from '@/store.js'

export default {
  async mounted() {
    this.store = useDocsStore()
    this.store.selectedDoc = '';
    let b = {
      user: this.store.user
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
    await this.getUserInfo("daviatella", "123")
  },
  data: () => ({
    doc: '',
    isLoading: true,
    dialog: false,
    type: '',
    searchQuery: '',
    msgShow: false,
    msgColor: ''
  }),
  computed: {
    userDocs() {
      return this.store.userDocs;
    },
    filteredDocs() {
      const query = this.searchQuery.toLowerCase();
      return this.userDocs.filter(doc =>
        doc.title.toLowerCase().includes(query) ||
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
    async updateSearchQuery(query) {
      this.searchQuery = query;
    },
    getImagePath(type) {
      return new URL(`../assets/${type}-icon.png`, import.meta.url).href
    },
    closeModal(msg, color) {
      this.dialog = false;
      if (typeof msg == 'string') {
        this.msgShow = true;
        this.msgContent = msg
        this.msgColor =color
      }

    },
    openModal(type, doc) {
      this.dialog = true;
      this.type = type
      this.doc = doc;
    },
    getWordCount(content, type) {
      if (type == 'doc') {
        if (content.text) {
          let num = content.text.trim().split(/\s+/).length
          return num + (num > 1 ? ' words' : ' word');
        } else {
          return '0 words'
        }
      } else {
        if (content.mindmap.elements) {
          let num = content.mindmap.elements.filter(el => el.dimensions).length
          return num + (num > 1 ? ' nodes' : ' node');
        } else {
          return '0 node'
        }
      }

    },
    async getUserInfo(email, pw) {
      let b = {
        email: email,
        password: pw
      }
      if (!this.store.userInfo) {
        try {
          const response = await fetch('http://localhost:4000/api/users/login', {
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
          this.store.userInfo = responseData.data
          this.isLoading = false;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
p {
  font-family: Space Grotesk, sans-serif;
  display: block
}

.logo {
  height: auto;
  width: 15rem;
  margin: auto;
  margin-top: 4rem;
}

.content-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.card-header .v-btn {
  position: absolute;
  top: 0.2rem;
  right: 0.01rem;
}

.doc-card {
  max-width: 11rem;
  margin: auto;
}

.doc-container {
  width: 1400px;
  margin-right: 10rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  margin-top: 2rem;
}

.content {
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}
</style>
