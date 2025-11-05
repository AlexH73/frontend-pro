import type { JSX } from 'react'
import './App.css'
import Counter from './components/counter/Counter'
import Sandwich from './components/sandwich/Sandwich';

function App(): JSX.Element {

  return (
    <>
      <Counter />
      <Sandwich />
    </>
  );
}

export default App
