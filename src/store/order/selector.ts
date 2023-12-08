import { get } from 'lodash';
import { AppState } from '../configureStore';
import { createSelector } from 'reselect';
import { initialState } from './constants';
import { map } from 'lodash';

const selectOrderStore = (app: AppState) => get(app, 'order') || initialState;

export const selectOrder = createSelector([selectOrderStore], (state) => state);
