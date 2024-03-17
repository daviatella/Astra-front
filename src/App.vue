<template>
  <v-app>
    <v-main>
      <TopBar type="logo"/>
      <ViewDocs v-if="isViewDocs" @goDocs="toggleFlow"/>
       <TabsBar v-if="isDoc" :content="chosenContent"/>
    </v-main>
  </v-app>
</template>

<script>
import ViewDocs from './components/ViewDocs.vue';
import TopBar from './components/TopBar.vue';
import TabsBar from './components/Document/TabsBar.vue'
import Document from './components/Document/Document.vue';
import Flow from './components/Flow/Flow.vue'
import {toRaw} from 'vue'

export default {
    data() {
        return {
            isDoc: false,
            isViewDocs: true,
            chosenContent: null
        };
    },
    methods: {
        toggleFlow(c) {
            console.log(c)
            this.chosenContent=toRaw(c);
            this.isViewDocs = false;
            this.isDoc = true;
        }
    },
    components: { TabsBar, TopBar, ViewDocs }
};

</script>
