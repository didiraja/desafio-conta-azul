import { useState, useEffect } from 'react';

import "./App.sass";
import styles from "./App.module.sass";
import CityBox from "./compnents/CityBox";
import { getLocationData } from './requests';

const timeNow = new Date().toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
});

const places = [
  {
    name:'nuuk',
    lat: 64.1835,
    lon: -51.7216,
  },
  {
    name:'urubici',
    lat: -28.0274,
    lon: -49.6125,
  },
  {
    name:'nairobi',
    lat: -1.286389,
    lon: 36.817223,
}];

function App() {
  
  const [locations, setLocations] = useState([]);
  const [updatedAt] = useState({updatedAt: timeNow});

  useEffect(() => {

    places.forEach((item, i) => {
      getLocationData(item.lat, item.lon)
        .then(res => {
          return setLocations((oldState) => [
            ...oldState, {...(res.data)}
          ]);
        });
    });

  }, [], () => setLocations([]));

  return (
      <div className={`App ${styles.app}`}>
        <header className="App-header">Logo aqui</header>

        <main>
          {
            locations.map((item, index) => {
              return <CityBox key={index} {...item} {...updatedAt} />;
            })
          }
        </main>
      </div>
  );
}

export default App;
