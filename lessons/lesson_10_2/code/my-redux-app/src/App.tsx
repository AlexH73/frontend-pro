import type { JSX } from 'react';
import './App.css';
import Counter from './components/counter/Counter';
import Sandwich from './components/sandwich/Sandwich';
import TaskManager from './components/tasks/TaskManager';
import DishForm from './components/dishes/DishForm';
import DishesList from './components/dishes/DishesList';

function App(): JSX.Element {
  return (
    <>
      <DishForm />
      <DishesList />
      <TaskManager />
      <Sandwich />
      <Counter />
    </>
  );
}

export default App;
