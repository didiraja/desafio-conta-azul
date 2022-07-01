import styles from "./CityBox.module.sass";

function CityBox({ style, name, sys, main, updatedAt }) {

  function tempColor() {
    if (main && main.temp) {
      if (main.temp <= 6) return styles.isCold;
      if (main.temp > 26) return styles.isHot;
    }

    return styles.temperature;
  }

  return (
    <div className={styles.cityBox} style={{...style}}>
      <div className={styles.cityNameBox}>
        <p className={styles.cityName}>{name}, {sys.country}</p>
      </div>

      <div className={styles.cityTempBox}>
        <p className={`${styles.cityTemp} ${tempColor()}`}>
          {main.temp.toFixed()}°
        </p>
      </div>

        <div className={styles.cityCardBottom}>
          { name === 'Urubici' &&
            <div className={styles.cityCardInfo}>
              <div>
                <p className={styles.title}>Humidity</p>
                <p className={styles.value}>{main.humidity}%</p>
              </div>
              <div>
                <p className={styles.title}>Pressure</p>
                <p className={styles.value}>{main.pressure}hPa</p>
              </div>
            </div>
          }

        <div className={styles.cityCardUpdated}>
          <div>Updated at {updatedAt}</div>
        </div>
      </div>
    </div>
  );
}

export default CityBox;
