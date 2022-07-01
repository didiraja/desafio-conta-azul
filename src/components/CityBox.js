import styles from "./CityBox.module.sass";
import Loading from "../assets/loader.svg";

function CityBox({ style, title, status, data, date, onTryAgain }) {

  const isComponentReady = status === "completed";

  function tempColor() {
    if (isComponentReady) {
      if (data.main.temp.toFixed() <= 5) return styles.isCold;
      if (data.main.temp.toFixed() > 25) return styles.isHot;
    }

    return styles.temperature;
  }

  return (
    <div className={styles.cityBox} style={{ ...style }}>
      <div className={styles.cityNameBox}>
        <p className={styles.cityName}>
          {data.name}, {data.sys.country}
        </p>
      </div>

      {status === "error" && 
        <div className={styles.errorWrapper}>
          <p className={styles.errorTxt}>Something went wrong!</p>
          <button className={styles.errorBtn} onClick={() => onTryAgain()}>Try Again</button>
        </div>
      }

      {status === "pending" && 
        <div className={styles.loadingWrapper}>
          <img className={styles.loading} src={Loading} alt="Carregando..." />
        </div>
      }

      {isComponentReady && (
        <>
          <div className={styles.cityTempBox}>
            <p className={`${styles.cityTemp} ${tempColor()}`}>
              {data.main.temp.toFixed()}°
            </p>
          </div>

          <div className={styles.cityCardBottom}>
            {data.name === "Urubici" && (
              <div className={styles.cityCardInfo}>
                <div>
                  <p className={styles.title}>Humidity</p>
                  <p className={styles.value}>{data.main.humidity}%</p>
                </div>
                <div>
                  <p className={styles.title}>Pressure</p>
                  <p className={styles.value}>{data.main.pressure}hPa</p>
                </div>
              </div>
            )}

            {
              date &&
              <div className={styles.cityCardUpdated}>
                <div>Updated at {date.formatted}</div>
              </div>
            }
          </div>
        </>
      )}
    </div>
  );
}

export default CityBox;
