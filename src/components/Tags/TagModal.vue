<template>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
    </v-overlay>
    <v-card class="modal rounded-lg">
        <div class="text bg-banner bg-green-lighten-2" style="display: flex;">
            <v-spacer></v-spacer>
            <v-card-title class="ml-8">{{ getTitle }}</v-card-title>
            <v-spacer></v-spacer>
            <v-btn v-if="catModal && isUpdate" icon="mdi-trash-can" @click="deleteCat" variant="solo"></v-btn>
        </div>
        <v-card-text class="w-100">
            <div style="display: flex; align-items: center;">
                <v-select v-if="(!newCategory && !catModal)" label="Category" v-model="chosenCategory"
                    @update:modelValue="updateDefaults" class="m-auto cat-box" :items="categories"
                    variant="outlined"></v-select>
                <v-text-field v-if="newCategory" :rules="[rules.required, rules.unique]" label="New Category Name"
                    v-model="chosenCategory" class="m-auto cat-box" variant="outlined"></v-text-field>
                <v-tooltip location="top" :text="newCategory ? 'Cancel' : 'New Category'">
                    <template v-slot:activator="{ props }">
                        <v-btn v-if="!catModal" :icon="newCategory ? 'mdi-close' : 'mdi-plus'" v-bind="props"
                            variant="solo" class="ml-3 mb-3 bg-grey-lighten-2" @click="toggleNewCategory"></v-btn>
                    </template>
                </v-tooltip>
            </div>
            <div style="display: flex; align-items: center;">
                <v-text-field v-if="!catModal" label="Tag Name" :rules="[rules.required, rules.uniqueTag]"
                    v-model="tagName" class="m-auto" variant="outlined"></v-text-field>
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
                    item-title="name" item-value="raw" :label="(catModal ? 'Default' : 'Tag') + ' Icon'">
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
            <v-tooltip location="left" text="Only applies to tags with matching color or icon">
                <template v-slot:activator="{ props }">
                    <v-checkbox v-if="isUpdate && catModal" v-model="updateAlltags" v-bind="props"
                        label="Update All Existing Tags"></v-checkbox>
                </template>
            </v-tooltip>
            <v-divider class="mt-n2"></v-divider>
            <v-card-subtitle class="text mt-n5"> Preview </v-card-subtitle>
        </v-card-text>
        <v-chip :color="color" variant="flat" class="m-auto">
            <v-icon v-if="currentIcon" :icon="'mdi-' + currentIcon"></v-icon>
            {{ tagName ? tagName : 'Example' }}
        </v-chip>
        <v-spacer></v-spacer>
        <div class="text bg-banner bg-green-lighten-2 mt-3">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="handleAction" variant="outlined">{{ actionLabel }}</v-btn>
                <v-btn @click="closeModal(false)" variant="outlined">Cancel</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
import { useDocsStore } from '@/store.js'
import meta from '@mdi/svg/meta.json'
import { updateUser, updateDocumentsWithTag, updateDocumentsWithCat } from './tags.api';

export default {
    props: ['updateInfo', 'isUpdate'],
    data() {
        return {
            store: useDocsStore(),
            isLoading: false,
            color: '#FF0000',
            menu: false,
            newCategory: false,
            chosenCategory: '',
            currentIcon: '',
            updateAlltags: false,
            tagName: '',
            categories: [],
            icons: [],
            catModal: false,
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
        },
        getTitle() {
            return `${this.isUpdate ? 'Update' : 'Create'} ${this.catModal ? 'Category' : 'Tag'}`;
        },
        actionLabel() {
            return this.isUpdate ? 'Update' : 'Create';
        }
    },
    mounted() {
        this.categories = []
        this.categories = this.store.userInfo.tags.map(tag => tag.title);
        this.icons = meta.map(icon => icon.name);
        if (this.isUpdate) {
            if (this.updateInfo.tag) {
                this.tagName = this.updateInfo.tag.name;
                this.color = this.updateInfo.tag.color;
                this.currentIcon = this.updateInfo.tag.icon;
                this.chosenCategory = this.updateInfo.tagcat.title;
            } else if (this.updateInfo.cat) {
                this.color = this.updateInfo.cat.defaultValues.color;
                this.currentIcon = this.updateInfo.cat.defaultValues.icon;
                this.chosenCategory = this.updateInfo.cat.title;
                this.catModal = true;
                this.newCategory = true;
            }
        } else if (this.updateInfo.newCat) {
            this.catModal = true;
            this.newCategory = true;
        }
    },
    methods: {
        isTagUnique(tagName) {
            const category = this.store.userInfo.tags.find(cat => cat.title === this.chosenCategory);
            if (category) {
                if (this.updateInfo.tagIndex !== undefined) {
                    return category.items.every((tag, index) => index === this.updateInfo.tagIndex || tag.name !== tagName);
                } else {
                    return !category.items.some(tag => tag.name === tagName);
                }
            }
            return true; // If category not found, consider the tag name as unique
        },
        deleteCat(){
            this.$emit('deleteCategory', this.updateInfo.cat)
        },
        async handleAction() {
            this.isLoading = true;
            if (this.catModal) {
                await this.createOrUpdateCat()
            } else {
                await this.createOrUpdateTag()
            }

        },
        async createOrUpdateCat() {
            this.isLoading = true;
            const newCat = {
                title: this.chosenCategory,
                defaultValues: {
                    color: this.color,
                    icon: this.currentIcon
                },
                items: []
            };
            try {
                if (this.isUpdate) {
                    await updateDocumentsWithCat(this.updateInfo.cat, newCat, this.store.user, this.updateAlltags);
                    this.store.userInfo.tags[this.updateInfo.catIndex].defaultValues.color = this.color
                    this.store.userInfo.tags[this.updateInfo.catIndex].defaultValues.icon = this.currentIcon
                    console.log('here ' + this.updateAlltags)
                    if (this.updateAlltags) {
                        this.store.userInfo.tags[this.updateInfo.catIndex].items = this.store.userInfo.tags[this.updateInfo.catIndex].items.map((el) => {
                            el.color = this.color;
                            el.icon = this.currentIcon;
                            return el;
                        });
                    }
                } else {
                    this.store.userInfo.tags.push(newCat);
                }
                const requestBody = { tags: this.store.userInfo.tags };
                await updateUser(requestBody, this.store.userInfo._id);
                this.isLoading = false;
                this.closeModal(true);

            } catch (err) {
                console.log(err);
                this.isLoading = false;
            }
        },
        async createOrUpdateTag() {
            let tagData = {
                name: this.tagName,
                color: this.color,
                icon: this.currentIcon,
                title: this.chosenCategory
            };
            console.log(tagData)
            if (this.newCategory) {
                let newCat = {
                    title: this.chosenCategory,
                    defaultValues: {
                        color: this.color,
                        icon: this.currentIcon
                    },
                    items: []
                };
                this.store.userInfo.tags.push(newCat);
            }
            if (this.isUpdate) {
                let categoryIndex = this.updateInfo.catIndex;
                let tagIndex = this.updateInfo.tagIndex;

                if (categoryIndex !== -1 && tagIndex !== -1) {
                    if (this.updateInfo.tag && this.updateInfo.tagcat.title !== this.chosenCategory) {
                        let newCategoryIndex = this.store.userInfo.tags.findIndex(cat => cat.title === this.chosenCategory);
                        this.store.userInfo.tags[categoryIndex].items.splice(tagIndex, 1);
                        this.store.userInfo.tags[newCategoryIndex].items.push(tagData);
                    } else {
                        this.store.userInfo.tags[categoryIndex].items[tagIndex] = tagData;
                        console.log(this.store.userInfo.tags[categoryIndex].items)
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
                if (this.isUpdate) {
                    await updateDocumentsWithTag(this.updateInfo.tag, tagData, this.store.user)
                }
                this.isLoading = false;
            } catch (err) {
                console.log(err)
            }

            this.closeModal(true);
        },
        closeModal(tagCreated) {
            this.$emit("closeModal", tagCreated)
        },
        updateDefaults(cat) {
            let tagCat = this.store.userInfo.tags.find(el => el.title == cat);
            this.color = tagCat.defaultValues.color;
            this.currentIcon = tagCat.defaultValues.icon;
            this.chosenCategory = cat;
        },
        toggleNewCategory() {
            this.newCategory = !this.newCategory;
            this.chosenCategory = '';
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