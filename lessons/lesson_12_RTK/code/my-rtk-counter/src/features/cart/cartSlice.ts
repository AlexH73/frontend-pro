import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        price: number;
        image: string;
      }>
    ) => {
      const { id, title, price, image } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id,
          title,
          price,
          image,
          quantity: 1,
        });
      }

      // Пересчитываем общие значения
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);

      // Пересчитываем общие значения
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }

      // Пересчитываем общие значения
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.total;
export const selectCartTotalQuantity = (state: { cart: CartState }) =>
  state.cart.totalQuantity;
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;
