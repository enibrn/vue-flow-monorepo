<script
  lang="ts"
  setup
>
import type { Elements } from '@vue-flow/core';
import { Panel, VueFlow, isNode, useVueFlow } from '@vue-flow/core';

import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';

const { isDark } = useAppTheme();

const flowClass = computed(() => {
  return {
    dark: isDark.value
  }
});

const elements = defineModel<Elements>();

const { onConnect, addEdges, setViewport, toObject } = useVueFlow({
  minZoom: 0.2,
  maxZoom: 4,
});

onConnect(addEdges);

function updatePos() {
  return elements.value?.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
  })
};

function logToObject() {
  return console.log(toObject())
};

function resetViewport() {
  return setViewport({ x: 0, y: 0, zoom: 1 })
};
</script>

<template>
  <VueFlow
    v-model="elements"
    fit-view-on-init
    class="vue-flow-basic-example"
    :class="flowClass"
  >
    <Background />
    <MiniMap />
    <Controls />
    <Panel
      position="top-right"
      style="display: flex; gap: 5px"
    >
      <button @click="resetViewport">reset viewport</button>
      <button @click="updatePos">change pos</button>
      <button @click="logToObject">toObject</button>
    </Panel>
  </VueFlow>
</template>
