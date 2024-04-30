<script setup>
import { ref } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { NodeResizer } from '@vue-flow/node-resizer'
import { useDocsStore } from '@/store'
import NexusCard from '../shared/NexusCard.vue'

const isNodeSelected = ref(false)
let store = useDocsStore()
let card = store.userDocs[0]


defineProps(['data', 'label', 'act1', 'act2', 'resizer'])
</script>

<template>
  <div class="test-node"> 
    <NodeToolbar style="display: flex; gap: 0.5rem; align-items: center" :is-visible="data.toolbarVisible"
      :position="data.toolbarPosition">
      <button @click="act1">Action1</button>
      <button @click="act2">Action2</button>
      <button @click="act1">Action3</button>
    </NodeToolbar>
    <NodeResizer :is-visible="resizer" min-width="100" min-height="30" />
    <NexusCard class="card" :card="card"></NexusCard>
    <v-text-field bg-color="transparent" flat variant="solo" outline="false" @click="isNodeSelected = true"></v-text-field>
    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<style scoped>
.card {
  width: 8rem;
  height: 13rem;
}

.test-node {
  width:fit-content;
  height:fit-content;
}
</style>
