<template>
    <v-tabs v-model="tab" align-tabs="center" class="tabs-bar">
        <v-tab class="tab" value="tab-1" @click="toggleFlow(1)">
            Document
        </v-tab>

        <v-tab class="tab" value="tab-2" @click="toggleFlow(2)">
            Notes
        </v-tab>

        <v-tab class="tab" value="tab-3" @click="toggleFlow(3)">
            MindMap
        </v-tab>
    </v-tabs>
    <v-window v-model="tab">
        <v-window-item :key="1" :value="'tab-' + 1">
            <div class="choice">
                <TextPanel :content="content.text" />
            </div>
        </v-window-item>
        <v-window-item :key="2" :value="'tab-' + 2">
            <div class="choice">
                <NotesPanel />
            </div>
        </v-window-item>
        <v-window-item :key="3" :value="'tab-' + 3">
        </v-window-item>
    </v-window>
    <Flow v-if="isFlow" :mindmap="content.mindmap" />

</template>

<script>
import TextPanel from './TextPanel.vue'
import NotesPanel from './NotesPanel.vue';
import Flow from '../Flow/Flow.vue';
import { useDocsStore } from '@/store.js'


export default {
    props:['id'],
    mounted() {
        console.log(this.id)
        const store = useDocsStore()
        if(store.userDocs){
            this.content = store.userDocs.filter(doc => doc._id ==this.id)[0].content
        }
    },
    data() {
        return {
            tab: null,
            isFlow: false
        }
    },
    methods: {
        toggleFlow(id) {
            if (id == 3) {
                this.isFlow = true;
            } else {
                this.isFlow = false;
            }
        }
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
    border: 1px solid black;
    z-index: 9;
}

.choice {
    z-index: 1;
    margin-top: 1rem;
}
</style>./TextPanel.vue./NotesPanel.vue