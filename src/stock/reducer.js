import _ from 'lodash';

import * as tools from './tools';

export const stockReducer = (state, action) => {
  switch (action.type) {
    case 'stock/REDUCE_SIZE':
      // TODO: check the need to clean
      return state;
    case 'stock/EDIT_VALUE':
      return {
        ...state,
        byIdEdited: {
          ...state.byIdEdited,
          [action.id]: {
            ...state.byIdEdited[action.id],
            stocks: {
              ...(state.byIdEdited[action.id] && state.byIdEdited[action.id].stocks),
              [action.stockName]: action.value,
            },
          },
        },
      };
    case 'stock/FETCH_COMPLETED':
      return {
        ...state,
        // add and uniq the ids, then sort ascending as they are timestamps
        ids: _.uniq([
          ...state.ids,
          ...action.stocks.map(s => s.timestamp)
        ]).sort(),

        byId: action.stocks
          // map normalized stocks objects
          // add an id prop corresponding to the timestamp
          .map(stock => ({
              ...stock,
              stocks: tools.normalizeStocksObject(stock.stocks),
              id: stock.timestamp,
          }))
          // reduce in the byId map
          .reduce((acc, cur) => {
            // ensure no reference is leaked in the state by creating a new
            // object
            acc[cur.timestamp] = { ...cur, };

            return acc;
          }, { ...state.byId }),
      };
    default:
      return state;
  }
}
