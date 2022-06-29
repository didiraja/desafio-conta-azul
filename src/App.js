import './App.sass';
import styles from './App.module.sass';

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
            <li>Urubici, BR</li>
            <li>Temperatura em Celsius</li>
            <li>Umidade em %</li>
            <li>Pressão em hectoPascal</li>
            <li>Data de atualizacão</li>
          </ul>
        </div>
      </main>
    </div>
    </>
  );
}

export default App;
