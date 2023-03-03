<script setup lang="ts">
import { useStore } from '@/stores/todo';

const store = useStore();

store.fetchAll();


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
</script>

<template>
  <main>
    First page
    <div>
      <button @click="sendMessageToApp">Try send message</button>
      <button @click="getMessageToApp">Try get message</button>
      <ul>
        <li v-for="todo in store.todos" :key="todo.id">
          {{ todo.title }}
        </li>
      </ul>
    </div>
  </main>
</template>
