<template>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
    </v-overlay>
    <v-card class="modal rounded-lg">
        <div class="text bg-banner bg-green-lighten-2">
            <v-card-title>{{ this.updateInfo ? 'Update' : 'Create' }} Tag</v-card-title>
        </div>
        <v-card-text class="w-100">
            <div style="display: flex; align-items: center;">
                <v-select v-if="!newCategory" label="Category" v-model="chosenCategory"
                    @update:modelValue="updateDefaults" class="m-auto cat-box" :items="categories"
                    variant="outlined"></v-select>
                <v-text-field v-if="newCategory" :rules="[rules.required, rules.unique]" label="New Category Name"
                    v-model="chosenCategory" class="m-auto cat-box" variant="outlined"></v-text-field>
                <v-tooltip location="top" :text="newCategory ? 'Cancel' : 'New Category'">
                    <template v-slot:activator="{ props }">
                        <v-btn :icon="newCategory ? 'mdi-close' : 'mdi-plus'" v-bind="props" variant="solo"
                            class="ml-3 mb-3 bg-grey-lighten-2" @click="toggleNewCategory"></v-btn>
                    </template>
                </v-tooltip>
            </div>
            <div style="display: flex; align-items: center;">
                <v-text-field label="Tag Name" :rules="[rules.required, rules.uniqueTag]" v-model="tagName"
                    class="m-auto" variant="outlined"></v-text-field>
                <v-menu v-model="menu" class="w-100 color-menu container" :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                        <div @click="menu = true" class="ml-4 mb-4 mr-4" style="border: solid grey 1px"
                            :style="swatchStyle" v-on="on" />
                    </template>
                    <v-card class="h-100 w-100">
                        <v-card-text class="pa-0">
                            <v-color-picker mode="hex" v-model="color" />
                        </v-card-text>
                    </v-card>
                </v-menu>
                <v-autocomplete v-model="currentIcon" variant="outlined" :items="icons" color="blue-grey-lighten-2"
                    item-title="name" item-value="raw" label="Tag Icon">

                    <template v-slot:prepend-inner>
                        <v-icon :icon="'mdi-' + currentIcon"></v-icon>
                    </template>

                    <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :title="item.raw">
                            <template v-slot:prepend>
                                <v-icon :icon="'mdi-' + item.raw"></v-icon>
                            </template>
                        </v-list-item>
                    </template>


                </v-autocomplete>
            </div>
            <v-divider class="mt-n2"></v-divider>
            <v-card-subtitle class="text mt-n5"> Preview </v-card-subtitle>

        </v-card-text>
        <v-chip v-if="tagName" :color="color" variant="flat" class="m-auto">
            <v-icon v-if="currentIcon" :icon="'mdi-' + currentIcon"></v-icon>
            {{ tagName }}
        </v-chip>
        <v-spacer></v-spacer>
        <div class="text bg-banner bg-green-lighten-2 mt-3">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="this.updateInfo ? createOrUpdateTag(true) : createOrUpdateTag(false)"
                    variant="outlined">{{
                        this.updateInfo ?
                            'Update'
                            :
                            'Create'
                    }}</v-btn>
                <v-btn @click="closeModal(false)" variant="outlined">Cancel</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </div>
    </v-card>

</template>

<script>
import { useDocsStore } from '@/store.js'
import meta from '@mdi/svg/meta.json'
import { updateUser, updateDocumentsWithTag } from './tags.api';
import { update } from 'lodash';

export default {
    props: ['updateInfo'
    ],
    data() {
        return {
            title: '',
            store: useDocsStore(),
            isLoading: false,
            color: '#FF0000',
            menu: false,
            newCategory: false,
            chosenCategory: '',
            currentIcon: '',
            tagName: '',
            rules: {
                required: value => !!value || 'Required.',
                uniqueTag: value => this.isTagUnique(value) || 'Tag name already exists in this category.',
                unique: value => !this.categories.includes(value) || 'Category already exists',
            },
        }
    },
    computed: {
        swatchStyle() {
            const { color, menu } = this
            return {
                backgroundColor: color,
                cursor: 'pointer',
                height: '30px',
                width: '30px',
                borderRadius: menu ? '50%' : '4px',
                transition: 'border-radius 200ms ease-in-out',
            }
        }
    },
    mounted() {
        let categories = []
        for (let tag of this.store.userInfo.tags) {
            categories.push(tag.title)
        }
        this.categories = categories
        this.icons = []
        let i = 0
        for (let icon of meta) {
            this.icons.push(icon.name)
            i++;
        }
        if (this.updateInfo) {
            this.tagName = this.updateInfo.tag.name
            this.color = this.updateInfo.tag.color
            this.currentIcon = this.updateInfo.tag.icon
            this.chosenCategory = this.updateInfo.cat
        }
    },
    methods: {
        isTagUnique(tagName) {
            const category = this.store.userInfo.tags.find(cat => cat.title === this.chosenCategory);
            if (category) {
                return !category.items.some(tag => tag.name === tagName);
            }
            return true;
        },
        async createOrUpdateTag(isUpdate) {
            this.isLoading = true;
            let tagData = {
                name: this.tagName,
                color: this.color,
                icon: this.currentIcon,
                title: this.chosenCategory
            };

            if (this.newCategory) {
                let newCat = {
                    title: this.chosenCategory,
                    defaultValues: {
                        color: this.color,
                        icon: this.icon
                    },
                    items: []
                };
                this.store.userInfo.tags.push(newCat);
            }
            if (isUpdate) {
                let categoryIndex = this.updateInfo.catIndex;
                let tagIndex = this.updateInfo.tagIndex;

                if (categoryIndex !== -1 && tagIndex !== -1) {
                    if (this.updateInfo.tag && this.updateInfo.cat !== this.chosenCategory) {
                        let newCategoryIndex = this.store.userInfo.tags.findIndex(cat => cat.title === this.chosenCategory);
                        this.store.userInfo.tags[categoryIndex].items.splice(tagIndex, 1);
                        this.store.userInfo.tags[newCategoryIndex].items.push(tagData);
                    } else {
                        this.store.userInfo.tags[categoryIndex].items[tagIndex] = tagData;
                    }
                } else {
                    this.isLoading = false;
                    return;
                }

            } else {
                let categoryIndex = this.store.userInfo.tags.findIndex(cat => cat.title === this.chosenCategory);
                this.store.userInfo.tags[categoryIndex].items.push(tagData);
            }

            let requestBody = {
                tags: this.store.userInfo.tags
            };
            try {
                await updateUser(requestBody, this.store.userInfo._id)
                if(isUpdate){
                    await updateDocumentsWithTag(this.updateInfo.tag, tagData, this.store.user)
                }
                this.isLoading=false;
            } catch (err) {
                console.log(err)
            }

            this.closeModal(true);
        },
        closeModal(tagCreated) {
            this.$emit("closeModal", tagCreated)
        },
        updateDefaults(cat) {
            let tagCat = this.store.userInfo.tags.filter(el => el.title == cat)[0]
            this.color = tagCat.defaultValues.color
            this.currentIcon = tagCat.defaultValues.icon
            this.chosenCategory = cat
        },
        toggleNewCategory() {
            this.newCategory = !this.newCategory
            this.chosenCategory = ''
        }

    }
};
</script>

<style scoped>
.text {
    font-family: Space Grotesk, sans-serif;
    text-align: center;
    justify-content: center;
}

.cat-box {
    width: 5rem;
}


.color-menu {
    width: 100%;
    justify-content: center;
    margin-top: 18vw;
    margin-left: 40vw;
}

.bg-banner {
    width: 100%;
}

.modal {
    width: 600px;
    height: fit-content;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
}
</style>