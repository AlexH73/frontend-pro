import { useEffect, useState } from "react";

type Country = {
  country_id: string;
  probability: number;
};

export default function Nationality() {
  const BASE_URL = "https://api.nationalize.io/?name=";

  const [countries, setCountries] = useState<Country[]>([]);
  const [name, setName] = useState("jack");
  const [message, setMessage] = useState("");

  async function fetchNationality(name: string) {
    try {
      const res = await fetch(BASE_URL + name);
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Too many requests");
        }
      }
      const obj = await res.json();
      const { country } = obj;
      setCountries(country);
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err?.message);
      }
    }
  }

  useEffect(() => {
    fetchNationality(name);
  }, [name]);

  return (
    <div>
      <h2>Nationality by name</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {message ? (
        <p>{message}</p>
      ) : (
        <ul>
          {countries.map((c) => (
            <li key={c.country_id}>
              {c.country_id} Probability: {c.probability}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
