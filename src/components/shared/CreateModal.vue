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
import TagModal from '../Tags/TagModal.vue';
import { createDocument, updateDocument, deleteDocument } from './docs.api';

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
            this.removeExtraTags()
            try {
                let newDoc = {
                    title: this.title,
                    type: this.type,
                    owner: this.store.user,
                    tags: this.currentTags,
                    content: {
                        text: '',
                        notes: '',
                        mindmap: {
                            elements: []
                        }
                    }
                };
                const responseData = await createDocument(newDoc);
                newDoc._id = responseData.id;
                newDoc._rev = responseData.rev;
                this.store.userDocs.push(newDoc);
                this.$router.push(`/${this.type == 'doc' ? 'document' : 'board'}/${responseData.id}`);
            } catch (error) {
                this.closeModal('Something went wrong. Please wait a second and try again.', 'Red');
            } finally {
                this.isLoading = false;
            }
        },

        async updateDoc() {
            this.isLoading = true;
            try {
                let data = {
                    title: this.title,
                    tags: this.currentTags
                };
                const responseData = await updateDocument(this.doc._id, data);
                let selectedDoc = this.store.userDocs.find(doc => doc._id == responseData.id);
                selectedDoc.title = this.title;
                selectedDoc.tags = this.currentTags;
                selectedDoc._rev = responseData.rev;
                this.closeModal('Document Updated Successfully', 'green');
            } catch (error) {
                console.error('Error updating document:', error);
                this.closeModal('Something went wrong. Please wait a second and try again.', 'Red');
            } finally {
                this.isLoading = false;
            }
        },
        async deleteDoc() {
            this.isLoading = true;
            try {
                const responseData = await deleteDocument(this.doc._id, this.doc._rev);
                console.log(this.store.userDocs.length)
                let test = this.store.userDocs.splice(this.store.userDocs.findIndex(el=>el._id==this.doc._id),1)
                console.log(this.store.userDocs.length)
                console.log(test)
                this.closeModal('Document Deleted Successfully', 'green');
            } catch (error) {
                console.error('Error deleting document:', error);
                this.closeModal('Something went wrong. Please wait a second and try again.', 'Red');
            } finally {
                this.isLoading = false;
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