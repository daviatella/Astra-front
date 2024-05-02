<script setup>
import { ref, reactive } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { useDocsStore } from '@/store.js'
import TopBar from '../shared/TopBar.vue';
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './Sidebar.vue'
import useDragAndDrop from './useDnD'
import ToolbarNode from './CustomNode.vue'
import DocumentNode from './DocumentNode.vue';
import DocsModal from '../Projects/DocsModal.vue';
import DefEdge from './DefEdge.vue'

const props = defineProps(['id'])
const { onPaneReady, findEdge, applyEdgeChanges, removeNodes, onConnect, addEdges, toObject } = useVueFlow()

onPaneReady(({ fitView }) => {
  fitView()
})

const store = useDocsStore()

if (props.id) {
  console.log(props.id)
  store.selectedDoc = store.userDocs.filter(doc => doc._id == props.id)[0]
}

onConnect((connection) => {
  addEdges(connection)
})

let resizer = ref(false);

function logNodes() {
  console.log(JSON.stringify(toObject()))
}


function getNewNodeId() {
  return "dndnode_" + toObject().nodes.length
}
const state = reactive({
  docsModal: false,
})
function closeDocModal(docs) {
  state.docsModal = false
  if (docs[0]) {
    onDrop(ev, getNewNodeId(), docs[0])
  }
}

let ev = ''

function chooseDoc(event) {
  ev = event
  if (type === 'document') {
    state.docsModal = true
  } else {
    onDrop(ev, getNewNodeId())
  }
}

function copyNode(nodeProps) {

}

let type = ''

function setLocalType(t) {
  type = t;
  console.log(state.docsModal)
}

function edgeClick(event) {
  console.log(event.edge)
  event.edge.data.selected = true
  let arr = []
  arr.push(findEdge(event.edge.id))
  applyEdgeChanges(arr)
}

function test(t){
  console.log(t)
}

const { onDragOver, onDrop, updateFlow, onDragLeave, isDragOver } = useDragAndDrop()
</script>


<template>
  <TopBar v-if="props.id"></TopBar>
  <div class="dndflow" @drop="chooseDoc($event)">
    <v-dialog v-model="state.docsModal" width="auto">
      <DocsModal type="both" @closeModal="closeDocModal"></DocsModal>
    </v-dialog>
    <VueFlow v-model="store.selectedDoc.content.mindmap.elements" @edge-click="edgeClick" @dragover="onDragOver"
      @dragleave="onDragLeave" @node-mouse-enter="resizer = true" @edge-context-menu="test" @node-mouse-leave="resizer = false">
      <DropzoneBackground :style="{
        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
        transition: 'background-color 0.2s ease',
      }" />

      <template #node-toolbar="nodeProps">
        <ToolbarNode :data="nodeProps.data" @click="console.log(nodeProps)" :label="'test'"
          :act1="logNodes" :act2="getNodeCount" />
      </template>

      <template #node-document="nodeProps">
        <DocumentNode @copy-node="copyNode(nodeProps)" @delete-node="removeNodes(nodeProps)" class="nodedoc"
          :data="nodeProps.data" :node="nodeProps" :card="nodeProps.data.card" />
      </template>

      <template #edge-default="customEdgeProps">
      <DefEdge
        :id="customEdgeProps.id"
        :source-x="customEdgeProps.sourceX"
        :source-y="customEdgeProps.sourceY"
        :target-x="customEdgeProps.targetX"
        :target-y="customEdgeProps.targetY"
        :source-position="customEdgeProps.sourcePosition"
        :target-position="customEdgeProps.targetPosition"
        :data="customEdgeProps.data"
        :marker-end="customEdgeProps.markerEnd"
        :style="customEdgeProps.style"
        :label="'test label'"
      />
    </template>

    </VueFlow>

    <Sidebar :isFlow="props.id" @typeSet="setLocalType" />
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

.nodedoc {
  width: 11rem;
}

.def-node {

  width: auto;
  min-height: 6rem;
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