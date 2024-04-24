<template>
  <v-navigation-drawer location="left" class="bg-deep-purple-lighten-5 sidebar" width="5rem">
    <v-list class="mt-2 text">
      <v-list-item prepend-icon="mdi-file-document-multiple" to="/" value="home">
        <template v-slot:title="{}">
          <div v-html="'Documents'"></div>
        </template>
      </v-list-item>
      <v-list-item prepend-icon="mdi-folder-multiple" to="/projects/" title="Projects" value="account">
        <template v-slot:title="{}">
          <div class="sidebar" v-html="'Projects'"></div>
        </template>
      </v-list-item>
      <v-list-item prepend-icon="mdi-tag-multiple" title="Tags" to="/tags/" value="tags">
        <template v-slot:title="{}">
          <div class="sidebar" v-html="'Tags'"></div>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>

<style scoped>
.login-info {
  margin-bottom: -1em;
}

.sidebar {
  text-align: left;
}

.text {
  font-family: Space Grotesk, sans-serif;
  justify-content: left;
}
</style>