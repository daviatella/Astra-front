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
        <v-btn class="save-button bg-deep-purple-lighten-1" @click="saveDoc">
            Save
        </v-btn>
    </v-tabs>
    <v-window v-model="tab">
        <v-window-item :key="1" :value="'tab-' + 1">
            <div class="choice">
                <TextPanel :content="selectedDoc" />
            </div>
        </v-window-item>
        <v-window-item :key="2" :value="'tab-' + 2">
            <div class="choice">
                <NotesPanel :content="selectedDoc" />
            </div>
        </v-window-item>
        <v-window-item :key="3" :value="'tab-' + 3">
        </v-window-item>
    </v-window>

    <Flow ref="flow" v-if="isFlow" :selectedDoc="selectedDoc" />

</template>

<script>
import TextPanel from './TextPanel.vue'
import NotesPanel from './NotesPanel.vue';
import Flow from '../Flow/Flow.vue';
import { useDocsStore } from '@/store.js'


export default {
    props: ['id'],
    mounted() {
        console.log(this.id)
        const store = useDocsStore()
        if (store.userDocs) {
            store.selectedDoc = store.userDocs.filter(doc => doc._id == this.id)[0]
            this.selectedDoc = store.selectedDoc
            store.mindmap = this.selectedDoc.content.mindmap
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
        },
        async saveDoc() {
            try {
                const response = await fetch('http://localhost:4000/api/docs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.selectedDoc)
                });
                if (!response.ok) {
                    console.log(response)
                    throw new Error(response);
                }
                const responseData = await response.json();
                console.log(responseData)
                this.selectedDoc._rev=responseData.data.rev
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
}
</script>

<style scoped>
.save-button {
    margin-left: 200px;
    margin-top: 10px;
}

.tabs-bar {
    margin-left: 16rem;
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