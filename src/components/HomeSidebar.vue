<template>
   <v-navigation-drawer
        location="left"
        class="bg-deep-purple-lighten-5"
      >
        <v-list class="mt-2 text" >
          <v-list-item  prepend-icon="mdi-file-document-multiple" title="Documents" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-folder-multiple" title="Projects" value="account"></v-list-item>
          <v-list-item  prepend-icon="mdi-tag-multiple" title="Tags" value="users"></v-list-item>
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

 .text {
  font-family: Space Grotesk, sans-serif;
  justify-content: left;
 }
  </style>
  