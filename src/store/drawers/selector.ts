import { get } from 'lodash';
import { AppState } from '../configureStore';
import { createSelector } from 'reselect';
import { initialState } from './constants';

const selectDrawerStore = (app: AppState) => get(app, 'drawer') || initialState;

export const selectDrawerView = createSelector([selectDrawerStore], (state) => get(state, 'view'));
export const selectDrawerOpen = createSelector([selectDrawerStore], (state) =>
  get(state, 'isOpen'),
);
export const selectDrawerAnchor = createSelector([selectDrawerStore], (state) =>
  get(state, 'anchor'),
);
