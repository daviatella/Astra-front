<template>
  <v-overlay :model-value="isLoading" class="align-center justify-center">
    <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
  </v-overlay>
  <TopBar></TopBar>
  <HomeSidebar></HomeSidebar>
  <div class="container m-auto">
  <v-btn class="mt-8" @click="toggleModal"> Create Project </v-btn>
</div>
<v-dialog class="m-auto" v-model="dialog">
  <ProjectModal ></ProjectModal>
</v-dialog>
</template>

<script>
import TopBar from '../TopBar.vue';
import HomeSidebar from '../HomeSidebar.vue';
import ProjectModal from './ProjectModal.vue'
import CreateButtons from '../CreateButtons.vue';
import { useDocsStore } from '@/store';

export default {
  props: [],
  data() {
    return {
      dialog: false,
      
    };
  },

  methods: {
    toggleModal(){
            this.dialog=!this.dialog
        },
  },
};
</script>

<style>

</style>
