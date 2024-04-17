<template>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
    </v-overlay>
    <v-card v-if="this.type != 'delete'" class="modal rounded-lg">
        <div class="text bg-banner" :class="{ 'bg-purple': this.type == 'doc', 'bg-orange': this.type == 'board' }">
            <v-card-title>{{ this.doc ? "Update" : "Create" }} {{ this.type == 'doc' ? 'Nexus' : 'Board'
                }}</v-card-title>
        </div>
        <v-card-text class="w-100">
            <v-text-field label="Title" v-model="title" class="w-75 m-auto" variant="outlined"></v-text-field>
            <v-divider class="mt-n2"></v-divider>
            <v-card-title class="text mt-n5"> Tags </v-card-title>
            <div style="display: flex; align-items: center;">
                <v-autocomplete v-model="currentTagNames" :key="loader" variant="outlined" :items="tags"
                    color="blue-grey-lighten-2" item-title="name" item-value="raw" label="Select" chips closable-chips
                    multiple>

                    <template v-slot:chip="{ props, item }">
                        <v-chip v-bind="props" @click:close="removeTag(item.raw)" :color="item.raw.color"
                            variant="flat"><v-icon v-if="item.raw.icon" :icon="'mdi-' + item.raw.icon"></v-icon>{{
                                item.raw.name }}</v-chip>
                    </template>

                    <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :title="item.raw.name" @click="handleTagSelection(item.raw)"
                            :subtitle="item.raw.title">
                            <template v-slot:prepend>
                                <v-icon :icon="'mdi-' + item.raw.icon"></v-icon>
                            </template>
                        </v-list-item>
                    </template>

                </v-autocomplete>
                <v-tooltip location="top" text="Create Tag">
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-plus" v-bind="props" variant="solo" class="ml-3 mb-4 bg-grey-lighten-2"
                            @click="tagModal = true"></v-btn>
                    </template>
                </v-tooltip>
            </div>
        </v-card-text>
        <div class="text bg-banner" :class="{ 'bg-purple': this.type == 'doc', 'bg-orange': this.type == 'board' }">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="outlined" @click="this.doc ? updateDoc() : createDoc()">{{ this.doc ? "Update" :
                    "Create"
                    }}</v-btn>
                <v-btn variant="outlined" @click="closeModal">Cancel</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </div>
        <!--  -->
    </v-card>
    <v-card v-if="this.type == 'delete'" class="small-modal rounded-lg">
        <div class="text bg-banner bg-red-lighten-1">
            <v-card-title>Delete Document</v-card-title>
        </div>
        <v-spacer></v-spacer>
        <v-card-text>
            <v-card-subtitle class="text text-wrap text-h6"> Are you sure you wish to delete this document? This action
                is
                not reversible.</v-card-subtitle>
        </v-card-text>
        <v-spacer></v-spacer>
        <div class="bg-banner bg-red-lighten-1">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="outlined" class="text" @click="closeModal">Cancel</v-btn>
                <v-btn variant="outlined" class="text" @click="deleteDoc">Delete</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </div>
    </v-card>
    <v-dialog v-model="tagModal" width="auto">
        <TagModal @closeModal="toggleTagModal"></TagModal>
    </v-dialog>
</template>

<script>
import { useDocsStore } from '@/store.js'
import TagModal from './TagModal.vue';

export default {
    props: [
        'type',
        'doc'
    ],
    mounted() {
        this.updateTags()
        if (this.doc) {
            if (this.doc.tags) {
                this.currentTags = this.doc.tags
                this.currentTags.map((tag) => {
                    this.currentTagNames.push(tag.name)
                })
            }
            this.title = this.doc.title
        }
    },
    data() {
        return {
            title: '',
            store: useDocsStore(),
            isLoading: false,
            currentTags: [],
            currentTagNames: [],
            tagModal: false,
            loader: 0
        }
    },
    methods: {
        removeTag(chip) {
            this.currentTags = this.currentTags.filter((tag) => {
                return JSON.stringify(tag) != JSON.stringify(chip)
            })
        },
        updateTags() {
            let tagsInfo = this.store.userInfo.tags
            this.tags = []

            for (let c of tagsInfo) {
                for (let t of c.items) {
                    t.title = c.title;
                }
                this.tags.push(...c.items)
            }
            this.loader++;
        },
        toggleTagModal(tagCreated) {
            if (tagCreated) {
                this.updateTags()
            }
            this.tagModal = false
        },
        handleTagSelection(item) {
            if (!this.currentTags.includes(item)) {
                this.currentTags.push(item)
            }
        },
        removeExtraTags(){
            if(this.currentTags.length!=this.currentTagNames.length){
                this.currentTags = this.currentTags.filter(el => this.currentTagNames.includes(el.name))
            }
        },
        async createDoc() {
            this.isLoading = true;
            let method = "POST"
            let newDoc = {}
            let id = ''
            this.removeExtraTags()
            newDoc = {
                "title": this.title,
                "type": this.type,
                "owner": this.store.user,
                "tags": this.currentTags,
                "content": {
                    "text": "",
                    "notes": "",
                    "mindmap": {
                        "elements": []
                    }
                }
            }

            try {
                const response = await fetch('http://localhost:4000/api/docs/' + id, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newDoc)
                })
                if (!response.ok) {
                    console.log(response)
                    throw new Error(response);
                } else {
                    const responseData = await response.json();
                    newDoc._id = responseData.data.id;
                    newDoc._rev = responseData.data.rev;
                    this.store.userDocs.push(newDoc)
                    this.$router.push("/" + (this.type == 'doc' ? 'document' : 'board') + '/' + responseData.data.id)
                }

            } catch (error) {
                this.closeModal("Something went wrong. Please wait a second and try again.", "Red")
            }
        },

        async updateDoc() {
            this.isLoading = true;
            this.removeExtraTags()
            let b = {
                title: this.title,
                tags: this.currentTags
            }
            try {
                const response = await fetch('http://localhost:4000/api/docs/' + this.doc._id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(b)
                })
                if (!response.ok) {
                    console.log(response)
                    throw new Error(response);
                } else {
                    const responseData = await response.json();
                    console.log(responseData)

                    let selectedDoc = this.store.userDocs.filter(doc => doc._id == responseData.data.id)[0]
                    selectedDoc.title = this.title
                    selectedDoc.tags = this.currentTags
                    selectedDoc._rev = responseData.data.rev
                    this.isLoading = false;
                    this.closeModal("Document Updated Successfully", "green")
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                this.closeModal("Something went wrong. Please wait a second and try again.", "Red")
            }
        },

        async deleteDoc() {
            console.log(this.doc)
            this.isLoading = true;
            let queryParams = {
                rev: this.doc._rev
            }
            const queryString = new URLSearchParams(queryParams).toString();
            try {
                const response = await fetch('http://localhost:4000/api/docs/' + this.doc._id + '?' + queryString, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (!response.ok) {
                    console.log(response)
                    throw new Error(response);
                } else {
                    const responseData = await response.json();
                    console.log(responseData)
                    console.log("first - " + this.store.userDocs.length)
                    this.store.userDocs = this.store.userDocs.filter(doc => doc._id !== this.doc._id)
                    console.log("second - " + this.store.userDocs.length)

                    this.isLoading = false;
                    this.closeModal("Document Deleted Successfully", "green")
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                this.closeModal("Something went wrong. Please wait a second and try again.", "Red")
            }
        },

        closeModal(msg, color) {
            this.$emit("closeModal", msg, color)
        }

    }
};
</script>

<style>
.text {
    font-family: Space Grotesk, sans-serif;
    text-align: center;
    justify-content: center;
}

.bg-banner {
    width: 100%;
}

.modal {
    width: 800px;
    height: fit-content;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
}

.small-modal {
    width: 500px;
    height: 250px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    color: black;
    text-align: center;
    justify-content: center;

}
</style>