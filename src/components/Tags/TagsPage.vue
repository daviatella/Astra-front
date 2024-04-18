<template>
  <v-overlay :model-value="isLoading" class="align-center justify-center">
    <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
  </v-overlay>
  <TopBar></TopBar>
  <HomeSidebar></HomeSidebar>
  <CreateButtons @createTag="toggleTagModal" @createCat="toggleCatModal" tags="true"></CreateButtons>
  <v-card class="h-100 w-75 container bg-grey-lighten-4 mt-3 rounded-xl mb-4">
    <div class="ml-4 mt-4">
      <div class='category' v-for="(cat, catIndex) in categories">
        <div @click="updateCat(cat, catIndex)" class="cursor-pointer" v-ripple>
          <v-icon :icon="'mdi-' + cat.defaultValues.icon" class="mb-1"></v-icon>
          {{ cat.title }}
        </div>
        <v-chip v-for="(tag, index) in cat.items" :text="tag.name" :color="tag.color"
          @click="toggleTagModal(tag, index, cat, catIndex)" :ref="index" class="mr-2" variant="flat"
          @mouseenter="toggleClosable(catIndex, index, true)" @mouseleave="toggleClosable(catIndex, index, false)">
          <v-icon v-if="tag.icon" :icon="'mdi-' + tag.icon"></v-icon>
          {{ tag.name }}
          <template v-slot:close>
            <v-icon v-if="closable[catIndex][index]" @click.capture.stop="deleteDialog(catIndex, index)"></v-icon>
          </template>
        </v-chip>
      </div>
    </div>
  </v-card>
  <v-dialog v-model="tagModal" width="auto" @click:outside="closeModal">
    <TagModal :update-info="updateInfo" :is-update="isUpdate" @deleteCategory="deleteCat" @closeModal="closeModal">
    </TagModal>
  </v-dialog>
  <v-dialog v-model="deleteModal" width="auto">
    <v-card>
      <div class="text bg-banner bg-red-lighten-1">
        <v-card-title>Delete {{ catToDel ? 'Category' : 'Tag' }}</v-card-title>
      </div>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-card-subtitle class="text text-wrap text-h7"> Are you sure you wish to delete this {{ catToDel ? 'category' :
          'tag'}}?<br> This action
          is
          not reversible.</v-card-subtitle>
      </v-card-text>
      <v-spacer></v-spacer>
      <div class="bg-banner bg-red-lighten-1">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="outlined" class="text" @click="catToDel ? performCatDelete() : deleteTag()">Delete</v-btn>
          <v-btn variant="outlined" class="text" @click="deleteModal = false, tagToDel = {}">Cancel</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>

</template>

<script>
import TopBar from '../TopBar.vue';
import TagModal from './TagModal.vue';
import HomeSidebar from '../HomeSidebar.vue';
import CreateButtons from '../CreateButtons.vue';
import { useDocsStore } from '@/store';
import { updateUser, deleteCategory } from './tags.api';

export default {
  data() {
    return {
      store: useDocsStore(),
      categories: [],
      closable: [],
      tagModal: false,
      catToDel: false,
      deleteModal: false,
      tagToDel: {},
      isLoading: false,
      isUpdate: false,
    };
  },
  mounted() {
    this.categories = []
    this.categories = this.store.userInfo.tags
    this.loadClosable()
  },
  methods: {
    loadClosable() {
      let i = 0
      for (let c of this.categories) {
        this.closable.push([])
        for (let t of c.items) {
          this.closable[i].push(false)
        }
        i++
      }
    },
    deleteCat(cat) {
      this.closeModal()
      this.catToDel = cat
      this.deleteModal = true;
      console.log(this.catToDel)
    },
    async performCatDelete() {
      this.isLoading = true
      this.store.userInfo.tags = this.store.userInfo.tags.filter(el => el.title != this.catToDel.title)
      let b = {
        tags: this.store.userInfo.tags
      }
      try {
        await deleteCategory(this.catToDel.title, this.store.user)
        await updateUser(b, this.store.userInfo._id)
      } catch (err) {
        console.log(err)
      }
      this.categories = this.store.userInfo.tags
      this.isLoading = false
      this.deleteModal = false;

    },
    closeModal() {
      this.tagModal = false;
      this.isUpdate = false
      console.log("closed modal", this.isUpdate)
    },
    toggleCatModal() {
      this.updateInfo = { newCat: true }
      this.tagModal = !this.tagModal;
      this.isUpdate = false
      this.loadClosable()
    },
    updateCat(cat, catI) {
      this.updateInfo = { cat: cat, catIndex: catI }
      this.tagModal = !this.tagModal;
      this.isUpdate = true
    },
    toggleTagModal(tag, tagI, cat, catI) {
      this.updateInfo = {}
      if (tag || cat) {
        this.updateInfo.tag = tag
        this.updateInfo.tagIndex = tagI
        this.isUpdate = true
        this.updateInfo.tagcat = cat
        this.updateInfo.catIndex = catI
        this.isUpdate = true
      } else {
        this.isUpdate = false
      }
      this.tagModal = !this.tagModal;
      this.loadClosable()
    },
    toggleClosable(catI, tagI, val) {
      this.closable[catI][tagI] = val
    },
    deleteDialog(cat, tag) {
      this.tagToDel = {
        cat: cat,
        tag: tag
      }
      this.deleteModal = true;
    },
    async deleteTag() {
      let deltag = this.store.userInfo.tags[this.tagToDel.cat].items.splice(this.tagToDel.tag, 1)[0]
      this.deleteModal = false;
      this.isLoading = true;
      let catName = this.store.userInfo.tags[this.tagToDel.cat].title
      let b = {
        tag: deltag,
        owner: this.store.user
      }
      try {
        const response = await fetch('http://localhost:4000/api/tags/delete', {
          method: 'POST',
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
        }
      } catch (error) {
        console.log(error)
      }
      b = {
        tags: this.store.userInfo.tags
      }
      try {
        const response = await fetch('http://localhost:4000/api/users/' + this.store.userInfo._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(b)
        });
        if (!response.ok) {
          console.log(response)
          throw new Error(response);
        }
        const responseData = await response.json();
        console.log(responseData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      for (let doc of this.store.userDocs) {
        if (doc.tags) {
          doc.tags = doc.tags.filter(tag => tag.name != deltag.name || tag.title != catName)
        }
      }
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
* {
  font-family: Space Grotesk, sans-serif;
}

.category {
  margin-top: 1rem;
}
</style>
