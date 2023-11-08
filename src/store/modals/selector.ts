import { get } from 'lodash';
import { AppState } from '../configureStore';
import { createSelector } from 'reselect';
import { initialState } from './constants';

const selectModalStore = (app: AppState) => get(app, 'modal') || initialState;

export const selectModalView = createSelector([selectModalStore], (state) => get(state, 'view'));
export const selectModalOpen = createSelector([selectModalStore], (state) => get(state, 'isOpen'));
export const selectDataLightBox = createSelector([selectModalStore], (state) =>
  get(state, 'lightBoxData'),
);
