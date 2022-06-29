import './App.sass';
import styles from './App.module.sass';
import LocationData from './response.json';


function App() {
  return (
    <>
    <div className={`App ${styles.app}`}>
      <header className="App-header">
        Logo aqui
      </header>

      <main>
        <div>
          <ul>
            <li>{LocationData.name}, {LocationData.sys.country}</li>
            <li>Temperatura {LocationData.main.temp}</li>
            <li>Umidade em {LocationData.main.humidity}</li>
            <li>Pressão em {LocationData.main.pressure}</li>
            <li>Data de Atualização</li>
          </ul>
        </div>
      </main>
    </div>
    </>
  );
}

export default App;
