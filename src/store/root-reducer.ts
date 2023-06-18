import { combineReducers } from 'redux';
import { NameSpace } from '../const';
import { appProcess } from './app-process/app-process';
import { dataProcess } from './data-process/data-process';

export const rootReducer = combineReducers({
  [NameSpace.DATA]: dataProcess.reducer,
  [NameSpace.APP]: appProcess.reducer,
});
