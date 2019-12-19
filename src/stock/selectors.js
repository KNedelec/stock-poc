import _ from 'lodash';
import { createSelector } from 'reselect';

export const selectStockState = state => state.stocks;

export const selectStockMap = state => selectStockState(state).byId;

export const selectUpdatedStockMap = state => selectStockState(state).byIdEdited;

export const selectStockIds = state => selectStockState(state).ids;

export const selectStockList = createSelector(
  selectStockMap,
  selectStockIds,
  (map, ids) => ids.map(id => map[id])
)

export const selectUpdatedStockList = createSelector(
  selectStockMap,
  selectUpdatedStockMap,
  selectStockIds,
  (map, updatedMap, ids) => {
    return ids.map(id => ({
      ...map[id],
      stocks: {
        ...map[id].stocks,
        ...(updatedMap[id] && updatedMap[id].stocks),
      },
    }));
  }
);

export const selectStocksLast10 = getSelectLastN(10);
export const selectStocksLast20 = getSelectLastN(20);

export function getSelectLastN(n) {
  // memoize the sliced array instance
  return createSelector(
    () => n,
    selectUpdatedStockList,
    (n, list) => _.takeRight(list, n)
  );
}

