<template>
    <NodeToolbar class="toolbar" :is-visible="data.toolbarVisible">
        <v-btn v-for="b, index in btnsLbl" @click="btns[index]" class="m-auto bg-deep-purple-lighten-4 ">{{ b }}</v-btn>
    </NodeToolbar>
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Right" />
    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Bottom" />
</template>

<script setup>
import { ref } from 'vue';
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { Handle, Position } from '@vue-flow/core';

const props = defineProps(['btns', 'data', 'btnsLbl', 'node']);


const btns = ref(props.btns);
const btnsLbl = ref(props.btnsLbl)
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