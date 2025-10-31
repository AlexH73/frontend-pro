import type { JSX } from 'react';
import style from './Bike.module.css';

interface Props {
  gears: number;
  brand: string;
  price: number;
  image: string;
}

export default function Bike(props: Props): JSX.Element {
  const { gears, brand, price, image } = props;
  return (
    <div>
      <figure className={style.fig}>
        <img className={style.image} src={image} alt={brand} />
        <figcaption className={style.desc}>
          <strong>Brand:</strong> {brand} <br />
          <strong>Gears:</strong> {gears} <br />
          <i>Price:</i> {price}
        </figcaption>
      </figure>
    </div>
  );
}
