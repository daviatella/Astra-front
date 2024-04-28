<template>
  <v-overlay :model-value="isLoading" class="align-center justify-center">
    <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
  </v-overlay>
  <TopBar @update-search="updateSearchQuery" @expand-tag="expandTags" :search="true"></TopBar>
  <HomeSidebar></HomeSidebar>
  <v-container class="test m-auto">
    <v-btn class="m-auto bg-black" icon="mdi-plus" @click="toggleModal" />
  </v-container>
  <v-container class="bg-purple-lighten-5 doc-container">
    <v-row>
      <v-col v-for="(card, index) in store.userProjs" :key="index" cols="20" sm="1" md="1" lg="2">
        <v-card @click="" class="rounded-lg doc-card">
          <header class="card-header ch-title text-truncate">
            <div style="width:75%" class="m-auto">
              <p class="text-truncate ml-n2">{{ card.title }}</p>
            </div>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" style="margin-top: -2px;margin-right: -2px;" size="small" :flat="true"
                  variant="plain" v-bind="props" />
              </template>
              <v-list>
                <v-list-item @click="openModal('update', card)">
                  <v-list-item-title>Update Project</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openModal('delete', card)">
                  <v-list-item-title>Delete Project</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </header>
          <div class="content">
            <v-icon size='x-large' icon="mdi-folder-multiple" class="w-100"></v-icon>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog class="m-auto" v-model="dialog">
    <ProjectModal @close-modal="dialog=false"></ProjectModal>
  </v-dialog>
</template>

<script>
import TopBar from '../shared/TopBar.vue';
import HomeSidebar from '../shared/HomeSidebar.vue';
import ProjectModal from './ProjectModal.vue'
import { useDocsStore } from '@/store';

export default {
  props: [],
  data() {

    return {
      dialog: false,
      store: useDocsStore(),
    };
  },
  methods: {
    toggleModal() {
      this.dialog = !this.dialog
    },
  },
};
</script>

<style scoped>
.test {
  width: fit-content;
}

.doc-container {
  flex: 1;
  width: 70vw;
  margin-left: 20vw;
  max-width: 80rem;
  margin-top: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;

}
</style>
