import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
// -> Делаем свой useDispatch, который знает типы Action
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
