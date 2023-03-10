import {createContext, useRef} from 'react';
import {Peripheral} from 'react-native-ble-manager';
import {WebViewMessageEvent} from 'react-native-webview';
import {useBluetooth} from './bluetooth';
import {getStore, saveStore} from './storage';

export enum Event {
  SAVE_DATA = 'SAVE_DATA',
  GET_DATA = 'GET_DATA',
  BL_SCAN = 'BL_SCAN',
  BL_SCAN_RESULT = 'BL_SCAN_RESULT',
}

export interface EventMessage {
  type: Event;
  data: any;
}

export function useEventManager() {
  const webviewRef = useRef<{
    injectJavaScript: (script: string) => void;
  } | null>(null);

  const setWebviewRef = (ref: any) => {
    webviewRef.current = ref;
  };

  const handleScanResult = (peripherals: Peripheral[]) => {
    sendEvent(Event.BL_SCAN_RESULT, peripherals);
  };

  const bluetooth = useBluetooth(handleScanResult);

  const sendEvent = (event: Event, data: any) => {
    const message = {
      type: event,
      data,
    };
    console.log('sendEvent');
    console.log(message);
    webviewRef.current?.injectJavaScript(
      `window.dispatchEvent(new CustomEvent('message', {detail: ${JSON.stringify(
        message,
      )}}));
      true;`,
    );
  };

  const listenEvent = async (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data) as EventMessage;

    switch (message.type) {
      case Event.SAVE_DATA:
        console.log('Save data');
        saveStore(message.data);
        break;
      case Event.GET_DATA:
        console.log('get data');
        const data = await getStore();
        sendEvent(Event.GET_DATA, data);
        break;
      case Event.BL_SCAN:
        console.log('Start bluetooth scan');
        bluetooth.launchScan();
        break;
    }
  };

  return {
    sendEvent,
    listenEvent,
    setWebviewRef,
  };
}

export const EventContext = createContext<ReturnType<
  typeof useEventManager
> | null>(null);
