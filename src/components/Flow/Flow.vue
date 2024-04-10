<script setup>
import { ref, onMounted, toRaw, onBeforeUnmount } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { useDocsStore } from '@/store.js'

import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './Sidebar.vue'
import useDragAndDrop from './useDnD'
import ToolbarNode from './CustomNode.vue'


const props = defineProps(['selectedDoc'])
const { onPaneReady, onConnect, addEdges, fromObject, toObject } = useVueFlow()

onPaneReady(({ fitView }) => {
  fitView()
})

const store = useDocsStore()

onConnect((connection) => {
  addEdges(connection)
})

function saveFlow(){
  console.log("")
}

onBeforeUnmount(saveFlow)

let resizer = ref(false);

function logNodes() {
  console.log(JSON.stringify(toObject()))
}

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()
</script>


<template>
  <div class="dndflow" @drop="onDrop">
    <VueFlow v-model="store.selectedDoc.content.mindmap.elements" @dragover="onDragOver" @dragleave="onDragLeave"
      @node-mouse-enter="resizer = true" @node-mouse-leave="resizer = false">
      <DropzoneBackground :style="{
        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
        transition: 'background-color 0.2s ease',
      }" />
      <template #node-toolbar="nodeProps">
        <ToolbarNode :data="nodeProps.data" :resizer="resizer" :label="'test'" :act1="logNodes" />
      </template>
    </VueFlow>

    <Sidebar />
  </div>
</template>


<style scoped>
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.33.2/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.33.2/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css';


html,
body,
#app {
  margin: 0;
  height: 100%;
}

#app {
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.dndflow {
  flex-direction: column;
  display: flex;
  height: 100%;
  z-index: 1
}

.dndflow .vue-flow-wrapper {
  flex-grow: 1;
  height: 100%
}

@media screen and (min-width: 640px) {
  .dndflow {
    flex-direction: row
  }


}
</style>