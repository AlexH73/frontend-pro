import { useEffect, useState } from "react";
import "./App.css";
interface GenderResponse {
  name: string;
  gender: string | null;
  country: string;
  probability: number; // BigInt
  remaining_credits: number;
}
function App() {
  const [name, setName] = useState<string>("");
  const [data, setData] = useState<GenderResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!name.trim()) {
      setData(null);
      setError(null);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.genderapi.io/api/?name=${name}`
        );
        if (!response.ok) {
          throw new Error("Ошибка запроса");
        }
        const result: GenderResponse = await response.json();
        setData(result);
      } catch (error) {
        setError("Не удалось получить данные. Попробуйте позже");
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(fetchData, 700);
    return () => clearInterval(timeout);
  }, [name]);
  return (
    <div>
      <h2>Определение пола по имени</h2>
      <div className="d-flex">
        <input
          className="form-control"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {/* <button className="btn btn-primary" onClick={handleClickCheck}>
          Определить
        </button> */}
      </div>
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <div>{error}</div>}
      {data && (
        <div>
          <p>
            <strong>Имя:</strong> {data.name}
          </p>
          <p>
            <strong>Пол:</strong> {data.gender}
          </p>
          <p>
            <strong>Страна:</strong> {data.country}
          </p>
          <p>
            <strong>Вероятность:</strong> {data.probability}
          </p>
          <p>
            <strong>Остаток запросов:</strong> {data.remaining_credits}
          </p>
        </div>
      )}
    </div>
  );
}
export default App;
