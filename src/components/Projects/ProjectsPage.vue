<template>
  <v-overlay :model-value="isLoading" class="align-center justify-center">
    <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
  </v-overlay>
  <TopBar></TopBar>
  <HomeSidebar></HomeSidebar>


</template>

<script>
import TopBar from '../TopBar.vue';
import HomeSidebar from '../HomeSidebar.vue';
import CreateButtons from '../CreateButtons.vue';
import { useDocsStore } from '@/store';

export default {
  props: [],
  data() {
    return {

    };
  },

  methods: {

  },
};
</script>

<style>

</style>
