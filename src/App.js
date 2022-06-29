import "./App.sass";
import styles from "./App.module.sass";
import CityBox from "./compnents/CityBox";
import { Provider, Consumer } from "./context";
import { nuuk, ubirici, nairobi } from "./response";

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
  },
  {
    updatedAt,
    ...ubirici,
  },
  {
    updatedAt,
    ...nairobi,
  },
];

function App() {
  return (
    <Provider value={ctxData}>
      <div className={`App ${styles.app}`}>
        <header className="App-header">Logo aqui</header>

        <main>
          <Consumer>
            {(ctx) => {
              return ctx.map((item, index) => {
                return <CityBox key={index} {...item} />;
              });
            }}
          </Consumer>
        </main>
      </div>
    </Provider>
  );
}

export default App;
