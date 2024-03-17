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
                <Document :content="content" />
            </div>
        </v-window-item>
        <v-window-item :key="2" :value="'tab-' + 2">
            <div class="choice">
                <Notes />
            </div>
        </v-window-item>
        <v-window-item :key="3" :value="'tab-' + 3">
        </v-window-item>
    </v-window>
    <Flow v-if="isFlow" />

</template>

<script>
import Document from './Document.vue'
import Notes from './Notes.vue';
import Flow from '../Flow/Flow.vue';
import {toRaw} from 'vue'

export default {
    props: {
        content: Object
    },
    mounted() {
        console.log(toRaw(this.content))
        this.text = this.content.text
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
</style>../Flow/Flow.vue