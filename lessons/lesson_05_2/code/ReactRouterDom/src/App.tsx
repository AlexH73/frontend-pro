import type { JSX } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayOut from './components/LayOut/LayOut';
import Home from './components/Home/Home';
import Alcohol from './components/Alcohol/Alcohol';
import CarShop from './components/CarShop/CarShop';
import { Counter } from './components/Counter/Counter';
import Playground from './components/Playground/Playground';
import UsersPage from './components/UsersPage/UsersPage';
import UserPage from './components/UsersPage/UserPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<LayOut />}>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='alcohol' element={<Alcohol />} />
        <Route path='carshop' element={<CarShop />} />
        <Route path='counter' element={<Counter />} />
        <Route path='playground' element={<Playground />} />
        <Route path='userspage' element={<UsersPage />} />
        <Route path='/userspage/:userId' element={<UserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
