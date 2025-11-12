import type { JSX } from 'react';
import './App.css';
import Counter from './components/counter/Counter';
import Sandwich from './components/sandwich/Sandwich';
import TaskManager from './components/tasks/TaskManager';
import DishesPage from './components/dishes/DishesPage';

function App(): JSX.Element {
  return (
    <>
      <DishesPage />
      <TaskManager />
      <Sandwich />
      <Counter />
    </>
  );
}

export default App;
