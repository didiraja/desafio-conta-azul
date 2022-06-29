import { useState } from 'react';

import "./App.sass";
import styles from "./App.module.sass";
import CityBox from "./compnents/CityBox";
import { Provider, Consumer } from "./context";
/* import { nuuk, ubirici, nairobi } from "./response"; */
import { getLocationData } from './requests';

let nuuk = {
  name: 'rio de janeiro',
  sys: {
    country: 'BR'
  },
  main: {
    temp: 25,
    humidity: 8,
    pressure: 16
  },
  updatedAt: '',
};
/* let [nuuk, ubirici, nairobi] = {}; */

const updatedAt = new Date().toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
});

const ctxData = [
  {
    updatedAt,
    ...nuuk,
  },/* 
  {
    updatedAt,
    ...ubirici,
  },
  {
    updatedAt,
    ...nairobi,
  }, */
];

function App() {
  
  const [locations, setLocations] = useState([]);

  const places = [
    {
      lon: 64.1835,
      lat: -51.7216,
    },
    {
      lon: -49.6125,
      lat: -28.0274,
    },
    {
      lon: -1.286389,
      lat: 36.817223,
    }];

  /* FETCH ALL AND SEND TO DOCUMENT */
  places.forEach((place) => {
    
    getLocationData(place.lat, place.lon)
    .then((res) => {
      /* console.log(res) */
      
      return setLocations([{
        ...locations,
        ...res.data,
      }])
    })
    .finally(() => {
      console.log(locations);
    })
    .catch((err) => console.log(err));
  });

  return (
    <Provider value={ctxData}>
      <div className={`App ${styles.app}`}>
        <header className="App-header">Logo aqui</header>

        <main>
          {
            locations.map((item, index) => {
              return <CityBox key={index} {...item} />;
            })
          }
          {/* <Consumer>
            {(ctx) => {
              return ctx
            }}
          </Consumer> */}
        </main>
      </div>
    </Provider>
  );
}

export default App;
