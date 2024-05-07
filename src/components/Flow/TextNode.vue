<template>
  <div>
    <v-textarea name="input-7-1" density="compact" v-model="text" class="def-node" :rows="1"
      :style="{ backgroundColor: props.color, color: props.textColor }" variant="filled" auto-grow />
    <Toolbar :data="true" :btnsLbl="btnsLbl" :btns="btns" />
    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <NodeResizer v-if="props.selected"></NodeResizer>
  </div>
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core'
import Toolbar from './Toolbar.vue'
import { NodeResizer } from '@vue-flow/node-resizer';
import { ref, watch } from 'vue'


const props = defineProps(['node', 'color', 'textColor', 'selected', 'text'])

const emit = defineEmits(['deleteNode', 'copyNode', 'editColor', 'editTextColor', 'updateText'])

let text = ref(props.text)

// if(props.text){
//   text = props.text
// }
watch(text, () => {
  updateText();
})

function deleteNode() {
  emit('deleteNode')
}

function copyNode() {
  emit('copyNode')
}

function editColor() {
  emit('editColor')
}

function editTextColor() {
  emit('editTextColor')
}

function updateText(){
  emit('updateText',text, props.node)
}


const btns = [copyNode, editColor, editTextColor, deleteNode]
const btnsLbl = ["Copy Node", "Edit Color", "Edit Text Color", "Delete Node"]

</script>



<style scoped>
.def-node {
  width: 13rem;
  height: auto;
}

div :deep(textarea) {
  text-align: center;
  justify-content: center;
  font-family: Space Grotesk, sans-serif;
}
</style>
