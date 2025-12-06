import { useDispatch, useSelector } from "react-redux";
import { setCity } from "./weatherSlice";
import { useGetWeatherQuery } from "./weatherApi";
import type { RootState } from "../../app/store";
import styles from "./Weather.module.css";

const Weather = () => {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.weatherState.city);

  // Автоматически подписываемся на city.
  // Если city был сохранён persist-ом → погода появится сразу.
  const { data, error, isFetching } = useGetWeatherQuery(city, {
    skip: !city,
  });

//   skip: !city
// или если city пустая строка.
// И это значит:

// Вкладка открылась → city пустая → запрос НЕ запущен
// Persist восстановил weatherApi в store → но компонент НЕ подписан на кэш
// Поэтому UI не показывает погоду

  const handleSearch = () => {
    if (!city) {
      alert("Введите город");
      return;
    }
    // refetch уже не нужен — useGetWeatherQuery сам вызовет запрос
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Прогноз погоды (RTK Query)</h1>

        <input
          type="text"
          placeholder="Введите город"
          value={city}
          className={styles.input}
          onChange={(e) => dispatch(setCity(e.target.value))}
        />

        <button className={styles.button} onClick={handleSearch}>
          Получить погоду
        </button>

        {isFetching && <p>Загрузка...</p>}
        {error && <p>Ошибка: город не найден</p>}

        {data && (
          <div className={styles.weatherBox}>
            <h2>
              {data.name}, {data.sys.country}
            </h2>
            <p>Температура: {data.main.temp}°C</p>
            <p>Погода: {data.weather[0].description}</p>
            <p>Влажность: {data.main.humidity}%</p>
            <p>Ветер: {data.wind.speed} м/с</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
