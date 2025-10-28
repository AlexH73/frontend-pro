import type { JSX } from 'react';
import Car from '../Car/Car';
import Bike from '../Bike/Bike';

export default function CarShop(): JSX.Element {
  return (
    <div>
      <h1>Car Shop</h1>
      <h2>Cars</h2>
      {/* вызываем */}
      <Car brand={'BMW'} color={'red'} />
      <Car brand='Mercedes' color='gray' />
      <Car brand='Lada' color='pink' />
      <Car brand='Volga' color='black' />
      <Car brand='Honda' color='yellow' />
      <Bike
        gears={5}
        brand={'Harley Davidson'}
        price={14_000}
        image={
          'https://sportishka.com/uploads/posts/2022-04/1650967338_37-sportishka-com-p-chopperi-kharlei-devidson-modelnii-ryad-kr-39.jpg'
        }
      />
    </div>
  );
}
