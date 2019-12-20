import { createSelector } from 'reselect';

import { createResultMemoizedSelector } from '../redux-tools';
import * as stockSelectors from '../stock/selectors';

export const selectUiState = state => state.ui;

export const selectUiCellBeingEdited = state => selectUiState(state).cellBeingEdited;

export const selectUiIsEditingCell = state => selectUiCellBeingEdited(state) !== undefined;

export const selectViewportWidth = state => selectUiState(state).viewportWidth;

export const selectViewportHeight = state => selectUiState(state).viewportHeight;

export const selectUiIsScrollingPaused = state =>
  selectUiState(state).scrollingPaused;

export const selectUiDisplayRangeSize = state => {
  return selectUiState(state).displayRangeSize;
}

export const selectUiDisplayRangeStartId = state => {
  return selectUiState(state).displayRangeStartId;
}

/**
 * Get the stock values
 * In the case of a list of stock values being refreshed every second, this
 * memo has a 1 second lifetime at best. That's why it is not the selector
 * effectively used, see below.
 */
const _selectStockValuesToDisplay = createSelector(
  stockSelectors.selectUpdatedStockList,
  stockSelectors.selectStocksLast10,
  stockSelectors.selectStocksLast20,
  selectUiIsScrollingPaused,
  selectUiDisplayRangeSize,
  selectUiDisplayRangeStartId,
  (stocks, last10, last20, scrollingPaused, size, startId) => {
    // if the scrolling is not paused, take last values
    if (!scrollingPaused) {
      switch(size) {
        case 10: return last10;
        case 20: return last20;
        default:
          process.env.NODE_ENV === 'development' && 
            console.warn('not memoized, get last 20 instead');
          return last20;
      }
    }

    // else take `size` items from `startId`
    const ix = stocks.findIndex(item => item.id === startId);

    return stocks.slice(ix, ix + size);
  }
);

/**
 * Get the memoized stock values
 * It is memoized by dependencies and by result, i.e. the resulted list is deep
 * equally compared and the same instance is returned if the stocks inside are
 * the same, even if ids/byId state objects have changed.
 * We use _selectStockValuesToDisplay because
 * createSelectorCreator makes the dependencies being memoized by the custom
 * function of createResultMemoizedSelector, which is heavier and useless, we
 * just want the final list to be memoized
 */
export const selectStockValuesToDisplay = createResultMemoizedSelector(
  _selectStockValuesToDisplay,
  res => res
);

