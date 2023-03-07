import React, {useContext, useRef} from 'react';
import WebView from 'react-native-webview';
import {EventContext} from '../../utils/events';

type Props = {
  uri: string;
};

export const WebAppView: React.FC<Props> = ({uri}) => {
  const webviewRef = useRef(null);

  const eventmanager = useContext(EventContext);

  return (
    <WebView
      ref={webviewRef}
      style={{flex: 1}}
      source={{uri}}
      scalesPageToFit
      originWhitelist={['file://']}
      allowUniversalAccessFromFileURLs={true}
      allowFileAccess={true}
      sharedCookiesEnabled={true}
      thirdPartyCookiesEnabled={true}
      javaScriptEnabled={true}
      onMessage={eventmanager?.listenEvent}
      onLoadEnd={() => {
        if (webviewRef.current) {
          eventmanager?.setWebviewRef(webviewRef.current);
        }
      }}
    />
  );
};
