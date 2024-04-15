<template>
  <v-app-bar :elevation="1" density="comfortable" :color="'deep-purple-lighten-5'">
    <v-btn @click="goToMainPage" class="ml-4" icon>
      <img src="../assets/logo.png" />
    </v-btn>


    <v-spacer />
    <v-text-field v-model="searchQuery" :loading="loading" class="search-box" append-inner-icon="mdi-magnify"
      density="compact" placeholder="Search" v-if="search==true" :clearable="true" variant="solo" @input="updateSearch"></v-text-field>
    <v-spacer />
    <v-btn @click="goToMainPage" class="mr-5 rounded-circle" icon>
      <img class="rounded-circle" src="https://randomuser.me/api/portraits/women/81.jpg" />
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: ['search'],
  data() {
    return {
      searchQuery: '',
      loading: false,
    };
  },
  methods: {
    goToMainPage() {
      this.$router.push('/');
    },
    updateSearch() {
      this.$emit('update-search', this.searchQuery);
    },
  },
};
</script>

<style>
.search-box {
  max-width: 50rem;
  margin: auto;
  margin-top: 0.5rem;
  font-family: Space Grotesk, sans-serif;
}
</style>
