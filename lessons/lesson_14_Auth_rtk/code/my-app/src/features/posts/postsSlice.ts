/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostsState from './types/PostsState';
import * as api from './api';
//createAsyncThunk — для создания асинхронных экшенов (thunk-ов).
// createSlice — упрощённый способ создания reducer + actions в одном месте.
const initialState: PostsState = {
	posts: [],
	filtered: [],
};

export const loadPosts = createAsyncThunk('posts/loadPosts', () => api.getAll());
//Асинхронный экшен
//Название: 'posts/loadPosts'.
// Тело: вызывает api.getAll() — функция, которая возвращает список всех постов.

export const loadPostsByWord = createAsyncThunk('posts/loadPostsByWord', (word: string) =>
	api.getPostsByWord(word)
);
// Асинхронный экшен loadPostsByWord:
//Принимает строку word.
// Делает запрос через api.getPostsByWord(word) — получает посты, содержащие это слово.

export const editTitle = createAsyncThunk(
	'posts/editTitle',
	({ title, id }: { title: string; id: number }) => api.editPostTitle(title, id)
);
// Асинхронный экшен editTitle:
// Принимает объект { title, id }.
// Отправляет запрос на редактирование заголовка поста через api.editPostTitle(...).

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Используется "builder callback" для описания поведения при выполнении асинхронных экшенов (createAsyncThunk).
		builder
			.addCase(loadPosts.fulfilled, (state, action) => {
				state.posts = action.payload.posts;
			})
			.addCase(editTitle.fulfilled, (state, action) => {
				// если бы апишка сохраняла - мы бы использовали вместо filtered - posts
				state.filtered = state.filtered.map((post) =>
					post.id === action.payload.id ? action.payload : post
				);
			})
			.addCase(loadPostsByWord.fulfilled, (state, action) => {
				state.filtered = action.payload.posts;
			});
			//Обработка успешной фильтрации:
			// Сохраняем отфильтрованные посты (из action.payload.posts) в state.filtered.
	},
});
// Создание слайса postsSlice:
// name: 'posts' — префикс для всех action type-ов.
// initialState — состояние, объявленное выше.
// reducers: {} — синхронные редьюсеры не используются (всё через extraReducers).

export default postsSlice.reducer;
