import { useEffect, useState, type JSX } from 'react';
import style from './RandomDog.module.css';

export default function RandomDog(): JSX.Element {
  const [dogImage, setDogImage] = useState<string>('');

  async function loadDogImage(): Promise<void> {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const obj = await res.json();
    setDogImage(obj.message);
  }

  useEffect(() => {
    loadDogImage();
  }, []);

  return (
    <div className={style.container}>
      <h2 className={style.heading}>Random Dog</h2>
      <div className={style.imageContainer}>
        <img className={style.image} src={dogImage} alt='random-dog' />
      </div>
      <button
        className={style.btn}
        type='button'
        onClick={() => loadDogImage()}
      >
        Next image
      </button>
    </div>
  );
}
