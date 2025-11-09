import type { JSX } from 'react';
import './App.css';
import Counter from './components/counter/Counter';
import Sandwich from './components/sandwich/Sandwich';
import TaskManager from './components/tasks/TaskManager';

function App(): JSX.Element {
  return (
    <>
      <TaskManager />
      <Sandwich />
      <Counter />
    </>
  );
}

export default App;
