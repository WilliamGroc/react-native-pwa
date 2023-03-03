import React, {useEffect, useRef, useState} from 'react';
import RNFS from 'react-native-fs';
import StaticServer from 'react-native-static-server';
import {downloadSources} from './utils/webapp';
import {Loader, WebAppView} from './components';

function App(): JSX.Element {
  const server = useRef<any>();
  const [uri, setUrI] = useState<string>();

  useEffect(() => {
    (async () => {
      await downloadSources();

      server.current = new StaticServer(
        8080,
        RNFS.DocumentDirectoryPath + '/www',
      );
      server.current.start().then((url: string) => {
        setUrI(url);
        console.log('running', url);

        RNFS.readdir(RNFS.DocumentDirectoryPath + '/www').then(console.log);
      });
    })();
    return () => {
      if (server.current?.isRunning()) {
        server.current?.stop();
      }
    };
  }, []);

  return uri ? <WebAppView uri={uri} /> : <Loader />;
}

export default App;
