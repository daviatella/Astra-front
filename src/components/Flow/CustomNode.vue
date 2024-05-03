<script setup>
import { ref } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { NodeResizer } from '@vue-flow/node-resizer'
import { useDocsStore } from '@/store'
import NexusCard from '../shared/NexusCard.vue'

const isNodeSelected = ref(false)
let store = useDocsStore()


const props = defineProps(['data', 'label', 'act1', 'act2', 'resizer'])
let card2 = ref(props.card)
console.log(card2)

function stuff(d) {
  console.log(JSON.stringify(d, null, 4))
}
</script>

<template>
  <div class="test-node">
    <v-textarea name="input-7-1" class="def-node" variant="filled" auto-grow>

    </v-textarea>
    <NodeToolbar style="display: flex; gap: 0.5rem; align-items: center" :is-visible="data.toolbarVisible"
        :position="data.toolbarPosition">
        <!-- <button @click="act1">Action1</button> -->
        <button @click="act2">Action2</button>
        <button @click="stuff(label)">Action3</button>
      </NodeToolbar>
      <Handle type="target" :position="Position.Left" />
      <Handle type="source" :position="Position.Right" />
      <Handle type="target" :position="Position.Top" />
      <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
.card {
  width: 8rem;
  height: 13rem;
}

.test-node {
  width: fit-content;
  height: fit-content;
}
</style>
