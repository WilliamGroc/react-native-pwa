import React, {useRef} from 'react';
import {useLayoutEffect} from 'react';
import WebView from 'react-native-webview';
import {eventManager} from '../../utils/events';

type Props = {
  uri: string;
};

export const WebAppView: React.FC<Props> = ({uri}) => {
  const webviewRef = useRef();

  useLayoutEffect(() => {
    if (webviewRef.current) {
      eventManager.setWebviewRef(webviewRef.current);
    }
  });

  return (
    <WebView
      ref={webviewRef.current}
      style={{flex: 1}}
      source={{uri}}
      scalesPageToFit
      originWhitelist={['file://']}
      allowUniversalAccessFromFileURLs={true}
      allowFileAccess={true}
      sharedCookiesEnabled={true}
      thirdPartyCookiesEnabled={true}
      javaScriptEnabled={true}
      onMessage={eventManager.listenEvent}
    />
  );
};
