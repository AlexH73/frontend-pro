import type { JSX } from 'react';
import './App.css';
import Counter from './features/counter/Counter';
import Sandwich from './features/sandwich/Sandwich';
import { UsersList } from './features/users/UsersList';
import ProductsList from './features/products/ProductList';

function App(): JSX.Element {
  return (
    <>
      <ProductsList />
      <UsersList />
      <Sandwich />
      <Counter />
    </>
  );
}

export default App;
