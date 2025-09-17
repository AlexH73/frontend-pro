import { useEffect, useState } from "react";

export default function Demo() {
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);

  //    вариант 1 - без массивая зависимостей
  //    при первом рендере, при последующий ререндерах
  //    иными словами при любых изменениях
  useEffect(() => {
    console.log("Variant 1 - no array");
  });

  //   вариант 2 - с пустым массивом зависимостей
  //   только при первом рендере
  useEffect(() => {
    console.log("Variant 2 - emty depencies array!");
  }, []);

  //   вариант 3 - с массивом зависимостей
  //   при первом рендере, и при изменении зависимостей
  useEffect(() => {
    console.log("Variant 3 - with depencies array!");
  }, [age]);

  return (
    <div>
      <h2>
        Demo Age: {age} Weight: {weight}
      </h2>
      <button type="button" onClick={() => setAge((prev) => prev + 1)}>
        +1 Age
      </button>
      <button type="button" onClick={() => setWeight((prev) => prev + 1)}>
        +1 Weight
      </button>
    </div>
  );
}

// Component lifecycle
// 1. Mount - установка - первый рендер на экране
// 2. Update - изменения - когда любые ререндеры
// 3. Unmount - размонтирование - когда исчезает с экрана
