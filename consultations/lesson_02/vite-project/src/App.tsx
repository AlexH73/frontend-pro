import type { JSX } from 'react'
import './App.css'
import CarShop from './components/CarShop/CarShop'
import Sandwich from './components/Sandwich/Sandwich'

function App(): JSX.Element {

  return (
    <div>
      <CarShop />
      <Sandwich />
    </div>
  );
}

export default App
