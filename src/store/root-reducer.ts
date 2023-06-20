import { combineReducers } from 'redux';
import { NameSpace } from '../const';
import { dataProcess } from './data-process/data-process';

export const rootReducer = combineReducers({
  [NameSpace.DATA]: dataProcess.reducer,
});
