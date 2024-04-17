<template>
  <TopBar></TopBar>
  <HomeSidebar></HomeSidebar>
  <CreateButtons tags="true"></CreateButtons>
  <v-card class="h-100 w-75 container bg-grey-lighten-4 mt-3 rounded-xl mb-4">
    <div class="ml-4 mt-4">
      <div class='category' v-for="(cat, catIndex) in categories">{{ cat.title }}
        <br>
        <v-chip v-for="(tag, index) in cat.items" :text="tag.name" :color="tag.color" :ref="index" class="mr-2" variant="flat" @mouseenter="toggleClosable(catIndex, index, true)" @mouseleave="toggleClosable(catIndex, index, false)" :closable="closable[catIndex][index]">
          <v-icon v-if="tag.icon" :icon="'mdi-' + tag.icon"></v-icon>
          {{ tag.name }}
        </v-chip>
      </div>
    </div>
  </v-card>
</template>

<script>
import TopBar from './TopBar.vue';
import TagModal from './TagModal.vue';
import HomeSidebar from './HomeSidebar.vue';
import CreateButtons from './CreateButtons.vue';
import { useDocsStore } from '@/store';

export default {
  data() {
    return {
      store: useDocsStore(),
      categories: [],
      closable: []
    };
  },
  mounted() {
    this.categories = this.store.userInfo.tags
    let i = 0
    for(let c of this.categories){
      this.closable.push([])
      console.log(c)
      for(let t of c.items){
        this.closable[i].push(false)
      }
      i++
    }
    console.log(this.closable)
  },
  methods: {
    toggleClosable(catI, tagI, val){
      this.closable[catI][tagI] = val
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
