import { defineStore } from "pinia";

export interface Peripheral {
  id: number;
  name: string;
}

export const usePeripheral = defineStore('peripheral', {
  state: () => ({
    peripherals: [] as Peripheral[]
  }),
  actions: {
    async setPeripherals(peripherals: Peripheral[]){
      this.peripherals = peripherals;
    }
  }
})