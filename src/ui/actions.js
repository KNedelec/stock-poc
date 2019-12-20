import { batch } from 'react-redux';

import { selectStockValuesToDisplay } from './selectors';
import { editStockValue } from '../stock/actions';

export function beginEditCell(cellId) {
  return (dispatch, getState) => {

    batch(() => {
      //set pause
      dispatch(pauseScrolling());

      //set editMode
      dispatch(editCellRequested(cellId));
    });
  };
}

export function endEditCell(cellId, value) {
  const [stockName, id] = cellId.split('-');

  return (dispatch, getState) => {
    batch(() => {
      dispatch(editStockValue(id, stockName, value));
    });
  };
}

export function editCellRequested(cellId) {
  return {
    type: 'ui/EDIT_CELL_REQUESTED',
    cellId,
  }
}

export function pauseScrolling() {

  return (dispatch, getState) => {
    //get the first the id of the displayed list
    //so we can pause the scrolling
    const startId = selectStockValuesToDisplay(getState())[0].id;

    dispatch({
      type: 'ui/PAUSE_SCROLLING',
      startId,
    });
  };
}

export function unpauseScrolling() {
  return {
    type: 'ui/UNPAUSE_SCROLLING',
  };
}

export function resizeViewport(height, width) {
  return {
    type: 'ui/RESIZE_VIEWPORT',
    height,
    width,
  }
};
