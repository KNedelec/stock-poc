
export const editCell = (stockTs, stockName) => ({
  type: 'ui/EDIT_CELL',
  stockTs,
  stockName
});

export const resizeViewport = (height, width) => ({
  type: 'ui/RESIZE_VIEWPORT',
  height,
  width,
});
