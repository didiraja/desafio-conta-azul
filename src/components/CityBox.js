import styles from "./CityBox.module.sass";

function CityBox({ name, sys, main, updatedAt }) {

  function tempColor() {
    if (main && main.temp) {
      if (main.temp <= 5) return styles.isCold;
      if (main.temp > 25) return styles.isHot;
    }

    return styles.temperature;
  }

  return (
    <div className="city-box">
      <ul>
        <li>
          {name}, {sys.country}
        </li>
        <li className={tempColor()}>Temperatura {main.temp}°</li>
        <li>Umidade em {main.humidity}%</li>
        <li>Pressão em {main.pressure}hPa</li>
        <li>Updated at {updatedAt}</li>
      </ul>
    </div>
  );
}

export default CityBox;
