
export function uiReducer(state, action) {
  switch (action.type) {
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
