<template>
  <v-app>
    <v-main>
      <TopBar/>
       <TabsBar/>
    </v-main>
  </v-app>
</template>

<script>
import ViewDocs from './components/ViewDocs.vue';
import TopBar from './components/TopBar.vue';
import TabsBar from './components/Document/TabsBar.vue'
import Flow from './components/Document/Flow.vue'
export default {
    data() {
        return {
            isFlow: false,
            isViewDocs: true
        };
    },
    methods: {
        toggleFlow() {
            this.isViewDocs = !this.isViewDocs;
            this.isFlow = !this.isFlow;
        }
    },
    components: { TabsBar }
};

</script>
