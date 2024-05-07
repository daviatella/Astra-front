<template>
  <v-card @click="console.log(props.node.selected)" v-ripple="false" class="rounded-lg doc-card"
    :style="{ backgroundColor: props.color }">
    <header class="card-header ch-title text-truncate">
      <div style="width:75%" class="m-auto">
        <p class="text-truncate ml-n2">{{ card.title }}</p>
      </div>
    </header>
    <div class="content">
      <v-img :src="imagePath" class="content-image"></v-img>
    </div>
  </v-card>
  <div>
    <Toolbar :data="data" :node="props.node" :btns="btns" :btnsLbl="btnsLbl" />
    <NodeResizer v-if="props.selected"></NodeResizer>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Toolbar from './Toolbar.vue';
import { NodeResizer } from '@vue-flow/node-resizer';
import { useRouter } from 'vue-router';


const props = defineProps(["card", "data", "node", "color","selected"]);



const data = ref(props.data);
const card = ref(props.card)

const router = useRouter();

const handleClick = () => {

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
const btnsLbl = ["Copy Node", "Edit Color", "Delete Node"]


const getImagePath = (type) => {
  const baseUrl = new URL('../../', import.meta.url).href;
  return new URL(`src/assets/${type}-icon.png`, baseUrl).href;
};


let imagePath = ''
if (card.value) {
  imagePath = getImagePath(card.value.type);
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
  text-align: center;
  font-size: small;
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
  min-width: 7rem;
}
</style>
