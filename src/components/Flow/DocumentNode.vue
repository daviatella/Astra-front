<template>
  <v-card @click="handleClick" v-ripple="false" class="rounded-lg doc-card" :style="{backgroundColor: props.color}">
    <header class="card-header ch-title text-truncate">
      <div style="width:75%" class="m-auto">
        <p class="text-truncate ml-n2">{{ card.title }}</p>
      </div>
      <v-menu v-if="travel">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" style="margin-top: -2px;margin-right: -2px;" size="small" :flat="true"
            variant="plain" v-bind="props" />
        </template>
        <v-list>
          <v-list-item @click="openModal('update', card)">
            <v-list-item-title>Update Nexus</v-list-item-title>
          </v-list-item>
          <v-list-item @click="openModal('delete', card)">
            <v-list-item-title>Delete Nexus</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </header>
    <div class="content">
      <v-img :src="imagePath" class="content-image"></v-img>
    </div>
  </v-card>
  <div>
    <Toolbar :data="data" :btns="btns"/>
    <NodeResizer></NodeResizer>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { NodeToolbar } from '@vue-flow/node-toolbar'
import Toolbar from './Toolbar.vue';
import { useRouter } from 'vue-router';
import { NodeResizer } from '@vue-flow/node-resizer';
import { Handle, Position } from '@vue-flow/core';

const props = defineProps({
  card: Object,
  travel: Boolean,
  data: Object,
  node: Object,
  color: String
});


const travel = ref(props.travel);
const data = ref(props.data);
const card = ref(props.card)

const router = useRouter();

const handleClick = () => {
  if (travel.value) {
    const { _id, type } = card.value;
    if (type === 'doc') {
      router.push('/document/' + _id);
    } else {
      router.push('/board/' + _id);
    }
  }
};


const emit = defineEmits(['deleteNode', 'copyNode', 'editColor'])


function deleteNode() {
  emit('deleteNode')
}

function copyNode() {
  emit('copyNode')
}

function editColor() {
  emit('editColor')
}

const btns = [copyNode, editColor, deleteNode]

const getImagePath = (type) => {
  const baseUrl = new URL('../../', import.meta.url).href;
  return new URL(`src/assets/${type}-icon.png`, baseUrl).href;
};

const getWordCount = (content, type) => {
  if (type === 'doc' && content) {
    if (content.text) {
      let num = content.text.trim().split(/\s+/).length;
      return num + (num > 1 ? ' words' : ' word');
    } else {
      return '0 words';
    }
  } else if (content && content.mindmap.elements) {
    let num = content.mindmap.elements.filter(el => el.dimensions).length;
    return num + (num > 1 ? ' nodes' : ' node');
  } else {
    return '';
  }
};
let imagePath = ''
let wordCount = ''
if (card.value) {
  imagePath = getImagePath(card.value.type);
  wordCount = getWordCount(card.value.content, card.value.type);
}
</script>

<style>
.content-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: fit-content;
}

.ch-title {
  font-weight: bold;
  height: 40px;
  align-items: center;
}

.selected {
  color: white;
  background-color: gray;
}

.content {
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}

p {
  font-family: Space Grotesk, sans-serif;
  display: block
}

.card-header .v-btn {
  position: absolute;
  justify-content: center;
  top: 0.2rem;
  right: 0.01rem;
}

.doc-card {
  height: auto;
  margin: auto;
}
</style>
