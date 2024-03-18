<script setup>
import { ref } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { NodeResizer } from '@vue-flow/node-resizer'

const isNodeSelected = ref(false)

defineProps(['data', 'label', 'act1', 'resizer'])
</script>

<template>
    <NodeToolbar style="display: flex; gap: 0.5rem; align-items: center" :is-visible="data.toolbarVisible"
      :position="data.toolbarPosition">
      <button @click="act1">Action1</button>
      <button @click="act1">Action2</button>
      <button @click="act1">Action3</button>
    </NodeToolbar>
    <NodeResizer :is-visible="resizer" min-width="100" min-height="30" />

    <v-text-field bg-color="transparent" flat variant="solo" outline="false" @click="isNodeSelected = true"></v-text-field>
    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
</template>

<style scoped></style>
