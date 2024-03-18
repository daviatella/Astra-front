<template>
  <v-toolbar  :elevation="1" density="comfortable" :color="'deep-purple-lighten-5'">
    <v-spacer/>
    <v-text-field v-if="type == 'search'" :loading="loading" class="search-box" append-inner-icon="mdi-magnify"
      density="compact" label="Search" variant="outlined"></v-text-field>
      <v-btn @click="goToMainPage" v-if="type == 'logo'" icon>
        <img src="../assets/logo.png" />
      </v-btn>
    <v-spacer/>
  </v-toolbar>
</template>

<script>
export default {
  props: [
    'type'
  ],
  data: () => ({

  }),
  methods: {
    goToMainPage(){
      this.$router.push('/')
    }
  }
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
