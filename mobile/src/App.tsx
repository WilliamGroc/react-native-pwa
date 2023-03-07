import React, {useEffect, useRef, useState} from 'react';
import RNFS from 'react-native-fs';
import StaticServer from 'react-native-static-server';
import {downloadSources} from './utils/webapp';
import {Loader, WebAppView} from './components';
import {EventContext, useEventManager} from './utils/events';

function App(): JSX.Element {
  const server = useRef<any>();
  const [uri, setUrI] = useState<string>();
  const eventManager = useEventManager();

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

  return (
    <EventContext.Provider value={eventManager}>
      {uri ? <WebAppView uri={uri} /> : <Loader />}
    </EventContext.Provider>
  );
}

export default App;
