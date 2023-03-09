<script setup lang="ts">
import { useTodo } from '@/stores/todo';
import { usePeripheral } from '@/stores/peripheric';


const storeTodo = useTodo();
const storePeripheral = usePeripheral();

storeTodo.fetchAll();

function sendMessageToApp(){
  if((window as any).ReactNativeWebView) {
    const message = {
      type: 'SAVE_DATA',
      data: [{id: 'aze', title: 'test'}]
    };

    (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
  }
}

function getMessageToApp(){
  if((window as any).ReactNativeWebView) {
    const message = {
      type: 'GET_DATA'
    };

    (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
  }
}

function launchBlScan(){
  if((window as any).ReactNativeWebView) {
    const message = {
      type: 'BL_SCAN'
    };

    (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
  }
}

</script>

<template>
  <main>
    First page
    <div id="container">
      <button @click="sendMessageToApp">Try send message</button>
      <button @click="getMessageToApp">Try get message</button>
      <button @click="launchBlScan">Try launch scan</button>
      <ul>
        <li v-for="periferal in storePeripheral.peripherals" :key="periferal.id">
          {{ periferal.name }}
        </li>
      </ul>
      <!-- <ul>
        <li v-for="todo in storeTodo.todos" :key="todo.id">
          {{ todo.title }}
        </li>
      </ul> -->
    </div>
  </main>
</template>

<style scoped>
  #container {
    display: flex;
    flex-direction: column;
  }
</style>