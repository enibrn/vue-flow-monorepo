<script setup lang="ts">
import type { Elements } from '@vue-flow/core';

const flowElements = ref<Elements>([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 }, class: 'light' },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
])

// Example function to modify elements if needed
function updateElements() {
  // Add a new node
  const newNode = { 
    id: `node-${Date.now()}`, 
    label: 'New Node', 
    position: { 
      x: Math.random() * 500, 
      y: Math.random() * 500 
    }, 
    class: 'light' 
  };
  
  flowElements.value.push(newNode);
}
</script>

<template>
  <div class="basic-page">
    <h1>Add Random Node Example</h1>
    <p>This example demonstrates passing elements to the BasicFlow component</p>
    
    <div class="controls">
      <v-btn @click="updateElements">Add Random Node</v-btn>
    </div>
    
    <div class="flow-container">
      <AddRandomFlow v-model="flowElements" />
    </div>
  </div>
</template>

<style scoped>
.basic-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.flow-container {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  min-height: 600px;
}
</style>