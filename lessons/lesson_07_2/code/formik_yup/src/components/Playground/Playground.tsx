import { useEffect, useState, type JSX } from 'react';
import ContactForm from '../FormsDemo/ContactForm/ContactForm';

export default function Playground(): JSX.Element {
  const [numberOfDogs, setNumberOfDogs] = useState<number>(0);
  const [numberOfBirds, setNumberOfBirds] = useState<number>(10);

  function handleAddDog(): void {
    setNumberOfDogs(numberOfDogs + 1);
  }

  function handleAddBird(): void {
    setNumberOfBirds(numberOfBirds + 10);
  }
  // useEffect
  // позволяет вызвать функцию
  // на каком-нибудь из этапов жизни компонента
  // - принимает колбек функцию и второй опиональный параметр -
  // массив зависимостей

  // Пример 1 - пустой массив зависимостей
  useEffect(() => {
    console.log('UseEffect 1 - Только при первой отрисовке === mount');
  }, []);

  // Пример 2 - без массива
  useEffect(() => {
    console.log(
      'UseEffect 2 -  при первой отрисовке(mount), при любых изменениях'
    );
  });

  // Пример 3 - с указанием зависимостей
  useEffect(() => {
    console.log(
      'UseEffect 3 - при первичной отрисовке(mount), при изменении переменной numberOfDogs'
    );
  }, [numberOfDogs]);

  return (
    <div>
      <h2>Playground</h2>
      <p>Number of dogs: {numberOfDogs}</p>
      <p>Number of birds: {numberOfBirds}</p>
      <button type='button' onClick={handleAddDog}>
        Let the dog in
      </button>
      <button type='button' onClick={handleAddBird}>
        New bird
      </button>

      <ContactForm />
    </div>
  );
}
