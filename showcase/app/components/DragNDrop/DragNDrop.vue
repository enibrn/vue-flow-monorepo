<script
  lang="ts"
  setup
>
import { VueFlow, useVueFlow } from '@vue-flow/core'

let id = 0
function getId() {
  return `dndnode_${id++}`
}

const { onConnect, addEdges, addNodes, project } = useVueFlow({
  nodes: [
    {
      id: '1',
      type: 'input',
      label: 'input node',
      position: { x: 250, y: 5 },
    },
  ],
})
function onDragOver(event: DragEvent) {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const wrapper = ref()

onConnect(addEdges)

function onDrop(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/vueflow')

  const flowbounds = wrapper.value.$el.getBoundingClientRect()

  const position = project({
    x: event.clientX - flowbounds.left,
    y: event.clientY - flowbounds.top,
  })

  addNodes({
    id: getId(),
    type,
    position,
    label: `${type} node`,
  })
}
</script>

<template>
  <div
    class="dndflow"
    @drop="onDrop"
  >
    <VueFlow
      ref="wrapper"
      @dragover="onDragOver"
    />
    <DragNDropSidebar />
  </div>
</template>

<style>
.dndflow {
  flex-direction: column;
  display: flex;
  height: 100%;
}

.dndflow aside {
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: #fcfcfc;
}

.dndflow aside>* {
  margin-bottom: 10px;
  cursor: grab;
}

.dndflow aside .description {
  margin-bottom: 10px;
}

.dndflow .vue-flow-wrapper {
  flex-grow: 1;
  height: 100%;
}

@media screen and (min-width: 768px) {
  .dndflow {
    flex-direction: row;
  }

  .dndflow aside {
    width: 20%;
    max-width: 180px;
  }
}
</style>
