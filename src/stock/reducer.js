import _ from 'lodash';

export const stockReducer = (state, action) => {
  switch (action.type) {
    case 'stock/FETCH_COMPLETED':
      return {
        ...state,
        ids: _.uniq([...state.ids, ...action.stocks.map(s => s.timestamp)]).sort(),
        byId: action.stocks.reduce((acc, cur) => {
          acc[cur.timestamp] = cur;

          return acc;
        }, { ...state.byId }),
      };
    default:
      return state;
  }
}
