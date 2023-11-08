import { get } from 'lodash';
import { AppState } from '../configureStore';
import { createSelector } from 'reselect';
import { initialState } from './constants';
import { map } from 'lodash';

const selectCartStore = (app: AppState) => get(app, 'cart') || initialState;

export const selectCart = createSelector([selectCartStore], (state) => state);

export const selectQuantity = createSelector([selectCartStore], (state) =>
  map(state, (item) => get(item, 'quantity')),
);

export const selectTotal = createSelector([selectCartStore], (state) =>
  map(state, (item) => get(item, 'total')),
);
