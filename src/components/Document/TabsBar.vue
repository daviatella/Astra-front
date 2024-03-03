<template>
        <v-tabs v-model="tab" align-tabs="center" class="tabs-bar" >
            <v-tab class="tab" value="tab-1">
                Document
            </v-tab>

            <v-tab class="tab"  value="tab-2">
                Notes
            </v-tab>

            <v-tab class="tab"  value="tab-3">
                MindMap
            </v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item   :key="1" :value="'tab-' + 1">
                <div class="choice">
                <Document  />
            </div>
            </v-window-item>
            <v-window-item   :key="2" :value="'tab-' + 2">
                <div class="choice">
                <Notes />
            </div>
            </v-window-item>
            <v-window-item    :key="3" :value="'tab-' + 3">
            </v-window-item>
        </v-window>
        <Flow  />

</template>
  
<script>
import Document from './Document.vue'
import Notes from './Notes.vue';
import Flow from './Flow.vue';

export default {
    data() {
        return {
            tab: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },
    methods: {

    }
}
</script>

<style scoped>

.tabs-bar {
    margin: auto;
    margin-bottom: 0rem;
    margin-top: 1rem;
}

.tab {
    border: 1px solid black ;
    z-index: 9;
}

.choice {
    z-index: 1;
    margin-top: 1rem;
}

</style>