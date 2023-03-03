import {WebViewMessageEvent} from 'react-native-webview';
import {getStore, saveStore} from './storage';

export enum Event {
  SAVE_DATA,
  GET_DATA,
}

export interface EventMessage {
  type: Event;
  data: any;
}

export class EventManager {
  webviewRef: {injectJavaScript: (script: string) => void} | null = null;

  setWebviewRef(ref: any) {
    this.webviewRef = ref;
  }

  async listenEvent(event: WebViewMessageEvent) {
    const message = JSON.parse(event.nativeEvent.data) as EventMessage;

    switch (message.type) {
      case Event.SAVE_DATA:
        saveStore(message.data);
        break;
      case Event.GET_DATA:
        const data = await getStore();
        this.sendEvent(Event.GET_DATA, data);
        break;
    }
  }

  async sendEvent(event: Event, data: any) {
    const message = {
      type: event,
      data,
    };
    this.webviewRef?.injectJavaScript(JSON.stringify(message));
  }
}

export const eventManager = new EventManager();
