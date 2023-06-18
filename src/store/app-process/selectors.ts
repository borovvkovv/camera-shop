import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getCurrentPage = (state: State) => state[NameSpace.APP].currentPage;
