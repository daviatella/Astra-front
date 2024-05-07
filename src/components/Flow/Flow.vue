<script setup>
import { ref, reactive } from 'vue'
import { VueFlow, applyChanges, useVueFlow } from '@vue-flow/core'
import { useDocsStore } from '@/store.js'
import TopBar from '../shared/TopBar.vue';
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './Sidebar.vue'
import useDragAndDrop from './useDnD'
import TextNode from './TextNode.vue'
import DocumentNode from './DocumentNode.vue';
import DocsModal from '../Projects/DocsModal.vue';
import DefEdge from './DefEdge.vue'
import ColorModal from './ColorModal.vue';

const props = defineProps(['id'])
const { onPaneReady, findEdge, addNodes, applyNodeChanges, applyEdgeChanges, removeNodes, onConnect, addEdges, toObject } = useVueFlow()

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
  colorModal: false
})

function closeDocModal(docs) {
  state.docsModal = false
  if (docs[0]) {
    onDrop(ev, getNewNodeId(), docs[0])
  }
}

function closeColorModal(color, node) {
  state.colorModal = false
  if (color) {
    if (isT) {
      node.data.textColor = color

    } else {
      node.data.color = color
    }
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
  let newNode = JSON.stringify(nodeProps)
  console.log(nodeProps)
  nodeProps.selected = false;
  newNode = JSON.parse(newNode)
  newNode.id = getNewNodeId()
  newNode.position.x = newNode.position.x + 300
  addNodes(newNode)

}

let selectedNode = ''
let isT = false
function editColor(nodeProps, isText) {
  state.colorModal = true
  isT = isText
  selectedNode = nodeProps
}


let type = ''

function setLocalType(t) {
  type = t;
  console.log(state.docsModal)
}

function edgeClick(event) {
  const styles = ['default', 'smoothstep', 'step', 'straight'];
  let currentIndex = styles.indexOf(event.edge.type);
  if (currentIndex === -1) currentIndex = styles.length - 1; 
  const nextIndex = (currentIndex + 1) % (styles.length + 1); 
  if (nextIndex < styles.length) {
    event.edge.type = styles[nextIndex];
  } else {
    event.edge.type = 'default';
    event.edge.animated = !event.edge.animated; 
  }
}

function test(text, node){
  node.data.text = text
  let i = store.selectedDoc.content.mindmap.elements.findIndex(el=>el.id==node.id)
  console.log(store.selectedDoc.content.mindmap.elements[i])
}

const { onDragOver, onDrop, updateFlow, onDragLeave, isDragOver } = useDragAndDrop()
</script>


<template>
  <TopBar v-if="props.id"></TopBar>
  <div class="dndflow" @drop="chooseDoc($event)">
    <v-dialog v-model="state.docsModal" width="auto">
      <DocsModal type="both" @closeModal="closeDocModal"></DocsModal>
    </v-dialog>

    <v-dialog v-model="state.colorModal" width="auto">
      <ColorModal :node="selectedNode" @closeModal="closeColorModal"></ColorModal>
    </v-dialog>


    <VueFlow v-model="store.selectedDoc.content.mindmap.elements" @edge-click="edgeClick" @dragover="onDragOver"
      @dragleave="onDragLeave" @node-mouse-enter="resizer = true" @node-mouse-leave="resizer = false">
      <DropzoneBackground :style="{
        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
        transition: 'background-color 0.2s ease',
      }" />

      <template #node-toolbar="nodeProps">
        <TextNode @copy-node="copyNode(nodeProps)" @delete-node="removeNodes(nodeProps)"
          @edit-color="console.log(nodeProps)" @update-text="test" @edit-text-color="editColor(nodeProps, true)" :node="nodeProps"
          :color="nodeProps.data.color" :text="nodeProps.data.text" :text-color="nodeProps.data.textColor" :selected="nodeProps.selected" />
      </template>

      <template #node-document="nodeProps">
        <DocumentNode @copy-node="copyNode(nodeProps)" @delete-node="removeNodes(nodeProps)"
          @edit-color="editColor(nodeProps)" class="nodedoc" :data="nodeProps.data" :color="nodeProps.data.color"
          :node="nodeProps" :card="nodeProps.data.card" :selected="nodeProps.selected" />
      </template>

      <template #edge-default="customEdgeProps">
        <DefEdge :id="customEdgeProps.id" :source-x="customEdgeProps.sourceX" :source-y="customEdgeProps.sourceY"
          :target-x="customEdgeProps.targetX" :target-y="customEdgeProps.targetY"
          :source-position="customEdgeProps.sourcePosition" :target-position="customEdgeProps.targetPosition"
          :data="customEdgeProps.data" :marker-end="customEdgeProps.markerEnd" :style="customEdgeProps.style"
          :selected="customEdgeProps.selected" :type="'smoothstep'"/>
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

.vue-flow__node-document {
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