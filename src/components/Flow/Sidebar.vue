<script setup>
import useDragAndDrop from './useDnD'
import styles from './nodes.style.js'

const { onDragStart } = useDragAndDrop()
</script>
<template>
  <aside> 
    <div class="vue-flow__node-input node" :draggable="true" @dragstart="(event) => onDragStart(event, 'input' )">
      Input Node
    </div>
    <div class="vue-flow__node-default node" :draggable="true" @dragstart="(event) => onDragStart(event, 'default')">
      Default Node
    </div>
    <div class="vue-flow__node-output node" :draggable="true" @dragstart="(event) => onDragStart(event, 'output')">
      Output Node
    </div>
    <div class="vue-flow__node-custom node" :draggable="true" @dragstart="(event) => onDragStart(event, 'toolbar', styles.toolbar)">
      Toolbar Node
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
  width: 20%;
  font-size: 12px;
  background: rgba(205, 142, 221, 0.75);
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, .3);
  box-shadow: 0 5px 10px #0000004d
}

 .node {
  margin-bottom: 40px;
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