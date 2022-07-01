import { useState, useEffect } from 'react';

import "./App.sass";
import { loadCity } from './services/functions';
import { INITIAL_DATA } from './services/consts';
import CityBox from "./components/CityBox";
import styles from "./App.module.sass";
import OWLogo from './assets/logo.svg';

function App() {

  const cities = ['Urubici', 'Nuuk', 'Nairobi'];

  const STATE_DEFAULT = cities.map((item) => {
    return {
      city: item,
      ...INITIAL_DATA,
    };
  });

  const [state, setState] = useState([]);
  
  function getCardsData() {

    STATE_DEFAULT.forEach(async (item, index) => {

      const response = await loadCity(item);
      
      setState((oldState) => {
        return [...oldState, {...response}]
      });
    });

  }

  useEffect(() => {

    getCardsData();

  }, []);

  return (
      <>
        <header className={styles.header}>
          <img src={OWLogo} alt="OpenWeather - Logo" />
        </header>

        <main className={styles.container}>          
          {
            state && state.map((item, index) => {
              return <CityBox style={{gridArea: index+1}} key={index} {...item} onTryAgain={() => getCardsData()} />
            })
          }
        </main>
      </>
  );
}

export default App;
