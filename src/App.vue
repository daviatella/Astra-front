<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
import TopBar from './components/TopBar.vue';

export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {

  },
  components: { TopBar }
};

</script>
