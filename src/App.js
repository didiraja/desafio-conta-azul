import { useState, useEffect } from 'react';

import "./App.sass";
import { getUrubiciData, getNuukData, getNairobiData } from './services/requests';
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

  function loadUrubici() {

    setUrubici(INITIAL_DATA);

    const urubiciData = getUrubiciData();

    (async () => setUrubici(await urubiciData))();
    
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
            status={urubici.status}
            {...urubici.data}
            {...updatedAt} 
            onTryAgain={() => loadUrubici()}
            />

          <CityBox
            style={{gridArea: 'B'}}
            title="Nuuk, GL"
            status={nuuk.status}
            {...nuuk.data}
            {...updatedAt}
            onTryAgain={() => loadNuuk()}
            />
          
          <CityBox
            style={{gridArea: 'C'}}
            title="Nairobi, KE"
            status={nairobi.status}
            {...nairobi.data}
            {...updatedAt}
            onTryAgain={() => loadNairobi()}
          />
        </main>
      </>
  );
}

export default App;
