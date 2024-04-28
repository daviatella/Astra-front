<template>
  <TopBar @update-search="updateSearchQuery" @expand-tag="expandTags" :search="true" />
  <div>
    <HomeSidebar></HomeSidebar>
    <div class="mb-5"></div>
    <v-expand-transition>
      <v-autocomplete v-if="expand" class="w-25 m-auto mr-16" v-model="currentTagNames" variant="outlined" :items="tags"
        color="blue-grey-lighten-2" item-title="name" item-value="raw" label="Tags" chips closable-chips multiple>

        <template v-slot:chip="{ props, item }">
          <v-chip v-bind="props" :color="item.raw.color" variant="flat"><v-icon v-if="item.raw.icon"
              :icon="'mdi-' + item.raw.icon"></v-icon>{{
                item.raw.name }}</v-chip>
        </template>

        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="item.raw.name" :subtitle="item.raw.title">
            <template v-slot:prepend>
              <v-icon :icon="'mdi-' + item.raw.icon"></v-icon>
            </template>
          </v-list-item>
        </template>
      </v-autocomplete>
    </v-expand-transition>
    <CreateButtons @create-doc="openModal('doc')" @create-board="openModal('board')" class="m-auto" />
    <v-container class="bg-deep-purple-lighten-5 mb-5 doc-container">
      <v-row>
        <v-col v-for="(card, index) in filteredDocs" :key="index" cols="20" sm="1" md="1" lg="2">
          <NexusCard :card="card" :travel="true" @open-modal="openModal" />
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
import CreateButtons from './shared/CreateButtons.vue';
import CreateModal from './shared/CreateModal.vue'
import HomeSidebar from './shared/HomeSidebar.vue';
import { useDocsStore } from '@/store.js'
import NexusCard from './shared/NexusCard.vue';

export default {
  async mounted() {
    this.store.selectedDoc = '';

    let tagsInfo = this.store.userInfo.tags
    this.tags = []

    for (let c of tagsInfo) {
      for (let t of c.items) {
        t.title = c.title;
      }
      this.tags.push(...c.items)
    }
  },
  data: () => ({
    doc: '',
    dialog: false,
    type: '',
    searchQuery: '',
    msgShow: false,
    msgColor: '',
    expand: false,
    store: useDocsStore(),
    currentTagNames: []
  }),
  computed: {
    userDocs() {
      return this.store.userDocs;
    },
    filteredDocs() {
      const query = this.searchQuery.toLowerCase();
      let newDocs = this.userDocs.filter(doc =>
        doc.title.toLowerCase().includes(query) ||
        doc.content.text.toLowerCase().includes(query)
      );
      if (!this.currentTagNames || this.currentTagNames.length === 0) {
        return newDocs;
      } else {
        return newDocs.filter(doc => {
          if (!doc.tags) {
            return false;
          }
          return this.currentTagNames.every(tagName => {
            return doc.tags.some(tag => tag.name === tagName);
          });
        });
      }
    }
  },
  emits: ['goDocs'],
  methods: {
    expandTags(){
      this.expand = !this.expand
    },
    async updateSearchQuery(query) {
      this.searchQuery = query;
    },
    closeModal(msg, color) {
      this.dialog = false;
      if (typeof msg == 'string') {
        this.msgShow = true;
        this.msgContent = msg
        this.msgColor = color
      }

    },
    openModal(type, doc) {
      this.dialog = true;
      this.type = type
      this.doc = doc;
    },
    
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
  flex: 1;
  width: 70vw;
  margin-left: 20vw;
  max-width: 80rem;
  /* Set a maximum width */
  margin-top: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;

}

.content {
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}
</style>
