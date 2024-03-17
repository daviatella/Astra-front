<script setup>
import useDragAndDrop from './useDnD'

const { onDragStart } = useDragAndDrop()
const defaultNodeStyle = {
  border: '1px solid #10b981',
  background: '#ef467e',
  color: 'white',
  borderRadius: '99px',
}
</script>
<template>
  <aside> 
    <div class="description">You can drag these nodes to the pane.</div>
    <div class="vue-flow__node-input" :draggable="true" @dragstart="(event) => onDragStart(event, 'input' )">
      Input Node
    </div>
    <div class="vue-flow__node-default" :draggable="true" @dragstart="(event) => onDragStart(event, 'default')">
      Default Node
    </div>
    <div class="vue-flow__node-output" :draggable="true" @dragstart="(event) => onDragStart(event, 'output')">
      Output Node
    </div>
    <div class="vue-flow__node-output" :draggable="true" @dragstart="(event) => onDragStart(event, 'toolbar', defaultNodeStyle)">
      Toolbar Node
    </div>
  </aside>
</template>

<style scoped>
 .toolbar-node { 
  border: '1px solid #10b981';
  background: '#ef467e';
  color: 'white';
  border-radius: '99px';
 }
</style>