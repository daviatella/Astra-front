<script setup>
import { BaseEdge, getBezierPath } from '@vue-flow/core'
import { computed } from 'vue'

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    sourceX: {
        type: Number,
        required: true,
    },
    sourceY: {
        type: Number,
        required: true,
    },
    targetX: {
        type: Number,
        required: true,
    },
    targetY: {
        type: Number,
        required: true,
    },
    sourcePosition: {
        type: String,
        required: true,
    },
    targetPosition: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: false,
    },
    markerEnd: {
        type: String,
        required: false,
    },
    style: {
        type: Object,
        required: false,
    },
    selected: {
        type: Boolean,
        required: false
    },
})

const path = computed(() => getBezierPath(props))
</script>

<script>
export default {
    inheritAttrs: false,
}
</script>

<template>

    <BaseEdge :id="id" :style="{ style, 'stroke': 'darkgrey' }" :path="path[0]" :marker-end="markerEnd" :label-x="path[1]"
        :label-y="path[2]" :label-style="{ fill: 'white' }" :label-bg-padding="[2, 4]" :label-bg-border-radius="2">

    </BaseEdge>
</template>
