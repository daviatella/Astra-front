<script setup>
import { Handle, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

defineProps(['data', 'label','act1'])
</script>

<template>
  <NodeToolbar style="display: flex; gap: 0.5rem; align-items: center" :is-visible="data.toolbarVisible"
    :position="data.toolbarPosition">
    <button @click="act1">Action1</button>
    <button @click="act1">Action2</button>
    <button @click="act1">Action3</button>
  </NodeToolbar>


  <v-text-field class="nodeText" bg-color="transparent" flat variant="solo" outline="false"></v-text-field>
  <Handle type="target" :position="Position.Left" />
  <Handle type="source" :position="Position.Right" />
</template>

<style scoped>
.nodeText {
  width: 100%;
  height: 100%;
}
</style>
