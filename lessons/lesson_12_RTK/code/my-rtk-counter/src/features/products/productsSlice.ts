import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface ProductState {
  list: Product[];
  loading: boolean;
  error: string | null;
  viewingProduct: Product | null;
}

const initialState: ProductState = {
  list: [],
  loading: false,
  error: null,
  viewingProduct: null,
};

// Получение всех товаров
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  }
);

// Удаление товара
export const deleteProduct = createAsyncThunk<number, number>(
  'products/deleteProduct',
  async (productId: number) => {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return productId;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setViewingProduct: (state, action) => {
      state.viewingProduct = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (product) => product.id !== action.payload
        );
        if (state.viewingProduct?.id === action.payload) {
          state.viewingProduct = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete product';
      });
  },
});

export const { setViewingProduct, clearError } = productsSlice.actions;
export const selectProducts = (state: { products: ProductState }) =>
  state.products.list;
export const selectProductsLoading = (state: { products: ProductState }) =>
  state.products.loading;
export const selectProductsError = (state: { products: ProductState }) =>
  state.products.error;
export const selectViewingProduct = (state: { products: ProductState }) =>
  state.products.viewingProduct;
export const getProductRating = (product: Product) => {
  return product.rating || { rate: 0, count: 0 };
};

export default productsSlice.reducer;
