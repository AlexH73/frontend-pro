
import type { JSX } from 'react'
import './App.css'
import Counter from './features/counter/Counter'
import Sandwich from './features/sandwich/Sandwich'

function App(): JSX.Element {

  return (
    <>
    <Sandwich/>
    <Counter/>
    </>
  )
}

export default App
