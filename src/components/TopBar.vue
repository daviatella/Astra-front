<template>
  <v-toolbar elevated :color="'deep-purple-lighten-5'">
        <v-text-field :loading="loading" class="search-box" append-inner-icon="mdi-magnify" density="compact" label="Search" variant="outlined"></v-text-field>
    <v-toolbar-items class="hidden-xs-only">
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({

  }),
};
</script>

<style>
.astra-title {
  margin: 1rem;
  text-align: center;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.search-box {
  max-width: 50rem;
  margin:auto;
  margin-top: 0.5rem;
  font-family: Space Grotesk, sans-serif;
}

.astra-bar {
  background-color: blueviolet;
}
</style>
