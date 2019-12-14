import _ from 'lodash';
import { createSelector } from 'reselect';

export const selectStockState = state => state.stocks;

export const selectStockMap = state => selectStockState(state).byId;

export const selectStockIds = state => selectStockState(state).ids;

export const selectStockList = createSelector(
  selectStockMap,
  selectStockIds,
  (map, ids) => ids.map(id => map[id])
)

export const selectStocksLast10 = getSelectLastN(10);
export const selectStocksLast20 = getSelectLastN(20);

function getSelectLastN(n) {
  // memoize the sliced array instance
  return createSelector(
    () => n,
    selectStockList,
    (n, list) => _.takeRight(list, n)
  );
}

