<script
  lang="ts"
  setup
>
import type { Elements } from '@vue-flow/core'
import { VueFlow, Position } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

const nodeWidth = 80
const nodeGapWidth = nodeWidth * 2
const nodeStyle = { width: `${nodeWidth}px`, fontSize: '11px', color: 'white' }

const sourceTargetPositions = [
  { source: Position.Bottom, target: Position.Top },
  { source: Position.Right, target: Position.Left },
]

const nodeColors = [
  ['#1e9e99', '#4cb3ac', '#6ec9c0', '#8ddfd4'],
  ['#0f4c75', '#1b5d8b', '#276fa1', '#3282b8'],
]
const edgeTypes = ['default', 'step', 'smoothstep', 'straight']
const offsets = [
  {
    x: 0,
    y: -nodeGapWidth,
  },
  {
    x: nodeGapWidth,
    y: -nodeGapWidth,
  },
  {
    x: nodeGapWidth,
    y: 0,
  },
  {
    x: nodeGapWidth,
    y: nodeGapWidth,
  },
  {
    x: 0,
    y: nodeGapWidth,
  },
  {
    x: -nodeGapWidth,
    y: nodeGapWidth,
  },
  {
    x: -nodeGapWidth,
    y: 0,
  },
  {
    x: -nodeGapWidth,
    y: -nodeGapWidth,
  },
]

let id = 0
function getNodeId() {
  return (id++).toString()
}

function getElements(): Elements {
  const initialElements = []

  for (let sourceTargetIndex = 0; sourceTargetIndex < sourceTargetPositions.length; sourceTargetIndex++) {
    const currSourceTargetPos = sourceTargetPositions[sourceTargetIndex];
    if (!currSourceTargetPos) {
      continue
    }

    for (let edgeTypeIndex = 0; edgeTypeIndex < edgeTypes.length; edgeTypeIndex++) {
      const currEdgeType = edgeTypes[edgeTypeIndex]

      for (let offsetIndex = 0; offsetIndex < offsets.length; offsetIndex++) {
        const currOffset = offsets[offsetIndex];
        if (!currOffset) {
          continue
        }

        const nodeColorsSourceTargetIndex = nodeColors[sourceTargetIndex];
        if (!nodeColorsSourceTargetIndex) {
          continue
        }
        const edgeTypeColors = nodeColorsSourceTargetIndex[edgeTypeIndex];
        if (!edgeTypeColors) {
          continue
        }

        const style = { ...nodeStyle, background: edgeTypeColors }
        const sourcePosition = {
          x: offsetIndex * nodeWidth * 4,
          y: edgeTypeIndex * 300 + sourceTargetIndex * edgeTypes.length * 300,
        }
        const sourceId = getNodeId()
        const sourceLabel = `Source ${sourceId}`
        const sourceNode = {
          id: sourceId,
          style,
          label: sourceLabel,
          position: sourcePosition,
          sourcePosition: currSourceTargetPos.source,
          targetPosition: currSourceTargetPos.target,
        }

        const targetId = getNodeId()
        const targetLabel = `Target ${targetId}`
        const targetPosition = {
          x: sourcePosition.x + currOffset.x,
          y: sourcePosition.y + currOffset.y,
        }
        const targetNode = {
          id: targetId,
          style,
          label: targetLabel,
          position: targetPosition,
          sourcePosition: currSourceTargetPos.source,
          targetPosition: currSourceTargetPos.target,
        }

        initialElements.push(sourceNode)
        initialElements.push(targetNode)

        initialElements.push({ id: `${sourceId}-${targetId}`, source: sourceId, target: targetId, type: currEdgeType })
      }
    }
  }

  return initialElements
}

const elements = ref(getElements())
</script>

<template>
  <VueFlow
    v-model="elements"
    :min-zoom="0.2"
    fit-view-on-init
  >
    <MiniMap />
    <Controls />
  </VueFlow>
</template>
