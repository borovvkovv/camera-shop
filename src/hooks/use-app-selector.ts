import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { State } from '../types/store';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
