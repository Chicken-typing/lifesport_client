import { get } from "lodash";
import { createSelector } from "reselect";
import { initialState } from "./constants";

const selectCartStore = (app) => app?.cart || initialState;

export const selectCartItems = createSelector([selectCartStore], (state) =>
  get(state, "items", [])
);
