import { useState, useEffect } from 'react';

import "./App.sass";
import { getLocationData } from './requests';
import CityBox from "./components/CityBox";
import styles from "./App.module.sass";
import OWLogo from './assets/logo.svg';
// import { urubici, nuuk, nairobi } from './response';

const timeNow = new Date().toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
});

function App() {

  const INITIAL_DATA = {
    status: 'pending',
    data: {}
  };
  
  const [urubici, setUrubici] = useState({ ...INITIAL_DATA});
  const [nuuk, setNuuk] = useState({ ...INITIAL_DATA});
  const [nairobi, setNairobi] = useState({ ...INITIAL_DATA});

  const [updatedAt] = useState({updatedAt: timeNow});

  useEffect(() => {

    getLocationData('urubici')
      .then(res => setUrubici({
        status: 'completed',
        data: res.data
      }))
      .catch(e => {

        console.log(e);
        return setUrubici({
          status: 'error',
        });
      });

    getLocationData('nuuk')
      .then(res => setNuuk({
        status: 'completed',
        data: res.data
      }))
      .catch(e => {

        console.log(e);
        return setNuuk({
          status: 'error',
        });
      });

    getLocationData('nairobi')
      .then(res => setNairobi({
        status: 'completed',
        data: res.data
      }))
      .catch(e => {

        console.log(e);
        return setNairobi({
          status: 'error',
        });
      });

  }, []);

  return (
      <>
        <header className={styles.header}>
          <img src={OWLogo} alt="OpenWeather - Logo" />
        </header>

        <main className={styles.container}>
          <CityBox
            style={{gridArea: 'A'}}
            title="Urubici, BR"
            status={urubici.status}
            {...urubici.data}
            {...updatedAt} 
          />

          <CityBox
            style={{gridArea: 'B'}}
            title="Nuuk, GL"
            status={nuuk.status}
            {...nuuk.data}
            {...updatedAt}
          />
          
          <CityBox
            style={{gridArea: 'C'}}
            title="Nairobi, KE"
            status={nairobi.status}
            {...nairobi.data}
            {...updatedAt}
          />
        </main>
      </>
  );
}

export default App;
