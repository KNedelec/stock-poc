import { getDefaultAppState } from './state';
import { stockReducer } from './stock/reducer';

export const appReducer = (state = getDefaultAppState(), action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        stocks: stockReducer(state.stocks, action),
      }
  }
}
