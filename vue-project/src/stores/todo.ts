import { defineStore } from "pinia";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const useStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[]
  }),
  actions: {
    async fetchAll(){
      const data = await (await fetch('https://jsonplaceholder.typicode.com/todos')).json();
      this.todos = data;
    }
  }
})