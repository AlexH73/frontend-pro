import type Dish from './types/Dish';
import type { Action } from './types/Action';
import { uid } from 'uid';

const initialState: Dish[] = [
  {
    id: uid(),
    title: 'Pie',
    category: 'dessert',
    price: 12,
    image:
      'https://fsd.multiurok.ru/html/2018/05/03/s_5aeb2280cc6d6/894065_15.jpeg',
  },
  {
    id: uid(),
    title: 'Цезарь с курицей',
    category: 'main',
    price: 10.99,
    image:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=500&fit=crop',
  },
  {
    id: uid(),
    title: 'Бургер классический',
    category: 'main',
    price: 12.75,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop',
  },
  {
    id: uid(),
    title: 'Шоколадный фондан',
    category: 'dessert',
    price: 6.5,
    image:
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=500&fit=crop',
  },
  {
    id: uid(),
    title: 'Картофель фри',
    category: 'snack',
    price: 4.99,
    image:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=500&fit=crop',
  },
  {
    id: uid(),
    title: 'Лосось на гриле',
    category: 'main',
    price: 18.5,
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=500&fit=crop',
  },
  {
    id: uid(),
    title: 'Фруктовый салат',
    category: 'dessert',
    price: 5.25,
    image:
      'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=500&h=500&fit=crop',
  },
  {
    id: uid(),
    title: 'Куриные наггетсы',
    category: 'snack',
    price: 7.99,
    image:
      'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&h=500&fit=crop',
  },
  {
    id: uid(),
    title: 'Томатный суп',
    category: 'main',
    price: 6.99,
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=500&fit=crop',
  },
];

export default function dishesReducer(
  state: Dish[] = initialState,
  action: Action
): Dish[] {
  switch (action.type) {
    case 'dishes/create':
      return [...state, { ...action.payload, id: uid() }];
    case 'dishes/delete':
      return state.filter((dish) => dish.id !== action.payload);
    case 'dishes/edit':
      return state.map((dish) =>
        dish.id === action.payload.id ? action.payload : dish
      );
    default:
      return state;
  }
}

