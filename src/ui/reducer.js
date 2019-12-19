
export function uiReducer(state, action) {
  switch (action.type) {
    case 'ui/PAUSE_SCROLLING':
      return {
        ...state,
        scrollingPaused: true,
        displayRangeStartId: action.startId,
      };
    case 'ui/UNPAUSE_SCROLLING':
      return {
        ...state,
        scrollingPaused: false,
        displayRangeStartId: undefined,
      };
    case 'ui/EDIT_CELL_REQUESTED':
      return {
        ...state,
        cellBeingEdited: action.cellId,
      };
    case 'stock/EDIT_VALUE':
    case 'ui/EDIT_CELL_COMPLETED':
      return {
        ...state,
        cellBeingEdited: undefined,
      };
    case 'ui/RESIZE_VIEWPORT':
      return {
        ...state,
        viewportWidth: action.width,
        viewportHeight: action.height,
      };
    default:
      return state;
  }
}
