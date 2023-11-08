import { get } from "lodash";
import { createSelector } from "reselect";
import { initialState } from "./constants";

const selectAppStore = (state) => state.app || initialState;

export const selectAppSettings = createSelector([selectAppStore], (state) =>
  get(state, "appSettings", {})
);

export const selectCurrencyConfig = createSelector([selectAppStore], (state) =>
  get(state, "appSettings.currency", {})
);

export const selectUserInfo = createSelector([selectAppStore], (state) =>
  get(state, "userInfo", {})
);

export const selectRegisterToken = createSelector([selectAppStore], (state) =>
  get(state, "registerToken", null)
);

export const selectForgetPasswordToken = createSelector([selectAppStore], (state) =>
  get(state, "forgetPasswordToken", null)
);

export const selectForgetPasswordCode = createSelector([selectAppStore], (state) =>
  get(state, "forgetPasswordCode", null)
);
