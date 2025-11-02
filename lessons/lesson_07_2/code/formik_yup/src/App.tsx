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
import RandomDog from './components/RandomDog/RandomDog';
import Sandwich from './components/Sandwich/Sandwich';
import ProductPage from './components/ProductsPage/ProductPage';
import ProductsPage from './components/ProductsPage/ProductsPage';
import FormsDemo from './components/FormsDemo/FormsDemo';
import TodoList from './components/TodoList/TodoList';
import ProductsManager from './components/ProductsPage/ProductsManager';

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
        <Route path='randomdog' element={<RandomDog />} />
        <Route path='sandwich' element={<Sandwich />} />
        <Route path='products' element={<ProductsPage />} />
        <Route path='/products/:productId' element={<ProductPage />} />
        <Route path='products-manager' element={<ProductsManager />} />
        <Route path='forms-demo' element={<FormsDemo />} />
        <Route path='todo' element={<TodoList />} />
      </Route>
    </Routes>
  );
}

export default App;
