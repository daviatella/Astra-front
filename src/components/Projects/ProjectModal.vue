<template>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
    </v-overlay>
    <v-card v-if="this.type != 'delete'" class="w-75 m-auto">
        <div class="text bg-banner bg-black">
            <v-card-title>{{ this.project ? "Update" : "Create" }} Project</v-card-title>
        </div>
        <v-card-text class="w-100">
            <v-text-field :rules="[rules.required]" label="Project Name" v-model="projectName" class="m-auto"
                variant="outlined"></v-text-field>
            <div style="display: flex; align-items: center;">
                <v-card-subtitle class="text-h5">Boards</v-card-subtitle>
                <v-btn class=" ml-2" @click="toggleDocsModal('board')" icon="mdi-plus"></v-btn>
            </div>
            <v-container class="">
                <drop-list :items="chosenBoards" @reorder="$event.apply(chosenBoards)"
                    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
                    <template v-slot:item="{ item }">
                        <drag :key="item._id" :data="item">
                            <NexusCard :card="item" class='w-75' :travel="false" />
                        </drag>
                    </template>
                    <template v-slot:reordering-drag-image>
                        <v-skeleton-loader type="card" style="border-left: 2px solid #1976D2; margin-left: -2px;" />
                    </template>/>
                    <template v-slot:feedback="{ data }">
                    </template>
                </drop-list>
            </v-container>
            <v-divider></v-divider>
            <div style="display: flex; align-items: center;">
                <v-card-subtitle class="text-h5">Nexus</v-card-subtitle>
                <v-btn class=" ml-2" @click="toggleDocsModal('doc')" icon="mdi-plus"></v-btn>
            </div>
            <v-container class="">
                <drop-list :items="chosenNexus" @reorder="$event.apply(chosenNexus)"
                    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
                    <template v-slot:item="{ item }">
                        <drag :key="item._id" :data="item">
                            <NexusCard :card="item" style="z-index: 99999;" class='w-75' :travel="false" />
                        </drag>
                    </template>
                    <template v-slot:reordering-drag-image>
                        <v-skeleton-loader type="card" style="border-left: 2px solid #1976D2; margin-left: -2px;" />
                    </template>/>
                    <template v-slot:feedback="{ data }">
                    </template>
                </drop-list>
            </v-container>
            <v-divider></v-divider>
            <v-autocomplete class="" v-model="currentTagNames" :key="loader" variant="outlined" :items="tags"
                color="blue-grey-lighten-2" item-title="name" item-value="raw" label="Select Tags" chips closable-chips
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
        </v-card-text>
        <div class="text bg-banner bg-black">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="outlined">{{ this.project ? "Update" :
                    "Create"
                    }}</v-btn>
                <v-btn variant="outlined" @click="closeModal">Cancel</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </div>
    </v-card>
    <v-card v-if="this.type == 'delete'" class="small-modal rounded-lg">
        <div class="text bg-banner bg-red-lighten-1">
            <v-card-title>Delete Project</v-card-title>
        </div>
        <v-spacer></v-spacer>
        <v-card-text>
            <v-card-subtitle class="text text-wrap text-h6"> Are you sure you wish to delete this project? The
                individual documents will remain available. This action is not reversible.</v-card-subtitle>
        </v-card-text>
        <v-spacer></v-spacer>
        <div class="bg-banner bg-red-lighten-1">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="outlined" class="text" @click="closeModal">Cancel</v-btn>
                <v-btn variant="outlined" class="text" @click="">Delete</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </div>
    </v-card>
    <v-dialog v-model="docsModal" width="auto">
        <DocsModal :type="docType" @closeModal="closeDocModal"></DocsModal>
    </v-dialog>
</template>

<script>
import { useDocsStore } from '@/store.js'
import DocsModal from './DocsModal.vue';
import { Drag, Drop, DropList } from "vue-easy-dnd";

export default {
    props: [
        'project'
    ],
    components: {
        Drag,
        DropList,
        Drop
    },
    mounted() {
        this.loadTags()
        // if (this.project) {
        //     if (this.project.tags) {
        //         this.currentTags = this.project.tags
        //         this.currentTags.map((tag) => {
        //             this.currentTagNames.push(tag.name)
        //         })
        //     }
        //     this.title = this.project.title
        // }
    },
    data() {
        return {
            title: '',
            docsModal: false,
            store: useDocsStore(),
            tags: [],
            chosenBoards: [],
            chosenNexus: [],
            currentTagNames: [],
            isLoading: false,
            projectName: '',
            currentTags: [],
            loader: 0,
            rules: {
                required: value => !!value || 'Required.',
                uniqueTag: value => this.isTagUnique(value) || 'Tag name already exists in this category.',
                unique: value => !this.categories.includes(value) || 'Category already exists',
            },

        }
    },
    methods: {
        loadTags() {
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
        toggleDocsModal(type) {
            this.docType = type
            this.docsModal = true;
        },
        closeDocModal(docs) {
            this.docsModal = false;
            if (this.docType == 'board') {
                this.chosenBoards = docs
            } else {
                this.chosenNexus = docs
            }
            this.loader++;
        },
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
        handleTagSelection(item) {
            if (!this.currentTags.includes(item)) {
                this.currentTags.push(item)
            }
        },
        removeExtraTags() {
            if (this.currentTags.length != this.currentTagNames.length) {
                this.currentTags = this.currentTags.filter(el => this.currentTagNames.includes(el.name))
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