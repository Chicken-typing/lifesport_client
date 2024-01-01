import { get } from 'lodash';
import { AppState } from '../configureStore';
import { createSelector } from 'reselect';
import { initialState } from './constants';
import { map } from 'lodash';

const selectCartStore = (app: AppState) => get(app, 'cartUser') || initialState;

export const selectCarts = createSelector([selectCartStore], (state) => state);
