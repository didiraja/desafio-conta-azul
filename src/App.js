import { useState, useEffect } from 'react';

import "./App.sass";
import styles from "./App.module.sass";
import CityBox from "./compnents/CityBox";
/* import { nuuk, ubirici, nairobi } from "./response"; */
import { getLocationData, getFakeLocationData } from './requests';

const timeNow = new Date().toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
});

const places = [
  {
    name:'nuuk',
    lon: 64.1835,
    lat: -51.7216,
  },
  {
    name:'ubirici',
    lon: -49.6125,
    lat: -28.0274,
  },
  {
    name:'nairobi',
    lon: -1.286389,
    lat: 36.817223,
}];

function App() {
  
  const [locations, setLocations] = useState([]);
  const [updatedAt] = useState({updatedAt: timeNow});

  useEffect(() => {

    places.forEach((item, i) => {
      getFakeLocationData(item.name)
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
