<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { initialEdges, initialNodes } from '../initial-elements.js'

/**
 * useVueFlow provides all event handlers and store properties
 * You can pass the composable an object that has the same properties as the VueFlow component props
 */
const { onPaneReady, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow()

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

// our dark mode toggle flag
const dark = ref(false)

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 * Any event that is available as `@event-name` on the VueFlow component is also available as `onEventName` on the composable and vice versa
 *
 * onPaneReady is called when viewpane & nodes have visible dimensions
 */
onPaneReady(({ fitView }) => {
    fitView()
})

/**
 * onNodeDragStop is called when a node is done being dragged
 *
 * Node drag events provide you with:
 * 1. the event object
 * 2. the nodes array (if multiple nodes are dragged)
 * 3. the node that initiated the drag
 * 4. any intersections with other nodes
 */
onNodeDragStop(({ event, nodes, node, intersections }) => {
    console.log('Node Drag Stop', { event, nodes, node, intersections })
})

/**
 * onConnect is called when a new connection is created.
 *
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether by not calling `addEdges`
 */
onConnect((connection) => {
    addEdges(connection)
})

/**
 * To update a node or multiple nodes, you can
 * 1. Mutate the node objects *if* you're using `v-model`
 * 2. Use the `updateNode` method (from `useVueFlow`) to update the node(s)
 * 3. Create a new array of nodes and pass it to the `nodes` ref
 */
function updatePos() {
    nodes.value = nodes.value.map((node) => {
        return {
            ...node,
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400,
            },
        }
    })
}

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
function logToObject() {
    console.log(toObject())
}

/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
    setViewport({ x: 0, y: 0, zoom: 1 })
}

function toggleDarkMode() {
    dark.value = !dark.value
}
</script>

<template>
    <div class="margin">
    <VueFlow :nodes="nodes" :edges="edges" :class="{ dark }" class="basicflow" :default-viewport="{ zoom: 1.5 }"
        :min-zoom="0.2" :max-zoom="4">
        <Background pattern-color="#aaa" :gap="16" />

        <MiniMap />

    </VueFlow>
</div>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.33.2/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.33.2/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css';

html,
body,
#app {
    margin: 0;
    height: 100%;
}

#app {
    text-transform: uppercase;
    font-family: 'JetBrains Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.margin {
    margin: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    margin-top: 2rem;
    height: 100rem;
    width: 100%;
}
.vue-flow__minimap {
    transform: scale(75%);
    transform-origin: bottom right;
}

.basicflow.dark {
    background: #000000;
    color: #fffffb;
}

.basicflow.dark .vue-flow__node {
    background: hsl(0, 0%, 10%);
    color: #fffffb
}

.basicflow.dark .vue-flow__node.selected {
    background: hsl(0, 0%, 20%);
    border: 1px solid hotpink
}

.basicflow .vue-flow__controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center
}

.basicflow.dark .vue-flow__controls {
    border: 1px solid #FFFFFB
}

.basicflow .vue-flow__controls .vue-flow__controls-button {
    border: none;
    border-right: 1px solid #eee
}

.basicflow.dark .vue-flow__controls .vue-flow__controls-button {
    background: hsl(0, 0%, 20%);
    fill: #fffffb;
    border: none
}

.basicflow.dark .vue-flow__controls .vue-flow__controls-button:hover {
    background: hsl(0, 0%, 30%)
}

.basicflow.dark .vue-flow__edge-textbg {
    fill: #292524
}

.basicflow.dark .vue-flow__edge-text {
    fill: #fffffb
}</style>
