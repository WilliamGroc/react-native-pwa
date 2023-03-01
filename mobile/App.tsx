/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import WebView from 'react-native-webview';

function App(): JSX.Element {
  return (
    <WebView
      source={{uri: 'http://10.0.2.2:8080'}}
      style={{marginTop: 20, flex: 1}}
    />
  );
}

export default App;
