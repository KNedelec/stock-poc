
export const selectUiState = state => state.ui;

export const selectUiCellBeingEdited = state => selectUiState(state).cellBeingEdited;

export const selectUiIsEditingCell = state => selectUiCellBeingEdited(state) !== undefined;

export const selectViewportWidth = state => selectIoState(state).viewportWidth;

export const selectViewportHeight = state => selectIoState(state).viewportHeight;
