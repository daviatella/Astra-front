<template>
  <v-overlay :model-value="isLoading" class="align-center justify-center">
    <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
  </v-overlay>
  <TopBar></TopBar>
  <HomeSidebar></HomeSidebar>
  <v-container>
    <div class="text-h5 title"> {{ selectedProj.title }}</div>
    <div class="m-auto container">
      <div class="test">
        <p class="text-h6"> Info </p>
        {{ 'Total Word Count: ' + getTotalWordCount(projNexus) }}
        <br>
        {{ 'Total Node Count: ' + getTotalWordCount(projBoards) }}
      </div>
      <v-divider />
      <div class="test">
        <p class="text-h6"> Nexus </p>
        <p class="text-h8"> Drag to reorder</p>
      </div>
      <v-container class="doc-container">

        <drop-list :items="projNexus" @reorder="$event.apply(projNexus)"
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
      <v-divider />
      <div class="test">
        <p class="text-h6"> Boards </p>
        <p class="text-h8"> Drag to reorder</p>
      </div>
      <v-container class="doc-container">

        <drop-list :items="projBoards" @reorder="$event.apply(projBoards)"
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
      <v-divider />
      <div class="test">
        <p class="text-h6"> Tags </p>
      </div>
      <v-container class="chip-container">
        <v-chip v-for="item in selectedProj.tags" class="chip" :color="item.color" variant="flat">
          <v-icon :icon="'mdi-' + item.icon"></v-icon>
          {{ item.name }}
        </v-chip>
      </v-container>
    </div>

  </v-container>

</template>

<script>
import TopBar from '../shared/TopBar.vue';
import HomeSidebar from '../shared/HomeSidebar.vue';
import { useDocsStore } from '@/store';
import { Drag, Drop, DropList } from "vue-easy-dnd";

export default {
  props: ['id'],
  components: {
    Drag,
    DropList,
    Drop
  },
  data() {
    let store = useDocsStore()
    let selectedProj = store.userProjs.filter(el => el._id == this.id)[0]
    let projNexus = store.userDocs.filter(el => selectedProj.nexus.includes(el._id))
    let projBoards = store.userDocs.filter(el => selectedProj.boards.includes(el._id))
    return {
      dialog: false,
      store,
      selectedProj,
      projNexus,
      projBoards
    };
  },
  methods: {
    toggleModal() {
      this.dialog = !this.dialog
    },
    getTotalWordCount(docs) {
      let total = 0
      docs.map((el) => {
        if (el.content.text) {
          let num = el.content.text.trim().split(/\s+/).length;
          total += num;
        } else if (el.content.mindmap.elements) {
          let num = el.content.mindmap.elements.filter(el => el.dimensions).length;
          total += num;
        }
      })
      return total
    }
  },
};
</script>

<style scoped>
.test {
  margin-left: 15rem;
  margin-top: 2rem;
}

.doc-container {
  flex: 1;
  width: 70vw;
  margin-left: 10vw;
  max-width: 80rem;
  border-radius: 10px;
}
.chip-container {
  flex: 1;
  width: 70vw;
  margin-left: 11vw;
  max-width: 80rem;
  border-radius: 10px;
}

.chip {
  width: auto;
  height: 25px;
  margin-right: 5px;
}

* {
  font-family: Space Grotesk, sans-serif;
}

.title {
  margin: auto;
  text-align: center;
}
</style>
