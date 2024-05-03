import { useVueFlow } from '@vue-flow/core'
import { ref, watch } from 'vue'


const state = {

  draggedType: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false),
  draggedStyle: ref(null)
}

export default function useDragAndDrop() {
  const { draggedType, draggedStyle, isDragOver, isDragging } = state

  const { addNodes, findNode, removeNodes,screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  function updateFlow(){
    const position = screenToFlowCoordinate({
      x: 0,
      y: 0,
    })

    const newNode = {
      id: 'basedoc',
      type: draggedType.value,
      position,
      label: '1',
      class:'light',
      style: draggedStyle.value
    }
    newNode.data = {}
    newNode.data.card = {
     _id: 'basedoc',
     title: 'basedoc',
      type: 'doc'
    }
    addNodes(newNode)
  }

  function onDragStart(event, type, style) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type)
      event.dataTransfer.setData('application/vueflow', style)
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedType.value = type
    draggedStyle.value = style
    isDragging.value = true

    document.addEventListener('drop', onDragEnd)
  }

  function onDragOver(event) {
    event.preventDefault()

    if (draggedType.value) {
      isDragOver.value = true

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  function onDragLeave() {
    isDragOver.value = false
  }

  function onDragEnd() {
    isDragging.value = false
    isDragOver.value = false
    draggedType.value = null
    document.removeEventListener('drop', onDragEnd)
  }


  function onDrop(event, nodeId, card, data, type) {
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    })

    const newNode = {
      id: nodeId,
      type: draggedType.value,
      position,
      label: `[${nodeId}]`,
      class:'light',
      style: draggedStyle.value
    }
    if(data) {
      newNode.data = data
      newNode.type = type
    } else if(card){
      newNode.data = {}
      newNode.type = 'document'
      newNode.data.card = {
       _id: card._id,
       title: card.title,
        type: card.type
      }
    }
    console.log(card)
    console.log(newNode)


    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 },
      }))

      off()
    })

    addNodes(newNode)
  }

  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    updateFlow,
    onDrop,
  }
}
