<script setup>
import { Handle, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { NodeResizer } from '@vue-flow/node-resizer'
import NexusCard from '../shared/NexusCard.vue'
import { useDocsStore } from '@/store'

let store = useDocsStore()
let card = store.userDocs[0]
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
    <NexusCard class="card" :card="card"></NexusCard>
    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
</template>

<style scoped></style>
