<template>
  <v-app>
    <v-main>
      <TopBar type="logo"/>
      <RouterView/>
    </v-main>
  </v-app>
</template>

<script>
import TopBar from './components/TopBar.vue';

export default {
    data() {
        return {

        };
    },
    components: {TopBar}
};

</script>
