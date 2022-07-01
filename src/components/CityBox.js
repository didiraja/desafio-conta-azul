import styles from "./CityBox.module.sass";
import Loading from "../assets/loader.svg";

function CityBox({ style, title, status, name, sys, main, updatedAt }) {
  function tempColor() {
    if (main && main.temp) {
      if (main.temp.toFixed() <= 5) return styles.isCold;
      if (main.temp.toFixed() > 25) return styles.isHot;
    }

    return styles.temperature;
  }

  return (
    <div className={styles.cityBox} style={{ ...style }}>
      <div className={styles.cityNameBox}>
        <p className={styles.cityName}>
          {title}
        </p>
      </div>

      {status === "error" && 
        <div className={styles.errorWrapper}>
          <p className={styles.errorTxt}>Something went wrong!</p>
          <button className={styles.errorBtn} onClick={() => console.log('clicou!')}>Try Again</button>
        </div>
      }

      {status === "pending" && 
        <div className={styles.loadingWrapper}>
          <img className={styles.loading} src={Loading} alt="Carregando..." />
        </div>
      }

      {status === "completed" && (
        <>
          <div className={styles.cityTempBox}>
            <p className={`${styles.cityTemp} ${tempColor()}`}>
              {main.temp.toFixed()}°
            </p>
          </div>

          <div className={styles.cityCardBottom}>
            {name === "Urubici" && (
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
            )}

            <div className={styles.cityCardUpdated}>
              <div>Updated at {updatedAt}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CityBox;
