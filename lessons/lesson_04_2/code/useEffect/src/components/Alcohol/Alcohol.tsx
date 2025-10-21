import { useEffect, useState, type JSX } from 'react';
import style from './Alcohol.module.css';

export default function Alcohol(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>('');

  async function loadAlcohol(): Promise<void> {
    const res = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );
    const obj = await res.json();
    // const { drinks } = obj;
    // const { strDrink, strDrinkThumb } = drinks[0];
    const { strDrink, strDrinkThumb } = obj.drinks[0];

    setName(strDrink);
    setImage(strDrinkThumb);
  }

  useEffect(() => {
    loadAlcohol();
  }, []);

  return (
    <div>
      <h2>Alcohol: {name}</h2>
      <div className={style.container}>
        <img src={image} alt={name} />
      </div>
      <div className={style.btnContainer}>
        <button type='button' onClick={() => loadAlcohol()}>
          Next drink
        </button>
      </div>
    </div>
  );
}
