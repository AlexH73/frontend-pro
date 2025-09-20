import s from "./Cocktail.module.css";
import { useEffect, useState, type JSX } from 'react';

export default function Cocktail(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>('');

  async function loadCocktail(): Promise<void> {
    const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const obj = await res.json();
    const { drinks } = obj;
    const { strDrink, strDrinkThumb } = drinks[0];
    setName(strDrink);
    setImage(strDrinkThumb);
  }
  useEffect(() => {
    loadCocktail();
  }, []);

      // pending - ожидание
      // fullfilled - выполненный - вы получили значение
      // rejected - отвергнуть - отклонен - ошибка без значения
      // раскрывает Promise от fetch

      // раскрывает Promise от асинхронного метода json()

        // поэтапно выводите в консоль

  return (
    <><h1>Cocktail: {name}</h1>
    <div className={s.container}>
      <img src={image} alt="" /><br />
    </div>
    <div className={s.btnContainer}>
<button className={s.btn} type="button" onClick={() => loadCocktail()}>
        Next image
</button>
    </div>
    </>

  );
}