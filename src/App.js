import { useState, useEffect } from 'react';

import "./App.sass";
import { getUrubiciData, getNuukData, getNairobiData, sendToStorage, timeNow } from './services/requests';
import CityBox from "./components/CityBox";
import styles from "./App.module.sass";
import OWLogo from './assets/logo.svg';
// import { urubici, nuuk, nairobi } from './response';

function App() {

  const INITIAL_DATA = {
    status: 'pending',
    data: {},
    date: {
      object: timeNow,
      formatted: timeNow.toLocaleString("en-US", {
        hour: "numeric", minute: "numeric", second: "numeric",
        hour12: true }),
    }
  };
  
  const [urubici, setUrubici] = useState({ ...INITIAL_DATA});
  const [nuuk, setNuuk] = useState({ ...INITIAL_DATA});
  const [nairobi, setNairobi] = useState({ ...INITIAL_DATA});

  const [updatedAt] = useState({updatedAt: timeNow});

  function loadUrubici() {

    // mock empty storage
    // localStorage.setItem('urubiciStorage', "");

    let cityStorage = localStorage.getItem('urubiciStorage');

    if (cityStorage) {
      cityStorage = JSON.parse(cityStorage);
  
      const storageDate = new Date(cityStorage.date.object);
      const minutes = storageDate.valueOf();
      const minutesLimit = storageDate.setMinutes(storageDate.getMinutes() > 10);
      
      if (!cityStorage.data || minutes > minutesLimit) {

        return (async () => {

          const urubiciData = getUrubiciData();
    
          sendToStorage('urubiciStorage', await urubiciData);
    
          cityStorage = localStorage.getItem('urubiciStorage');
    
          cityStorage = JSON.parse(cityStorage);
      
          console.log('final storage', cityStorage);
          
          setUrubici(cityStorage);
        })();
      }
      return;
    }
    
    (async () => {

      const urubiciData = getUrubiciData();

      sendToStorage('urubiciStorage', await urubiciData);

      cityStorage = localStorage.getItem('urubiciStorage');

      cityStorage = JSON.parse(cityStorage);
  
      console.log('final storage', cityStorage);

      setUrubici(cityStorage);
    })();
  }

  function loadNuuk() {

    setNuuk(INITIAL_DATA);

    const nuukData = getNuukData();

    (async () => setNuuk(await nuukData))();
    
  }

  function loadNairobi() {

    setNairobi(INITIAL_DATA);

    const nairobiData = getNairobiData();

    (async () => setNairobi(await nairobiData))();
    
  }

  useEffect(() => {

    setUrubici(INITIAL_DATA);

    loadUrubici();

    loadNuuk();

    loadNairobi();

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
            {...urubici}
            onTryAgain={() => loadUrubici()}
            />

          <CityBox
            style={{gridArea: 'B'}}
            title="Nuuk, GL"
            {...nuuk}
            {...updatedAt}
            onTryAgain={() => loadNuuk()}
            />
          
          <CityBox
            style={{gridArea: 'C'}}
            title="Nairobi, KE"
            {...nairobi}
            {...updatedAt}
            onTryAgain={() => loadNairobi()}
          />
        </main>
      </>
  );
}

export default App;
