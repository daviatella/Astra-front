<script setup>
import useDragAndDrop from './useDnD'
import styles from './nodes.style.js'
import { useDocsStore } from '@/store.js'

const { onDragStart } = useDragAndDrop()
const store = useDocsStore()
const props = defineProps(['isFlow'])
console.log(props.isFlow)

async function saveFlow() {
  try {
    const response = await fetch('http://localhost:4000/api/docs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(store.selectedDoc)
    });
    if (!response.ok) {
      console.log(response)
      throw new Error(response);
    }
    const responseData = await response.json();
    store.selectedDoc._rev = responseData.data.rev
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
</script>
<template>
  <aside>
    <v-btn v-if="props.isFlow != undefined" class="save-button bg-deep-purple-lighten-1" @click="saveFlow">
      Save
    </v-btn>
    <div class="mt-5 mr-3">
      <div class="vue-flow__node-input node" :draggable="true" @dragstart="(event) => onDragStart(event, 'input')">
        Input Node
      </div>
      <div class="vue-flow__node-default node" :draggable="true" @dragstart="(event) => onDragStart(event, 'default')">
        Default Node
      </div>
      <div class="vue-flow__node-output node" :draggable="true" @dragstart="(event) => onDragStart(event, 'output')">
        Output Node
      </div>
      <div class="vue-flow__node-custom node" :draggable="true"
        @dragstart="(event) => onDragStart(event, 'toolbar', styles.toolbar)">
        Toolbar Node
      </div>
      <div class="vue-flow__node-custom node" :draggable="true"
        @dragstart="(event) => onDragStart(event, 'document', styles.document)">
        Document Node
      </div>
    </div>
  </aside>
</template>

<style scoped>
aside {
  color: #fff;
  font-weight: 700;
  border-right: 1px solid #eee;
  padding: 15px 10px;
  justify-content: center;
  font-size: 12px;
  background: rgba(205, 142, 221, 0.75);
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, .3);
  box-shadow: 0 5px 10px #0000004d;
  height: fit-content;
}

.save-button {
  margin-left: 65px;
  margin-bottom: 2em;
}

.node {
  margin-bottom: 40px;
  margin-left: 30px;
  cursor: grab;
  font-weight: 500;
  -webkit-box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, .25);
  box-shadow: 5px 5px 10px 2px #00000040;
}

.vue-flow__node-custom {
  background: #9CA8B3;
  color: #fff;
  padding: 10px;
  padding: 10px;
  border-radius: 3px;
  width: 150px;
  font-size: 12px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-color: black;
}
</style>./nodes.style.js